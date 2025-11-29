from datetime import date, datetime, timedelta
from fileinput import filename
import os
import secrets
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import jwt
from passlib.context import CryptContext
from pathlib import Path
from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, Query, Request, Response, UploadFile
from pydantic import EmailStr, Field
from sqlalchemy.orm import Session
from app.auth.auth_utils import role_requires, get_current_user
from app.auth.jwt_handler import create_access_token, verify_token
from app.core.dependencies import db
from app.models.user import User, UserDetails
from app.services.user import user_service
from app.schemas.user import ForgotPasswordRequest, ResetPasswordRequest, UserCreate, UserDetailsUpdate, UserUpdate, UserResponse, LoginUser, PasswordUpdateSchema

from typing import List, Union

from app.utils.common import get_image_url, get_row, get_url, send_email, validate_image_ex


router_auth = APIRouter(tags=["Auth - Password Reset"])

templates = Jinja2Templates(directory="templates")

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
otp_store = {}


router = APIRouter(tags=["Users"])



@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(db.get_db)):
    """Register new user - Public"""
    
    return user_service.create_user(db, user)


@router.post("/login")
def login(response: Response, username: str = Form(...), password: str = Form(...),  db: Session = Depends(db.get_db)):
    """Login user - Public"""
    user = LoginUser(email=username, password=password)
    return user_service.login_user(db, user, response)


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get current logged-in user profile"""
    return user_service.get_user_by_id(db, current_user["id"])


@router.get("/me/details")
def get_my_details(
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Organizer", "Audience"))
):
    """Get current user's extra details"""
    details =  user_service.get_user_details(db, current_user["id"])
    if not details:
        raise HTTPException(404, "No details Found")
    return details


from fastapi import Body

@router.patch("/details/update")
async def update_my_details(
    update_data: UserDetailsUpdate = Body(...),
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Organizer", "Audience"))
):
    return user_service.update_details(db, current_user["id"], update_data, None)


@router.post("/details/upload-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Organizer", "Audience")),
):
    try:
        extension = validate_image_ex(file)
        upload_dir = "uploads/profiles"
        os.makedirs(upload_dir, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        extension = os.path.splitext(file.filename)[1]
        file_name = f"{timestamp}{extension}"
        file_path = os.path.join(upload_dir, file_name)

        # Save the uploaded file
    
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        image_url = f"/uploads/profiles/{file_name}"

        # Update user's profile image in DB
        user_service.update_profile_image(db, current_user["id"], image_url)

        # Return the complete image URL
        return {"image_url": get_url(image_url)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# in Routes

@router.post("/change-password")
def change_password(
    payload: PasswordUpdateSchema,
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Organizer", "Audience"))
):
    """Change password for logged-in user"""
    pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
    user = user_service.get_user_by_id(db, current_user['id'])

    # verify old password
    if not pwd_context.verify(payload.old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    # hash and update new password
    user.password = pwd_context.hash(payload.new_password)
    db.commit()

    return {"message": "Password changed successfully"}

@router.post("/forgot-password")
async def forgot_password(
    background_tasks: BackgroundTasks,
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Organizer", "Audience"))
):
    
    user = db.query(User).filter(User.id == current_user["id"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User with this email not found")
    
    # Create token with user_id
    token_payload = {
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    reset_token = create_access_token(token_payload)
    # Create reset link
    reset_link = f"http://localhost:8000/users/reset-password?token={reset_token}"
    
    # Email HTML
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>Hello {user.name},</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <a href="{reset_link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
        </body>
    </html>
    """
    
    send_email(user.email, "Password Reset Request", html_content, background_tasks)
    
    return {"message": "Password reset link sent to your email"}

@router.get("/reset-password", response_class=HTMLResponse)
async def reset_password_page(request: Request, token: str):
    """Render HTML template for password reset"""
    return templates.TemplateResponse("reset_password.html", {"request": request, "token": token})


@router.post("/logout")
def logout(response: Response):
    # Clear the refresh_token cookie
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=False,  # Match the same flags as when setting
        samesite="lax",
        path="/"  # Important to specify path for the cookie
    )
    return {"message": "Logged out successfully"}

#------------------------#
router_admin = APIRouter(tags=["Admin action"])

@router_admin.get("/", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Admin"))
):
    """Get all users - Admin only"""
    return user_service.get_all_users(db)


@router_admin.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Admin"))
):
    """Get user by ID - Admin only"""
    return user_service.get_user_by_id(db, user_id)

@router_admin.patch("/{user_id}/deactivate")
def deactivate_user(
    user_id: int,
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Admin"))
):
    """Deactivate user (set status=False) - Admin only"""
    user = user_service.get_user_by_id(db, user_id)
    if user.role_id == 1:
        raise HTTPException (404, "Admin can not deactivate a admin")
    user.status = False
    db.commit()
    db.refresh(user)
    return {"message": "User deactivated", "id": user.id}


@router_admin.patch("/{user_id}/activate")
def activate_user(
    user_id: int,
    db: Session = Depends(db.get_db),
    current_user: dict = Depends(role_requires("Admin"))
):
    """Reactivate user (set status=True) - Admin only"""
    user = user_service.get_user_by_id(db, user_id)
    if user.role_id == 1:
        raise HTTPException (404, "Admin can not activate a admin")
    user.status = True
    db.commit()
    db.refresh(user)
    return {"message": "User activated", "id": user.id}














@router_auth.post("/send-otp")
async def send_otp(
    request: dict,
    background_tasks: BackgroundTasks,
    db: Session = Depends(db.get_db)
):
    token = request.get("token")
    
    try:
        payload = verify_token(token)
        user_id = payload.get("user_id")
        print(user_id)
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Generate 6-digit OTP
        otp = str(secrets.randbelow(900000) + 100000)
        
        # Store OTP with expiry (5 minutes)
        otp_store[token] = {
            "otp": otp,
            "expires_at": datetime.utcnow() + timedelta(minutes=5)
        }
        
        # Send OTP via email
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Your OTP for Password Reset</h2>
                <p>Hello {user.name},</p>
                <p>Your OTP is: <strong style="font-size: 24px; color: #007bff;">{otp}</strong></p>
                <p>This OTP will expire in 5 minutes.</p>
            </body>
        </html>
        """
        
        send_email(user.email, "Your OTP for Password Reset", html_content, background_tasks)
        
        return {"message": "OTP sent to your email"}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Reset link has expired")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid reset link")


@router_auth.post("/reset-password-confirm")
async def reset_password_confirm(
    request: ResetPasswordRequest,
    db: Session = Depends(db.get_db)
):
    if request.new_password != request.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if len(request.new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    try:
        payload = verify_token(request.token)
        user_id = payload.get("user_id")
        
        # Verify OTP
        stored_otp_data = otp_store.get(request.token)
        if not stored_otp_data:
            raise HTTPException(status_code=400, detail="OTP not found. Please request a new one")
        
        if datetime.utcnow() > stored_otp_data["expires_at"]:
            del otp_store[request.token]
            raise HTTPException(status_code=400, detail="OTP has expired")
        
        if stored_otp_data["otp"] != request.otp:
            raise HTTPException(status_code=400, detail="Invalid OTP")
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Hash and update password
        hashed_password = pwd_context.hash(request.new_password)
        user.password = hashed_password
        db.commit()
        
        # Clear OTP
        del otp_store[request.token]
        
        return {"message": "Password reset successfully"}
        
    except Exception as e: 
        raise HTTPException(status_code=400, detail=f" {e} Reset link has expired")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid reset link")

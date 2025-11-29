from fastapi import Depends, Response, HTTPException, status
from datetime import datetime, timedelta

from fastapi.security import OAuth2PasswordBearer
from pytest import Session
from app.auth.jwt_handler import create_access_token, create_refresh_token, verify_token
from app.core.config import settings
from jose import JWTError, jwt

from app.core.dependencies import db
from app.models.user import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login") 


def generate_tokens(user_data: dict, response: Response):
    access_token = create_access_token(user_data)
    refresh_token = create_refresh_token(user_data)

    
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )
    return {"access_token": access_token, "token_type": "bearer"}


def refresh_access_token(response: Response, refresh_token: str):
    try:
        payload = verify_token(refresh_token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    user_data = {"username": payload.get("username"), "role": payload.get("role")}
    return generate_tokens(user_data, response)



def decode_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    except jwt.JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )



def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(db.get_db)):
   
    try:
        payload = decode_token(token=token)
       
    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_data = db.query(User).filter(User.id == payload["id"]).first()
    
    if not user_data:
    
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"User status: {user_data.status}")
    if not user_data.status:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"{payload['id']} is deactivated."
        )
    
    return payload


def admin_required(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

def role_requires(*roles):
    def check(current_user: dict = Depends(get_current_user), db: Session = Depends(db.get_db)):
        if current_user.get("role") not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{roles} access required"
            )
        user_data = db.query(User).filter(User.id == current_user["id"]).first()
        print("HELLLLLLLLLLLLO")
        print(user_data.status)
        if not user_data.status:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{current_user['id']} is deactiveted."
            )
        return current_user
    return check
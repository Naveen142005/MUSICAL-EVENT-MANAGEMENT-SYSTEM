from fastapi import UploadFile
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import date, datetime
import re


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="User's full name")
    email: EmailStr
    phone: Optional[int] = Field(None, ge=1000000000, le=9999999999, description="10-digit phone number")
    password: str = Field(..., min_length=6, max_length=128)
    role_id: int = Field(2, ge=1, le=10, description="Role ID for user type")
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty or only whitespace')
        if not re.match(r'^[a-zA-Z\s.]+$', v):
            raise ValueError('Name can only contain letters, spaces, and periods')
        return v.strip()
    
    @field_validator('phone')
    def validate_phone(cls, value):
        if value is not None:
            first_digit = str(value)[0]
            if first_digit not in {'6', '7', '8', '9'}:
                raise ValueError('Phone number must start with 6, 7, 8, or 9')
        return value
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) <6 :
            raise ValueError('Password must be at least 6 characters long')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character')
        return v


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[int] = Field(None, ge=1000000000, le=9999999999)
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if v is not None:
            if not v.strip():
                raise ValueError('Name cannot be empty or only whitespace')
            if not re.match(r'^[a-zA-Z\s.]+$', v):
                raise ValueError('Name can only contain letters, spaces, and periods')
            return v.strip()
        return v


class UserResponse(BaseModel):
    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=255)
    phone: Optional[int] = Field(None, ge=1000000000, le=9999999999)
    status: bool
    
    class Config:
        from_attributes = True


class LoginUser(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=1, max_length=128)
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if not v.strip():
            raise ValueError('Email cannot be empty')
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v.lower().strip()


class UserDetailsUpdate(BaseModel):
    gender: Optional[str] = Field(None, min_length=1, max_length=20)
    dob: Optional[date] = None
    city: Optional[str] = Field(None, min_length=2, max_length=100)
    state: Optional[str] = Field(None, min_length=2, max_length=100)
    country: Optional[str] = Field(None, min_length=2, max_length=100)
    profile_image: Optional[str] = Field(None, max_length=500)
    
    @field_validator('gender')
    @classmethod
    def validate_gender(cls, v):
        if v is not None:
            allowed_genders = ['male', 'female', 'other', 'prefer not to say']
            if v.lower() not in allowed_genders:
                raise ValueError(f'Gender must be one of: {", ".join(allowed_genders)}')
            return v.lower().capitalize()
        return v
    
    @field_validator('dob')
    @classmethod
    def validate_dob(cls, v):
        if v is not None:
            if v >= date.today():
                raise ValueError('Date of birth must be in the past')
            age = (date.today() - v).days // 365
            if age < 13:
                raise ValueError('User must be at least 13 years old')
            if age > 120:
                raise ValueError('Invalid date of birth')
        return v
    
    @field_validator('city', 'state', 'country')
    @classmethod
    def validate_location(cls, v):
        if v is not None:
            if not v.strip():
                raise ValueError('Location field cannot be empty or only whitespace')
            if not re.match(r'^[a-zA-Z\s\-]+$', v):
                raise ValueError('Location can only contain letters, spaces, and hyphens')
            return v.strip().title()
        return v
    
    @field_validator('profile_image')
    @classmethod
    def validate_profile_image(cls, v):
        if v is not None:
            if not v.strip():
                raise ValueError('Profile image URL cannot be empty')
            # Check if it's a valid URL or file path
            url_pattern = r'^(https?://|/|[a-zA-Z]:\\)'
            if not re.match(url_pattern, v):
                raise ValueError('Profile image must be a valid URL or file path')
        return v



from pydantic import BaseModel, Field, field_validator, ValidationInfo

class PasswordUpdateSchema(BaseModel):
    old_password: str = Field(..., min_length=6, description="Current password (at least 8 characters)")
    new_password: str = Field(..., min_length=6, description="New password (at least 8 characters)")

    @field_validator('new_password')
    def validate_new_password_strength(cls, v: str, info: ValidationInfo):
        import re
        # Must contain uppercase, lowercase, number, and special character
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(pattern, v):
            raise ValueError(
                "Password must contain at leas  t one uppercase, one lowercase, one number, and one special character"
            )

        # Compare with old password safely
        old_password = info.data.get('old_password') if info.data else None
        if old_password and v == old_password:
            raise ValueError("New password cannot be the same as the old password")

        return v
     

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    otp: str
    new_password: str
    confirm_password: str
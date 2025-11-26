# Authentication & Role Documentation

**Project:** EMS Musical Event Management System  
**Version:** v1.0  
**Last Updated:** 15-Nov-2025

---

## Overview

This document outlines the authentication system and role-based access control (RBAC) for EMS. The system manages user login, JWT token issuance, and permissions for three defined roles: Admin, Organizer, and Audience.

---

## Authentication Flow

| Step | Description |
|------|-------------|
| 1. Register | Users register with email, password, and role (default: Audience). |
| 2. Login | Credentials verified, JWT Access token issued. |
| 3. Access Token | Short-lived JWT (default: 30 min) for API authentication. |
| 4. Token Refresh | Endpoint to renew Access token (if implemented). |
| 5. Protected Endpoints | JWT validated, role checked for restricted resources. |

### JWT Token Example

```
{
  "sub": "user@example.com",
  "role": "organizer",
  "iat": 1730000000,
  "exp": 1730001800
}
```

---

## Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST   | `/user/register`         | Register new user (Audience/Organizer)         | No  |
| POST   | `/user/login`            | User login, returns JWT access token           | No  |
| POST   | `/user/forgot_password`  | Request password reset email                   | No  |
| POST   | `/user/reset_password`   | Reset password using token                     | No  |
| POST   | `/user/update_password`  | Update password (must be logged in)            | Yes |
| GET    | `/user/profile`          | Get own profile details                        | Yes |
| PUT    | `/user/profile`          | Update own profile                             | Yes |
| POST   | `/user/logout`           | Logout (token invalidation, if implemented)    | Yes |

---

## Role-Based Access Control (RBAC)

### Roles

| Role      | Description |
|-----------|-------------|
| Admin     | Full system control, manage users, events, facilities, payments, reports. |
| Organizer | Create/manage events, bookings, facilities, view own analytics. |
| Audience  | Book events, view own bookings, manage profile. |

### Permissions Matrix

| Resource   | Action   | Admin | Organizer | Audience |
|------------|----------|-------|-----------|----------|
| User       | Create   | Yes   | No        | No       |
| User       | Read     | Yes   | Yes (self)| Yes (self)|
| User       | Update   | Yes   | Yes (self)| Yes (self)|
| User       | Delete   | Yes   | No        | No       |
| Event      | Create   | Yes   | Yes       | No       |
| Event      | Read     | Yes   | Yes       | Yes      |
| Event      | Update   | Yes   | Yes (own) | No       |
| Event      | Delete   | Yes   | Yes (own) | No       |
| Booking    | Create   | Yes   | Yes       | Yes      |
| Booking    | Read     | Yes   | Yes       | Yes (own)|
| Booking    | Update   | Yes   | Yes (own) | No       |
| Booking    | Delete   | Yes   | Yes (own) | No       |
| Facility   | Create   | Yes   | Yes       | No       |
| Facility   | Read     | Yes   | Yes       | Yes      |
| Facility   | Update   | Yes   | Yes       | No       |
| Facility   | Delete   | Yes   | Yes       | No       |
| Payment    | Create   | Yes   | Yes       | Yes      |
| Payment    | Read     | Yes   | Yes       | Yes (own)|
| Payment    | Update   | Yes   | No        | No       |
| Payment    | Delete   | Yes   | No        | No       |
| CMS Content| Create   | Yes   | No        | No       |
| CMS Content| Read     | Yes   | Yes       | Yes      |
| CMS Content| Update   | Yes   | No        | No       |
| CMS Content| Delete   | Yes   | No        | No       |
| Backup     | Trigger  | Yes   | No        | No       |
| Backup     | Restore  | Yes   | No        | No       |

---

## Token Validation

Routes use FastAPI dependencies to validate JWT tokens and enforce role-based permissions.

Example role-based dependency:

```python
from fastapi import Depends, HTTPException
from app.auth.jwt_bearer import JWTBearer
from app.auth.jwt_handler import decode_jwt

def role_required(required_role: str):
    def wrapper(token: str = Depends(JWTBearer())):
        payload = decode_jwt(token)
        if payload['role'] != required_role:
            raise HTTPException(status_code=403, detail="Permission denied")
        return payload
    return wrapper

@router.post("/admin-only", dependencies=[Depends(role_required("admin"))])
async def admin_endpoint():
    return {"msg": "Accessible only to admins"}
```

- Store JWTs securely (HTTP-only cookies recommended for web clients).
- Attach Access tokens in `Authorization: Bearer <token>` header for API calls.

---

## Token Expiry Policy

| Token Type   | Lifetime   | Storage | Rotation |
|--------------|------------|---------|----------|
| Access Token | 30 minutes | Header  | Manual refresh or re-login |
| Refresh Token | 7 days | cookie | Revoked on logout or expiry |

---

## Example Token Flow

1. User logs in, receives Access token.
2. Use Access token for API calls.
3. On token expiry, re-login or use refresh endpoint (if implemented).
4. On logout, invalidate token (if implemented).

---




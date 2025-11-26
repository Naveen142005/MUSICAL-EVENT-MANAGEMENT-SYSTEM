# 📚 Musical Event Management System - Complete API Documentation

## 🎯 Overview
This document provides comprehensive API documentation for the Musical Event Management System (Thigalzhi®).  
The system supports three user roles: **Admin**, **Organizer**, and **Audience**.

**Base URL:** `http://localhost:8000`

## 📋 Table of Contents
1. [Authentication & User Management](#1-authentication--user-management)
2. [Events Management](#2-events-management)
3. [Booking Management](#3-booking-management)
4. [Payment Management](#4-payment-management)
5. [Facility Management](#5-facility-management)
6. [Feedback Management](#6-feedback-management)
7. [Query Management](#7-query-management)
8. [Reports](#8-reports)
9. [Dashboard](#9-dashboard)
10. [Content Management](#10-content-management)
11. [Terms and Conditions](#11-terms-and-conditions)
12. [Backup Management](#12-backup-management)

---

# 1. Authentication & User Management

## 1.1 Authentication Endpoints

### 🔹 1.1.1) User Registration

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ No | Register a new user account |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/register`
- **Headers:**
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": 9876543210,
  "password": "SecurePass@123",
  "role_id": 2
}
```

**Field Explanations:**
- `name` (string, required): User full name (2-100 characters, letters, spaces, periods only)
- `email` (string, required): Valid email address
- `phone` (integer, optional): 10-digit phone number starting with 6, 7, 8, or 9
- `password` (string, required): Min 6 chars with uppercase, lowercase, digit, special character
- `role_id` (integer, required): Role ID (1=Admin, 2=Organizer, 3=Audience)

**Response Format:**

**Status Codes:**
- `200 OK` - User registered successfully
- `400 Bad Request` - Validation error
- `409 Conflict` - User already exists

**Success Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": 9876543210,
  "status": true
}
```

**Response Field Explanations:**
- `id` (integer): Unique user identifier
- `name` (string): User full name
- `email` (string): User email address
- `phone` (integer): User phone number
- `status` (boolean): Account status (true=active, false=inactive)

---

### 🔹 1.1.2) User Login

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | ❌ No | Authenticate user and receive access token |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/login`
- **Headers:**
  - `Content-Type: application/x-www-form-urlencoded`

**Request Body (Form Data):**
- `username` (string, required): User email address
- `password` (string, required): User password

**Sample Request:**
```
username=john.doe@example.com
password=SecurePass@123
```

**Response Format:**

**Status Codes:**
- `200 OK` - Login successful
- `401 Unauthorized` - Invalid credentials
- `403 Forbidden` - Account deactivated

**Success Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Organizer"
  }
}
```

**Response Field Explanations:**
- `access_token` (string): JWT token for authentication
- `token_type` (string): Type of token (always "bearer")
- `user.id` (integer): User ID
- `user.name` (string): User name
- `user.email` (string): User email
- `user.role` (string): User role name

**Note:** A `refresh_token` cookie is set (HttpOnly, SameSite=Lax).

---

### 🔹 1.1.3) Get Current User Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/me` | ✔️ Yes | Get logged-in user profile information |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/me`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Cookie: refresh_token={token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Profile retrieved successfully
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - User not found

**Success Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": 9876543210,
  "status": true
}
```

---

### 🔹 1.1.4) Get Current User Details

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/me/details` | ✔️ Yes (Organizer/Audience) | Get extended user details |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/me/details`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Details retrieved successfully
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - No details found

**Success Response (200):**
```json
{
  "id": 1,
  "user_id": 1,
  "gender": "Male",
  "dob": "1990-05-15",
  "city": "Coimbatore",
  "state": "Tamil Nadu",
  "country": "India",
  "profile_image": "/uploads/profiles/20240115_123456.jpg"
}
```

**Response Field Explanations:**
- `id` (integer): Detail record ID
- `user_id` (integer): Associated user ID
- `gender` (string): User gender
- `dob` (date): Date of birth (YYYY-MM-DD)
- `city` (string): City name
- `state` (string): State name
- `country` (string): Country name
- `profile_image` (string): Profile image URL path

---

### 🔹 1.1.5) Update User Details

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH | `/details/update` | ✔️ Yes (Organizer/Audience) | Update user extended details |

**Request Format:**
- **Method:** PATCH
- **URL:** `http://localhost:8000/details/update`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "gender": "Male",
  "dob": "1990-05-15",
  "city": "Coimbatore",
  "state": "Tamil Nadu",
  "country": "India"
}
```

**Field Explanations:**
- `gender` (string, optional): One of: male, female, other, prefer not to say
- `dob` (date, optional): Date of birth (YYYY-MM-DD), user must be 13+ years
- `city` (string, optional): City name (2-100 characters)
- `state` (string, optional): State name (2-100 characters)
- `country` (string, optional): Country name (2-100 characters)

**Response Format:**

**Status Codes:**
- `200 OK` - Details updated successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
{
  "message": "Details updated successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "gender": "Male",
    "dob": "1990-05-15",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "country": "India"
  }
}
```

---

### 🔹 1.1.6) Upload Profile Image

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/details/upload-image` | ✔️ Yes (Organizer/Audience) | Upload or update profile picture |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/details/upload-image`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: multipart/form-data`

**Request Body (Form Data):**
- `file` (file, required): Image file (JPEG, PNG, JPG formats)

**Response Format:**

**Status Codes:**
- `200 OK` - Image uploaded successfully
- `400 Bad Request` - Invalid file format
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Upload failed

**Success Response (200):**
```json
{
  "image_url": "http://localhost:8000/uploads/profiles/20240115_123456.jpg"
}
```

**Response Field Explanations:**
- `image_url` (string): Full URL to uploaded image

---

### 🔹 1.1.7) Change Password

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/change-password` | ✔️ Yes (Organizer/Audience) | Change user password |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/change-password`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "old_password": "OldPass@123",
  "new_password": "NewPass@456"
}
```

**Field Explanations:**
- `old_password` (string, required): Current password
- `new_password` (string, required): New password (min 6 chars, must contain uppercase, lowercase, number, special character, cannot be same as old)

**Response Format:**

**Status Codes:**
- `200 OK` - Password changed successfully
- `400 Bad Request` - Old password incorrect or validation error
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

---

### 🔹 1.1.8) Forgot Password

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/forgot-password` | ✔️ Yes (Organizer/Audience) | Request password reset link |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/forgot-password`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Reset link sent
- `404 Not Found` - User not found

**Success Response (200):**
```json
{
  "message": "Password reset link sent to your email"
}
```

**Note:** Email with reset link sent. Link valid for 1 hour.

---

### 🔹 1.1.9) Reset Password Page

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reset-password?token={token}` | ❌ No | Render password reset form |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/reset-password?token={token}`
- **Query Parameters:**
  - `token` (string, required): Reset token from email

**Response:** HTML page with password reset form.

---

### 🔹 1.1.10) Send OTP for Password Reset

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/send-otp` | ❌ No | Send OTP to user email for verification |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/send-otp`
- **Headers:**
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "token": "reset_token_from_email"
}
```

**Field Explanations:**
- `token` (string, required): Reset token from password reset email

**Response Format:**

**Status Codes:**
- `200 OK` - OTP sent successfully
- `400 Bad Request` - Invalid or expired token
- `404 Not Found` - User not found

**Success Response (200):**
```json
{
  "message": "OTP sent to your email"
}
```

**Note:** 6-digit OTP sent to email. Valid for 5 minutes.

---

### 🔹 1.1.11) Confirm Password Reset

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/reset-password-confirm` | ❌ No | Reset password using OTP |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/reset-password-confirm`
- **Headers:**
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "otp": "123456",
  "new_password": "NewSecurePass@123",
  "confirm_password": "NewSecurePass@123"
}
```

**Field Explanations:**
- `token` (string, required): Reset token from email
- `otp` (string, required): 6-digit OTP from email
- `new_password` (string, required): New password (min 8 characters)
- `confirm_password` (string, required): Must match new_password

**Response Format:**

**Status Codes:**
- `200 OK` - Password reset successfully
- `400 Bad Request` - Passwords don't match, invalid/expired OTP
- `404 Not Found` - User not found

**Success Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

---

### 🔹 1.1.12) Logout

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/logout` | ❌ No | Logout user and clear refresh token |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/logout`

**Response Format:**

**Status Codes:**
- `200 OK` - Logged out successfully

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Note:** `refresh_token` cookie cleared from browser.

---


## 1.2 Admin User Management Endpoints

### 🔹 1.2.1) Get All Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/users/` | ✔️ Yes (Admin) | Retrieve list of all users |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/admin/users/`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Users retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 9876543210,
    "status": true
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": 9876543211,
    "status": true
  }
]
```

---

### 🔹 1.2.2) Get User by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/users/{user_id}` | ✔️ Yes (Admin) | Get specific user details |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/admin/users/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `user_id` (integer, required): User's unique identifier

**Response Format:**

**Status Codes:**
- `200 OK` - User retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - User not found

**Success Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": 9876543210,
  "status": true
}
```

---

### 🔹 1.2.3) Deactivate User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH | `/admin/users/{user_id}/deactivate` | ✔️ Yes (Admin) | Deactivate a user account |

**Request Format:**
- **Method:** PATCH
- **URL:** `http://localhost:8000/admin/users/1/deactivate`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `user_id` (integer, required): User's unique identifier

**Response Format:**

**Status Codes:**
- `200 OK` - User deactivated successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Cannot deactivate admin or user not found

**Success Response (200):**
```json
{
  "message": "User deactivated",
  "id": 1
}
```

---

### 🔹 1.2.4) Activate User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH | `/admin/users/{user_id}/activate` | ✔️ Yes (Admin) | Reactivate a user account |

**Request Format:**
- **Method:** PATCH
- **URL:** `http://localhost:8000/admin/users/1/activate`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `user_id` (integer, required): User's unique identifier

**Response Format:**

**Status Codes:**
- `200 OK` - User activated successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Cannot activate admin or user not found

**Success Response (200):**
```json
{
  "message": "User activated",
  "id": 1
}
```

---


# 2. Events Management

## 2.1 Event Creation & Management (Organizer)

### 🔹 2.1.1) Create New Event

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/events/create_new_event` | ✔️ Yes (Organizer) | Create a new event booking |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/events/create_new_event`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "event_name": "Rock Concert 2024",
  "description": "Annual rock music festival",
  "slot": "Night",
  "event_date": "2024-12-31",
  "venue_id": 1,
  "band_id": 1,
  "decoration_id": 1,
  "snacks_id": 1,
  "snacks_count": 100,
  "ticket_enabled": true,
  "ticket_open_date": "2024-12-01",
  "platinum_ticket_price": 5000,
  "platinum_ticket_count": 50,
  "gold_ticket_price": 3000,
  "gold_ticket_count": 100,
  "silver_ticket_price": 1500,
  "silver_ticket_count": 200,
  "payment_type": "Full Payment",
  "payment_mode": "UPI"
}
```

**Field Explanations:**
- `event_name` (string, required): Event name (alphanumeric only)
- `description` (string, required): Event description
- `slot` (string, required): Time slot - "Morning", "Afternoon", or "Night"
- `event_date` (date, required): Event date (YYYY-MM-DD), must be at least 1 day from today, max 365 days ahead
- `venue_id` (integer, optional): Venue facility ID (either venue_id or band_id required)
- `band_id` (integer, optional): Band facility ID
- `decoration_id` (integer, optional): Decoration facility ID
- `snacks_id` (integer, optional): Snacks package ID
- `snacks_count` (integer, optional): Number of snack boxes (required if snacks_id provided)
- `ticket_enabled` (boolean, optional): Enable ticket sales (default: false)
- `ticket_open_date` (date, optional): Date tickets go on sale (required if ticket_enabled=true)
- `platinum_ticket_price` (integer, optional): Platinum ticket price (required if ticket_enabled=true)
- `platinum_ticket_count` (integer, optional): Number of platinum tickets
- `gold_ticket_price` (integer, optional): Gold ticket price (must be less than platinum)
- `gold_ticket_count` (integer, optional): Number of gold tickets
- `silver_ticket_price` (integer, optional): Silver ticket price (must be less than gold)
- `silver_ticket_count` (integer, optional): Number of silver tickets
- `payment_type` (string, required): "Full Payment" or "Half Payment"
- `payment_mode` (string, required): "UPI", "Credit Card", or "Debit Card"

**Response Format:**

**Status Codes:**
- `200 OK` - Event created successfully
- `400 Bad Request` - Validation error or facility not available
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Facility not found or event date exceeds 1 year

**Success Response (200):**
```json
{
  "id": 1,
  "user_id": 1,
  "event_name": "Rock Concert 2024",
  "description": "Annual rock music festival",
  "slot": "Night",
  "event_date": "2024-12-31",
  "venue_id": 1,
  "band_id": 1,
  "decoration_id": 1,
  "snacks_id": 1,
  "snacks_count": 100,
  "ticket_enabled": true,
  "ticket_open_date": "2024-12-01",
  "platinum_ticket_price": 5000,
  "platinum_ticket_count": 50,
  "gold_ticket_price": 3000,
  "gold_ticket_count": 100,
  "silver_ticket_price": 1500,
  "silver_ticket_count": 200,
  "payment_type": "Full Payment",
  "payment_mode": "UPI",
  "status": "pending",
  "payment_id": 1,
  "total_amount": 150000,
  "paid_amount": 150000,
  "created_at": "2024-01-15"
}
```

**Response Field Explanations:**
- `id` (integer): Event ID
- `status` (string): Event status (pending, upcoming, ongoing, past, rescheduled, cancelled)
- `payment_id` (integer): Associated payment ID
- `total_amount` (integer): Total event cost
- `paid_amount` (integer): Amount paid so far
- `created_at` (date): Event creation date

---

### 🔹 2.1.2) Update Event Banner

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH | `/events/update_banner` | ✔️ Yes (Organizer) | Upload or update event banner image |

**Request Format:**
- **Method:** PATCH
- **URL:** `http://localhost:8000/events/update_banner?eventId=1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: multipart/form-data`

**Query Parameters:**
- `eventId` (integer, required): Event ID

**Request Body (Form Data):**
- `banner` (file, required): Banner image file (JPEG, PNG, JPG)

**Response Format:**

**Status Codes:**
- `200 OK` - Banner updated successfully
- `400 Bad Request` - Invalid event ID or file format
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "Status": "Image Inserted Successfully",
  "path": "http://localhost:8000/uploads/banners/event_1_banner.jpg"
}
```

---

### 🔹 2.1.3) Get Event Banner

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/events/show_banner` | ✔️ Yes (Organizer) | Retrieve event banner image URL |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/events/show_banner?event_id=1`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters:**
- `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - Banner retrieved successfully
- `404 Not Found` - Event or banner not found

**Success Response (200):**
```json
{
  "banner_url": "http://localhost:8000/uploads/banners/event_1_banner.jpg"
}
```

---

### 🔹 2.1.4) Get Event by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/events/events/{event_id}` | ✔️ Yes (Organizer/Admin) | Get detailed event information |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/events/events/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - Event retrieved successfully
- `400 Bad Request` - Invalid event ID
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "id": 1,
  "event_name": "Rock Concert 2024",
  "description": "Annual rock music festival",
  "slot": "Night",
  "event_date": "2024-12-31",
  "venue": {
    "id": 1,
    "name": "Grand Arena",
    "location": "Downtown",
    "capacity": 5000,
    "price": 50000
  },
  "band": {
    "id": 1,
    "name": "The Rockers",
    "genre": "Rock",
    "member_count": 5,
    "price": 75000
  },
  "decoration": {
    "id": 1,
    "name": "Premium Decor",
    "type": "Stage Lighting",
    "price": 15000
  },
  "snacks": {
    "id": 1,
    "snacks": ["Popcorn", "Soda", "Chips"],
    "price": 200
  },
  "snacks_count": 100,
  "ticket_enabled": true,
  "ticket_open_date": "2024-12-01",
  "platinum_ticket_price": 5000,
  "platinum_ticket_count": 50,
  "gold_ticket_price": 3000,
  "gold_ticket_count": 100,
  "silver_ticket_price": 1500,
  "silver_ticket_count": 200,
  "payment_type": "Full Payment",
  "payment_mode": "UPI",
  "status": "upcoming",
  "total_amount": 150000,
  "paid_amount": 150000,
  "user_id": 1,
  "created_at": "2024-01-15"
}
```

---

## 2.2 Event Search & Viewing (Audience)

### 🔹 2.2.1) Search Public Events

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/audience/search` | ✔️ Yes (Audience) | Search for available public events |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/audience/search`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (All Optional):**
- `event_name` (string): Filter by event name
- `facility_name` (string): Filter by facility (venue/band) name
- `start_date` (date): Filter from this date (YYYY-MM-DD)
- `end_date` (date): Filter until this date (YYYY-MM-DD)
- `min_price` (float): Minimum ticket price
- `max_price` (float): Maximum ticket price
- `slot` (string): Time slot - "Morning", "Afternoon", or "Night"

**Example:** `http://localhost:8000/audience/search?event_name=Rock&start_date=2024-12-01&end_date=2024-12-31&slot=Night`

**Response Format:**

**Status Codes:**
- `200 OK` - Events retrieved successfully
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - No events found

**Success Response (200):**
```json
[
  {
    "id": 1,
    "event_name": "Rock Concert 2024",
    "description": "Annual rock music festival",
    "event_date": "2024-12-31",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "venue_location": "Downtown",
    "band_name": "The Rockers",
    "min_ticket_price": 1500,
    "max_ticket_price": 5000,
    "banner_url": "http://localhost:8000/uploads/banners/event_1_banner.jpg"
  }
]
```

**Response Field Explanations:**
- `id` (integer): Event ID
- `event_name` (string): Event name
- `description` (string): Event description
- `event_date` (date): Event date
- `slot` (string): Time slot
- `venue_name` (string): Venue name (if applicable)
- `venue_location` (string): Venue location
- `band_name` (string): Band name (if applicable)
- `min_ticket_price` (integer): Lowest ticket price
- `max_ticket_price` (integer): Highest ticket price
- `banner_url` (string): Banner image URL

---

## 2.3 Organizer Bookings Management

### 🔹 2.3.1) Get Upcoming Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/my_bookings/upcoming` | ✔️ Yes (Organizer) | Get organizer's upcoming events |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/my_bookings/upcoming`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Bookings retrieved successfully
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
[
  {
    "id": 1,
    "event_name": "Rock Concert 2024",
    "event_date": "2024-12-31",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "band_name": "The Rockers",
    "status": "upcoming",
    "total_amount": 150000,
    "paid_amount": 150000,
    "payment_status": "completed",
    "created_at": "2024-01-15"
  }
]
```

---

### 🔹 2.3.2) Get Past Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/my_bookings/past` | ✔️ Yes (Organizer) | Get organizer's past events |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/my_bookings/past`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Bookings retrieved successfully
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
[
  {
    "id": 1,
    "event_name": "Rock Concert 2023",
    "event_date": "2023-12-31",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "status": "past",
    "total_amount": 150000,
    "paid_amount": 150000,
    "created_at": "2023-06-15"
  }
]
```

---

### 🔹 2.3.3) Get Pending Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/my_bookings/pending` | ✔️ Yes (Organizer) | Get events with pending payments |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/my_bookings/pending`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Bookings retrieved successfully
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
[
  {
    "id": 2,
    "event_name": "Jazz Night 2024",
    "event_date": "2024-11-15",
    "slot": "Night",
    "venue_name": "City Hall",
    "status": "pending",
    "total_amount": 100000,
    "paid_amount": 50000,
    "pending_amount": 50000,
    "payment_status": "partial",
    "created_at": "2024-01-10"
  }
]
```

**Response Field Explanations:**
- `pending_amount` (integer): Amount still to be paid

---

### 🔹 2.3.4) Get Ongoing Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/my_bookings/ongoing` | ✔️ Yes (Organizer) | Get currently ongoing events |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/my_bookings/ongoing`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Bookings retrieved successfully
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
[
  {
    "id": 3,
    "event_name": "Live Concert",
    "event_date": "2024-01-15",
    "slot": "Night",
    "venue_name": "Stadium",
    "status": "ongoing",
    "total_amount": 200000,
    "paid_amount": 200000
  }
]
```

---

### 🔹 2.3.5) Pay Pending Amount

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/pay_pending_amount/{event_id}` | ✔️ Yes (Organizer) | Pay remaining balance for event |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/pay_pending_amount/2?payment_mode=UPI`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Query Parameters:**
- `payment_mode` (string, optional): "UPI", "Credit Card", or "Debit Card" (default: UPI)

**Response Format:**

**Status Codes:**
- `200 OK` - Payment successful
- `400 Bad Request` - No pending amount or event not eligible
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "message": "Payment successful",
  "event_id": 2,
  "payment_id": 3,
  "amount_paid": 50000,
  "total_amount": 100000,
  "payment_status": "completed"
}
```

---


## 2.4 Event Rescheduling

### 🔹 2.4.1) Check Facilities Availability

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/events/facilities` | ✔️ Yes (Organizer) | Check facility availability for upcoming dates |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/events/facilities`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters:**
- `slot` (string, required): "Morning", "Afternoon", or "Night"
- `venue_id` (integer, optional): Venue ID to check
- `band_id` (integer, optional): Band ID to check
- `decoration_id` (integer, optional): Decoration ID to check
- `no_days` (integer, optional): Number of days to check (default: 10)

**Example:** `http://localhost:8000/events/facilities?slot=Night&venue_id=1&band_id=1&no_days=30`

**Response Format:**

**Status Codes:**
- `200 OK` - Availability retrieved successfully
- `401 Unauthorized` - Not authenticated

**Success Response (200):**
```json
{
  "available_dates": [
    "2024-02-15",
    "2024-02-16",
    "2024-02-20"
  ],
  "facility_details": {
    "venue": {
      "id": 1,
      "name": "Grand Arena",
      "available": true
    },
    "band": {
      "id": 1,
      "name": "The Rockers",
      "available": true
    }
  }
}
```

---

### 🔹 2.4.2) Get Possible Reschedule Dates

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/events/get_reschedule_dates` | ✔️ Yes (Organizer) | Get available dates for rescheduling event |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/events/get_reschedule_dates`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters:**
- `eventId` (integer, required): Event ID to reschedule
- `start_date` (date, required): Start date range (YYYY-MM-DD)
- `end_date` (date, required): End date range (YYYY-MM-DD)
- `slot` (string, required): Time slot

**Example:** `http://localhost:8000/events/get_reschedule_dates?eventId=1&start_date=2024-02-01&end_date=2024-02-28&slot=Night`

**Response Format:**

**Status Codes:**
- `200 OK` - Available dates retrieved
- `400 Bad Request` - Invalid event ID
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "event_id": 1,
  "current_date": "2024-12-31",
  "available_dates": [
    "2024-02-15",
    "2024-02-22",
    "2024-02-28"
  ]
}
```

---

### 🔹 2.4.3) Reschedule Event

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH | `/events/reschedule_event` | ✔️ Yes (Organizer) | Reschedule an event to a new date |

**Request Format:**
- **Method:** PATCH
- **URL:** `http://localhost:8000/events/reschedule_event`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "event_id": 1,
  "excepted_date": "2024-02-15",
  "ticket_opening_date": "2024-01-20",
  "slot": "Night"
}
```

**Field Explanations:**
- `event_id` (integer, required): Event ID to reschedule
- `excepted_date` (date, required): New event date (YYYY-MM-DD)
- `ticket_opening_date` (date, optional): New ticket opening date (if tickets enabled)
- `slot` (string, required): Time slot for new date

**Response Format:**

**Status Codes:**
- `200 OK` - Event rescheduled successfully
- `400 Bad Request` - Date not available or validation error
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "message": "Event rescheduled successfully",
  "event_id": 1,
  "old_date": "2024-12-31",
  "new_date": "2024-02-15",
  "status": "rescheduled",
  "notification_sent": true
}
```

**Note:** Email notifications are sent to all ticket holders about the reschedule.

---

## 2.5 Event Cancellation

### 🔹 2.5.1) Cancel Event

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/events/event_cancel/{event_id}` | ✔️ Yes (Organizer) | Cancel an event and process refunds |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/events/event_cancel/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID to cancel

**Request Body:**
```json
{
  "reason": "Unforeseen circumstances"
}
```

**Field Explanations:**
- `reason` (string, required): Reason for cancellation

**Response Format:**

**Status Codes:**
- `200 OK` - Event cancelled successfully
- `400 Bad Request` - Event cannot be cancelled (already past or cancelled)
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "message": "Event cancelled successfully",
  "event_id": 1,
  "refund_initiated": true,
  "total_refund_amount": 450000,
  "refund_status": "processing",
  "refund_days": "5-7 business days"
}
```

**Response Field Explanations:**
- `refund_initiated` (boolean): Whether refund process has started
- `total_refund_amount` (integer): Total amount being refunded to ticket holders
- `refund_status` (string): Status of refund (processing, completed)
- `refund_days` (string): Expected refund timeline

**Note:** Refunds are automatically processed for all ticket holders. Organizer gets partial refund based on cancellation timing.

---

## 2.6 Admin Event Management

### 🔹 2.6.1) Get All Booked Events (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/booked-events` | ✔️ Yes (Admin) | Get all events with advanced filtering |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/admin/booked-events`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (All Optional):**
- `start_date` (date): Filter from this date
- `end_date` (date): Filter until this date
- `search` (string): Global search across event fields
- `status` (string): Filter by status (upcoming, past, ongoing, rescheduled, cancelled)
- `slot` (string): Filter by slot (Morning, Afternoon, Night)
- `date_type` (string): Filter by "booked_date" or "event_date"

**Example:** `http://localhost:8000/admin/booked-events?status=upcoming&slot=Night&date_type=event_date`

**Response Format:**

**Status Codes:**
- `200 OK` - Events retrieved successfully
- `400 Bad Request` - Invalid date range
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - No events found

**Success Response (200):**
```json
[
  {
    "id": 1,
    "event_name": "Rock Concert 2024",
    "organizer": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "event_date": "2024-12-31",
    "booked_date": "2024-01-15",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "band_name": "The Rockers",
    "status": "upcoming",
    "total_amount": 150000,
    "paid_amount": 150000,
    "payment_status": "completed",
    "tickets_sold": 250,
    "total_tickets": 350
  }
]
```

---

## 2.7 Tickets & Invoices

### 🔹 2.7.1) View Ticket Details for Event

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/view_ticket_details/{event_id}` | ✔️ Yes (Organizer) | Get ticket booking details for an event |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/view_ticket_details/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - Ticket details retrieved
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "event_id": 1,
  "event_name": "Rock Concert 2024",
  "tickets": {
    "platinum": {
      "price": 5000,
      "total": 50,
      "sold": 45,
      "available": 5,
      "revenue": 225000
    },
    "gold": {
      "price": 3000,
      "total": 100,
      "sold": 85,
      "available": 15,
      "revenue": 255000
    },
    "silver": {
      "price": 1500,
      "total": 200,
      "sold": 150,
      "available": 50,
      "revenue": 225000
    }
  },
  "total_revenue": 705000,
  "total_sold": 280,
  "total_available": 70,
  "bookings": [
    {
      "booking_id": 1,
      "user_name": "Jane Smith",
      "user_email": "jane@example.com",
      "platinum": 2,
      "gold": 1,
      "silver": 0,
      "total_tickets": 3,
      "total_price": 13000,
      "booked_at": "2024-01-20"
    }
  ]
}
```

---

### 🔹 2.7.2) Download Invoice

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/download/{event_id}` | ✔️ Yes (Organizer) | Download event invoice PDF |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/download/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - PDF file returned
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Event or invoice not found

**Success Response (200):**
Returns PDF file with headers:
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="Invoice_Event_1.pdf"`

---


# 3. Booking Management

## 3.1 Admin Booking Management

### 🔹 3.1.1) Get All Bookings (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/all-bookings | ✔️ Yes (Admin) | Get all audience bookings with advanced filtering |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/all-bookings
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- start_date (string): Start date (YYYY-MM-DD)
- nd_date (string): End date (YYYY-MM-DD)
- search (string): Search by event name
- date_type (string): Filter by "booked_date" or "event_date" (default: booked_date)
- status (string): Filter by status (booked, cancelled)
- sort_by (string): Sort by "total_amount" or "total_tickets"

**Example:** http://localhost:8000/bookings/all-bookings?status=booked&sort_by=total_amount&date_type=event_date

**Response Format:**

**Status Codes:**
- 200 OK - Bookings retrieved successfully
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Not an admin

**Success Response (200):**
`json
[
  {
    "booking_id": 1,
    "user": {
      "id": 5,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "event": {
      "id": 1,
      "name": "Rock Concert 2024",
      "date": "2024-12-31"
    },
    "tickets": [
      {
        "type": "Platinum",
        "quantity": 2,
        "subtotal": 10000
      },
      {
        "type": "Gold",
        "quantity": 1,
        "subtotal": 3000
      }
    ],
    "total_tickets": 3,
    "total_price": 13000,
    "status": "booked",
    "booked_date": "2024-01-20",
    "payment_mode": "UPI"
  }
]
`

---

## 3.2 Audience Booking Operations

### 🔹 3.2.1) Get Public Events

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/get_events | ✔️ Yes (Audience) | Get list of events available for booking |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/get_events
- **Headers:**
  - Authorization: Bearer {access_token}

**Response Format:**

**Status Codes:**
- 200 OK - Events retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "id": 1,
    "event_name": "Rock Concert 2024",
    "description": "Annual rock music festival",
    "event_date": "2024-12-31",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "ticket_open_date": "2024-12-01",
    "tickets_available": true,
    "min_price": 1500,
    "max_price": 5000
  }
]
`

---

### 🔹 3.2.2) Get Available Tickets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/available/{event_id} | ✔️ Yes (Audience) | Get available ticket types and counts for an event |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/available/1
- **Headers:**
  - Authorization: Bearer {access_token}
- **Path Parameters:**
  - vent_id (integer, required): Event ID

**Response Format:**

**Status Codes:**
- 200 OK - Tickets retrieved successfully
- 401 Unauthorized - Not authenticated
- 404 Not Found - Event not available or no tickets found

**Success Response (200):**
`json
{
  "event_id": 1,
  "event_name": "Rock Concert 2024",
  "event_date": "2024-12-31",
  "tickets": [
    {
      "type": "Platinum",
      "price": 5000,
      "available": 5,
      "total": 50
    },
    {
      "type": "Gold",
      "price": 3000,
      "available": 15,
      "total": 100
    },
    {
      "type": "Silver",
      "price": 1500,
      "available": 50,
      "total": 200
    }
  ]
}
`

---

### 🔹 3.2.3) Book Event Tickets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /bookings/book_event/ | ✔️ Yes (Audience) | Book tickets for an event |

**Request Format:**
- **Method:** POST
- **URL:** http://localhost:8000/bookings/book_event/
- **Headers:**
  - Authorization: Bearer {access_token}
  - Content-Type: application/json

**Request Body:**
`json
{
  "event_id": 1,
  "tickets": [
    {
      "ticket_type": "Platinum",
      "quantity": 2
    },
    {
      "ticket_type": "Gold",
      "quantity": 1
    }
  ],
  "payment_mode": "UPI"
}
`

**Field Explanations:**
- vent_id (integer, required): Event ID to book
- 	ickets (array, required): Array of ticket requests
  - 	icket_type (string, required): "Platinum", "Gold", or "Silver"
  - quantity (integer, required): Number of tickets (must be > 0)
- payment_mode (string, required): "UPI", "Credit Card", or "Debit Card"

**Response Format:**

**Status Codes:**
- 200 OK - Booking successful
- 400 Bad Request - Validation error or tickets not available
- 401 Unauthorized - Not authenticated
- 404 Not Found - Event not available for booking

**Success Response (200):**
`json
{
  "booking_id": 1,
  "user_id": 5,
  "event_id": 1,
  "tickets": [
    {
      "ticket_type": "Platinum",
      "quantity": 2,
      "subtotal": 10000
    },
    {
      "ticket_type": "Gold",
      "quantity": 1,
      "subtotal": 3000
    }
  ],
  "total_tickets": 3,
  "total_price": 13000,
  "status": "booked",
  "payment_status": "completed",
  "ticket_download_available": true
}
`

---

### 🔹 3.2.4) Get Upcoming Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/upcoming_bookings | ✔️ Yes (Audience) | Get user's upcoming event bookings |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/upcoming_bookings
- **Headers:**
  - Authorization: Bearer {access_token}

**Response Format:**

**Status Codes:**
- 200 OK - Bookings retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "booking_id": 1,
    "event_id": 1,
    "event_name": "Rock Concert 2024",
    "event_date": "2024-12-31",
    "slot": "Night",
    "venue_name": "Grand Arena",
    "total_tickets": 3,
    "total_price": 13000,
    "status": "booked",
    "booked_at": "2024-01-20"
  }
]
`

---

### 🔹 3.2.5) Get Past Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/past_bookings | ✔️ Yes (Audience) | Get user's past event bookings |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/past_bookings
- **Headers:**
  - Authorization: Bearer {access_token}

**Response Format:**

**Status Codes:**
- 200 OK - Bookings retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "booking_id": 2,
    "event_id": 2,
    "event_name": "Jazz Night 2023",
    "event_date": "2023-11-15",
    "slot": "Night",
    "venue_name": "City Hall",
    "total_tickets": 2,
    "total_price": 6000,
    "status": "booked",
    "booked_at": "2023-10-01"
  }
]
`

---

### 🔹 3.2.6) Cancel Booking

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /bookings/booking_cancel/{booking_id} | ✔️ Yes (Audience) | Cancel a booking and get refund |

**Request Format:**
- **Method:** POST
- **URL:** http://localhost:8000/bookings/booking_cancel/1
- **Headers:**
  - Authorization: Bearer {access_token}
  - Content-Type: application/json
- **Path Parameters:**
  - ooking_id (integer, required): Booking ID to cancel

**Request Body:**
`json
{
  "reason": "Unable to attend"
}
`

**Field Explanations:**
- 
eason (string, required): Reason for cancellation

**Response Format:**

**Status Codes:**
- 200 OK - Booking cancelled successfully
- 400 Bad Request - Booking cannot be cancelled (event already passed)
- 401 Unauthorized - Not authenticated
- 404 Not Found - Booking not found

**Success Response (200):**
`json
{
  "message": "Booking cancelled successfully",
  "booking_id": 1,
  "refund_amount": 13000,
  "refund_id": 5,
  "refund_status": "processing",
  "expected_refund_days": "5-7 business days"
}
`

---

### 🔹 3.2.7) Check Refund Status

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/refund_status/{refund_id} | ❌ No | Check status of refund |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/refund_status/5
- **Path Parameters:**
  - 
efund_id (integer, required): Refund ID

**Response Format:**

**Status Codes:**
- 200 OK - Refund status retrieved
- 404 Not Found - Refund not found

**Success Response (200):**
`json
{
  "id": 5,
  "payment_id": 1,
  "refund_reason": "Unable to attend",
  "refund_amount": 13000,
  "created_at": "2024-01-25",
  "status": "completed"
}
`

**Response Field Explanations:**
- id (integer): Refund ID
- payment_id (integer): Associated payment ID
- 
efund_reason (string): Reason for refund
- 
efund_amount (integer): Amount being refunded
- created_at (string): When refund was initiated
- status (string): Refund status (processing, completed, failed)

---

### 🔹 3.2.8) Download Ticket

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /bookings/download/{booking_id} | ✔️ Yes (Audience) | Download ticket PDF |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/bookings/download/1
- **Headers:**
  - Authorization: Bearer {access_token}
- **Path Parameters:**
  - ooking_id (integer, required): Booking ID

**Response Format:**

**Status Codes:**
- 200 OK - PDF file returned
- 401 Unauthorized - Not authenticated
- 404 Not Found - Booking or ticket not found

**Success Response (200):**
Returns PDF file with headers:
- Content-Type: application/pdf
- Content-Disposition: attachment; filename="Thigalzhi_Ticket_1.pdf"

---



# 4. Payment Management

## 4.1 Payment Endpoints (Admin)

### 🔹 4.1.1) Get All Payments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /payments/all | ✔️ Yes (Admin) | Get all payments with filtering |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/payments/all
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- start_date (date): Filter from this payment date (YYYY-MM-DD)
- nd_date (date): Filter until this payment date (YYYY-MM-DD)
- search (string): Search by event or user name
- status (string): Payment status (pending, completed, failed, refunded)
- 
ole (string): User role filter (audience, organizer)

**Example:** http://localhost:8000/payments/all?status=completed&role=organizer&start_date=2024-01-01

**Response Format:**

**Status Codes:**
- 200 OK - Payments retrieved successfully
- 400 Bad Request - Invalid date range or role
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Not an admin
- 404 Not Found - No payments found

**Success Response (200):**
`json
{
  "total_payments": 150,
  "total_amount": 5000000,
  "payments": [
    {
      "payment_id": 1,
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "Organizer"
      },
      "event_name": "Rock Concert 2024",
      "amount": 150000,
      "payment_mode": "UPI",
      "payment_type": "Full Payment",
      "status": "completed",
      "payment_date": "2024-01-15"
    }
  ]
}
`

---

### 🔹 4.1.2) Get Escrows

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /payments/escrows | ✔️ Yes (Admin) | Get escrow account details with filtering |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/payments/escrows
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- min_amount (float): Minimum total amount
- max_amount (float): Maximum total amount
- sort_by (string): Field to sort by (total_amount, created_at)
- sort_order (string): Sort order (asc, desc)

**Example:** http://localhost:8000/payments/escrows?min_amount=100000&sort_by=total_amount&sort_order=desc

**Response Format:**

**Status Codes:**
- 200 OK - Escrows retrieved successfully
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Not an admin

**Success Response (200):**
`json
[
  {
    "escrow_id": 1,
    "total_amount": 500000,
    "available_amount": 450000,
    "locked_amount": 50000,
    "created_at": "2024-01-01",
    "last_updated": "2024-01-20"
  }
]
`

---

# 5. Facility Management

## 5.1 View Facilities (Public/Organizer/Audience)

### 🔹 5.1.1) Get All Venues

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/get_venues | ✔️ Yes (Organizer/Audience) | Get list of available venues with filtering and sorting |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/get_venues
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- 
ame (string): Filter by venue name
- location (string): Filter by location (partial match)
- min_capacity (integer): Minimum capacity
- max_price (float): Maximum price
- sort_by (string): Sort by field (price, name, capacity)
- order (string): Sort order (asc, desc)

**Example:** http://localhost:8000/facilities/get_venues?location=Downtown&min_capacity=1000&sort_by=price&order=asc

**Response Format:**

**Status Codes:**
- 200 OK - Venues retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "id": 1,
    "name": "Grand Arena",
    "location": "Downtown",
    "capacity": 5000,
    "price": 50000,
    "status": "available",
    "image_url": "http://localhost:8000/uploads/venues/venue_1.jpg"
  },
  {
    "id": 2,
    "name": "City Hall",
    "location": "Central",
    "capacity": 3000,
    "price": 35000,
    "status": "available",
    "image_url": "http://localhost:8000/uploads/venues/venue_2.jpg"
  }
]
`

---

### 🔹 5.1.2) Get All Bands

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/get_bands | ✔️ Yes (Organizer/Audience) | Get list of available bands with filtering |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/get_bands
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- 
ame (string): Filter by band name
- genre (string): Filter by music genre
- member_count (integer): Filter by member count
- max_price (float): Maximum price
- sort_by (string): Sort by field (price, name, member_count)
- order (string): Sort order (asc, desc)

**Example:** http://localhost:8000/facilities/get_bands?genre=Rock&max_price=100000&sort_by=price

**Response Format:**

**Status Codes:**
- 200 OK - Bands retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "id": 1,
    "name": "The Rockers",
    "genre": "Rock",
    "member_count": 5,
    "price": 75000,
    "status": "available",
    "image_url": "http://localhost:8000/uploads/bands/band_1.jpg"
  }
]
`

---

### 🔹 5.1.3) Get All Decorations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/get_decorations | ✔️ Yes (Organizer/Audience) | Get list of available decorations |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/get_decorations
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- 
ame (string): Filter by decoration name
- 	ype (string): Filter by decoration type
- max_price (float): Maximum price
- sort_by (string): Sort by field (price, name)
- order (string): Sort order (asc, desc)

**Response Format:**

**Status Codes:**
- 200 OK - Decorations retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "id": 1,
    "name": "Premium Decor",
    "type": "Stage Lighting",
    "price": 15000,
    "status": "available",
    "image_url": "http://localhost:8000/uploads/decorations/decor_1.jpg"
  }
]
`

---

### 🔹 5.1.4) Get All Snacks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/get_snacks | ✔️ Yes (Organizer/Audience) | Get list of available snack packages |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/get_snacks
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters (All Optional):**
- price (float): Filter by exact price
- sort_by (string): Sort by field (price, id)
- order (string): Sort order (asc, desc)

**Response Format:**

**Status Codes:**
- 200 OK - Snacks retrieved successfully
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
[
  {
    "id": 1,
    "snacks": ["Popcorn", "Soda", "Chips"],
    "price": 200
  }
]
`

---

### 🔹 5.1.5) Check Facility Availability

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/facility/ | ✔️ Yes (Organizer) | Check if a specific facility is available on a date |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/facility/
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters:**
- id (integer, required): Facility ID
- acility_name (string, required): Facility type (venue/band/decoration)
- date (date, required): Expected date (YYYY-MM-DD)
- slot (string, required): Time slot (Morning/Afternoon/Night)

**Example:** http://localhost:8000/facilities/facility/?id=1&facility_name=venue&date=2024-12-31&slot=Night

**Response Format:**

**Status Codes:**
- 200 OK - Availability checked
- 400 Bad Request - Invalid facility ID
- 401 Unauthorized - Not authenticated

**Success Response (200):**
`json
{
  "res": true,
  "mes": "venue id_1 is available on 2024-12-31"
}
`

**OR if not available:**
`json
{
  "res": false,
  "mes": "venue id_1 is not available on 2024-12-31"
}
`

---

### 🔹 5.1.6) Get Facility Booked Events (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /facilities/booked-events | ✔️ Yes (Admin) | Get all events using a specific facility |

**Request Format:**
- **Method:** GET
- **URL:** http://localhost:8000/facilities/booked-events
- **Headers:**
  - Authorization: Bearer {access_token}

**Query Parameters:**
- acility_type_id (integer, required): Facility type ID (1=Venue, 2=Band, 3=Decoration, 4=Snacks)
- acility_id (integer, required): Specific facility ID
- start_date (date, required): Start date (YYYY-MM-DD)
- nd_date (date, required): End date (YYYY-MM-DD)

**Example:** http://localhost:8000/facilities/booked-events?facility_type_id=1&facility_id=1&start_date=2024-01-01&end_date=2024-12-31

**Response Format:**

**Status Codes:**
- 200 OK - Events retrieved successfully
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Not an admin
- 404 Not Found - No events found

**Success Response (200):**
`json
[
  {
    "event_id": 1,
    "name": "Rock Concert 2024",
    "event_date": "2024-12-31",
    "created_at": "2024-01-15"
  }
]
`

---


## 5.2 Venue Management (Admin Only)

### 🔹 5.2.1) Create Venue

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/facilities/venues` | ✔️ Yes (Admin) | Create a new venue |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/facilities/venues`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "Grand Arena",
  "location": "Downtown",
  "capacity": 5000,
  "price": 50000,
  "status": "available"
}
```

**Field Explanations:**
- `name` (string, required): Venue name (2-100 characters)
- `location` (string, required): Venue location (2-200 characters)
- `capacity` (integer, optional): Venue capacity (must be > 0)
- `price` (float, optional): Rental price (must be > 0)
- `status` (string, optional): Status (available/unavailable, default: available)

**Response Format:**

**Status Codes:**
- `200 OK` - Venue created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Grand Arena",
  "location": "Downtown",
  "capacity": 5000,
  "price": 50000,
  "status": "available"
}
```

---

### 🔹 5.2.2) Get Venue by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/facilities/venues/{venue_id}` | ✔️ Yes (Admin) | Get specific venue details |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/facilities/venues/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `venue_id` (integer, required): Venue ID

**Response Format:**

**Status Codes:**
- `200 OK` - Venue retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Venue not found

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Grand Arena",
  "location": "Downtown",
  "capacity": 5000,
  "price": 50000,
  "status": "available",
  "image_url": "http://localhost:8000/uploads/venues/venue_1.jpg"
}
```

---

### 🔹 5.2.3) Update Venue

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/venues/{venue_id}` | ✔️ Yes (Admin) | Update venue details |

**Request Format:**
- **Method:** PUT
- **URL:** `http://localhost:8000/facilities/venues/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`
- **Path Parameters:**
  - `venue_id` (integer, required): Venue ID

**Request Body:**
```json
{
  "name": "Grand Arena Updated",
  "location": "Downtown Central",
  "capacity": 5500,
  "price": 55000,
  "status": "available"
}
```

**Field Explanations:**
All fields are optional; only include fields you want to update.

**Response Format:**

**Status Codes:**
- `200 OK` - Venue updated successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Venue not found

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Grand Arena Updated",
  "location": "Downtown Central",
  "capacity": 5500,
  "price": 55000,
  "status": "available"
}
```

---

### 🔹 5.2.4) Update Venue Image

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/venues/{venue_id}/image` | ✔️ Yes (Admin) | Update venue image |

**Request Format:**
- **Method:** PUT
- **URL:** `http://localhost:8000/facilities/venues/1/image`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: multipart/form-data`
- **Path Parameters:**
  - `venue_id` (integer, required): Venue ID

**Request Body (Form Data):**
- `image` (file, required): Image file (JPEG, PNG, JPG)

**Response Format:**

**Status Codes:**
- `200 OK` - Image updated successfully
- `400 Bad Request` - Invalid file format
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Venue not found

**Success Response (200):**
```json
{
  "message": "Venue image updated successfully",
  "image_url": "http://localhost:8000/uploads/venues/venue_1.jpg"
}
```

---

### 🔹 5.2.5) Delete Venue

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/facilities/venues/{venue_id}` | ✔️ Yes (Admin) | Delete a venue |

**Request Format:**
- **Method:** DELETE
- **URL:** `http://localhost:8000/facilities/venues/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `venue_id` (integer, required): Venue ID

**Response Format:**

**Status Codes:**
- `200 OK` - Venue deleted successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Venue not found

**Success Response (200):**
```json
{
  "message": "Venue deleted successfully"
}
```

---


## 5.3 Band Management (Admin Only)

### 🔹 5.3.1) Create Band

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/facilities/bands` | ✔️ Yes (Admin) | Create a new band |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/facilities/bands`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body Example:**
```json
{
  "name": "Band Name",
  "genre": "Rock",
  "member_count": 5,
  
  
  "price": 10000,
  "status": "available"
}
```

**Response Format:**

**Status Codes:**
- `200 OK` - Band created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
Returns created band object.

---

### 🔹 5.3.2) Get Band by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/facilities/bands/{{band_id}}` | ✔️ Yes (Admin) | Get specific band details |

---

### 🔹 5.3.3) Update Band

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/bands/{{band_id}}` | ✔️ Yes (Admin) | Update band details |

---

### 🔹 5.3.4) Update Band Image

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/bands/{{band_id}}/image` | ✔️ Yes (Admin) | Update band image |

---

### 🔹 5.3.5) Delete Band

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/facilities/bands/{{band_id}}` | ✔️ Yes (Admin) | Delete a band |

**Request/Response formats follow same pattern as Venue CRUD operations.**

---


## 5.4 Decoration Management (Admin Only)

### 🔹 5.4.1) Create Decoration

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/facilities/decorations` | ✔️ Yes (Admin) | Create a new decoration |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/facilities/decorations`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body Example:**
```json
{
  "name": "Decoration Name",
  
  
  "type": "Stage Lighting",
  
  "price": 10000,
  "status": "available"
}
```

**Response Format:**

**Status Codes:**
- `200 OK` - Decoration created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
Returns created decoration object.

---

### 🔹 5.4.2) Get Decoration by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/facilities/decorations/{{decoration_id}}` | ✔️ Yes (Admin) | Get specific decoration details |

---

### 🔹 5.4.3) Update Decoration

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/decorations/{{decoration_id}}` | ✔️ Yes (Admin) | Update decoration details |

---

### 🔹 5.4.4) Update Decoration Image

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/decorations/{{decoration_id}}/image` | ✔️ Yes (Admin) | Update decoration image |

---

### 🔹 5.4.5) Delete Decoration

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/facilities/decorations/{{decoration_id}}` | ✔️ Yes (Admin) | Delete a decoration |

**Request/Response formats follow same pattern as Venue CRUD operations.**

---


## 5.5 Snack Management (Admin Only)

### 🔹 5.5.1) Create Snack

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/facilities/snacks` | ✔️ Yes (Admin) | Create a new snack |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/facilities/snacks`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

**Request Body Example:**
```json
{
  "name": "Snack Name",
  
  
  
  "snacks": ["Popcorn", "Soda"],
  "price": 10000,
  "status": "available"
}
```

**Response Format:**

**Status Codes:**
- `200 OK` - Snack created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
Returns created snack object.

---

### 🔹 5.5.2) Get Snack by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/facilities/snacks/{{snack_id}}` | ✔️ Yes (Admin) | Get specific snack details |

---

### 🔹 5.5.3) Update Snack

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/snacks/{{snack_id}}` | ✔️ Yes (Admin) | Update snack details |

---

### 🔹 5.5.4) Update Snack Image

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/facilities/snacks/{{snack_id}}/image` | ✔️ Yes (Admin) | Update snack image |

---

### 🔹 5.5.5) Delete Snack

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/facilities/snacks/{{snack_id}}` | ✔️ Yes (Admin) | Delete a snack |

**Request/Response formats follow same pattern as Venue CRUD operations.**

---



# 6. Feedback Management

## 6.1 Feedback Endpoints

### 🔹 6.1.1) Send Feedback Link

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/send-feedback` | ❌ No | Send feedback link to user via email |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/send-feedback?id=1&user_id=1`
- **Query Parameters:**
  - `id` (integer, required): Event ID or Booking ID
  - `user_id` (integer, required): User ID to send feedback to

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback link sent successfully
- `404 Not Found` - Event/Booking not found
- `500 Internal Server Error` - Failed to send email

**Success Response (200):**
```json
{
  "message": "Feedback link sent successfully",
  "email_sent_to": "user@example.com"
}
```

**Note:** 
- If `id` is an Event ID: sends feedback link to organizer
- If `id` is a Booking ID: sends feedback link to audience member

---

### 🔹 6.1.2) Feedback Form

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/form?token={token}` | ❌ No | Display feedback form |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/form?token={token}`
- **Query Parameters:**
  - `token` (string, required): Encoded token from feedback email

**Response:** Returns HTML feedback form page.

---

### 🔹 6.1.3) Submit Feedback

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/submit` | ❌ No | Submit feedback form |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/submit`
- **Headers:**
  - `Content-Type: application/x-www-form-urlencoded`

**Request Body (Form Data):**
- `token` (string, required): Token from feedback form
- `feedback_rating` (integer, required): Rating (1-5)
- `feedback_summary` (string, optional): Feedback text

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback submitted successfully
- `400 Bad Request` - Invalid token or rating

**Success Response (200):**
```json
{
  "status": "Feedback submitted successfully",
  "feedback_id": 1
}
```

---

### 🔹 6.1.4) Get All Feedback (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ✔️ Yes (Admin) | Get all feedback with filtering |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (All Optional):**
- `rating` (integer): Filter by feedback rating (1-5)
- `status` (string): Filter by status (submitted, read)

**Example:** `http://localhost:8000/?rating=5&status=submitted`

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 5,
    "event_id": 1,
    "feedback_rating": 5,
    "feedback_summary": "Great event!",
    "status": "submitted",
    "created_at": "2024-01-20"
  }
]
```

---

### 🔹 6.1.5) Mark Feedback as Read (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/{feedback_id}/read` | ✔️ Yes (Admin) | Mark feedback as read |

**Request Format:**
- **Method:** PUT
- **URL:** `http://localhost:8000/1/read`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `feedback_id` (integer, required): Feedback ID

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback marked as read
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Feedback not found

**Success Response (200):**
```json
{
  "message": "Feedback marked as read",
  "feedback_id": 1
}
```

---

### 🔹 6.1.6) Delete Feedback (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/{feedback_id}` | ✔️ Yes (Admin) | Delete feedback |

**Request Format:**
- **Method:** DELETE
- **URL:** `http://localhost:8000/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `feedback_id` (integer, required): Feedback ID

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback deleted successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Feedback not found

**Success Response (200):**
```json
{
  "message": "Feedback deleted successfully"
}
```

---

### 🔹 6.1.7) Get Event Feedback (Organizer)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/get_feedback/{event_id}` | ✔️ Yes (Organizer) | Get feedback for organizer's event |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/get_feedback/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - Feedback retrieved successfully
- `401 Unauthorized` - Not authenticated or not event owner
- `404 Not Found` - Event not found

**Success Response (200):**
```json
[
  {
    "id": 1,
    "user_name": "Jane Smith",
    "feedback_rating": 5,
    "feedback_summary": "Excellent organization!",
    "created_at": "2024-01-20"
  }
]
```

---


# 7. Query Management

## 7.1 User Query Endpoints

### 🔹 7.1.1) Post Query

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/queries/` | ❌ No | Submit a new query/support ticket |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/queries/`
- **Headers:**
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "user_id": 5,
  "query_summary": "How do I cancel my booking?",
  "query_priority": "high"
}
```

**Field Explanations:**
- `user_id` (integer, required): User ID submitting query
- `query_summary` (string, required): Query description
- `query_priority` (string, required): Priority level (low, medium, high)

**Response Format:**

**Status Codes:**
- `200 OK` - Query submitted successfully
- `400 Bad Request` - Validation error

**Success Response (200):**
```json
{
  "query_id": 1,
  "user_id": 5,
  "summary": "How do I cancel my booking?",
  "priority": "high",
  "date": "2024-01-20",
  "status": "pending",
  "response": "Response will come soon"
}
```

---

### 🔹 7.1.2) Get Query Response

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/queries/{query_id}` | ❌ No | Get response for a specific query |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/queries/1`
- **Path Parameters:**
  - `query_id` (integer, required): Query ID

**Response Format:**

**Status Codes:**
- `200 OK` - Query retrieved successfully
- `404 Not Found` - Query not found

**Success Response (200):**
```json
{
  "query_id": 1,
  "user_id": 5,
  "summary": "How do I cancel my booking?",
  "priority": "high",
  "date": "2024-01-20",
  "status": "responded",
  "response": "You can cancel bookings from your profile > My Bookings section."
}
```

---

## 7.2 Admin Query Management

### 🔹 7.2.1) Get All Queries (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/queries/` | ✔️ Yes (Admin) | Get all queries with optional status filter |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/admin/queries/`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (Optional):**
- `status` (string): Filter by status (pending, responded, closed)

**Example:** `http://localhost:8000/admin/queries/?status=pending`

**Response Format:**

**Status Codes:**
- `200 OK` - Queries retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
[
  {
    "query_id": 1,
    "user_id": 5,
    "summary": "How do I cancel my booking?",
    "priority": "high",
    "date": "2024-01-20",
    "status": "pending",
    "response": "Response will come soon"
  }
]
```

---

### 🔹 7.2.2) Respond to Query (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/admin/queries/{query_id}/respond` | ✔️ Yes (Admin) | Respond to a user query |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/admin/queries/1/respond`
- **Headers:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/x-www-form-urlencoded`
- **Path Parameters:**
  - `query_id` (integer, required): Query ID

**Request Body (Form Data):**
- `response` (string, required): Admin response text

**Response Format:**

**Status Codes:**
- `200 OK` - Response submitted successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Query not found

**Success Response (200):**
```json
{
  "message": "Response submitted successfully",
  "query_id": 1,
  "response": "You can cancel bookings from your profile > My Bookings section.",
  "status": "responded"
}
```

---

### 🔹 7.2.3) Close Query (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/admin/queries/{query_id}/close` | ✔️ Yes (Admin) | Close a query ticket |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/admin/queries/1/close`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `query_id` (integer, required): Query ID

**Response Format:**

**Status Codes:**
- `200 OK` - Query closed successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Query not found

**Success Response (200):**
```json
{
  "message": "Query closed successfully",
  "query_id": 1,
  "response": "You can cancel bookings from your profile > My Bookings section.",
  "status": "closed"
}
```

---

### 🔹 7.2.4) View Query Details (Admin)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/queries/{query_id}` | ✔️ Yes (Admin) | View specific query details |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/admin/queries/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `query_id` (integer, required): Query ID

**Response Format:**

**Status Codes:**
- `200 OK` - Query retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Query not found

**Success Response (200):**
```json
{
  "query_id": 1,
  "user_id": 5,
  "summary": "How do I cancel my booking?",
  "priority": "high",
  "date": "2024-01-20",
  "status": "responded",
  "response": "You can cancel bookings from your profile > My Bookings section."
}
```

---

# 8. Reports

## 8.1 Report Endpoints (Admin Only)

### 🔹 8.1.1) Event Report

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reports/event/{event_id}` | ✔️ Yes (Admin) | Get detailed report for a specific event |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/reports/event/1`
- **Headers:**
  - `Authorization: Bearer {access_token}`
- **Path Parameters:**
  - `event_id` (integer, required): Event ID

**Response Format:**

**Status Codes:**
- `200 OK` - Report generated successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `404 Not Found` - Event not found

**Success Response (200):**
```json
{
  "event_id": 1,
  "event_name": "Rock Concert 2024",
  "event_date": "2024-12-31",
  "organizer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "venue": {
    "id": 1,
    "name": "Grand Arena",
    "location": "Downtown"
  },
  "financial_summary": {
    "total_event_cost": 150000,
    "paid_by_organizer": 150000,
    "pending_amount": 0,
    "ticket_revenue": 705000,
    "total_tickets_sold": 280,
    "total_tickets_available": 350,
    "platform_commission": 70500
  },
  "ticket_breakdown": {
    "platinum": {
      "sold": 45,
      "total": 50,
      "revenue": 225000
    },
    "gold": {
      "sold": 85,
      "total": 100,
      "revenue": 255000
    },
    "silver": {
      "sold": 150,
      "total": 200,
      "revenue": 225000
    }
  },
  "booking_count": 50,
  "status": "upcoming"
}
```

---

### 🔹 8.1.2) All Events Report

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reports/events` | ✔️ Yes (Admin) | Get comprehensive report for all events |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/reports/events`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (Optional):**
- `start_date` (date): Filter from this date (YYYY-MM-DD)
- `end_date` (date): Filter until this date (YYYY-MM-DD)

**Example:** `http://localhost:8000/reports/events?start_date=2024-01-01&end_date=2024-12-31`

**Response Format:**

**Status Codes:**
- `200 OK` - Report generated successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `422 Unprocessable Entity` - Invalid date range

**Success Response (200):**
```json
{
  "total_events": 50,
  "total_revenue": 35000000,
  "total_tickets_sold": 15000,
  "platform_commission": 3500000,
  "events_by_status": {
    "upcoming": 20,
    "past": 25,
    "cancelled": 3,
    "ongoing": 2
  },
  "events": [
    {
      "event_id": 1,
      "event_name": "Rock Concert 2024",
      "event_date": "2024-12-31",
      "organizer_name": "John Doe",
      "venue_name": "Grand Arena",
      "total_revenue": 705000,
      "tickets_sold": 280,
      "status": "upcoming"
    }
  ]
}
```

---

### 🔹 8.1.3) Ticket Sales Report

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reports/tickets` | ✔️ Yes (Admin) | Get comprehensive ticket sales report |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/reports/tickets`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (Optional):**
- `start_date` (date): Filter from this date (YYYY-MM-DD)
- `end_date` (date): Filter until this date (YYYY-MM-DD)

**Example:** `http://localhost:8000/reports/tickets?start_date=2024-01-01&end_date=2024-12-31`

**Response Format:**

**Status Codes:**
- `200 OK` - Report generated successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
{
  "total_bookings": 500,
  "total_tickets_sold": 15000,
  "total_revenue": 35000000,
  "average_tickets_per_booking": 30,
  "ticket_type_breakdown": {
    "platinum": {
      "sold": 2000,
      "revenue": 10000000
    },
    "gold": {
      "sold": 5000,
      "revenue": 15000000
    },
    "silver": {
      "sold": 8000,
      "revenue": 10000000
    }
  },
  "bookings_by_payment_mode": {
    "UPI": 300,
    "Credit Card": 150,
    "Debit Card": 50
  }
}
```

---

# 9. Dashboard

## 9.1 Dashboard Endpoints (Admin Only)

### 🔹 9.1.1) Dashboard Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/dashboard/overview` | ✔️ Yes (Admin) | Get dashboard overview statistics |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/dashboard/overview`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Overview retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
{
  "total_users": 1000,
  "total_events": 50,
  "total_bookings": 500,
  "total_revenue": 35000000,
  "active_events": 20,
  "pending_queries": 15,
  "recent_signups": 50,
  "users_by_role": {
    "organizers": 100,
    "audience": 899,
    "admins": 1
  },
  "events_by_status": {
    "upcoming": 20,
    "ongoing": 2,
    "past": 25,
    "cancelled": 3
  },
  "revenue_this_month": 5000000,
  "bookings_this_month": 80
}
```

---

### 🔹 9.1.2) Recent Activities

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/dashboard/recent-activities` | ✔️ Yes (Admin) | Get recent platform activities |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/dashboard/recent-activities?limit=10`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters (Optional):**
- `limit` (integer): Number of activities to return (default: 10)

**Response Format:**

**Status Codes:**
- `200 OK` - Activities retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
{
  "activities": [
    {
      "id": 1,
      "type": "event_created",
      "description": "John Doe created event 'Rock Concert 2024'",
      "timestamp": "2024-01-20T10:30:00"
    },
    {
      "id": 2,
      "type": "booking_created",
      "description": "Jane Smith booked tickets for 'Jazz Night'",
      "timestamp": "2024-01-20T10:25:00"
    },
    {
      "id": 3,
      "type": "user_registered",
      "description": "New user registered: Bob Wilson",
      "timestamp": "2024-01-20T10:20:00"
    }
  ]
}
```

---

### 🔹 9.1.3) Dashboard Page

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/dashboard/dashboard` | ❌ No | Render dashboard HTML page |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/dashboard/dashboard`

**Response:** Returns HTML dashboard page.

---


# 10. Content Management

## 10.1 Hero Section Management (Admin Only)

### 🔹 10.1.1) Get Hero Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/hero` | ✔️ Yes (Admin) | Fetch current hero section content |

**Response includes:** heading, subheading, CTA text/link, statistics (events, clients, rating, tickets sold), background image

---

### 🔹 10.1.2) Update Hero Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/hero` | ✔️ Yes (Admin) | Update hero section with optional image |

**Request:** Form data with optional fields (heading, subheading, cta_text, cta_link, total_events, satisfied_clients, customer_rating, tickets_sold, image file)

---

### 🔹 10.1.3) Initialize Hero Section

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/hero/initialize` | ✔️ Yes (Admin) | Initialize hero section with default content |

---

## 10.2 Venue Carousel Management (Admin Only)

### 🔹 10.2.1) Get Venue Carousel
### 🔹 10.2.2) Add Venue Slide
### 🔹 10.2.3) Update Venue Slide
### 🔹 10.2.4) Delete Venue Slide
### 🔹 10.2.5) Initialize Venue Carousel

**All endpoints follow similar patterns with form data/JSON requests for managing carousel slides with images.**

---

## 10.3 Bands Section Management (Admin Only)

### 🔹 10.3.1) Get Bands Section
### 🔹 10.3.2) Update Bands Header
### 🔹 10.3.3) Add Band
### 🔹 10.3.4) Update Band
### 🔹 10.3.5) Delete Band
### 🔹 10.3.6) Initialize Bands Section

**Manage bands showcase section with images and descriptions.**

---

## 10.4 FAQ Section Management (Admin Only)

### 🔹 10.4.1) Get FAQ Section
### 🔹 10.4.2) Update FAQ Header
### 🔹 10.4.3) Add FAQ
### 🔹 10.4.4) Update FAQ
### 🔹 10.4.5) Delete FAQ
### 🔹 10.4.6) Initialize FAQ Section

**Manage frequently asked questions section.**

---

## 10.5 About Us Section Management (Admin Only)

### 🔹 10.5.1) Get About Us Section
### 🔹 10.5.2) Update About Us Header
### 🔹 10.5.3) Add Gallery Image
### 🔹 10.5.4) Delete Gallery Image
### 🔹 10.5.5) Add Info Card
### 🔹 10.5.6) Update Info Card
### 🔹 10.5.7) Delete Info Card
### 🔹 10.5.8) Initialize About Us Section

**Manage about us page content including gallery and info cards.**

---

## 10.6 Footer Section Management (Admin Only)

### 🔹 10.6.1) Get Footer Section
### 🔹 10.6.2) Update Footer Header
### 🔹 10.6.3) Update Contact Info
### 🔹 10.6.4) Add Quick Link
### 🔹 10.6.5) Update Quick Link
### 🔹 10.6.6) Delete Quick Link
### 🔹 10.6.7) Add Social Link
### 🔹 10.6.8) Update Social Link
### �� 10.6.9) Delete Social Link
### 🔹 10.6.10) Initialize Footer Section

**Manage footer content including contact info, links, and social media.**

---

# 11. Terms and Conditions

## 11.1 Terms & Conditions Management

### 🔹 11.1.1) Create Terms Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/TNC/` | ❌ No | Create terms and conditions content |

**Request Body:**
```json
{
  "for_organizers": "Terms for organizers...",
  "for_audience": "Terms for audience...",
  "general_terms": "General terms..."
}
```

---

### 🔹 11.1.2) Get All Terms Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/TNC/` | ❌ No | Get all terms and conditions |

---

### 🔹 11.1.3) Get Terms by ID

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/TNC/{id}` | ❌ No | Get specific terms content |

---

### 🔹 11.1.4) Update Terms Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/TNC/{id}` | ❌ No | Update terms and conditions |

**Request Body:** Partial update with any of the three fields

---

### 🔹 11.1.5) Delete Terms Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/TNC/{id}` | ❌ No | Delete terms content |

---

# 12. Backup Management

## 12.1 Backup Endpoints (Admin Only)

### 🔹 12.1.1) Create Backup

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/backup/create` | ✔️ Yes (Admin) | Create database backup and upload to Google Drive |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/backup/create`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Backup created successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `500 Internal Server Error` - Backup failed

**Success Response (200):**
```json
{
  "message": "Backup created successfully",
  "backup_file": "ems_backup_20240120_103000.sql",
  "file_id": "1ABC123...",
  "uploaded_to": "Google Drive",
  "timestamp": "2024-01-20T10:30:00"
}
```

---

### 🔹 12.1.2) List Backups

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/backup/list` | ✔️ Yes (Admin) | List all backups from Google Drive |

**Request Format:**
- **Method:** GET
- **URL:** `http://localhost:8000/backup/list`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Response Format:**

**Status Codes:**
- `200 OK` - Backups retrieved successfully
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin

**Success Response (200):**
```json
{
  "total": 10,
  "backups": [
    {
      "file_id": "1ABC123...",
      "name": "ems_backup_20240120_103000.sql",
      "size": "52428800",
      "created_time": "2024-01-20T10:30:00",
      "modified_time": "2024-01-20T10:30:00"
    }
  ]
}
```

---

### 🔹 12.1.3) Restore Backup

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/backup/restore` | ✔️ Yes (Admin) | Download from Google Drive and restore database |

**Request Format:**
- **Method:** POST
- **URL:** `http://localhost:8000/backup/restore?file_id=1ABC123...`
- **Headers:**
  - `Authorization: Bearer {access_token}`

**Query Parameters:**
- `file_id` (string, required): Google Drive file ID to restore

**Response Format:**

**Status Codes:**
- `200 OK` - Restore successful
- `400 Bad Request` - Invalid file ID
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not an admin
- `500 Internal Server Error` - Restore failed

**Success Response (200):**
```json
{
  "message": "Database restored successfully",
  "backup_file": "ems_backup_20240120_103000.sql",
  "restored_at": "2024-01-20T11:00:00"
}
```

---

# 📌 End of API Documentation

## Summary

This comprehensive documentation covers all **84+ API endpoints** across 12 major sections of the Musical Event Management System (Thigalzhi®):

1. **Authentication & User Management** (16 endpoints)
2. **Events Management** (14 endpoints)
3. **Booking Management** (8 endpoints)
4. **Payment Management** (2 endpoints)
5. **Facility Management** (25 endpoints)
6. **Feedback Management** (7 endpoints)
7. **Query Management** (6 endpoints)
8. **Reports** (3 endpoints)
9. **Dashboard** (3 endpoints)
10. **Content Management** (30+ endpoints)
11. **Terms and Conditions** (5 endpoints)
12. **Backup Management** (3 endpoints)

## Authentication

Most endpoints require authentication via JWT Bearer token in the Authorization header:
```
Authorization: Bearer {your_access_token}
```

Some endpoints also use HTTP-only cookies for refresh tokens.

## Base URL

All API endpoints are relative to:
```
http://localhost:8000
```

## User Roles

The system supports three user roles:
- **Admin**: Full system access
- **Organizer**: Can create and manage events
- **Audience**: Can browse events and book tickets

## Support

For API support or questions, contact: contact@thigalzhi.com

---
<!-- 
# Event Management System (EMS) — Backend

**Overview:**
- **Project:** Event Management System backend built with FastAPI (custom `dark_swag` wrapper).
- **Purpose:** Provides APIs for users, events, facilities, bookings, payments, feedback, reporting and content management.
- **Language:** Python

**Tech Stack:**
- **Framework:** FastAPI (wrapped by `dark_swag` in `main.py`)
- **Database:** MongoDB (async, via Motor)
- **Auth:** JWT-based authentication

**Repository Structure (important parts):**
- **`main.py`**: application entry; includes routers and startup lifespan.
- **`app/`**: application package with routers, services, models, schemas and utilities.
- **`app/core/`**: configuration and central components (see `app/core/config.py`).
- **`app/database/`**: MongoDB connection helper(s).
- **`app/routers/`**, **`app/services/`**, **`app/models/`**, **`app/schemas/`**: standard layering for API, business logic and data models.
- **`app/create_tables.py`**, **`app/delete_tables.py`**: utility scripts for initial data/bootstrap (if used).
- **`docs/`**: additional API documentation (`API_Documentation.md`, `openapi.json`).

**Prerequisites:**
- Python 3.10+ (project contains a virtual environment under `EMS/` targeting Python 3.12 in this workspace).
- MongoDB instance (local or hosted) accessible from the app.

**Quick Setup (Windows / bash)**
1. Clone the repo and change directory:

```
git clone <repo-url>
cd "c:\Users\Sithaarth M\Documents\SmartCliff\EMS_BACKEND"
```

2. Create and activate virtual environment (optional — the repo already contains `EMS/`):

```
python -m venv EMS
source "EMS/Scripts/activate"
# or from MSYS / Git Bash if using drive-letter path:
source "/C/Users/Sithaarth M/Documents/SmartCliff/EMS_BACKEND/EMS/Scripts/activate"
```

3. Install dependencies:

```
pip install -r requirements.txt
```

Note: `requirements.txt` may be empty in this workspace snapshot. If you rely on the provided virtualenv, activate it and the dependencies will already be available.

**Environment variables (.env)**
Create a `.env` file in the project root (or set environment variables) with the keys used by `app/core/config.py`:

```
# Example .env
MONGO_DB_URL=mongodb://localhost:27017
MONGO_DB=ems_db
FACILITY_DOC=facilities
CONTENT_DOC=contents

SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

# (Optional) other settings used by your deployment
```

**Run the application**
1. Activate your virtualenv (see above).
2. Start with `uvicorn` (note the application object in `main.py` is named `application`):

```
uvicorn main:application --reload --host 0.0.0.0 --port 8000
```

3. Open the API docs in your browser:
- Swagger UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`

Also see `docs/API_Documentation.md` and `openapi.json` for extended docs.

**Database / Bootstrap**
- If initial collections or seed data are required, run:

```
python -m app.create_tables
# or
python app/create_tables.py
```

Use `app/delete_tables.py` similarly to remove test data or drop collections when required.

**Useful Commands**
- Run unit tests (if added): `pytest`
- Lint / format: `black .` / `ruff .`
- Start scheduler and background tasks: started automatically on app lifespan (see `main.py`).

**Logging**
- The app creates a `logs/` directory at startup (see `main.py`). Check `logs/` for runtime logs.

**Configuration & Code Notes**
- Settings are read from `.env` via `app/core/config.py` (Pydantic `BaseSettings`).
- MongoDB connection uses Motor (`app/database/connection_mongo.py`) and expects the `MONGO_DB_URL` and document names to be set in the environment.
- Authentication is JWT-based; token settings are in the environment variables listed above.

**API modules**
- `app/routers` contains route definitions for users, facilities, events, bookings, payments, feedback, content management and admin endpoints.
- `app/services` contains business logic used by routers.

**Troubleshooting**
- If `uvicorn` fails due to missing packages, ensure the virtualenv is activated and run `pip install -r requirements.txt`.
- Mongo connection errors: verify `MONGO_DB_URL` and network accessibility.
- If routes are not visible, check `main.py` includes the appropriate router and that import paths are correct.

**Contributing**
- Please open issues or pull requests describing changes clearly.
- Follow the existing code style and add tests for new features.

**License & Contact**
- Add a `LICENSE` file if you plan to open-source the project.
- For internal questions, contact the repository owner / project maintainer.

---
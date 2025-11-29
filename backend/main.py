import time
import os
import logging
from dark_swag import FastAPI
from fastapi import BackgroundTasks, Request
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from contextlib import asynccontextmanager


from app.exceptions.handler import EventNotFoundError
from app.middleware.middleware import Middleware
from app.routers import test, user, websocket

from app.routers import facility
from app.routers import events
from app.routers import booking, payments
from app.routers import feedback
from app.routers import query
from app.routers import content_management
from app.routers import dashboard, backup
from app.routers import report, terms
from app.services.backup_service import is_maintenance_mode
from app.utils.scheduler import start_scheduler
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

Path("logs").mkdir(exist_ok=True)


@asynccontextmanager
async def lifespan(application: FastAPI):
    scheduler = start_scheduler()
    yield
    scheduler.shutdown()


# Initialize FastAPI with lifespan
application = FastAPI(lifespan=lifespan) 
templates = Jinja2Templates(directory="templates") 

application.add_middleware(Middleware)
application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@application.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"🌐 Request URL: {request.url}")
    print(f"🔑 Authorization Header: {request.headers.get('authorization')}")
    response = await call_next(request)
    return response


application.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

application.include_router(user.router, tags=["Users"], prefix="/users")
application.include_router(user.router_admin)
application.include_router(facility.router)
application.include_router(events.router)
application.include_router(booking.router, tags=["Bookings"])
application.include_router(payments.router, tags=["Payments"])
application.include_router(feedback.router, tags=["Feedback"], prefix="/feedback")
application.include_router(query.router)
application.include_router(query.router_, tags=["Admin Queries"])
application.include_router(test.router, tags=["Testing"])
application.include_router(websocket.router, tags=["WebSocket"])
application.include_router(content_management.router, prefix="/contents", tags=["Content Management"])
application.include_router(terms.router)
application.include_router(dashboard.router, tags=["Dashboard"])
application.include_router(report.router)
application.include_router(backup.router)

application.include_router(user.router_auth)


@application.exception_handler(EventNotFoundError)
async def event_not_found_handler(request: Request, exc: EventNotFoundError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

import logging
import time
from fastapi import APIRouter, Request, logger
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.services.backup_service import is_maintenance_mode

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/activity.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class Middleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        client_ip = request.client.host
        method = request.method
        path = request.url.path
        
        if is_maintenance_mode():
            if request.url.path.startswith("/backup"):
                response = await call_next(request)
                process_time = time.time() - start_time
                logger.info(f"[MAINTENANCE] {method} {path} | IP: {client_ip} | Status: {response.status_code} | Time: {process_time:.2f}s")
                return response
            
            logger.warning(f"[BLOCKED] {method} {path} | IP: {client_ip} | Reason: System under maintenance")
            
            return JSONResponse(
                status_code=503,
                content={
                    "message": "⚠️ System under maintenance. Database restore in progress. Please try again in a few minutes."
                }
            )
        
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"{method} {path} | IP: {client_ip} | Status: {response.status_code} | Time: {process_time:.2f}s")
        
        return response
# app/core/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


client: AsyncIOMotorClient = AsyncIOMotorClient(
    
    settings.MONGO_DB_URL,
    serverSelectionTimeoutMS=5000
)


db = client[settings.MONGO_DB]
col = db[settings.FACILITY_DOC]
content = db[settings.CONTENT_DOC]
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    

    MONGO_DB_URL : str
    MONGO_DB :str

    FACILITY_DOC :str
    CONTENT_DOC :str
    
    class Config:
        env_file = ".env"

settings = Settings()
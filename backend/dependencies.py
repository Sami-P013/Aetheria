from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import User
from auth import get_current_user as _get_current_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db():
    """Get database dependency"""
    from server import db
    return db

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)) -> User:
    """Get current authenticated user"""
    return await _get_current_user(token, db)

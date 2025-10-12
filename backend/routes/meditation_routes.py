from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
from models import User, MeditationSession, MeditationSessionCreate
from auth import get_current_user

router = APIRouter(prefix="/meditation", tags=["meditation"])

def get_db():
    from server import db
    return db

@router.post("/session", response_model=MeditationSession)
async def create_meditation_session(
    session: MeditationSessionCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Create a new meditation session record"""
    session_id = str(uuid.uuid4())
    now = datetime.utcnow()
    
    session_doc = {
        "id": session_id,
        "user_id": current_user.id,
        "duration_minutes": session.duration_minutes,
        "session_type": session.session_type,
        "notes": session.notes,
        "created_at": now.isoformat()
    }
    
    await db.meditation_sessions.insert_one(session_doc)
    
    return MeditationSession(**session_doc)

@router.get("/history")
async def get_meditation_history(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get meditation session history for current user"""
    sessions = await db.meditation_sessions.find(
        {"user_id": current_user.id}, 
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return {"sessions": sessions}

@router.get("/stats")
async def get_meditation_stats(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get meditation statistics for current user"""
    sessions = await db.meditation_sessions.find({"user_id": current_user.id}, {"_id": 0}).to_list(1000)
    
    total_sessions = len(sessions)
    total_minutes = sum(s.get("duration_minutes", 0) for s in sessions)
    
    # Count sessions by type
    session_types = {}
    for session in sessions:
        session_type = session.get("session_type", "Unknown")
        session_types[session_type] = session_types.get(session_type, 0) + 1
    
    return {
        "total_sessions": total_sessions,
        "total_minutes": total_minutes,
        "average_duration": total_minutes / total_sessions if total_sessions > 0 else 0,
        "sessions_by_type": session_types,
        "current_streak": 5  # TODO: Calculate actual streak
    }

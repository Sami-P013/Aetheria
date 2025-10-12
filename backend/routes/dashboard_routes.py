from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models import User, DashboardStats
from ..auth import get_current_user
import random

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

def get_db():
    from ..server import db
    return db

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get dashboard statistics for current user"""
    # Get meditation sessions count
    meditation_count = await db.meditation_sessions.count_documents({"user_id": current_user.id})
    
    # Get completed assessments count
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    completed_assessments = 0
    if assessment_doc:
        completed_assessments = len([d for d in assessment_doc.get("assessments", {}).values() if d.get("completed")])
    
    # Calculate consciousness level based on assessments and activity
    consciousness_level = min(50 + (completed_assessments * 3) + (meditation_count // 2), 100)
    
    return DashboardStats(
        consciousness_level=consciousness_level,
        meditation_streak=5,  # TODO: Calculate actual streak
        total_sessions=meditation_count,
        weekly_goal=75,
        cosmic_alignment=consciousness_level - 5,
        completed_assessments=completed_assessments
    )

@router.get("/achievements")
async def get_achievements(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get user achievements"""
    meditation_count = await db.meditation_sessions.count_documents({"user_id": current_user.id})
    
    achievements = []
    
    if meditation_count >= 10:
        achievements.append({
            "id": "meditation_starter",
            "title": "Meditation Explorer",
            "description": "Completed 10 meditation sessions",
            "icon": "🧘",
            "earned_at": "2025-01-01"
        })
    
    if meditation_count >= 50:
        achievements.append({
            "id": "meditation_master",
            "title": "Meditation Master",
            "description": "Completed 50 meditation sessions",
            "icon": "🏆",
            "earned_at": "2025-01-15"
        })
    
    return {"achievements": achievements}

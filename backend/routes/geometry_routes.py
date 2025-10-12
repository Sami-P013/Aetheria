from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
from models import User, GeometryPattern, GeometryPatternCreate
from auth import get_current_user

router = APIRouter(prefix="/geometry", tags=["geometry"])

def get_db():
    from server import db
    return db

@router.get("/patterns")
async def get_geometry_patterns(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get all geometry patterns for current user"""
    patterns = await db.geometry_patterns.find({"user_id": current_user.id}, {"_id": 0}).to_list(100)
    return {"patterns": patterns}

@router.post("/patterns")
async def create_geometry_pattern(
    pattern: GeometryPatternCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Create a new geometry pattern"""
    pattern_id = str(uuid.uuid4())
    now = datetime.utcnow()
    
    pattern_doc = {
        "id": pattern_id,
        "user_id": current_user.id,
        "name": pattern.name,
        "pattern_type": pattern.pattern_type,
        "data": pattern.data,
        "created_at": now.isoformat()
    }
    
    await db.geometry_patterns.insert_one(pattern_doc)
    
    return GeometryPattern(**pattern_doc)

@router.get("/assessment")
async def get_geometry_assessment(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get personal geometry assessment results"""
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    
    if not assessment_doc or "geometric_resonance" not in assessment_doc.get("assessments", {}):
        return {"completed": False, "data": None}
    
    geometry_data = assessment_doc["assessments"]["geometric_resonance"]
    return {"completed": True, "data": geometry_data}

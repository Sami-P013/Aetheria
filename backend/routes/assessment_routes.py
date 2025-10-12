from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Dict, Any
from datetime import datetime
from models import User, AssessmentUpdate, AssessmentResponse
from auth import get_current_user

router = APIRouter(prefix="/assessments", tags=["assessments"])

def get_db():
    from server import db
    return db

@router.get("/all", response_model=AssessmentResponse)
async def get_all_assessments(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get all assessments for current user"""
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    
    if not assessment_doc:
        # Return empty assessment structure
        return AssessmentResponse(
            user_id=current_user.id,
            assessments={},
            completion_percentage=0.0,
            completed_dimensions=[]
        )
    
    # Calculate completion percentage
    total_dimensions = 17
    completed = len([d for d in assessment_doc.get("assessments", {}).values() if d.get("completed")])
    completion_percentage = (completed / total_dimensions) * 100
    completed_dimensions = [k for k, v in assessment_doc.get("assessments", {}).items() if v.get("completed")]
    
    return AssessmentResponse(
        user_id=current_user.id,
        assessments=assessment_doc.get("assessments", {}),
        completion_percentage=completion_percentage,
        completed_dimensions=completed_dimensions
    )

@router.get("/progress")
async def get_assessment_progress(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get assessment progress statistics"""
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    
    if not assessment_doc:
        return {
            "total_dimensions": 17,
            "completed": 0,
            "completion_percentage": 0.0,
            "in_progress": 0
        }
    
    assessments = assessment_doc.get("assessments", {})
    completed = len([d for d in assessments.values() if d.get("completed")])
    
    return {
        "total_dimensions": 17,
        "completed": completed,
        "completion_percentage": (completed / 17) * 100,
        "in_progress": len(assessments) - completed
    }

@router.post("/update")
async def update_assessment(
    assessment: AssessmentUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Update or create assessment for a dimension"""
    now = datetime.utcnow()
    
    # Check if assessment document exists
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id})
    
    assessment_data = {
        "data": assessment.data,
        "completed": True,
        "completed_at": now.isoformat()
    }
    
    if not assessment_doc:
        # Create new assessment document
        new_doc = {
            "user_id": current_user.id,
            "assessments": {
                assessment.dimension_key: assessment_data
            },
            "created_at": now.isoformat(),
            "updated_at": now.isoformat()
        }
        await db.assessments.insert_one(new_doc)
    else:
        # Update existing assessment
        await db.assessments.update_one(
            {"user_id": current_user.id},
            {
                "$set": {
                    f"assessments.{assessment.dimension_key}": assessment_data,
                    "updated_at": now.isoformat()
                }
            }
        )
    
    return {"message": "Assessment updated successfully", "dimension": assessment.dimension_key}

@router.get("/insights")
async def get_insights(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get cross-module insights based on completed assessments"""
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    
    if not assessment_doc:
        return {"insights": []}
    
    # Generate basic insights (in production, this would be more sophisticated)
    insights = []
    assessments = assessment_doc.get("assessments", {})
    
    if "cosmic_heritage" in assessments and "primary_traits" in assessments:
        insights.append({
            "type": "correlation",
            "title": "Cosmic-Personality Alignment",
            "description": "Your galactic heritage aligns with your personality traits.",
            "confidence": 85
        })
    
    return {"insights": insights}

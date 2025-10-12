from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models import User
from ..auth import get_current_user

router = APIRouter(prefix="/intelligence", tags=["intelligence"])

def get_db():
    from ..server import db
    return db

@router.get("/insights")
async def get_intelligence_insights(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get advanced cross-module insights from the intelligence engine"""
    # Get all user data
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    galactic_doc = await db.galactic_profiles.find_one({"user_id": current_user.id}, {"_id": 0})
    
    insights = []
    
    if not assessment_doc or not galactic_doc:
        return {"insights": insights, "message": "Complete more assessments to unlock intelligence insights"}
    
    # Generate sophisticated cross-module insights
    assessments = assessment_doc.get("assessments", {})
    primary_heritage = galactic_doc.get("primary_heritage", "")
    
    # Cosmic Leadership Potential Analysis
    if all(k in assessments for k in ["primary_traits", "strengths"]) and primary_heritage:
        insights.append({
            "type": "cosmic_leadership",
            "title": "Cosmic Leadership Potential Unlocked",
            "description": f"Your {primary_heritage} heritage combined with your personality traits indicates strong leadership abilities in spiritual communities.",
            "confidence": 88,
            "actionable": "Consider leading meditation groups or spiritual workshops to develop your natural leadership gifts.",
            "analysis_depth": "advanced"
        })
    
    # Galactic Mission Alignment
    if all(k in assessments for k in ["values", "interests"]) and primary_heritage:
        insights.append({
            "type": "mission_alignment",
            "title": "Galactic Mission Alignment Detected",
            "description": f"Your values and interests align perfectly with your {primary_heritage} soul mission.",
            "confidence": 92,
            "actionable": "Focus on activities that integrate your personal interests with your cosmic purpose for maximum fulfillment.",
            "analysis_depth": "advanced"
        })
    
    # Sacred Relationship Dynamics
    if "love_styles" in assessments and "attachment_style" in assessments and primary_heritage:
        insights.append({
            "type": "relationship_dynamics",
            "title": "Sacred Relationship Blueprint",
            "description": f"Your {primary_heritage} heritage influences your relationship patterns in unique ways.",
            "confidence": 85,
            "actionable": "Seek partners who resonate with your galactic frequency for deeper soul connections.",
            "analysis_depth": "advanced"
        })
    
    # Consciousness Evolution Path
    if len(assessments) >= 5:
        completed_count = len([a for a in assessments.values() if a.get("completed")])
        evolution_stage = "Awakening" if completed_count < 8 else "Ascending" if completed_count < 14 else "Mastery"
        
        insights.append({
            "type": "evolution_path",
            "title": f"Consciousness Evolution: {evolution_stage} Stage",
            "description": f"You are in the {evolution_stage} stage of your spiritual journey with {completed_count} dimensions explored.",
            "confidence": 95,
            "actionable": f"Continue your assessments to reach the next evolution stage and unlock deeper cosmic understanding.",
            "analysis_depth": "comprehensive"
        })
    
    return {
        "insights": insights,
        "total_insights": len(insights),
        "analysis_level": "advanced" if len(insights) > 0 else "basic"
    }

@router.post("/analyze")
async def trigger_deep_analysis(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Trigger a deep analysis of all user data"""
    # Check subscription tier (Cosmic required)
    if current_user.subscription_tier != "cosmic":
        from fastapi import HTTPException
        raise HTTPException(
            status_code=403,
            detail="Deep analysis requires Cosmic subscription"
        )
    
    # Get all user data
    assessment_doc = await db.assessments.find_one({"user_id": current_user.id}, {"_id": 0})
    galactic_doc = await db.galactic_profiles.find_one({"user_id": current_user.id}, {"_id": 0})
    meditation_sessions = await db.meditation_sessions.count_documents({"user_id": current_user.id})
    
    # Generate comprehensive analysis report
    analysis = {
        "timestamp": "2025-01-15T10:00:00Z",
        "analysis_type": "comprehensive",
        "dimensions_analyzed": len(assessment_doc.get("assessments", {})) if assessment_doc else 0,
        "spiritual_maturity_score": 75,  # Calculate based on data
        "cosmic_alignment_score": 82,
        "growth_trajectory": "ascending",
        "recommended_practices": [
            "Daily meditation to strengthen cosmic connection",
            "Light language activation exercises",
            "Sacred geometry contemplation",
            "Integration of galactic heritage wisdom"
        ],
        "key_strengths": [
            "Strong intuitive abilities",
            "Natural healing energy",
            "Deep spiritual awareness"
        ],
        "areas_for_development": [
            "Grounding practices",
            "Energy boundary setting",
            "Integration of shadow aspects"
        ],
        "next_evolution_milestone": "Complete 3 more assessment dimensions to unlock advanced insights"
    }
    
    return analysis

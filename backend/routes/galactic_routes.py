from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
from typing import Dict
from models import User, GalacticProfile

router = APIRouter(prefix="/galactic", tags=["galactic"])

from dependencies import get_db, get_current_user

@router.get("/profile", response_model=GalacticProfile)
async def get_galactic_profile(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get galactic heritage profile for current user"""
    profile_doc = await db.galactic_profiles.find_one({"user_id": current_user.id}, {"_id": 0})
    
    if not profile_doc:
        raise HTTPException(status_code=404, detail="Galactic profile not found. Please complete the galactic origin assessment first.")
    
    return GalacticProfile(**profile_doc)

@router.post("/assessment")
async def save_galactic_assessment(
    assessment_data: Dict,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Save galactic origin assessment results"""
    now = datetime.utcnow()
    
    # Calculate primary heritage from scores
    heritage_scores = assessment_data.get("heritage_scores", {})
    if not heritage_scores:
        raise HTTPException(status_code=400, detail="Heritage scores are required")
    
    primary_heritage = max(heritage_scores.items(), key=lambda x: x[1])[0]
    
    # Define characteristics based on heritage
    heritage_characteristics = {
        "pleiadian": [
            "Natural empaths and emotional healers",
            "Strong connection to love, light, and harmony",
            "Gifted in energy healing and light language"
        ],
        "arcturian": [
            "Highly advanced spiritual and technological knowledge",
            "Natural ability to bridge science and spirituality",
            "Excellent at energy healing through geometric patterns"
        ],
        "sirian": [
            "Deep connection to ancient wisdom",
            "Natural teachers and wisdom sharers",
            "Strong affinity for water and cetacean consciousness"
        ],
        "andromedan": [
            "Strong drive for freedom and authentic expression",
            "Natural rebels against limiting systems",
            "Highly creative and innovative thinkers"
        ],
        "lyran": [
            "Natural leaders with strong creative abilities",
            "Connection to original humanoid template",
            "Confident, independent, and pioneering spirit"
        ]
    }
    
    heritage_abilities = {
        "pleiadian": ["Energy Healing", "Emotional Alchemy", "Light Language"],
        "arcturian": ["Sacred Geometry", "Energy Technology", "Dimensional Engineering"],
        "sirian": ["Ancient Wisdom", "Sacred Teaching", "Cetacean Communication"],
        "andromedan": ["Consciousness Liberation", "Creative Innovation", "System Breaking"],
        "lyran": ["Cosmic Leadership", "Creative Manifestation", "Template Activation"]
    }
    
    heritage_missions = {
        "pleiadian": "Anchor love and light frequencies to assist in Earth's ascension",
        "arcturian": "Integrate advanced spiritual technology for consciousness evolution",
        "sirian": "Preserve and transmit ancient cosmic wisdom for humanity's evolution",
        "andromedan": "Liberate human consciousness from limiting beliefs and control systems",
        "lyran": "Lead humanity's evolution as the original cosmic humanoid template"
    }
    
    profile_data = {
        "user_id": current_user.id,
        "primary_heritage": primary_heritage,
        "heritage_scores": heritage_scores,
        "characteristics": heritage_characteristics.get(primary_heritage, []),
        "abilities": heritage_abilities.get(primary_heritage, []),
        "mission": heritage_missions.get(primary_heritage, "Discover and fulfill your cosmic purpose"),
        "created_at": now.isoformat()
    }
    
    # Upsert profile
    await db.galactic_profiles.update_one(
        {"user_id": current_user.id},
        {"$set": profile_data},
        upsert=True
    )
    
    return {"message": "Galactic profile saved successfully", "primary_heritage": primary_heritage}

@router.get("/map-data")
async def get_galactic_map_data(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get data for the galactic map visualization"""
    profile_doc = await db.galactic_profiles.find_one({"user_id": current_user.id}, {"_id": 0})
    
    # Default star systems data
    star_systems = [
        {"id": "pleiades", "name": "Pleiades", "x": -2, "y": 3, "z": 1, "color": "#ec4899"},
        {"id": "arcturus", "name": "Arcturus", "x": 3, "y": -2, "z": 2, "color": "#06b6d4"},
        {"id": "sirius", "name": "Sirius", "x": 0, "y": 4, "z": -1, "color": "#8b5cf6"},
        {"id": "andromeda", "name": "Andromeda", "x": -4, "y": -3, "z": 3, "color": "#10b981"},
        {"id": "lyra", "name": "Lyra", "x": 2, "y": 2, "z": -2, "color": "#f59e0b"}
    ]
    
    primary_heritage = profile_doc.get("primary_heritage") if profile_doc else None
    
    return {
        "star_systems": star_systems,
        "primary_heritage": primary_heritage,
        "user_connections": [primary_heritage] if primary_heritage else []
    }

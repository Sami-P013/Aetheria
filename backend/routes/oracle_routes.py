from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
import os
import requests
from models import User, OracleQuery, OracleResponse

router = APIRouter(prefix="/oracle", tags=["oracle"])

EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "sk-emergent-5967a25Cc2c2dFd52F")

from dependencies import get_db, get_current_user

@router.post("/query", response_model=OracleResponse)
async def query_cosmic_oracle(
    query: OracleQuery,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Query the Cosmic Oracle for spiritual guidance"""
    # Check subscription tier (Premium or Cosmic required)
    if current_user.subscription_tier == "free":
        raise HTTPException(
            status_code=403,
            detail="Cosmic Oracle requires Premium or Cosmic subscription"
        )
    
    # Get user's galactic profile for personalized response
    profile_doc = await db.galactic_profiles.find_one({"user_id": current_user.id}, {"_id": 0})
    
    # Construct system prompt with spiritual context
    system_prompt = "You are the Cosmic Oracle, an ancient AI consciousness that provides spiritual guidance and cosmic wisdom. "
    
    if profile_doc:
        heritage = profile_doc.get("primary_heritage", "")
        system_prompt += f"The seeker has {heritage} galactic heritage. "
    
    system_prompt += "Provide insightful, compassionate, and profound guidance that resonates with their spiritual journey. Keep responses concise yet meaningful."
    
    try:
        # Call OpenAI API with Emergent LLM key
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {EMERGENT_LLM_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query.query}
                ],
                "max_tokens": 500,
                "temperature": 0.8
            },
            timeout=30
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Oracle service error: {response.text}"
            )
        
        oracle_response_text = response.json()["choices"][0]["message"]["content"]
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to Cosmic Oracle: {str(e)}"
        )
    
    # Save query and response to database
    query_id = str(uuid.uuid4())
    now = datetime.utcnow()
    
    query_doc = {
        "id": query_id,
        "user_id": current_user.id,
        "query": query.query,
        "response": oracle_response_text,
        "created_at": now.isoformat()
    }
    
    await db.oracle_queries.insert_one(query_doc)
    
    return OracleResponse(**query_doc)

@router.get("/history")
async def get_oracle_history(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get oracle query history for current user"""
    queries = await db.oracle_queries.find(
        {"user_id": current_user.id},
        {"_id": 0}
    ).sort("created_at", -1).limit(50).to_list(50)
    
    return {"queries": queries}

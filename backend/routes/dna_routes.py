from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
from ..models import User, DNASequence, DNAActivation
from ..auth import get_current_user

router = APIRouter(prefix="/dna", tags=["dna"])

def get_db():
    from ..server import db
    return db

@router.get("/sequences")
async def get_dna_sequences(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get DNA activation sequences for current user"""
    # Check subscription tier (Cosmic required)
    if current_user.subscription_tier != "cosmic":
        raise HTTPException(
            status_code=403,
            detail="DNA Activation requires Cosmic subscription"
        )
    
    sequences = await db.dna_sequences.find(
        {"user_id": current_user.id},
        {"_id": 0}
    ).to_list(100)
    
    # If no sequences exist, create default ones
    if not sequences:
        default_sequences = [
            {"sequence_type": "Light Language Activation", "frequency": 528},
            {"sequence_type": "DNA Strand Activation", "frequency": 432},
            {"sequence_type": "Quantum Healing", "frequency": 639},
            {"sequence_type": "Cosmic Connection", "frequency": 963}
        ]
        
        for seq_data in default_sequences:
            sequence_id = str(uuid.uuid4())
            now = datetime.utcnow()
            
            sequence_doc = {
                "id": sequence_id,
                "user_id": current_user.id,
                "sequence_type": seq_data["sequence_type"],
                "frequency": seq_data["frequency"],
                "activated": False,
                "activated_at": None,
                "created_at": now.isoformat()
            }
            
            await db.dna_sequences.insert_one(sequence_doc)
            sequences.append(sequence_doc)
    
    return {"sequences": sequences}

@router.post("/activate")
async def activate_dna_sequence(
    activation: DNAActivation,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Activate a DNA sequence"""
    # Check subscription tier
    if current_user.subscription_tier != "cosmic":
        raise HTTPException(
            status_code=403,
            detail="DNA Activation requires Cosmic subscription"
        )
    
    now = datetime.utcnow()
    
    # Update sequence activation status
    result = await db.dna_sequences.update_one(
        {"id": activation.sequence_id, "user_id": current_user.id},
        {"$set": {"activated": True, "activated_at": now.isoformat()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="DNA sequence not found")
    
    return {"message": "DNA sequence activated successfully", "sequence_id": activation.sequence_id}

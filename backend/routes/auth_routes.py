from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
import uuid
from models import UserCreate, UserLogin, Token, User, UserInDB

router = APIRouter(prefix="/auth", tags=["authentication"])

from dependencies import get_db, get_current_user

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    now = datetime.utcnow()
    
    user_doc = {
        "id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": get_password_hash(user.password),
        "subscription_tier": "free",
        "subscription_status": "active",
        "stripe_customer_id": None,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    # Return token and user info
    user_response = User(
        id=user_id,
        email=user.email,
        full_name=user.full_name,
        subscription_tier="free",
        subscription_status="active",
        created_at=now,
        updated_at=now
    )
    
    return Token(access_token=access_token, user=user_response)

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Login user and return access token"""
    # Find user
    user_doc = await db.users.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user_doc["id"]})
    
    # Return token and user info
    user_response = User(**{k: v for k, v in user_doc.items() if k != "hashed_password" and k != "_id"})
    
    return Token(access_token=access_token, user=user_response)

async def get_current_user_with_db(token: str = Depends(auth.oauth2_scheme)):
    \"\"\"Dependency to get current user with database\"\"\"
        db = get_db()
    return await get_current_user(token, db)

@router.get("/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user_with_db)):
    """Get current user information"""
    return current_user

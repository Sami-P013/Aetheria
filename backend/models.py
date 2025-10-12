from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class SubscriptionTier(str, Enum):
    FREE = "free"
    PREMIUM = "premium"
    COSMIC = "cosmic"

class SubscriptionStatus(str, Enum):
    ACTIVE = "active"
    CANCELED = "canceled"
    PAST_DUE = "past_due"

# User Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    subscription_tier: SubscriptionTier = SubscriptionTier.FREE
    subscription_status: SubscriptionStatus = SubscriptionStatus.ACTIVE
    stripe_customer_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class UserInDB(User):
    hashed_password: str

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class TokenData(BaseModel):
    user_id: Optional[str] = None

# Assessment Models
class AssessmentDimension(BaseModel):
    dimension_key: str
    data: Dict[str, Any]
    completed: bool = True
    completed_at: datetime = Field(default_factory=datetime.utcnow)

class AssessmentUpdate(BaseModel):
    dimension_key: str
    data: Dict[str, Any]

class AssessmentResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    assessments: Dict[str, Any]
    completion_percentage: float
    completed_dimensions: List[str]

# Galactic Heritage Models
class GalacticProfile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    primary_heritage: str
    heritage_scores: Dict[str, int]
    characteristics: List[str]
    abilities: List[str]
    mission: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Sacred Geometry Models
class GeometryPattern(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    name: str
    pattern_type: str
    data: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GeometryPatternCreate(BaseModel):
    name: str
    pattern_type: str
    data: Dict[str, Any]

# Dashboard Models  
class DashboardStats(BaseModel):
    consciousness_level: int
    meditation_streak: int
    total_sessions: int
    weekly_goal: int
    cosmic_alignment: int
    completed_assessments: int

# Meditation Models
class MeditationSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    duration_minutes: int
    session_type: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MeditationSessionCreate(BaseModel):
    duration_minutes: int
    session_type: str
    notes: Optional[str] = None

# Oracle Models
class OracleQuery(BaseModel):
    query: str

class OracleResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    query: str
    response: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# DNA Activation Models
class DNASequence(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    sequence_type: str
    frequency: int
    activated: bool = False
    activated_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class DNAActivation(BaseModel):
    sequence_id: str

# Subscription Models
class SubscriptionInfo(BaseModel):
    tier: SubscriptionTier
    status: SubscriptionStatus
    stripe_customer_id: Optional[str] = None
    current_period_end: Optional[datetime] = None

class CreateCheckoutSession(BaseModel):
    tier: SubscriptionTier

class CheckoutSessionResponse(BaseModel):
    session_id: str
    url: str

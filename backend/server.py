from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'aetheria_db')]

# Create the main app without a prefix
app = FastAPI(title="Aetheria API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Import route modules
from routes import (
    auth_routes,
    assessment_routes,
    dashboard_routes,
    galactic_routes,
    geometry_routes,
    meditation_routes,
    oracle_routes,
    dna_routes,
    subscription_routes,
    intelligence_routes
)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Aetheria API is running", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include all route modules
api_router.include_router(auth_routes.router)
api_router.include_router(assessment_routes.router)
api_router.include_router(dashboard_routes.router)
api_router.include_router(galactic_routes.router)
api_router.include_router(geometry_routes.router)
api_router.include_router(meditation_routes.router)
api_router.include_router(oracle_routes.router)
api_router.include_router(dna_routes.router)
api_router.include_router(subscription_routes.router)
api_router.include_router(intelligence_routes.router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
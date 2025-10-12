from fastapi import APIRouter, Depends, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import os
import stripe
from models import User, SubscriptionInfo, CreateCheckoutSession, CheckoutSessionResponse
from auth import get_current_user

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "pk_test_51RCYtkFVnY6P2mTTBPGyAxP49irsncSsiUnnWVIJPUfDUCEpd8OLnhZmVYJwAtlHJb5tm6Vz0nlA3NH1y3EkcFgV00fWtqM4Pm")

# Price IDs for each tier (these would be your actual Stripe Price IDs in production)
TIER_PRICES = {
    "premium": "price_premium",  # Replace with actual Stripe Price ID
    "cosmic": "price_cosmic"      # Replace with actual Stripe Price ID
}

def get_db():
    from server import db
    return db

@router.get("/current", response_model=SubscriptionInfo)
async def get_current_subscription(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Get current subscription information"""
    return SubscriptionInfo(
        tier=current_user.subscription_tier,
        status=current_user.subscription_status,
        stripe_customer_id=current_user.stripe_customer_id
    )

@router.post("/create-checkout-session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    checkout_data: CreateCheckoutSession,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Create a Stripe checkout session for subscription upgrade"""
    try:
        # Get or create Stripe customer
        if current_user.stripe_customer_id:
            customer_id = current_user.stripe_customer_id
        else:
            # Create new Stripe customer
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": current_user.id}
            )
            customer_id = customer.id
            
            # Update user with Stripe customer ID
            await db.users.update_one(
                {"id": current_user.id},
                {"$set": {"stripe_customer_id": customer_id}}
            )
        
        # Get frontend URL from environment
        frontend_url = os.getenv("REACT_APP_BACKEND_URL", "http://localhost:3000").replace("/api", "")
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'Aetheria {checkout_data.tier.value.title()} Subscription',
                        'description': f'Monthly subscription to Aetheria {checkout_data.tier.value.title()} tier',
                    },
                    'unit_amount': 1999 if checkout_data.tier == "premium" else 4999,  # Amount in cents
                    'recurring': {
                        'interval': 'month',
                    },
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f'{frontend_url}/subscription-success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{frontend_url}/subscription-cancel',
            metadata={
                'user_id': current_user.id,
                'tier': checkout_data.tier.value
            }
        )
        
        return CheckoutSessionResponse(
            session_id=session.id,
            url=session.url
        )
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Handle Stripe webhook events"""
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET', '')
    
    try:
        if webhook_secret:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        else:
            event = stripe.Event.construct_from(
                await request.json(), stripe.api_key
            )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_id = session['metadata']['user_id']
        tier = session['metadata']['tier']
        
        # Update user's subscription
        await db.users.update_one(
            {"id": user_id},
            {
                "$set": {
                    "subscription_tier": tier,
                    "subscription_status": "active",
                    "updated_at": datetime.utcnow().isoformat()
                }
            }
        )
    
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        customer_id = subscription['customer']
        
        # Find user by customer ID and downgrade to free
        await db.users.update_one(
            {"stripe_customer_id": customer_id},
            {
                "$set": {
                    "subscription_tier": "free",
                    "subscription_status": "canceled",
                    "updated_at": datetime.utcnow().isoformat()
                }
            }
        )
    
    return {"status": "success"}

@router.post("/cancel")
async def cancel_subscription(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(lambda token, db=get_db(): get_current_user(token, db))
):
    """Cancel current subscription"""
    if not current_user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No active subscription found")
    
    try:
        # Get customer's subscriptions
        subscriptions = stripe.Subscription.list(customer=current_user.stripe_customer_id)
        
        # Cancel all active subscriptions
        for subscription in subscriptions.data:
            stripe.Subscription.delete(subscription.id)
        
        # Update user
        await db.users.update_one(
            {"id": current_user.id},
            {
                "$set": {
                    "subscription_tier": "free",
                    "subscription_status": "canceled",
                    "updated_at": datetime.utcnow().isoformat()
                }
            }
        )
        
        return {"message": "Subscription canceled successfully"}
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

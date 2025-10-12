import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lock, 
  Unlock, 
  Star, 
  Crown, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'

// Premium Feature Overlay Component
const PremiumOverlay = ({ 
  feature, 
  requiredTier = 'premium', 
  title, 
  description, 
  children,
  className = '',
  showPreview = true 
}) => {
  const { hasAccess, promptUpgrade, currentTier, tiers } = useSubscription()
  const [isHovered, setIsHovered] = useState(false)
  
  const hasFeatureAccess = hasAccess(feature, requiredTier)
  const requiredTierData = tiers[requiredTier.toUpperCase()]
  
  if (hasFeatureAccess) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blurred/Disabled Content */}
      <div className={`${showPreview ? 'blur-sm opacity-50' : 'opacity-20'} pointer-events-none`}>
        {children}
      </div>
      
      {/* Premium Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className={`ultra-glass border-0 max-w-sm transition-all duration-300 ${
          isHovered ? 'scale-105' : ''
        }`}>
          <CardContent className="p-6 text-center">
            <div className={`mx-auto p-3 rounded-full bg-gradient-to-r ${requiredTierData.color} mb-4 w-fit`}>
              {requiredTier === 'cosmic' ? (
                <Crown className="w-6 h-6 text-white" />
              ) : (
                <Star className="w-6 h-6 text-white" />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">
              {title || 'Premium Feature'}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              {description || `Unlock this feature with ${requiredTierData.name}`}
            </p>
            
            <Badge 
              variant="secondary" 
              className={`mb-4 bg-gradient-to-r ${requiredTierData.color} text-white`}
            >
              {requiredTierData.name} Required
            </Badge>
            
            <Button
              onClick={() => promptUpgrade(feature)}
              className="premium-button w-full"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Usage Limit Gate Component
const UsageLimitGate = ({ 
  limitType, 
  children, 
  title, 
  description,
  className = '' 
}) => {
  const { 
    hasReachedLimit, 
    promptUpgrade, 
    subscription, 
    usage, 
    getRemainingUsage 
  } = useSubscription()
  
  const [isHovered, setIsHovered] = useState(false)
  const limitReached = hasReachedLimit(limitType)
  const remaining = getRemainingUsage(limitType)
  
  if (!limitReached) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Disabled Content */}
      <div className="opacity-30 pointer-events-none">
        {children}
      </div>
      
      {/* Limit Reached Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className={`ultra-glass border-0 max-w-sm transition-all duration-300 ${
          isHovered ? 'scale-105' : ''
        }`}>
          <CardContent className="p-6 text-center">
            <div className="mx-auto p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-4 w-fit">
              <Zap className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">
              {title || 'Usage Limit Reached'}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              {description || `You've used all ${subscription.limits[limitType]} ${limitType} for this month.`}
            </p>
            
            <Badge variant="secondary" className="mb-4 bg-orange-500/20 text-orange-300">
              {remaining} Remaining
            </Badge>
            
            <Button
              onClick={() => promptUpgrade(limitType)}
              className="premium-button w-full"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Upgrade for Unlimited
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Feature Teaser Component
const FeatureTeaser = ({ 
  feature, 
  requiredTier = 'premium',
  title,
  description,
  benefits = [],
  className = ''
}) => {
  const { promptUpgrade, tiers } = useSubscription()
  const [isHovered, setIsHovered] = useState(false)
  
  const requiredTierData = tiers[requiredTier.toUpperCase()]
  
  return (
    <Card 
      className={`ultra-glass border-0 cursor-pointer transition-all duration-300 ${
        isHovered ? 'scale-105 ring-2 ring-purple-400/50' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => promptUpgrade(feature)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full bg-gradient-to-r ${requiredTierData.color} flex-shrink-0`}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <Badge 
                variant="secondary" 
                className={`bg-gradient-to-r ${requiredTierData.color} text-white text-xs`}
              >
                {requiredTierData.name}
              </Badge>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              {description}
            </p>
            
            {benefits.length > 0 && (
              <ul className="space-y-2 mb-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
            
            <Button
              className="premium-button w-full"
              onClick={(e) => {
                e.stopPropagation()
                promptUpgrade(feature)
              }}
            >
              <Unlock className="w-4 h-4 mr-2" />
              Unlock Feature
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Subscription Status Component
const SubscriptionStatus = ({ className = '' }) => {
  const { subscription, currentTier, promptUpgrade } = useSubscription()
  
  return (
    <Card className={`ultra-glass border-0 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gradient-to-r ${subscription.color}`}>
              {currentTier === 'cosmic' ? (
                <Crown className="w-4 h-4 text-white" />
              ) : currentTier === 'premium' ? (
                <Star className="w-4 h-4 text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h4 className="text-white font-medium">{subscription.name}</h4>
              <p className="text-gray-400 text-xs">
                {subscription.price === 0 ? 'Free Plan' : `$${subscription.price}/${subscription.period}`}
              </p>
            </div>
          </div>
          
          {currentTier !== 'cosmic' && (
            <Button
              size="sm"
              onClick={() => promptUpgrade('upgrade')}
              className="premium-button"
            >
              Upgrade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export {
  PremiumOverlay,
  UsageLimitGate,
  FeatureTeaser,
  SubscriptionStatus
}

export default PremiumOverlay

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Sparkles,
  Lock,
  Unlock
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'

// Tier Icon Component
const TierIcon = ({ tier }) => {
  const icons = {
    free: <Sparkles className="w-6 h-6" />,
    premium: <Star className="w-6 h-6" />,
    cosmic: <Crown className="w-6 h-6" />
  }
  return icons[tier] || <Sparkles className="w-6 h-6" />
}

// Feature List Component
const FeatureList = ({ features, tier, currentTier }) => {
  const tierHierarchy = ['free', 'premium', 'cosmic']
  const currentIndex = tierHierarchy.indexOf(currentTier)
  const tierIndex = tierHierarchy.indexOf(tier)
  const hasAccess = currentIndex >= tierIndex

  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className={`mt-0.5 ${hasAccess ? 'text-green-400' : 'text-gray-400'}`}>
            {hasAccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </div>
          <span className={`text-sm ${hasAccess ? 'text-white' : 'text-gray-400'}`}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
  )
}

// Pricing Card Component
const PricingCard = ({ tier, tierData, isCurrentTier, onSelect, isPopular = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`relative ultra-glass border-0 transition-all duration-300 cursor-pointer ${
        isPopular ? 'ring-2 ring-gold-400 scale-105' : ''
      } ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(tier)}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black font-semibold px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className={`mx-auto p-3 rounded-full bg-gradient-to-r ${tierData.color} mb-4`}>
          <TierIcon tier={tier} />
        </div>
        <CardTitle className="text-xl font-bold text-white mb-2">
          {tierData.name}
        </CardTitle>
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold cosmic-gradient-text">
              ${tierData.price}
            </span>
            {tierData.period !== 'forever' && (
              <span className="text-gray-400 text-sm">/{tierData.period}</span>
            )}
          </div>
          {tierData.period === 'forever' && (
            <span className="text-green-400 text-sm font-medium">Forever Free</span>
          )}
        </div>
        <p className="text-gray-300 text-sm mt-2">
          {tierData.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <FeatureList 
          features={tierData.features} 
          tier={tier}
          currentTier={tier} // Show all features as available for this tier
        />
        
        <div className="mt-6">
          {isCurrentTier ? (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled
            >
              <Check className="w-4 h-4 mr-2" />
              Current Plan
            </Button>
          ) : (
            <Button 
              className={`w-full premium-button ${
                isPopular ? 'bg-gradient-to-r from-gold-400 to-yellow-500' : ''
              }`}
            >
              <Unlock className="w-4 h-4 mr-2" />
              {tier === 'free' ? 'Downgrade' : 'Upgrade Now'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Usage Stats Component
const UsageStats = () => {
  const { subscription, usage, getUsagePercentage, getRemainingUsage } = useSubscription()
  
  const stats = [
    {
      label: 'Meditation Sessions',
      used: usage.meditationSessions,
      limit: subscription.limits.meditationSessions,
      percentage: getUsagePercentage('meditationSessions'),
      remaining: getRemainingUsage('meditationSessions')
    },
    {
      label: 'Star Systems',
      used: usage.starSystemsAccessed,
      limit: subscription.limits.starSystems,
      percentage: getUsagePercentage('starSystems'),
      remaining: getRemainingUsage('starSystems')
    },
    {
      label: 'Geometry Patterns',
      used: usage.geometryPatternsUsed,
      limit: subscription.limits.geometryPatterns,
      percentage: getUsagePercentage('geometryPatterns'),
      remaining: getRemainingUsage('geometryPatterns')
    }
  ]
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-400" />
        Current Usage
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="ultra-glass border-0">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">{stat.label}</span>
                <span className="text-xs text-gray-400">
                  {stat.used}/{stat.limit === -1 ? '∞' : stat.limit}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stat.percentage > 80 ? 'bg-red-500' : 
                    stat.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {stat.remaining} remaining
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Main Subscription Modal Component
const SubscriptionModal = () => {
  const { 
    showUpgradeModal, 
    setShowUpgradeModal, 
    currentTier, 
    tiers, 
    upgradeTo 
  } = useSubscription()
  
  const [selectedTier, setSelectedTier] = useState(currentTier)
  
  if (!showUpgradeModal) return null
  
  const handleUpgrade = () => {
    if (selectedTier !== currentTier) {
      upgradeTo(selectedTier)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="ultra-glass border-0">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/10"
              onClick={() => setShowUpgradeModal(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold cosmic-gradient-text mb-2">
                Unlock Your Cosmic Potential
              </h2>
              <p className="text-gray-300">
                Choose the perfect plan for your spiritual journey
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <UsageStats />
            
            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(tiers).map(([tier, tierData]) => (
                <PricingCard
                  key={tier}
                  tier={tier.toLowerCase()}
                  tierData={tierData}
                  isCurrentTier={currentTier === tier.toLowerCase()}
                  isPopular={tier.toLowerCase() === 'premium'}
                  onSelect={setSelectedTier}
                />
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowUpgradeModal(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Maybe Later
              </Button>
              {selectedTier !== currentTier && (
                <Button
                  onClick={handleUpgrade}
                  className="premium-button px-8"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  {selectedTier === 'free' ? 'Downgrade' : 'Upgrade Now'}
                </Button>
              )}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>30-day money back</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SubscriptionModal

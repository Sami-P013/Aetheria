import { createContext, useContext, useState, useEffect } from 'react'

// Subscription tiers configuration
export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Cosmic Explorer',
    price: 0,
    period: 'forever',
    description: 'Begin your spiritual journey with essential tools',
    features: [
      'Basic consciousness tracking',
      'Limited meditation sessions',
      '3 starseed heritage systems',
      'Basic sacred geometry patterns',
      'Community access',
      'Weekly insights'
    ],
    limits: {
      meditationSessions: 10,
      starSystems: 3,
      geometryPatterns: 2,
      assessments: 1,
      exportFormats: ['PNG']
    },
    color: 'from-purple-500 to-blue-500'
  },
  PREMIUM: {
    id: 'premium',
    name: 'Galactic Awakener',
    price: 19.99,
    period: 'month',
    description: 'Unlock advanced spiritual technologies and insights',
    features: [
      'Advanced consciousness analytics',
      'Unlimited meditation sessions',
      'All 12+ starseed heritage systems',
      'Complete sacred geometry library',
      'AI-powered spiritual guidance',
      'Personalized awakening path',
      'Premium community access',
      'Daily cosmic insights',
      'Advanced chakra analysis',
      'Astral projection guidance'
    ],
    limits: {
      meditationSessions: -1, // unlimited
      starSystems: -1,
      geometryPatterns: -1,
      assessments: -1,
      exportFormats: ['PNG', 'SVG', 'PDF']
    },
    color: 'from-pink-500 to-gold-500'
  },
  COSMIC: {
    id: 'cosmic',
    name: 'Cosmic Master',
    price: 49.99,
    period: 'month',
    description: 'Master-level access to all cosmic wisdom and tools',
    features: [
      'Everything in Galactic Awakener',
      'Personal cosmic mentor AI',
      'Advanced dimensional analysis',
      'Quantum consciousness mapping',
      'Sacred geometry creation tools',
      'Exclusive master classes',
      'Priority support',
      'Beta feature access',
      'Custom spiritual reports',
      'One-on-one guidance sessions'
    ],
    limits: {
      meditationSessions: -1,
      starSystems: -1,
      geometryPatterns: -1,
      assessments: -1,
      exportFormats: ['PNG', 'SVG', 'PDF', 'AI', 'EPS'],
      mentorSessions: 4
    },
    color: 'from-gold-500 to-purple-500'
  }
}

// Create subscription context
const SubscriptionContext = createContext()

// Custom hook to use subscription context
export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

// Subscription provider component
export const SubscriptionProvider = ({ children }) => {
  const [currentTier, setCurrentTier] = useState('free')
  const [usage, setUsage] = useState({
    meditationSessions: 3,
    starSystemsAccessed: 2,
    geometryPatternsUsed: 1,
    assessmentsCompleted: 0,
    exportsThisMonth: 2
  })
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Get current subscription details
  const subscription = SUBSCRIPTION_TIERS[currentTier.toUpperCase()]

  // Check if user has access to a feature
  const hasAccess = (feature, requiredTier = 'premium') => {
    const tierHierarchy = ['free', 'premium', 'cosmic']
    const currentIndex = tierHierarchy.indexOf(currentTier)
    const requiredIndex = tierHierarchy.indexOf(requiredTier)
    return currentIndex >= requiredIndex
  }

  // Check if user has reached usage limit
  const hasReachedLimit = (limitType) => {
    const limit = subscription.limits[limitType]
    if (limit === -1) return false // unlimited
    
    const usageKey = {
      meditationSessions: 'meditationSessions',
      starSystems: 'starSystemsAccessed',
      geometryPatterns: 'geometryPatternsUsed',
      assessments: 'assessmentsCompleted',
      exports: 'exportsThisMonth'
    }[limitType]
    
    return usage[usageKey] >= limit
  }

  // Increment usage counter
  const incrementUsage = (type) => {
    setUsage(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))
  }

  // Upgrade subscription
  const upgradeTo = (tierId) => {
    setCurrentTier(tierId)
    setShowUpgradeModal(false)
  }

  // Show upgrade modal
  const promptUpgrade = (feature) => {
    setShowUpgradeModal(true)
  }

  // Get feature status
  const getFeatureStatus = (feature, requiredTier = 'premium') => {
    const hasFeatureAccess = hasAccess(feature, requiredTier)
    const isLimited = hasReachedLimit(feature)
    
    return {
      available: hasFeatureAccess && !isLimited,
      locked: !hasFeatureAccess,
      limitReached: isLimited,
      requiresUpgrade: !hasFeatureAccess || isLimited
    }
  }

  // Get usage percentage for a limit
  const getUsagePercentage = (limitType) => {
    const limit = subscription.limits[limitType]
    if (limit === -1) return 0 // unlimited
    
    const usageKey = {
      meditationSessions: 'meditationSessions',
      starSystems: 'starSystemsAccessed',
      geometryPatterns: 'geometryPatternsUsed',
      assessments: 'assessmentsCompleted',
      exports: 'exportsThisMonth'
    }[limitType]
    
    return Math.min((usage[usageKey] / limit) * 100, 100)
  }

  // Get remaining usage
  const getRemainingUsage = (limitType) => {
    const limit = subscription.limits[limitType]
    if (limit === -1) return '∞'
    
    const usageKey = {
      meditationSessions: 'meditationSessions',
      starSystems: 'starSystemsAccessed',
      geometryPatterns: 'geometryPatternsUsed',
      assessments: 'assessmentsCompleted',
      exports: 'exportsThisMonth'
    }[limitType]
    
    return Math.max(limit - usage[usageKey], 0)
  }

  const value = {
    // Current subscription state
    currentTier,
    subscription,
    usage,
    
    // Feature access methods
    hasAccess,
    hasReachedLimit,
    getFeatureStatus,
    
    // Usage tracking
    incrementUsage,
    getUsagePercentage,
    getRemainingUsage,
    
    // Subscription management
    upgradeTo,
    promptUpgrade,
    showUpgradeModal,
    setShowUpgradeModal,
    
    // Tier configurations
    tiers: SUBSCRIPTION_TIERS
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

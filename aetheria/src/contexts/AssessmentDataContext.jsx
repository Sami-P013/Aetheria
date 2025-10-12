import React, { createContext, useContext, useState, useEffect } from 'react'

// Assessment Data Context - Dimensional.me Style Circular Data System
const AssessmentDataContext = createContext()

// 17-Dimensional Assessment Framework (15 from Dimensional.me + 2 cosmic dimensions)
const assessmentDimensions = {
  // Original Dimensional.me dimensions
  primary_traits: {
    name: 'Primary Traits',
    description: 'Fundamental personality characteristics',
    icon: '🧠',
    color: '#8b5cf6',
    completed: false,
    data: null,
    requiredTier: 'free'
  },
  cognition: {
    name: 'Cognition',
    description: 'Thinking patterns and cognitive styles',
    icon: '💭',
    color: '#06b6d4',
    completed: false,
    data: null,
    requiredTier: 'free'
  },
  values: {
    name: 'Values',
    description: 'Core beliefs and value systems',
    icon: '⭐',
    color: '#10b981',
    completed: false,
    data: null,
    requiredTier: 'free'
  },
  interaction_styles: {
    name: 'Interaction Styles',
    description: 'How you interact with others',
    icon: '🤝',
    color: '#f59e0b',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  interests: {
    name: 'Interests',
    description: 'Areas of focus and engagement',
    icon: '🎯',
    color: '#ef4444',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  love_styles: {
    name: 'Love Styles',
    description: 'Romantic and relationship approaches',
    icon: '💕',
    color: '#ec4899',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  love_attitudes: {
    name: 'Love Attitudes',
    description: 'Beliefs about love and relationships',
    icon: '💖',
    color: '#f472b6',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  attachment_style: {
    name: 'Attachment Style',
    description: 'Emotional attachment patterns',
    icon: '🔗',
    color: '#a855f7',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  conflict_style: {
    name: 'Conflict Style',
    description: 'Approach to handling disagreements',
    icon: '⚖️',
    color: '#6366f1',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  strengths: {
    name: 'Strengths',
    description: 'Personal capabilities and talents',
    icon: '💪',
    color: '#059669',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  sex_attitudes: {
    name: 'Intimacy Attitudes',
    description: 'Views on intimacy and sexuality',
    icon: '🌹',
    color: '#be185d',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  political_ideology: {
    name: 'Political Ideology',
    description: 'Political beliefs and orientations',
    icon: '🏛️',
    color: '#7c3aed',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  secondary_traits: {
    name: 'Secondary Traits',
    description: 'Additional personality characteristics',
    icon: '🎭',
    color: '#0891b2',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Living patterns and preferences',
    icon: '🏡',
    color: '#dc2626',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  communication_style: {
    name: 'Communication Style',
    description: 'How you express and receive information',
    icon: '💬',
    color: '#7c2d12',
    completed: false,
    data: null,
    requiredTier: 'cosmic'
  },
  
  // New Aetheria cosmic dimensions
  cosmic_heritage: {
    name: 'Cosmic Heritage',
    description: 'Galactic origins and starseed lineage',
    icon: '🌌',
    color: '#8b5cf6',
    completed: false,
    data: null,
    requiredTier: 'premium'
  },
  geometric_resonance: {
    name: 'Geometric Resonance',
    description: 'Sacred geometry and pattern affinities',
    icon: '🔮',
    color: '#ec4899',
    completed: false,
    data: null,
    requiredTier: 'premium'
  }
}

// Advanced Analysis Types (require specific dimension combinations)
const advancedAnalyses = {
  cosmic_leadership_potential: {
    name: 'Cosmic Leadership Potential',
    description: 'Your capacity to lead spiritual and cosmic evolution',
    requiredDimensions: ['primary_traits', 'cosmic_heritage', 'strengths'],
    requiredTier: 'cosmic',
    icon: '👑',
    color: '#f59e0b'
  },
  galactic_mission_alignment: {
    name: 'Galactic Mission Alignment',
    description: 'How your personality aligns with your cosmic purpose',
    requiredDimensions: ['cosmic_heritage', 'values', 'strengths', 'interests'],
    requiredTier: 'cosmic',
    icon: '🎯',
    color: '#8b5cf6'
  },
  sacred_relationship_dynamics: {
    name: 'Sacred Relationship Dynamics',
    description: 'Cosmic-informed relationship patterns and compatibility',
    requiredDimensions: ['love_styles', 'attachment_style', 'cosmic_heritage'],
    requiredTier: 'premium',
    icon: '💫',
    color: '#ec4899'
  },
  geometric_manifestation_style: {
    name: 'Geometric Manifestation Style',
    description: 'How you naturally create and manifest using sacred geometry',
    requiredDimensions: ['geometric_resonance', 'primary_traits', 'strengths'],
    requiredTier: 'premium',
    icon: '✨',
    color: '#06b6d4'
  },
  consciousness_evolution_path: {
    name: 'Consciousness Evolution Path',
    description: 'Your personalized spiritual development roadmap',
    requiredDimensions: ['primary_traits', 'cosmic_heritage', 'geometric_resonance', 'values'],
    requiredTier: 'cosmic',
    icon: '🌟',
    color: '#10b981'
  },
  cosmic_communication_style: {
    name: 'Cosmic Communication Style',
    description: 'How your galactic heritage influences your communication',
    requiredDimensions: ['cosmic_heritage', 'communication_style', 'interaction_styles'],
    requiredTier: 'premium',
    icon: '📡',
    color: '#a855f7'
  },
  sacred_space_design: {
    name: 'Sacred Space Design Profile',
    description: 'Personalized recommendations for your optimal environment',
    requiredDimensions: ['geometric_resonance', 'lifestyle', 'values'],
    requiredTier: 'premium',
    icon: '🏛️',
    color: '#f472b6'
  },
  galactic_team_formation: {
    name: 'Galactic Team Formation',
    description: 'Optimal cosmic collaboration and soul family connections',
    requiredDimensions: ['cosmic_heritage', 'interaction_styles', 'conflict_style'],
    requiredTier: 'cosmic',
    icon: '🤝',
    color: '#059669'
  }
}

// Insight Generation System
const generateCrossModuleInsights = (assessmentData) => {
  const insights = []
  
  // Check for cosmic-personality correlations
  if (assessmentData.cosmic_heritage?.data && assessmentData.primary_traits?.data) {
    const heritage = assessmentData.cosmic_heritage.data.primaryHeritage
    const traits = assessmentData.primary_traits.data
    
    if (heritage === 'pleiadian' && traits.empathy > 80) {
      insights.push({
        type: 'correlation',
        title: 'Pleiadian Empath Alignment',
        description: 'Your high empathy scores perfectly align with your Pleiadian heritage, suggesting strong healing abilities.',
        confidence: 95,
        actionable: 'Consider developing energy healing practices or emotional counseling skills.'
      })
    }
    
    if (heritage === 'arcturian' && traits.analytical > 85) {
      insights.push({
        type: 'correlation',
        title: 'Arcturian Analytical Mastery',
        description: 'Your analytical thinking aligns with Arcturian consciousness technology expertise.',
        confidence: 92,
        actionable: 'Explore sacred geometry, energy healing technology, or consciousness research.'
      })
    }
  }
  
  // Check for geometric-personality correlations
  if (assessmentData.geometric_resonance?.data && assessmentData.primary_traits?.data) {
    const geometry = assessmentData.geometric_resonance.data.primaryArchetype
    const traits = assessmentData.primary_traits.data
    
    if (geometry === 'circle_mystic' && traits.spirituality > 75) {
      insights.push({
        type: 'enhancement',
        title: 'Circle Mystic Spiritual Alignment',
        description: 'Your circular geometric resonance enhances your natural spiritual inclinations.',
        confidence: 88,
        actionable: 'Create circular meditation spaces and practice mandala creation for spiritual growth.'
      })
    }
  }
  
  return insights
}

export const AssessmentDataProvider = ({ children }) => {
  const [assessmentData, setAssessmentData] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('aetheria_assessment_data')
    return saved ? JSON.parse(saved) : { ...assessmentDimensions }
  })
  
  const [crossModuleInsights, setCrossModuleInsights] = useState([])
  const [availableAnalyses, setAvailableAnalyses] = useState([])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('aetheria_assessment_data', JSON.stringify(assessmentData))
    
    // Generate cross-module insights
    const insights = generateCrossModuleInsights(assessmentData)
    setCrossModuleInsights(insights)
    
    // Check which advanced analyses are available
    const available = Object.entries(advancedAnalyses).filter(([key, analysis]) => {
      return analysis.requiredDimensions.every(dim => assessmentData[dim]?.completed)
    }).map(([key, analysis]) => ({ key, ...analysis }))
    
    setAvailableAnalyses(available)
  }, [assessmentData])

  const updateAssessmentData = (dimensionKey, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [dimensionKey]: {
        ...prev[dimensionKey],
        completed: true,
        data: data,
        completedAt: new Date().toISOString()
      }
    }))
  }

  const getCompletedDimensions = () => {
    return Object.entries(assessmentData)
      .filter(([key, dimension]) => dimension.completed)
      .map(([key, dimension]) => ({ key, ...dimension }))
  }

  const getIncompleteRequiredDimensions = (analysisKey) => {
    const analysis = advancedAnalyses[analysisKey]
    if (!analysis) return []
    
    return analysis.requiredDimensions.filter(dim => !assessmentData[dim]?.completed)
  }

  const getCompletionPercentage = () => {
    const total = Object.keys(assessmentData).length
    const completed = Object.values(assessmentData).filter(dim => dim.completed).length
    return Math.round((completed / total) * 100)
  }

  const getDimensionsByTier = (tier) => {
    return Object.entries(assessmentData)
      .filter(([key, dimension]) => dimension.requiredTier === tier)
      .map(([key, dimension]) => ({ key, ...dimension }))
  }

  const getRecommendedNextAssessment = () => {
    // Prioritize free assessments first
    const freeDimensions = getDimensionsByTier('free').filter(dim => !dim.completed)
    if (freeDimensions.length > 0) {
      return freeDimensions[0]
    }
    
    // Then premium assessments
    const premiumDimensions = getDimensionsByTier('premium').filter(dim => !dim.completed)
    if (premiumDimensions.length > 0) {
      return premiumDimensions[0]
    }
    
    // Finally cosmic assessments
    const cosmicDimensions = getDimensionsByTier('cosmic').filter(dim => !dim.completed)
    if (cosmicDimensions.length > 0) {
      return cosmicDimensions[0]
    }
    
    return null
  }

  const generatePersonalizedInsights = (dimensionKey) => {
    const dimension = assessmentData[dimensionKey]
    if (!dimension?.completed) return []
    
    const insights = []
    
    // Generate insights based on this dimension's data combined with others
    const completedDimensions = getCompletedDimensions()
    
    completedDimensions.forEach(otherDim => {
      if (otherDim.key !== dimensionKey) {
        // Generate cross-dimensional insights
        const insight = generateCrossDimensionalInsight(dimension, otherDim)
        if (insight) insights.push(insight)
      }
    })
    
    return insights
  }

  const generateCrossDimensionalInsight = (dim1, dim2) => {
    // This would contain sophisticated logic to generate insights
    // based on combinations of different assessment results
    
    // Example: Cosmic Heritage + Primary Traits
    if (dim1.key === 'cosmic_heritage' && dim2.key === 'primary_traits') {
      return {
        type: 'cosmic_personality_alignment',
        title: 'Cosmic-Personality Alignment',
        description: `Your ${dim1.data?.primaryHeritage} heritage aligns with your personality traits in unique ways.`,
        strength: 'high',
        actionable: 'Leverage this alignment for spiritual development.'
      }
    }
    
    return null
  }

  const value = {
    assessmentData,
    updateAssessmentData,
    getCompletedDimensions,
    getIncompleteRequiredDimensions,
    getCompletionPercentage,
    getDimensionsByTier,
    getRecommendedNextAssessment,
    generatePersonalizedInsights,
    crossModuleInsights,
    availableAnalyses,
    advancedAnalyses,
    assessmentDimensions
  }

  return (
    <AssessmentDataContext.Provider value={value}>
      {children}
    </AssessmentDataContext.Provider>
  )
}

export const useAssessmentData = () => {
  const context = useContext(AssessmentDataContext)
  if (!context) {
    throw new Error('useAssessmentData must be used within an AssessmentDataProvider')
  }
  return context
}

export default AssessmentDataContext

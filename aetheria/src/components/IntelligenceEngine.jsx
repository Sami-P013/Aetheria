import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain,
  Network,
  Zap,
  Star,
  Eye,
  Target,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Crown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Compass,
  Heart,
  Atom
} from 'lucide-react'
import { useAssessmentData } from '../contexts/AssessmentDataContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay } from './PremiumGate'

// Advanced Intelligence Algorithms
const IntelligenceEngine = () => {
  const { 
    assessmentData, 
    getCompletedDimensions,
    crossModuleInsights,
    availableAnalyses 
  } = useAssessmentData()
  
  const { subscription, hasFeatureAccess } = useSubscription()
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const [correlationMatrix, setCorrelationMatrix] = useState({})
  const [predictiveInsights, setPredictiveInsights] = useState([])
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([])

  // Advanced correlation analysis
  useEffect(() => {
    const completedDimensions = getCompletedDimensions()
    if (completedDimensions.length >= 2) {
      generateCorrelationMatrix(completedDimensions)
      generatePredictiveInsights(completedDimensions)
      generatePersonalizedRecommendations(completedDimensions)
    }
  }, [assessmentData])

  const generateCorrelationMatrix = (dimensions) => {
    const matrix = {}
    
    // Cosmic Heritage correlations
    const cosmicHeritage = dimensions.find(d => d.key === 'cosmic_heritage')
    const primaryTraits = dimensions.find(d => d.key === 'primary_traits')
    const geometricResonance = dimensions.find(d => d.key === 'geometric_resonance')
    
    if (cosmicHeritage && primaryTraits) {
      const heritage = cosmicHeritage.data?.primaryHeritage
      const traits = primaryTraits.data
      
      matrix.cosmic_personality = {
        correlation: calculatePersonalityAlignment(heritage, traits),
        strength: 'high',
        insights: generateCosmicPersonalityInsights(heritage, traits)
      }
    }
    
    if (cosmicHeritage && geometricResonance) {
      const heritage = cosmicHeritage.data?.primaryHeritage
      const geometry = geometricResonance.data?.primaryArchetype
      
      matrix.cosmic_geometry = {
        correlation: calculateCosmicGeometryAlignment(heritage, geometry),
        strength: 'medium',
        insights: generateCosmicGeometryInsights(heritage, geometry)
      }
    }
    
    setCorrelationMatrix(matrix)
  }

  const calculatePersonalityAlignment = (heritage, traits) => {
    const alignmentScores = {
      pleiadian: {
        empathy: 0.9,
        intuition: 0.8,
        healing: 0.9,
        emotional_intelligence: 0.85
      },
      arcturian: {
        analytical: 0.9,
        technological: 0.85,
        spiritual: 0.8,
        geometric_thinking: 0.9
      },
      sirian: {
        wisdom: 0.9,
        teaching: 0.85,
        ancient_knowledge: 0.9,
        mystical: 0.8
      },
      andromedan: {
        creativity: 0.9,
        freedom: 0.85,
        innovation: 0.9,
        independence: 0.8
      },
      lyran: {
        leadership: 0.9,
        confidence: 0.85,
        pioneering: 0.9,
        manifestation: 0.8
      }
    }
    
    const heritageProfile = alignmentScores[heritage]
    if (!heritageProfile || !traits) return 0
    
    let totalAlignment = 0
    let count = 0
    
    Object.entries(heritageProfile).forEach(([trait, expectedScore]) => {
      if (traits[trait] !== undefined) {
        const actualScore = traits[trait] / 100 // Normalize to 0-1
        const alignment = 1 - Math.abs(expectedScore - actualScore)
        totalAlignment += alignment
        count++
      }
    })
    
    return count > 0 ? Math.round((totalAlignment / count) * 100) : 0
  }

  const calculateCosmicGeometryAlignment = (heritage, geometry) => {
    const alignments = {
      pleiadian: { circle_mystic: 85, pentagon_alchemist: 70, star_visionary: 60 },
      arcturian: { triangle_architect: 90, hexagon_networker: 75, square_guardian: 65 },
      sirian: { star_visionary: 85, circle_mystic: 70, pentagon_alchemist: 80 },
      andromedan: { star_visionary: 90, triangle_architect: 70, circle_mystic: 60 },
      lyran: { triangle_architect: 85, star_visionary: 80, square_guardian: 70 }
    }
    
    return alignments[heritage]?.[geometry] || 50
  }

  const generateCosmicPersonalityInsights = (heritage, traits) => {
    const insights = []
    
    if (heritage === 'pleiadian' && traits.empathy > 80) {
      insights.push({
        type: 'strength_amplification',
        title: 'Pleiadian Empath Mastery',
        description: 'Your high empathy aligns perfectly with Pleiadian healing abilities',
        actionable: 'Develop energy healing practices and emotional counseling skills',
        confidence: 95
      })
    }
    
    if (heritage === 'arcturian' && traits.analytical > 85) {
      insights.push({
        type: 'cosmic_technology',
        title: 'Arcturian Tech Integration',
        description: 'Your analytical mind resonates with Arcturian consciousness technology',
        actionable: 'Explore sacred geometry programming and consciousness research',
        confidence: 92
      })
    }
    
    return insights
  }

  const generateCosmicGeometryInsights = (heritage, geometry) => {
    const insights = []
    
    if (heritage === 'pleiadian' && geometry === 'circle_mystic') {
      insights.push({
        type: 'harmonic_resonance',
        title: 'Pleiadian Circle Harmony',
        description: 'Your circular geometric resonance enhances Pleiadian healing frequencies',
        actionable: 'Create circular healing spaces and practice mandala meditation',
        confidence: 88
      })
    }
    
    return insights
  }

  const generatePredictiveInsights = (dimensions) => {
    const insights = []
    
    // Predict optimal development paths
    const cosmicHeritage = dimensions.find(d => d.key === 'cosmic_heritage')
    const completedCount = dimensions.length
    
    if (cosmicHeritage && completedCount >= 3) {
      const heritage = cosmicHeritage.data?.primaryHeritage
      
      insights.push({
        type: 'development_path',
        title: `${heritage.charAt(0).toUpperCase() + heritage.slice(1)} Mastery Path`,
        description: `Based on your ${heritage} heritage and current assessments, you're 73% aligned with the optimal development path`,
        nextSteps: [
          'Complete Geometric Resonance Assessment',
          'Activate DNA sequences specific to your heritage',
          'Develop heritage-specific abilities through targeted practices'
        ],
        timeframe: '3-6 months',
        confidence: 87
      })
    }
    
    // Predict potential challenges
    if (completedCount >= 4) {
      insights.push({
        type: 'challenge_prediction',
        title: 'Integration Challenge Alert',
        description: 'Your multi-dimensional profile suggests potential integration challenges in the next phase',
        prevention: [
          'Focus on grounding practices',
          'Balance cosmic awareness with earthly responsibilities',
          'Seek community support for integration'
        ],
        probability: 65,
        confidence: 78
      })
    }
    
    setPredictiveInsights(insights)
  }

  const generatePersonalizedRecommendations = (dimensions) => {
    const recommendations = []
    
    // Daily practice recommendations
    const cosmicHeritage = dimensions.find(d => d.key === 'cosmic_heritage')
    const geometricResonance = dimensions.find(d => d.key === 'geometric_resonance')
    
    if (cosmicHeritage) {
      const heritage = cosmicHeritage.data?.primaryHeritage
      
      recommendations.push({
        category: 'daily_practice',
        title: `${heritage.charAt(0).toUpperCase() + heritage.slice(1)} Daily Activation`,
        practices: getHeritageSpecificPractices(heritage),
        duration: '15-30 minutes',
        frequency: 'Daily',
        priority: 'high'
      })
    }
    
    if (geometricResonance) {
      const geometry = geometricResonance.data?.primaryArchetype
      
      recommendations.push({
        category: 'environment',
        title: 'Sacred Space Optimization',
        suggestions: getGeometrySpecificEnvironment(geometry),
        implementation: 'Gradual over 2-4 weeks',
        priority: 'medium'
      })
    }
    
    // Learning path recommendations
    recommendations.push({
      category: 'learning',
      title: 'Consciousness Expansion Curriculum',
      modules: [
        'Advanced Meditation Techniques',
        'Energy Healing Fundamentals',
        'Sacred Geometry Applications',
        'Cosmic Consciousness Integration'
      ],
      duration: '6-12 months',
      priority: 'medium'
    })
    
    setPersonalizedRecommendations(recommendations)
  }

  const getHeritageSpecificPractices = (heritage) => {
    const practices = {
      pleiadian: [
        'Heart chakra meditation with rose quartz',
        'Emotional healing visualization',
        'Light language activation',
        'Compassion cultivation practice'
      ],
      arcturian: [
        'Sacred geometry meditation',
        'Technological consciousness integration',
        'Third eye activation',
        'Dimensional awareness practice'
      ],
      sirian: [
        'Ancient wisdom study',
        'Water ceremony rituals',
        'Akashic records meditation',
        'Teaching preparation practice'
      ],
      andromedan: [
        'Creative expression meditation',
        'Freedom consciousness activation',
        'Innovation visualization',
        'Limitation release practice'
      ],
      lyran: [
        'Leadership confidence building',
        'Creative manifestation practice',
        'Pioneer spirit activation',
        'Cosmic authority meditation'
      ]
    }
    
    return practices[heritage] || []
  }

  const getGeometrySpecificEnvironment = (geometry) => {
    const environments = {
      circle_mystic: [
        'Create circular meditation spaces',
        'Use round furniture and decor',
        'Incorporate flowing, curved lines',
        'Add circular mirrors and mandalas'
      ],
      triangle_architect: [
        'Design triangular focal points',
        'Use pyramid-shaped objects',
        'Create directional energy flow',
        'Incorporate angular, structured elements'
      ],
      square_guardian: [
        'Organize space with clear boundaries',
        'Use square and rectangular forms',
        'Create structured, orderly environments',
        'Add grounding, stable elements'
      ],
      pentagon_alchemist: [
        'Incorporate golden ratio proportions',
        'Use pentagonal and spiral forms',
        'Add natural, organic elements',
        'Create harmonious, balanced spaces'
      ],
      hexagon_networker: [
        'Design interconnected spaces',
        'Use hexagonal patterns and forms',
        'Create community-oriented areas',
        'Add collaborative, social elements'
      ],
      star_visionary: [
        'Create star-shaped focal points',
        'Use multi-pointed and radial designs',
        'Add cosmic and celestial elements',
        'Incorporate expansive, visionary spaces'
      ]
    }
    
    return environments[geometry] || []
  }

  const CorrelationCard = ({ correlation, title }) => (
    <Card className="ultra-glass border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Network className="w-5 h-5 text-purple-400" />
          {title}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {correlation.correlation}% correlation
        </Badge>
      </CardHeader>
      <CardContent>
        <Progress value={correlation.correlation} className="h-2 mb-4" />
        <div className="space-y-3">
          {correlation.insights.map((insight, index) => (
            <div key={index} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
              <p className="text-gray-300 text-xs mb-2">{insight.description}</p>
              <p className="text-purple-400 text-xs">💡 {insight.actionable}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {insight.confidence}% confidence
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const PredictiveInsightCard = ({ insight }) => (
    <Card className="ultra-glass border-0 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
            <p className="text-gray-300 text-xs mb-3">{insight.description}</p>
            
            {insight.nextSteps && (
              <div className="mb-3">
                <h5 className="text-blue-400 font-medium text-xs mb-1">Next Steps:</h5>
                <ul className="space-y-1">
                  {insight.nextSteps.map((step, index) => (
                    <li key={index} className="text-gray-300 text-xs flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {insight.confidence}% confidence
              </Badge>
              {insight.timeframe && (
                <Badge variant="secondary" className="text-xs">
                  {insight.timeframe}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const RecommendationCard = ({ recommendation }) => (
    <Card className="ultra-glass border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-medium">
            {recommendation.title}
          </CardTitle>
          <Badge 
            variant={recommendation.priority === 'high' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {recommendation.priority} priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {recommendation.practices && (
          <div className="space-y-2">
            {recommendation.practices.map((practice, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-gray-300">{practice}</span>
              </div>
            ))}
          </div>
        )}
        
        {recommendation.suggestions && (
          <div className="space-y-2">
            {recommendation.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Home className="w-3 h-3 text-green-400" />
                <span className="text-gray-300">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
        
        {recommendation.modules && (
          <div className="space-y-2">
            {recommendation.modules.map((module, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Brain className="w-3 h-3 text-blue-400" />
                <span className="text-gray-300">{module}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{recommendation.category}</span>
            <span>{recommendation.duration || recommendation.frequency}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
          Intelligence Engine
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Advanced cross-module analysis and personalized consciousness development insights
        </p>
      </div>

      {/* Intelligence Overview */}
      <Card className="ultra-glass border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            Intelligence Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Object.keys(correlationMatrix).length}
              </div>
              <div className="text-sm text-gray-400">Active Correlations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {predictiveInsights.length}
              </div>
              <div className="text-sm text-gray-400">Predictive Insights</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {personalizedRecommendations.length}
              </div>
              <div className="text-sm text-gray-400">Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">
                {availableAnalyses.length}
              </div>
              <div className="text-sm text-gray-400">Advanced Analyses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="correlations" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="correlations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(correlationMatrix).map(([key, correlation]) => (
              <CorrelationCard 
                key={key} 
                correlation={correlation} 
                title={key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            ))}
          </div>
          
          {Object.keys(correlationMatrix).length === 0 && (
            <Card className="ultra-glass border-0">
              <CardContent className="p-8 text-center">
                <Network className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No Correlations Yet</h4>
                <p className="text-gray-400 text-sm">
                  Complete more assessments to unlock cross-module correlations and insights.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          {predictiveInsights.length > 0 ? (
            predictiveInsights.map((insight, index) => (
              <PredictiveInsightCard key={index} insight={insight} />
            ))
          ) : (
            <Card className="ultra-glass border-0">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No Predictions Available</h4>
                <p className="text-gray-400 text-sm">
                  Complete more assessments to unlock predictive insights about your development path.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {personalizedRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalizedRecommendations.map((recommendation, index) => (
                <RecommendationCard key={index} recommendation={recommendation} />
              ))}
            </div>
          ) : (
            <Card className="ultra-glass border-0">
              <CardContent className="p-8 text-center">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No Recommendations Yet</h4>
                <p className="text-gray-400 text-sm">
                  Complete assessments to receive personalized development recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Assessment Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      {Math.round((getCompletedDimensions().length / Object.keys(assessmentData).length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Overall Completion</div>
                  </div>
                  <Progress 
                    value={(getCompletedDimensions().length / Object.keys(assessmentData).length) * 100} 
                    className="h-3" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Intelligence Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Correlations Active</span>
                    <span className="text-green-400 font-semibold">
                      {Object.keys(correlationMatrix).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Insights Generated</span>
                    <span className="text-blue-400 font-semibold">
                      {crossModuleInsights.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Recommendations</span>
                    <span className="text-purple-400 font-semibold">
                      {personalizedRecommendations.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default IntelligenceEngine

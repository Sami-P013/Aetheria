import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Triangle, 
  Square, 
  Circle, 
  Hexagon,
  Star,
  Compass,
  Ruler,
  Calculator,
  Eye,
  Brain,
  Palette,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay, UsageLimitGate } from './PremiumGate'

// Sacred Geometry Assessment Dimensions
const geometryDimensions = [
  {
    id: 'spatial_intelligence',
    name: 'Spatial Intelligence',
    description: 'Your ability to perceive and manipulate geometric relationships',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    questionCount: 15,
    requiredTier: 'free'
  },
  {
    id: 'pattern_recognition',
    name: 'Sacred Pattern Recognition',
    description: 'Natural affinity for recognizing cosmic geometric patterns',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    questionCount: 12,
    requiredTier: 'free'
  },
  {
    id: 'geometric_resonance',
    name: 'Geometric Resonance',
    description: 'Emotional and energetic response to different geometric forms',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    questionCount: 18,
    requiredTier: 'premium'
  },
  {
    id: 'mathematical_intuition',
    name: 'Mathematical Intuition',
    description: 'Intuitive understanding of mathematical relationships and ratios',
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    questionCount: 10,
    requiredTier: 'premium'
  },
  {
    id: 'creative_application',
    name: 'Creative Geometric Application',
    description: 'Ability to apply geometric principles in creative and practical ways',
    icon: <Palette className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    questionCount: 15,
    requiredTier: 'cosmic'
  }
]

// Geometric Archetypes
const geometricArchetypes = {
  circle_mystic: {
    name: 'Circle Mystic',
    primaryShape: 'Circle',
    description: 'You resonate with unity, wholeness, and infinite potential',
    characteristics: [
      'Natural affinity for meditation and spiritual practices',
      'Seeks harmony and unity in all aspects of life',
      'Drawn to cyclical patterns and natural rhythms',
      'Excellent at seeing the bigger picture and connections',
      'Prefers flowing, organic approaches to problem-solving'
    ],
    strengths: ['Unity Consciousness', 'Holistic Thinking', 'Spiritual Insight', 'Harmony Creation'],
    applications: ['Mandala Creation', 'Circular Meditation Spaces', 'Healing Circles', 'Cyclical Planning'],
    color: '#06b6d4',
    symbol: '○'
  },
  triangle_architect: {
    name: 'Triangle Architect',
    primaryShape: 'Triangle',
    description: 'You embody dynamic balance, manifestation, and directed energy',
    characteristics: [
      'Natural ability to manifest ideas into reality',
      'Strong sense of direction and purpose',
      'Excellent at creating stable foundations',
      'Drawn to hierarchical structures and clear organization',
      'Skilled at balancing multiple forces or perspectives'
    ],
    strengths: ['Manifestation', 'Structural Thinking', 'Energy Direction', 'Foundation Building'],
    applications: ['Pyramid Meditation', 'Triangular Garden Design', 'Energy Focusing', 'Goal Architecture'],
    color: '#8b5cf6',
    symbol: '△'
  },
  square_guardian: {
    name: 'Square Guardian',
    primaryShape: 'Square',
    description: 'You represent stability, order, and material mastery',
    characteristics: [
      'Natural organizer with strong practical skills',
      'Creates stable, secure environments',
      'Excellent at systematic approaches and methodical work',
      'Drawn to traditional structures and proven methods',
      'Skilled at bringing order to chaos'
    ],
    strengths: ['Organization', 'Stability Creation', 'Practical Application', 'System Building'],
    applications: ['Sacred Architecture', 'Geometric Gardens', 'Organizational Systems', 'Grounding Practices'],
    color: '#10b981',
    symbol: '□'
  },
  pentagon_alchemist: {
    name: 'Pentagon Alchemist',
    primaryShape: 'Pentagon',
    description: 'You work with golden ratio harmonics and natural proportions',
    characteristics: [
      'Deep connection to natural proportions and the golden ratio',
      'Skilled at creating beautiful, harmonious designs',
      'Natural understanding of growth patterns and spirals',
      'Drawn to pentagonal forms in nature (flowers, shells, etc.)',
      'Excellent at balancing multiple elements harmoniously'
    ],
    strengths: ['Golden Ratio Mastery', 'Natural Harmony', 'Spiral Dynamics', 'Beauty Creation'],
    applications: ['Fibonacci Gardens', 'Golden Ratio Design', 'Natural Architecture', 'Harmonic Healing'],
    color: '#f59e0b',
    symbol: '⬟'
  },
  hexagon_networker: {
    name: 'Hexagon Networker',
    description: 'You excel at creating efficient networks and community structures',
    characteristics: [
      'Natural ability to create efficient, interconnected systems',
      'Excellent at community building and network creation',
      'Drawn to honeycomb patterns and hexagonal efficiency',
      'Skilled at optimizing resources and energy flow',
      'Creates strong, supportive community structures'
    ],
    strengths: ['Network Building', 'Efficiency Optimization', 'Community Creation', 'Resource Management'],
    applications: ['Community Design', 'Network Architecture', 'Efficient Systems', 'Collaborative Spaces'],
    color: '#ec4899',
    symbol: '⬡'
  },
  star_visionary: {
    name: 'Star Visionary',
    primaryShape: 'Star',
    description: 'You channel cosmic inspiration and multidimensional awareness',
    characteristics: [
      'Natural visionary with cosmic perspective',
      'Excellent at seeing multiple dimensions of problems',
      'Drawn to star patterns and celestial geometries',
      'Skilled at inspiring others with expansive vision',
      'Creates bridges between earthly and cosmic realms'
    ],
    strengths: ['Cosmic Vision', 'Multidimensional Thinking', 'Inspiration', 'Bridge Building'],
    applications: ['Star Maps', 'Visionary Art', 'Cosmic Architecture', 'Dimensional Bridging'],
    color: '#a855f7',
    symbol: '★'
  }
}

// Sample questions for geometry assessment
const geometryQuestions = {
  spatial_intelligence: [
    {
      id: 'si_1',
      text: 'When you look at this pattern, what do you see first?',
      type: 'visual_pattern',
      pattern: 'flower_of_life_partial',
      options: [
        { value: 'circles', text: 'Individual circles', archetype: 'circle_mystic', weight: 3 },
        { value: 'triangles', text: 'Triangular formations', archetype: 'triangle_architect', weight: 3 },
        { value: 'hexagons', text: 'Hexagonal structure', archetype: 'hexagon_networker', weight: 3 },
        { value: 'overall_pattern', text: 'The complete unified pattern', archetype: 'star_visionary', weight: 2 }
      ]
    },
    {
      id: 'si_2',
      text: 'If you were to design a meditation space, which geometric layout would feel most natural?',
      type: 'multiple_choice',
      options: [
        { value: 'circular', text: 'Circular with curved seating', archetype: 'circle_mystic', weight: 3 },
        { value: 'triangular', text: 'Triangular with focused energy point', archetype: 'triangle_architect', weight: 3 },
        { value: 'square', text: 'Square with clear boundaries and structure', archetype: 'square_guardian', weight: 3 },
        { value: 'pentagonal', text: 'Pentagonal following golden ratio proportions', archetype: 'pentagon_alchemist', weight: 3 },
        { value: 'hexagonal', text: 'Hexagonal for group connection', archetype: 'hexagon_networker', weight: 3 },
        { value: 'star_shaped', text: 'Star-shaped for cosmic connection', archetype: 'star_visionary', weight: 3 }
      ]
    }
    // ... more spatial intelligence questions
  ],
  pattern_recognition: [
    {
      id: 'pr_1',
      text: 'Which of these patterns feels most "alive" or energetically active to you?',
      type: 'pattern_selection',
      options: [
        { value: 'spiral', text: 'Fibonacci Spiral', archetype: 'pentagon_alchemist', weight: 3 },
        { value: 'mandala', text: 'Circular Mandala', archetype: 'circle_mystic', weight: 3 },
        { value: 'crystal', text: 'Crystal Lattice', archetype: 'square_guardian', weight: 2 },
        { value: 'star_tetrahedron', text: 'Star Tetrahedron', archetype: 'star_visionary', weight: 3 }
      ]
    }
    // ... more pattern recognition questions
  ],
  geometric_resonance: [
    {
      id: 'gr_1',
      text: 'Rate how each geometric form makes you feel energetically:',
      type: 'multi_rating',
      shapes: [
        { name: 'Circle', archetype: 'circle_mystic' },
        { name: 'Triangle', archetype: 'triangle_architect' },
        { name: 'Square', archetype: 'square_guardian' },
        { name: 'Pentagon', archetype: 'pentagon_alchemist' },
        { name: 'Hexagon', archetype: 'hexagon_networker' },
        { name: 'Star', archetype: 'star_visionary' }
      ],
      scale: [1, 2, 3, 4, 5] // 1 = draining, 5 = energizing
    }
    // ... more resonance questions
  ]
}

const PersonalGeometryAssessment = () => {
  const { subscription, incrementUsage, hasFeatureAccess } = useSubscription()
  const [currentDimension, setCurrentDimension] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [completedDimensions, setCompletedDimensions] = useState([])
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [geometricScores, setGeometricScores] = useState({})

  const currentDimensionData = geometryDimensions[currentDimension]
  const currentQuestions = geometryQuestions[currentDimensionData?.id] || []
  const currentQuestionData = currentQuestions[currentQuestion]

  const totalQuestions = geometryDimensions.reduce((sum, dim) => sum + dim.questionCount, 0)
  const answeredQuestions = Object.keys(responses).length
  const progressPercentage = (answeredQuestions / totalQuestions) * 100

  const handleResponse = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }))
  }

  const handleMultiRating = (questionId, ratings) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: ratings
    }))
  }

  const calculateGeometricProfile = () => {
    const scores = {
      circle_mystic: 0,
      triangle_architect: 0,
      square_guardian: 0,
      pentagon_alchemist: 0,
      hexagon_networker: 0,
      star_visionary: 0
    }

    // Calculate scores based on responses
    Object.entries(responses).forEach(([questionId, response]) => {
      if (typeof response === 'string') {
        // Find the archetype for this response
        const question = Object.values(geometryQuestions).flat().find(q => q.id === questionId)
        if (question && question.options) {
          const option = question.options.find(opt => opt.value === response)
          if (option) {
            scores[option.archetype] = (scores[option.archetype] || 0) + (option.weight || 1)
          }
        }
      } else if (typeof response === 'object' && response !== null) {
        // Handle multi-rating responses
        Object.entries(response).forEach(([shape, rating]) => {
          const question = Object.values(geometryQuestions).flat().find(q => q.id === questionId)
          if (question && question.shapes) {
            const shapeData = question.shapes.find(s => s.name === shape)
            if (shapeData) {
              scores[shapeData.archetype] = (scores[shapeData.archetype] || 0) + rating
            }
          }
        })
      }
    })

    // Normalize scores to percentages
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
    if (total > 0) {
      Object.keys(scores).forEach(key => {
        scores[key] = Math.round((scores[key] / total) * 100)
      })
    }

    setGeometricScores(scores)
    setShowResults(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const newCompleted = [...completedDimensions, currentDimensionData.id]
      setCompletedDimensions(newCompleted)
      
      if (currentDimension < geometryDimensions.length - 1) {
        setCurrentDimension(currentDimension + 1)
        setCurrentQuestion(0)
      } else {
        calculateGeometricProfile()
      }
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1)
      const prevDimension = geometryDimensions[currentDimension - 1]
      const prevQuestions = geometryQuestions[prevDimension.id] || []
      setCurrentQuestion(prevQuestions.length - 1)
    }
  }

  if (!assessmentStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
            Personal Geometry Assessment
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover your sacred geometric archetype and natural pattern affinities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {geometryDimensions.map((dimension, index) => (
            <Card key={dimension.id} className="ultra-glass border-0">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${dimension.color} flex items-center justify-center mb-3`}>
                  {dimension.icon}
                </div>
                <CardTitle className="text-white text-lg">
                  {dimension.name}
                </CardTitle>
                <Badge variant={dimension.requiredTier === 'free' ? 'default' : 'secondary'} className="w-fit">
                  {dimension.requiredTier === 'free' ? 'Free' : dimension.requiredTier === 'premium' ? 'Premium' : 'Cosmic'}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  {dimension.description}
                </p>
                <p className="text-purple-400 font-medium">
                  {dimension.questionCount} questions
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <UsageLimitGate 
            featureType="geometryAssessment"
            requiredTier="free"
            usageType="assessments"
          >
            <Button 
              onClick={() => {
                setAssessmentStarted(true)
                incrementUsage('assessments')
              }}
              className="premium-button px-8 py-3 text-lg"
            >
              Begin Geometry Assessment
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </UsageLimitGate>
        </div>
      </div>
    )
  }

  if (showResults) {
    const primaryArchetype = Object.entries(geometricScores).sort(([,a], [,b]) => b - a)[0]
    const primaryProfile = geometricArchetypes[primaryArchetype[0]]

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
            Your Geometric Archetype
          </h1>
          <p className="text-xl text-gray-300">
            Assessment Complete - Discover Your Sacred Pattern
          </p>
        </div>

        <Card className="ultra-glass border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: primaryProfile.color }}
              >
                {primaryProfile.symbol}
              </div>
              <div>
                <div>{primaryProfile.name}</div>
                <div className="text-lg text-gray-400 font-normal">
                  Primary Shape: {primaryProfile.primaryShape}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-300 text-lg">
              {primaryProfile.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Characteristics</h3>
                <ul className="space-y-2">
                  {primaryProfile.characteristics.map((char, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Geometric Strengths</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {primaryProfile.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {strength}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="text-md font-semibold text-blue-400 mb-2">Practical Applications</h4>
                <div className="flex flex-wrap gap-2">
                  {primaryProfile.applications.map((app, index) => (
                    <Badge key={index} variant="outline" className="border-blue-400 text-blue-300">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-glass border-0">
          <CardHeader>
            <CardTitle className="text-xl text-white">Complete Geometric Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(geometricScores).map(([archetype, score]) => (
                <div key={archetype} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: geometricArchetypes[archetype].color }}
                      >
                        {geometricArchetypes[archetype].symbol}
                      </span>
                      <span className="text-white font-medium">
                        {geometricArchetypes[archetype].name}
                      </span>
                    </div>
                    <span className="text-purple-400 font-semibold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Assessment in progress
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {currentDimensionData.name}
          </h2>
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <p className="text-sm text-gray-400">
          Overall Progress: {answeredQuestions} of {totalQuestions} questions
        </p>
      </div>

      {currentQuestionData && (
        <Card className="ultra-glass border-0 mb-6">
          <CardContent className="p-8">
            <h3 className="text-xl text-white mb-6">
              {currentQuestionData.text}
            </h3>
            
            {currentQuestionData.type === 'multiple_choice' && (
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto border-gray-600 hover:border-purple-500 hover:bg-purple-500/10"
                    onClick={() => {
                      handleResponse(currentQuestionData.id, option.value)
                      setTimeout(nextQuestion, 300)
                    }}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
            
            {currentQuestionData.type === 'multi_rating' && (
              <div className="space-y-6">
                {currentQuestionData.shapes.map((shape, index) => (
                  <div key={shape.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{shape.name}</span>
                      <span className="text-purple-400">
                        {responses[currentQuestionData.id]?.[shape.name] || 1}
                      </span>
                    </div>
                    <Slider
                      value={[responses[currentQuestionData.id]?.[shape.name] || 1]}
                      onValueChange={(value) => {
                        const currentRatings = responses[currentQuestionData.id] || {}
                        handleMultiRating(currentQuestionData.id, {
                          ...currentRatings,
                          [shape.name]: value[0]
                        })
                      }}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Draining</span>
                      <span>Energizing</span>
                    </div>
                  </div>
                ))}
                
                <Button
                  onClick={nextQuestion}
                  className="premium-button w-full mt-6"
                  disabled={!responses[currentQuestionData.id]}
                >
                  Continue
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentQuestionData?.type !== 'multi_rating' && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentDimension === 0 && currentQuestion === 0}
            className="border-gray-600"
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!responses[currentQuestionData?.id]}
            className="premium-button"
          >
            {currentDimension === geometryDimensions.length - 1 && 
             currentQuestion === currentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default PersonalGeometryAssessment

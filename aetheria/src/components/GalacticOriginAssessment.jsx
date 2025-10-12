import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Sparkles, 
  Eye, 
  Brain, 
  Heart,
  Zap,
  Moon,
  Sun,
  Compass,
  Telescope,
  Atom,
  Infinity,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay, UsageLimitGate } from './PremiumGate'

// Comprehensive 120-Question Galactic Origin Assessment Framework
const assessmentDimensions = [
  {
    id: 'energetic_resonance',
    name: 'Energetic Resonance Patterns',
    description: 'Your natural frequency signatures and vibrational preferences',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    questionCount: 20,
    requiredTier: 'free'
  },
  {
    id: 'cosmic_memory',
    name: 'Cosmic Memory Activation',
    description: 'Access to galactic experiences and cosmic knowledge',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    questionCount: 25,
    requiredTier: 'premium'
  },
  {
    id: 'mission_orientation',
    name: 'Soul Mission Alignment',
    description: 'Your cosmic purpose and Earth mission orientation',
    icon: <Compass className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    questionCount: 20,
    requiredTier: 'premium'
  },
  {
    id: 'dimensional_perception',
    name: 'Dimensional Perception Abilities',
    description: 'Psychic and intuitive capabilities across dimensions',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-500',
    questionCount: 15,
    requiredTier: 'premium'
  },
  {
    id: 'planetary_affinity',
    name: 'Planetary Affinity Mapping',
    description: 'Cosmic environmental preferences and star system connections',
    icon: <Telescope className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    questionCount: 20,
    requiredTier: 'cosmic'
  },
  {
    id: 'galactic_lineage',
    name: 'Galactic Lineage Analysis',
    description: 'Deep ancestral connections and soul family origins',
    icon: <Infinity className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    questionCount: 20,
    requiredTier: 'cosmic'
  }
]

// Sample questions for each dimension (in real implementation, would be much more extensive)
const questionBank = {
  energetic_resonance: [
    {
      id: 'er_1',
      text: 'When you enter a room full of people, you typically:',
      type: 'multiple_choice',
      options: [
        { value: 'pleiadian', text: 'Feel overwhelmed by emotional energies and seek to heal/harmonize them', weight: 3 },
        { value: 'arcturian', text: 'Analyze the group dynamics and technological/spiritual potential', weight: 3 },
        { value: 'sirian', text: 'Sense the ancient wisdom and teaching opportunities present', weight: 3 },
        { value: 'andromedan', text: 'Feel the need to bring freedom and new perspectives to the group', weight: 3 },
        { value: 'lyran', text: 'Naturally take leadership and inspire others toward higher purpose', weight: 3 }
      ]
    },
    {
      id: 'er_2',
      text: 'Your natural response to conflict or disharmony is to:',
      type: 'multiple_choice',
      options: [
        { value: 'pleiadian', text: 'Mediate with love and emotional healing energy', weight: 3 },
        { value: 'arcturian', text: 'Provide logical solutions and technological approaches', weight: 3 },
        { value: 'sirian', text: 'Share ancient wisdom and sacred knowledge to resolve issues', weight: 3 },
        { value: 'andromedan', text: 'Encourage individual freedom and authentic expression', weight: 3 },
        { value: 'lyran', text: 'Take charge and guide others toward resolution with confidence', weight: 3 }
      ]
    },
    {
      id: 'er_3',
      text: 'When you look at the night sky, you feel:',
      type: 'likert_scale',
      statement: 'A deep longing to return home to the stars',
      galacticWeights: {
        pleiadian: [1, 2, 3, 4, 5],
        arcturian: [1, 1, 2, 3, 4],
        sirian: [1, 2, 3, 4, 5],
        andromedan: [2, 3, 4, 5, 5],
        lyran: [1, 2, 3, 4, 4]
      }
    },
    // ... would continue with 17 more questions for this dimension
  ],
  cosmic_memory: [
    {
      id: 'cm_1',
      text: 'In meditation or quiet moments, you sometimes experience:',
      type: 'multiple_select',
      options: [
        { value: 'light_language', text: 'Spontaneous light language or cosmic sounds', galacticWeight: { pleiadian: 3, arcturian: 2, sirian: 3 } },
        { value: 'star_visions', text: 'Visions of other star systems or planets', galacticWeight: { andromedan: 3, lyran: 2, sirian: 2 } },
        { value: 'ancient_knowledge', text: 'Downloads of ancient wisdom or technology', galacticWeight: { arcturian: 3, sirian: 3, lyran: 2 } },
        { value: 'healing_abilities', text: 'Spontaneous healing energy or abilities', galacticWeight: { pleiadian: 3, arcturian: 2, sirian: 1 } },
        { value: 'cosmic_connection', text: 'Direct communication with galactic beings', galacticWeight: { andromedan: 2, arcturian: 3, sirian: 2 } }
      ]
    },
    // ... would continue with 24 more questions
  ],
  // ... other dimensions would have their question sets
}

// Galactic heritage profiles with comprehensive characteristics
const galacticProfiles = {
  pleiadian: {
    name: 'Pleiadian Collective',
    description: 'Healers and emotional alchemists from the Seven Sisters star cluster',
    characteristics: [
      'Natural empaths and emotional healers',
      'Strong connection to love, light, and harmony',
      'Gifted in energy healing and light language',
      'Mission focused on raising Earth\'s vibration through love',
      'Often struggle with emotional overwhelm but transform it into healing power'
    ],
    abilities: ['Energy Healing', 'Emotional Alchemy', 'Light Language', 'Harmonic Resonance'],
    mission: 'Anchor love and light frequencies to assist in Earth\'s ascension',
    starSystem: 'Pleiades (Seven Sisters)',
    element: 'Water/Air',
    color: '#ec4899'
  },
  arcturian: {
    name: 'Arcturian Collective',
    description: 'Advanced spiritual technologists and dimensional engineers',
    characteristics: [
      'Highly advanced spiritual and technological knowledge',
      'Natural ability to bridge science and spirituality',
      'Excellent at energy healing through geometric patterns',
      'Mission involves upgrading Earth\'s consciousness technology',
      'Often feel like they don\'t quite fit in current Earth systems'
    ],
    abilities: ['Sacred Geometry', 'Energy Technology', 'Dimensional Engineering', 'Consciousness Upgrading'],
    mission: 'Integrate advanced spiritual technology for consciousness evolution',
    starSystem: 'Arcturus',
    element: 'Air/Fire',
    color: '#06b6d4'
  },
  sirian: {
    name: 'Sirian Collective',
    description: 'Ancient wisdom keepers and sacred knowledge guardians',
    characteristics: [
      'Deep connection to ancient wisdom and sacred knowledge',
      'Natural teachers and wisdom sharers',
      'Strong affinity for water, dolphins, and cetacean consciousness',
      'Mission involves preserving and sharing cosmic wisdom',
      'Often drawn to mystery schools and esoteric teachings'
    ],
    abilities: ['Ancient Wisdom', 'Sacred Teaching', 'Cetacean Communication', 'Mystery School Knowledge'],
    mission: 'Preserve and transmit ancient cosmic wisdom for humanity\'s evolution',
    starSystem: 'Sirius A & B',
    element: 'Water/Earth',
    color: '#8b5cf6'
  },
  andromedan: {
    name: 'Andromedan Collective',
    description: 'Freedom fighters and consciousness liberators',
    characteristics: [
      'Strong drive for freedom and authentic expression',
      'Natural rebels against limiting systems and structures',
      'Highly creative and innovative thinkers',
      'Mission involves liberating consciousness from control systems',
      'Often feel restricted by Earth\'s current social structures'
    ],
    abilities: ['Consciousness Liberation', 'Creative Innovation', 'System Breaking', 'Freedom Activation'],
    mission: 'Liberate human consciousness from limiting beliefs and control systems',
    starSystem: 'Andromeda Galaxy',
    element: 'Air/Fire',
    color: '#10b981'
  },
  lyran: {
    name: 'Lyran Collective',
    description: 'Original humanoid creators and cosmic leaders',
    characteristics: [
      'Natural leaders with strong creative abilities',
      'Connection to the original humanoid template',
      'Confident, independent, and pioneering spirit',
      'Mission involves leadership in cosmic evolution',
      'Often feel like old souls with vast cosmic experience'
    ],
    abilities: ['Cosmic Leadership', 'Creative Manifestation', 'Template Activation', 'Pioneer Spirit'],
    mission: 'Lead humanity\'s evolution as the original cosmic humanoid template',
    starSystem: 'Lyra Constellation',
    element: 'Fire/Earth',
    color: '#f59e0b'
  }
}

const GalacticOriginAssessment = () => {
  const { subscription, incrementUsage, hasFeatureAccess } = useSubscription()
  const [currentDimension, setCurrentDimension] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [completedDimensions, setCompletedDimensions] = useState([])
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [galacticScores, setGalacticScores] = useState({})

  const currentDimensionData = assessmentDimensions[currentDimension]
  const currentQuestions = questionBank[currentDimensionData?.id] || []
  const currentQuestionData = currentQuestions[currentQuestion]

  const totalQuestions = assessmentDimensions.reduce((sum, dim) => sum + dim.questionCount, 0)
  const answeredQuestions = Object.keys(responses).length
  const progressPercentage = (answeredQuestions / totalQuestions) * 100

  const handleResponse = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }))
  }

  const calculateGalacticScores = () => {
    const scores = {
      pleiadian: 0,
      arcturian: 0,
      sirian: 0,
      andromedan: 0,
      lyran: 0
    }

    // Calculate scores based on responses
    Object.entries(responses).forEach(([questionId, response]) => {
      // This would implement the actual scoring algorithm
      // For now, using simplified scoring
      if (typeof response === 'string') {
        scores[response] = (scores[response] || 0) + 1
      } else if (Array.isArray(response)) {
        response.forEach(r => {
          scores[r] = (scores[r] || 0) + 0.5
        })
      }
    })

    // Normalize scores to percentages
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
    Object.keys(scores).forEach(key => {
      scores[key] = Math.round((scores[key] / total) * 100)
    })

    setGalacticScores(scores)
    setShowResults(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Move to next dimension or complete assessment
      const newCompleted = [...completedDimensions, currentDimensionData.id]
      setCompletedDimensions(newCompleted)
      
      if (currentDimension < assessmentDimensions.length - 1) {
        setCurrentDimension(currentDimension + 1)
        setCurrentQuestion(0)
      } else {
        calculateGalacticScores()
      }
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1)
      const prevDimension = assessmentDimensions[currentDimension - 1]
      const prevQuestions = questionBank[prevDimension.id] || []
      setCurrentQuestion(prevQuestions.length - 1)
    }
  }

  if (!assessmentStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
            Galactic Origin Assessment
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover your cosmic heritage through our comprehensive 120-question framework
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {assessmentDimensions.map((dimension, index) => (
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
            featureType="galacticAssessment"
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
              Begin Galactic Assessment
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </UsageLimitGate>
        </div>
      </div>
    )
  }

  if (showResults) {
    const primaryHeritage = Object.entries(galacticScores).sort(([,a], [,b]) => b - a)[0]
    const primaryProfile = galacticProfiles[primaryHeritage[0]]

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
            Your Galactic Heritage
          </h1>
          <p className="text-xl text-gray-300">
            Assessment Complete - Discover Your Cosmic Origins
          </p>
        </div>

        <Card className="ultra-glass border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryProfile.color }}
              >
                <Star className="w-6 h-6 text-white" />
              </div>
              Primary Heritage: {primaryProfile.name}
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
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Cosmic Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {primaryProfile.abilities.map((ability, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {ability}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-blue-400 mb-2">Soul Mission</h4>
                  <p className="text-gray-300">{primaryProfile.mission}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ultra-glass border-0">
          <CardHeader>
            <CardTitle className="text-xl text-white">Complete Galactic Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(galacticScores).map(([heritage, score]) => (
                <div key={heritage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {galacticProfiles[heritage].name}
                    </span>
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
            
            {currentQuestionData.type === 'likert_scale' && (
              <div className="space-y-4">
                <p className="text-gray-300 text-center">
                  "{currentQuestionData.statement}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Strongly Disagree</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        size="sm"
                        className="w-12 h-12 rounded-full border-gray-600 hover:border-purple-500 hover:bg-purple-500/20"
                        onClick={() => {
                          handleResponse(currentQuestionData.id, value)
                          setTimeout(nextQuestion, 300)
                        }}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Strongly Agree</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
          {currentDimension === assessmentDimensions.length - 1 && 
           currentQuestion === currentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default GalacticOriginAssessment

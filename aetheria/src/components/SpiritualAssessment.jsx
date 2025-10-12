import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Heart, 
  Eye, 
  Zap, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Circle,
  Sparkles
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay } from './PremiumGate'

// Assessment Questions Data
const assessmentSections = [
  {
    id: 'consciousness',
    title: 'Consciousness Awareness',
    description: 'Evaluate your current level of spiritual consciousness',
    icon: Brain,
    color: 'from-purple-500 to-blue-500',
    requiredTier: 'free',
    questions: [
      {
        id: 'meditation_frequency',
        text: 'How often do you engage in meditation or mindfulness practices?',
        type: 'scale',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely (monthly)' },
          { value: 3, label: 'Sometimes (weekly)' },
          { value: 4, label: 'Often (few times/week)' },
          { value: 5, label: 'Daily' }
        ]
      },
      {
        id: 'awareness_level',
        text: 'How aware are you of your thoughts and emotions throughout the day?',
        type: 'scale',
        options: [
          { value: 1, label: 'Not aware' },
          { value: 2, label: 'Slightly aware' },
          { value: 3, label: 'Moderately aware' },
          { value: 4, label: 'Very aware' },
          { value: 5, label: 'Constantly aware' }
        ]
      },
      {
        id: 'spiritual_experiences',
        text: 'Have you experienced moments of profound spiritual connection or awakening?',
        type: 'multiple',
        options: [
          { value: 'synchronicities', label: 'Frequent synchronicities' },
          { value: 'energy_sensing', label: 'Sensing energy fields' },
          { value: 'intuitive_insights', label: 'Strong intuitive insights' },
          { value: 'unity_experiences', label: 'Feelings of universal unity' },
          { value: 'none', label: 'None of the above' }
        ]
      }
    ]
  },
  {
    id: 'starseed',
    title: 'Starseed Heritage',
    description: 'Discover your cosmic origins and galactic connections',
    icon: Star,
    color: 'from-blue-500 to-cyan-500',
    requiredTier: 'premium',
    questions: [
      {
        id: 'earth_connection',
        text: 'How do you feel about your connection to Earth?',
        type: 'single',
        options: [
          { value: 'deep_connection', label: 'Deep, natural connection' },
          { value: 'moderate_connection', label: 'Moderate connection' },
          { value: 'disconnected', label: 'Often feel disconnected' },
          { value: 'alien_feeling', label: 'Feel like an outsider/alien' }
        ]
      },
      {
        id: 'cosmic_dreams',
        text: 'Do you have recurring dreams or visions of other worlds or star systems?',
        type: 'single',
        options: [
          { value: 'frequent', label: 'Frequently' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'rarely', label: 'Rarely' },
          { value: 'never', label: 'Never' }
        ]
      },
      {
        id: 'healing_abilities',
        text: 'Which healing or psychic abilities resonate with you?',
        type: 'multiple',
        options: [
          { value: 'energy_healing', label: 'Energy healing' },
          { value: 'empathic_abilities', label: 'Strong empathic abilities' },
          { value: 'telepathy', label: 'Telepathic experiences' },
          { value: 'precognition', label: 'Precognitive dreams/visions' },
          { value: 'channeling', label: 'Channeling abilities' }
        ]
      }
    ]
  },
  {
    id: 'chakra',
    title: 'Energy Centers',
    description: 'Assess the balance and activation of your chakra system',
    icon: Heart,
    color: 'from-pink-500 to-red-500',
    requiredTier: 'free',
    questions: [
      {
        id: 'root_chakra',
        text: 'How grounded and secure do you feel in your daily life?',
        type: 'scale',
        options: [
          { value: 1, label: 'Very insecure' },
          { value: 2, label: 'Somewhat insecure' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Mostly secure' },
          { value: 5, label: 'Very grounded' }
        ]
      },
      {
        id: 'heart_chakra',
        text: 'How easily do you give and receive love?',
        type: 'scale',
        options: [
          { value: 1, label: 'Very difficult' },
          { value: 2, label: 'Somewhat difficult' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Fairly easy' },
          { value: 5, label: 'Very easy' }
        ]
      },
      {
        id: 'third_eye',
        text: 'How strong is your intuition and inner knowing?',
        type: 'scale',
        options: [
          { value: 1, label: 'Very weak' },
          { value: 2, label: 'Somewhat weak' },
          { value: 3, label: 'Moderate' },
          { value: 4, label: 'Strong' },
          { value: 5, label: 'Very strong' }
        ]
      }
    ]
  },
  {
    id: 'dimensional',
    title: 'Dimensional Awareness',
    description: 'Explore your connection to higher dimensions and realities',
    icon: Eye,
    color: 'from-indigo-500 to-purple-500',
    requiredTier: 'cosmic',
    questions: [
      {
        id: 'reality_perception',
        text: 'How do you perceive the nature of reality?',
        type: 'single',
        options: [
          { value: 'physical_only', label: 'Primarily physical/material' },
          { value: 'some_spiritual', label: 'Physical with some spiritual aspects' },
          { value: 'multidimensional', label: 'Multidimensional and layered' },
          { value: 'consciousness_based', label: 'Consciousness-based reality' }
        ]
      },
      {
        id: 'dimensional_experiences',
        text: 'Have you experienced altered states of consciousness?',
        type: 'multiple',
        options: [
          { value: 'astral_projection', label: 'Astral projection' },
          { value: 'lucid_dreaming', label: 'Lucid dreaming' },
          { value: 'meditation_states', label: 'Deep meditative states' },
          { value: 'entity_contact', label: 'Contact with non-physical beings' },
          { value: 'time_distortion', label: 'Time distortion experiences' }
        ]
      }
    ]
  }
]

// Question Component
const AssessmentQuestion = ({ question, value, onChange, disabled = false }) => {
  const handleChange = (newValue) => {
    if (!disabled) {
      onChange(question.id, newValue)
    }
  }

  const renderOptions = () => {
    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value)}
                disabled={disabled}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  value === option.value
                    ? 'bg-purple-600 text-white border-purple-400'
                    : disabled
                    ? 'bg-gray-800/50 text-gray-500 border-gray-700'
                    : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                } border`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  <span className="text-sm opacity-70">{option.value}</span>
                </div>
              </button>
            ))}
          </div>
        )

      case 'single':
        return (
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value)}
                disabled={disabled}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center gap-3 ${
                  value === option.value
                    ? 'bg-purple-600 text-white border-purple-400'
                    : disabled
                    ? 'bg-gray-800/50 text-gray-500 border-gray-700'
                    : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                } border`}
              >
                {value === option.value ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )

      case 'multiple':
        const selectedValues = Array.isArray(value) ? value : []
        return (
          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = selectedValues.includes(option.value)
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    const newValues = isSelected
                      ? selectedValues.filter(v => v !== option.value)
                      : [...selectedValues, option.value]
                    handleChange(newValues)
                  }}
                  disabled={disabled}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-400'
                      : disabled
                      ? 'bg-gray-800/50 text-gray-500 border-gray-700'
                      : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                  } border`}
                >
                  {isSelected ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">{question.text}</h3>
      {renderOptions()}
    </div>
  )
}

// Section Progress Component
const SectionProgress = ({ sections, currentSection, completedSections }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {sections.map((section, index) => {
        const isCompleted = completedSections.includes(section.id)
        const isCurrent = currentSection === index
        const IconComponent = section.icon
        
        return (
          <div
            key={section.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
              isCurrent
                ? `bg-gradient-to-r ${section.color} text-white`
                : isCompleted
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-gray-400'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span className="text-sm font-medium">{section.title}</span>
            {isCompleted && <CheckCircle className="w-4 h-4" />}
          </div>
        )
      })}
    </div>
  )
}

// Main Assessment Component
const SpiritualAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completedSections, setCompletedSections] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  
  const { hasAccess, promptUpgrade, incrementUsage } = useSubscription()
  
  const section = assessmentSections[currentSection]
  const question = section?.questions[currentQuestion]
  const hasAccessToSection = hasAccess('assessments', section?.requiredTier)
  
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }
  
  const handleNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Section complete
      setCompletedSections(prev => [...prev, section.id])
      
      if (currentSection < assessmentSections.length - 1) {
        // Move to next section
        setCurrentSection(prev => prev + 1)
        setCurrentQuestion(0)
      } else {
        // Assessment complete
        setIsComplete(true)
        incrementUsage('assessmentsCompleted')
      }
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      setCurrentQuestion(assessmentSections[currentSection - 1].questions.length - 1)
    }
  }
  
  const progress = ((currentSection * 100) + ((currentQuestion + 1) / section?.questions.length * 100)) / assessmentSections.length
  const currentAnswer = answers[question?.id]
  const canProceed = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== ''
  
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="ultra-glass border-0 max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold cosmic-gradient-text mb-2">
                Assessment Complete!
              </h2>
              <p className="text-gray-300">
                Your spiritual profile is being generated...
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {completedSections.map(sectionId => {
                const sectionData = assessmentSections.find(s => s.id === sectionId)
                return (
                  <div key={sectionId} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">{sectionData.title} Complete</span>
                  </div>
                )
              })}
            </div>
            
            <Button className="premium-button px-8">
              <Sparkles className="w-4 h-4 mr-2" />
              View Your Spiritual Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!hasAccessToSection) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <PremiumOverlay
            feature="assessments"
            requiredTier={section.requiredTier}
            title={`${section.title} Assessment`}
            description={`Unlock the ${section.title} assessment to discover deeper insights about your spiritual journey.`}
            className="min-h-[600px]"
          >
            <div className="p-8 text-center">
              <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center mb-6`}>
                <section.icon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300">{section.description}</p>
            </div>
          </PremiumOverlay>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-2">
            Spiritual Assessment
          </h1>
          <p className="text-gray-400">
            Discover your unique spiritual profile and cosmic connections
          </p>
        </div>
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Section Progress */}
        <SectionProgress 
          sections={assessmentSections}
          currentSection={currentSection}
          completedSections={completedSections}
        />
        
        {/* Current Section */}
        <Card className="ultra-glass border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${section.color}`}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              {section.title}
              <Badge variant="secondary" className="bg-white/10 text-white">
                {currentQuestion + 1} of {section.questions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AssessmentQuestion
              question={question}
              value={currentAnswer}
              onChange={handleAnswer}
            />
          </CardContent>
        </Card>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0 && currentQuestion === 0}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="premium-button"
          >
            {currentSection === assessmentSections.length - 1 && currentQuestion === section.questions.length - 1 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SpiritualAssessment

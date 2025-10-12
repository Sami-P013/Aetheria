import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Brain, 
  Heart, 
  Waves,
  Timer,
  Zap,
  Eye,
  Sparkles,
  BarChart3,
  Settings,
  Headphones
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay, UsageLimitGate } from './PremiumGate'

// Meditation Programs
const meditationPrograms = [
  {
    id: 'basic_mindfulness',
    title: 'Basic Mindfulness',
    description: 'Simple breathing meditation for beginners',
    duration: 10,
    category: 'Beginner',
    requiredTier: 'free',
    frequencies: ['Alpha'],
    benefits: ['Stress Relief', 'Focus', 'Calm']
  },
  {
    id: 'chakra_balancing',
    title: 'Chakra Balancing',
    description: 'Align and balance your seven energy centers',
    duration: 20,
    category: 'Energy Work',
    requiredTier: 'free',
    frequencies: ['Theta', 'Alpha'],
    benefits: ['Energy Balance', 'Healing', 'Alignment']
  },
  {
    id: 'starseed_activation',
    title: 'Starseed DNA Activation',
    description: 'Awaken your cosmic heritage and galactic memories',
    duration: 30,
    category: 'Advanced',
    requiredTier: 'premium',
    frequencies: ['Gamma', 'Theta'],
    benefits: ['DNA Activation', 'Cosmic Connection', 'Memory Recall']
  },
  {
    id: 'dimensional_travel',
    title: 'Dimensional Travel',
    description: 'Journey through higher dimensions of consciousness',
    duration: 45,
    category: 'Expert',
    requiredTier: 'premium',
    frequencies: ['Gamma', 'Delta'],
    benefits: ['Astral Projection', 'Higher Awareness', 'Multidimensional Access']
  },
  {
    id: 'cosmic_consciousness',
    title: 'Cosmic Consciousness Expansion',
    description: 'Merge with universal consciousness and cosmic intelligence',
    duration: 60,
    category: 'Master',
    requiredTier: 'cosmic',
    frequencies: ['Ultra-Gamma', 'Lambda'],
    benefits: ['Unity Consciousness', 'Cosmic Intelligence', 'Divine Connection']
  }
]

// Biometric Data Simulation
const generateBiometricData = () => ({
  heartRate: 60 + Math.random() * 20,
  brainwaves: {
    delta: Math.random() * 30,
    theta: Math.random() * 40,
    alpha: Math.random() * 50,
    beta: Math.random() * 30,
    gamma: Math.random() * 20
  },
  coherence: Math.random() * 100,
  stress: Math.random() * 100
})

// Meditation Timer Component
const MeditationTimer = ({ duration, isActive, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let interval = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          setProgress(((duration * 60 - newTime) / (duration * 60)) * 100)
          
          if (newTime <= 0) {
            onComplete()
            return 0
          }
          return newTime
        })
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isActive, timeLeft, duration, onComplete])
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="text-center space-y-4">
      <div className="text-6xl font-mono cosmic-gradient-text">
        {formatTime(timeLeft)}
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-gray-400 text-sm">
        {Math.round(progress)}% Complete
      </p>
    </div>
  )
}

// Biometric Monitor Component
const BiometricMonitor = ({ isActive }) => {
  const [biometrics, setBiometrics] = useState(generateBiometricData())
  
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setBiometrics(generateBiometricData())
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isActive])
  
  const getBrainwaveColor = (type) => {
    const colors = {
      delta: 'text-red-400',
      theta: 'text-orange-400',
      alpha: 'text-yellow-400',
      beta: 'text-green-400',
      gamma: 'text-blue-400'
    }
    return colors[type] || 'text-gray-400'
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-white font-medium flex items-center gap-2">
        <Brain className="w-4 h-4 text-purple-400" />
        Biometric Monitoring
      </h3>
      
      {/* Heart Rate */}
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-white text-sm">Heart Rate</span>
        </div>
        <span className="text-red-400 font-mono">
          {Math.round(biometrics.heartRate)} BPM
        </span>
      </div>
      
      {/* Brainwaves */}
      <div className="space-y-2">
        <h4 className="text-white text-sm font-medium">Brainwave Activity</h4>
        {Object.entries(biometrics.brainwaves).map(([type, value]) => (
          <div key={type} className="flex items-center justify-between">
            <span className={`text-sm capitalize ${getBrainwaveColor(type)}`}>
              {type}
            </span>
            <div className="flex items-center gap-2 flex-1 mx-3">
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    getBrainwaveColor(type).replace('text-', 'bg-')
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8">
                {Math.round(value)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Coherence */}
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-blue-400" />
          <span className="text-white text-sm">Coherence</span>
        </div>
        <span className="text-blue-400 font-mono">
          {Math.round(biometrics.coherence)}%
        </span>
      </div>
    </div>
  )
}

// Program Selection Component
const ProgramSelection = ({ programs, selectedProgram, onSelect }) => {
  const { hasAccess } = useSubscription()
  
  return (
    <div className="space-y-4">
      <h3 className="text-white font-medium">Choose Your Journey</h3>
      <div className="space-y-3">
        {programs.map(program => {
          const hasAccessToProgram = hasAccess('meditationSessions', program.requiredTier)
          
          return (
            <Card
              key={program.id}
              className={`cursor-pointer transition-all duration-300 border-0 ${
                selectedProgram?.id === program.id
                  ? 'ultra-glass ring-2 ring-purple-400'
                  : hasAccessToProgram
                  ? 'ultra-glass hover:scale-105'
                  : 'bg-gray-800/30 opacity-50'
              }`}
              onClick={() => hasAccessToProgram && onSelect(program)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-medium ${hasAccessToProgram ? 'text-white' : 'text-gray-500'}`}>
                    {program.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white">
                      {program.duration}min
                    </Badge>
                    {!hasAccessToProgram && (
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-400">
                        {program.requiredTier === 'cosmic' ? 'Cosmic' : 'Premium'}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className={`text-sm mb-3 ${hasAccessToProgram ? 'text-gray-300' : 'text-gray-500'}`}>
                  {program.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {program.frequencies.map(freq => (
                    <Badge key={freq} variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                      {freq}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {program.benefits.map(benefit => (
                    <Badge key={benefit} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Session Stats Component
const SessionStats = ({ session }) => {
  if (!session) return null
  
  return (
    <Card className="ultra-glass border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-400" />
          Session Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold cosmic-gradient-text">
              {session.duration}min
            </div>
            <p className="text-gray-400 text-sm">Duration</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold cosmic-gradient-text">
              {session.coherence}%
            </div>
            <p className="text-gray-400 text-sm">Avg Coherence</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold cosmic-gradient-text">
              {session.heartRate}
            </div>
            <p className="text-gray-400 text-sm">Avg Heart Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold cosmic-gradient-text">
              +{session.points}
            </div>
            <p className="text-gray-400 text-sm">Consciousness Points</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
          <h4 className="text-white font-medium mb-2">Session Insights</h4>
          <p className="text-gray-300 text-sm">
            {session.insights}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Meditation Studio Component
const MeditationStudio = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [sessionComplete, setSessionComplete] = useState(null)
  const [showBiometrics, setShowBiometrics] = useState(true)
  
  const { hasAccess, hasReachedLimit, incrementUsage, promptUpgrade, usage, getRemainingUsage } = useSubscription()
  
  const handleStartMeditation = () => {
    if (!selectedProgram) return
    
    const hasAccessToProgram = hasAccess('meditationSessions', selectedProgram.requiredTier)
    const limitReached = hasReachedLimit('meditationSessions')
    
    if (!hasAccessToProgram) {
      promptUpgrade('meditationSessions')
      return
    }
    
    if (limitReached) {
      promptUpgrade('meditationSessions')
      return
    }
    
    setIsPlaying(true)
    setSessionComplete(null)
  }
  
  const handlePauseMeditation = () => {
    setIsPlaying(false)
  }
  
  const handleStopMeditation = () => {
    setIsPlaying(false)
    setSelectedProgram(null)
  }
  
  const handleMeditationComplete = () => {
    setIsPlaying(false)
    incrementUsage('meditationSessions')
    
    // Generate session stats
    const stats = {
      duration: selectedProgram.duration,
      coherence: Math.round(60 + Math.random() * 30),
      heartRate: Math.round(65 + Math.random() * 15),
      points: Math.round(selectedProgram.duration * 2 + Math.random() * 20),
      insights: `Excellent session! Your ${selectedProgram.frequencies.join(' and ')} brainwave patterns showed strong coherence. Continue practicing to deepen your ${selectedProgram.benefits[0].toLowerCase()} abilities.`
    }
    
    setSessionComplete(stats)
  }
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-2">
            Meditation Studio
          </h1>
          <p className="text-gray-400">
            Advanced consciousness training with biometric feedback
          </p>
        </div>
        
        {/* Usage Stats */}
        <Card className="ultra-glass border-0 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Sessions Today: {usage.meditationSessions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Remaining: {getRemainingUsage('meditationSessions')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBiometrics(!showBiometrics)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {showBiometrics ? 'Hide' : 'Show'} Biometrics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Meditation Interface */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedProgram ? (
              <ProgramSelection
                programs={meditationPrograms}
                selectedProgram={selectedProgram}
                onSelect={setSelectedProgram}
              />
            ) : sessionComplete ? (
              <SessionStats session={sessionComplete} />
            ) : (
              <Card className="ultra-glass border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Eye className="w-6 h-6 text-purple-400" />
                    {selectedProgram.title}
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {selectedProgram.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-8">
                    <MeditationTimer
                      duration={selectedProgram.duration}
                      isActive={isPlaying}
                      onComplete={handleMeditationComplete}
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    {!isPlaying ? (
                      <Button
                        onClick={handleStartMeditation}
                        className="premium-button px-8 py-3"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        {usage.meditationSessions === 0 ? 'Start Session' : 'Resume'}
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePauseMeditation}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                      >
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    
                    <Button
                      onClick={handleStopMeditation}
                      variant="outline"
                      className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-4">
                    <Volume2 className="w-5 h-5 text-white" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-white text-sm w-12">{volume[0]}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Biometric Monitor */}
            {showBiometrics && (
              <Card className="ultra-glass border-0">
                <CardContent className="p-6">
                  <BiometricMonitor isActive={isPlaying} />
                </CardContent>
              </Card>
            )}
            
            {/* Quick Actions */}
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => setSelectedProgram(null)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Change Program
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Headphones className="w-4 h-4 mr-2" />
                  Audio Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
              </CardContent>
            </Card>
            
            {/* Session History */}
            {sessionComplete && (
              <Card className="ultra-glass border-0">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Recent Achievement</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Session Completed!</p>
                      <p className="text-gray-400 text-xs">+{sessionComplete.points} consciousness points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeditationStudio

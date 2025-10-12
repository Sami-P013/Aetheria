import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Dna,
  Zap,
  Star,
  Sparkles,
  Eye,
  Heart,
  Brain,
  Crown,
  Waves,
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Lightbulb
} from 'lucide-react'
import { useAssessmentData } from '../contexts/AssessmentDataContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay, UsageLimitGate } from './PremiumGate'

// Light Language Sequences based on Galactic Heritage
const lightLanguageSequences = {
  pleiadian: {
    name: 'Pleiadian Healing Codes',
    description: 'Activates heart-centered healing and emotional alchemy abilities',
    frequency: 528, // Love frequency
    duration: 180, // 3 minutes
    colors: ['#ec4899', '#f472b6', '#fbbf24'],
    patterns: ['∞', '♡', '◊', '∾', '☽', '☾'],
    sounds: ['AH', 'EH', 'OH', 'UH', 'IH'],
    chakras: ['heart', 'throat', 'third_eye'],
    benefits: [
      'Enhanced empathic abilities',
      'Emotional healing mastery',
      'Heart chakra activation',
      'Love frequency attunement'
    ]
  },
  arcturian: {
    name: 'Arcturian Technology Codes',
    description: 'Activates advanced spiritual technology and geometric consciousness',
    frequency: 741, // Expression frequency
    duration: 240, // 4 minutes
    colors: ['#06b6d4', '#0891b2', '#0284c7'],
    patterns: ['△', '▽', '◊', '⬟', '⬢', '⬡'],
    sounds: ['OM', 'AUM', 'HUM', 'RAM', 'LAM'],
    chakras: ['throat', 'third_eye', 'crown'],
    benefits: [
      'Sacred geometry activation',
      'Technological intuition',
      'Dimensional perception',
      'Consciousness upgrading'
    ]
  },
  sirian: {
    name: 'Sirian Wisdom Codes',
    description: 'Activates ancient knowledge and teaching abilities',
    frequency: 852, // Spiritual order frequency
    duration: 300, // 5 minutes
    colors: ['#8b5cf6', '#a855f7', '#c084fc'],
    patterns: ['☆', '✦', '✧', '✩', '✪', '✫'],
    sounds: ['SA', 'TA', 'NA', 'MA', 'RA'],
    chakras: ['third_eye', 'crown', 'soul_star'],
    benefits: [
      'Ancient wisdom access',
      'Teaching ability enhancement',
      'Akashic records connection',
      'Spiritual authority activation'
    ]
  },
  andromedan: {
    name: 'Andromedan Freedom Codes',
    description: 'Activates consciousness liberation and creative innovation',
    frequency: 963, // Pineal gland activation
    duration: 210, // 3.5 minutes
    colors: ['#10b981', '#059669', '#047857'],
    patterns: ['◈', '◇', '◆', '◉', '◎', '○'],
    sounds: ['FREE', 'FLOW', 'CREATE', 'EXPAND', 'LIBERATE'],
    chakras: ['crown', 'soul_star', 'stellar_gateway'],
    benefits: [
      'Creative breakthrough activation',
      'Freedom consciousness expansion',
      'Innovation enhancement',
      'Limitation dissolution'
    ]
  },
  lyran: {
    name: 'Lyran Leadership Codes',
    description: 'Activates cosmic leadership and creative manifestation abilities',
    frequency: 432, // Natural harmony frequency
    duration: 360, // 6 minutes
    colors: ['#f59e0b', '#d97706', '#b45309'],
    patterns: ['★', '☆', '✦', '✧', '✩', '✪'],
    sounds: ['LEAD', 'CREATE', 'MANIFEST', 'INSPIRE', 'PIONEER'],
    chakras: ['solar_plexus', 'heart', 'crown'],
    benefits: [
      'Leadership ability activation',
      'Creative manifestation mastery',
      'Pioneer spirit enhancement',
      'Cosmic authority embodiment'
    ]
  }
}

// DNA Strand Activation Levels
const dnaActivationLevels = [
  { level: 1, name: '2-Strand Physical', description: 'Basic human DNA', color: '#ef4444' },
  { level: 2, name: '3-Strand Emotional', description: 'Emotional intelligence activation', color: '#f97316' },
  { level: 3, name: '4-Strand Mental', description: 'Enhanced cognitive abilities', color: '#eab308' },
  { level: 4, name: '5-Strand Spiritual', description: 'Psychic abilities emergence', color: '#22c55e' },
  { level: 5, name: '6-Strand Galactic', description: 'Cosmic consciousness connection', color: '#06b6d4' },
  { level: 6, name: '7-Strand Crystalline', description: 'Light body activation', color: '#8b5cf6' },
  { level: 7, name: '8-Strand Cosmic', description: 'Universal consciousness', color: '#ec4899' },
  { level: 8, name: '9-Strand Angelic', description: 'Angelic realm connection', color: '#f472b6' },
  { level: 9, name: '10-Strand Avatar', description: 'Avatar consciousness embodiment', color: '#fbbf24' },
  { level: 10, name: '11-Strand Christed', description: 'Christ consciousness activation', color: '#ffffff' },
  { level: 11, name: '12-Strand Cosmic Christ', description: 'Full cosmic christ embodiment', color: '#ffd700' }
]

const CosmicDNAActivation = () => {
  const { assessmentData } = useAssessmentData()
  const { subscription, incrementUsage, hasFeatureAccess } = useSubscription()
  
  const [selectedSequence, setSelectedSequence] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [activationLevel, setActivationLevel] = useState(1)
  const [visualizationIntensity, setVisualizationIntensity] = useState(50)
  const [showLightLanguage, setShowLightLanguage] = useState(false)
  const [currentPattern, setCurrentPattern] = useState(0)
  const [currentSound, setCurrentSound] = useState(0)
  
  const animationRef = useRef()
  const audioContextRef = useRef()
  const oscillatorRef = useRef()

  // Initialize based on user's galactic heritage
  useEffect(() => {
    const cosmicHeritage = assessmentData.cosmic_heritage?.data
    if (cosmicHeritage && cosmicHeritage.primaryHeritage) {
      const heritage = cosmicHeritage.primaryHeritage
      if (lightLanguageSequences[heritage]) {
        setSelectedSequence(heritage)
      }
    }
  }, [assessmentData])

  // Animation loop for light language patterns
  useEffect(() => {
    if (isPlaying && selectedSequence) {
      const sequence = lightLanguageSequences[selectedSequence]
      const interval = setInterval(() => {
        setCurrentPattern(prev => (prev + 1) % sequence.patterns.length)
        setCurrentSound(prev => (prev + 1) % sequence.sounds.length)
        setCurrentTime(prev => {
          if (prev >= sequence.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 2000) // Change pattern every 2 seconds
      
      return () => clearInterval(interval)
    }
  }, [isPlaying, selectedSequence])

  // Audio synthesis for frequency generation
  const startFrequencyTone = (frequency) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    
    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : volume * 0.1, audioContext.currentTime + 0.1)
    
    oscillator.start()
    oscillatorRef.current = { oscillator, gainNode }
  }

  const stopFrequencyTone = () => {
    if (oscillatorRef.current) {
      const { oscillator, gainNode } = oscillatorRef.current
      gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.1)
      oscillator.stop(audioContextRef.current.currentTime + 0.1)
      oscillatorRef.current = null
    }
  }

  const handlePlayPause = () => {
    if (!selectedSequence) return
    
    if (isPlaying) {
      setIsPlaying(false)
      stopFrequencyTone()
    } else {
      setIsPlaying(true)
      const sequence = lightLanguageSequences[selectedSequence]
      startFrequencyTone(sequence.frequency)
      incrementUsage('dnaActivations')
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    setCurrentPattern(0)
    setCurrentSound(0)
    stopFrequencyTone()
  }

  const handleVolumeChange = (value) => {
    setVolume(value[0])
    if (oscillatorRef.current && !isMuted) {
      oscillatorRef.current.gainNode.gain.setValueAtTime(
        value[0] * 0.1, 
        audioContextRef.current.currentTime
      )
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (oscillatorRef.current) {
      oscillatorRef.current.gainNode.gain.setValueAtTime(
        isMuted ? volume * 0.1 : 0, 
        audioContextRef.current.currentTime
      )
    }
  }

  const currentSequence = selectedSequence ? lightLanguageSequences[selectedSequence] : null
  const progress = currentSequence ? (currentTime / currentSequence.duration) * 100 : 0

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
          Cosmic DNA Activation
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Activate your galactic DNA codes through light language and frequency healing
        </p>
      </div>

      {/* Sequence Selection */}
      <Card className="ultra-glass border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Dna className="w-6 h-6 text-purple-400" />
            Light Language Sequences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(lightLanguageSequences).map(([key, sequence]) => (
              <Card 
                key={key} 
                className={`ultra-glass border-0 cursor-pointer transition-all ${
                  selectedSequence === key ? 'border-purple-500/50 bg-purple-500/10' : ''
                }`}
                onClick={() => setSelectedSequence(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: sequence.colors[0] }}
                    >
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{sequence.name}</h3>
                      <p className="text-gray-400 text-xs">{sequence.frequency}Hz • {Math.floor(sequence.duration / 60)}min</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs mb-3">{sequence.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {sequence.benefits.slice(0, 2).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Activation Interface */}
      {currentSequence && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visualization Panel */}
          <Card className="ultra-glass border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                Light Language Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Central Visualization */}
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor: currentSequence.colors[i % currentSequence.colors.length],
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Central Pattern */}
                  <div className="text-center">
                    <div 
                      className={`text-8xl font-bold mb-4 transition-all duration-1000 ${
                        isPlaying ? 'animate-pulse scale-110' : ''
                      }`}
                      style={{ 
                        color: currentSequence.colors[currentPattern % currentSequence.colors.length],
                        textShadow: `0 0 20px ${currentSequence.colors[currentPattern % currentSequence.colors.length]}50`
                      }}
                    >
                      {currentSequence.patterns[currentPattern]}
                    </div>
                    
                    {showLightLanguage && (
                      <div 
                        className="text-2xl font-semibold text-white animate-pulse"
                        style={{ 
                          color: currentSequence.colors[(currentSound + 1) % currentSequence.colors.length]
                        }}
                      >
                        {currentSequence.sounds[currentSound]}
                      </div>
                    )}
                  </div>
                  
                  {/* Frequency Waves */}
                  {isPlaying && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-purple-400 animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.05}s`,
                              animationDuration: '0.5s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                    <span>{Math.floor(currentSequence.duration / 60)}:{(currentSequence.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Playback Controls */}
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Radio className="w-6 h-6 text-green-400" />
                  Activation Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="border-gray-600"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <UsageLimitGate 
                    featureType="dnaActivation"
                    requiredTier="premium"
                    usageType="dnaActivations"
                  >
                    <Button
                      onClick={handlePlayPause}
                      className="premium-button px-8 py-3"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span className="ml-2">{isPlaying ? 'Pause' : 'Activate'}</span>
                    </Button>
                  </UsageLimitGate>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMute}
                    className="border-gray-600"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Frequency Volume</label>
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Visualization Intensity */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Visualization Intensity</label>
                  <Slider
                    value={[visualizationIntensity]}
                    onValueChange={(value) => setVisualizationIntensity(value[0])}
                    max={100}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={showLightLanguage}
                      onChange={(e) => setShowLightLanguage(e.target.checked)}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                    Show Light Language Sounds
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* DNA Activation Level */}
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  DNA Activation Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Level</span>
                    <Badge 
                      variant="secondary" 
                      style={{ backgroundColor: dnaActivationLevels[activationLevel - 1].color + '20' }}
                    >
                      Level {activationLevel}
                    </Badge>
                  </div>
                  
                  <Slider
                    value={[activationLevel]}
                    onValueChange={(value) => setActivationLevel(value[0])}
                    max={11}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  
                  <div className="text-center">
                    <h4 className="text-white font-medium">
                      {dnaActivationLevels[activationLevel - 1].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {dnaActivationLevels[activationLevel - 1].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sequence Benefits */}
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-orange-400" />
                  Activation Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSequence.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h5 className="text-white font-medium mb-2">Targeted Chakras</h5>
                  <div className="flex flex-wrap gap-2">
                    {currentSequence.chakras.map((chakra, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {chakra.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Usage Tracking */}
      <Card className="ultra-glass border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-gold-400" />
              <div>
                <h4 className="text-white font-medium">DNA Activations</h4>
                <p className="text-gray-400 text-sm">Track your cosmic evolution progress</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-purple-400 font-semibold">
                {subscription.usage.dnaActivations || 0} / {subscription.limits.dnaActivations}
              </div>
              <div className="text-gray-500 text-xs">This month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CosmicDNAActivation

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Zap, 
  Heart, 
  Eye, 
  Compass, 
  Info,
  ArrowLeft,
  Lock,
  Crown
} from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay } from './PremiumGate'

// Star System Data
const starSystems = [
  {
    id: 'pleiades',
    name: 'Pleiades',
    position: { x: 30, y: 25, z: 0 },
    color: '#60a5fa',
    traits: ['Healing', 'Empathy', 'Light Work'],
    description: 'Known as the Seven Sisters, Pleiadians are master healers and light workers.',
    connectionLevel: 85,
    requiredTier: 'free'
  },
  {
    id: 'sirius',
    name: 'Sirius',
    position: { x: 70, y: 40, z: 0 },
    color: '#fbbf24',
    traits: ['Wisdom', 'Technology', 'Ancient Knowledge'],
    description: 'Sirians are ancient beings of wisdom, masters of sacred technology.',
    connectionLevel: 72,
    requiredTier: 'free'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    position: { x: 50, y: 70, z: 0 },
    color: '#34d399',
    traits: ['Healing', 'Ascension', 'Higher Dimensions'],
    description: 'Arcturians are fifth-dimensional beings focused on healing and ascension.',
    connectionLevel: 68,
    requiredTier: 'free'
  },
  {
    id: 'andromeda',
    name: 'Andromeda',
    position: { x: 20, y: 60, z: 0 },
    color: '#a78bfa',
    traits: ['Freedom', 'Rebellion', 'Innovation'],
    description: 'Andromedans value freedom and are natural rebels against oppression.',
    connectionLevel: 45,
    requiredTier: 'premium'
  },
  {
    id: 'vega',
    name: 'Vega',
    position: { x: 80, y: 20, z: 0 },
    color: '#f472b6',
    traits: ['Creativity', 'Art', 'Expression'],
    description: 'Vegans are master artists and creators, bringing beauty to the universe.',
    connectionLevel: 38,
    requiredTier: 'premium'
  },
  {
    id: 'orion',
    name: 'Orion',
    position: { x: 60, y: 80, z: 0 },
    color: '#ef4444',
    traits: ['Warrior', 'Protection', 'Justice'],
    description: 'Orions are cosmic warriors, protectors of universal justice.',
    connectionLevel: 52,
    requiredTier: 'premium'
  },
  {
    id: 'lyra',
    name: 'Lyra',
    position: { x: 40, y: 15, z: 0 },
    color: '#06d6a0',
    traits: ['Music', 'Harmony', 'Ancient Wisdom'],
    description: 'Lyrans are the ancient musicians of the cosmos, masters of vibrational healing.',
    connectionLevel: 63,
    requiredTier: 'cosmic'
  },
  {
    id: 'alpha-centauri',
    name: 'Alpha Centauri',
    position: { x: 15, y: 35, z: 0 },
    color: '#ffd60a',
    traits: ['Science', 'Logic', 'Innovation'],
    description: 'Alpha Centaurians are cosmic scientists, advancing universal knowledge.',
    connectionLevel: 41,
    requiredTier: 'cosmic'
  }
]

// 3D Star Field Component
const StarField = ({ onStarClick, selectedStar }) => {
  const canvasRef = useRef(null)
  const [stars, setStars] = useState([])
  const { hasAccess, promptUpgrade } = useSubscription()
  
  useEffect(() => {
    // Generate background stars
    const backgroundStars = Array.from({ length: 200 }, (_, i) => ({
      id: `bg-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 2
    }))
    setStars(backgroundStars)
  }, [])
  
  const handleStarSystemClick = (system) => {
    const hasSystemAccess = hasAccess('starSystems', system.requiredTier)
    
    if (hasSystemAccess) {
      onStarClick(system)
    } else {
      promptUpgrade('starSystems')
    }
  }
  
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      {/* Background Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.twinkle}s`
          }}
        />
      ))}
      
      {/* Star Systems */}
      {starSystems.map(system => {
        const hasSystemAccess = hasAccess('starSystems', system.requiredTier)
        
        return (
          <div
            key={system.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              selectedStar?.id === system.id ? 'scale-150 z-20' : 'hover:scale-125 z-10'
            }`}
            style={{
              left: `${system.position.x}%`,
              top: `${system.position.y}%`
            }}
            onClick={() => handleStarSystemClick(system)}
          >
            {/* Star Glow */}
            <div
              className={`absolute inset-0 rounded-full blur-lg ${
                hasSystemAccess ? 'opacity-60' : 'opacity-30'
              }`}
              style={{
                backgroundColor: system.color,
                width: '40px',
                height: '40px',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Star Core */}
            <div
              className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                hasSystemAccess 
                  ? 'border-white/50' 
                  : 'border-white/20 bg-gray-800/80'
              }`}
              style={{ 
                backgroundColor: hasSystemAccess ? system.color : 'rgba(75, 85, 99, 0.8)'
              }}
            >
              {hasSystemAccess ? (
                <Star className="w-3 h-3 text-white" />
              ) : system.requiredTier === 'cosmic' ? (
                <Crown className="w-3 h-3 text-white/70" />
              ) : (
                <Lock className="w-3 h-3 text-white/70" />
              )}
            </div>
            
            {/* Connection Lines */}
            {selectedStar?.id === system.id && hasSystemAccess && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
              </div>
            )}
            
            {/* System Label */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
              <div className={`text-xs font-medium whitespace-nowrap ${
                hasSystemAccess ? 'text-white' : 'text-gray-400'
              }`}>
                {system.name}
              </div>
              {!hasSystemAccess && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs mt-1 ${
                    system.requiredTier === 'cosmic' 
                      ? 'bg-gradient-to-r from-gold-500 to-purple-500 text-white'
                      : 'bg-gray-800/80 text-gray-300'
                  }`}
                >
                  {system.requiredTier === 'cosmic' ? 'Cosmic' : 'Premium'}
                </Badge>
              )}
            </div>
          </div>
        )
      })}
      
      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
          </linearGradient>
        </defs>
        {starSystems.slice(0, 3).map((system, index) => {
          const nextSystem = starSystems[index + 1]
          if (!nextSystem) return null
          
          const hasAccess1 = hasAccess('starSystems', system.requiredTier)
          const hasAccess2 = hasAccess('starSystems', nextSystem.requiredTier)
          
          if (!hasAccess1 || !hasAccess2) return null
          
          return (
            <line
              key={`line-${index}`}
              x1={`${system.position.x}%`}
              y1={`${system.position.y}%`}
              x2={`${nextSystem.position.x}%`}
              y2={`${nextSystem.position.y}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          )
        })}
      </svg>
    </div>
  )
}

// Star System Info Panel
const StarSystemInfo = ({ system, onClose }) => {
  const { hasAccess, promptUpgrade, incrementUsage } = useSubscription()
  
  if (!system) return null
  
  const hasSystemAccess = hasAccess('starSystems', system.requiredTier)
  
  const handleExploreHeritage = () => {
    if (hasSystemAccess) {
      incrementUsage('starSystemsAccessed')
      // Navigate to heritage exploration
    } else {
      promptUpgrade('starSystems')
    }
  }
  
  return (
    <Card className="absolute top-4 right-4 w-80 ultra-glass border-0 z-30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            {system.name}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {system.description}
        </p>
        
        {/* Connection Level */}
        {hasSystemAccess && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white">Soul Connection</span>
              <span className="text-gray-400">{system.connectionLevel}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${system.connectionLevel}%`,
                  background: `linear-gradient(90deg, ${system.color}, #fbbf24)`
                }}
              />
            </div>
          </div>
        )}
        
        {/* Traits */}
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">Key Traits</h4>
          <div className="flex flex-wrap gap-2">
            {system.traits.map((trait, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`border-white/20 ${
                  hasSystemAccess 
                    ? 'bg-white/10 text-white' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          {hasSystemAccess ? (
            <>
              <Button 
                className="w-full premium-button"
                onClick={handleExploreHeritage}
              >
                <Eye className="w-4 h-4 mr-2" />
                Explore Heritage
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Heart className="w-4 h-4 mr-2" />
                Deepen Connection
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400 mb-2">
                  {system.requiredTier === 'cosmic' 
                    ? 'Cosmic Master required to access this star system'
                    : 'Premium subscription required to access this star system'
                  }
                </p>
              </div>
              <Button 
                className="w-full premium-button"
                onClick={() => promptUpgrade('starSystems')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Unlock
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Navigation Controls
const NavigationControls = () => {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        className="ultra-glass border-white/20 text-white hover:bg-white/10"
        title="Zoom In"
      >
        <Zap className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="ultra-glass border-white/20 text-white hover:bg-white/10"
        title="Reset View"
      >
        <Compass className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="ultra-glass border-white/20 text-white hover:bg-white/10"
        title="Information"
      >
        <Info className="w-4 h-4" />
      </Button>
    </div>
  )
}

// Usage Stats Component
const UsageStats = () => {
  const { usage, subscription, getRemainingUsage } = useSubscription()
  
  return (
    <div className="absolute top-4 left-4 ultra-glass p-4 rounded-lg">
      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
        <Star className="w-4 h-4 text-blue-400" />
        Star Systems
      </h4>
      <div className="text-sm text-gray-300">
        <p>Accessed: {usage.starSystemsAccessed}</p>
        <p>Remaining: {getRemainingUsage('starSystems')}</p>
      </div>
    </div>
  )
}

// Main Galactic Map Component
const GalacticMap = () => {
  const [selectedStar, setSelectedStar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  const handleStarClick = (system) => {
    setSelectedStar(system)
  }
  
  const handleCloseInfo = () => {
    setSelectedStar(null)
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="cosmic-loader mb-4" />
          <p className="text-white text-lg">Mapping the cosmos...</p>
          <p className="text-gray-400 text-sm">Connecting to galactic frequencies</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <h1 className="text-3xl font-bold cosmic-gradient-text mb-2">
          Galactic Heritage Map
        </h1>
        <p className="text-gray-400 text-sm">
          Discover your starseed origins and cosmic connections
        </p>
      </div>
      
      {/* Usage Stats */}
      <UsageStats />
      
      {/* 3D Star Field */}
      <StarField onStarClick={handleStarClick} selectedStar={selectedStar} />
      
      {/* Star System Info Panel */}
      <StarSystemInfo system={selectedStar} onClose={handleCloseInfo} />
      
      {/* Navigation Controls */}
      <NavigationControls />
      
      {/* Instructions */}
      {!selectedStar && (
        <div className="absolute bottom-4 right-4 ultra-glass p-4 rounded-lg max-w-xs">
          <p className="text-white text-sm">
            <Star className="w-4 h-4 inline mr-1" />
            Click on star systems to explore your cosmic heritage
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Premium systems require subscription upgrade
          </p>
        </div>
      )}
    </div>
  )
}

export default GalacticMap

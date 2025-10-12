import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  BarChart3, 
  Map, 
  Shapes, 
  Brain,
  Sparkles,
  Dna,
  Crown,
  Star,
  Eye,
  Heart,
  Zap,
  Settings,
  User
} from 'lucide-react'

// Import all components
import Dashboard from './components/Dashboard'
import GalacticMap from './components/GalacticMap'
import SacredGeometryLab from './components/SacredGeometryLab'
import SpiritualAssessment from './components/SpiritualAssessment'
import CosmicOracle from './components/CosmicOracle'
import MeditationStudio from './components/MeditationStudio'
import GalacticOriginAssessment from './components/GalacticOriginAssessment'
import PersonalGeometryAssessment from './components/PersonalGeometryAssessment'
import AssessmentDashboard from './components/AssessmentDashboard'
import CosmicDNAActivation from './components/CosmicDNAActivation'
import SubscriptionModal from './components/SubscriptionModal'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { AssessmentDataProvider } from './contexts/AssessmentDataContext'
import './App.css'

// Cosmic Particle Component
const CosmicParticle = ({ delay, size, color, top, left }) => (
  <div
    className={`cosmic-particle ${color}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      animationDelay: `${delay}s`
    }}
  />
)

// Hero Section Component
const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Optimized Cosmic Particles - Reduced for Performance */}
      <CosmicParticle delay={0} size={70} color="purple" top="15%" left="15%" />
      <CosmicParticle delay={2} size={60} color="blue" top="70%" left="80%" />
      <CosmicParticle delay={4} size={50} color="gold" top="40%" left="10%" />
      
      <div className="max-w-4xl mx-auto z-10">
        <h1 className="text-6xl md:text-7xl font-bold cosmic-gradient-text mb-6 fade-in-up">
          Awaken Your Inner Self
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto fade-in-up">
          Discover your cosmic heritage, unlock sacred geometry, and activate your highest potential through advanced spiritual technology.
        </p>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 fade-in-up">
          <Card className="ultra-glass border-0 hover:border-purple-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('dashboard')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cosmic Dashboard</h3>
              <p className="text-gray-400 text-sm">Track your consciousness evolution and spiritual progress with advanced metrics and insights.</p>
              <Badge variant="secondary" className="mt-3">Free</Badge>
            </CardContent>
          </Card>
          
          <Card className="ultra-glass border-0 hover:border-blue-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('galactic-map')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Galactic Heritage</h3>
              <p className="text-gray-400 text-sm">Explore your starseed origins through our interactive 3D galactic map and cosmic connections.</p>
              <Badge variant="outline" className="mt-3 border-blue-400 text-blue-300">Premium</Badge>
            </CardContent>
          </Card>
          
          <Card className="ultra-glass border-0 hover:border-green-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('sacred-geometry')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shapes className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sacred Geometry</h3>
              <p className="text-gray-400 text-sm">Create and explore the mathematical patterns that underlie all creation and consciousness.</p>
              <Badge variant="secondary" className="mt-3">Free</Badge>
            </CardContent>
          </Card>

          <Card className="ultra-glass border-0 hover:border-orange-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('spiritual-assessment')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Spiritual Assessment</h3>
              <p className="text-gray-400 text-sm">Discover your unique spiritual profile through comprehensive consciousness evaluation.</p>
              <Badge variant="outline" className="mt-3 border-orange-400 text-orange-300">Premium</Badge>
            </CardContent>
          </Card>

          <Card className="ultra-glass border-0 hover:border-pink-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('cosmic-oracle')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cosmic Oracle</h3>
              <p className="text-gray-400 text-sm">Receive divine guidance from our AI-powered cosmic consciousness oracle system.</p>
              <Badge variant="outline" className="mt-3 border-pink-400 text-pink-300">Premium</Badge>
            </CardContent>
          </Card>

          <Card className="ultra-glass border-0 hover:border-indigo-500/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('meditation-studio')}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Meditation Studio</h3>
              <p className="text-gray-400 text-sm">Advanced consciousness training with biometric feedback and guided experiences.</p>
              <Badge variant="outline" className="mt-3 border-indigo-400 text-indigo-300">Cosmic</Badge>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          onClick={() => onNavigate('assessment-dashboard')}
          className="premium-button px-8 py-4 text-lg mr-4"
        >
          Begin Your Journey
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-600 px-8 py-4 text-lg"
        >
          Watch Demo
        </Button>
      </div>
    </section>
  )
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('home')
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'assessment-dashboard', icon: User, label: 'Assessments' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'galactic-map', icon: Map, label: 'Galactic Map' },
    { id: 'sacred-geometry', icon: Shapes, label: 'Sacred Geometry' },
    { id: 'spiritual-assessment', icon: Brain, label: 'Assessment' },
    { id: 'cosmic-oracle', icon: Sparkles, label: 'Oracle' },
    { id: 'meditation-studio', icon: Heart, label: 'Meditation' },
    { id: 'galactic-origin-assessment', icon: Star, label: 'Galactic Origin' },
    { id: 'personal-geometry-assessment', icon: Eye, label: 'Geometry Test' },
    { id: 'cosmic-dna-activation', icon: Dna, label: 'DNA Activation' }
  ]

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HeroSection onNavigate={setCurrentView} />
      case 'assessment-dashboard':
        return <AssessmentDashboard />
      case 'dashboard':
        return <Dashboard />
      case 'galactic-map':
        return <GalacticMap />
      case 'sacred-geometry':
        return <SacredGeometryLab />
      case 'spiritual-assessment':
        return <SpiritualAssessment />
      case 'cosmic-oracle':
        return <CosmicOracle />
      case 'meditation-studio':
        return <MeditationStudio />
      case 'galactic-origin-assessment':
        return <GalacticOriginAssessment />
      case 'personal-geometry-assessment':
        return <PersonalGeometryAssessment />
      case 'cosmic-dna-activation':
        return <CosmicDNAActivation />
      default:
        return <HeroSection onNavigate={setCurrentView} />
    }
  }

  return (
    <SubscriptionProvider>
      <AssessmentDataProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div 
                className="text-2xl font-bold cosmic-gradient-text cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                Aetheria
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setCurrentView('assessment-dashboard')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Assessments
                </button>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('galactic-map')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Galactic Map
                </button>
                <button 
                  onClick={() => setCurrentView('sacred-geometry')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sacred Geometry
                </button>
                <Button 
                  onClick={() => setShowSubscriptionModal(true)}
                  className="premium-button"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-20">
            {renderCurrentView()}
          </main>

          {/* Floating Navigation */}
          <div className="floating-nav">
            {navigationItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`floating-nav-item ${currentView === item.id ? 'bg-purple-500/30' : ''}`}
                title={item.label}
              >
                <item.icon className="w-5 h-5 text-white" />
              </button>
            ))}
          </div>

          {/* Subscription Modal */}
          {showSubscriptionModal && (
            <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
          )}
        </div>
      </AssessmentDataProvider>
    </SubscriptionProvider>
  )
}

export default App

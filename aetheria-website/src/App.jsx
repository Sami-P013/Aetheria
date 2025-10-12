import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Star, 
  Brain, 
  Heart, 
  Eye, 
  Map, 
  Hexagon, 
  MessageCircle,
  BarChart3,
  Users,
  Shield,
  Zap,
  Crown,
  Check,
  ArrowRight,
  Play,
  Download,
  Globe,
  Smartphone
} from 'lucide-react'
import './App.css'

// Cosmic Particle Component
const CosmicParticle = ({ delay = 0, size = 20, color = 'purple', top = '20%', left = '20%' }) => {
  return (
    <div
      className={`cosmic-particle ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top,
        left,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'ultra-glass' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold cosmic-gradient-text">
            Aetheria
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white hover:text-purple-400 transition-colors">Features</a>
            <a href="#pricing" className="text-white hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#about" className="text-white hover:text-purple-400 transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-purple-400 transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Sign In
            </Button>
            <Button className="premium-button">
              <Play className="w-4 h-4 mr-2" />
              Launch App
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Cosmic Particles */}
      <CosmicParticle delay={0} size={80} color="purple" top="10%" left="10%" />
      <CosmicParticle delay={1} size={60} color="blue" top="20%" left="85%" />
      <CosmicParticle delay={2} size={40} color="gold" top="70%" left="15%" />
      <CosmicParticle delay={3} size={70} color="purple" top="60%" left="80%" />
      <CosmicParticle delay={4} size={30} color="blue" top="40%" left="5%" />
      <CosmicParticle delay={5} size={50} color="gold" top="80%" left="90%" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="fade-in-up">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
            ✨ The Future of Spiritual Development
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 cosmic-gradient-text">
            Awaken Your
            <br />
            Inner Self
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on a transformative journey of spiritual growth and self-realization 
            with our advanced consciousness tools, starseed heritage exploration, and cosmic guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="premium-button px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
              <Eye className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ Awakened Souls</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Cosmic Dashboard",
      description: "Track your consciousness evolution and spiritual progress with advanced metrics and insights.",
      tier: "Free"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Galactic Heritage Map",
      description: "Explore your starseed origins through our interactive 3D galactic map and cosmic connections.",
      tier: "Premium"
    },
    {
      icon: <Hexagon className="w-8 h-8" />,
      title: "Sacred Geometry Lab",
      description: "Create and explore the mathematical patterns that underlie all creation and consciousness.",
      tier: "Free"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Spiritual Assessment",
      description: "Discover your unique spiritual profile through comprehensive consciousness evaluation.",
      tier: "Premium"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Cosmic Oracle",
      description: "Receive divine guidance from our AI-powered cosmic consciousness oracle system.",
      tier: "Premium"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Meditation Studio",
      description: "Advanced consciousness training with biometric feedback and guided experiences.",
      tier: "Cosmic"
    }
  ]

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-gradient-text mb-6">
            Spiritual Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover advanced tools designed to accelerate your spiritual evolution 
            and unlock your cosmic potential.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="ultra-glass border-0 group hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      feature.tier === 'Free' ? 'bg-green-500/20 text-green-300' :
                      feature.tier === 'Premium' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-gold-500/20 text-yellow-300'
                    }`}
                  >
                    {feature.tier}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Cosmic Explorer",
      price: "Free",
      period: "forever",
      description: "Begin your spiritual journey with essential tools",
      features: [
        "Basic consciousness tracking",
        "Limited meditation sessions",
        "3 starseed heritage systems",
        "Basic sacred geometry patterns",
        "Community access"
      ],
      color: "from-purple-500 to-blue-500",
      popular: false
    },
    {
      name: "Galactic Awakener",
      price: "$19.99",
      period: "month",
      description: "Unlock advanced spiritual technologies",
      features: [
        "Advanced consciousness analytics",
        "Unlimited meditation sessions",
        "All 12+ starseed heritage systems",
        "Complete sacred geometry library",
        "AI-powered spiritual guidance",
        "Premium community access"
      ],
      color: "from-pink-500 to-purple-500",
      popular: true
    },
    {
      name: "Cosmic Master",
      price: "$49.99",
      period: "month",
      description: "Master-level access to cosmic wisdom",
      features: [
        "Everything in Galactic Awakener",
        "Personal cosmic mentor AI",
        "Advanced dimensional analysis",
        "Quantum consciousness mapping",
        "Exclusive master classes",
        "Priority support"
      ],
      color: "from-gold-500 to-yellow-500",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-gradient-text mb-6">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your spiritual journey and unlock your cosmic potential.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`ultra-glass border-0 relative transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`mx-auto p-3 rounded-full bg-gradient-to-r ${plan.color} mb-4 w-fit`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold cosmic-gradient-text">
                      {plan.price}
                    </span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                  {plan.period === 'forever' && (
                    <span className="text-green-400 text-sm">Forever Free</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full premium-button ${plan.popular ? 'ring-2 ring-purple-400' : ''}`}>
                  {plan.price === 'Free' ? 'Get Started' : 'Upgrade Now'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold cosmic-gradient-text mb-6">
              The Future of
              <br />
              Spiritual Evolution
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Aetheria represents a quantum leap in spiritual development technology. 
              Our platform combines ancient wisdom with cutting-edge AI to create 
              personalized pathways for consciousness expansion.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-400">Advanced algorithms analyze your spiritual progress and provide personalized guidance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Heart-Centered Approach</h3>
                  <p className="text-gray-400">Every feature is designed with love and respect for your unique spiritual journey.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Quantum Acceleration</h3>
                  <p className="text-gray-400">Experience rapid spiritual growth through our scientifically-backed methodologies.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="ultra-glass p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="cosmic-loader mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Consciousness Metrics</h3>
                <p className="text-gray-400">Real-time tracking of your spiritual evolution</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Awareness Level</span>
                  <span className="text-purple-400 font-mono">87%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white">Cosmic Connection</span>
                  <span className="text-blue-400 font-mono">72%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white">Heart Coherence</span>
                  <span className="text-green-400 font-mono">94%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="ultra-glass border-0 p-12">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-gradient-text mb-6">
            Ready to Awaken?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of souls on their journey to higher consciousness. 
            Your cosmic awakening begins with a single step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="premium-button px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Launch Web App
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
              <Smartphone className="w-5 h-5 mr-2" />
              Download Mobile
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Available Worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Made with Love</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold cosmic-gradient-text mb-4">
              Aetheria
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Awakening consciousness through advanced spiritual technologies 
              and cosmic wisdom.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Aetheria. Made with ❤️ for the awakening of human consciousness.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="cosmic-loader mb-4"></div>
          <p className="text-white text-lg">Initializing Aetheria...</p>
          <p className="text-gray-400 text-sm">Connecting to cosmic frequencies</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App

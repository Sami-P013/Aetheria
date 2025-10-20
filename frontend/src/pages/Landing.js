import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Star, Zap, Brain, Heart, Telescope } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Cosmic Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Aetheria
          </span>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              Cosmic Heritage
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Unlock the mysteries of consciousness through ancient wisdom and modern science.
            Begin your journey of spiritual awakening.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6">
              Begin Your Journey
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Cosmic Oracle</h3>
            <p className="text-white/70">
              Connect with AI-powered spiritual guidance for deep insights into your journey.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
              <Telescope className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Galactic Heritage</h3>
            <p className="text-white/70">
              Explore your starseed origins and discover your cosmic lineage across dimensions.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sacred Geometry</h3>
            <p className="text-white/70">
              Unlock the patterns of creation through interactive sacred geometry exploration.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Meditation Studio</h3>
            <p className="text-white/70">
              Advanced consciousness training with guided meditations and frequency healing.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">17 Dimensions</h3>
            <p className="text-white/70">
              Comprehensive consciousness assessment across cognitive, emotional, and spiritual realms.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">DNA Activation</h3>
            <p className="text-white/70">
              Experience light language sequences designed for multi-dimensional awakening.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Awaken?</h2>
          <p className="text-xl text-white/80 mb-8">Join thousands on their journey of spiritual discovery</p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6">
              Start Free Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-32">
        <div className="container mx-auto px-6 py-8 text-center text-white/60">
          <p>© 2025 Aetheria. Awakening consciousness across dimensions.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
  Star,
  ArrowRight,
  Brain,
  Telescope,
  Music
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Brain,
      title: 'Cosmic Oracle',
      description: 'Get AI-powered spiritual guidance',
      color: 'from-purple-500 to-pink-500',
      path: '/oracle'
    },
    {
      icon: Music,
      title: 'Meditation Studio',
      description: 'Begin your practice',
      color: 'from-blue-500 to-purple-500',
      path: '/meditation'
    },
    {
      icon: Telescope,
      title: 'Galactic Heritage',
      description: 'Discover your origins',
      color: 'from-pink-500 to-orange-500',
      path: '/galactic'
    },
  ];

  const stats = [
    { label: 'Consciousness Level', value: '1', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Meditation Sessions', value: '0', icon: Target, color: 'text-pink-400' },
    { label: 'Cosmic Alignment', value: '0%', icon: Zap, color: 'text-blue-400' },
    { label: 'Completed Assessments', value: '0', icon: Star, color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">{user?.full_name || 'Seeker'}</span>
        </h1>
        <p className="text-white/60 text-lg">Continue your journey of cosmic discovery</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="backdrop-blur-md bg-white/5 border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => navigate(action.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-white">{action.title}</CardTitle>
                  <CardDescription className="text-white/60">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Begin Your Cosmic Journey
          </CardTitle>
          <CardDescription className="text-white/70">
            Unlock the full potential of your consciousness with these essential tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Connect with the Cosmic Oracle</p>
                <p className="text-sm text-white/60">Ask questions and receive AI-powered spiritual guidance</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Start Your Meditation Practice</p>
                <p className="text-sm text-white/60">Access guided meditations for consciousness expansion</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Explore Your Galactic Heritage</p>
                <p className="text-sm text-white/60">Discover your starseed origins and cosmic lineage</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

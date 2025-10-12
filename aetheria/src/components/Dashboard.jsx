import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Heart, 
  Zap, 
  Star, 
  TrendingUp, 
  Calendar,
  Target,
  Award
} from 'lucide-react'

// Consciousness Level Indicator Component
const ConsciousnessIndicator = ({ level = 72, maxLevel = 100 }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(level), 500)
    return () => clearTimeout(timer)
  }, [level])
  
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (animatedLevel / maxLevel) * circumference
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#consciousnessGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="consciousnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cosmic-purple)" />
            <stop offset="50%" stopColor="var(--mystical-pink)" />
            <stop offset="100%" stopColor="var(--cosmic-gold)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold cosmic-gradient-text">{animatedLevel}</span>
        <span className="text-xs text-gray-400">Consciousness</span>
      </div>
    </div>
  )
}

// Chakra Progress Component
const ChakraProgress = ({ chakras }) => {
  return (
    <div className="space-y-4">
      {chakras.map((chakra, index) => (
        <div key={index} className="flex items-center gap-4">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: chakra.color }}
          />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">{chakra.name}</span>
              <span className="text-gray-400">{chakra.level}%</span>
            </div>
            <Progress value={chakra.level} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Spiritual Metrics Card
const SpiritualMetricsCard = ({ title, value, change, icon: Icon, color = "purple" }) => {
  const colorClasses = {
    purple: "text-purple-400 bg-purple-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    gold: "text-yellow-400 bg-yellow-400/10",
    green: "text-green-400 bg-green-400/10",
    pink: "text-pink-400 bg-pink-400/10"
  }
  
  return (
    <Card className="ultra-glass border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">+{change}%</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    consciousnessLevel: 72,
    meditationStreak: 15,
    totalSessions: 127,
    weeklyGoal: 85,
    cosmicAlignment: 68
  })
  
  const chakras = [
    { name: "Root", level: 85, color: "#dc2626" },
    { name: "Sacral", level: 72, color: "#ea580c" },
    { name: "Solar Plexus", level: 68, color: "#ca8a04" },
    { name: "Heart", level: 91, color: "#16a34a" },
    { name: "Throat", level: 76, color: "#2563eb" },
    { name: "Third Eye", level: 83, color: "#7c3aed" },
    { name: "Crown", level: 79, color: "#a855f7" }
  ]
  
  const recentAchievements = [
    { title: "Meditation Master", description: "Completed 100 sessions", date: "2 days ago" },
    { title: "Chakra Alignment", description: "Balanced all energy centers", date: "1 week ago" },
    { title: "Cosmic Connection", description: "Reached 70% consciousness", date: "2 weeks ago" }
  ]
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-2">
            Cosmic Dashboard
          </h1>
          <p className="text-gray-400">
            Track your spiritual journey and consciousness evolution
          </p>
        </div>
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SpiritualMetricsCard
            title="Meditation Streak"
            value={`${userStats.meditationStreak} days`}
            change={12}
            icon={Brain}
            color="purple"
          />
          <SpiritualMetricsCard
            title="Total Sessions"
            value={userStats.totalSessions}
            change={8}
            icon={Target}
            color="blue"
          />
          <SpiritualMetricsCard
            title="Weekly Goal"
            value={`${userStats.weeklyGoal}%`}
            change={15}
            icon={Star}
            color="gold"
          />
          <SpiritualMetricsCard
            title="Cosmic Alignment"
            value={`${userStats.cosmicAlignment}%`}
            change={5}
            icon={Zap}
            color="pink"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Consciousness Level */}
          <Card className="ultra-glass border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Consciousness Level
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <ConsciousnessIndicator level={userStats.consciousnessLevel} />
              <div className="mt-4 space-y-2">
                <Badge variant="secondary" className="bg-purple-400/20 text-purple-300">
                  Awakening Stage
                </Badge>
                <p className="text-sm text-gray-400">
                  You're in the early stages of spiritual awakening. Continue your practices to deepen your connection.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Chakra System */}
          <Card className="ultra-glass border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Energy Centers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChakraProgress chakras={chakras} />
            </CardContent>
          </Card>
          
          {/* Recent Achievements */}
          <Card className="ultra-glass border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-400" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cosmic-gold mt-2" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Spiritual Progress Chart */}
        <Card className="ultra-glass border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Spiritual Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="cosmic-loader mb-4" />
                <p className="text-gray-400">Loading consciousness timeline...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain,
  Star,
  Zap,
  Eye,
  Heart,
  Target,
  Crown,
  Sparkles,
  TrendingUp,
  Lock,
  CheckCircle,
  Circle,
  ArrowRight,
  Lightbulb,
  Network,
  BarChart3
} from 'lucide-react'
import { useAssessmentData } from '../contexts/AssessmentDataContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { PremiumOverlay } from './PremiumGate'

const AssessmentDashboard = () => {
  const { 
    assessmentData, 
    getCompletedDimensions, 
    getCompletionPercentage,
    getDimensionsByTier,
    getRecommendedNextAssessment,
    crossModuleInsights,
    availableAnalyses,
    advancedAnalyses,
    getIncompleteRequiredDimensions
  } = useAssessmentData()
  
  const { subscription, hasFeatureAccess } = useSubscription()
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  const completionPercentage = getCompletionPercentage()
  const completedDimensions = getCompletedDimensions()
  const recommendedNext = getRecommendedNextAssessment()
  
  const freeDimensions = getDimensionsByTier('free')
  const premiumDimensions = getDimensionsByTier('premium')
  const cosmicDimensions = getDimensionsByTier('cosmic')

  const DimensionCard = ({ dimension, dimensionKey }) => {
    const isCompleted = dimension.completed
    const hasAccess = hasFeatureAccess(dimension.requiredTier)
    
    return (
      <Card className={`ultra-glass border-0 relative ${isCompleted ? 'border-green-500/30' : ''}`}>
        {!hasAccess && <PremiumOverlay requiredTier={dimension.requiredTier} />}
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg`}
                 style={{ backgroundColor: dimension.color }}>
              {dimension.icon}
            </div>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <CardTitle className="text-white text-sm font-medium">
            {dimension.name}
          </CardTitle>
          <Badge 
            variant={dimension.requiredTier === 'free' ? 'default' : 'secondary'} 
            className="w-fit text-xs"
          >
            {dimension.requiredTier === 'free' ? 'Free' : 
             dimension.requiredTier === 'premium' ? 'Premium' : 'Cosmic'}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-xs mb-3">
            {dimension.description}
          </p>
          {isCompleted ? (
            <div className="space-y-2">
              <p className="text-green-400 text-xs">✓ Completed</p>
              <p className="text-gray-500 text-xs">
                {new Date(dimension.completedAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full text-xs border-gray-600"
              disabled={!hasAccess}
            >
              {hasAccess ? 'Take Assessment' : 'Upgrade Required'}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const InsightCard = ({ insight }) => (
    <Card className="ultra-glass border-0 border-l-4 border-l-purple-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
            <p className="text-gray-300 text-xs mb-2">{insight.description}</p>
            {insight.actionable && (
              <p className="text-purple-400 text-xs font-medium">
                💡 {insight.actionable}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {insight.confidence}% confidence
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {insight.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const AdvancedAnalysisCard = ({ analysisKey, analysis }) => {
    const incompleteRequirements = getIncompleteRequiredDimensions(analysisKey)
    const isAvailable = incompleteRequirements.length === 0
    const hasAccess = hasFeatureAccess(analysis.requiredTier)
    
    return (
      <Card className={`ultra-glass border-0 relative ${isAvailable && hasAccess ? 'border-gold-500/30' : ''}`}>
        {!hasAccess && <PremiumOverlay requiredTier={analysis.requiredTier} />}
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg`}
                 style={{ backgroundColor: analysis.color }}>
              {analysis.icon}
            </div>
            {isAvailable && hasAccess ? (
              <Star className="w-5 h-5 text-gold-400" />
            ) : (
              <Lock className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <CardTitle className="text-white text-sm font-medium">
            {analysis.name}
          </CardTitle>
          <Badge 
            variant={analysis.requiredTier === 'free' ? 'default' : 'secondary'} 
            className="w-fit text-xs"
          >
            {analysis.requiredTier === 'free' ? 'Free' : 
             analysis.requiredTier === 'premium' ? 'Premium' : 'Cosmic'}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-xs mb-3">
            {analysis.description}
          </p>
          
          <div className="space-y-2">
            <p className="text-gray-500 text-xs font-medium">Required Assessments:</p>
            {analysis.requiredDimensions.map(dimKey => {
              const isCompleted = assessmentData[dimKey]?.completed
              return (
                <div key={dimKey} className="flex items-center gap-2 text-xs">
                  {isCompleted ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-500" />
                  )}
                  <span className={isCompleted ? 'text-green-400' : 'text-gray-500'}>
                    {assessmentData[dimKey]?.name}
                  </span>
                </div>
              )
            })}
          </div>
          
          {isAvailable && hasAccess ? (
            <Button 
              size="sm" 
              className="w-full mt-3 premium-button text-xs"
              onClick={() => setSelectedAnalysis(analysisKey)}
            >
              Generate Analysis
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-3 text-xs border-gray-600"
              disabled
            >
              {!hasAccess ? 'Upgrade Required' : `${incompleteRequirements.length} more needed`}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold cosmic-gradient-text mb-4">
          Assessment Dashboard
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Your comprehensive spiritual and consciousness development profile
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="ultra-glass border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Completion</span>
              <span className="text-purple-400 font-semibold">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{completedDimensions.length}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{availableAnalyses.length}</div>
                <div className="text-sm text-gray-400">Analyses Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{crossModuleInsights.length}</div>
                <div className="text-sm text-gray-400">Cross-Module Insights</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Next Assessment */}
      {recommendedNext && (
        <Card className="ultra-glass border-0 border-l-4 border-l-gold-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl`}
                     style={{ backgroundColor: recommendedNext.color }}>
                  {recommendedNext.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">Recommended Next: {recommendedNext.name}</h3>
                  <p className="text-gray-400 text-sm">{recommendedNext.description}</p>
                </div>
              </div>
              <Button className="premium-button">
                Take Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="analyses">Advanced Analyses</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions" className="space-y-6">
          {/* Free Tier Dimensions */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Circle className="w-5 h-5 text-green-400" />
              Free Assessments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeDimensions.map(dimension => (
                <DimensionCard 
                  key={dimension.key} 
                  dimension={dimension} 
                  dimensionKey={dimension.key}
                />
              ))}
            </div>
          </div>

          {/* Premium Tier Dimensions */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              Premium Assessments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {premiumDimensions.map(dimension => (
                <DimensionCard 
                  key={dimension.key} 
                  dimension={dimension} 
                  dimensionKey={dimension.key}
                />
              ))}
            </div>
          </div>

          {/* Cosmic Tier Dimensions */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-gold-400" />
              Cosmic Assessments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cosmicDimensions.map(dimension => (
                <DimensionCard 
                  key={dimension.key} 
                  dimension={dimension} 
                  dimensionKey={dimension.key}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-400" />
              Cross-Module Insights
            </h3>
            <Badge variant="secondary">
              {crossModuleInsights.length} insights generated
            </Badge>
          </div>
          
          {crossModuleInsights.length > 0 ? (
            <div className="space-y-4">
              {crossModuleInsights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          ) : (
            <Card className="ultra-glass border-0">
              <CardContent className="p-8 text-center">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No Insights Yet</h4>
                <p className="text-gray-400 text-sm">
                  Complete more assessments to unlock cross-module insights and correlations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyses" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              Advanced Analyses
            </h3>
            <Badge variant="secondary">
              {availableAnalyses.length} available now
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(advancedAnalyses).map(([key, analysis]) => (
              <AdvancedAnalysisCard 
                key={key} 
                analysisKey={key} 
                analysis={analysis} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Completion by Tier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Free Tier</span>
                      <span className="text-green-400">
                        {freeDimensions.filter(d => d.completed).length}/{freeDimensions.length}
                      </span>
                    </div>
                    <Progress 
                      value={(freeDimensions.filter(d => d.completed).length / freeDimensions.length) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Premium Tier</span>
                      <span className="text-purple-400">
                        {premiumDimensions.filter(d => d.completed).length}/{premiumDimensions.length}
                      </span>
                    </div>
                    <Progress 
                      value={(premiumDimensions.filter(d => d.completed).length / premiumDimensions.length) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Cosmic Tier</span>
                      <span className="text-gold-400">
                        {cosmicDimensions.filter(d => d.completed).length}/{cosmicDimensions.length}
                      </span>
                    </div>
                    <Progress 
                      value={(cosmicDimensions.filter(d => d.completed).length / cosmicDimensions.length) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ultra-glass border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Assessment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedDimensions.slice(0, 5).map((dimension, index) => (
                    <div key={dimension.key} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm`}
                           style={{ backgroundColor: dimension.color }}>
                        {dimension.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{dimension.name}</div>
                        <div className="text-gray-400 text-xs">
                          {new Date(dimension.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {completedDimensions.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No assessments completed yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AssessmentDashboard

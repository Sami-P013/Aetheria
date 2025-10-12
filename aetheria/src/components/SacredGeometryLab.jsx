import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Palette, 
  Settings,
  Circle,
  Triangle,
  Square,
  Hexagon,
  Star,
  Lock
} from 'lucide-react'

// Sacred Geometry Patterns
const geometryPatterns = [
  {
    id: 'flower-of-life',
    name: 'Flower of Life',
    description: 'Ancient symbol of creation and the fundamental forms of space and time',
    complexity: 'Intermediate',
    unlocked: true,
    color: '#8b5cf6'
  },
  {
    id: 'metatrons-cube',
    name: "Metatron's Cube",
    description: 'Contains all five Platonic solids and represents the blueprint of creation',
    complexity: 'Advanced',
    unlocked: true,
    color: '#06b6d4'
  },
  {
    id: 'sri-yantra',
    name: 'Sri Yantra',
    description: 'Sacred geometry representing the cosmos and human consciousness',
    complexity: 'Expert',
    unlocked: false,
    color: '#f59e0b'
  },
  {
    id: 'vesica-piscis',
    name: 'Vesica Piscis',
    description: 'Symbol of divine feminine and the intersection of heaven and earth',
    complexity: 'Beginner',
    unlocked: true,
    color: '#ec4899'
  },
  {
    id: 'golden-spiral',
    name: 'Golden Spiral',
    description: 'Mathematical representation of natural growth and divine proportion',
    complexity: 'Intermediate',
    unlocked: false,
    color: '#10b981'
  },
  {
    id: 'tree-of-life',
    name: 'Tree of Life',
    description: 'Kabbalistic diagram representing the path to spiritual enlightenment',
    complexity: 'Advanced',
    unlocked: false,
    color: '#8b5cf6'
  }
]

// Drawing Tools
const drawingTools = [
  { id: 'circle', name: 'Circle', icon: Circle },
  { id: 'triangle', name: 'Triangle', icon: Triangle },
  { id: 'square', name: 'Square', icon: Square },
  { id: 'hexagon', name: 'Hexagon', icon: Hexagon },
  { id: 'star', name: 'Star', icon: Star }
]

// Geometry Canvas Component
const GeometryCanvas = ({ 
  selectedPattern, 
  animationSpeed, 
  strokeWidth, 
  color, 
  isAnimating,
  onAnimationComplete 
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  
  useEffect(() => {
    if (!canvasRef.current || !selectedPattern) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set drawing properties
    ctx.strokeStyle = color
    ctx.lineWidth = strokeWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // Draw pattern based on selection
    switch (selectedPattern.id) {
      case 'flower-of-life':
        drawFlowerOfLife(ctx, centerX, centerY, animationProgress)
        break
      case 'metatrons-cube':
        drawMetatronsCube(ctx, centerX, centerY, animationProgress)
        break
      case 'vesica-piscis':
        drawVesicaPiscis(ctx, centerX, centerY, animationProgress)
        break
      default:
        drawFlowerOfLife(ctx, centerX, centerY, animationProgress)
    }
  }, [selectedPattern, animationProgress, strokeWidth, color])
  
  useEffect(() => {
    if (isAnimating && selectedPattern) {
      const animate = () => {
        setAnimationProgress(prev => {
          const next = prev + animationSpeed / 100
          if (next >= 1) {
            onAnimationComplete?.()
            return 1
          }
          return next
        })
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, animationSpeed, selectedPattern, onAnimationComplete])
  
  const drawFlowerOfLife = (ctx, centerX, centerY, progress) => {
    const radius = 80
    const circles = [
      { x: 0, y: 0 },
      { x: radius, y: 0 },
      { x: -radius, y: 0 },
      { x: radius/2, y: radius * Math.sin(Math.PI/3) },
      { x: radius/2, y: -radius * Math.sin(Math.PI/3) },
      { x: -radius/2, y: radius * Math.sin(Math.PI/3) },
      { x: -radius/2, y: -radius * Math.sin(Math.PI/3) }
    ]
    
    const totalCircles = Math.floor(progress * circles.length)
    const currentProgress = (progress * circles.length) % 1
    
    circles.slice(0, totalCircles).forEach(circle => {
      ctx.beginPath()
      ctx.arc(centerX + circle.x, centerY + circle.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    })
    
    if (totalCircles < circles.length && currentProgress > 0) {
      const circle = circles[totalCircles]
      ctx.beginPath()
      ctx.arc(centerX + circle.x, centerY + circle.y, radius, 0, 2 * Math.PI * currentProgress)
      ctx.stroke()
    }
  }
  
  const drawMetatronsCube = (ctx, centerX, centerY, progress) => {
    const radius = 100
    const points = []
    
    // Generate hexagon points
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      })
    }
    
    // Add center point
    points.push({ x: centerX, y: centerY })
    
    const totalLines = points.length * (points.length - 1) / 2
    const linesToDraw = Math.floor(progress * totalLines)
    let lineCount = 0
    
    // Draw connections between all points
    for (let i = 0; i < points.length && lineCount < linesToDraw; i++) {
      for (let j = i + 1; j < points.length && lineCount < linesToDraw; j++) {
        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[j].x, points[j].y)
        ctx.stroke()
        lineCount++
      }
    }
  }
  
  const drawVesicaPiscis = (ctx, centerX, centerY, progress) => {
    const radius = 80
    const offset = radius * 0.6
    
    if (progress > 0) {
      ctx.beginPath()
      ctx.arc(centerX - offset, centerY, radius, 0, 2 * Math.PI * Math.min(progress * 2, 1))
      ctx.stroke()
    }
    
    if (progress > 0.5) {
      ctx.beginPath()
      ctx.arc(centerX + offset, centerY, radius, 0, 2 * Math.PI * Math.min((progress - 0.5) * 2, 1))
      ctx.stroke()
    }
  }
  
  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="border border-white/20 rounded-lg bg-black/20"
    />
  )
}

// Pattern Library Component
const PatternLibrary = ({ patterns, selectedPattern, onPatternSelect }) => {
  return (
    <Card className="ultra-glass border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-gold-400" />
          Sacred Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {patterns.map(pattern => (
          <div
            key={pattern.id}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedPattern?.id === pattern.id
                ? 'bg-white/20 border border-white/30'
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
            onClick={() => pattern.unlocked && onPatternSelect(pattern)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pattern.color }}
                />
                {pattern.name}
                {!pattern.unlocked && <Lock className="w-3 h-3 text-gray-400" />}
              </h4>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  pattern.complexity === 'Beginner' ? 'bg-green-400/20 text-green-300' :
                  pattern.complexity === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-300' :
                  pattern.complexity === 'Advanced' ? 'bg-orange-400/20 text-orange-300' :
                  'bg-red-400/20 text-red-300'
                }`}
              >
                {pattern.complexity}
              </Badge>
            </div>
            <p className="text-gray-400 text-sm">{pattern.description}</p>
            {!pattern.unlocked && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  Premium Feature
                </Badge>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Control Panel Component
const ControlPanel = ({ 
  isAnimating, 
  onToggleAnimation, 
  onReset, 
  animationSpeed, 
  onSpeedChange,
  strokeWidth,
  onStrokeWidthChange,
  color,
  onColorChange
}) => {
  const colors = [
    '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#ef4444'
  ]
  
  return (
    <Card className="ultra-glass border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Animation Controls */}
        <div>
          <h4 className="text-white font-medium mb-3">Animation</h4>
          <div className="flex gap-2 mb-4">
            <Button
              onClick={onToggleAnimation}
              className="flex-1 premium-button"
            >
              {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isAnimating ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Speed</label>
            <Slider
              value={[animationSpeed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={10}
              min={0.5}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Style Controls */}
        <div>
          <h4 className="text-white font-medium mb-3">Style</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Stroke Width</label>
              <Slider
                value={[strokeWidth]}
                onValueChange={(value) => onStrokeWidthChange(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Color</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map(colorOption => (
                  <button
                    key={colorOption}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      color === colorOption ? 'border-white scale-110' : 'border-white/30'
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => onColorChange(colorOption)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Export */}
        <div>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Pattern
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Sacred Geometry Lab Component
const SacredGeometryLab = () => {
  const [selectedPattern, setSelectedPattern] = useState(geometryPatterns[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(2)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [color, setColor] = useState('#8b5cf6')
  
  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }
  
  const handleReset = () => {
    setIsAnimating(false)
    // Reset animation will be handled by the canvas component
  }
  
  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold cosmic-gradient-text mb-2">
            Sacred Geometry Lab
          </h1>
          <p className="text-gray-400">
            Explore the mathematical patterns that underlie all creation
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="ultra-glass border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {selectedPattern?.name || 'Select a Pattern'}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white"
                  >
                    Interactive Canvas
                  </Badge>
                </div>
                
                <div className="flex justify-center">
                  <GeometryCanvas
                    selectedPattern={selectedPattern}
                    animationSpeed={animationSpeed}
                    strokeWidth={strokeWidth}
                    color={color}
                    isAnimating={isAnimating}
                    onAnimationComplete={handleAnimationComplete}
                  />
                </div>
                
                {selectedPattern && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      {selectedPattern.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Pattern Library */}
          <div>
            <PatternLibrary
              patterns={geometryPatterns}
              selectedPattern={selectedPattern}
              onPatternSelect={setSelectedPattern}
            />
          </div>
          
          {/* Control Panel */}
          <div>
            <ControlPanel
              isAnimating={isAnimating}
              onToggleAnimation={handleToggleAnimation}
              onReset={handleReset}
              animationSpeed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
              strokeWidth={strokeWidth}
              onStrokeWidthChange={setStrokeWidth}
              color={color}
              onColorChange={setColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SacredGeometryLab

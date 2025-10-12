# Aetheria Sophisticated Design System

## Design Philosophy
Based on the premium wellness app designs provided, Aetheria will embrace a sophisticated, modern aesthetic that combines:
- **Minimalist elegance** with purposeful white space
- **Glassmorphism effects** for depth and modernity
- **Organic, flowing shapes** that feel natural and calming
- **Professional color palettes** with refined gradients
- **Premium typography** with perfect hierarchy
- **Subtle animations** and micro-interactions

## Color Palette

### Primary Colors
- **Deep Navy**: `#0F1419` - Primary dark background
- **Soft White**: `#FAFBFC` - Primary light background
- **Pure White**: `#FFFFFF` - Cards and surfaces
- **Charcoal**: `#1A202C` - Text primary
- **Slate**: `#64748B` - Text secondary

### Accent Colors
- **Cosmic Purple**: `#8B5CF6` - Primary brand color
- **Ethereal Blue**: `#3B82F6` - Secondary brand color
- **Mystical Pink**: `#EC4899` - Accent highlights
- **Golden Aura**: `#F59E0B` - Success/premium states
- **Sage Green**: `#10B981` - Positive indicators

### Gradient Combinations
- **Primary Gradient**: `linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)`
- **Accent Gradient**: `linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)`
- **Subtle Gradient**: `linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)`
- **Dark Gradient**: `linear-gradient(135deg, #1E293B 0%, #0F172A 100%)`

## Typography

### Font Stack
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Display**: `'Inter', system-ui, sans-serif` with font-weight 700+
- **Monospace**: `'JetBrains Mono', 'Fira Code', monospace`

### Typography Scale
- **Display Large**: `text-6xl` (60px) - Hero titles
- **Display Medium**: `text-5xl` (48px) - Section headers
- **Display Small**: `text-4xl` (36px) - Card titles
- **Heading Large**: `text-3xl` (30px) - Component headers
- **Heading Medium**: `text-2xl` (24px) - Subsections
- **Heading Small**: `text-xl` (20px) - Card headers
- **Body Large**: `text-lg` (18px) - Primary body text
- **Body Medium**: `text-base` (16px) - Secondary body text
- **Body Small**: `text-sm` (14px) - Captions and labels
- **Caption**: `text-xs` (12px) - Fine print

## Layout System

### Spacing Scale (Tailwind-based)
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)
- **4xl**: `6rem` (96px)

### Container Sizes
- **Mobile**: `max-w-sm` (384px)
- **Tablet**: `max-w-4xl` (896px)
- **Desktop**: `max-w-7xl` (1280px)
- **Wide**: `max-w-screen-2xl` (1536px)

## Component Design Patterns

### Cards
```css
.sophisticated-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sophisticated-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Glassmorphism Effects
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-dark {
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Buttons
```css
.premium-button {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-weight: 600;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}

.premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}
```

## Visual Elements

### Organic Shapes
- **Blob shapes** for background elements
- **Curved borders** on containers
- **Flowing gradients** that follow natural curves
- **Soft shadows** with organic blur patterns

### Data Visualization
- **Smooth, curved charts** instead of sharp angles
- **Gradient fills** for chart areas
- **Subtle grid lines** with low opacity
- **Interactive hover states** with smooth transitions
- **Color-coded categories** using the accent palette

### Icons and Illustrations
- **Outlined icons** with consistent stroke width (1.5px)
- **Subtle fill states** for active/selected items
- **Micro-animations** on hover and interaction
- **Consistent sizing** using 16px, 20px, 24px grid

## Animation and Interactions

### Timing Functions
- **Ease Out**: `cubic-bezier(0.4, 0, 0.2, 1)` - Default
- **Ease In Out**: `cubic-bezier(0.4, 0, 0.6, 1)` - Smooth transitions
- **Spring**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` - Playful bounces

### Transition Durations
- **Fast**: `150ms` - Hover states, button presses
- **Medium**: `300ms` - Card animations, modal transitions
- **Slow**: `500ms` - Page transitions, complex animations

### Micro-interactions
- **Button hover**: Slight lift + shadow increase
- **Card hover**: Gentle lift + glow effect
- **Input focus**: Smooth border color transition
- **Loading states**: Elegant skeleton animations
- **Success states**: Subtle pulse + color change

## Responsive Design

### Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `1024px - 1280px`
- **Large**: `> 1280px`

### Mobile-First Approach
- Start with mobile design
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (44px minimum)
- Optimized typography scales for each breakpoint

## Accessibility

### Color Contrast
- **AA Compliance**: Minimum 4.5:1 ratio for normal text
- **AAA Compliance**: 7:1 ratio for important text
- **Color Independence**: Never rely solely on color for meaning

### Interactive Elements
- **Focus indicators**: Clear, high-contrast outlines
- **Touch targets**: Minimum 44px for mobile
- **Keyboard navigation**: Logical tab order
- **Screen reader support**: Proper ARIA labels

## Implementation Guidelines

### CSS Architecture
- **Utility-first** with Tailwind CSS
- **Component-specific** custom CSS for complex elements
- **CSS custom properties** for theme variables
- **Consistent naming** following BEM methodology

### Performance Considerations
- **Optimized animations** using transform and opacity
- **Efficient selectors** to minimize repaints
- **Progressive loading** for images and heavy content
- **Reduced motion** support for accessibility

This design system will transform Aetheria into a sophisticated, premium wellness platform that rivals the best modern app designs while maintaining its unique cosmic and mystical identity.

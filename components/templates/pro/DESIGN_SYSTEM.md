# Pro Template Design System

## Overview
The Pro template is a professional, warm, and inviting design system for pet care businesses. It uses natural earth tones with pops of warmth to create a trustworthy and friendly aesthetic.

## Color Palette

### Primary Colors
- **Primary**: `#2d5f4f` - Deep forest green (main brand color)
- **Primary Light**: `#4a8570` - Lighter forest green (hover states)
- **Accent**: `#e8956b` - Warm coral/terracotta (CTAs, highlights)

### Background Colors
- **Cream**: `#faf7f4` - Light warm neutral (alternating sections)
- **Warm White**: `#fffcf8` - Off-white (main background)

### Text Colors
- **Text Dark**: `#2c3e3a` - Dark greenish-gray (headings, body text)
- **Text Light**: `#6b7c78` - Medium greenish-gray (secondary text)

### Utility Colors
- **Shadow**: `rgba(45, 95, 79, 0.1)` - Subtle shadow color
- **White**: `#ffffff` - Pure white (cards, overlays)

### Review Card Border Colors
Cycle through these colors for review photo borders:
1. `#a8c5ba` - Sage green
2. `#e8956b` - Coral/accent
3. `#2d5f4f` - Dark green/primary
4. `#c5d8cf` - Light sage
5. `#f0ad85` - Light coral
6. `#598573` - Medium green

## Typography

### Font Families
- **Headings**: `'Crimson Pro', serif` - Elegant serif for h1-h4
- **Body**: `'DM Sans', sans-serif` - Clean sans-serif for body text

### Font Weights
- **Headings**: 700 (bold)
- **Body**: 400 (regular)
- **Buttons/Labels**: 600 (semi-bold)

### Font Sizes
- **Hero Heading (h1)**: `clamp(2.5rem, 6vw, 4.5rem)` (responsive)
- **Section Heading (h2)**: `clamp(2rem, 4vw, 3rem)` (responsive)
- **Card Heading (h3)**: `1.75rem` - `1.5rem`
- **Subheading (h4)**: `1.3rem` - `1.1rem`
- **Body Text**: `1rem` - `1.05rem`
- **Small Text**: `0.875rem` - `0.95rem`
- **Button Text**: `1rem`

### Line Heights
- **Headings**: 1.1 - 1.2
- **Body**: 1.6 - 1.8
- **Cards**: 1.7

## Spacing System

### Section Padding
- **Default**: `6rem 2rem`
- **Mobile**: `4rem 2rem`

### Container Max Width
- **Default**: `1400px`
- **Text Content**: `1200px`
- **Narrow**: `900px` - `1000px`

### Component Spacing
- **Card Padding**: `2rem` - `2.5rem`
- **Element Margin Bottom**: `1.5rem` - `2rem`
- **Gap (Grid)**: `2rem` - `3rem`

## Border Radius

- **Cards**: `20px`
- **Buttons**: `50px` (pill shape)
- **Small Elements**: `15px`
- **Inputs**: `10px`
- **Circles**: `50%`

## Shadows

### Card Shadows
- **Default**: `0 4px 20px var(--shadow)`
- **Hover**: `0 10px 40px var(--shadow)`
- **Light**: `0 2px 10px var(--shadow)`

## Components

### Navigation
- **Position**: Fixed top
- **Background**: `rgba(255, 252, 248, 0.95)` with backdrop blur
- **Padding**: `1rem 2rem`
- **Links**: Underline animation on hover

### Buttons

#### Primary Button
```css
background: var(--primary);
color: white;
padding: 1rem 2rem;
border-radius: 50px;
font-weight: 600;
box-shadow: 0 4px 20px rgba(45, 95, 79, 0.3);
transition: all 0.3s;
```

**Hover State**:
- Background: `var(--primary-light)`
- Transform: `translateY(-2px)`
- Shadow: `0 6px 30px rgba(45, 95, 79, 0.4)`

#### Secondary Button
```css
background: white;
color: var(--primary);
border: 2px solid var(--primary);
padding: 1rem 2rem;
border-radius: 50px;
font-weight: 600;
transition: all 0.3s;
```

**Hover State**:
- Background: `var(--primary)`
- Color: `white`
- Transform: `translateY(-2px)`

### Cards

#### Service Card
- **Background**: White
- **Border Radius**: `20px`
- **Shadow**: `0 4px 20px var(--shadow)`
- **Padding**: `2rem`
- **Hover**: Lift effect with enhanced shadow
- **Image Height**: `250px`

#### Review Card
- **Background**: White
- **Border Radius**: `20px`
- **Shadow**: `0 4px 20px var(--shadow)`
- **Padding**: `2.5rem`
- **Quote Mark**: 3rem, accent color, 0.3 opacity
- **Photo**: 60px circle with 3px colored border

#### FAQ Card
- **Background**: White
- **Border Radius**: `15px`
- **Shadow**: Default `0 2px 10px`, Active `0 4px 20px`
- **Button Padding**: `2rem`
- **Active Background**: `var(--cream)`
- **Toggle Icon**: 30px circle, primary background

#### Policy Card
- **Background**: White
- **Border Radius**: `15px`
- **Shadow**: `0 4px 20px var(--shadow)`
- **Padding**: `2rem`
- **Icon**: 40px circle, accent background

### Sections

#### Section Header
- **Text Align**: Center
- **Max Width**: `800px`
- **Margin Bottom**: `4rem`
- **Heading Color**: `var(--primary)`
- **Description Color**: `var(--text-light)`

#### Section Backgrounds
Alternate between:
- **Cream**: `section-bg-cream` class
- **White**: `section-bg-white` class
- **Primary**: `section-bg-primary` class (dark green with white text)

### Service Area Cards
- **Background**: `rgba(255, 255, 255, 0.1)` with backdrop blur
- **Border**: `2px solid rgba(255, 255, 255, 0.2)`
- **Border Radius**: `15px`
- **Padding**: `2rem`
- **On Dark Background**: White text with opacity

### Forms

#### Input Fields
```css
width: 100%;
padding: 0.75rem;
border: 1px solid rgba(45, 95, 79, 0.2);
border-radius: 10px;
font-size: 1rem;
transition: border-color 0.3s;
```

**Focus State**:
- Border: `var(--primary)`
- Outline: None

#### Labels
```css
display: block;
margin-bottom: 0.5rem;
color: var(--primary);
font-weight: 600;
```

### Footer
- **Background**: `var(--primary)`
- **Color**: White
- **Padding**: `4rem 2rem 2rem`
- **Grid**: Auto-fit, minmax(250px, 1fr)
- **Gap**: `3rem`
- **Social Icons**: 45px circles with hover effect

## Grid Systems

### Service Cards
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
gap: 2rem;
```

### Review Cards
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
gap: 2rem;
```

### Service Area Cards
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 2rem;
```

### About Images
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1.5rem;
```

## Animations & Transitions

### Standard Transition
```css
transition: all 0.3s;
```

### Hover Effects
- **Cards**: `translateY(-10px)` with shadow enhancement
- **Buttons**: `translateY(-2px)` with shadow enhancement
- **Links**: Opacity 0.9 to 1.0

### Accordion Animation
```css
transition: max-height 0.3s ease-out;
```

### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Floating Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

## Responsive Breakpoints

### Mobile
```css
@media (max-width: 640px) {
  /* Stack elements, reduce spacing */
}
```

### Tablet
```css
@media (max-width: 968px) {
  /* Adjust grid columns, navigation */
}
```

## Accessibility

### Focus States
- All interactive elements have visible focus states
- Use outline or border changes
- Maintain sufficient color contrast

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Text on primary: White text for maximum contrast
- Interactive elements clearly distinguishable

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- Use semantic tags (section, article, nav, footer)
- ARIA labels where needed

## Usage Guidelines

### When to Use Primary vs. Accent
- **Primary (Green)**: Main brand elements, headers, navigation, borders
- **Accent (Coral)**: CTAs, highlights, prices, important information

### Section Order
1. Hero
2. About
3. Services (includes Service Area)
4. Reviews (optional)
5. Contact
6. FAQs
7. Policies (optional)
8. Footer

### Image Guidelines
- **Service Photos**: 400x250px minimum, landscape orientation
- **Review Photos**: Square format, 200x200px minimum
- **Day-to-Day Photos**: 300x375px (4:5 ratio)
- **Featured/Hero Photos**: 500x500px minimum, square
- **Profile Photo**: Square format, 400x500px (3:4 ratio)

### Content Guidelines
- **Headings**: Short, clear, action-oriented
- **Body Text**: Concise paragraphs, 2-3 sentences
- **Buttons**: Action verbs (Book, Contact, Learn More)
- **Descriptions**: Focus on benefits, not features

## CSS Custom Properties

```css
:root {
  --primary: #2d5f4f;
  --primary-light: #4a8570;
  --accent: #e8956b;
  --cream: #faf7f4;
  --warm-white: #fffcf8;
  --text-dark: #2c3e3a;
  --text-light: #6b7c78;
  --shadow: rgba(45, 95, 79, 0.1);
}
```

## Best Practices

1. **Maintain Visual Hierarchy**: Use size, weight, and color to guide users
2. **Consistent Spacing**: Use the spacing system for all margins and padding
3. **Responsive First**: Design for mobile, enhance for desktop
4. **Performance**: Optimize images, use lazy loading for below-fold content
5. **Accessibility**: Ensure keyboard navigation works, maintain color contrast
6. **White Space**: Don't be afraid of generous spacing for breathing room

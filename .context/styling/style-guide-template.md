# Style Guide

This document defines the styling approach, conventions, and best practices for the Techfolio project.

---

## Styling System Overview

Techfolio uses a **Material Design 3 (MD3)** theming system implemented via **CSS custom properties** and **Tailwind CSS** utility classes.

**Architecture:**
1. **CSS Custom Properties** (`src/index.css`) - Define color values as RGB tokens
2. **Tailwind Config** (`tailwind.config.js`) - Map CSS variables to Tailwind utility classes
3. **Components** - Use Tailwind utilities for styling

**Benefits:**
- Runtime theme switching without rebuilding
- Consistent color system across all components
- Light and dark mode support
- Alpha channel transparency support
- Accessibility-compliant contrast ratios

---

## Color System

### Material Design 3 Color Tokens

All colors are defined using Material Design 3's semantic color system.

**Color Token Categories:**

1. **Primary** - Main brand color, used for prominent UI elements
   - `primary` - Base color
   - `on-primary` - Text/icons on primary background
   - `primary-container` - Secondary primary surfaces
   - `on-primary-container` - Text on primary containers

2. **Secondary** - Supporting color, less prominent
   - `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`

3. **Tertiary** - Accent color for specific highlights
   - `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`

4. **Error** - Error states and destructive actions
   - `error`, `on-error`, `error-container`, `on-error-container`

5. **Surface** - Background colors for components
   - `surface` - Default component background
   - `surface-variant` - Alternative surface
   - `surface-dim`, `surface-bright` - Surface variations
   - `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest` - Elevation levels
   - `on-surface` - Text on surface
   - `on-surface-variant` - Secondary text on surface

6. **Background** - Page background
   - `background`, `on-background`

7. **Outline** - Borders and dividers
   - `outline`, `outline-variant`

8. **Utility Colors**
   - `shadow`, `scrim` - Visual effects
   - `inverse-surface`, `inverse-on-surface`, `inverse-primary` - Inverted colors

**Convenience Aliases:**
- `primary-foreground` = `on-primary`
- `secondary-foreground` = `on-secondary`
- `tertiary-foreground` = `on-tertiary`
- `foreground` = `on-background`

---

## Using Colors in Components

### Tailwind Utility Classes

**Background Colors:**
```javascript
className="bg-primary"
className="bg-surface"
className="bg-background"
className="bg-primary-container"
```

**Text Colors:**
```javascript
className="text-on-primary"
className="text-on-surface"
className="text-foreground"
```

**Border Colors:**
```javascript
className="border-outline"
className="border-outline-variant"
```

**Opacity/Alpha Channel:**
```javascript
className="bg-primary/80"       // 80% opacity
className="bg-on-primary/30"    // 30% opacity
className="hover:bg-primary/90" // 90% on hover
```

---

## Theme Definitions

### Light Theme

**Location:** `src/index.css` under `:root` selector

**Key Colors:**
```css
--md-sys-color-primary: 9 20 38;           /* Dark navy */
--md-sys-color-on-primary: 255 255 255;    /* White */
--md-sys-color-secondary: 81 96 114;       /* Slate blue */
--md-sys-color-background: 251 248 250;    /* Off-white */
--md-sys-color-surface: 251 248 250;       /* Off-white */
```

### Dark Theme

**Location:** `src/index.css` under `.dark` selector

**Key Colors:**
```css
--md-sys-color-primary: 129 164 230;       /* Light blue */
--md-sys-color-on-primary: 15 23 38;       /* Dark navy */
--md-sys-color-secondary: 147 185 216;     /* Light slate */
--md-sys-color-background: 16 20 27;       /* Near black */
--md-sys-color-surface: 20 24 32;          /* Dark slate */
```

**How Dark Mode Works:**
1. `ThemeToggle` component adds/removes `.dark` class on `<html>` element
2. CSS custom properties in `.dark` selector override `:root` values
3. All Tailwind utilities automatically use new color values

---

## Generating New Themes

### Material Theme Builder

**Tool:** https://material-foundation.github.io/material-theme-builder/

**Steps:**
1. Visit Material Theme Builder
2. Choose a seed color (your brand color)
3. Customize light and dark palettes if needed
4. Export as "CSS" format
5. Copy the CSS custom properties to `src/index.css`
6. Replace existing values in `:root` (light mode) and `.dark` (dark mode)

**Important:**
- Export format must be RGB values without `rgb()` wrapper (e.g., `9 20 38` not `rgb(9, 20, 38)`)
- This format is required for Tailwind's alpha channel support

---

## Typography

### Font Family

**Primary Font:** Poppins (Google Fonts)

**Import:** `src/index.css`
```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
```

**Weights Available:** 100, 200, 300, 400, 500, 600, 700, 800, 900

**Usage:**
- Tailwind automatically applies Poppins via `font-sans` (configured in default settings)
- No need to explicitly set font-family in most cases

### Custom Fonts

**Location:** `src/assets/brand/fonts/`

**To Add Custom Fonts:**
1. Place font files (`.ttf`, `.otf`, `.woff2`) in `src/assets/brand/fonts/`
2. Import in `src/index.css`:
   ```css
   @font-face {
     font-family: 'CustomFont';
     src: url('./assets/brand/fonts/CustomFont.woff2') format('woff2');
     font-weight: normal;
     font-style: normal;
   }
   ```
3. Update Tailwind config if needed:
   ```javascript
   theme: {
     extend: {
       fontFamily: {
         custom: ['CustomFont', 'sans-serif'],
       }
     }
   }
   ```
4. Use: `className="font-custom"`

### Text Sizes

Use Tailwind's text size utilities:
```javascript
className="text-xs"      // 0.75rem
className="text-sm"      // 0.875rem
className="text-base"    // 1rem (default)
className="text-lg"      // 1.125rem
className="text-xl"      // 1.25rem
className="text-2xl"     // 1.5rem
className="text-3xl"     // 1.875rem
className="text-4xl"     // 2.25rem
className="text-5xl"     // 3rem
```

**Example from `src/App.js`:**
```javascript
<h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-tertiary">
  {hero.name}
</h1>
```

### Font Weights

```javascript
className="font-thin"        // 100
className="font-extralight"  // 200
className="font-light"       // 300
className="font-normal"      // 400
className="font-medium"      // 500
className="font-semibold"    // 600
className="font-bold"        // 700
className="font-extrabold"   // 800
className="font-black"       // 900
```

---

## Spacing

### Margin and Padding

Use Tailwind's spacing scale (based on 0.25rem = 4px):

```javascript
className="p-4"    // padding: 1rem (16px)
className="px-4"   // horizontal padding
className="py-4"   // vertical padding
className="pt-4"   // padding-top
className="mb-5"   // margin-bottom: 1.25rem (20px)
className="gap-4"  // gap between flex/grid items
```

**Common Spacing Values:**
- `0` = 0px
- `1` = 0.25rem = 4px
- `2` = 0.5rem = 8px
- `3` = 0.75rem = 12px
- `4` = 1rem = 16px
- `5` = 1.25rem = 20px
- `6` = 1.5rem = 24px
- `8` = 2rem = 32px
- `10` = 2.5rem = 40px

---

## Layout

### Container

**Usage:**
```javascript
<section className="container mx-auto mb-5">
```

**Purpose:** 
- Centers content with max-width
- Adds responsive horizontal padding
- `mx-auto` centers the container

### Flexbox

```javascript
className="flex"                 // display: flex
className="flex-col"            // flex-direction: column
className="flex-row"            // flex-direction: row
className="items-center"        // align-items: center
className="justify-between"     // justify-content: space-between
className="gap-4"               // gap: 1rem
```

**Example from `src/components/NavBar.jsx`:**
```javascript
<div className="flex items-center justify-between px-4 py-3">
  {/* content */}
</div>
```

### Grid

```javascript
className="grid"
className="grid-cols-1"         // 1 column
className="md:grid-cols-2"      // 2 columns on md+ screens
className="gap-4"               // gap between grid items
```

**Example from `src/App.js`:**
```javascript
<section className="container mx-auto mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* 1 column on mobile, 2 on desktop */}
</section>
```

---

## Responsive Design

### Breakpoints

Tailwind uses a mobile-first approach:

- **Default** (no prefix): < 640px (mobile)
- **sm:** ≥ 640px
- **md:** ≥ 768px (tablet)
- **lg:** ≥ 1024px (desktop)
- **xl:** ≥ 1280px
- **2xl:** ≥ 1536px

### Responsive Patterns

**Hide on Mobile, Show on Desktop:**
```javascript
className="hidden md:flex"
```

**Show on Mobile, Hide on Desktop:**
```javascript
className="md:hidden"
```

**Responsive Text Size:**
```javascript
className="text-4xl sm:text-5xl"  // 4xl on mobile, 5xl on small+ screens
```

**Responsive Layout:**
```javascript
className="flex-col md:flex-row"  // Column on mobile, row on desktop
```

---

## Borders and Shadows

### Borders

```javascript
className="border"                // 1px border
className="border-2"             // 2px border
className="border-outline"       // Material Design outline color
className="border-t"             // top border only
className="rounded-lg"           // 0.5rem border radius
className="rounded-full"         // fully rounded (pills, circles)
className="rounded-2xl"          // 1rem border radius
```

### Shadows

```javascript
className="shadow"          // subtle shadow
className="shadow-lg"       // large shadow
className="shadow-inner"    // inset shadow
```

**Example from `src/App.js`:**
```javascript
<div className="bg-surface rounded-2xl shadow-lg border border-outline p-4">
  {/* Card with rounded corners, shadow, and border */}
</div>
```

---

## Hover and Transitions

### Hover States

```javascript
className="hover:bg-primary/80"        // Darken on hover
className="hover:bg-surface-container-high"  // Change surface on hover
```

### Transitions

```javascript
className="transition"                        // All properties
className="transition-colors"                 // Color transitions only
className="transition-colors duration-200"    // 200ms transition
```

**Example from `src/components/NavBar.jsx`:**
```javascript
<a
  className="transition-colors duration-200 font-medium text-base px-2 py-1 rounded font-semibold"
  href={`#${nav.id}`}
>
  {nav.title}
</a>
```

---

## Best Practices

### 1. Always Use Material Design Color Tokens

❌ **Avoid:**
```javascript
className="bg-blue-500 text-white"  // Arbitrary Tailwind colors
style={{ backgroundColor: '#1E40AF' }}  // Inline styles
```

✅ **Use:**
```javascript
className="bg-primary text-on-primary"  // Material Design tokens
```

### 2. Respect Color Pairings

Always pair base colors with their `on-*` counterparts for accessible contrast:

- `bg-primary` with `text-on-primary`
- `bg-surface` with `text-on-surface`
- `bg-background` with `text-on-background`

### 3. Use Responsive Utilities

Design mobile-first, then enhance for larger screens:

```javascript
className="flex-col md:flex-row"  // Mobile first, then desktop
className="text-xl md:text-2xl"   // Smaller on mobile
```

### 4. Maintain Consistent Spacing

Use Tailwind's spacing scale consistently:

```javascript
className="mb-5"    // ✅ Standard spacing
className="mb-[17px]"  // ❌ Arbitrary value
```

### 5. Leverage Component Variants

Use Material Design's surface levels for elevation:

```javascript
className="bg-surface-container-low"    // Slightly elevated
className="bg-surface-container"        // Default elevation
className="bg-surface-container-high"   // More elevated
```

---

## Animation

### Framer Motion

Techfolio includes Framer Motion for animations.

**Usage Example:**
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

### Tailwind Animations

Custom animations defined in `tailwind.config.js`:

```javascript
animation: {
  gradient: "gradient 6s ease infinite",
},
keyframes: {
  gradient: {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
},
```

**Usage:**
```javascript
className="animate-gradient"
```

---

## References

- **Material Design 3:** https://m3.material.io/
- **Material Theme Builder:** https://material-foundation.github.io/material-theme-builder/
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Live Examples:**
  - `src/index.css` - Color definitions
  - `tailwind.config.js` - Tailwind configuration
  - `src/components/NavBar.jsx` - Component styling examples
  - `src/App.js` - Layout and responsive design patterns

# Code Style Guide

This document defines the code style conventions used in the Techfolio project, inferred from the existing codebase.

---

## General Principles

1. **Consistency:** Follow existing patterns in the codebase
2. **Readability:** Prioritize clear, self-documenting code
3. **Simplicity:** Prefer straightforward solutions over clever tricks
4. **Functional:** Use functional programming patterns with React hooks

---

## File Organization

### File Naming
- **Components:** PascalCase with `.jsx` extension
  - Examples: `NavBar.jsx`, `ThemeToggle.jsx`, `About.jsx`
- **Constants:** camelCase with `.js` extension
  - Examples: `navigation.js`, `hero.js`, `experience.js`
- **Main Files:** camelCase with `.js` extension
  - Examples: `App.js`, `index.js`, `reportWebVitals.js`
- **Config Files:** kebab-case with appropriate extension
  - Examples: `tailwind.config.js`, `.prettierrc`

### Directory Structure
```
src/
├── components/          # UI components (.jsx)
├── constants/          # Data configuration (.js)
├── assets/            # Static files (images, fonts)
└── *.js               # Entry points and core files
```

---

## Import Organization

**Order:**
1. React and React-related imports
2. Third-party libraries
3. Local components
4. Local constants/utilities
5. Assets (images, fonts, etc.)

**Example from `src/App.js`:**
```javascript
import NavBar from './components/NavBar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Skills from './components/Skills';
import AnimatedBackground from './components/Background/AnimatedBackground';
import { BrowserRouter } from 'react-router-dom';
import hero from './constants/hero';
import personal from './assets/personal.jpg';
import { useState } from 'react';
```

**Conventions:**
- Group related imports together
- One import per line
- Use named imports from React (`useState`, `useEffect`, etc.)
- Default imports for components and constants

---

## React Component Style

### Functional Components
- **Always use functional components** with hooks
- No class components
- Export default at the end of the file

**Structure:**
```javascript
import React, { useState, useEffect } from 'react';

const ComponentName = () => {
  // 1. Hooks (useState, useEffect, useRef, etc.)
  const [state, setState] = useState(initialValue);
  
  // 2. Event handlers
  const handleEvent = () => {
    // handler logic
  };
  
  // 3. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

**Example from `src/components/ThemeToggle.jsx`:**
- Hooks first: `useState(getInitialTheme())`, `useRef(null)`
- Helper function: `getInitialTheme()` defined before component
- Multiple `useEffect` hooks for different concerns (theme application, system preference listener, click outside)
- Early returns in effects for cleanup

---

## State Management

### useState
- Descriptive state names: `active`, `menuOpen`, `copied`, `theme`, `open`
- Boolean states prefixed with verbs: `menuOpen`, not `menu`
- Use functional updates when new state depends on old state

**Example from `src/App.js`:**
```javascript
const [copied, setCopied] = useState(false);

const handleCopyEmail = () => {
  navigator.clipboard.writeText(hero.email).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};
```

### useEffect
- One effect per concern (separate effects for theme application, event listeners, etc.)
- Include cleanup functions for event listeners
- Specify dependencies accurately

**Example from `src/components/ThemeToggle.jsx`:**
```javascript
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  if (open) {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }
}, [open]);
```

---

## JSX Style

### Formatting
- Self-closing tags for components without children: `<ThemeToggle />`
- Multi-line props formatted for readability
- Conditional rendering via ternary or `&&` operator
- Use template literals for dynamic className values

**className Formatting:**
```javascript
<a
  href={`#${nav.id}`}
  className={`transition-colors duration-200 font-medium text-base px-2 py-1 rounded font-semibold 
    ${active === nav.id ? 'bg-primary-foreground text-tertiary' : 'text-on-primary'}
  `}
  onClick={() => setActive(nav.id)}
>
  {nav.title}
</a>
```

### Accessibility
- Always include `aria-label` on buttons without visible text
- Use semantic HTML (nav, section, main, footer)
- Include alt text on images
- Disable decorative buttons with `tabIndex={-1}` and `aria-disabled="true"`

**Example from `src/App.js`:**
```javascript
<a
  href="/resume.pdf"
  download
  className="hire bg-primary text-on-primary px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/80 transition"
  aria-label="Download Resume PDF"
>
  Resume
  {/* ... */}
</a>
```

---

## Styling Conventions

### Tailwind CSS
- Use Material Design 3 color tokens: `bg-primary`, `text-on-surface`, `border-outline`
- Use Tailwind utilities for spacing, layout, typography
- Responsive design with breakpoints: `md:flex-row`, `hidden md:flex`
- Transitions via Tailwind: `transition-colors duration-200`

**Common Patterns:**
- Hover states: `hover:bg-primary/80`
- Dark mode support: `dark:bg-surface` (handled via theme class on root)
- Flex layouts: `flex items-center gap-4`
- Responsive grids: `grid grid-cols-1 md:grid-cols-2`

### Color Usage
- **Never use arbitrary color values** (no `#hex` or `rgb()` in className)
- Always use Material Design 3 tokens mapped in `tailwind.config.js`
- Use alpha channel syntax: `bg-on-primary/30` for 30% opacity

---

## Constants and Data

### Export Style
- Use `export default` for single export files
- Name constant after file purpose

**Example from `src/constants/navigation.js`:**
```javascript
import About from '../components/About';
import Contact from '../components/Contact';
// ... more imports

const navlinks = [
  {
    id: 'about',
    title: 'About',
    component: About,
  },
  // ... more links
];

export default navlinks;
```

### Data Structure
- Use arrays of objects for lists
- Descriptive property names: `id`, `title`, `component`
- Keep data flat and simple

---

## Comments

### When to Comment
- Explain **why**, not **what**
- Mark visual sections in JSX with comments
- Document non-obvious behavior or workarounds

**Example from `src/App.js`:**
```javascript
{/* Hero Card - split left/right, profile image, buttons, online status */}
<section id="info" className="container mx-auto mb-5">
  {/* ... */}
</section>

{/* Left */}
<div className="flex-1 flex flex-col justify-center p-8 md:p-10">
  {/* ... */}
</div>

{/* Right */}
<div className="flex flex-col items-center justify-center p-8 md:p-10 gap-4">
  {/* ... */}
</div>
```

### Comment Style
- Use `//` for single-line JavaScript comments
- Use `{/* */}` for JSX comments
- Keep comments concise and descriptive

---

## Formatting (Prettier)

From `.prettierrc`:
```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

**Rules:**
- **Quotes:** Single quotes for strings
- **Semicolons:** Always required
- **Indentation:** 2 spaces (no tabs)
- **Trailing Commas:** ES5 style (objects, arrays, but not function params)
- **Line Length:** Prettier default (80 characters, soft limit)

---

## Anti-Patterns to Avoid

1. ❌ **Class components** - Use functional components
2. ❌ **Inline styles** - Use Tailwind utilities
3. ❌ **Magic numbers/strings** - Extract to constants
4. ❌ **Nested ternaries** - Use early returns or helper functions
5. ❌ **Missing keys in lists** - Always use unique `key` prop in `.map()`
6. ❌ **Mutating state directly** - Always use setter functions

---

## References

- **Live Examples:**
  - `src/App.js` - Main app structure
  - `src/components/NavBar.jsx` - Component with state and conditional rendering
  - `src/components/ThemeToggle.jsx` - Complex hooks usage
  - `src/constants/navigation.js` - Data structure pattern

# Architectural Patterns

This document identifies and describes recurring architectural patterns in the Techfolio project.

---

## Pattern 1: Constants-Driven Content Architecture

**Intent:** Separate data from presentation logic to enable easy content customization without modifying component code.

**Structure:**
```
src/
├── constants/          # Data definitions
│   ├── hero.js
│   ├── experience.js
│   ├── projects.js
│   ├── technology.js
│   ├── socials.js
│   └── navigation.js
└── components/         # Presentation logic
    ├── About.jsx
    ├── Experience.jsx
    ├── Projects.jsx
    └── ...
```

**Implementation:**

**Data Definition (src/constants/navigation.js):**
```javascript
import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

const navlinks = [
  {
    id: 'about',
    title: 'About',
    component: About,
  },
  {
    id: 'experience',
    title: 'Experience',
    component: Experience,
  },
  // ...more
];

export default navlinks;
```

**Consumption (src/components/NavBar.jsx):**
```javascript
import navlinks from '../constants/navigation';

const NavBar = () => {
  return (
    <nav>
      <ul>
        {navlinks.map((nav) => (
          <li key={nav.id}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

**Benefits:**
- Non-technical users can update content without touching component code
- Single source of truth for all content data
- Easy to migrate to CMS or external data source later
- Testable data structures

**When to Use:**
- Content-driven applications (portfolios, marketing sites, blogs)
- Multi-tenant apps with varying content
- Applications requiring frequent content updates

**Files:**
- `src/constants/*.js` - All data files
- `src/components/*.jsx` - Components consuming data

---

## Pattern 2: Material Design 3 Theme System via CSS Custom Properties

**Intent:** Implement a comprehensive, themeable design system that supports light/dark modes and allows runtime theme switching without rebuilding the application.

**Structure:**

**1. Define CSS Custom Properties (src/index.css):**
```css
:root {
  --md-sys-color-primary: 9 20 38;
  --md-sys-color-on-primary: 255 255 255;
  --md-sys-color-secondary: 81 96 114;
  --md-sys-color-background: 251 248 250;
  /* ...more tokens */
}

.dark {
  --md-sys-color-primary: 129 164 230;
  --md-sys-color-on-primary: 15 23 38;
  --md-sys-color-secondary: 147 185 216;
  --md-sys-color-background: 16 20 27;
  /* ...more tokens */
}
```

**2. Map to Tailwind Utilities (tailwind.config.js):**
```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--md-sys-color-primary) / <alpha-value>)',
          container: 'rgb(var(--md-sys-color-primary-container) / <alpha-value>)',
        },
        'on-primary': 'rgb(var(--md-sys-color-on-primary) / <alpha-value>)',
        background: 'rgb(var(--md-sys-color-background) / <alpha-value>)',
        // ...more mappings
      }
    }
  }
};
```

**3. Theme Switching Logic (src/components/ThemeToggle.jsx):**
```javascript
useEffect(() => {
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  } else {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}, [theme]);
```

**4. Usage in Components:**
```javascript
<nav className="bg-primary text-on-primary">
  <button className="bg-surface border-outline hover:bg-surface-container-high">
    {/* ... */}
  </button>
</nav>
```

**Benefits:**
- Consistent color usage across entire application
- Runtime theme switching without rebuilds
- Automatic alpha channel support (`bg-primary/80` for 80% opacity)
- Easy to generate new themes with Material Theme Builder
- Accessibility-compliant contrast ratios

**Files:**
- `src/index.css` - CSS custom property definitions
- `tailwind.config.js` - Tailwind color mappings
- `src/components/ThemeToggle.jsx` - Theme switching logic

---

## Pattern 3: Compound Component with Responsive Breakpoints

**Intent:** Create components that adapt layout and behavior based on screen size, providing optimal UX on all devices.

**Implementation (src/components/NavBar.jsx):**
```javascript
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary w-full fixed top-0 left-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and branding */}
        <div className="flex items-center gap-3">
          <a href="#info">
            <img src={logo} alt="logo" className="h-10" />
          </a>
        </div>

        {/* Desktop + Mobile controls */}
        <div className="flex items-center gap-4">
          {/* Desktop navigation - hidden on mobile */}
          <ul className="hidden md:flex gap-8">
            {navlinks.map((nav) => (
              <li key={nav.id}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile menu button - hidden on desktop */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile menu - only shown when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden bg-primary border-t">
          <ul className="flex flex-col gap-3">
            {navlinks.map((nav) => (
              <li key={nav.id}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
```

**Key Breakpoint Classes:**
- `hidden md:flex` - Hidden on mobile, flex on desktop
- `md:hidden` - Visible on mobile, hidden on desktop
- `flex-col md:flex-row` - Vertical stack on mobile, horizontal on desktop

**Benefits:**
- Single component handles all screen sizes
- No need for separate mobile/desktop components
- Tailwind's mobile-first approach ensures mobile optimization
- Smooth transitions between breakpoints

**When to Use:**
- Navigation bars that collapse on mobile
- Grid layouts that reflow (e.g., `grid-cols-1 md:grid-cols-2`)
- Components with different visual structures on mobile vs. desktop

**Files:**
- `src/components/NavBar.jsx` - Responsive navigation
- `src/App.js` - Responsive grid layouts (2-column cards on desktop, stacked on mobile)

---

## Pattern 4: Custom Hook Pattern (Potential)

**Current State:** Not yet implemented, but ThemeToggle logic is a good candidate for extraction.

**Opportunity:** Extract theme management logic from ThemeToggle into a reusable hook.

**Proposed Implementation:**
```javascript
// src/hooks/useTheme.js
export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.removeItem('theme');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return { theme, setTheme };
};

// Usage in ThemeToggle.jsx
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  // ...rest of component
};
```

**Benefits:**
- Reusable theme logic across multiple components
- Easier to test theme behavior in isolation
- Cleaner component code

**Recommendation:**
Consider extracting custom hooks when:
- Logic is reused across 2+ components
- Component logic exceeds ~100 lines
- State + effects form a cohesive unit of functionality

---

## Pattern 5: Section-Based Layout with ID-Based Navigation

**Intent:** Organize single-page app into distinct sections with hash-based navigation for direct linking.

**Implementation (src/App.js):**
```javascript
<main className="pt-24 pb-10 flex-1 relative z-10">
  <section id="info" className="container mx-auto mb-5">
    {/* Hero content */}
  </section>

  <section className="container mx-auto mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div id="experience">
      <Experience />
    </div>
    <div id="about">
      <About />
    </div>
  </section>

  <section id="projects" className="container mx-auto mb-5">
    <Projects />
  </section>

  <section id="skills" className="container mx-auto mb-5">
    <Skills />
  </section>

  <section id="contact" className="container mx-auto mb-5">
    <Contact />
  </section>
</main>
```

**Navigation Links (src/constants/navigation.js):**
```javascript
const navlinks = [
  { id: 'about', title: 'About', component: About },
  { id: 'experience', title: 'Experience', component: Experience },
  { id: 'projects', title: 'Projects', component: Projects },
  { id: 'skills', title: 'Skills', component: Skills },
  { id: 'contact', title: 'Contact', component: Contact },
];
```

**NavBar Active State Tracking:**
```javascript
const [active, setActive] = useState('info');

<a
  href={`#${nav.id}`}
  className={active === nav.id ? 'bg-primary-foreground text-tertiary' : 'text-on-primary'}
  onClick={() => setActive(nav.id)}
>
  {nav.title}
</a>
```

**Benefits:**
- Direct linking to sections (e.g., `yoursite.com/#projects`)
- Browser back/forward navigation works
- Active section highlighting
- Simple, no routing library needed for simple SPAs

**When to Use:**
- Single-page portfolios, landing pages
- Apps with few distinct "pages"
- When full routing (React Router) is overkill

**Files:**
- `src/App.js` - Section layout
- `src/constants/navigation.js` - Section ID mapping
- `src/components/NavBar.jsx` - Active state tracking

---

## Anti-Patterns to Avoid

1. ❌ **Prop Drilling Through Multiple Levels**
   - Current: Theme state not passed as props, uses DOM class manipulation
   - If props need to go 3+ levels deep, consider Context API or state management library

2. ❌ **Mixing Data and Presentation**
   - Current: Data in `constants/`, presentation in `components/`
   - Avoid hardcoding content arrays directly in component files

3. ❌ **Inline Styles for Theming**
   - Current: All styling via Tailwind classes and CSS variables
   - Avoid `style={{ color: '#123456' }}` which bypasses theme system

---

## References

- **Live Examples:**
  - `src/constants/navigation.js` - Constants-driven pattern
  - `src/index.css` + `tailwind.config.js` - Material Design 3 theme system
  - `src/components/NavBar.jsx` - Responsive compound component
  - `src/App.js` - Section-based layout

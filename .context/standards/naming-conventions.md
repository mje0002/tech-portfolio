# Naming Conventions

This document defines naming conventions used throughout the Techfolio codebase, with real examples from the project.

---

## Files and Directories

### Components
**Convention:** PascalCase with `.jsx` extension

**Examples:**
- `src/components/NavBar.jsx`
- `src/components/ThemeToggle.jsx`
- `src/components/About.jsx`
- `src/components/Contact.jsx`
- `src/components/Experience.jsx`
- `src/components/Footer.jsx`
- `src/components/Projects.jsx`
- `src/components/Skills.jsx`

**Subdirectories:** PascalCase for component folders
- `src/components/Background/AnimatedBackground.jsx`

### Constants
**Convention:** camelCase with `.js` extension

**Examples:**
- `src/constants/navigation.js`
- `src/constants/hero.js`
- `src/constants/experience.js`
- `src/constants/projects.js`
- `src/constants/socials.js`
- `src/constants/technology.js`
- `src/constants/services.js`
- `src/constants/summary.js`
- `src/constants/index.js`

### Entry Points and Utilities
**Convention:** camelCase with `.js` extension

**Examples:**
- `src/App.js`
- `src/index.js`
- `src/reportWebVitals.js`
- `src/setupTests.js`

### Test Files
**Convention:** Component name + `.test.js`

**Examples:**
- `src/App.test.js`

### Assets
**Convention:** kebab-case or descriptive names

**Directories:**
- `src/assets/logo/svg/`
- `src/assets/logo/png/`
- `src/assets/logo/pdf/`
- `src/assets/brand/fonts/`

**Files:**
- `src/assets/personal.jpg`
- `src/assets/logo/svg/logo-no-background.svg`

### Configuration Files
**Convention:** kebab-case with appropriate extension

**Examples:**
- `tailwind.config.js`
- `.prettierrc`
- `.prettierignore`
- `.gitignore`

---

## JavaScript Variables and Constants

### Component Names
**Convention:** PascalCase (matches file name)

**Examples:**
```javascript
const NavBar = () => { /* ... */ };
const ThemeToggle = () => { /* ... */ };
const AnimatedBackground = () => { /* ... */ };
```

### State Variables
**Convention:** camelCase, descriptive nouns

**Examples from `src/components/NavBar.jsx`:**
```javascript
const [active, setActive] = useState('info');
const [menuOpen, setMenuOpen] = useState(false);
```

**Examples from `src/App.js`:**
```javascript
const [copied, setCopied] = useState(false);
```

**Examples from `src/components/ThemeToggle.jsx`:**
```javascript
const [theme, setTheme] = useState(getInitialTheme());
const [open, setOpen] = useState(false);
```

**Boolean State Naming:**
- Descriptive adjectives: `copied`, `open`
- Past tense or present state: `menuOpen` (not `isMenuOpen`)

### Event Handlers
**Convention:** `handle` + `Event` in camelCase

**Examples from `src/App.js`:**
```javascript
const handleCopyEmail = () => { /* ... */ };
```

**Examples from `src/components/ThemeToggle.jsx`:**
```javascript
const handleClickOutside = (event) => { /* ... */ };
```

**Pattern:**
- Prefix with `handle`: `handleClick`, `handleSubmit`, `handleChange`
- Suffix describes the event: `handleCopyEmail`, `handleClickOutside`

### Constants (Data)
**Convention:** camelCase for exported constants

**Examples from `src/constants/navigation.js`:**
```javascript
const navlinks = [ /* ... */ ];
export default navlinks;
```

**Examples from imports:**
```javascript
import hero from './constants/hero';
import navlinks from './constants/navigation';
import personal from './assets/personal.jpg';
```

### Refs
**Convention:** camelCase with `Ref` suffix

**Example from `src/components/ThemeToggle.jsx`:**
```javascript
const menuRef = useRef(null);
```

### Helper Functions
**Convention:** camelCase, verb-based names

**Example from `src/components/ThemeToggle.jsx`:**
```javascript
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};
```

**Pattern:**
- Start with verb: `get`, `set`, `update`, `handle`, `render`, `calculate`, `validate`

---

## Component Props

### Prop Naming
**Convention:** camelCase

**Common Props:**
- `className` (standard React prop)
- `onClick`, `onChange`, `onSubmit` (event handlers)
- `aria-label`, `aria-disabled` (accessibility attributes)

**Custom Props:**
- Descriptive nouns: `title`, `description`, `image`, `url`
- Boolean props: `open`, `active`, `disabled`

---

## CSS and Styling

### CSS Custom Properties
**Convention:** `--md-sys-color-` + kebab-case (Material Design 3 convention)

**Examples from `src/index.css`:**
```css
--md-sys-color-primary: 9 20 38;
--md-sys-color-on-primary: 255 255 255;
--md-sys-color-secondary: 81 96 114;
--md-sys-color-background: 251 248 250;
--md-sys-color-surface-container-lowest: 255 255 255;
```

**Pattern:**
- Base color: `--md-sys-color-primary`
- On color (text/icon on base): `--md-sys-color-on-primary`
- Container variant: `--md-sys-color-primary-container`
- Container text: `--md-sys-color-on-primary-container`

### Tailwind Color Classes
**Convention:** Material Design 3 token names (kebab-case)

**Examples from `tailwind.config.js` and usage:**
```javascript
// Tailwind config
primary: {
  DEFAULT: 'rgb(var(--md-sys-color-primary) / <alpha-value>)',
  container: 'rgb(var(--md-sys-color-primary-container) / <alpha-value>)',
}

// Usage in components
className="bg-primary text-on-primary"
className="bg-surface border-outline"
className="text-on-surface-variant"
className="bg-primary-foreground text-tertiary"
```

**Common Classes:**
- Colors: `primary`, `secondary`, `tertiary`, `error`
- Surfaces: `surface`, `surface-variant`, `background`
- Text: `on-primary`, `on-surface`, `on-background`
- Borders: `outline`, `outline-variant`

---

## Data Objects

### Object Properties
**Convention:** camelCase

**Example from `src/constants/navigation.js`:**
```javascript
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
];
```

**Common Properties:**
- Identifiers: `id`, `name`, `key`
- Display: `title`, `label`, `description`, `text`
- References: `component`, `icon`, `image`, `url`
- Data: `tags`, `items`, `content`

### Array Names
**Convention:** Plural camelCase

**Examples:**
- `navlinks` (from `src/constants/navigation.js`)
- Expected: `projects`, `experiences`, `technologies`, `socials`

**Pattern:**
- Plural form of the entity: `users`, `posts`, `comments`
- Or descriptive collection name: `navlinks`, `menuItems`

---

## IDs and Keys

### HTML IDs
**Convention:** kebab-case

**Examples from `src/App.js`:**
```javascript
<section id="info" className="container mx-auto mb-5">
<section id="about" className="container mx-auto mb-5">
<section id="experience" className="container mx-auto mb-5">
```

**Pattern from `src/constants/navigation.js`:**
```javascript
{ id: 'about', title: 'About' }
{ id: 'experience', title: 'Experience' }
{ id: 'projects', title: 'Projects' }
{ id: 'skills', title: 'Skills' }
{ id: 'contact', title: 'Contact' }
```

### React Keys
**Convention:** Use stable, unique identifiers

**Example from `src/components/NavBar.jsx`:**
```javascript
{navlinks.map((nav) => (
  <li key={nav.id}>
    <a href={`#${nav.id}`}>
      {nav.title}
    </a>
  </li>
))}
```

**Best Practices:**
- Use unique `id` property when available
- Avoid using array index as key (unless list is static and never reordered)

---

## URL and Route Naming

### Hash Routes
**Convention:** `#` + kebab-case

**Examples:**
- `#info` - Hero/info section
- `#about` - About section
- `#experience` - Experience section
- `#projects` - Projects section
- `#skills` - Skills section
- `#contact` - Contact section

**Pattern:**
```javascript
<a href={`#${nav.id}`}>
```

---

## Package and Module Naming

### NPM Package Name
**Convention:** kebab-case (package.json standard)

**Example:**
```json
{
  "name": "techfolio"
}
```

---

## Summary Table

| Type | Convention | Example |
|------|-----------|---------|
| Component File | PascalCase.jsx | `NavBar.jsx`, `ThemeToggle.jsx` |
| Constants File | camelCase.js | `navigation.js`, `hero.js` |
| Component Name | PascalCase | `const NavBar = () => {}` |
| State Variable | camelCase | `const [active, setActive] = useState()` |
| Event Handler | handleEvent | `const handleCopyEmail = () => {}` |
| Ref | camelCaseRef | `const menuRef = useRef()` |
| Helper Function | verbCamelCase | `const getInitialTheme = () => {}` |
| CSS Custom Prop | --md-sys-color-kebab | `--md-sys-color-primary` |
| Tailwind Class | kebab-case | `bg-primary`, `text-on-surface` |
| HTML ID | kebab-case | `id="about"`, `id="experience"` |
| Object Property | camelCase | `{ id: 'about', title: 'About' }` |
| Array Variable | pluralCamelCase | `const navlinks = []` |

---

## References

- **Live Examples:**
  - `src/components/NavBar.jsx` - Component and state naming
  - `src/components/ThemeToggle.jsx` - Event handlers, refs, helper functions
  - `src/constants/navigation.js` - Data object structure
  - `src/index.css` - CSS custom properties
  - `tailwind.config.js` - Tailwind color class mapping

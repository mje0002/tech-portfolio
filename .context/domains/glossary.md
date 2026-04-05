# Project Glossary

This document defines key terms, concepts, and domain-specific language used in the Techfolio project.

---

## General Terms

### Portfolio
A website showcasing a developer's professional work, skills, and experience. Techfolio is a customizable portfolio template.

### Single Page Application (SPA)
A web application that loads a single HTML page and dynamically updates content without full page reloads. Techfolio is an SPA using React.

### Component
A reusable, self-contained piece of UI in React. Components can be functional or class-based (Techfolio uses functional components exclusively).

### Section
A distinct area of the portfolio page with its own content and purpose (e.g., About, Projects, Experience).

---

## React & JavaScript Terms

### Functional Component
A React component defined as a JavaScript function that returns JSX. Modern React best practice.

**Example:**
```javascript
const NavBar = () => {
  return <nav>...</nav>;
};
```

### Hook
A special function in React that lets you "hook into" React features like state and lifecycle. Examples: `useState`, `useEffect`, `useRef`.

### State
Data that can change over time in a component. Managed with `useState` hook.

**Example:** Theme preference (light/dark), menu open/closed state.

### Effect
A side effect in React managed with `useEffect` hook. Examples: event listeners, localStorage updates, theme application.

### Ref
A reference to a DOM element or mutable value that persists across renders. Created with `useRef` hook.

**Example:** Reference to theme menu for click-outside detection.

### Props
Properties passed from parent to child components to customize behavior or display.

---

## Styling & Design Terms

### Material Design 3 (MD3)
Google's design system focusing on personalization, dynamic color, and accessibility. Also called "Material You."

### Design Token
A named value representing a design decision (color, spacing, typography). In Techfolio, tokens are CSS custom properties.

**Example:** `--md-sys-color-primary`, `--md-sys-color-on-surface`

### CSS Custom Property
A CSS variable defined with `--` prefix. Can be accessed via `var()` function and changed at runtime.

**Example:**
```css
:root {
  --md-sys-color-primary: 9 20 38;
}
.dark {
  --md-sys-color-primary: 188 199 222;
}
```

### Tailwind CSS
A utility-first CSS framework providing pre-built classes for styling. Techfolio extends Tailwind with Material Design 3 colors.

### Utility Class
A single-purpose CSS class (e.g., `flex`, `bg-primary`, `text-lg`). Tailwind is built on utility classes.

### Dark Mode
A color scheme using dark backgrounds and light text, easier on eyes in low-light environments. Techfolio supports light, dark, and system-based themes.

### System Theme
Automatic theme selection based on the user's operating system preference (`prefers-color-scheme` media query).

### Alpha Channel / Opacity
Transparency level of a color. Tailwind syntax: `bg-primary/80` for 80% opacity.

---

## Component-Specific Terms

### NavBar (Navigation Bar)
The top navigation component with logo, navigation links, theme toggle, and mobile menu.

### Hero Section
The introductory section at the top of the page with name, title, profile photo, and call-to-action buttons.

### ThemeToggle
A dropdown component for switching between light, dark, and system themes.

### Mobile Menu
A collapsible navigation menu for mobile devices, toggled by a hamburger icon.

### Hamburger Icon
A three-line icon (☰) used to represent a collapsible menu on mobile.

---

## Data & Architecture Terms

### Constants
Static data files in `src/constants/` directory containing content like projects, experience, navigation structure.

### Entity
A data structure representing a domain concept (e.g., Hero, Project, Experience).

### Hash-Based Navigation
Navigation using URL hash fragments (e.g., `#about`, `#projects`) to link to page sections without full page reloads.

### Section ID
A unique identifier for each page section, used for hash-based navigation.

**Example:** `<section id="projects">` accessed via `#projects`

---

## Development Terms

### Create React App (CRA)
A zero-configuration React development environment. Techfolio is built with CRA (react-scripts).

### React Scripts
The build tool and dev server provided by Create React App.

### Hot Module Replacement (HMR)
Automatic page updates when code changes during development without full page reload.

### Build
The process of optimizing and bundling code for production. Creates static files in `build/` directory.

### Deployment
Publishing the built application to a web server. Techfolio deploys to GitHub Pages.

---

## GitHub Pages Terms

### GitHub Pages
Free static site hosting provided by GitHub for repositories.

### gh-pages Branch
A dedicated git branch containing the built static files for GitHub Pages deployment.

### gh-pages Package
npm package that simplifies deploying to GitHub Pages by pushing build folder to gh-pages branch.

---

## Testing Terms

### Unit Test
A test that verifies a single component or function works correctly in isolation.

### Integration Test
A test that verifies multiple components or systems work together correctly.

### React Testing Library
A testing library for React that encourages testing from the user's perspective.

### Jest
A JavaScript testing framework used for running unit and integration tests.

### Test Fixture
Sample data used in tests (e.g., mock hero data, navigation data).

---

## Performance Terms

### Bundle Size
The total size of JavaScript files sent to the browser. Smaller bundles load faster.

### Code Splitting
Breaking code into smaller chunks that load on demand, reducing initial bundle size.

### Tree Shaking
Removing unused code from the final bundle during the build process.

---

## Accessibility (a11y) Terms

### aria-label
An HTML attribute providing accessible labels for screen readers when visible text isn't sufficient.

**Example:** `<button aria-label="Toggle menu">` for hamburger icon.

### Semantic HTML
Using HTML elements for their intended purpose (e.g., `<nav>`, `<section>`, `<button>`) for better accessibility.

### Screen Reader
Assistive technology that reads web content aloud for visually impaired users.

### Keyboard Navigation
Ability to navigate and interact with the site using only a keyboard (Tab, Enter, Arrow keys).

---

## Browser API Terms

### localStorage
Browser API for storing key-value pairs persistently across sessions. Techfolio uses it for theme preference.

### Clipboard API
Browser API for programmatically copying text to the clipboard. Used for email copy functionality.

**Example:** `navigator.clipboard.writeText()`

### matchMedia
Browser API for checking media query matches. Used for detecting system theme preference.

**Example:** `window.matchMedia('(prefers-color-scheme: dark)')`

---

## Version Control Terms

### Commit
A snapshot of code changes in git with a descriptive message.

### Branch
A separate line of development in git. Main branch is typically `main` or `master`.

### Pull Request (PR)
A request to merge code changes from one branch into another, often used for code review.

### Merge
Combining changes from one branch into another.

---

## Configuration Terms

### package.json
npm configuration file listing dependencies, scripts, and project metadata.

### .prettierrc
Prettier configuration file defining code formatting rules.

### tailwind.config.js
Tailwind CSS configuration file for customizing theme and extending utility classes.

### .gitignore
File listing files and directories that git should ignore (e.g., `node_modules/`, `build/`).

---

## Acronyms & Abbreviations

- **SPA**: Single Page Application
- **JSX**: JavaScript XML (React's syntax for writing HTML-like code in JavaScript)
- **CRA**: Create React App
- **MD3**: Material Design 3
- **CSS**: Cascading Style Sheets
- **HTML**: HyperText Markup Language
- **API**: Application Programming Interface
- **URL**: Uniform Resource Locator
- **CLI**: Command Line Interface
- **npm**: Node Package Manager
- **NVM**: Node Version Manager
- **UI**: User Interface
- **UX**: User Experience
- **a11y**: Accessibility (11 letters between 'a' and 'y')
- **i18n**: Internationalization (18 letters between 'i' and 'n')
- **SSR**: Server-Side Rendering
- **HMR**: Hot Module Replacement

---

## Techfolio-Specific Terms

### TL;DR (Too Long; Didn't Read)
In Techfolio context: a brief professional summary in the hero section (property: `tdlr` in hero.js).

### Hero
Not just a section, but the personal branding entity containing name, title, email, and TL;DR.

### Navlinks
The array of navigation items defined in `src/constants/navigation.js`.

### Material Theme Builder
Google's web tool for generating Material Design 3 color schemes from a seed color: https://material-foundation.github.io/material-theme-builder/

---

## Color System Terms

### Primary Color
The main brand color used for prominent UI elements (buttons, active states).

### Secondary Color
Supporting color used for less prominent UI elements.

### Tertiary Color
Accent color for highlighting specific content.

### On-Primary / On-Secondary / On-Tertiary
Text and icon colors that appear on top of primary/secondary/tertiary backgrounds (ensures contrast).

### Surface
Background color for UI components (cards, menus).

### Background
Page background color.

### Outline
Border and divider color.

### Error
Color for error states and destructive actions.

---

## Development Environment Terms

### Node.js
JavaScript runtime for running JavaScript outside the browser. Required for building Techfolio.

### npm
Package manager for installing JavaScript dependencies.

### Development Server
Local web server (`npm run start`) that serves the app during development with hot reloading.

### Production Build
Optimized, minified version of the app created with `npm run build` for deployment.

---

## References

- Material Design 3: https://m3.material.io/
- React Documentation: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- GitHub Pages: https://pages.github.com/

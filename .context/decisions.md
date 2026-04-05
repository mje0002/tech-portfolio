# Architecture Decision Records

This file tracks significant architectural and technical decisions made in the Techfolio project.

---

## ADR-001: React 19 with Functional Components and Hooks

**Status:** Accepted  
**Date:** Initial project setup  
**Deciders:** Development team  

### Context

Need to build a modern, performant portfolio website with component-based architecture and state management.

### Decision

Use React 19.0.0 with functional components and React Hooks exclusively. No class components.

### Rationale

1. **Modern React Best Practices:** React 19 is the latest stable version with improved performance and concurrent rendering
2. **Hooks Simplicity:** Hooks (useState, useEffect, useRef) provide cleaner, more readable code than class components
3. **Ecosystem Compatibility:** All modern React libraries and tooling support hooks
4. **Developer Experience:** Functional components with hooks are easier to test and reason about

### Consequences

- All components use functional syntax with hooks
- State management via useState, effects via useEffect
- Ref handling via useRef (e.g., ThemeToggle menu)
- No need for class lifecycle methods or this binding

**Examples:**
- `src/App.js` - useState for email copy status
- `src/components/ThemeToggle.jsx` - useState, useEffect, useRef for theme management
- `src/components/NavBar.jsx` - useState for active nav and mobile menu state

---

## ADR-002: Material Design 3 with Tailwind CSS

**Status:** Accepted  
**Date:** Initial project setup  
**Deciders:** Development team  

### Context

Need a consistent, professional theming system that supports light/dark modes and is customizable.

### Decision

Implement Material Design 3 (Material You) color system via CSS custom properties, integrated with Tailwind CSS utility classes.

### Rationale

1. **Design Consistency:** Material Design 3 provides a comprehensive, professional design language
2. **Theme Flexibility:** CSS custom properties allow runtime theme switching without rebuilding
3. **Tailwind Integration:** Map MD3 color tokens to Tailwind classes for utility-first development
4. **Accessibility:** MD3 ensures proper color contrast ratios and accessibility standards
5. **Tooling:** Material Theme Builder generates complete color schemes from a seed color

### Consequences

- All colors defined as CSS custom properties in `src/index.css`
- Tailwind config (`tailwind.config.js`) maps MD3 tokens to Tailwind utilities
- Use Tailwind classes like `bg-primary`, `text-on-surface`, `border-outline`
- Theme changes update CSS variables, automatically applying across all components
- Light/dark themes use separate variable sets in `:root` and `.dark` selectors

**Implementation:**
- `src/index.css` - MD3 color token definitions
- `tailwind.config.js` - RGB color mappings with alpha channel support
- `src/components/ThemeToggle.jsx` - Runtime theme switching logic

---

## ADR-003: Constants-Driven Content Architecture

**Status:** Accepted  
**Date:** Initial project setup  
**Deciders:** Development team  

### Context

Portfolio content (projects, experience, skills, etc.) needs to be easily customizable without editing component code.

### Decision

Centralize all content data in `src/constants/` directory as JavaScript modules. Components import and render this data.

### Rationale

1. **Separation of Concerns:** Keep data separate from presentation logic
2. **Easy Customization:** Non-developers can update content by editing simple JS objects
3. **Type Safety Potential:** Can add JSDoc or migrate to TypeScript easily
4. **DRY Principle:** Single source of truth for all content data
5. **Maintainability:** Changing content doesn't require touching component logic

### Consequences

- All content in `src/constants/` files:
  - `hero.js` - Name, title, TL;DR, email
  - `experience.js` - Work history
  - `projects.js` - Portfolio projects
  - `technology.js` - Tech stack
  - `socials.js` - Social media links
  - `navigation.js` - Nav links with component references
- Components are pure presentation, receiving data via props or imports
- Content updates require no component changes

**Examples:**
- `src/constants/hero.js` imported in `src/App.js` and `src/components/NavBar.jsx`
- `src/constants/navigation.js` maps section IDs to component references

---

## ADR-004: GitHub Pages Deployment Strategy

**Status:** Accepted  
**Date:** Initial project setup  
**Deciders:** Development team  

### Context

Need a simple, cost-effective deployment solution for a static portfolio website.

### Decision

Deploy to GitHub Pages using the `gh-pages` npm package with a dedicated `gh-pages` branch.

### Rationale

1. **Zero Cost:** GitHub Pages is free for public repositories
2. **Simple Workflow:** Single command deployment (`npm run deploy`)
3. **Version Control:** Deployment history tracked in git
4. **Custom Domain Support:** Can use custom domains if needed
5. **HTTPS by Default:** GitHub Pages provides SSL certificates

### Consequences

- Build process creates optimized static files in `build/` directory
- `gh-pages` package pushes build to `gh-pages` branch
- Deployment includes versioned commit messages
- `homepage` field in `package.json` must match GitHub Pages URL
- Legacy peer dependencies flag required for npm install

**Deployment Command:**
```bash
npm run deploy -- -m "Deploy React app to GitHub Pages vX.X.X"
```

---

## ADR-005: ESLint + Prettier Integration

**Status:** Accepted  
**Date:** Initial project setup  
**Deciders:** Development team  

### Context

Need consistent code formatting and linting across the codebase, especially for team collaboration.

### Decision

Use ESLint for code quality and Prettier for code formatting, integrated via `eslint-plugin-prettier` and `eslint-config-prettier`.

### Rationale

1. **Consistency:** Automated formatting eliminates style debates
2. **Quality:** ESLint catches common React mistakes and anti-patterns
3. **Integration:** `plugin:prettier/recommended` makes ESLint and Prettier work together seamlessly
4. **Editor Support:** Works with all major editors (VS Code, WebStorm, Vim, etc.)

### Consequences

- Prettier config in `.prettierrc`: single quotes, semicolons, 2-space tabs, ES5 trailing commas
- ESLint config in `package.json`: extends react-app, react-app/jest, plugin:prettier/recommended
- Code must pass both linting and formatting checks
- Formatting happens on save (if editor configured)

**Configuration:**
- `.prettierrc` - Prettier rules
- `package.json` eslintConfig - ESLint rules

---

<!-- TODO: Document future ADRs as architectural decisions are made -->

# Coding Instructions

## Project Context

**Read `.context/overview.md` for:**
- Complete tech stack details
- Project structure and organization
- Key features and architecture
- Development workflow

**Read `.context/standards/` for:**
- Code style guidelines (file naming, imports, JSX formatting)
- Naming conventions (components, variables, functions)
- Error handling patterns

**Read `.context/architecture/` for:**
- Architectural patterns (constants-driven architecture, Material Design 3 theming)
- Component composition strategies

**Read `.context/domains/` for:**
- Data entities and their structure (Hero, Navigation, Projects, etc.)
- Domain terminology and glossary

**Read `.context/workflows/` for:**
- Task execution workflow
- Branching strategy and CI/CD practices

**Read `.context/styling/` for:**
- Material Design 3 color system usage
- Tailwind CSS utility best practices
- Responsive design patterns

**Read `.context/testing/` for:**
- Unit testing patterns with Jest and React Testing Library
- Integration testing strategies

---

## Context

- **Tech Stack:**
  - React 19+ (functional components, hooks)
  - Tailwind CSS 3.4+
  - JavaScript ES2021+
- The project uses a modular structure with constants and assets imported as needed.
- Navigation links are sourced from a constants file (`src/constants/navigation.js`).
- The NavBar supports both desktop and mobile layouts, with a responsive menu toggle.
- Theme switching is handled via a `ThemeToggle` component.
- Styling is managed with Tailwind CSS utility classes, including dark mode support.

### Current Theme Colors (from tailwind.config.js)

    /* Light mode colors */
    --primary: 9 20 38; /* md-sys-color-primary */
    --primary-foreground: 255 255 255; /* md-sys-color-on-primary */
    --secondary: 81 96 114; /* md-sys-color-secondary */
    --secondary-foreground: 255 255 255; /* md-sys-color-on-secondary */
    --tertiary: 0 0 0; /* md-sys-color-tertiary */
    --tertiary-foreground: 255 255 255; /* md-sys-color-on-tertiary */
    --background: 251 248 250; /* md-sys-color-background */
    --foreground: 27 27 29; /* md-sys-color-on-background */

    /* Dark mode colors */
    --primary: 188 199 222; /* md-sys-color-primary */
    --primary-foreground: 38 49 67; /* md-sys-color-on-primary */
    --secondary: 185 200 222; /* md-sys-color-secondary */
    --secondary-foreground: 35 49 67; /* md-sys-color-on-secondary */
    --tertiary: 190 198 224; /* md-sys-color-tertiary */
    --tertiary-foreground: 40 48 68; /* md-sys-color-on-tertiary */
    --background: 19 19 21; /* md-sys-color-background */
    --foreground: 228 226 227; /* md-sys-color-on-background */

### Code Formatting & Linting

- Uses Prettier for code formatting (see `.prettierrc` or Prettier defaults).
- ESLint config extends `react-app`, `react-app/jest`, and `plugin:prettier/recommended`.
- Follow Prettier formatting (e.g., consistent quotes, trailing commas, spacing).
- Follow ESLint rules for React and Prettier compatibility.

### General Guidelines

- Use descriptive variable and function names.
- Add comments where necessary to explain non-obvious logic.
- Maintain accessibility (e.g., aria-labels on buttons).
- If you need more information, ask clarifying questions

# Project Overview: Techfolio

## Project Identification

- **Name:** Techfolio
- **Repository:** tech-portfolio
- **Primary Language:** JavaScript (ES2021+)
- **Framework:** React 19.0.0
- **Type:** Single Page Application (Portfolio Website)

## Purpose

A modern, customizable portfolio website template built with React and Tailwind CSS. Designed to showcase developer experience, projects, skills, and contact information with a Material Design 3 theming system and responsive design.

<!-- TODO: Add specific business goals and target audience if known -->

## Tech Stack

### Frontend
- **React:** 19.0.0 (functional components, hooks)
- **React Router DOM:** 7.1.3 (client-side routing)
- **Framer Motion:** 12.34.2 (animations)
- **@tsparticles:** 3.8.0 (particle effects for animated backgrounds)

### Styling
- **Tailwind CSS:** 3.4.17 (utility-first CSS framework)
- **Material Design 3:** Theme system via CSS custom properties
- **Dark Mode:** Class-based theme switching with system preference support
- **Custom Font:** Poppins (Google Fonts)

### Build & Development
- **React Scripts:** 5.0.1 (Create React App build system)
- **Node.js:** Managed via NVM (Node Version Manager)
- **Package Manager:** npm with legacy peer deps flag

### Code Quality
- **ESLint:** Config extends react-app, react-app/jest, plugin:prettier/recommended
- **Prettier:** Single quotes, semicolons, 2-space tabs, ES5 trailing commas
- **Testing:** Jest + React Testing Library (@testing-library/react, @testing-library/jest-dom)

### Deployment
- **GitHub Pages:** Via gh-pages package
- **Deployment Command:** `npm run deploy -- -m "Deploy React app to GitHub Pages vX.X.X"`

## Directory Structure

```
tech-portfolio/
├── public/                  # Static assets (index.html, favicon, resume.pdf)
├── src/
│   ├── assets/             # Images, logos, fonts
│   │   ├── logo/           # Logo files (svg/, png/, pdf/)
│   │   ├── brand/fonts/    # Custom brand fonts
│   │   └── personal.jpg    # Profile photo for hero section
│   ├── components/         # React components (.jsx files)
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── NavBar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Background/     # Animated background components
│   ├── constants/          # Data configuration (.js files)
│   │   ├── experience.js   # Work history data
│   │   ├── hero.js         # Name, title, TL;DR, email
│   │   ├── navigation.js   # Nav links and component mapping
│   │   ├── projects.js     # Project showcase data
│   │   ├── socials.js      # Social media links
│   │   ├── technology.js   # Tech stack icons
│   │   └── index.js        # Centralized exports
│   ├── App.js              # Main application component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles & Material Design 3 CSS variables
├── .github/                # GitHub configuration
├── .prettierrc             # Prettier configuration
├── tailwind.config.js      # Tailwind + Material Design color mappings
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Key Features

1. **Material Design 3 Theming**
   - Full Material You color system
   - Light/dark/system theme modes
   - Theme generated via Material Theme Builder
   - CSS custom properties in `src/index.css`

2. **Responsive Design**
   - Mobile-first approach
   - Hamburger menu for mobile
   - Adaptive layouts with Tailwind breakpoints

3. **Customization System**
   - All content managed via `src/constants/` files
   - Theme colors via CSS variables
   - Logo, fonts, and assets in organized structure

4. **Component Architecture**
   - Functional components with hooks
   - Section-based layout (Hero, About, Experience, Projects, Skills, Contact)
   - Reusable UI elements (NavBar, Footer, ThemeToggle)

5. **Animated Background**
   - tsparticles integration for visual effects
   - Configurable particle system

## Development Workflow

### Local Development
```bash
npm install --legacy-peer-deps
npm run start  # Runs on http://localhost:3000
```

### Testing
```bash
npm test  # Runs Jest + React Testing Library
```

### Building
```bash
npm run build  # Creates optimized production build
```

### Deployment
```bash
npm run deploy -- -m "Deploy React app to GitHub Pages vX.X.X"
```

## External Dependencies

- **Google Fonts:** Poppins font family
- **Material Theme Builder:** https://material-foundation.github.io/material-theme-builder/

## Configuration Files

- `.prettierrc` - Code formatting rules
- `tailwind.config.js` - Tailwind theme extensions and Material Design color mappings
- `package.json` - Dependencies, scripts, ESLint config
- `src/index.css` - Material Design 3 CSS custom properties

## Known Issues & TODOs

From README.md:
- Fix light and dark theming (minor issues)
- Update to have chatbot integration
- Update sections to use 3D background
- Make contact dropdown (socials, email, phone number)

<!-- TODO: Add compliance requirements if applicable -->
<!-- TODO: Add external service integrations if applicable -->

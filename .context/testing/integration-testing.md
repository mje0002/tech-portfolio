# Integration Testing Guide

This document describes integration testing practices for the Techfolio project.

---

## Overview

Integration tests verify that multiple components, modules, or systems work together correctly. In the context of Techfolio, this includes:
- Multi-component user workflows
- Theme persistence across page reloads
- Navigation and routing behavior
- Data flow from constants to components

---

## Current State

**Status:** No integration tests currently exist.

**Recommendation:** Add integration tests for key user workflows once unit test coverage is established.

---

## Testing Approach

### Integration Test Scope

**What to Test:**
1. **User Workflows:** Complete user journeys (browse portfolio, change theme, navigate sections)
2. **Component Integration:** Multiple components working together (NavBar + sections, ThemeToggle + App)
3. **Persistence:** localStorage + theme state + page reload
4. **Responsive Behavior:** Layout changes at different viewport sizes

**What NOT to Test:**
- Individual component logic (covered by unit tests)
- External services (no backend/API in current app)
- Browser-specific quirks (use E2E tests for this)

---

## Recommended Testing Stack

### Option 1: React Testing Library (Expanded Usage)

**Pros:**
- Already in project dependencies
- Same API as unit tests
- Fast execution
- Good for testing React component integration

**Cons:**
- Limited to React component tree
- Can't test actual browser behavior (navigation, persistence across reloads)

**Use For:**
- Multi-component workflows within a single render tree
- Data flow from constants through multiple components

---

### Option 2: Cypress or Playwright (Future)

**Pros:**
- Tests real browser behavior
- Can test actual navigation and page reloads
- Visual feedback with test runner
- Great for responsive design testing

**Cons:**
- Heavier setup
- Slower test execution
- Requires additional dependencies

**Use For:**
- Full user journeys in real browser
- Testing GitHub Pages deployment
- Responsive design validation
- Theme persistence across page reloads

---

## Integration Test Examples

### Test 1: Navigation Workflow

**Scenario:** User navigates through all sections and active state updates correctly.

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Navigation Integration', () => {
  test('navigating through all sections updates active state', () => {
    render(<App />);
    
    // Initial state - info section
    const infoLink = screen.getByText('About');
    
    // Click through each section
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('About')).toHaveClass('bg-primary-foreground');
    
    fireEvent.click(screen.getByText('Experience'));
    expect(screen.getByText('Experience')).toHaveClass('bg-primary-foreground');
    expect(screen.getByText('About')).not.toHaveClass('bg-primary-foreground');
    
    fireEvent.click(screen.getByText('Projects'));
    expect(screen.getByText('Projects')).toHaveClass('bg-primary-foreground');
    
    fireEvent.click(screen.getByText('Skills'));
    expect(screen.getByText('Skills')).toHaveClass('bg-primary-foreground');
    
    fireEvent.click(screen.getByText('Contact'));
    expect(screen.getByText('Contact')).toHaveClass('bg-primary-foreground');
  });

  test('mobile menu closes after navigation link is clicked', () => {
    render(<App />);
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Menu should be visible
    expect(screen.getAllByText('About')[1]).toBeInTheDocument(); // Second instance in mobile menu
    
    // Click a navigation link in mobile menu
    fireEvent.click(screen.getAllByText('About')[1]);
    
    // Mobile menu should close
    // Note: Actual implementation would need to add this behavior
  });
});
```

---

### Test 2: Theme Integration

**Scenario:** Theme changes apply across all components and persist to localStorage.

```javascript
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

describe('Theme Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('theme changes apply to all components', () => {
    render(<App />);
    
    // Initial state - light theme
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Open theme menu
    const themeButton = screen.getByLabelText('Theme menu');
    fireEvent.click(themeButton);
    
    // Switch to dark theme
    fireEvent.click(screen.getByText('Dark'));
    
    // Verify dark class is applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Verify localStorage updated
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Verify NavBar has dark theme classes (implementation-dependent)
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-primary'); // Material Design token works in both themes
  });

  test('system theme preference is respected', () => {
    // Mock system preference for dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(<App />);
    
    // Open theme menu and select system
    const themeButton = screen.getByLabelText('Theme menu');
    fireEvent.click(themeButton);
    fireEvent.click(screen.getByText('System'));
    
    // Should apply dark theme based on mock
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

---

### Test 3: Responsive Layout

**Scenario:** Components adapt correctly to different viewport sizes.

```javascript
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Responsive Layout Integration', () => {
  test('desktop layout shows full navigation', () => {
    // Set desktop viewport
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(<App />);
    
    // Desktop nav should be visible
    const desktopNav = screen.getByRole('list');
    expect(desktopNav).toHaveClass('hidden', 'md:flex'); // Tailwind responsive classes
  });

  test('mobile layout shows hamburger menu', () => {
    // Set mobile viewport
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(<App />);
    
    // Menu button should be visible
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('md:hidden');
  });
});
```

---

### Test 4: Data Flow Integration

**Scenario:** Constants data correctly flows through components and renders as expected.

```javascript
import { render, screen } from '@testing-library/react';
import App from '../App';
import navlinks from '../constants/navigation';
import hero from '../constants/hero';

describe('Data Flow Integration', () => {
  test('hero data displays correctly in multiple components', () => {
    render(<App />);
    
    // Hero name should appear in NavBar
    expect(screen.getAllByText(hero.name).length).toBeGreaterThan(0);
    
    // Hero title should appear in info section
    expect(screen.getByText(hero.title)).toBeInTheDocument();
    
    // TL;DR should appear
    expect(screen.getByText(hero.tdlr)).toBeInTheDocument();
  });

  test('navigation data correctly populates NavBar', () => {
    render(<App />);
    
    // All nav items should be rendered
    navlinks.forEach((nav) => {
      expect(screen.getAllByText(nav.title).length).toBeGreaterThan(0);
    });
  });
});
```

---

## Future: End-to-End Tests with Cypress/Playwright

### Example E2E Test (Cypress)

```javascript
describe('Portfolio User Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('completes full portfolio browsing workflow', () => {
    // User lands on hero section
    cy.contains(hero.name).should('be.visible');
    
    // User changes to dark theme
    cy.get('[aria-label="Theme menu"]').click();
    cy.contains('Dark').click();
    cy.get('html').should('have.class', 'dark');
    
    // User navigates to projects
    cy.contains('Projects').click();
    cy.url().should('include', '#projects');
    cy.get('#projects').should('be.visible');
    
    // User downloads resume
    cy.get('[aria-label="Download Resume PDF"]').should('have.attr', 'href', '/resume.pdf');
    
    // User copies email
    cy.get('[aria-label="Copy Email to Clipboard"]').click();
    cy.contains('Copied!').should('be.visible');
    
    // Verify theme persists on reload
    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('works correctly on mobile viewport', () => {
    cy.viewport('iphone-x');
    
    // Mobile menu should be visible
    cy.get('[aria-label="Toggle menu"]').should('be.visible');
    
    // Click to open menu
    cy.get('[aria-label="Toggle menu"]').click();
    
    // Nav links should be visible
    cy.contains('Projects').should('be.visible');
    
    // Click a link
    cy.contains('Projects').click();
    
    // Should navigate to projects section
    cy.url().should('include', '#projects');
  });
});
```

---

## Integration Test Best Practices

### 1. Test User Workflows, Not Implementation

Focus on what the user experiences, not internal component state.

**✅ Good:**
```javascript
test('user can navigate to projects section', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Projects'));
  expect(window.location.hash).toBe('#projects');
});
```

**❌ Avoid:**
```javascript
test('active state is set to projects', () => {
  // Testing implementation detail
  expect(component.state.active).toBe('projects');
});
```

---

### 2. Use Realistic Data

Test with actual constants data, not mocks (unless testing error states).

```javascript
import navlinks from '../constants/navigation';
import hero from '../constants/hero';

test('renders all navigation items', () => {
  render(<App />);
  navlinks.forEach((nav) => {
    expect(screen.getByText(nav.title)).toBeInTheDocument();
  });
});
```

---

### 3. Test Cross-Component Communication

Verify data and events flow correctly between components.

```javascript
test('ThemeToggle changes apply to App', () => {
  render(<App />);
  
  // Change theme in ThemeToggle
  fireEvent.click(screen.getByLabelText('Theme menu'));
  fireEvent.click(screen.getByText('Dark'));
  
  // Verify App reflects the change
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
```

---

### 4. Clean Up Between Tests

Reset global state to ensure test isolation.

```javascript
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.classList.remove('dark');
  window.location.hash = '';
});
```

---

## Running Integration Tests

**Separate Test Suites:**
```bash
# Run only integration tests
npm test -- --testPathPattern=integration

# Run only unit tests
npm test -- --testPathPattern=unit
```

**File Naming Convention:**
- Unit tests: `ComponentName.test.js` or `ComponentName.unit.test.js`
- Integration tests: `workflow-name.integration.test.js`

---

## TODO: Future Work

<!-- TODO: Set up Cypress or Playwright for E2E testing -->
<!-- TODO: Add integration tests for complete user workflows -->
<!-- TODO: Test responsive behavior at different breakpoints -->
<!-- TODO: Add visual regression testing for theme changes -->
<!-- TODO: Test GitHub Pages deployment in staging environment -->

---

## References

- **React Testing Library Docs:** https://testing-library.com/docs/react-testing-library/intro/
- **Cypress Docs:** https://docs.cypress.io/
- **Playwright Docs:** https://playwright.dev/
- **Integration Testing Best Practices:** https://kentcdodds.com/blog/write-tests

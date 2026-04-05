# Unit Testing Guide

This document describes unit testing practices and patterns for the Techfolio project.

---

## Testing Stack

### Framework and Libraries
- **Test Runner:** Jest (via React Scripts 5.0.1)
- **Component Testing:** React Testing Library (@testing-library/react 13.4.0)
- **DOM Matchers:** @testing-library/jest-dom 5.17.0
- **User Interactions:** @testing-library/user-event 13.5.0

### Configuration
- **Setup File:** `src/setupTests.js` - Imports jest-dom matchers
- **Test Pattern:** `*.test.js` files
- **Run Command:** `npm test` (runs Jest in watch mode)

---

## Current Test Coverage

### Existing Tests

**src/App.test.js:**
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

**Status:** This is a placeholder test from Create React App boilerplate and does not reflect actual app content.

**Recommendation:** Update or remove this test to reflect current app structure.

---

## Testing Patterns

### Pattern 1: Component Rendering Tests

**Purpose:** Verify components render expected content and structure.

**Example Test for NavBar:**
```javascript
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

describe('NavBar', () => {
  test('renders logo and navigation links', () => {
    render(<NavBar />);
    
    // Check logo is present
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders mobile menu button on mobile', () => {
    render(<NavBar />);
    
    // Menu button should be present (hidden via CSS on desktop)
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });
});
```

---

### Pattern 2: User Interaction Tests

**Purpose:** Verify component behavior responds correctly to user actions.

**Example Test for ThemeToggle:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('opens menu when button is clicked', () => {
    render(<ThemeToggle />);
    
    const themeButton = screen.getByLabelText('Theme menu');
    fireEvent.click(themeButton);
    
    // Menu options should now be visible
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  test('changes theme to dark when dark option is selected', () => {
    render(<ThemeToggle />);
    
    // Open menu
    const themeButton = screen.getByLabelText('Theme menu');
    fireEvent.click(themeButton);
    
    // Click dark mode option
    const darkOption = screen.getByText('Dark');
    fireEvent.click(darkOption);
    
    // Check that dark class is added to document
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Check localStorage
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('closes menu when clicking outside', () => {
    render(<ThemeToggle />);
    
    // Open menu
    const themeButton = screen.getByLabelText('Theme menu');
    fireEvent.click(themeButton);
    
    // Menu should be visible
    expect(screen.getByText('Light')).toBeInTheDocument();
    
    // Click outside (on document body)
    fireEvent.mouseDown(document.body);
    
    // Menu should be closed
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
  });
});
```

---

### Pattern 3: Hook Testing

**Purpose:** Test custom hooks or hook behavior in isolation.

**Example Test for Email Copy Handler (from App.js):**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Email Copy Functionality', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  test('copies email to clipboard when button is clicked', async () => {
    render(<App />);
    
    const copyButton = screen.getByLabelText('Copy Email to Clipboard');
    fireEvent.click(copyButton);
    
    // Check clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.any(String));
    
    // Check button text changes to "Copied!"
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
    
    // Check button text reverts after 2 seconds
    await waitFor(
      () => {
        expect(screen.getByText('Copy Email')).toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});
```

---

### Pattern 4: Constants Testing

**Purpose:** Verify data structure integrity and required fields.

**Example Test for Navigation Constants:**
```javascript
import navlinks from '../constants/navigation';

describe('Navigation Constants', () => {
  test('all navigation items have required fields', () => {
    navlinks.forEach((nav) => {
      expect(nav).toHaveProperty('id');
      expect(nav).toHaveProperty('title');
      expect(nav).toHaveProperty('component');
      
      expect(typeof nav.id).toBe('string');
      expect(typeof nav.title).toBe('string');
      expect(typeof nav.component).toBe('function');
    });
  });

  test('navigation IDs are unique', () => {
    const ids = navlinks.map((nav) => nav.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('navigation items are in expected order', () => {
    const expectedOrder = ['about', 'experience', 'projects', 'skills', 'contact'];
    const actualOrder = navlinks.map((nav) => nav.id);
    expect(actualOrder).toEqual(expectedOrder);
  });
});
```

---

## Testing Best Practices

### 1. Test Behavior, Not Implementation

❌ **Bad:** Testing state values directly
```javascript
test('menuOpen state is true', () => {
  // Don't test internal state
  expect(wrapper.state('menuOpen')).toBe(true);
});
```

✅ **Good:** Testing visible behavior
```javascript
test('mobile menu is visible when menu button is clicked', () => {
  render(<NavBar />);
  const menuButton = screen.getByLabelText('Toggle menu');
  fireEvent.click(menuButton);
  
  // Test what the user sees
  expect(screen.getByRole('list')).toBeInTheDocument();
});
```

---

### 2. Use Semantic Queries

**Query Priority (React Testing Library):**
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Good for form inputs
3. `getByText` - Good for text content
4. `getByTestId` - Last resort

**Example:**
```javascript
// ✅ Good - semantic query
const button = screen.getByRole('button', { name: 'Theme menu' });

// ❌ Avoid - relies on implementation details
const button = screen.getByClassName('theme-button');
```

---

### 3. Mock External Dependencies

**Browser APIs:**
```javascript
beforeEach(() => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});
```

---

### 4. Test Accessibility

**Example:**
```javascript
test('buttons have accessible labels', () => {
  render(<NavBar />);
  
  const menuButton = screen.getByLabelText('Toggle menu');
  expect(menuButton).toBeInTheDocument();
  
  const downloadButton = screen.getByLabelText('Download Resume PDF');
  expect(downloadButton).toBeInTheDocument();
});
```

---

### 5. Group Related Tests with describe

```javascript
describe('ThemeToggle', () => {
  describe('Rendering', () => {
    test('renders theme icon', () => { /* ... */ });
    test('renders menu dropdown when open', () => { /* ... */ });
  });

  describe('User Interactions', () => {
    test('opens menu on click', () => { /* ... */ });
    test('changes theme when option selected', () => { /* ... */ });
  });

  describe('Persistence', () => {
    test('saves theme to localStorage', () => { /* ... */ });
    test('loads theme from localStorage on mount', () => { /* ... */ });
  });
});
```

---

## Test File Organization

**Recommended Structure:**
```
src/
├── components/
│   ├── NavBar.jsx
│   └── __tests__/
│       └── NavBar.test.js
├── constants/
│   └── __tests__/
│       └── navigation.test.js
└── App.test.js
```

**Alternative (Co-located):**
```
src/
├── components/
│   ├── NavBar.jsx
│   ├── NavBar.test.js
│   ├── ThemeToggle.jsx
│   └── ThemeToggle.test.js
└── App.test.js
```

---

## Running Tests

**Commands:**
```bash
# Run all tests in watch mode
npm test

# Run tests once (CI mode)
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- NavBar.test.js
```

---

## Coverage Goals

**Recommended Coverage Targets:**
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

**Priority Areas:**
1. Core components (NavBar, ThemeToggle)
2. User interaction handlers
3. Data validation (constants)
4. Accessibility features

**Lower Priority:**
- Presentational-only components (if simple)
- Third-party library wrappers
- Configuration files

---

## TODO: Test Coverage Expansion

<!-- TODO: Write tests for all components -->
<!-- TODO: Add integration tests for user workflows -->
<!-- TODO: Set up coverage reporting in CI/CD -->
<!-- TODO: Add visual regression testing for theming -->

---

## References

- **Testing Library Docs:** https://testing-library.com/docs/react-testing-library/intro/
- **Jest Docs:** https://jestjs.io/docs/getting-started
- **React Testing Best Practices:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- **Live Examples:**
  - `src/App.test.js` - Basic rendering test
  - `src/setupTests.js` - Test configuration

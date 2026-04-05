# Error Handling

This document describes error handling patterns and strategies used in the Techfolio project.

---

## Overview

As a client-side React application, error handling in Techfolio focuses on:
1. **Graceful degradation** - Handle failures without breaking the UI
2. **User feedback** - Inform users when actions fail
3. **Browser API safety** - Guard against API unavailability
4. **State recovery** - Reset to valid states after errors

---

## Browser API Safety

### Pattern: Feature Detection

Always check for browser API availability before use, especially for newer APIs or those not universally supported.

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

**Rationale:**
- Guards against server-side rendering (SSR) where `window` is undefined
- Provides sensible default (`'light'`) if API is unavailable
- Progressive enhancement approach

---

## Async Operations

### Pattern: Promise-Based Error Handling

Handle async operations with `.then()` for success paths. Currently, no explicit `.catch()` handlers are present, relying on browser's default error handling.

**Example from `src/App.js`:**
```javascript
const handleCopyEmail = () => {
  navigator.clipboard.writeText(hero.email).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};
```

**Current Approach:**
- Success path updates state (`setCopied(true)`)
- No error handling for clipboard API failure
- Browser console will log errors if clipboard access is denied

**Recommended Enhancement:**
```javascript
const handleCopyEmail = () => {
  navigator.clipboard.writeText(hero.email)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })
    .catch((error) => {
      console.error('Failed to copy email:', error);
      // Optional: Set error state or show fallback UI
    });
};
```

---

## Event Listener Management

### Pattern: Cleanup in useEffect

Prevent memory leaks and stale event listeners by returning cleanup functions from effects.

**Example from `src/components/ThemeToggle.jsx`:**
```javascript
useEffect(() => {
  if (theme !== 'system') return;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => {
    document.documentElement.classList.toggle('dark', e.matches);
  };
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}, [theme]);
```

**Best Practices:**
- Always remove event listeners in cleanup function
- Use early return for conditional effect execution
- Reference the same handler function in both `addEventListener` and `removeEventListener`

**Another Example from `src/components/ThemeToggle.jsx`:**
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

## State Validation

### Pattern: Defensive Null/Undefined Checks

Check for existence of refs and DOM elements before accessing them.

**Example from `src/components/ThemeToggle.jsx`:**
```javascript
const handleClickOutside = (event) => {
  if (menuRef.current && !menuRef.current.contains(event.target)) {
    setOpen(false);
  }
};
```

**Rationale:**
- `menuRef.current` might be `null` if component unmounted
- Prevents "Cannot read property 'contains' of null" errors
- Short-circuit evaluation (`&&`) prevents accessing properties on null

---

## Conditional Rendering

### Pattern: Safe Data Access

Use optional chaining and nullish coalescing when data might be missing.

**Current Pattern:**
Components assume data from `constants/` files always exists. This is acceptable because:
1. Constants are statically imported and always defined
2. Data structure is controlled by developers
3. No external API calls or user-provided data

**If External Data is Added:**
Use optional chaining and provide fallbacks:
```javascript
<h1>{hero?.name ?? 'Portfolio'}</h1>
<p>{hero?.tdlr ?? 'Welcome to my portfolio'}</p>
```

---

## Form Validation

### Current State

No forms with validation currently exist. Contact section is planned but not yet implemented.

**Recommended Pattern for Future Forms:**
```javascript
const [errors, setErrors] = useState({});

const validateForm = (data) => {
  const newErrors = {};
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = 'Valid email is required';
  }
  if (!data.message || data.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters';
  }
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formErrors = validateForm(formData);
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  // Proceed with submission
};
```

---

## Error Boundaries

### Current State

No React Error Boundaries are implemented.

**Recommendation:**
For production apps, wrap the app in an Error Boundary to catch rendering errors gracefully.

**Example Error Boundary Component:**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-on-background mb-4">
              Something went wrong
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-on-primary px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in index.js
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
```

---

## Asset Loading

### Pattern: Graceful Image Fallbacks

Currently, images are statically imported and assumed to exist. For dynamic images, provide fallbacks.

**Current Pattern from `src/App.js`:**
```javascript
import personal from './assets/personal.jpg';

<img
  src={personal}
  alt="profile"
  className="w-full h-full object-cover"
/>
```

**Recommended Enhancement for Dynamic Images:**
```javascript
<img
  src={imageUrl}
  alt="profile"
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.src = '/placeholder.jpg'; // Fallback image
  }}
/>
```

---

## Network Requests

### Current State

No network requests or API calls currently implemented.

**Recommended Pattern for Future API Calls:**
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/endpoint');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

// Render with error and loading states
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data available</div>;
return <div>{/* Render data */}</div>;
```

---

## Console Logging

### Current Pattern

No explicit error logging to console in current code. Errors fall through to browser's default handling.

**Recommendation:**
Add explicit error logging for debugging:
```javascript
.catch((error) => {
  console.error('[ComponentName] Error in operation:', error);
  // Update state for user feedback
});
```

**Best Practices:**
- Prefix logs with component name for easier debugging
- Use `console.error()` for errors, `console.warn()` for warnings
- Remove verbose logging in production builds

---

## Summary of Error Handling Principles

1. **Prevention First**
   - Check for browser API availability
   - Validate refs before accessing DOM
   - Use TypeScript or JSDoc for type safety

2. **Graceful Degradation**
   - Provide default values when APIs fail
   - Show fallback UI for missing data
   - Don't crash the entire app on component errors

3. **User Feedback**
   - Show loading states during async operations
   - Display error messages for failed actions
   - Provide retry mechanisms where appropriate

4. **Cleanup**
   - Remove event listeners in effect cleanup
   - Cancel in-flight requests on unmount
   - Clear timers and intervals

5. **Logging**
   - Log errors to console for debugging
   - Include context (component, operation)
   - Consider error tracking service for production (e.g., Sentry)

---

## References

- **Live Examples:**
  - `src/components/ThemeToggle.jsx` - Feature detection, event listener cleanup
  - `src/App.js` - Async clipboard API usage
  - React Docs: [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

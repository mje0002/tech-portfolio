# Domain Entities and Business Rules

This document describes the key data entities and their business rules in the Techfolio portfolio application.

---

## Entity Overview

Techfolio is a content-driven portfolio application. Its core entities represent the data structures used to display professional information:

1. **Hero** - Personal branding information
2. **Navigation** - Site navigation structure
3. **Experience** - Work history entries
4. **Project** - Portfolio project showcases
5. **Technology** - Tech stack items
6. **Social** - Social media links
7. **Service** - Professional services offered
8. **Summary** - Professional summary/about

---

## Entity: Hero

**Purpose:** Personal branding and introduction information displayed in the hero section.

**Location:** `src/constants/hero.js`

**Expected Structure:**
```javascript
{
  name: string,        // Full name
  title: string,       // Professional title/role
  tdlr: string,        // Brief professional summary (too long; didn't read)
  email: string        // Contact email address
}
```

**Business Rules:**
1. **name** - Required, non-empty string
   - Used in NavBar and hero section
   - Represents the portfolio owner's identity

2. **title** - Required, non-empty string
   - Professional title or role (e.g., "Software Engineer", "Full Stack Developer")
   - Displayed prominently in hero section

3. **tdlr** - Required, non-empty string
   - Brief professional summary (1-2 sentences)
   - Should be concise and impactful
   - Displayed below name and title

4. **email** - Required, valid email format
   - Used for clipboard copy functionality
   - Should be a working email address

**Usage:**
- Imported in `src/App.js` for hero section
- Imported in `src/components/NavBar.jsx` for branding

**Validation:**
```javascript
const isValidHero = (hero) => {
  return (
    typeof hero.name === 'string' && hero.name.length > 0 &&
    typeof hero.title === 'string' && hero.title.length > 0 &&
    typeof hero.tdlr === 'string' && hero.tdlr.length > 0 &&
    typeof hero.email === 'string' && /\S+@\S+\.\S+/.test(hero.email)
  );
};
```

---

## Entity: Navigation

**Purpose:** Define navigation structure and section mappings.

**Location:** `src/constants/navigation.js`

**Expected Structure:**
```javascript
[
  {
    id: string,            // Section ID (matches HTML id attribute)
    title: string,         // Display title in navigation
    component: Component   // React component reference
  },
  // ...more items
]
```

**Business Rules:**
1. **id** - Required, unique, kebab-case string
   - Must match corresponding section ID in HTML
   - Used for hash-based navigation (#about, #projects, etc.)
   - Must be URL-safe

2. **title** - Required, non-empty string
   - Display name in navigation menu
   - Should be concise (1-2 words)

3. **component** - Required, valid React component
   - Component to render for this section
   - Must be a functional component

4. **Ordering** - Array order determines navigation menu order
   - Typically follows page flow: About → Experience → Projects → Skills → Contact

**Constraints:**
- All IDs must be unique within the array
- IDs should match the actual section IDs in the DOM

**Usage:**
- Imported in `src/components/NavBar.jsx` to generate navigation links
- Components rendered in `src/App.js` sections

**Validation:**
```javascript
const isValidNavigation = (navlinks) => {
  const ids = new Set();
  return navlinks.every((nav) => {
    if (ids.has(nav.id)) return false; // Duplicate ID
    ids.add(nav.id);
    return (
      typeof nav.id === 'string' && nav.id.length > 0 &&
      typeof nav.title === 'string' && nav.title.length > 0 &&
      typeof nav.component === 'function'
    );
  });
};
```

---

## Entity: Experience

**Purpose:** Work history entries for the Experience section.

**Location:** `src/constants/experience.js` (inferred)

**Expected Structure:**
```javascript
[
  {
    id: string | number,   // Unique identifier
    company: string,       // Company/organization name
    role: string,          // Job title/role
    duration: string,      // Time period (e.g., "Jan 2020 - Present")
    description: string,   // Responsibilities and achievements
    technologies: string[] // Tech stack used (optional)
  },
  // ...more entries
]
```

**Business Rules:**
1. **id** - Required, unique identifier
2. **company** - Required, non-empty string
3. **role** - Required, non-empty string
4. **duration** - Required, human-readable time period
5. **description** - Required, 1-3 paragraphs
6. **technologies** - Optional array of technology names

**Ordering:** Array order should be reverse chronological (most recent first)

---

## Entity: Project

**Purpose:** Portfolio project showcases.

**Location:** `src/constants/projects.js` (inferred)

**Expected Structure:**
```javascript
[
  {
    id: string | number,   // Unique identifier
    name: string,          // Project name
    description: string,   // Project description
    tags: string[],        // Technology tags
    image: string,         // Image URL or import
    sourceCode: string,    // GitHub/GitLab URL (optional)
    liveDemo: string       // Live demo URL (optional)
  },
  // ...more projects
]
```

**Business Rules:**
1. **id** - Required, unique identifier
2. **name** - Required, non-empty string
3. **description** - Required, concise project overview (1-3 sentences)
4. **tags** - Required, non-empty array of technology names
5. **image** - Required, valid image path or URL
6. **sourceCode** - Optional, valid GitHub/GitLab URL
7. **liveDemo** - Optional, valid URL to deployed project

**Constraints:**
- At least one of sourceCode or liveDemo should be present
- Image should be optimized for web (< 500KB recommended)

---

## Entity: Technology

**Purpose:** Tech stack items for Skills section.

**Location:** `src/constants/technology.js` (inferred)

**Expected Structure:**
```javascript
[
  {
    id: string | number,   // Unique identifier
    name: string,          // Technology name (e.g., "React", "Node.js")
    icon: string | Component, // Icon URL, emoji, or component
    category: string       // Category (e.g., "Frontend", "Backend", "Tools")
  },
  // ...more technologies
]
```

**Business Rules:**
1. **id** - Required, unique identifier
2. **name** - Required, official technology name
3. **icon** - Required, visual representation
4. **category** - Optional, for grouping

**Grouping:** Can be grouped by category (Frontend, Backend, DevOps, etc.)

---

## Entity: Social

**Purpose:** Social media and professional network links.

**Location:** `src/constants/socials.js` (inferred)

**Expected Structure:**
```javascript
[
  {
    id: string,            // Unique identifier
    name: string,          // Platform name (e.g., "GitHub", "LinkedIn")
    url: string,           // Profile URL
    icon: string | Component // Icon representation
  },
  // ...more socials
]
```

**Business Rules:**
1. **id** - Required, unique identifier
2. **name** - Required, platform name
3. **url** - Required, valid URL to profile
4. **icon** - Required, platform icon/logo

**Common Platforms:** GitHub, LinkedIn, Twitter/X, Email, Portfolio, Blog

---

## Entity: Service

**Purpose:** Professional services offered (e.g., for freelance/consulting).

**Location:** `src/constants/services.js` (inferred)

**Expected Structure:**
```javascript
[
  {
    id: string | number,   // Unique identifier
    title: string,         // Service name
    description: string,   // Service description
    icon: string | Component // Service icon
  },
  // ...more services
]
```

**Business Rules:**
1. **id** - Required, unique identifier
2. **title** - Required, concise service name
3. **description** - Required, brief explanation
4. **icon** - Optional, visual representation

---

## Entity: Summary

**Purpose:** About section content.

**Location:** `src/constants/summary.js` (inferred)

**Expected Structure:**
```javascript
{
  headline: string,      // Section headline
  paragraphs: string[],  // Array of paragraph text
  highlights: string[]   // Key achievements or facts (optional)
}
```

**Business Rules:**
1. **headline** - Required, section title
2. **paragraphs** - Required, 2-4 paragraphs of professional summary
3. **highlights** - Optional, bullet points of achievements

---

## Cross-Entity Rules

### Uniqueness
- All entity IDs must be unique within their collection
- Entity IDs should be stable (not change between deploys)

### Data Consistency
- Technology names in Experience should match Technology entities
- Navigation component references must match actual components

### Order and Priority
- Most entities use array order for display order
- Important items should be first (reverse chronological for work history)

---

## Data Validation

### Recommended Validation Function

```javascript
export const validateEntity = (entity, schema) => {
  const errors = [];
  
  Object.keys(schema).forEach((key) => {
    const rule = schema[key];
    const value = entity[key];
    
    // Check required
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${key} is required`);
      return;
    }
    
    // Check type
    if (value !== undefined && typeof value !== rule.type) {
      errors.push(`${key} must be of type ${rule.type}`);
    }
    
    // Check custom validation
    if (rule.validate && !rule.validate(value)) {
      errors.push(`${key} failed validation: ${rule.message}`);
    }
  });
  
  return errors;
};

// Example schema
const heroSchema = {
  name: { required: true, type: 'string' },
  title: { required: true, type: 'string' },
  tdlr: { required: true, type: 'string' },
  email: {
    required: true,
    type: 'string',
    validate: (v) => /\S+@\S+\.\S+/.test(v),
    message: 'Invalid email format'
  }
};
```

---

## Future Enhancements

<!-- TODO: Add TypeScript interfaces for all entities -->
<!-- TODO: Create Zod or Yup schemas for runtime validation -->
<!-- TODO: Add unit tests for entity validation -->
<!-- TODO: Consider migrating to a CMS for content management -->

---

## References

- **Live Examples:**
  - `src/constants/hero.js` - Hero entity
  - `src/constants/navigation.js` - Navigation entity
  - Other `src/constants/*.js` files - Additional entities

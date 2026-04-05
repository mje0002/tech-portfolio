# CI/CD Workflow

This document describes the Continuous Integration and Continuous Deployment (CI/CD) practices for the Techfolio project.

---

## Overview

**Current State:** Manual deployment via npm scripts. No automated CI/CD pipeline configured.

**Deployment Method:** GitHub Pages via `gh-pages` npm package

**Recommendation:** Set up GitHub Actions for automated testing, building, and deployment.

---

## Current Deployment Workflow

### Manual Deployment Process

**Command:**
```bash
npm run deploy -- -m "Deploy React app to GitHub Pages vX.X.X"
```

**What Happens:**
1. Runs pre-deploy script: `npm run build`
2. Creates optimized production build in `build/` directory
3. Pushes contents of `build/` to `gh-pages` branch
4. GitHub Pages serves content from `gh-pages` branch

**Steps:**
```bash
# 1. Ensure you're on main branch with latest changes
git checkout main
git pull origin main

# 2. Test build locally
npm run build

# 3. Test production build
npx serve -s build
# Visit http://localhost:3000 to verify

# 4. Deploy to GitHub Pages
npm run deploy -- -m "Deploy React app to GitHub Pages v1.2.3"

# 5. Verify deployment
# Visit https://{username}.github.io
```

**Configuration:**
- `package.json` homepage: `"https://{username}.github.io"`
- Deployment script: `gh-pages -d build`

---

## Recommended GitHub Actions CI/CD

### Workflow 1: Test and Lint on Pull Request

**Purpose:** Ensure code quality before merging

**File:** `.github/workflows/test.yml`

```yaml
name: Test and Lint

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run linter
        run: npm run lint --if-present || echo "No lint script found"

      - name: Run Prettier check
        run: npx prettier --check "src/**/*.{js,jsx,css}"

      - name: Run tests
        run: npm test -- --watchAll=false --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
```

**Triggers:**
- Every pull request to `main`
- Every push to `main`

**Checks:**
- ESLint (code quality)
- Prettier (code formatting)
- Jest tests with coverage
- Multiple Node versions (18.x, 20.x)

---

### Workflow 2: Build and Deploy to GitHub Pages

**Purpose:** Automated deployment on merge to main

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run tests
        run: npm test -- --watchAll=false

      - name: Build
        run: npm run build
        env:
          CI: false # Treat warnings as warnings, not errors

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          commit_message: 'Deploy ${{ github.sha }}'
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
```

**Triggers:**
- Every push to `main` branch
- Manual workflow dispatch

**Steps:**
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Run tests (fail if tests don't pass)
5. Build production bundle
6. Deploy to `gh-pages` branch

**Benefits:**
- Automatic deployment on merge
- Tests run before deployment
- No manual deployment needed
- Build errors caught before going live

---

### Workflow 3: Dependency Updates (Dependabot)

**Purpose:** Keep dependencies up to date and secure

**File:** `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "{username}"
    commit-message:
      prefix: "chore"
      include: "scope"
```

**Features:**
- Weekly checks for npm package updates
- Automatic pull requests for dependency updates
- Security vulnerability patches
- Grouped updates to reduce PR noise

---

## Local Development Workflow

### Pre-commit Checks (Recommended)

**Tool:** Husky + lint-staged

**Setup:**
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configuration in `package.json`:**
```json
{
  "lint-staged": {
    "src/**/*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{css,md,json}": [
      "prettier --write"
    ]
  }
}
```

**Benefits:**
- Auto-format code on commit
- Catch linting errors before pushing
- Maintain code quality automatically

---

## Build Process

### Development Build

**Command:** `npm start`

**Features:**
- Fast refresh (HMR)
- Source maps for debugging
- Dev server on http://localhost:3000
- Live reload on file changes

**Environment:** Development

---

### Production Build

**Command:** `npm run build`

**Output:** `build/` directory

**Optimizations:**
- Code minification
- Tree shaking (removes unused code)
- Asset optimization
- CSS extraction and minification
- Filename hashing for cache busting

**File Structure:**
```
build/
├── index.html
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [chunk].[hash].js
│   └── media/
│       └── [assets]
└── [other static files]
```

---

## Testing in CI

### Test Configuration for CI

**Script in `package.json`:**
```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:ci": "react-scripts test --watchAll=false --coverage --ci"
  }
}
```

**CI Test Command:**
```bash
npm run test:ci
```

**Coverage Thresholds (Recommended):**

Add to `package.json`:
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70,
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

---

## Environment Variables

### Current Setup

No environment variables currently used.

### Future: Environment-Specific Configuration

**Files:**
- `.env` - Default environment variables (not committed)
- `.env.local` - Local overrides (not committed)
- `.env.production` - Production environment (can be committed)

**Example `.env.production`:**
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=UA-XXXXXXXXX-X
```

**Usage in Code:**
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

**Important:**
- Only variables prefixed with `REACT_APP_` are accessible in React
- Never commit secrets to git
- Use GitHub Secrets for sensitive data in CI/CD

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass: `npm test -- --watchAll=false`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in production build
- [ ] Test build locally: `npx serve -s build`
- [ ] All PRs merged to `main`
- [ ] Version number updated (if using versioning)

### Deployment

- [ ] Run deployment command: `npm run deploy -- -m "Deploy v1.2.3"`
- [ ] Verify deployment on GitHub Pages
- [ ] Check all pages and features work
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices

### Post-Deployment

- [ ] Tag release in git: `git tag v1.2.3 && git push origin v1.2.3`
- [ ] Update changelog (if using)
- [ ] Announce deployment to team
- [ ] Monitor for errors

---

## Monitoring and Logging

### Current State

No monitoring or error tracking configured.

### Recommended Tools

**Error Tracking:**
- [Sentry](https://sentry.io/) - Real-time error tracking
- [LogRocket](https://logrocket.com/) - Session replay + error tracking

**Analytics:**
- Google Analytics
- Plausible (privacy-friendly alternative)

**Performance Monitoring:**
- Lighthouse CI
- Web Vitals reporting (already set up via `reportWebVitals.js`)

---

## Rollback Strategy

### Rolling Back a Deployment

**Option 1: Redeploy Previous Version**
```bash
# Checkout previous commit
git checkout <previous-commit-hash>

# Deploy
npm run deploy -- -m "Rollback to v1.2.2"

# Return to main
git checkout main
```

**Option 2: Revert Commit**
```bash
# Revert the problematic commit
git revert <commit-hash>

# Push to main
git push origin main

# Redeploy
npm run deploy -- -m "Deploy v1.2.3-hotfix"
```

---

## Performance Optimization

### Build Size Analysis

**Command:**
```bash
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

**Install source-map-explorer:**
```bash
npm install --save-dev source-map-explorer
```

**Add script to `package.json`:**
```json
{
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}
```

---

## Future Improvements

<!-- TODO: Set up GitHub Actions workflows -->
<!-- TODO: Add automated testing in CI/CD -->
<!-- TODO: Set up Dependabot for dependency updates -->
<!-- TODO: Add pre-commit hooks with Husky -->
<!-- TODO: Configure error tracking (Sentry) -->
<!-- TODO: Add Lighthouse CI for performance monitoring -->
<!-- TODO: Set up staging environment for testing -->

---

## References

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **gh-pages Package:** https://www.npmjs.com/package/gh-pages
- **React Deployment Docs:** https://create-react-app.dev/docs/deployment/
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Live Examples:**
  - `package.json` scripts section - Current deployment setup

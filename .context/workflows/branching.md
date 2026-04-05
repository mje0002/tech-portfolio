# Branching Strategy

This document defines the git branching and version control workflow for the Techfolio project.

---

## Overview

Techfolio uses a **simplified trunk-based development** model suitable for small teams and solo developers.

**Key Principles:**
1. `main` branch is always deployable
2. Feature branches are short-lived (1-3 days max)
3. Direct commits to `main` for small fixes (solo developer)
4. Pull requests for larger features or team collaboration
5. Deployment happens from `main` to `gh-pages` branch

---

## Branch Structure

### Main Branch: `main`

**Purpose:** Production-ready code, deployable at any time

**Rules:**
- Always contains stable, tested code
- Deployment to GitHub Pages happens from this branch
- Never force-push to `main`
- All CI/CD checks must pass before merging

**Direct Commits Allowed For:**
- Documentation updates
- Minor bug fixes
- Small styling tweaks
- Configuration changes

**Example Commits on `main`:**
```bash
git commit -m "Update README for deployment instructions"
git commit -m "Fix typo in About section"
git commit -m "Update hero image"
```

---

### Feature Branches

**Naming Convention:** `<username>/<feature-name>`

**Examples from Git History:**
- `mje0002/background` - Adding background animations
- `bryanjebyrd/main` - Contributor's feature branch

**Alternative Conventions:**
- `feature/<feature-name>` - For new features
- `fix/<bug-description>` - For bug fixes
- `refactor/<component-name>` - For refactoring
- `docs/<topic>` - For documentation

**Lifecycle:**
1. Create branch from `main`
2. Make commits
3. Open pull request
4. Code review (if team)
5. Merge to `main`
6. Delete branch

**Example Workflow:**
```bash
# Create feature branch
git checkout main
git pull origin main
git checkout -b mje0002/dark-mode-improvements

# Make changes
git add src/components/ThemeToggle.jsx
git commit -m "Add system theme preference detection"

# Push to remote
git push -u origin mje0002/dark-mode-improvements

# Open pull request on GitHub
# After approval and merge:
git checkout main
git pull origin main
git branch -d mje0002/dark-mode-improvements
```

---

### Deployment Branch: `gh-pages`

**Purpose:** Contains built static files for GitHub Pages hosting

**Rules:**
- **Never manually edit this branch**
- Automatically managed by `gh-pages` npm package
- Updated via `npm run deploy` command
- Contains only production build artifacts

**How It Works:**
```bash
# Build and deploy to GitHub Pages
npm run deploy -- -m "Deploy React app to GitHub Pages v1.2.3"
```

This command:
1. Runs `npm run build` to create production bundle
2. Pushes `build/` directory contents to `gh-pages` branch
3. Commits with the message provided

---

## Commit Message Conventions

### Format

**Structure:**
```
<type>: <short description>

<optional longer description>

<optional footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring (no feature change)
- `test:` - Adding or updating tests
- `chore:` - Build process or auxiliary tool changes

**Examples from Git History:**
```
Changes to make nice updates
socials and projects
Updating README for noobies
Resume download option and email copying
Getting started updated
better styling and profile pic
Clean up and adding in the summary action section
adding in light and dark mode
Getting dark mode working
adding footer
```

**Improved Examples (Following Conventions):**
```
feat: Add social links and project showcase
docs: Update README with beginner-friendly setup guide
feat: Add resume download and email copy functionality
docs: Enhance getting started documentation
style: Improve hero section styling and add profile picture
feat: Add summary action section
feat: Implement light and dark mode theming
fix: Fix dark mode color contrast issues
feat: Add footer component
```

---

## Pull Request Workflow

### Creating a Pull Request

1. **Push feature branch to remote**
   ```bash
   git push -u origin <branch-name>
   ```

2. **Open PR on GitHub**
   - Title: Clear description of change
   - Description: What changed, why, any testing notes
   - Link any related issues

3. **Request review** (if team collaboration)

4. **Address feedback** (if any)

5. **Merge when approved**

### PR Title Format

```
[Type] Brief description of changes
```

**Examples:**
```
[Feature] Add dark mode theme toggle
[Fix] Resolve navigation active state bug
[Refactor] Extract theme logic into custom hook
[Docs] Update deployment instructions
```

### PR Description Template

```markdown
## What Changed
Describe the changes made in this PR.

## Why
Explain the motivation for these changes.

## How to Test
Steps to verify the changes work:
1. Run `npm start`
2. Navigate to...
3. Verify that...

## Screenshots (if applicable)
![image](url)

## Checklist
- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
```

---

## Merge Strategy

### Squash and Merge (Recommended)

**When to Use:** Feature branches with multiple small commits

**Benefits:**
- Cleaner `main` history
- One commit per feature
- Easier to revert if needed

**GitHub UI:** Select "Squash and merge" when merging PR

---

### Merge Commit

**When to Use:** Large features with meaningful commit history

**Benefits:**
- Preserves full commit history
- Shows collaboration timeline

---

## Versioning

### Semantic Versioning

**Format:** `vMAJOR.MINOR.PATCH`

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes

**Examples:**
- `v1.0.0` - Initial release
- `v1.1.0` - Added dark mode feature
- `v1.1.1` - Fixed dark mode contrast bug
- `v2.0.0` - Migrated to TypeScript (breaking change)

**Current Practice (from git history):**
```bash
npm run deploy -- -m "Deploy React app to GitHub Pages vX.X.X"
```

**Recommendation:** Track versions in git tags
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## Branch Protection (Recommended for Teams)

### Protected Branch Rules for `main`

Configure on GitHub → Settings → Branches:

1. **Require pull request before merging**
   - At least 1 approval required

2. **Require status checks to pass**
   - Build must succeed
   - Tests must pass
   - Linting must pass

3. **Require conversation resolution before merging**

4. **Do not allow force pushes**

5. **Do not allow deletions**

---

## Git Workflow Quick Reference

### Starting a New Feature

```bash
git checkout main
git pull origin main
git checkout -b username/feature-name
# Make changes
git add .
git commit -m "feat: Add new feature"
git push -u origin username/feature-name
# Open PR on GitHub
```

### Updating Feature Branch with Latest main

```bash
git checkout main
git pull origin main
git checkout username/feature-name
git merge main
# Resolve conflicts if any
git push origin username/feature-name
```

### Deploying to GitHub Pages

```bash
git checkout main
git pull origin main
npm run build  # Test build locally
npm run deploy -- -m "Deploy React app to GitHub Pages v1.2.3"
```

### Cleaning Up After Merge

```bash
# Delete local branch
git branch -d username/feature-name

# Delete remote branch (if not auto-deleted)
git push origin --delete username/feature-name
```

---

## Best Practices

1. **Keep branches short-lived**
   - Merge within 1-3 days
   - Avoid long-running feature branches

2. **Pull before pushing**
   - Always sync with `main` before starting work
   - Reduces merge conflicts

3. **Write meaningful commit messages**
   - Describe *what* and *why*, not *how*
   - Future you will thank you

4. **Test before merging**
   - Run `npm test` and `npm run build`
   - Manually test in browser

5. **Use `.gitignore`**
   - Never commit `node_modules/`, `build/`, `.env`
   - Already configured in project

6. **Atomic commits**
   - One logical change per commit
   - Easier to review and revert

---

## Common Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline -10

# View branches
git branch -a

# Discard local changes
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View diff
git diff
git diff --staged

# Stash changes
git stash
git stash pop

# Cherry-pick a commit
git cherry-pick <commit-hash>
```

---

## References

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Flow:** https://guides.github.com/introduction/flow/
- **Semantic Versioning:** https://semver.org/
- **Live Examples:**
  - `git log --oneline -20` - See actual commit history
  - GitHub PR history - See merged pull requests

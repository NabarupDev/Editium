# Quick Start: CI/CD Setup

This guide will help you get your CI/CD pipeline up and running quickly.

## Prerequisites

- GitHub repository with admin access
- npm account with publishing rights
- Node.js 16+ installed locally

---

## Step-by-Step Setup

### Step 1: Configure npm Token

1. **Generate npm token:**
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token"
   - Select "Automation" token type
   - Copy the token (you won't see it again!)

2. **Add to GitHub Secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### Step 2: Enable GitHub Actions

1. Go to Settings → Actions → General
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Click "Save"

### Step 3: Verify Workflows

All workflow files are already created in `.github/workflows/`:

- ✅ `test.yml` - Runs tests on push/PR
- ✅ `release.yml` - Automated releases on main branch
- ✅ `publish.yml` - Manual npm publishing
- ✅ `dependency-review.yml` - Dependency scanning
- ✅ `codeql.yml` - Security analysis

### Step 4: Test the CI Pipeline

```bash
# Create a test commit with conventional format
git add .
git commit -m "ci: add GitHub Actions workflows"
git push origin main
```

Go to Actions tab to see your first workflow run!

---

## 🏷️ Making Your First Release

### Option A: Automatic Release (Recommended)

1. **Make changes with conventional commits:**
   ```bash
   git commit -m "feat: add awesome new feature"
   git push origin main
   ```

2. **Semantic Release runs automatically:**
   - Analyzes your commits
   - Bumps version (1.0.0 → 1.1.0 for feat)
   - Creates changelog
   - Publishes to npm
   - Creates GitHub release

### Option B: Manual Release

1. **Create and push a tag:**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

2. **Create GitHub Release:**
   - Go to Releases → Draft a new release
   - Select your tag
   - Fill in release notes
   - Publish release

3. **Publish workflow runs automatically**

---

## 📝 Commit Message Format

Follow this format for automatic versioning:

```
<type>: <description>

Examples:
feat: add table resizing        → 1.0.0 → 1.1.0 (minor)
fix: correct toolbar alignment  → 1.0.0 → 1.0.1 (patch)
docs: update readme             → No version change
```

### Common Types:
- `feat:` - New feature (minor bump)
- `fix:` - Bug fix (patch bump)
- `docs:` - Documentation
- `test:` - Tests
- `ci:` - CI/CD changes

For **BREAKING CHANGES** (major bump):
```
feat: redesign API

BREAKING CHANGE: removed old props
```

---

## Verify Setup

### Check CI is Running

1. Go to Actions tab
2. You should see workflows running
3. Green checkmark = Success

### Check npm Publishing

After your first release:
1. Go to https://www.npmjs.com/package/editium
2. Verify version and files

### Check GitHub Releases

1. Go to Releases tab
2. You should see auto-generated releases
3. Changelog should be included

---

## Optional Enhancements

### Enable Codecov (Code Coverage)

1. Go to https://codecov.io
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token
5. Add to GitHub Secrets as `CODECOV_TOKEN`

### Protect Main Branch

1. Settings → Branches
2. Add rule for `main`
3. Check "Require status checks to pass before merging"
4. Select: `test`, `coverage`
5. Save

### Add Status Badges to README

Add these to your README.md:

```markdown
[![CI Tests](https://github.com/NabarupDev/Editium/actions/workflows/test.yml/badge.svg)](https://github.com/NabarupDev/Editium/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/editium.svg)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

---

## Troubleshooting

### Workflow not running?

- Check Actions are enabled: Settings → Actions
- Check workflow file syntax (YAML)
- Look for error messages in Actions tab

### npm publish fails?

- Verify `NPM_TOKEN` is set correctly
- Check you have publish permissions
- Ensure package name is available

### No release created?

- Check commit message format
- Must push to `main` branch
- Look at semantic-release logs in Actions

---

## Learn More

- Full documentation: [CI_CD_DOCUMENTATION.md](./CI_CD_DOCUMENTATION.md)
- Commit convention: https://www.conventionalcommits.org/
- GitHub Actions: https://docs.github.com/en/actions

---

## What You've Accomplished

- Automated testing on every push
- Code quality and security scanning
- Automatic semantic versioning
- Automated npm publishing
- Changelog generation
- Professional CI/CD pipeline

**You're all set. Start committing with conventional messages and let the automation handle the rest.**

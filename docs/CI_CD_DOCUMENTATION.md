# CI/CD Pipeline Documentation

This document describes the complete CI/CD setup for the Editium package, including automated testing, releases, and npm publishing.

## Table of Contents

1. [Overview](#overview)
2. [GitHub Actions Workflows](#github-actions-workflows)
3. [Semantic Release](#semantic-release)
4. [Distribution Configuration](#distribution-configuration)
5. [Setup Instructions](#setup-instructions)
6. [Commit Message Convention](#commit-message-convention)
7. [Release Process](#release-process)

---

## Overview

The Editium package uses a fully automated CI/CD pipeline that:

- Runs tests on every push and pull request
- Builds the package to ensure it compiles correctly
- Scans for security vulnerabilities in dependencies
- Generates code coverage reports
- Automatically versions releases using semantic versioning
- Generates changelogs from commit messages
- Publishes to npm automatically on releases
- Performs security analysis with CodeQL

---

## GitHub Actions Workflows

### 1. CI Tests (`.github/workflows/test.yml`)

**Trigger:** Push or Pull Request to `main` or `develop` branches

**What it does:**
- Tests on multiple Node.js versions (16.x, 18.x, 20.x)
- Runs linting (if configured)
- Executes all test suites
- Builds the package
- Uploads build artifacts

**Jobs:**
- `test` - Runs tests on multiple Node versions
- `coverage` - Generates and uploads code coverage to Codecov

**Matrix Testing:**
```yaml
Node.js Versions:
- 16.x (LTS)
- 18.x (LTS)
- 20.x (Current)
```

### 2. **Semantic Release** (`.github/workflows/release.yml`)

**Trigger:** Push to `main` branch

**What it does:**
- Analyzes commits since last release
- Determines next version number
- Generates changelog
- Creates GitHub release
- Publishes to npm automatically
- Comments on related issues/PRs

**Required Secrets:**
- `GITHUB_TOKEN` (automatically provided)
- `NPM_TOKEN` (must be configured)

### 3. **Manual Publish** (`.github/workflows/publish.yml`)

**Trigger:** Manual creation of GitHub Release

**What it does:**
- Runs tests before publishing
- Builds the package
- Publishes to npm
- Creates release summary

**Use case:** Manual releases when needed

### 4. **Dependency Review** (`.github/workflows/dependency-review.yml`)

**Trigger:** Pull Requests

**What it does:**
- Scans for vulnerable dependencies
- Checks license compliance
- Fails on moderate+ severity issues
- Blocks GPL-2.0 and GPL-3.0 licenses

### 5. **CodeQL Analysis** (`.github/workflows/codeql.yml`)

**Trigger:** 
- Push to main/develop
- Pull requests
- Weekly schedule (Mondays)

**What it does:**
- Scans code for security vulnerabilities
- Identifies code quality issues
- Uses security-extended query suite
- Reports findings to GitHub Security tab

---

## Semantic Release

### Configuration (`.releaserc.json`)

Semantic release automatically handles:

#### Version Bumping Rules

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `feat:` | Minor (0.x.0) | New features |
| `fix:` | Patch (0.0.x) | Bug fixes |
| `perf:` | Patch (0.0.x) | Performance improvements |
| `BREAKING CHANGE:` | Major (x.0.0) | Breaking changes |
| `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:` | Patch | Other changes |

#### Plugins Used

1. **@semantic-release/commit-analyzer** - Analyzes commits to determine version
2. **@semantic-release/release-notes-generator** - Generates changelog
3. **@semantic-release/changelog** - Updates CHANGELOG.md
4. **@semantic-release/npm** - Publishes to npm
5. **@semantic-release/git** - Commits changelog and version
6. **@semantic-release/github** - Creates GitHub releases and comments

#### Generated Sections

- Features
- Bug Fixes
- Performance Improvements
- Reverts
- Documentation
- Styles
- Code Refactoring
- Tests
- Build System
- CI/CD

---

## Distribution Configuration

### Package Files (`.npmignore`)

**Included in npm package:**
- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Package documentation
- `LICENSE` - License file

**Excluded from npm package:**
- Source files (`src/`)
- Test files (`test/`)
- Example app (`example/`)
- Configuration files (tsconfig, rollup, vitest configs)
- CI/CD files (`.github/`)
- Development files (coverage, logs, etc.)

### Package.json Configuration

```json
{
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

---

## Setup Instructions

### 1. Configure NPM Token

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Sign in and go to Access Tokens
3. Generate a new **Automation** token
4. In GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Create new secret: `NPM_TOKEN`
   - Paste your npm token

### 2. Configure Codecov (Optional)

1. Go to [codecov.io](https://codecov.io/)
2. Connect your GitHub repository
3. Get the upload token
4. Add as GitHub secret: `CODECOV_TOKEN`

### 3. Enable GitHub Actions

1. Go to repository Settings - Actions - General
2. Set "Workflow permissions" to "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"

### 4. Protect Main Branch

1. Go to Settings → Branches
2. Add branch protection rule for `main`:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select required checks: `test`, `coverage`

---

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** A new feature (minor version bump)
- **fix:** A bug fix (patch version bump)
- **docs:** Documentation changes
- **style:** Code style changes (formatting, semicolons, etc.)
- **refactor:** Code refactoring
- **perf:** Performance improvements
- **test:** Adding or updating tests
- **build:** Build system changes
- **ci:** CI/CD changes
- **chore:** Other changes

### Examples

```bash
# Minor version bump (0.1.0 → 0.2.0)
feat(editor): add table support with resize handles

# Patch version bump (0.1.0 → 0.1.1)
fix(toolbar): correct alignment button state

# Major version bump (0.1.0 → 1.0.0)
feat(editor): redesign API

BREAKING CHANGE: removed deprecated props

# No version bump (documentation only)
docs(readme): update installation instructions
```

---

## Release Process

### Automatic Releases (Recommended)

1. **Develop on feature branches**
   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make commits with conventional format**
   ```bash
   git commit -m "feat(editor): add new feature"
   ```

3. **Create Pull Request**
   - Tests will run automatically
   - Review and approve

4. **Merge to main**
   ```bash
   git checkout main
   git merge feat/my-feature
   git push origin main
   ```

5. **Semantic Release runs automatically**
   - Analyzes commits
   - Determines version
   - Creates changelog
   - Publishes to npm
   - Creates GitHub release
   - Comments on issues/PRs

### Manual Releases (When Needed)

1. **Create a Git tag**
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

2. **Create GitHub Release**
   - Go to Releases → Draft a new release
   - Select the tag
   - Publish release

3. **Publish workflow runs**
   - Tests execute
   - Package builds
   - Publishes to npm

---

## 📊 Monitoring

### GitHub Actions

- View workflow runs: Repository → Actions tab
- Check test results, build logs, and deployment status

### npm Package

- View package: https://www.npmjs.com/package/editium
- Download statistics
- Version history

### Code Coverage

- View reports: https://codecov.io/gh/NabarupDev/Editium
- Coverage trends
- Uncovered lines

### Security

- View alerts: Repository → Security tab
- Dependabot alerts
- CodeQL scanning results

---

## 🔧 Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest versions
npx npm-check-updates -u
npm install
```

### Run Tests Locally

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage

# UI mode
npm run test:ui
```

### Build Package

```bash
# Build once
npm run build

# Watch mode
npm run dev
```

---

## 🆘 Troubleshooting

### Tests failing in CI but passing locally

- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Review CI logs for specific errors

### Semantic release not publishing

- Verify `NPM_TOKEN` is set correctly
- Check commit messages follow convention
- Ensure `main` branch is protected
- Review semantic-release logs

### npm publish fails

- Verify package name is available
- Check npm authentication
- Ensure version doesn't already exist
- Review package.json configuration

---

##  Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

##  Summary

Your Editium package now has:

- ✅ Automated testing on every push
- ✅ Multi-version Node.js support
- ✅ Automatic semantic versioning
- ✅ Changelog generation
- ✅ Automated npm publishing
- ✅ Security scanning
- ✅ Code coverage tracking
- ✅ Professional CI/CD pipeline

Happy shipping! 🚀

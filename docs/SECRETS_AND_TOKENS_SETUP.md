# GitHub Secrets & API Tokens Setup Guide

This document explains how to configure the required secrets for automated CI/CD workflows.

## Overview

| Secret | Required For | Auto-Available | Setup Required |
|--------|-------------|-----------------|-----------------|
| `GITHUB_TOKEN` | Release & Publish | ✅ Yes | ❌ No |
| `NPM_TOKEN` | npm Publishing | ❌ No | ✅ **Yes** |
| `CODECOV_TOKEN` | Coverage Upload | ❌ No | ❌ **Optional** |

## `GITHUB_TOKEN` ✅ (Built-in)

**Status:** Automatically provided by GitHub Actions. No setup needed.

**Used in:**
- Automated Release workflow (`release.yml`)
- Manual Publish workflow (`manual-publish.yml`)

**Permissions:** 
- Create GitHub releases
- Manage issues and pull requests
- Write to repository

## `NPM_TOKEN` ⚠️ (REQUIRED SETUP)

**Status:** Must be manually configured in GitHub repository settings.

### Step 1: Create npm Token

1. Go to [npmjs.com/settings/tokens](https://www    .npmjs.com/settings/tokens)
2. Click **"Generate New Token"**
3. Choose **"Granular access token"** (recommended for security)
4. **Token name:** `github-actions-editium`
5. **Expiration:** 12 months or more
6. **Permissions:** Select these scopes:
   - ✅ `Publish packages`
   - ✅ `Manage packages`
7. **Package access:** 
   - Select "Only select packages" → Choose `editium`
8. Click **"Generate token"**
9. **Copy the token** (you won't see it again!)

### Step 2: Add to GitHub Repository Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. **Name:** `NPM_TOKEN`
5. **Value:** Paste the token from Step 1
6. Click **"Add secret"**

✅ Done! The workflows can now publish to npm.

## `CODECOV_TOKEN` 🟡 (OPTIONAL)

**Status:** Optional. Only needed for private repositories.

**Used by:** Code coverage reporting in `test.yml`

### Why it's optional:
- Codecov can upload coverage data from public repositories **without authentication**
- If you want coverage tracking on private repos, you'll need a token
- Currently not needed for this project (public repo)

### If you want to set it up later:
1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Select your repository
4. Copy the **Repo Token** (if available)
5. Add to GitHub Secrets with name `CODECOV_TOKEN`

⚠️ **Note:** It's fine to leave this unconfigured for now. Coverage uploads will still work on the public repo.

## Verification

To verify secrets are properly configured:

```bash
# Check if tokens are available (you won't see the actual values)
# In GitHub: Settings > Secrets and variables > Actions
# Should show:
# ✅ NPM_TOKEN (required)
# 🟡 CODECOV_TOKEN (optional)
```

## Workflow-Specific Requirements

### `test.yml` (CI Tests)
- **Secrets needed:** None ✅
- **Triggers:** Push to main/develop, Pull requests
- **What it does:** 
  - Run tests on Node 18.x & 20.x
  - Build package
  - Upload coverage (optional, works without CODECOV_TOKEN)
- **Note:** Coverage upload continues even if it fails (safe to ignore errors)

### `release.yml` (Automated Release & Publish)
- **Secrets needed:** `NPM_TOKEN` ⚠️
- **Triggers:** Push to main branch (automatic)
- **What it does:** Automatic versioning, changelog, npm publish
- **Note:** Uses conventional commits to determine version bumps
  - `feat:` → Minor version
  - `fix:` → Patch version
  - `BREAKING CHANGE:` → Major version

### `manual-publish.yml` (Manual Publish)
- **Secrets needed:** `NPM_TOKEN` ⚠️
- **Triggers:** Manual via GitHub Actions UI
- **What it does:** Manually publish a specific version
- **Usage:**
  1. Go: GitHub Repo → Actions tab
  2. Select "Manual Publish to npm"
  3. Click "Run workflow"
  4. Enter version number
  5. Wait for completion

### `codeql.yml` (Security Analysis)
- **Secrets needed:** None ✅
- **Triggers:** Push, PR, Weekly schedule
- **What it does:** Security vulnerability scanning

### `dependency-review.yml` (Dependency Security)
- **Secrets needed:** None ✅
- **Triggers:** Pull requests
- **What it does:** Check for vulnerable dependencies

## Troubleshooting

### "403 Forbidden" error when publishing
**Problem:** NPM_TOKEN is not configured or invalid.
**Solution:** 
1. Verify `NPM_TOKEN` exists in repository secrets
2. Create a new token if the old one expired
3. Ensure your npm account owns the `editium` package

### "Unauthorized" during publish
**Problem:** Token has insufficient permissions.
**Solution:**
1. Delete the old token
2. Create a new **Granular access token** (not classic)
3. Ensure "Publish packages" permission is enabled
4. Update the secret in GitHub

### Workflow not triggering on push to main
**Problem:** Branch protection rules or workflow syntax error.
**Solution:**
1. Check GitHub branch protection settings
2. Review workflow YAML for syntax errors
3. Ensure branch name is exactly `main` (case-sensitive)

## Security Best Practices

✅ **DO:**
- Use **Granular access tokens** (more secure than classic)
- Set **expiration date** (12+ months recommended)
- Limit token to **specific packages** and **specific scopes**
- Rotate tokens **annually**
- Use **separate tokens** for different projects

❌ **DON'T:**
- Commit tokens to repository
- Use classic tokens (deprecated)
- Share tokens via Slack, email, or comments
- Set tokens to never expire
- Give all permissions if not needed

## Related Documentation

- [npm Token Documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Semantic Release Configuration](./.releaserc.json)
- [Conventional Commits](https://www.conventionalcommits.org/)

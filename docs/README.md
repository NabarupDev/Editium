# Editium Documentation

Welcome to the Editium documentation. This directory contains comprehensive guides for testing, CI/CD, and development.

## Documentation Index

### Getting Started

1. **[Quick Start: CI/CD Setup](./QUICK_START_CICD.md)**
   - Step-by-step setup guide
   - Configure npm token and GitHub Actions
   - Make your first release
   - **Start here if setting up CI/CD for the first time**

2. **[Setup Complete Guide](./SETUP_COMPLETE.md)**
   - Visual summary of the CI/CD setup
   - What was created and why
   - Example workflows
   - Quick reference commands

### CI/CD & Distribution

3. **[CI/CD Documentation](./CI_CD_DOCUMENTATION.md)** - **Complete Reference**
   - Detailed workflow explanations
   - GitHub Actions configuration
   - Semantic release setup
   - Commit message conventions
   - Troubleshooting guide
   - Monitoring and maintenance

4. **[CI/CD Setup Summary](./CICD_SETUP_SUMMARY.md)**
   - Overview of all CI/CD components
   - What you need to do next
   - Setup checklist
   - Quick links

### Testing

5. **[Testing Summary](./TESTING_SUMMARY.md)**
   - Test suite overview
   - 110 tests covering all features
   - How to run tests
   - Coverage information
   - Writing new tests

### Customization

6. **[Badges Guide](./BADGES.md)**
   - Status badges for README
   - npm, CI, coverage badges
   - Customization options
   - Example implementations

---

## Document Purpose Quick Reference

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **QUICK_START_CICD.md** | Quick setup | First-time CI/CD setup |
| **CI_CD_DOCUMENTATION.md** | Complete reference | Detailed info & troubleshooting |
| **SETUP_COMPLETE.md** | Visual overview | Understand what was created |
| **CICD_SETUP_SUMMARY.md** | Summary & checklist | Quick status check |
| **TESTING_SUMMARY.md** | Test info | Working with tests |
| **BADGES.md** | Badge examples | Adding status badges |

---

## Quick Links

### For First-Time Setup
1. Read [QUICK_START_CICD.md](./QUICK_START_CICD.md)
2. Follow the 3 required steps
3. Make your first commit with conventional format

### For Detailed Information
- See [CI_CD_DOCUMENTATION.md](./CI_CD_DOCUMENTATION.md)
- Complete workflows, troubleshooting, best practices

### For Testing
- See [TESTING_SUMMARY.md](./TESTING_SUMMARY.md)
- Run tests: `npm test`
- Coverage: `npm run test:coverage`

---

## Key Concepts

### Conventional Commits
```bash
feat: add new feature       # Minor version bump (1.0.0 → 1.1.0)
fix: bug fix               # Patch version bump (1.0.0 → 1.0.1)
docs: documentation        # No version bump
BREAKING CHANGE:           # Major version bump (1.0.0 → 2.0.0)
```

### Workflows Overview
- **test.yml** - Runs tests on every push/PR
- **release.yml** - Automatic releases on main branch
- **publish.yml** - Manual npm publishing
- **dependency-review.yml** - Security scanning
- **codeql.yml** - Code analysis

### Semantic Release
Automatically handles:
- Version bumping
- Changelog generation
- npm publishing
- GitHub releases
- Issue/PR commenting

---

## Need Help?

1. **Quick Setup Issues** - [QUICK_START_CICD.md](./QUICK_START_CICD.md) troubleshooting section
2. **Detailed Problems** - [CI_CD_DOCUMENTATION.md](./CI_CD_DOCUMENTATION.md) troubleshooting section
3. **Test Issues** - [TESTING_SUMMARY.md](./TESTING_SUMMARY.md)
4. **GitHub Issues** - [Report an Issue](https://github.com/NabarupDev/Editium/issues)

---

## Documentation Structure

```
docs/
├── README.md                      ← You are here
├── QUICK_START_CICD.md           ← Quick setup guide
├── CI_CD_DOCUMENTATION.md        ← Complete reference (70+ pages)
├── SETUP_COMPLETE.md             ← Visual summary
├── CICD_SETUP_SUMMARY.md         ← What you need to do
├── TESTING_SUMMARY.md            ← Test suite info
└── BADGES.md                     ← Status badges
```

---

## What's Included

### CI/CD Pipeline
- Automated testing (110 tests)  
- Multi-version Node.js support (16, 18, 20)  
- Semantic versioning  
- Automated npm publishing  
- Security scanning  
- Code coverage tracking  

### Documentation
- Complete setup guides  
- API reference  
- Examples and tutorials  
- Troubleshooting help  

---

**Start with [QUICK_START_CICD.md](./QUICK_START_CICD.md) to get up and running quickly.**

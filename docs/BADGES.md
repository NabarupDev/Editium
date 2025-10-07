# README Badge Guide

This guide provides status badges you can add to your main README.md file to display project information and build status.

---

## Available Badges

### Build Status
Shows the current status of your CI/CD pipeline.

```markdown
[![CI Tests](https://github.com/NabarupDev/Editium/actions/workflows/test.yml/badge.svg)](https://github.com/NabarupDev/Editium/actions/workflows/test.yml)
```

### npm Version
Displays the current version published on npm.

```markdown
[![npm version](https://badge.fury.io/js/editium.svg)](https://www.npmjs.com/package/editium)
```

or

```markdown
[![npm](https://img.shields.io/npm/v/editium.svg)](https://www.npmjs.com/package/editium)
```

### Downloads
Shows monthly download statistics from npm.

```markdown
[![npm downloads](https://img.shields.io/npm/dm/editium.svg)](https://www.npmjs.com/package/editium)
```

### License
Indicates the project's license type.

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### Code Coverage
Displays test coverage percentage (requires Codecov setup).

```markdown
[![codecov](https://codecov.io/gh/NabarupDev/Editium/branch/main/graph/badge.svg)](https://codecov.io/gh/NabarupDev/Editium)
```

### Bundle Size
Shows the minified and gzipped package size.

```markdown
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/editium)](https://bundlephobia.com/package/editium)
```

### Dependencies Status
Displays the status of package dependencies.

```markdown
[![Dependencies](https://img.shields.io/librariesio/release/npm/editium)](https://libraries.io/npm/editium)
```

### GitHub Stats
Shows repository statistics like stars, issues, and forks.

```markdown
[![GitHub stars](https://img.shields.io/github/stars/NabarupDev/Editium.svg?style=social)](https://github.com/NabarupDev/Editium/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/NabarupDev/Editium.svg)](https://github.com/NabarupDev/Editium/issues)
[![GitHub forks](https://img.shields.io/github/forks/NabarupDev/Editium.svg)](https://github.com/NabarupDev/Editium/network)
```

---

## Complete Badge Set

Copy this complete set to add all recommended badges at once:

```markdown
[![CI Tests](https://github.com/NabarupDev/Editium/actions/workflows/test.yml/badge.svg)](https://github.com/NabarupDev/Editium/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/editium.svg)](https://www.npmjs.com/package/editium)
[![npm downloads](https://img.shields.io/npm/dm/editium.svg)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/NabarupDev/Editium/branch/main/graph/badge.svg)](https://codecov.io/gh/NabarupDev/Editium)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/editium)](https://bundlephobia.com/package/editium)
```

---

## Recommended Placement

Add badges near the top of your README.md, typically:

1. **Right after the title** - Most common placement
2. **Below the description** - Alternative placement
3. **In a centered div** - For visual appeal

### Example 1: Simple Placement

```markdown
# Editium

[![CI Tests](https://github.com/NabarupDev/Editium/actions/workflows/test.yml/badge.svg)](https://github.com/NabarupDev/Editium/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/editium.svg)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful React rich text editor component built with Slate.js.
```

### Example 2: Centered Header

```markdown
<div align="center">

# Editium

**A powerful React rich text editor component built with Slate.js**

[![CI Tests](https://github.com/NabarupDev/Editium/actions/workflows/test.yml/badge.svg)](https://github.com/NabarupDev/Editium/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/editium.svg)](https://www.npmjs.com/package/editium)
[![npm downloads](https://img.shields.io/npm/dm/editium.svg)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
```

---

## Custom Badges

### Using Shields.io

Create custom badges at [shields.io](https://shields.io/):

```markdown
![Custom Badge](https://img.shields.io/badge/label-message-color)
```

**Examples:**

```markdown
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Status](https://img.shields.io/badge/status-stable-green)
```

### Using Badgen.net

Alternative service at [badgen.net](https://badgen.net/):

```markdown
![Custom](https://badgen.net/badge/label/message/color)
```

---

## Auto-Updating Badges

These badges automatically update when:

- **CI Badge**: Updates after each workflow run
- **npm Version**: Updates when you publish to npm
- **Downloads**: Updates daily with download statistics
- **Coverage**: Updates when coverage reports are uploaded
- **GitHub Stats**: Updates when repository metrics change

No manual intervention required!

---

## Badge Resources

- **Shields.io**: https://shields.io/
- **Badgen**: https://badgen.net/
- **Simple Icons**: https://simpleicons.org/ (for custom badge icons)
- **npm Badge**: https://badge.fury.io/for/js
- **Codecov**: https://codecov.io/

---

## Notes

- Badges are fetched dynamically, so they always show current data
- All badges link to their respective services for more details
- Choose badges that are relevant to your project
- Don't overload your README with too many badges - select the most important ones



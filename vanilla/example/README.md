# Editium Vanilla JavaScript Example

This folder contains a complete demo/example of how to use Editium in a vanilla JavaScript environment.

## Files

- **index.html** - Main demo page showcasing Editium features and installation methods
- **demo.css** - Styles for the demo page (not required for Editium itself)
- **demo.js** - Demo page functionality and example code

## Running the Example

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server
For a better experience, serve the files using a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8080
```

Then visit `http://localhost:8080` in your browser.

## What's Included

The demo page shows:
- ✅ Full-featured text editor with all toolbar options
- ✅ Installation instructions (NPM, Yarn, PNPM, CDN)
- ✅ Usage examples for both Vanilla JS and React
- ✅ Live interactive demo
- ✅ Single-file bundle option (recommended)
- ✅ Separate files option (more control)

## Quick Start

The simplest way to use Editium:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/editium/vanilla/editium.bundle.js"></script>
</head>
<body>
  <div id="editor"></div>
  <script>
    const editor = new Editium({
      container: document.getElementById('editor'),
      placeholder: 'Start typing...',
      toolbar: 'all'
    });
  </script>
</body>
</html>
```

## Learn More

- [Main Documentation](../README.md)
- [NPM Package](https://www.npmjs.com/package/editium)
- [GitHub Repository](https://github.com/NabarupDev/Editium)

<div align="center">

# Editium

[![npm version](https://img.shields.io/npm/v/editium.svg?style=flat-square)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/editium?style=flat-square)](https://bundlephobia.com/package/editium)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**Production-ready rich text editor for React and Vanilla JavaScript**

Modern • Lightweight • Customizable • Zero Dependencies (Vanilla)

[Quick Start](#quick-start) • [Documentation](#documentation) • [Examples](#examples) • [API Reference](#api-reference)

</div>

---

## Overview

Editium is a flexible rich text editor that works seamlessly in both **React** and **Vanilla JavaScript** environments. Built for developers who need a reliable, feature-rich editor without the complexity.

**Why Editium?**

- **Dual-Mode Support**: Same powerful features in React (Slate.js) and Vanilla JS (pure JavaScript)
- **Production Ready**: Battle-tested with comprehensive formatting tools and advanced features
- **Developer Experience**: Get from npm install to working editor in under 60 seconds
- **Export Flexibility**: HTML, JSON, and plain text output formats
- **Fully Customizable**: Configure exactly what you need, hide what you don't

---

## Quick Start

### React

```bash
npm install editium
```

```tsx
import { Editium } from 'editium';

function App() {
  return <Editium placeholder="Start typing..." toolbar="all" />;
}
```

### Vanilla JavaScript

**Single file - no build step required:**

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/editium@1.0.0/vanilla/editium.bundle.js"></script>
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

**[See live demo →](https://editium.vercel.app/)**

---

## Key Features

**Rich Text Editing**
- Comprehensive formatting: bold, italic, underline, strikethrough, code
- 8 heading levels, blockquotes, and code blocks
- Text and background colors
- Superscript and subscript

**Advanced Capabilities**
- Full table support with dynamic rows/columns
- Resizable images with custom upload handlers
- Bulleted and numbered lists with nesting
- Find and replace with match highlighting
- Text alignment (left, center, right, justify)

**Developer Experience**
- TypeScript support with full type definitions
- HTML and JSON export formats
- Customizable toolbar (show only what you need)
- Keyboard shortcuts for efficient editing
- Read-only mode for content display
- Word and character counting
- Fullscreen editing mode

**Framework Flexibility**
- **React**: Component-based with hooks support
- **Vanilla JS**: Zero dependencies, works anywhere
- Same API and features across both versions

---

## Installation

```bash
npm install editium
```

**Peer dependencies (React only):**
```bash
npm install react react-dom
```

**CDN (Vanilla JS):**
```html
<script src="https://unpkg.com/editium@1.0.0/vanilla/editium.bundle.js"></script>
```

---

## Documentation

### React Usage

**Basic Example**

```tsx
import { Editium } from 'editium';

function App() {
  return <Editium toolbar="all" placeholder="Start typing..." />;
}
```

**With Content Management**

```tsx
import React, { useState } from 'react';
import { Editium } from 'editium';

function Editor() {
  const [content, setContent] = useState({ html: '', json: [] });

  return (
    <Editium
      toolbar="all"
      onChange={(html, json) => setContent({ html, json })}
      showWordCount={true}
    />
  );
}
```

**Custom Toolbar**

```tsx
<Editium 
  toolbar={[
    'bold', 'italic', 'underline',
    'separator',
    'heading-one', 'heading-two',
    'separator',
    'bulleted-list', 'numbered-list',
    'link', 'image'
  ]}
/>
```

**[→ Full React Documentation](./react/README.md)**

### Vanilla JavaScript Usage

**CDN (Recommended)**

```html
<script src="https://unpkg.com/editium@1.0.0/vanilla/editium.bundle.js"></script>

<div id="editor"></div>

<script>
  const editor = new Editium({
    container: document.getElementById('editor'),
    toolbar: 'all',
    placeholder: 'Start typing...'
  });
  
  // Get content
  const html = editor.getHTML();
  const json = editor.getJSON();
</script>
```

**NPM**

```javascript
import 'editium/vanilla/editium.css';
import Editium from 'editium/vanilla/editium.js';

const editor = new Editium({
  container: document.getElementById('editor'),
  toolbar: 'all'
});
```

**[→ Full Vanilla JS Documentation](./vanilla/README.md)**

---

## API Reference

### React Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toolbar` | `ToolbarItem[] \| 'all'` | Basic items | Toolbar configuration |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `onChange` | `(html, json) => void` | - | Content change callback |
| `initialValue` | `string \| CustomElement[]` | - | Initial content |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `showWordCount` | `boolean` | `false` | Show word/character count |
| `height` | `string \| number` | `'200px'` | Editor height |
| `onImageUpload` | `(file: File) => Promise<string>` | - | Custom image upload |

### Vanilla JS Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | `HTMLElement` | required | DOM element for editor |
| `toolbar` | `string \| array` | `'all'` | Toolbar configuration |
| `placeholder` | `string` | `''` | Placeholder text |
| `onChange` | `function` | - | Content change callback |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `showWordCount` | `boolean` | `false` | Show word/character count |
| `height` | `string \| number` | `'200px'` | Editor height |
| `onImageUpload` | `function` | - | Custom image upload |

### Vanilla JS Methods

```javascript
editor.getHTML()        // Returns HTML string
editor.getText()        // Returns plain text
editor.getJSON()        // Returns JSON structure
editor.setContent(html) // Set editor content
editor.clear()          // Clear editor
editor.focus()          // Focus editor
editor.destroy()        // Cleanup editor
```

### Toolbar Items

Available items: `bold`, `italic`, `underline`, `strikethrough`, `code`, `superscript`, `subscript`, `heading-one` through `heading-eight`, `paragraph`, `blockquote`, `code-block`, `bulleted-list`, `numbered-list`, `indent`, `outdent`, `left`, `center`, `right`, `justify`, `text-color`, `bg-color`, `link`, `image`, `table`, `horizontal-rule`, `undo`, `redo`, `find-replace`, `fullscreen`, `view-output`, `separator`

---

## Examples

### Custom Image Upload

**React:**
```tsx
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', { 
    method: 'POST', 
    body: formData 
  });
  
  const { url } = await response.json();
  return url;
};

<Editium onImageUpload={handleImageUpload} />
```

**Vanilla JS:**
```javascript
const editor = new Editium({
  container: document.getElementById('editor'),
  onImageUpload: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/upload', { 
      method: 'POST', 
      body: formData 
    });
    const { url } = await response.json();
    return url;
  }
});
```

### Saving Content

**React:**
```tsx
function EditorWithSave() {
  const [content, setContent] = useState({ html: '', json: [] });

  const handleSave = async () => {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
  };

  return (
    <>
      <Editium onChange={(html, json) => setContent({ html, json })} />
      <button onClick={handleSave}>Save</button>
    </>
  );
}
```

**Vanilla JS:**
```javascript
const editor = new Editium({
  container: document.getElementById('editor'),
  onChange: (content) => {
    localStorage.setItem('content', JSON.stringify({
      html: content.html,
      json: content.json
    }));
  }
});
```

### Height Configuration

```tsx
// React
<Editium height={400} minHeight={200} maxHeight={600} />

// Vanilla JS
new Editium({
  container: document.getElementById('editor'),
  height: '400px',
  minHeight: '200px',
  maxHeight: '600px'
});
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + U` | Underline |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Y` | Redo |
| `Ctrl/Cmd + K` | Insert link |
| `F11` | Fullscreen |
| `Tab` | Indent list |
| `Shift + Tab` | Outdent list |

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Community & Support

**Get Help**
- [GitHub Issues](https://github.com/NabarupDev/Editify/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/NabarupDev/Editify/discussions) - Questions and community support

**Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code of Conduct**

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

Copyright © 2025 [Nabarup Dev](https://github.com/NabarupDev)

---

## Acknowledgments

- Built with [Slate.js](https://www.slatejs.org/) for the React version
- Inspired by modern rich text editors: TipTap, ProseMirror, and Quill

---

<div align="center">

**Made with ❤️ by [Nabarup Dev](https://github.com/NabarupDev)**

⭐ **Star us on [GitHub](https://github.com/NabarupDev/Editify)** if you find this project useful!

[NPM](https://www.npmjs.com/package/editium) • [GitHub](https://github.com/NabarupDev/Editify) • [Issues](https://github.com/NabarupDev/Editify/issues)

</div>

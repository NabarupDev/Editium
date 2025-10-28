# Editium Vanilla JavaScript Editor

A lightweight, powerful rich text editor built with pure vanilla JavaScript. Zero dependencies, framework-agnostic, and production-ready.

## Features

- **Zero Dependencies** - Pure vanilla JavaScript, no external frameworks required
- **Lightweight** - Minimal footprint with maximum functionality
- **Rich Text Editing** - Comprehensive formatting options (bold, italic, underline, strikethrough, etc.)
- **Advanced Features** - Tables, images, code blocks, and more
- **Customizable** - Flexible toolbar and styling options
- **Production Ready** - Battle-tested and reliable
- **Multiple Formats** - Export to HTML, plain text, or JSON
- **Keyboard Shortcuts** - Efficient editing with standard shortcuts
- **Responsive** - Works seamlessly on all screen sizes
- **Accessible** - ARIA support and keyboard navigation

## Installation

### CDN (Recommended)

**Single Bundle** - All-in-one file including JavaScript, CSS, and icons:

```html
<script src="https://unpkg.com/editium@1.0.0/vanilla/editium.bundle.js"></script>
```

**Alternative CDNs:**
```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/editium.bundle.js"></script>
```

**Separate Files** - For more control:

```html
<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/editium@1.0.0/vanilla/editium.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
<script src="https://unpkg.com/editium@1.0.0/vanilla/editium.js"></script>

<!-- jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/editium.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/editium.js"></script>
```

### NPM

```bash
npm install editium
```

```javascript
import 'editium/vanilla/editium.css';
import Editium from 'editium/vanilla/editium.js';

const editor = new Editium({
  container: document.getElementById('editor'),
  placeholder: 'Start typing...',
  toolbar: 'all'
});
```

### Self-Hosted

Download the files from the [GitHub repository](https://github.com/NabarupDev/Editium) and include them in your project:

```html
<link rel="stylesheet" href="path/to/editium.css">
<script src="path/to/editium.js"></script>
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editium Editor</title>
  <script src="https://unpkg.com/editium@1.0.0/vanilla/editium.bundle.js"></script>
</head>
<body>
  <div id="editor"></div>

  <script>
    const editor = new Editium({
      container: document.getElementById('editor'),
      placeholder: 'Start typing...',
      toolbar: 'all',
      showWordCount: true
    });
  </script>
</body>
</html>
```

## Configuration

### Options

```javascript
const editor = new Editium({
  container: document.getElementById('editor'),
  placeholder: 'Start typing...',
  toolbar: 'all',
  showWordCount: true,
  readOnly: false,
  className: 'custom-class',
  height: '300px',
  minHeight: '200px',
  maxHeight: '400px',
  onChange: (content) => {
    console.log('Content changed:', content);
  },
  onImageUpload: async (file) => {
    const url = await uploadToServer(file);
    return url;
  }
});
```

### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | HTMLElement | required | DOM element to attach the editor |
| `placeholder` | string | `''` | Placeholder text when editor is empty |
| `toolbar` | string \| array | `'all'` | Toolbar configuration ('all' or array of items) |
| `showWordCount` | boolean | `false` | Display word and character count |
| `readOnly` | boolean | `false` | Make editor read-only |
| `className` | string | `''` | Custom CSS class for wrapper |
| `height` | string \| number | `'200px'` | Default editor height |
| `minHeight` | string \| number | `'150px'` | Minimum height before content shrinks |
| `maxHeight` | string \| number | `'250px'` | Maximum height before scrolling |
| `onChange` | function | `null` | Callback when content changes |
| `onImageUpload` | function | `null` | Custom image upload handler |

### Height Configuration

Heights can be specified as strings (`'300px'`, `'20rem'`, `'50vh'`) or numbers (`300` converts to `'300px'`).

```javascript
const editor = new Editium({
  container: document.getElementById('editor'),
  height: 400,
  minHeight: 200,
  maxHeight: 600
});
```

## Toolbar

### Predefined Toolbar

```javascript
toolbar: 'all'
```

### Custom Toolbar

```javascript
toolbar: [
  'bold', 'italic', 'underline',
  'separator',
  'heading-one', 'heading-two',
  'separator',
  'bulleted-list', 'numbered-list',
  'separator',
  'link', 'image', 'table',
  'separator',
  'undo', 'redo'
]
```

### Available Items

#### Text Formatting
- `bold`, `italic`, `underline`, `strikethrough`
- `code`, `superscript`, `subscript`

#### Block Formats
- `paragraph`
- `heading-one`, `heading-two`, `heading-three`, `heading-four`, `heading-five`, `heading-six`
- `blockquote`, `code-block`

#### Alignment
- `left`, `center`, `right`, `justify`

#### Colors
- `text-color`, `bg-color`

#### Lists
- `bulleted-list`, `numbered-list`
- `indent`, `outdent`

#### Insert
- `link`, `image`, `table`, `horizontal-rule`

#### History
- `undo`, `redo`

#### View
- `preview`, `view-html`, `view-json`, `find-replace`, `fullscreen`

#### Other
- `separator`

## API

```javascript
// Get content
const html = editor.getHTML();
const text = editor.getText();
const json = editor.getJSON();

// Set content
editor.setContent('<p>New content</p>');

// Clear and focus
editor.clear();
editor.focus();

// Cleanup
editor.destroy();
```

## Usage Examples

### Basic Editor

```html
<div id="basic-editor"></div>

<script>
  const basicEditor = new Editium({
    container: document.getElementById('basic-editor'),
    placeholder: 'Write something...',
    toolbar: ['bold', 'italic', 'underline', 'separator', 'link']
  });
</script>
```

### Full-Featured Editor

```html
<div id="full-editor"></div>

<script>
  const fullEditor = new Editium({
    container: document.getElementById('full-editor'),
    placeholder: 'Start writing your document...',
    toolbar: 'all',
    showWordCount: true,
    onChange: (content) => {
      console.log('Content updated:', content.html);
    }
  });
</script>
```

### Read-Only Viewer

```html
<div id="viewer"></div>

<script>
  const viewer = new Editium({
    container: document.getElementById('viewer'),
    readOnly: true,
    toolbar: []
  });
  
  viewer.setContent('<h1>Document Title</h1><p>Document content...</p>');
</script>
```

## Advanced Features

### Custom Image Upload Handler

```html
<div id="editor-with-upload"></div>

<script>
  const editorWithUpload = new Editium({
    container: document.getElementById('editor-with-upload'),
    toolbar: 'all',
    onImageUpload: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      return data.url;
    }
  });
</script>
```

### Saving and Loading Content

```html
<div id="editor"></div>
<button onclick="saveContent()">Save</button>

<script>
  const editor = new Editium({
    container: document.getElementById('editor'),
    toolbar: 'all'
  });
  
  function saveContent() {
    const content = {
      html: editor.getHTML(),
      text: editor.getText(),
      json: editor.getJSON()
    };
    
    localStorage.setItem('editorContent', JSON.stringify(content));
    
    // Or send to server
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
  }
  
  // Load saved content
  const savedContent = localStorage.getItem('editorContent');
  if (savedContent) {
    const content = JSON.parse(savedContent);
    editor.setContent(content.html);
  }
</script>
```

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `F11` - Toggle fullscreen
- `Ctrl/Cmd + F` - Find & Replace

## Customization

Custom styling example:

```css
/* Customize wrapper */
.editium-wrapper {
  border: 2px solid #007bff;
  border-radius: 8px;
}

/* Customize toolbar */
.editium-toolbar {
  background-color: #f0f0f0;
}

/* Customize editor area */
.editium-editor {
  min-height: 300px;
  font-size: 16px;
  line-height: 1.8;
}

/* Custom placeholder color */
.editium-editor:empty:before {
  color: #999;
}
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Links

- **NPM Package**: https://www.npmjs.com/package/editium
- **GitHub Repository**: https://github.com/NabarupDev/Editium
- **Issues**: https://github.com/NabarupDev/Editium/issues
- **unpkg CDN**: https://unpkg.com/editium@1.0.0/vanilla/
- **jsDelivr CDN**: https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/

## License

MIT License - See [LICENSE](../LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a Pull Request.

---

Made with ❤️ by [NabarupDev](https://github.com/NabarupDev)

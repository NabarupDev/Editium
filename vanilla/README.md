# Editium Vanilla JavaScript Editor

A powerful, feature-rich rich text editor built with vanilla JavaScript. No dependencies, no frameworks - just pure JavaScript.

## 🚀 Quick Start

### CDN Usage (Recommended)

The vanilla version is included in the main `editium` npm package and can be accessed via unpkg or jsDelivr CDN.

#### Using unpkg

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editium Editor</title>
  
  <!-- Font Awesome (required for icons) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  
  <!-- Editium CSS -->
  <link rel="stylesheet" href="https://unpkg.com/editium@1.0.0/vanilla/editium.css">
</head>
<body>
  <div id="editor"></div>

  <!-- Editium JS -->
  <script src="https://unpkg.com/editium@1.0.0/vanilla/editium.js"></script>
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

#### Using jsDelivr

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editium Editor</title>
  
  <!-- Font Awesome (required for icons) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  
  <!-- Editium CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/editium.css">
</head>
<body>
  <div id="editor"></div>

  <!-- Editium JS -->
  <script src="https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/editium.js"></script>
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

### NPM Installation

The vanilla version is included when you install the main editium package:

```bash
npm install editium
```

```javascript
// Import the vanilla version files
import 'editium/vanilla/editium.css';
import Editium from 'editium/vanilla/editium.js';

const editor = new Editium({
  container: document.getElementById('editor'),
  placeholder: 'Start typing...',
  toolbar: 'all'
});
```

### Download and Self-Host

Download the files directly from the repository and include them in your project:

```html
<link rel="stylesheet" href="path/to/editium.css">
<script src="path/to/editium.js"></script>
```

## 📚 Configuration Options

```javascript
const editor = new Editium({
  container: document.getElementById('editor'),  // Required: DOM element
  placeholder: 'Start typing...',                // Optional: Placeholder text
  toolbar: 'all',                                // Optional: 'all' or array of items
  showWordCount: true,                           // Optional: Show word/character count
  readOnly: false,                               // Optional: Make editor read-only
  className: 'custom-class',                     // Optional: Custom CSS class
  
  // Height configuration (can be string or number)
  height: '300px',                               // Optional: Default '200px' (or number: 300)
  minHeight: '200px',                            // Optional: Default '150px' (or number: 200)
  maxHeight: '400px',                            // Optional: Default '250px' (or number: 400)
  
  onChange: (content) => {                       // Optional: Content change callback
    console.log('Content changed:', content);
  },
  onImageUpload: async (file) => {              // Optional: Custom image upload
    // Upload file to your server
    const url = await uploadToServer(file);
    return url;
  }
});
```

### Height Configuration

You can control the editor's dimensions using these options:

- **`height`**: Sets the default height of the editor (default: `'200px'`)
- **`minHeight`**: Sets the minimum height before content can shrink (default: `'150px'`)
- **`maxHeight`**: Sets the maximum height before scrolling appears (default: `'250px'`)

Heights can be specified as:
- **String**: `'300px'`, `'20rem'`, `'50vh'`, etc.
- **Number**: `300` (automatically converted to `'300px'`)

Example:
```javascript
const editor = new Editium({
  container: document.getElementById('editor'),
  height: 400,        // 400px tall
  minHeight: 200,     // Won't shrink below 200px
  maxHeight: 600,     // Will scroll after 600px
});
```

## 🎨 Toolbar Options

### Using All Features

```javascript
toolbar: 'all'
```

### Custom Toolbar

```javascript
toolbar: [
  'bold', 'italic', 'underline',           // Text formatting
  'separator',
  'heading-one', 'heading-two',            // Headings
  'separator',
  'bulleted-list', 'numbered-list',        // Lists
  'separator',
  'link', 'image', 'table',                // Insert elements
  'separator',
  'undo', 'redo'                           // History
]
```

### Available Toolbar Items

**Text Formatting:**
- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underline text
- `strikethrough` - Strikethrough text
- `code` - Inline code
- `superscript` - Superscript
- `subscript` - Subscript

**Block Formats:**
- `paragraph` - Normal paragraph
- `heading-one` to `heading-six` - H1 to H6
- `blockquote` - Quote block
- `code-block` - Code block

**Alignment:**
- `left` - Align left
- `center` - Align center
- `right` - Align right
- `justify` - Justify text

**Colors:**
- `text-color` - Text color picker
- `bg-color` - Background color picker

**Lists:**
- `bulleted-list` - Unordered list
- `numbered-list` - Ordered list
- `indent` - Increase indent
- `outdent` - Decrease indent

**Insert:**
- `link` - Insert/edit link
- `image` - Insert image
- `table` - Insert table
- `horizontal-rule` - Horizontal line

**History:**
- `undo` - Undo changes
- `redo` - Redo changes

**View:**
- `preview` - Preview content
- `view-html` - View HTML source
- `view-json` - View JSON representation
- `find-replace` - Find and replace
- `fullscreen` - Toggle fullscreen

**Separator:**
- `separator` - Visual separator in toolbar

## 🔧 API Methods

```javascript
// Get content in different formats
const html = editor.getHTML();        // Get HTML content
const text = editor.getText();        // Get plain text
const json = editor.getJSON();        // Get JSON representation

// Set content
editor.setContent('<p>New content</p>');

// Clear editor
editor.clear();

// Focus editor
editor.focus();

// Destroy editor instance
editor.destroy();
```

## 📝 Examples

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

### With Custom Image Upload

```html
<div id="editor-with-upload"></div>

<script>
  const editorWithUpload = new Editium({
    container: document.getElementById('editor-with-upload'),
    toolbar: 'all',
    onImageUpload: async (file) => {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload to your server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      return data.url; // Return the uploaded image URL
    }
  });
</script>
```

### Saving Content

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
    
    // Save to localStorage
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

## 🎯 Features

- ✅ **No Dependencies** - Pure vanilla JavaScript
- ✅ **Rich Text Editing** - Bold, italic, underline, strikethrough, and more
- ✅ **Headings** - H1 through H6 support
- ✅ **Lists** - Bulleted and numbered lists with indent/outdent
- ✅ **Links** - Insert and edit hyperlinks
- ✅ **Images** - Insert, resize, and align images
- ✅ **Tables** - Create and edit tables
- ✅ **Colors** - Text and background color pickers
- ✅ **Code Blocks** - Inline code and code blocks
- ✅ **Alignment** - Left, center, right, and justify
- ✅ **Find & Replace** - Search and replace text
- ✅ **Fullscreen Mode** - Distraction-free editing
- ✅ **Word Count** - Track words and characters
- ✅ **Undo/Redo** - Full history support
- ✅ **Export** - HTML, plain text, and JSON formats
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Customizable** - Flexible toolbar configuration
- ✅ **Accessible** - Keyboard shortcuts and ARIA support

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `F11` - Toggle fullscreen
- `Ctrl/Cmd + F` - Find & Replace

## 🎨 Styling

The editor comes with default styling that you can customize using CSS:

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

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- GitHub Issues: [https://github.com/NabarupDev/Editify/issues](https://github.com/NabarupDev/Editify/issues)
- Repository: [https://github.com/NabarupDev/Editify](https://github.com/NabarupDev/Editify)

## 🔗 Links

- **unpkg CDN**: `https://unpkg.com/editium@1.0.0/vanilla/`
- **jsDelivr CDN**: `https://cdn.jsdelivr.net/npm/editium@1.0.0/vanilla/`
- **NPM Package**: `https://www.npmjs.com/package/editium`
- **GitHub**: `https://github.com/NabarupDev/Editify`

---

Made with ❤️ by [NabarupDev](https://github.com/NabarupDev)

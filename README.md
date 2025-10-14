<div align="center">

# Editium

[![npm version](https://img.shields.io/npm/v/editium.svg?style=flat-square)](https://www.npmjs.com/package/editium)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/editium?style=flat-square)](https://bundlephobia.com/package/editium)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**A powerful and feature-rich React rich text editor component built with Slate.js**

[Live Demo](https://editium.vercel.app/) •
[Quick Start](#quick-start) •
[Installation](#installation) •
[Features](#features) •
[API](#api-reference)

</div>

<br />

## Overview

Editium is a modern, extensible rich text editor designed for React applications. Built on top of Slate.js, it provides a flexible and customizable editing experience with a comprehensive set of formatting tools, block-level elements, and advanced features. The editor supports both HTML and JSON output formats, making it suitable for content management systems, document editors, blogging platforms, and any application requiring rich text editing capabilities.

## Features

### Text Formatting
- **Inline Styles**: Bold, italic, underline, strikethrough, superscript, subscript
- **Code Formatting**: Inline code with syntax highlighting
- **Text Colors**: Custom text colors and background colors
- **Typography**: Multiple heading levels (H1-H8)

### Block Elements
- **Lists**: Bulleted and numbered lists with nested support
- **Blockquotes**: Quote formatting for emphasized content
- **Code Blocks**: Multi-line code blocks with proper formatting
- **Horizontal Rules**: Visual section separators
- **Text Alignment**: Left, center, right, and justify alignment options

### Advanced Features
- **Tables**: Full table support with add/remove rows and columns
- **Images**: Resizable images with alignment options and custom upload handlers
- **Links**: Hyperlink management with title and target attributes
- **Find & Replace**: Built-in search functionality with match highlighting
- **Undo/Redo**: Complete history management
- **Fullscreen Mode**: Distraction-free editing experience
- **Word & Character Count**: Real-time content statistics
- **Keyboard Shortcuts**: Efficient editing with standard shortcuts (Ctrl+B, Ctrl+I, etc.)

### Output Formats
- **HTML Export**: Clean, semantic HTML output
- **JSON Export**: Structured document format for storage and processing

## Installation

```bash
npm install editium
```

### Peer Dependencies

Editium requires React 16.8.0 or higher:

```bash
npm install react react-dom
```

## Quick Start

### With All Toolbar Items

The simplest way to get started with all features enabled. Use `"all"` to include every available toolbar item:

```tsx
import { Editium } from 'editium';

function FullFeaturedEditor() {
  return (
    <Editium
      toolbar="all"
      placeholder="Start typing..."
      showWordCount={true}
    />
  );
}
```

This automatically includes all available toolbar items in a logical, organized order.

### Basic Usage

A minimal setup with just the onChange handler:

```tsx
import React, { useState } from 'react';
import { Editium } from 'editium';

function App() {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [jsonOutput, setJsonOutput] = useState([]);

  const handleChange = (html, json) => {
    setHtmlOutput(html);
    setJsonOutput(json);
  };

  return (
    <div>
      <Editium
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;
```

### With Custom Toolbar

Customize the toolbar by selecting only the items you need:

```tsx
import { Editium } from 'editium';

function MyEditor() {
  return (
    <Editium
      toolbar={[
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'separator',
        'heading-one',
        'heading-two',
        'separator',
        'bulleted-list',
        'numbered-list',
        'separator',
        'link',
        'image',
        'table',
        'separator',
        'text-color',
        'bg-color',
        'separator',
        'find-replace',
        'fullscreen',
        'view-output'
      ]}
      placeholder="Write something amazing..."
      showWordCount={true}
    />
  );
}
```

### With Initial Content

```tsx
import { Editium } from 'editium';

const initialContent = [
  {
    type: 'heading-one',
    children: [{ text: 'Welcome to Editium' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'This is a ' },
      { text: 'powerful', bold: true },
      { text: ' rich text editor.' },
    ],
  },
];

function EditorWithContent() {
  return <Editium initialValue={initialContent} />;
}
```

### With Image Upload Handler

```tsx
import { Editium } from 'editium';

function EditorWithImages() {
  const handleImageUpload = async (file) => {
    // Upload to your server or cloud storage
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.imageUrl; // Return the uploaded image URL
  };

  return (
    <Editium
      onImageUpload={handleImageUpload}
      toolbar={['bold', 'italic', 'image']}
    />
  );
}
```

### Custom Height Configuration

Control the editor's height for different use cases:

**Fixed Height:**
```tsx
<Editium
  toolbar={['bold', 'italic', 'underline']}
  height={400}  // Fixed height of 400px
  placeholder="Editor with fixed height..."
/>
```

**Responsive Height with Min/Max:**
```tsx
<Editium
  toolbar={['bold', 'italic', 'underline', 'link']}
  minHeight="150px"  // Minimum height
  maxHeight="500px"  // Maximum height
  placeholder="Editor grows between 150px and 500px..."
/>
```

**Using String Values:**
```tsx
<Editium
  height="60vh"  // Viewport-relative height
  placeholder="Editor takes 60% of viewport height..."
/>
```

## Output Format

### HTML Output

Editium generates clean, semantic HTML that can be rendered directly in web applications:

```html
<h1>Document Title</h1>
<p>This is a <strong>bold</strong> paragraph with <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
    <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
  </tr>
</table>
```

### JSON Output

The structured JSON format preserves the complete document structure:

```json
[
  {
    "type": "heading-one",
    "children": [{ "text": "Document Title" }]
  },
  {
    "type": "paragraph",
    "children": [
      { "text": "This is a " },
      { "text": "bold", "bold": true },
      { "text": " paragraph with " },
      { "text": "italic", "italic": true },
      { "text": " text." }
    ]
  }
]
```

## API Reference

### EditiumProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string \| CustomElement[]` | `undefined` | Initial content for the editor |
| `onChange` | `(html: string, json: CustomElement[]) => void` | `undefined` | Callback fired when content changes |
| `toolbar` | `ToolbarItem[] \| 'all'` | Basic toolbar | Array of toolbar items to display, or `'all'` for all items |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text for empty editor |
| `className` | `string` | `''` | Additional CSS class for the editor container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for the editor container |
| `readOnly` | `boolean` | `false` | Makes the editor read-only |
| `onImageUpload` | `(file: File) => Promise<string>` | `undefined` | Handler for image uploads, returns image URL |
| `searchQuery` | `string` | `undefined` | External search query for controlled search |
| `searchMatches` | `Array` | `undefined` | External search matches for controlled search |
| `currentMatchIndex` | `number` | `undefined` | External current match index for controlled search |
| `showWordCount` | `boolean` | `false` | Display word and character count |
| `height` | `string \| number` | `'200px'` | Height for the editor (e.g., '400px' or 400) |
| `minHeight` | `string \| number` | `'150px'` | Minimum height for the editor |
| `maxHeight` | `string \| number` | `'250px'` | Maximum height for the editor |

### Toolbar Items

You can customize the toolbar by providing an array of toolbar items, or use `'all'` to include all available items.

**Using all toolbar items:**
```tsx
<Editium toolbar="all" />
```

**Custom selection of toolbar items:**

Available toolbar items:

**Text Formatting:**
- `'bold'` - Bold text
- `'italic'` - Italic text
- `'underline'` - Underlined text
- `'strikethrough'` - Strikethrough text
- `'superscript'` - Superscript text
- `'subscript'` - Subscript text
- `'code'` - Inline code

**Block Elements:**
- `'heading-one'` through `'heading-eight'` - Heading levels
- `'paragraph'` - Paragraph
- `'bulleted-list'` - Bulleted list
- `'numbered-list'` - Numbered list
- `'blockquote'` - Blockquote
- `'code-block'` - Code block
- `'horizontal-rule'` - Horizontal rule

**Alignment:**
- `'left'` - Align left
- `'center'` - Align center
- `'right'` - Align right
- `'justify'` - Justify text

**Advanced:**
- `'link'` - Insert/edit links
- `'image'` - Insert images
- `'table'` - Insert tables
- `'text-color'` - Text color picker
- `'bg-color'` - Background color picker
- `'find-replace'` - Find and replace
- `'indent'` - Increase indent
- `'outdent'` - Decrease indent
- `'undo'` - Undo action
- `'redo'` - Redo action
- `'fullscreen'` - Toggle fullscreen mode
- `'view-output'` - View HTML/JSON output
- `'separator'` - Visual separator in toolbar

**Importing ALL_TOOLBAR_ITEMS:**

If you need to programmatically access all toolbar items, you can import the constant:

```tsx
import { Editium, ALL_TOOLBAR_ITEMS } from 'editium';

// Use all items
<Editium toolbar="all" />

// Or customize by filtering
const customToolbar = ALL_TOOLBAR_ITEMS.filter(item => item !== 'separator');
<Editium toolbar={customToolbar} />
```

### Custom Types

```typescript
interface CustomElement {
  type: BlockType;
  url?: string;
  align?: AlignmentType;
  children: CustomText[];
}

interface CustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  backgroundColor?: string;
}

interface LinkElement {
  type: 'link';
  url: string;
  title?: string;
  target?: '_blank' | '_self';
  children: CustomText[];
}

interface ImageElement {
  type: 'image';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  align?: AlignmentType;
  children: CustomText[];
}
```

## Keyboard Shortcuts

- `Ctrl+B` / `Cmd+B` - Bold
- `Ctrl+I` / `Cmd+I` - Italic
- `Ctrl+U` / `Cmd+U` - Underline
- `Ctrl+D` / `Cmd+D` - Strikethrough
- `Ctrl+\`` / `Cmd+\`` - Code
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` or `Ctrl+Shift+Z` - Redo
- `F11` - Toggle fullscreen
- `Escape` - Exit fullscreen
- `Delete` / `Backspace` - Delete selected images

## Utility Functions

Editium exports several utility functions for advanced use cases:

```typescript
import {
  serializeToHtml,
  toggleMark,
  toggleBlock,
  insertLink,
  insertTable,
  findAllMatches,
  replaceMatch,
  replaceAllMatches,
} from 'editium';
```

## Browser Support

Editium supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! If you'd like to contribute to Editium, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing code style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Live Demo**: [https://editium.vercel.app/](https://editium.vercel.app/)
- **npm Package**: [https://www.npmjs.com/package/editium](https://www.npmjs.com/package/editium)
- **GitHub Repository**: [https://github.com/NabarupDev/Editium](https://github.com/NabarupDev/Editium)
- **Issue Tracker**: [https://github.com/NabarupDev/Editium/issues](https://github.com/NabarupDev/Editium/issues)

## Acknowledgments

Built with [Slate.js](https://www.slatejs.org/) - a completely customizable framework for building rich text editors.

---

<div align="center">

**Developed with ❤️ by [Nabarup](https://github.com/NabarupDev)**

<br />

⭐ **If you find this project useful, please consider giving it a star on [GitHub](https://github.com/NabarupDev/Editium)!** ⭐

</div>

# Editium React Component

A powerful, feature-rich rich text editor component for React applications. Built with Slate.js framework for robust document editing.

## Features

- **React Component** - Drop-in component for React applications
- **TypeScript Support** - Full type definitions included
- **Zero Config** - Works out of the box with sensible defaults
- **Rich Text Editing** - Comprehensive formatting options
- **Advanced Features** - Tables, images, code blocks, and more
- **Customizable Toolbar** - Configure which tools to show
- **Production Ready** - Battle-tested and reliable
- **Multiple Export Formats** - HTML and JSON output
- **Keyboard Shortcuts** - Efficient editing workflow
- **Responsive** - Works on all screen sizes
- **Accessible** - ARIA support and keyboard navigation

## Installation

```bash
npm install editium
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { Editium } from 'editium';

function App() {
  const [content, setContent] = useState('');

  const handleChange = (html: string, json: any) => {
    setContent(html);
  };

  return (
    <Editium
      placeholder="Start typing..."
      onChange={handleChange}
      toolbar="all"
      showWordCount={true}
    />
  );
}

export default App;
```

## Props

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string \| CustomElement[]` | `[{ type: 'paragraph', children: [{ text: '' }] }]` | Initial editor content |
| `onChange` | `(html: string, json: CustomElement[]) => void` | `undefined` | Callback when content changes |
| `toolbar` | `ToolbarItem[] \| 'all'` | `'all'` | Toolbar configuration |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text when empty |
| `className` | `string` | `''` | Custom CSS class for wrapper |
| `style` | `React.CSSProperties` | `{}` | Inline styles for wrapper |
| `readOnly` | `boolean` | `false` | Make editor read-only |
| `onImageUpload` | `(file: File) => Promise<string>` | `undefined` | Custom image upload handler |
| `searchQuery` | `string` | `''` | Search query for highlighting |
| `searchMatches` | `Array` | `[]` | Search match locations |
| `currentMatchIndex` | `number` | `0` | Current search match index |
| `showWordCount` | `boolean` | `true` | Display word/character count |
| `height` | `string \| number` | `'200px'` | Editor height |
| `minHeight` | `string \| number` | `'150px'` | Minimum height |
| `maxHeight` | `string \| number` | `'250px'` | Maximum height |

## Toolbar Configuration

### Predefined Toolbar

```tsx
<Editium toolbar="all" />
```

### Custom Toolbar

```tsx
<Editium 
  toolbar={[
    'bold', 'italic', 'underline',
    'separator',
    'heading-one', 'heading-two',
    'separator',
    'bulleted-list', 'numbered-list',
    'separator',
    'link', 'image', 'table',
    'separator',
    'undo', 'redo'
  ]} 
/>
```

### Available Items

#### Text Formatting
- `bold`, `italic`, `underline`, `strikethrough`
- `code`, `superscript`, `subscript`

#### Block Formats
- `paragraph`
- `heading-one`, `heading-two`, `heading-three`, `heading-four`, `heading-five`, `heading-six`, `heading-seven`, `heading-eight`
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

#### Utilities
- `find-replace`, `fullscreen`, `view-output`

#### Other
- `separator`

## Usage Examples

### Basic Editor

```tsx
import { Editium } from 'editium';

function BasicEditor() {
  return (
    <Editium 
      placeholder="Write something..."
      toolbar={['bold', 'italic', 'underline', 'separator', 'link']}
    />
  );
}
```

### Controlled Component

```tsx
import React, { useState } from 'react';
import { Editium } from 'editium';

function ControlledEditor() {
  const [html, setHtml] = useState('');
  const [json, setJson] = useState(null);

  const handleChange = (htmlContent: string, jsonContent: any) => {
    setHtml(htmlContent);
    setJson(jsonContent);
  };

  return (
    <div>
      <Editium onChange={handleChange} toolbar="all" />
      <div>
        <h3>HTML Output:</h3>
        <pre>{html}</pre>
      </div>
    </div>
  );
}
```

### With Initial Content

```tsx
import { Editium } from 'editium';

function EditorWithContent() {
  const initialContent = [
    {
      type: 'heading-one',
      children: [{ text: 'Welcome to Editium' }]
    },
    {
      type: 'paragraph',
      children: [{ text: 'Start editing your document here.' }]
    }
  ];

  return <Editium initialValue={initialContent} />;
}
```

### Read-Only Mode

```tsx
import { Editium } from 'editium';

function DocumentViewer() {
  const content = [
    {
      type: 'heading-one',
      children: [{ text: 'Document Title' }]
    },
    {
      type: 'paragraph',
      children: [{ text: 'This is a read-only document.' }]
    }
  ];

  return (
    <Editium 
      initialValue={content}
      readOnly={true}
      toolbar={[]}
    />
  );
}
```

## Advanced Features

### Custom Image Upload

```tsx
import { Editium } from 'editium';

function EditorWithUpload() {
  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    return data.url;
  };

  return (
    <Editium 
      onImageUpload={handleImageUpload}
      toolbar="all"
    />
  );
}
```

### Saving Content

```tsx
import React, { useState, useRef } from 'react';
import { Editium } from 'editium';

function EditorWithSave() {
  const [savedHtml, setSavedHtml] = useState('');
  const [savedJson, setSavedJson] = useState(null);

  const handleChange = (html: string, json: any) => {
    setSavedHtml(html);
    setSavedJson(json);
  };

  const handleSave = async () => {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: savedHtml, json: savedJson })
    });
  };

  return (
    <div>
      <Editium onChange={handleChange} toolbar="all" />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
}
```

### Custom Styling

```tsx
import { Editium } from 'editium';

function StyledEditor() {
  return (
    <Editium 
      className="my-editor"
      style={{ 
        border: '2px solid #007bff',
        borderRadius: '8px'
      }}
      height="400px"
      minHeight="200px"
      maxHeight="600px"
    />
  );
}
```

### Height Configuration

```tsx
import { Editium } from 'editium';

function CustomHeightEditor() {
  return (
    <Editium 
      height={400}
      minHeight={200}
      maxHeight={600}
    />
  );
}
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import { Editium, CustomElement, EditiumProps } from 'editium';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello World' }]
  }
];

const EditorComponent: React.FC = () => {
  const editorProps: EditiumProps = {
    initialValue,
    placeholder: 'Type here...',
    toolbar: 'all',
    showWordCount: true
  };

  return <Editium {...editorProps} />;
};
```

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `Ctrl/Cmd + K` - Insert link
- `Tab` - Indent list item
- `Shift + Tab` - Outdent list item

## Customization

Custom CSS example:

```css
/* Global styles */
.editium-wrapper {
  font-family: 'Inter', sans-serif;
}

/* Toolbar styling */
.editium-toolbar {
  background: linear-gradient(to bottom, #f9f9f9, #f0f0f0);
  border-bottom: 1px solid #ddd;
}

/* Editor area */
.editium-editor {
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
}

/* Toolbar buttons */
.editium-toolbar button {
  transition: all 0.2s ease;
}

.editium-toolbar button:hover {
  background-color: #e0e0e0;
}

.editium-toolbar button.active {
  background-color: #007bff;
  color: white;
}
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Links

- **NPM Package**: https://www.npmjs.com/package/editium
- **GitHub Repository**: https://github.com/NabarupDev/Editify
- **Issues**: https://github.com/NabarupDev/Editify/issues

## License

MIT License - See [LICENSE](../LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a Pull Request.

---

Made with ❤️ by [NabarupDev](https://github.com/NabarupDev)

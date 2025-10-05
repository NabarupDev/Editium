# Editify

A modern, lightweight, and highly customizable rich text editor component for React applications, built with [Slate.js](https://slatejs.org/).

**Created by:** [Nabarup Roy](mailto:nabaruproy.dev@gmail.com)

## Features

- **Modern React Component** - Built with React hooks and TypeScript
- **Slate.js Powered** - Leverages the powerful and extensible Slate.js framework
- **Comprehensive Formatting** - Complete text formatting suite with professional toolbar
- **Advanced Typography** - Bold, italic, underline, strikethrough, superscript, subscript, and inline code
- **Multiple Heading Levels** - Support for H1 through H8 headings
- **Text Alignment** - Left, center, right, and justify alignment options
- **List Management** - Bulleted and numbered lists with indent/outdent functionality
- **Professional UI** - Organized toolbar with separators and dropdown groupings
- **Modern Icons** - Heroicons integration for clean, professional appearance
- **Flexible Output** - Export content as HTML or JSON
- **TypeScript Support** - Full TypeScript definitions included
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Accessible** - Built with accessibility best practices
- **Controllable** - Fully controlled component with external state management
- **Keyboard Shortcuts** - Comprehensive keyboard shortcuts (Ctrl+B/I/U/D/Z/Y, etc.)
- **Undo/Redo Support** - Built-in history management

## Installation

```bash
npm install editify
# or
yarn add editify
# or
pnpm add editify
```

### Peer Dependencies

Editify requires React and Heroicons as peer dependencies:

```bash
npm install react react-dom @heroicons/react
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { Editify } from 'editify';

function MyEditor() {
  const [content, setContent] = useState('');

  const handleChange = (html: string, json: any) => {
    setContent(html);
    console.log('JSON:', json); // Raw Slate.js JSON
  };

  return (
    <Editify
      initialValue="Start typing here..."
      onChange={handleChange}
      placeholder="Enter your text..."
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string \| CustomElement[]` | `""` | Initial content as string or Slate.js JSON |
| `onChange` | `(html: string, json: CustomElement[]) => void` | `undefined` | Callback fired when content changes |
| `toolbar` | `ToolbarItem[]` | All available items | Array of toolbar items to display |
| `placeholder` | `string` | `"Start typing..."` | Placeholder text when editor is empty |
| `className` | `string` | `""` | CSS class name for the editor container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for the editor |
| `readOnly` | `boolean` | `false` | Whether the editor is read-only |

### Toolbar Items

Available toolbar items with full organization:

#### Document Structure
- **Headings**: `'heading-one'`, `'heading-two'`, `'heading-three'`, `'heading-four'`, `'heading-five'`, `'heading-six'`, `'heading-seven'`, `'heading-eight'`
- **Paragraph**: `'paragraph'`

#### Text Formatting
- **Basic**: `'bold'`, `'italic'`, `'underline'`, `'strikethrough'`
- **Advanced**: `'superscript'`, `'subscript'`, `'code'`

#### Text Alignment
- **Alignment**: `'align-left'`, `'align-center'`, `'align-right'`, `'align-justify'`

#### Lists and Organization
- **Lists**: `'bulleted-list'`, `'numbered-list'`
- **Indentation**: `'indent'`, `'outdent'`

#### History
- **Actions**: `'undo'`, `'redo'`

#### Special Elements
- **Separator**: `'separator'` (for organizing toolbar groups)

### TypeScript Types

```tsx
import { EditifyProps, CustomElement, ToolbarItem, FormatType, BlockType, AlignmentType } from 'editify';

// Text formatting types
type FormatType = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'superscript' | 'subscript' | 'code';

// Block element types
type BlockType = 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'heading-seven' | 'heading-eight' | 'bulleted-list' | 'numbered-list' | 'list-item';

// Text alignment types
type AlignmentType = 'left' | 'center' | 'right' | 'justify';

// Complete toolbar item types
type ToolbarItem = FormatType | BlockType | 'align-left' | 'align-center' | 'align-right' | 'align-justify' | 'indent' | 'outdent' | 'undo' | 'redo' | 'separator';

// Main component props
interface EditifyProps {
  initialValue?: string | CustomElement[];
  onChange?: (value: string, jsonValue: CustomElement[]) => void;
  toolbar?: ToolbarItem[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
}
```

## Examples

### Basic Usage

```tsx
import { Editify } from 'editify';

function BasicEditor() {
  return (
    <Editify
      initialValue="Welcome to Editify!"
      onChange={(html, json) => {
        console.log('HTML:', html);
        console.log('JSON:', json);
      }}
    />
  );
}
```

### Professional Editor with Complete Toolbar

```tsx
import { Editify } from 'editify';

function ProfessionalEditor() {
  return (
    <Editify
      initialValue="Professional rich text editor"
      toolbar={[
        // Document Structure
        'paragraph', 'heading-one', 'heading-two', 'heading-three', 
        'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight',
        'separator',
        // Text Formatting
        'bold', 'italic', 'underline', 'strikethrough',
        'separator',
        // Advanced Formatting
        'superscript', 'subscript', 'code',
        'separator',
        // Alignment
        'align-left', 'align-center', 'align-right', 'align-justify',
        'separator',
        // Lists
        'bulleted-list', 'numbered-list', 'indent', 'outdent',
        'separator',
        // History
        'undo', 'redo'
      ]}
      placeholder="Start creating professional content..."
    />
  );
}
```

### Custom Toolbar Configuration

```tsx
import { Editify } from 'editify';

function CustomToolbar() {
  return (
    <Editify
      initialValue="Text with custom formatting options"
      toolbar={[
        'bold', 'italic', 'underline',
        'separator',
        'heading-one', 'heading-two',
        'separator', 
        'bulleted-list', 'numbered-list'
      ]}
      placeholder="Start typing..."
    />
  );
}
```

### Minimal Editor (No Toolbar)

```tsx
import { Editify } from 'editify';

function MinimalEditor() {
  return (
    <Editify
      initialValue="Simple editor without toolbar"
      toolbar={[]} // Empty toolbar
      placeholder="Type here..."
    />
  );
}
```

### Working with Complex Content

```tsx
import { Editify, CustomElement } from 'editify';

function ComplexContentEditor() {
  const initialContent: CustomElement[] = [
    {
      type: 'heading-one',
      alignment: 'center',
      children: [{ text: 'Advanced Document' }],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'This document showcases ' },
        { text: 'advanced formatting', bold: true },
        { text: ' including ' },
        { text: 'mathematical expressions', italic: true },
        { text: ' like E=mc' },
        { text: '²', superscript: true },
        { text: ' and chemical formulas like H' },
        { text: '₂', subscript: true },
        { text: 'O.' },
      ],
    },
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'First level item' }],
        },
        {
          type: 'list-item',
          children: [
            { 
              type: 'bulleted-list',
              children: [
                {
                  type: 'list-item',
                  children: [{ text: 'Nested item' }],
                }
              ]
            }
          ]
        },
      ],
    },
  ];

  return (
    <Editify
      initialValue={initialContent}
      onChange={(html, json) => {
        // Save both formats
        localStorage.setItem('content-html', html);
        localStorage.setItem('content-json', JSON.stringify(json));
      }}
    />
  );
}
```

## Keyboard Shortcuts

Editify supports comprehensive keyboard shortcuts for efficient editing:

### Text Formatting
- **Bold**: `Ctrl+B` (Windows/Linux) or `Cmd+B` (Mac)
- **Italic**: `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
- **Underline**: `Ctrl+U` (Windows/Linux) or `Cmd+U` (Mac)
- **Strikethrough**: `Ctrl+D` (Windows/Linux) or `Cmd+D` (Mac)

### History Management
- **Undo**: `Ctrl+Z` (Windows/Linux) or `Cmd+Z` (Mac)
- **Redo**: `Ctrl+Y` (Windows/Linux) or `Cmd+Y` (Mac)

### List Management
- **Indent**: Use the toolbar indent button (→)
- **Outdent**: Use the toolbar outdent button (←)

## Styling and Customization

### Default Appearance

Editify comes with a clean, professional design featuring:
- Modern toolbar with organized button groups
- Visual separators between toolbar sections
- Professional Heroicons for all actions
- Responsive layout that adapts to different screen sizes
- Clean typography with proper spacing

### Custom Styling

Customize the editor's appearance using `className` and `style` props:

```tsx
import { Editify } from 'editify';
import './custom-editor.css';

function StyledEditor() {
  return (
    <Editify
      className="custom-editor"
      style={{
        border: '2px solid #0066cc',
        borderRadius: '8px',
        fontFamily: 'Georgia, serif',
      }}
      initialValue="Beautifully styled editor"
    />
  );
}
```

```css
/* custom-editor.css */
.custom-editor {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #fafafa;
}

.custom-editor [data-slate-editor] {
  min-height: 300px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* Customize toolbar */
.custom-editor .toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
}

.custom-editor .toolbar button {
  color: white;
}
```

## Advanced Usage

### Utility Functions

Editify exports utility functions for advanced use cases:

```tsx
import { 
  serializeToHtml, 
  toggleMark,
  toggleBlock,
  toggleAlignment,
  indentListItem,
  outdentListItem,
  isMarkActive,
  isBlockActive,
  isAlignmentActive
} from 'editify';

// Convert Slate.js JSON to HTML
const html = serializeToHtml(slateJsonContent);

// Programmatically format text
toggleMark(editor, 'bold');
toggleBlock(editor, 'heading-one');
toggleAlignment(editor, 'center');

// Check formatting state
const isBold = isMarkActive(editor, 'bold');
const isHeading = isBlockActive(editor, 'heading-one');
const isCentered = isAlignmentActive(editor, 'center');
```

### Form Integration

```tsx
import { Editify } from 'editify';
import { useState } from 'react';

function DocumentEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content,
          contentType: 'html'
        }),
      });
      
      if (response.ok) {
        alert('Document saved successfully!');
        setTitle('');
        setContent('');
      }
    } catch (error) {
      alert('Error saving document');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="title">Document Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Content:</label>
        <div style={{ marginTop: '5px' }}>
          <Editify
            onChange={(html) => setContent(html)}
            placeholder="Write your document content here..."
            toolbar={[
              'heading-one', 'heading-two', 'heading-three', 'paragraph',
              'separator',
              'bold', 'italic', 'underline',
              'separator',
              'align-left', 'align-center', 'align-right',
              'separator',
              'bulleted-list', 'numbered-list', 'indent', 'outdent'
            ]}
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting || !title.trim() || !content.trim()}
        style={{
          background: '#0066cc',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? 'Saving...' : 'Save Document'}
      </button>
    </form>
  );
}
```

## Development

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Install peer dependencies: `npm install @heroicons/react`
4. Build the package: `npm run build`

### Running Examples

```bash
cd example
npm install
npm run dev
```

### Building

```bash
npm run build        # Build for production
npm run build:watch  # Build in watch mode for development
```

### Testing

The package includes a comprehensive example application that demonstrates all features. Use this for testing and development.

## Browser Support

Editify supports all modern browsers:
- Chrome 70+
- Firefox 70+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

For questions, suggestions, or collaboration opportunities, feel free to reach out:
- **Email**: [nabaruproy.dev@gmail.com](mailto:nabaruproy.dev@gmail.com)
- **GitHub Issues**: For bug reports and feature requests

### Development Guidelines

1. Follow TypeScript best practices
2. Maintain accessibility standards
3. Test across different browsers
4. Update documentation for new features
5. Follow existing code style and patterns

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Slate.js** - The powerful framework that makes this editor possible
- **Heroicons** - Beautiful icons for the professional toolbar
- **React** - The foundation for modern UI development

## Author

**Nabarup Roy**  
Email: [nabaruproy.dev@gmail.com](mailto:nabaruproy.dev@gmail.com)

Built with modern web technologies and best practices for professional content creation.
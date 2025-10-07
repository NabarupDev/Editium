# Editium Test Suite

This directory contains comprehensive test cases for the Editium rich text editor component.

## Test Files

### 1. `utils.test.ts`
Tests for utility functions including:
- Mark operations (bold, italic, underline, etc.)
- Block operations (paragraphs, headings, lists, etc.)
- HTML serialization
- Text utilities (word count, character count)
- Image URL validation
- Alignment operations

### 2. `ResizableImage.test.tsx`
Tests for the ResizableImage component:
- Image rendering with correct attributes
- Resize handle functionality
- Image alignment
- Loading behavior
- Drag prevention

### 3. `TableElement.test.tsx`
Tests for table components:
- TableComponent rendering
- Table alignment styles
- TableRowComponent rendering
- TableCellComponent rendering
- Cell borders and padding

### 4. `Toolbar.test.tsx`
Tests for the Toolbar component:
- All toolbar button rendering
- Formatting buttons (bold, italic, underline, etc.)
- Alignment controls
- List controls
- Insert buttons (image, table, link, etc.)
- Custom toolbar configurations
- Undo/redo functionality
- Find & replace
- Fullscreen mode

### 5. `Editium.test.tsx`
Tests for the main Editium editor component:
- Editor initialization
- Custom placeholders and styles
- ReadOnly mode
- Text formatting rendering (bold, italic, underline, etc.)
- Block elements (headings, blockquotes, code blocks)
- Lists (bulleted and numbered)
- Images and links
- Tables
- Text colors and alignment
- Multiple content blocks
- onChange callback
- Custom toolbar configurations

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Configuration

- **Framework**: Vitest
- **Testing Library**: @testing-library/react
- **Environment**: jsdom
- **Setup File**: `setup.ts` (configures @testing-library/jest-dom matchers)

## Coverage

The test suite provides coverage for:
- ✅ Utility functions
- ✅ Component rendering
- ✅ User interactions
- ✅ Edge cases
- ✅ HTML serialization
- ✅ All formatting options
- ✅ Block elements
- ✅ Inline elements
- ✅ Tables and images

## Writing New Tests

When adding new tests, follow these patterns:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';

describe('YourComponent', () => {
  let editor: any;

  beforeEach(() => {
    editor = withHistory(withReact(createEditor()));
    editor.children = [
      {
        type: 'paragraph',
        children: [{ text: 'Test content' }],
      },
    ];
  });

  it('should render correctly', () => {
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <YourComponent />
      </Slate>
    );
    
    expect(container).toBeTruthy();
  });
});
```

## Notes

- Some tests check for component rendering rather than internal Slate state changes, as Slate's state management requires user interactions in a real browser environment
- DOM nesting warnings for table elements are expected when testing components in isolation
- Tests focus on verifying that components render correctly and handle props appropriately

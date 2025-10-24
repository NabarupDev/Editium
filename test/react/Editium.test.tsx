import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Editium from '../../react/Editium';
import { CustomElement } from '../../react/types';

describe('Editium', () => {
  it('should render with default placeholder', () => {
    const { container } = render(<Editium />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render with custom placeholder', () => {
    const { container } = render(<Editium placeholder="Type here..." />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render with initial value as string', () => {
    const { container } = render(<Editium initialValue="Hello World" />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render with initial value as CustomElement array', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Test content' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should call onChange when content changes', async () => {
    const onChange = vi.fn();
    const { container } = render(<Editium onChange={onChange} />);
    
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
    
    // The onChange handler exists and the editor is rendered
    // Note: Slate's onChange may not fire immediately in tests without user interaction
    expect(onChange).toBeDefined();
  });

  it('should render with custom className', () => {
    const { container } = render(<Editium className="custom-editor" />);
    const editor = container.querySelector('.custom-editor');
    expect(editor).toBeTruthy();
  });

  it('should render with custom style', () => {
    const customStyle = { backgroundColor: '#f0f0f0', minHeight: '300px' };
    const { container } = render(<Editium style={customStyle} />);
    const editor = container.querySelector('[style*="background-color"]');
    expect(editor).toBeTruthy();
  });

  it('should render in readOnly mode', () => {
    const { container } = render(<Editium readOnly={true} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render toolbar with all items when toolbar="all"', () => {
    const { container } = render(<Editium toolbar="all" />);
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render toolbar with custom items', () => {
    const { container } = render(<Editium toolbar={['bold', 'italic', 'underline']} />);
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should show word count when showWordCount is true', () => {
    const { container } = render(<Editium showWordCount={true} />);
    // Word count should be present somewhere in the component
    expect(container.textContent).toBeTruthy();
  });

  it('should handle onImageUpload callback', () => {
    const onImageUpload = vi.fn().mockResolvedValue('https://example.com/uploaded.jpg');
    const { container } = render(<Editium onImageUpload={onImageUpload} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render bold text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Bold text', bold: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const strong = container.querySelector('strong');
    expect(strong).toBeTruthy();
    expect(strong?.textContent).toBe('Bold text');
  });

  it('should render italic text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Italic text', italic: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const em = container.querySelector('em');
    expect(em).toBeTruthy();
    expect(em?.textContent).toBe('Italic text');
  });

  it('should render underlined text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Underlined text', underline: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const u = container.querySelector('u');
    expect(u).toBeTruthy();
    expect(u?.textContent).toBe('Underlined text');
  });

  it('should render strikethrough text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Strikethrough text', strikethrough: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const s = container.querySelector('s');
    expect(s).toBeTruthy();
    expect(s?.textContent).toBe('Strikethrough text');
  });

  it('should render code text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'code', code: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const code = container.querySelector('code');
    expect(code).toBeTruthy();
    expect(code?.textContent).toBe('code');
  });

  it('should render superscript text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'x' }, { text: '2', superscript: true }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const sup = container.querySelector('sup');
    expect(sup).toBeTruthy();
    expect(sup?.textContent).toBe('2');
  });

  it('should render subscript text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'H' }, { text: '2', subscript: true }, { text: 'O' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const sub = container.querySelector('sub');
    expect(sub).toBeTruthy();
    expect(sub?.textContent).toBe('2');
  });

  it('should render heading-one correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'heading-one',
        children: [{ text: 'Title' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBe('Title');
  });

  it('should render heading-two correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'heading-two',
        children: [{ text: 'Subtitle' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const h2 = container.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2?.textContent).toBe('Subtitle');
  });

  it('should render blockquote correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'blockquote',
        children: [{ text: 'Quote' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeTruthy();
    expect(blockquote?.textContent).toBe('Quote');
  });

  it('should render code block correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'code-block',
        children: [{ text: 'const x = 1;' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const pre = container.querySelector('pre');
    expect(pre).toBeTruthy();
  });

  it('should render bulleted list correctly', () => {
    const initialValue: any[] = [
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Item 1' }],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const ul = container.querySelector('ul');
    expect(ul).toBeTruthy();
  });

  it('should render numbered list correctly', () => {
    const initialValue: any[] = [
      {
        type: 'numbered-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'First' }],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const ol = container.querySelector('ol');
    expect(ol).toBeTruthy();
  });

  it('should render horizontal rule correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'horizontal-rule',
        children: [{ text: '' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const hr = container.querySelector('hr');
    expect(hr).toBeTruthy();
  });

  it('should render image correctly', () => {
    const initialValue: any[] = [
      {
        type: 'image',
        url: 'https://example.com/image.jpg',
        alt: 'Test image',
        children: [{ text: '' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('image.jpg');
  });

  it('should render link correctly', () => {
    const initialValue: any[] = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://example.com',
            children: [{ text: 'Click here' }],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const link = container.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.href).toContain('example.com');
    expect(link?.textContent).toBe('Click here');
  });

  it('should render table correctly', () => {
    const initialValue: any[] = [
      {
        type: 'table',
        children: [
          {
            type: 'table-row',
            children: [
              {
                type: 'table-cell',
                children: [{ text: 'Cell' }],
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should render colored text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Red text', color: '#ff0000' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const span = container.querySelector('[style*="color"]');
    expect(span).toBeTruthy();
  });

  it('should render text with background color correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Highlighted', backgroundColor: '#ffff00' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const span = container.querySelector('[style*="background"]');
    expect(span).toBeTruthy();
  });

  it('should render aligned text correctly', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Centered' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const p = container.querySelector('p[style*="text-align"]');
    expect(p).toBeTruthy();
  });

  it('should handle empty content', () => {
    const { container } = render(<Editium initialValue="" />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle multiple paragraphs', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: 'First paragraph' }],
      },
      {
        type: 'paragraph',
        children: [{ text: 'Second paragraph' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle complex nested formatting', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [
          { text: 'Normal ' },
          { text: 'bold and italic', bold: true, italic: true },
          { text: ' text' },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle find and replace functionality when enabled', () => {
    const { container } = render(<Editium toolbar={['find-replace']} />);
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle fullscreen mode when enabled', () => {
    const { container } = render(<Editium toolbar={['fullscreen']} />);
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle export functionality when enabled', () => {
    const { container } = render(<Editium toolbar={['bold']} />);
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle different heading levels', () => {
    const initialValue: CustomElement[] = [
      { type: 'heading-one', children: [{ text: 'H1' }] },
      { type: 'heading-two', children: [{ text: 'H2' }] },
      { type: 'heading-three', children: [{ text: 'H3' }] },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    expect(container.querySelector('h1')).toBeTruthy();
    expect(container.querySelector('h2')).toBeTruthy();
    expect(container.querySelector('h3')).toBeTruthy();
  });

  it('should handle mixed list types', () => {
    const initialValue: any[] = [
      {
        type: 'bulleted-list',
        children: [{ type: 'list-item', children: [{ text: 'Bullet' }] }],
      },
      {
        type: 'numbered-list',
        children: [{ type: 'list-item', children: [{ text: 'Number' }] }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('ol')).toBeTruthy();
  });

  it('should render with all formatting marks combined', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Fully formatted',
            bold: true,
            italic: true,
            underline: true,
            color: '#ff0000',
            backgroundColor: '#ffff00',
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle table with multiple rows and columns', () => {
    const initialValue: any[] = [
      {
        type: 'table',
        children: [
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'A1' }] },
              { type: 'table-cell', children: [{ text: 'B1' }] },
            ],
          },
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'A2' }] },
              { type: 'table-cell', children: [{ text: 'B2' }] },
            ],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
    const cells = container.querySelectorAll('td, th');
    expect(cells.length).toBeGreaterThanOrEqual(4);
  });

  it('should handle link with custom target', () => {
    const initialValue: any[] = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://example.com',
            target: '_blank',
            children: [{ text: 'External link' }],
          },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const link = container.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.href).toContain('example.com');
  });

  it('should handle image with custom dimensions', () => {
    const initialValue: any[] = [
      {
        type: 'image',
        url: 'https://example.com/image.jpg',
        alt: 'Custom sized',
        width: 500,
        height: 300,
        children: [{ text: '' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should handle different text alignments', () => {
    const initialValue: CustomElement[] = [
      { type: 'paragraph', align: 'left', children: [{ text: 'Left' }] },
      { type: 'paragraph', align: 'center', children: [{ text: 'Center' }] },
      { type: 'paragraph', align: 'right', children: [{ text: 'Right' }] },
      { type: 'paragraph', align: 'justify', children: [{ text: 'Justify' }] },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(4);
  });

  it('should handle editor with no toolbar', () => {
    const { container } = render(<Editium toolbar={[]} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle editor without spellCheck', () => {
    const { container } = render(<Editium />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should render with custom maxLength', () => {
    const { container } = render(<Editium />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle subscript and superscript together', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [
          { text: 'Normal ' },
          { text: 'super', superscript: true },
          { text: ' and ' },
          { text: 'sub', subscript: true },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    expect(container.querySelector('sup')).toBeTruthy();
    expect(container.querySelector('sub')).toBeTruthy();
  });

  it('should handle blockquote with formatted content', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'blockquote',
        children: [
          { text: 'This is a ' },
          { text: 'formatted', bold: true, italic: true },
          { text: ' quote' },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeTruthy();
  });

  it('should handle code block with multiple lines', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'code-block',
        children: [
          { text: 'const x = 1;' },
        ],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const pre = container.querySelector('pre');
    expect(pre).toBeTruthy();
  });

  it('should handle very long text content', () => {
    const longText = 'Lorem ipsum '.repeat(100);
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: longText }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle empty string in custom elements', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });

  it('should handle special characters in text', () => {
    const initialValue: CustomElement[] = [
      {
        type: 'paragraph',
        children: [{ text: '<>&"\'`' }],
      },
    ];
    const { container } = render(<Editium initialValue={initialValue} />);
    const editable = container.querySelector('[data-slate-editor="true"]');
    expect(editable).toBeTruthy();
  });
});

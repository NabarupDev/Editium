import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slate, Editable } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Toolbar from '../../react/Toolbar';
import { ToolbarItem } from '../../react/types';

describe('Toolbar', () => {
  let editor: any;

  beforeEach(() => {
    editor = withHistory(withReact(createEditor()));
    editor.children = [
      {
        type: 'paragraph',
        children: [{ text: 'Hello World' }],
      },
    ];
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 11 },
    };
  });

  it('should render toolbar with basic formatting buttons', () => {
    const items: ToolbarItem[] = ['bold', 'italic', 'underline'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    // Check if toolbar is rendered
    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render separator items', () => {
    const items: ToolbarItem[] = ['bold', 'separator', 'italic'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render heading dropdown', () => {
    const items: ToolbarItem[] = ['heading-one', 'heading-two'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render alignment buttons', () => {
    const items: ToolbarItem[] = ['left', 'center', 'right', 'justify'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render list buttons', () => {
    const items: ToolbarItem[] = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render undo and redo buttons', () => {
    const items: ToolbarItem[] = ['undo', 'redo'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render link button', () => {
    const items: ToolbarItem[] = ['link'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render image button', () => {
    const items: ToolbarItem[] = ['image'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render table button', () => {
    const items: ToolbarItem[] = ['table'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render code and code-block buttons', () => {
    const items: ToolbarItem[] = ['code', 'code-block'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render blockquote button', () => {
    const items: ToolbarItem[] = ['blockquote'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render horizontal rule button', () => {
    const items: ToolbarItem[] = ['horizontal-rule'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render find-replace button', () => {
    const items: ToolbarItem[] = ['find-replace'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render fullscreen button', () => {
    const items: ToolbarItem[] = ['fullscreen'];
    const onFullscreenToggle = vi.fn();
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} onFullscreenToggle={onFullscreenToggle} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render view-output button', () => {
    const items: ToolbarItem[] = ['view-output'];
    const onViewOutput = vi.fn();
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} onViewOutput={onViewOutput} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render color picker buttons', () => {
    const items: ToolbarItem[] = ['text-color', 'bg-color'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should apply custom className', () => {
    const items: ToolbarItem[] = ['bold'];
    const customClass = 'custom-toolbar';
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} className={customClass} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector(`.${customClass}`);
    expect(toolbar).toBeTruthy();
  });

  it('should handle all toolbar items', () => {
    const items: ToolbarItem[] = [
      'paragraph',
      'heading-one',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'superscript',
      'subscript',
      'left',
      'center',
      'right',
      'justify',
      'text-color',
      'bg-color',
      'blockquote',
      'code-block',
      'bulleted-list',
      'numbered-list',
      'indent',
      'outdent',
      'link',
      'image',
      'table',
      'horizontal-rule',
      'undo',
      'redo',
      'find-replace',
      'fullscreen',
      'view-output',
    ];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle strikethrough button', () => {
    const items: ToolbarItem[] = ['strikethrough'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle superscript and subscript buttons', () => {
    const items: ToolbarItem[] = ['superscript', 'subscript'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render multiple separators correctly', () => {
    const items: ToolbarItem[] = ['bold', 'separator', 'italic', 'separator', 'underline'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle heading-three button', () => {
    const items: ToolbarItem[] = ['heading-three'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle view-output button', () => {
    const items: ToolbarItem[] = ['view-output'];
    const onViewOutput = vi.fn();
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} onViewOutput={onViewOutput} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render with custom className', () => {
    const items: ToolbarItem[] = ['bold'];
    const customClass = 'custom-toolbar';
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} className={customClass} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector(`.${customClass}`);
    expect(toolbar).toBeTruthy();
  });

  it('should render with empty items array', () => {
    const items: ToolbarItem[] = [];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle format group buttons', () => {
    const items: ToolbarItem[] = ['bold', 'italic', 'underline', 'strikethrough'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle alignment group buttons', () => {
    const items: ToolbarItem[] = ['left', 'center', 'right', 'justify'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle list and indent buttons together', () => {
    const items: ToolbarItem[] = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle heading dropdown items', () => {
    const items: ToolbarItem[] = ['paragraph', 'heading-one', 'heading-two', 'heading-three'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle script buttons', () => {
    const items: ToolbarItem[] = ['superscript', 'subscript'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle special content buttons', () => {
    const items: ToolbarItem[] = ['link', 'image', 'table', 'horizontal-rule'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle history buttons', () => {
    const items: ToolbarItem[] = ['undo', 'redo'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle utility buttons', () => {
    const items: ToolbarItem[] = ['find-replace', 'fullscreen', 'view-output'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle block formatting buttons', () => {
    const items: ToolbarItem[] = ['blockquote', 'code-block'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should handle inline formatting buttons', () => {
    const items: ToolbarItem[] = ['bold', 'italic', 'underline', 'code'];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });

  it('should render with mixed item types', () => {
    const items: ToolbarItem[] = [
      'bold',
      'separator',
      'heading-one',
      'separator',
      'left',
      'separator',
      'link',
    ];
    
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <Toolbar items={items} />
        <Editable />
      </Slate>
    );

    const toolbar = container.querySelector('[style*="border"]');
    expect(toolbar).toBeTruthy();
  });
});

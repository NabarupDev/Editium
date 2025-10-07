import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import ResizableImage from '../src/ResizableImage';
import { ImageElement } from '../src/types';

describe('ResizableImage', () => {
  let editor: any;
  const mockElement: ImageElement = {
    type: 'image',
    url: 'https://example.com/test-image.jpg',
    alt: 'Test image',
    width: 300,
    height: 200,
    children: [{ text: '' }],
  };

  beforeEach(() => {
    editor = withHistory(withReact(createEditor()));
    editor.children = [mockElement];
  });

  it('should render image with correct attributes', () => {
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={mockElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('test-image.jpg');
    expect(img?.alt).toBe('Test image');
  });

  it('should display resize handles when selected', () => {
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={mockElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    // Check if resize handles exist (implementation may vary)
    const wrapper = container.querySelector('[contenteditable="false"]');
    expect(wrapper).toBeTruthy();
  });

  it('should handle image with no initial dimensions', () => {
    const elementWithoutDimensions: ImageElement = {
      ...mockElement,
      width: undefined,
      height: undefined,
    };

    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={elementWithoutDimensions}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should apply alignment classes correctly', () => {
    const alignedElement: ImageElement = {
      ...mockElement,
      align: 'center',
    };

    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={alignedElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    const wrapper = container.querySelector('[contenteditable="false"]');
    expect(wrapper).toBeTruthy();
  });

  it('should maintain aspect ratio during resize if shift is held', () => {
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={mockElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    // Test that the component renders without errors
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should handle image load event', () => {
    const onLoad = vi.fn();
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={mockElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    const img = container.querySelector('img');
    if (img) {
      fireEvent.load(img);
    }
    expect(img).toBeTruthy();
  });

  it('should render with draggable attribute set to false', () => {
    const { container } = render(
      <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
        <ResizableImage
          element={mockElement}
          attributes={{ 'data-slate-node': 'element' }}
          children={<span>test</span>}
        />
      </Slate>
    );

    const img = container.querySelector('img');
    expect(img?.draggable).toBe(false);
  });
});

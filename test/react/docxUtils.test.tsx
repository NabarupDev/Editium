import { describe, it, expect, vi, beforeEach } from 'vitest';
import { importFromDocx, exportToDocx } from '../../react/docxUtils';
import { CustomElement } from '../../react/types';

// Mock mammoth
vi.mock('mammoth', () => ({
  default: {
    convertToHtml: vi.fn(),
  },
}));

// Mock docx library
vi.mock('docx', () => ({
  Document: vi.fn(),
  Paragraph: vi.fn(),
  TextRun: vi.fn(),
  HeadingLevel: {
    HEADING_1: 'Heading1',
    HEADING_2: 'Heading2',
    HEADING_3: 'Heading3',
    HEADING_4: 'Heading4',
    HEADING_5: 'Heading5',
    HEADING_6: 'Heading6',
  },
  AlignmentType: {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    JUSTIFIED: 'both',
  },
  Packer: {
    toBlob: vi.fn(),
  },
  Table: vi.fn(),
  TableRow: vi.fn(),
  TableCell: vi.fn(),
  WidthType: {
    PERCENTAGE: 'percentage',
  },
  BorderStyle: {
    SINGLE: 'single',
  },
}));

describe('docxUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window.URL methods
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
    
    // Mock document methods
    const mockLink = {
      click: vi.fn(),
      href: '',
      download: '',
    };
    document.createElement = vi.fn((tag) => {
      if (tag === 'a') {
        return mockLink as any;
      }
      return {} as any;
    });
    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();
  });

  describe('importFromDocx', () => {
    it('should import a simple paragraph from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<p>Hello World</p>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        type: 'paragraph',
        children: [{ text: 'Hello World' }],
      });
    });

    it('should import headings from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        type: 'heading-one',
        children: [{ text: 'Heading 1' }],
      });
      expect(result[1]).toEqual({
        type: 'heading-two',
        children: [{ text: 'Heading 2' }],
      });
      expect(result[2]).toEqual({
        type: 'heading-three',
        children: [{ text: 'Heading 3' }],
      });
    });

    it('should import bold and italic text from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<p><strong>Bold</strong> and <em>italic</em></p>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('paragraph');
      // Check that children contain formatted text
      const children = result[0].children as any[];
      expect(children.some((c: any) => c.bold)).toBe(true);
      expect(children.some((c: any) => c.italic)).toBe(true);
    });

    it('should import bulleted lists from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<ul><li>Item 1</li><li>Item 2</li></ul>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('bulleted-list');
      expect((result[0] as any).children).toHaveLength(2);
      expect((result[0] as any).children[0].type).toBe('list-item');
    });

    it('should import numbered lists from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<ol><li>First</li><li>Second</li></ol>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('numbered-list');
      expect((result[0] as any).children).toHaveLength(2);
      expect((result[0] as any).children[0].type).toBe('list-item');
    });

    it('should import images from .docx', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<img src="https://example.com/image.jpg" alt="Test Image" width="400" />',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('image');
      expect((result[0] as any).url).toBe('https://example.com/image.jpg');
      expect((result[0] as any).alt).toBe('Test Image');
      expect((result[0] as any).width).toBe(400);
    });

    it('should import a complex document with multiple elements', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: `
          <h1>Article Title</h1>
          <p>This is a <strong>simple article</strong> with some <em>formatting</em>.</p>
          <h2>Section 1</h2>
          <p>Some paragraph text here.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
          <h2>Section 2</h2>
          <img src="https://example.com/image.jpg" alt="Example" />
          <p>More text after the image.</p>
        `,
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      // Should have multiple elements
      expect(result.length).toBeGreaterThan(5);
      
      // Check for heading
      expect(result.some(node => node.type === 'heading-one')).toBe(true);
      expect(result.some(node => node.type === 'heading-two')).toBe(true);
      
      // Check for paragraph
      expect(result.some(node => node.type === 'paragraph')).toBe(true);
      
      // Check for list
      expect(result.some(node => node.type === 'bulleted-list')).toBe(true);
      
      // Check for image
      expect(result.some(node => node.type === 'image')).toBe(true);
    });

    it('should handle empty document gracefully', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = await importFromDocx(file);

      // Should return a default empty paragraph
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        type: 'paragraph',
        children: [{ text: '' }],
      });
    });

    it('should handle import errors gracefully', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockRejectedValue(new Error('Import failed'));

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      await expect(importFromDocx(file)).rejects.toThrow('Failed to import .docx file');
    });
  });

  describe('exportToDocx', () => {
    it('should export a simple paragraph to .docx', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'paragraph',
          children: [{ text: 'Hello World' }],
        },
      ];

      await exportToDocx(nodes, 'test.docx');

      // Verify that Document was created
      const docx = await import('docx');
      expect(docx.Document).toHaveBeenCalled();
      expect(docx.Paragraph).toHaveBeenCalled();
    });

    it('should export headings to .docx', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'heading-one',
          children: [{ text: 'Heading 1' }],
        },
        {
          type: 'heading-two',
          children: [{ text: 'Heading 2' }],
        },
      ];

      await exportToDocx(nodes, 'test.docx');

      const docx = await import('docx');
      expect(docx.Document).toHaveBeenCalled();
      expect(docx.Paragraph).toHaveBeenCalled();
    });

    it('should export formatted text to .docx', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'paragraph',
          children: [
            { text: 'Bold text', bold: true },
            { text: ' and ' },
            { text: 'italic text', italic: true },
          ],
        },
      ];

      await exportToDocx(nodes, 'test.docx');

      const docx = await import('docx');
      expect(docx.TextRun).toHaveBeenCalled();
    });

    it('should export lists to .docx', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'bulleted-list',
          children: [
            {
              type: 'list-item',
              children: [{ text: 'Item 1' }],
            },
            {
              type: 'list-item',
              children: [{ text: 'Item 2' }],
            },
          ] as any,
        },
      ];

      await exportToDocx(nodes, 'test.docx');

      const docx = await import('docx');
      expect(docx.Paragraph).toHaveBeenCalled();
    });

    it('should export images to .docx (as placeholders)', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'image',
          url: 'https://example.com/image.jpg',
          alt: 'Test Image',
          children: [{ text: '' }],
        } as any,
      ];

      await exportToDocx(nodes, 'test.docx');

      const docx = await import('docx');
      expect(docx.Document).toHaveBeenCalled();
    });

    it('should export a complex document to .docx', async () => {
      const nodes: CustomElement[] = [
        {
          type: 'heading-one',
          children: [{ text: 'Article Title' }],
        },
        {
          type: 'paragraph',
          children: [
            { text: 'This is a ' },
            { text: 'simple article', bold: true },
            { text: ' with some ' },
            { text: 'formatting', italic: true },
            { text: '.' },
          ],
        },
        {
          type: 'bulleted-list',
          children: [
            {
              type: 'list-item',
              children: [{ text: 'List item 1' }],
            },
            {
              type: 'list-item',
              children: [{ text: 'List item 2' }],
            },
          ] as any,
        },
        {
          type: 'image',
          url: 'https://example.com/image.jpg',
          alt: 'Example',
          children: [{ text: '' }],
        } as any,
      ];

      await exportToDocx(nodes, 'article.docx');

      const docx = await import('docx');
      expect(docx.Document).toHaveBeenCalled();
      expect(docx.Paragraph).toHaveBeenCalled();
      expect(docx.TextRun).toHaveBeenCalled();
    });

    it('should handle export errors gracefully', async () => {
      const docx = await import('docx');
      (docx.Packer.toBlob as any).mockRejectedValue(new Error('Export failed'));

      const nodes: CustomElement[] = [
        {
          type: 'paragraph',
          children: [{ text: 'Test' }],
        },
      ];

      await expect(exportToDocx(nodes, 'test.docx')).rejects.toThrow('Failed to export to .docx file');
    });
  });

  describe('Round-trip conversion', () => {
    it('should preserve basic structure through import and export', async () => {
      const mammoth = await import('mammoth');
      (mammoth.default.convertToHtml as any).mockResolvedValue({
        value: '<h1>Title</h1><p>Paragraph with <strong>bold</strong> text.</p>',
      });

      const file = new File([''], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const imported = await importFromDocx(file);

      // Should have heading and paragraph
      expect(imported).toHaveLength(2);
      expect(imported[0].type).toBe('heading-one');
      expect(imported[1].type).toBe('paragraph');

      // Export the imported content
      await exportToDocx(imported, 'output.docx');

      const docx = await import('docx');
      expect(docx.Document).toHaveBeenCalled();
    });
  });
});

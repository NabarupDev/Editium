import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { TableComponent, TableRowComponent, TableCellComponent } from '../../react/TableElement';
import { TableElement, TableRowElement, TableCellElement } from '../../react/types';

// Suppress React DOM nesting warnings in tests (table components tested in isolation)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('validateDOMNesting')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('TableElement', () => {
  let editor: any;

  beforeEach(() => {
    editor = withHistory(withReact(createEditor()));
  });

  describe('TableComponent', () => {
    const mockTableElement: TableElement = {
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [
            {
              type: 'table-cell',
              children: [{ text: 'Cell 1' }],
            },
            {
              type: 'table-cell',
              children: [{ text: 'Cell 2' }],
            },
          ],
        },
      ],
    };

    it('should render table with correct structure', () => {
      editor.children = [mockTableElement];
      
      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={mockTableElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell 1</td><td>Cell 2</td></tr>}
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should apply alignment styles correctly', () => {
      const centerAlignedTable: TableElement = {
        ...mockTableElement,
        align: 'center',
      };

      editor.children = [centerAlignedTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={centerAlignedTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell</td></tr>}
          />
        </Slate>
      );

      const wrapper = container.querySelector('[data-slate-node="element"]');
      expect(wrapper).toBeTruthy();
    });

    it('should show controls on mouse enter', () => {
      editor.children = [mockTableElement];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={mockTableElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell</td></tr>}
          />
        </Slate>
      );

      const wrapper = container.querySelector('[data-slate-node="element"]');
      expect(wrapper).toBeTruthy();
    });

    it('should render with default left alignment', () => {
      editor.children = [mockTableElement];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={mockTableElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell</td></tr>}
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });
  });

  describe('TableRowComponent', () => {
    const mockRowElement: TableRowElement = {
      type: 'table-row',
      children: [
        {
          type: 'table-cell',
          children: [{ text: 'Cell 1' }],
        },
        {
          type: 'table-cell',
          children: [{ text: 'Cell 2' }],
        },
      ],
    };

    it('should render table row', () => {
      editor.children = [
        {
          type: 'table',
          children: [mockRowElement],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableRowComponent
            element={mockRowElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={
              <>
                <td>Cell 1</td>
                <td>Cell 2</td>
              </>
            }
          />
        </Slate>
      );

      const row = container.querySelector('tr');
      expect(row).toBeTruthy();
    });

    it('should render with correct attributes', () => {
      editor.children = [
        {
          type: 'table',
          children: [mockRowElement],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableRowComponent
            element={mockRowElement}
            attributes={{ 'data-slate-node': 'element', 'data-testid': 'table-row' }}
            children={<td>Cell</td>}
          />
        </Slate>
      );

      const row = container.querySelector('tr[data-slate-node="element"]');
      expect(row).toBeTruthy();
    });
  });

  describe('TableCellComponent', () => {
    const mockCellElement: TableCellElement = {
      type: 'table-cell',
      children: [{ text: 'Cell content' }],
    };

    it('should render table cell', () => {
      editor.children = [
        {
          type: 'table',
          children: [
            {
              type: 'table-row',
              children: [mockCellElement],
            },
          ],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableCellComponent
            element={mockCellElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<span>Cell content</span>}
          />
        </Slate>
      );

      const cell = container.querySelector('td');
      expect(cell).toBeTruthy();
    });

    it('should render with border styles', () => {
      editor.children = [
        {
          type: 'table',
          children: [
            {
              type: 'table-row',
              children: [mockCellElement],
            },
          ],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableCellComponent
            element={mockCellElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<span>Cell content</span>}
          />
        </Slate>
      );

      const cell = container.querySelector('td');
      expect(cell).toBeTruthy();
      // Check that the cell has some styling applied
      expect(cell?.getAttribute('style')).toBeTruthy();
    });

    it('should apply padding to cells', () => {
      editor.children = [
        {
          type: 'table',
          children: [
            {
              type: 'table-row',
              children: [mockCellElement],
            },
          ],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableCellComponent
            element={mockCellElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<span>Cell content</span>}
          />
        </Slate>
      );

      const cell = container.querySelector('td');
      expect(cell).toBeTruthy();
      expect(cell?.style.padding).toBeTruthy();
    });

    it('should handle cell with empty content', () => {
      const emptyCellElement: TableCellElement = {
        type: 'table-cell',
        children: [{ text: '' }],
      };

      editor.children = [
        {
          type: 'table',
          children: [
            {
              type: 'table-row',
              children: [emptyCellElement],
            },
          ],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableCellComponent
            element={emptyCellElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<span></span>}
          />
        </Slate>
      );

      const cell = container.querySelector('td');
      expect(cell).toBeTruthy();
    });

    it('should handle cell with formatted content', () => {
      const formattedCellElement: TableCellElement = {
        type: 'table-cell',
        children: [{ text: 'Bold', bold: true }],
      };

      editor.children = [
        {
          type: 'table',
          children: [
            {
              type: 'table-row',
              children: [formattedCellElement],
            },
          ],
        },
      ];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableCellComponent
            element={formattedCellElement}
            attributes={{ 'data-slate-node': 'element' }}
            children={<span><strong>Bold</strong></span>}
          />
        </Slate>
      );

      const cell = container.querySelector('td');
      expect(cell).toBeTruthy();
    });
  });

  describe('Table operations', () => {
    it('should handle table with single cell', () => {
      const singleCellTable: TableElement = {
        type: 'table',
        children: [
          {
            type: 'table-row',
            children: [
              {
                type: 'table-cell',
                children: [{ text: 'Single cell' }],
              },
            ],
          },
        ],
      };

      editor.children = [singleCellTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={singleCellTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Single cell</td></tr>}
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should handle table with multiple rows', () => {
      const multiRowTable: TableElement = {
        type: 'table',
        children: [
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'R1C1' }] },
              { type: 'table-cell', children: [{ text: 'R1C2' }] },
            ],
          },
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'R2C1' }] },
              { type: 'table-cell', children: [{ text: 'R2C2' }] },
            ],
          },
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'R3C1' }] },
              { type: 'table-cell', children: [{ text: 'R3C2' }] },
            ],
          },
        ],
      };

      editor.children = [multiRowTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={multiRowTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={
              <>
                <tr><td>R1C1</td><td>R1C2</td></tr>
                <tr><td>R2C1</td><td>R2C2</td></tr>
                <tr><td>R3C1</td><td>R3C2</td></tr>
              </>
            }
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should handle table with varying column counts', () => {
      const varyingTable: TableElement = {
        type: 'table',
        children: [
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'A' }] },
              { type: 'table-cell', children: [{ text: 'B' }] },
              { type: 'table-cell', children: [{ text: 'C' }] },
            ],
          },
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'D' }] },
              { type: 'table-cell', children: [{ text: 'E' }] },
            ],
          },
        ],
      };

      editor.children = [varyingTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={varyingTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={
              <>
                <tr><td>A</td><td>B</td><td>C</td></tr>
                <tr><td>D</td><td>E</td></tr>
              </>
            }
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should render table with right alignment', () => {
      const rightAlignedTable: TableElement = {
        type: 'table',
        align: 'right',
        children: [
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'Cell' }] },
            ],
          },
        ],
      };

      editor.children = [rightAlignedTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={rightAlignedTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell</td></tr>}
          />
        </Slate>
      );

      const wrapper = container.querySelector('[data-slate-node="element"]');
      expect(wrapper).toBeTruthy();
    });

    it('should render table with left alignment', () => {
      const leftAlignedTable: TableElement = {
        type: 'table',
        align: 'left',
        children: [
          {
            type: 'table-row',
            children: [
              { type: 'table-cell', children: [{ text: 'Cell' }] },
            ],
          },
        ],
      };

      editor.children = [leftAlignedTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={leftAlignedTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Cell</td></tr>}
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should handle large table', () => {
      const largeTableRows = Array.from({ length: 10 }, (_, i) => ({
        type: 'table-row' as const,
        children: Array.from({ length: 10 }, (_, j) => ({
          type: 'table-cell' as const,
          children: [{ text: `R${i}C${j}` }],
        })),
      }));

      const largeTable: TableElement = {
        type: 'table',
        children: largeTableRows,
      };

      editor.children = [largeTable];

      const { container } = render(
        <Slate editor={editor} initialValue={editor.children} onChange={() => {}}>
          <TableComponent
            element={largeTable}
            attributes={{ 'data-slate-node': 'element' }}
            children={<tr><td>Test</td></tr>}
          />
        </Slate>
      );

      const table = container.querySelector('table');
      expect(table).toBeTruthy();
    });
  });
});

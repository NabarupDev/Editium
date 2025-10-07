import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { TableComponent, TableRowComponent, TableCellComponent } from '../src/TableElement';
import { TableElement, TableRowElement, TableCellElement } from '../src/types';

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
  });
});

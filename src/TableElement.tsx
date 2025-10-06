import React, { useState, useRef } from 'react';
import { useSlateStatic, useSelected, useFocused, ReactEditor } from 'slate-react';
import { Transforms, Editor } from 'slate';
import { 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon
} from '@heroicons/react/24/outline';
import { TableElement, TableRowElement, TableCellElement, AlignmentType } from './types';
import { addTableRow, removeTableRow, addTableColumn, removeTableColumn, setTableAlignment } from './utils';

interface TableComponentProps {
  element: TableElement;
  attributes: any;
  children: any;
}

export const TableComponent: React.FC<TableComponentProps> = ({ element, attributes, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [showControls, setShowControls] = useState(false);
  const [tableWidth, setTableWidth] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleAddRow = () => {
    addTableRow(editor);
  };

  const handleRemoveRow = () => {
    removeTableRow(editor);
  };

  const handleAddColumn = () => {
    addTableColumn(editor);
  };

  const handleRemoveColumn = () => {
    removeTableColumn(editor);
  };

  const handleDeleteTable = () => {
    Transforms.removeNodes(editor, {
      match: (n: any) =>
        !Editor.isEditor(n) &&
        n.type === 'table',
    });
  };

  const handleAlign = (alignment: AlignmentType) => {
    setTableAlignment(editor, alignment);
  };

  return (
    <div
      style={{ 
        position: 'relative',
        margin: '16px 0',
        display: 'flex',
        justifyContent: element.align === 'center' ? 'center' : 
                       element.align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <div 
        {...attributes}
        style={{ position: 'relative', width: tableWidth ? `${tableWidth}px` : '100%', maxWidth: '100%' }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <table
          ref={tableRef}
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            border: (selected && focused) || showControls ? '2px solid #3b82f6' : '1px solid #e5e7eb',
            transition: 'border 0.2s ease',
          }}
        >
          <tbody>{children}</tbody>
        </table>

        {/* Table controls */}
        {((selected && focused) || showControls) && (
          <div
            contentEditable={false}
            style={{
              position: 'absolute',
              top: '-40px',
              right: '0',
              display: 'flex',
              gap: '4px',
              backgroundColor: '#fff',
              padding: '4px',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
            }}
          >
            <button
              onClick={handleAddRow}
              title="Add Row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <PlusIcon style={{ width: '16px', height: '16px' }} />
              Row
            </button>
            <button
              onClick={handleRemoveRow}
              title="Remove Row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <MinusIcon style={{ width: '16px', height: '16px' }} />
              Row
            </button>
            <button
              onClick={handleAddColumn}
              title="Add Column"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <PlusIcon style={{ width: '16px', height: '16px' }} />
              Col
            </button>
            <button
              onClick={handleRemoveColumn}
              title="Remove Column"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <MinusIcon style={{ width: '16px', height: '16px' }} />
              Col
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' }} />
            
            {/* Alignment buttons */}
            <button
              onClick={() => handleAlign('left')}
              title="Align Left"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: element.align === 'left' || !element.align ? '#e0e7ff' : '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => {
                if (element.align !== 'left' && element.align) e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = element.align === 'left' || !element.align ? '#e0e7ff' : '#fff';
              }}
            >
              <Bars3BottomLeftIcon style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={() => handleAlign('center')}
              title="Align Center"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: element.align === 'center' ? '#e0e7ff' : '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => {
                if (element.align !== 'center') e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = element.align === 'center' ? '#e0e7ff' : '#fff';
              }}
            >
              <Bars3Icon style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={() => handleAlign('right')}
              title="Align Right"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: element.align === 'right' ? '#e0e7ff' : '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151',
              }}
              onMouseOver={(e) => {
                if (element.align !== 'right') e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = element.align === 'right' ? '#e0e7ff' : '#fff';
              }}
            >
              <Bars3BottomRightIcon style={{ width: '16px', height: '16px' }} />
            </button>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' }} />
            <button
              onClick={handleDeleteTable}
              title="Delete Table"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#dc2626',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              <TrashIcon style={{ width: '16px', height: '16px' }} />
              Delete
            </button>
          </div>
        )}

        {/* Table resize handle */}
        {((selected && focused) || showControls) && (
          <div
            contentEditable={false}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);
              const startX = e.clientX;
              const startWidth = tableRef.current?.offsetWidth || 0;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const diff = moveEvent.clientX - startX;
                const newWidth = Math.max(200, startWidth + diff);
                setTableWidth(newWidth);
              };

              const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
            style={{
              position: 'absolute',
              right: '-4px',
              top: '0',
              bottom: '0',
              width: '8px',
              cursor: 'col-resize',
              backgroundColor: isResizing ? '#3b82f6' : 'transparent',
              transition: 'background-color 0.2s',
              zIndex: 5,
            }}
            onMouseEnter={(e) => {
              if (!isResizing) e.currentTarget.style.backgroundColor = '#3b82f680';
            }}
            onMouseLeave={(e) => {
              if (!isResizing) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          />
        )}
      </div>
    </div>
  );
};

interface TableRowComponentProps {
  element: TableRowElement;
  attributes: any;
  children: any;
}

export const TableRowComponent: React.FC<TableRowComponentProps> = ({ attributes, children }) => {
  return <tr {...attributes}>{children}</tr>;
};

interface TableCellComponentProps {
  element: TableCellElement;
  attributes: any;
  children: any;
}

export const TableCellComponent: React.FC<TableCellComponentProps> = ({ attributes, children }) => {
  return (
    <td
      {...attributes}
      style={{
        border: '1px solid #e5e7eb',
        padding: '8px 12px',
        minWidth: '100px',
        position: 'relative',
      }}
    >
      {children}
    </td>
  );
};

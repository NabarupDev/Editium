import React, { useState, useRef, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeBracketIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LinkIcon,
  ListBulletIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  Bars3CenterLeftIcon,
  Bars3Icon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { isMarkActive, isBlockActive, toggleMark, toggleBlock, isLinkActive, insertLink, unwrapLink, isAlignmentActive, toggleAlignment, indentListItem, outdentListItem } from './utils';
import { FormatType, BlockType, ToolbarItem, AlignmentType } from './types';

interface ToolbarProps {
  items: ToolbarItem[];
  className?: string;
}

interface ToolbarButtonProps {
  active: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  title?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        title={title}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        style={{
          backgroundColor: isOpen ? '#3b82f6' : '#ffffff',
          border: isOpen ? '1px solid #3b82f6' : '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '8px 12px',
          margin: '2px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          color: isOpen ? '#ffffff' : '#374151',
          transition: 'all 0.2s ease-in-out',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '36px',
          height: '36px',
          boxShadow: isOpen ? '0 2px 4px rgba(59, 130, 246, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#d1d5db';
          }
        }}
      >
        {trigger}
        <ChevronDownIcon style={{ marginLeft: '4px', width: '12px', height: '12px' }} />
      </button>
      
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            minWidth: '160px',
            marginTop: '2px',
            overflow: 'hidden'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ active, onMouseDown, children, title }) => (
  <button
    title={title}
    onMouseDown={onMouseDown}
    style={{
      backgroundColor: active ? '#3b82f6' : '#ffffff',
      border: active ? '1px solid #3b82f6' : '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '8px 12px',
      margin: '2px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      color: active ? '#ffffff' : '#374151',
      transition: 'all 0.2s ease-in-out',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '36px',
      height: '36px',
      boxShadow: active ? '0 2px 4px rgba(59, 130, 246, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = '#f9fafb';
        e.currentTarget.style.borderColor = '#9ca3af';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.borderColor = '#d1d5db';
      }
    }}
  >
    {children}
  </button>
);

const DropdownItem: React.FC<{
  active: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}> = ({ active, onMouseDown, children }) => (
  <button
    onMouseDown={onMouseDown}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: 'none',
      backgroundColor: active ? '#3b82f6' : 'transparent',
      color: active ? '#ffffff' : '#374151',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease-in-out',
      borderRadius: '4px',
      margin: '2px',
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = 'transparent';
      }
    }}
  >
    {children}
  </button>
);

const ToolbarSeparator: React.FC = () => (
  <div
    style={{
      width: '1px',
      height: '24px',
      backgroundColor: '#d1d5db',
      margin: '0 8px',
      alignSelf: 'center',
    }}
  />
);

const Toolbar: React.FC<ToolbarProps> = ({ items, className }) => {
  const editor = useSlate();

  const handleMarkToggle = (event: React.MouseEvent, format: FormatType) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  const handleBlockToggle = (event: React.MouseEvent, format: BlockType) => {
    event.preventDefault();
    toggleBlock(editor, format);
  };

  const handleAlignmentToggle = (event: React.MouseEvent, alignment: AlignmentType) => {
    event.preventDefault();
    toggleAlignment(editor, alignment);
  };

  const handleIndent = (event: React.MouseEvent) => {
    event.preventDefault();
    indentListItem(editor);
  };

  const handleOutdent = (event: React.MouseEvent) => {
    event.preventDefault();
    outdentListItem(editor);
  };

  const handleUndo = (event: React.MouseEvent) => {
    event.preventDefault();
    HistoryEditor.undo(editor as HistoryEditor);
  };

  const handleRedo = (event: React.MouseEvent) => {
    event.preventDefault();
    HistoryEditor.redo(editor as HistoryEditor);
  };

  const handleLinkToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    } else {
      const url = window.prompt('Enter the URL of the link:');
      if (url && !editor.selection?.anchor) {
        alert('Select text to create a link');
        return;
      }
      if (url) {
        insertLink(editor, url);
      }
    }
  };

  const renderToolbarItem = (item: ToolbarItem) => {
    // Group heading items and paragraph into a dropdown
    const blockFormattingItems = ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'];
    
    if (blockFormattingItems.includes(item)) {
      // Only render the dropdown for the first block formatting item encountered
      const firstBlockIndex = items.findIndex(i => blockFormattingItems.includes(i));
      const currentIndex = items.findIndex(i => i === item);
      
      if (firstBlockIndex !== currentIndex) {
        return null; // Skip rendering individual block formatting buttons
      }
      
      // Find which block format is currently active
      const activeBlock = blockFormattingItems.find(block => 
        items.includes(block as ToolbarItem) && isBlockActive(editor, block as BlockType)
      );
      
      const getBlockLabel = (block: string) => {
        switch (block) {
          case 'paragraph': return 'Paragraph';
          case 'heading-one': return 'Heading 1';
          case 'heading-two': return 'Heading 2';
          case 'heading-three': return 'Heading 3';
          case 'heading-four': return 'Heading 4';
          case 'heading-five': return 'Heading 5';
          case 'heading-six': return 'Heading 6';
          case 'heading-seven': return 'Heading 7';
          case 'heading-eight': return 'Heading 8';
          default: return 'Format';
        }
      };
      
      const getBlockShort = (block: string) => {
        switch (block) {
          case 'paragraph': return 'P';
          case 'heading-one': return 'H1';
          case 'heading-two': return 'H2';
          case 'heading-three': return 'H3';
          case 'heading-four': return 'H4';
          case 'heading-five': return 'H5';
          case 'heading-six': return 'H6';
          case 'heading-seven': return 'H7';
          case 'heading-eight': return 'H8';
          default: return 'T';
        }
      };
      
      return (
        <Dropdown
          key="block-formatting-dropdown"
          trigger={activeBlock ? getBlockShort(activeBlock) : 'T'}
          title="Text Format"
        >
          {items.filter(i => blockFormattingItems.includes(i)).map(block => (
            <DropdownItem
              key={block}
              active={isBlockActive(editor, block as BlockType)}
              onMouseDown={(e) => handleBlockToggle(e, block as BlockType)}
            >
              {getBlockLabel(block)}
            </DropdownItem>
          ))}
        </Dropdown>
      );
    }

    // Group alignment items into a dropdown
    const alignmentItems = ['left', 'center', 'right', 'justify'];
    
    if (alignmentItems.includes(item)) {
      // Only render the dropdown for the first alignment item encountered
      const firstAlignIndex = items.findIndex(i => alignmentItems.includes(i));
      const currentIndex = items.findIndex(i => i === item);
      
      if (firstAlignIndex !== currentIndex) {
        return null; // Skip rendering individual alignment buttons
      }
      
      // Find which alignment is currently active
      const activeAlignment = alignmentItems.find(align => 
        items.includes(align as ToolbarItem) && isAlignmentActive(editor, align as AlignmentType)
      );
      
      const getAlignmentIcon = (align: string) => {
        switch (align) {
          case 'left': 
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '8px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '10px', height: '2px', backgroundColor: 'currentColor' }}></div>
              </div>
            );
          case 'center': 
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '6px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '8px', height: '2px', backgroundColor: 'currentColor' }}></div>
              </div>
            );
          case 'right': 
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'flex-end' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '8px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '10px', height: '2px', backgroundColor: 'currentColor' }}></div>
              </div>
            );
          case 'justify': 
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }}>
                <div style={{ width: '100%', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '100%', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '100%', height: '2px', backgroundColor: 'currentColor' }}></div>
              </div>
            );
          default: 
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '8px', height: '2px', backgroundColor: 'currentColor' }}></div>
                <div style={{ width: '10px', height: '2px', backgroundColor: 'currentColor' }}></div>
              </div>
            );
        }
      };
      
      const getAlignmentLabel = (align: string) => {
        switch (align) {
          case 'left': return 'Align Left';
          case 'center': return 'Align Center';
          case 'right': return 'Align Right';
          case 'justify': return 'Justify';
          default: return 'Align';
        }
      };
      
      return (
        <Dropdown
          key="alignment-dropdown"
          trigger={activeAlignment ? getAlignmentIcon(activeAlignment) : '⬅'}
          title="Text Alignment"
        >
          {items.filter(i => alignmentItems.includes(i)).map(align => (
            <DropdownItem
              key={align}
              active={isAlignmentActive(editor, align as AlignmentType)}
              onMouseDown={(e) => handleAlignmentToggle(e, align as AlignmentType)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getAlignmentIcon(align)} 
                <span>{getAlignmentLabel(align)}</span>
              </div>
            </DropdownItem>
          ))}
        </Dropdown>
      );
    }

    switch (item) {
      case 'bold':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'bold')}
            onMouseDown={(e) => handleMarkToggle(e, 'bold')}
            title="Bold"
          >
            <BoldIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'italic':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'italic')}
            onMouseDown={(e) => handleMarkToggle(e, 'italic')}
            title="Italic"
          >
            <ItalicIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'underline':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'underline')}
            onMouseDown={(e) => handleMarkToggle(e, 'underline')}
            title="Underline"
          >
            <UnderlineIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'code':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'code')}
            onMouseDown={(e) => handleMarkToggle(e, 'code')}
            title="Code"
          >
            <CodeBracketIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'strikethrough':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'strikethrough')}
            onMouseDown={(e) => handleMarkToggle(e, 'strikethrough')}
            title="Strikethrough"
          >
            <span style={{ fontSize: '14px', textDecoration: 'line-through', fontWeight: '600' }}>S</span>
          </ToolbarButton>
        );
      case 'superscript':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'superscript')}
            onMouseDown={(e) => handleMarkToggle(e, 'superscript')}
            title="Superscript"
          >
            <span style={{ fontSize: '12px', fontWeight: '600' }}>X<sup>²</sup></span>
          </ToolbarButton>
        );
      case 'subscript':
        return (
          <ToolbarButton
            key={item}
            active={isMarkActive(editor, 'subscript')}
            onMouseDown={(e) => handleMarkToggle(e, 'subscript')}
            title="Subscript"
          >
            <span style={{ fontSize: '12px', fontWeight: '600' }}>X<sub>₂</sub></span>
          </ToolbarButton>
        );
      case 'bulleted-list':
        return (
          <ToolbarButton
            key={item}
            active={isBlockActive(editor, 'bulleted-list')}
            onMouseDown={(e) => handleBlockToggle(e, 'bulleted-list')}
            title="Bulleted List"
          >
            <ListBulletIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'numbered-list':
        return (
          <ToolbarButton
            key={item}
            active={isBlockActive(editor, 'numbered-list')}
            onMouseDown={(e) => handleBlockToggle(e, 'numbered-list')}
            title="Numbered List"
          >
            <span style={{ fontSize: '14px', fontWeight: '600' }}>1.</span>
          </ToolbarButton>
        );
      case 'link':
        return (
          <ToolbarButton
            key={item}
            active={isLinkActive(editor)}
            onMouseDown={handleLinkToggle}
            title="Link"
          >
            <LinkIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'indent':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleIndent}
            title="Indent"
          >
            <ArrowRightIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'outdent':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleOutdent}
            title="Outdent"
          >
            <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'undo':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleUndo}
            title="Undo (Ctrl+Z)"
          >
            <ArrowUturnLeftIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'redo':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleRedo}
            title="Redo (Ctrl+Y)"
          >
            <ArrowUturnRightIcon style={{ width: '16px', height: '16px' }} />
          </ToolbarButton>
        );
      case 'separator':
        return <ToolbarSeparator key={`separator-${Math.random()}`} />;
      default:
        return null;
    }
  };

  return (
    <div className={className} style={{ 
      border: '1px solid #e5e7eb', 
      borderBottom: 'none', 
      padding: '12px 16px', 
      backgroundColor: '#ffffff',
      borderRadius: '8px 8px 0 0',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      minHeight: '56px',
      maxWidth: '100%',
      overflow: 'visible',
      position: 'relative',
      zIndex: 100
    }}>
      {items.map(renderToolbarItem)}
    </div>
  );
};

export default Toolbar;
import React, { useState, useRef, useEffect } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { Editor, Transforms, Range } from 'slate';
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
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  PhotoIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
import { isMarkActive, isBlockActive, toggleMark, toggleBlock, isLinkActive, insertLink, unwrapLink, isAlignmentActive, toggleAlignment, indentListItem, outdentListItem, getLinkAtCursor, insertHorizontalRule, applyColor, applyBackgroundColor, getActiveColor, getActiveBackgroundColor, insertImage, isValidImageUrl, insertTable, addTableRow, removeTableRow, addTableColumn, removeTableColumn, isInTable, findAllMatches, navigateToMatch, replaceMatch, replaceAllMatches } from './utils';
import { FormatType, BlockType, ToolbarItem, AlignmentType, LinkElement, ImageElement } from './types';

interface ToolbarProps {
  items: ToolbarItem[];
  className?: string;
  onViewOutput?: (type: 'html' | 'json' | 'preview') => void;
  onEditLink?: (linkData: { url: string; title?: string; target?: '_blank' | '_self'; text: string }) => void;
  searchQuery?: string;
  searchMatches?: Array<{ path: any; offset: number; text: string }>;
  currentMatchIndex?: number;
  onSearchQueryChange?: (query: string) => void;
  onSearchMatchesChange?: (matches: Array<{ path: any; offset: number; text: string }>) => void;
  onCurrentMatchIndexChange?: (index: number) => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
  onImportDocx?: (file: File) => void;
  onExportDocx?: () => void;
  onExportPdf?: () => void;
  importStatus?: { type: 'success' | 'error' | 'info'; message: string } | null;
  onClearImportStatus?: () => void;
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
  editor?: any; // Slate editor instance
}

// Context for dropdown close function and editor
const DropdownContext = React.createContext<{ closeDropdown: () => void; editor?: any } | null>(null);

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, title, editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useRef(`dropdown-menu-${Math.random().toString(36).substr(2, 9)}`);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Get all dropdown items
  const getMenuItems = () => {
    if (!menuRef.current) return [];
    return Array.from(menuRef.current.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus management when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      const items = getMenuItems();
      if (items[0]) {
        items[0].focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = getMenuItems();
    
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = (focusedIndex + 1) % items.length;
          setFocusedIndex(nextIndex);
          items[nextIndex]?.focus();
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const prevIndex = focusedIndex === 0 ? items.length - 1 : focusedIndex - 1;
          setFocusedIndex(prevIndex);
          items[prevIndex]?.focus();
        }
        break;
        
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          items[0]?.focus();
        }
        break;
        
      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = items.length - 1;
          setFocusedIndex(lastIndex);
          items[lastIndex]?.focus();
        }
        break;
    }
  };

  const handleButtonClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      handleKeyDown(e);
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      style={{ position: 'relative', display: 'inline-block' }}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        title={title}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId.current}
        onMouseDown={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        style={{
          backgroundColor: isOpen ? '#dee2e6' : 'transparent',
          border: 'none',
          borderRadius: '3px',
          padding: '5px 8px',
          margin: '0',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '400',
          color: '#222f3e',
          transition: 'background-color 0.1s ease',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '28px',
          boxShadow: 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = '#e9ecef';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {trigger}
        <ChevronDownIcon 
          style={{ marginLeft: '4px', width: '12px', height: '12px' }}
          aria-hidden="true"
        />
      </button>
      
      {isOpen && (
        <div
          ref={menuRef}
          id={menuId.current}
          role="menu"
          aria-orientation="vertical"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #ccc',
            borderRadius: '3px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            minWidth: '180px',
            marginTop: '4px',
            overflow: 'hidden',
            padding: '4px 0'
          }}
        >
          <DropdownContext.Provider value={{ closeDropdown, editor }}>
            {children}
          </DropdownContext.Provider>
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
      backgroundColor: active ? '#dee2e6' : 'transparent',
      border: 'none',
      borderRadius: '3px',
      padding: '5px 8px',
      margin: '0',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '400',
      color: '#222f3e',
      transition: 'background-color 0.1s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '28px',
      boxShadow: 'none',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = '#e9ecef';
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

const DropdownItem: React.FC<{
  active: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ active, onMouseDown, children, icon }) => {
  const itemRef = useRef<HTMLButtonElement>(null);
  const dropdownContext = React.useContext(DropdownContext);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Convert keyboard event to mouse event for compatibility with existing handlers
      const mouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      e.currentTarget.dispatchEvent(mouseEvent);
      
      // Close dropdown and focus editor after activating item
      if (dropdownContext) {
        dropdownContext.closeDropdown();
        // Focus the editor after a short delay to ensure dropdown closes first
        setTimeout(() => {
          if (dropdownContext.editor) {
            try {
              ReactEditor.focus(dropdownContext.editor);
            } catch (error) {
              // Fallback: focus any contenteditable element
              const editable = document.querySelector('[contenteditable="true"]') as HTMLElement;
              if (editable) {
                editable.focus();
              }
            }
          }
        }, 0);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(e);
    // Close dropdown after mouse click (editor keeps focus naturally with mouse)
    if (dropdownContext) {
      dropdownContext.closeDropdown();
    }
  };

  return (
    <button
      ref={itemRef}
      role="menuitem"
      tabIndex={-1}
      aria-checked={active}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      style={{
        width: '100%',
        padding: '6px 16px',
        border: 'none',
        backgroundColor: active ? '#e7f4ff' : 'transparent',
        color: '#222f3e',
        fontSize: '14px',
        fontWeight: '400',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.1s ease',
        borderRadius: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e7f4ff';
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = '#e7f4ff';
      }}
      onBlur={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {icon && (
        <span 
          style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

const ToolbarSeparator: React.FC = () => (
  <div
    style={{
      width: '1px',
      height: '24px',
      backgroundColor: '#ccc',
      margin: '0 4px',
      alignSelf: 'center',
    }}
  />
);

const Toolbar: React.FC<ToolbarProps> = ({ 
  items, 
  className, 
  onViewOutput, 
  onEditLink,
  searchQuery: propSearchQuery = '',
  searchMatches: propSearchMatches = [],
  currentMatchIndex: propCurrentMatchIndex = 0,
  onSearchQueryChange,
  onSearchMatchesChange,
  onCurrentMatchIndexChange,
  isFullscreen = false,
  onFullscreenToggle,
  onImportDocx,
  onExportDocx,
  onExportPdf,
  importStatus,
  onClearImportStatus,
}) => {
  const editor = useSlate();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkTarget, setLinkTarget] = useState<'_self' | '_blank'>('_self');
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [showLinkContextMenu, setShowLinkContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadError, setImageUploadError] = useState('');
  const [isReplacingImage, setIsReplacingImage] = useState(false);
  const [replacingImagePath, setReplacingImagePath] = useState<any>(null);

  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const [showFindReplace, setShowFindReplace] = useState(false);
  const [replaceText, setReplaceText] = useState('');
  const [totalMatches, setTotalMatches] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const searchQuery = propSearchQuery;
  const searchMatches = propSearchMatches;
  const currentMatchIndex = propCurrentMatchIndex;

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
    const selection = editor.selection;
    if (selection) {
      const selectedText = Editor.string(editor, selection);
      setLinkText(selectedText);
    } else {
      setLinkText('');
    }
    setLinkUrl('');
    setLinkTitle('');
    setLinkTarget('_self');
    setIsEditingLink(false);
    setShowLinkModal(true);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) {
      alert('URL is required');
      return;
    }

    try {
      new URL(linkUrl);
    } catch {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    if (isEditingLink) {
      Transforms.setNodes(
        editor,
        { 
          url: linkUrl,
          title: linkTitle || undefined,
          target: linkTarget
        } as Partial<LinkElement>,
        {
          match: (n: any) => n.type === 'link'
        }
      );
      
      if (linkText.trim() && editor.selection) {
        Transforms.delete(editor, { at: editor.selection });
        Transforms.insertText(editor, linkText, { at: editor.selection });
      }
    } else {
      if (linkText.trim()) {
        if (editor.selection) {
          Transforms.delete(editor);
        }
        Transforms.insertNodes(editor, {
          type: 'link',
          url: linkUrl,
          title: linkTitle || undefined,
          target: linkTarget,
          children: [{ text: linkText }],
        } as any);
        Transforms.move(editor);
      } else if (editor.selection && !Range.isCollapsed(editor.selection)) {
        insertLink(editor, linkUrl, linkTitle || undefined, linkTarget);
      } else {
        Transforms.insertNodes(editor, {
          type: 'link',
          url: linkUrl,
          title: linkTitle || undefined,
          target: linkTarget,
          children: [{ text: linkUrl }],
        } as any);
        Transforms.move(editor);
      }
    }

    setShowLinkModal(false);
    setLinkText('');
    setLinkUrl('');
    setLinkTitle('');
    setLinkTarget('_self');
    setIsEditingLink(false);
  };

  const handleImageToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setImageUrl('');
    setImageAlt('');
    setImageFile(null);
    setImageUploadError('');
    setIsReplacingImage(false);
    setReplacingImagePath(null);
    setShowImageModal(true);
  };

  const handleInsertImage = async () => {
    setImageUploadError('');
    
    if (imageFile) {
      const editiumProps = (window as any).__editiumProps;
      if (!editiumProps?.onImageUpload) {
        setImageUploadError('Upload not configured. Please define onImageUpload in your app.');
        return;
      }
      
      try {
        const uploadedUrl = await editiumProps.onImageUpload(imageFile);
        
        if (isReplacingImage && replacingImagePath) {
          Transforms.setNodes(
            editor,
            { 
              url: uploadedUrl,
              alt: imageAlt || imageFile.name
            } as Partial<ImageElement>,
            { at: replacingImagePath }
          );
        } else {
          insertImage(editor, uploadedUrl, imageAlt || imageFile.name);
        }
        
        setShowImageModal(false);
        setImageUrl('');
        setImageAlt('');
        setImageFile(null);
        setIsReplacingImage(false);
        setReplacingImagePath(null);
      } catch (error) {
        setImageUploadError('Failed to upload image: ' + (error as Error).message);
      }
      return;
    }
    
    if (!imageUrl.trim()) {
      setImageUploadError('Please enter an image URL or select a file');
      return;
    }

    if (!isValidImageUrl(imageUrl)) {
      setImageUploadError('Please enter a valid image URL');
      return;
    }

    if (isReplacingImage && replacingImagePath) {
      Transforms.setNodes(
        editor,
        { 
          url: imageUrl,
          alt: imageAlt || 'Image'
        } as Partial<ImageElement>,
        { at: replacingImagePath }
      );
    } else {
      insertImage(editor, imageUrl, imageAlt || 'Image');
    }
    
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
    setImageFile(null);
    setIsReplacingImage(false);
    setReplacingImagePath(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageUploadError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageUploadError('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImageUploadError('');
    }
  };

  const handleTableToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowTableModal(true);
    setTableRows(3);
    setTableCols(3);
  };

  const handleInsertTable = () => {
    insertTable(editor, tableRows, tableCols);
    setShowTableModal(false);
  };

  const handleFindReplaceToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowFindReplace(!showFindReplace);
    if (!showFindReplace) {
      onSearchQueryChange?.('');
      setReplaceText('');
      onCurrentMatchIndexChange?.(0);
      onSearchMatchesChange?.([]);
      setTotalMatches(0);
    }
  };

  const handleImportDocx = (event: React.MouseEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.docx')) {
      onImportDocx?.(file);
    }
    // Reset input so the same file can be selected again
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleExportDocx = (event: React.MouseEvent) => {
    event.preventDefault();
    onExportDocx?.();
  };

  const handleExportPdf = (event: React.MouseEvent) => {
    event.preventDefault();
    onExportPdf?.();
  };

  React.useEffect(() => {
    if (!searchQuery || !showFindReplace) {
      onSearchMatchesChange?.([]);
      setTotalMatches(0);
      onCurrentMatchIndexChange?.(0);
      return;
    }

    const matches = findAllMatches(editor, searchQuery);
    onSearchMatchesChange?.(matches);
    setTotalMatches(matches.length);
    
    if (matches.length > 0) {
      onCurrentMatchIndexChange?.(0);
      navigateToMatch(editor, matches[0]);
    } else {
      onCurrentMatchIndexChange?.(0);
    }
  }, [searchQuery, showFindReplace, editor, onSearchMatchesChange, onCurrentMatchIndexChange]);

  const handleNextMatch = () => {
    if (searchMatches.length === 0) return;
    
    const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
    onCurrentMatchIndexChange?.(nextIndex);
    navigateToMatch(editor, searchMatches[nextIndex]);
  };

  const handlePrevMatch = () => {
    if (searchMatches.length === 0) return;
    
    const prevIndex = currentMatchIndex === 0 ? searchMatches.length - 1 : currentMatchIndex - 1;
    onCurrentMatchIndexChange?.(prevIndex);
    navigateToMatch(editor, searchMatches[prevIndex]);
  };

  const handleReplace = () => {
    if (searchMatches.length === 0 || currentMatchIndex >= searchMatches.length) return;
    
    replaceMatch(editor, searchMatches[currentMatchIndex], replaceText);
    
    const matches = findAllMatches(editor, searchQuery);
    onSearchMatchesChange?.(matches);
  };

  const handleReplaceAll = () => {
    if (searchMatches.length === 0) return;
    
    replaceAllMatches(editor, searchMatches, replaceText);
    
    onSearchQueryChange?.('');
    setTimeout(() => {
      onSearchQueryChange?.('');
      setReplaceText('');
      onSearchMatchesChange?.([]);
      setTotalMatches(0);
      onCurrentMatchIndexChange?.(0);
    }, 50);
  };

  React.useEffect(() => {
    const handleExternalEdit = (linkData: { url: string; title?: string; target?: '_blank' | '_self'; text: string; path?: any }) => {
      setLinkText(linkData.text);
      setLinkUrl(linkData.url);
      setLinkTitle(linkData.title || '');
      setLinkTarget(linkData.target || '_self');
      setIsEditingLink(true);
      setShowLinkModal(true);
      
      if (linkData.path) {
        editor.selection = Editor.range(editor, linkData.path);
      }
    };
    
    (window as any).__editiumLinkEditHandler = handleExternalEdit;
    
    return () => {
      delete (window as any).__editiumLinkEditHandler;
    };
  }, [editor]);

  React.useEffect(() => {
    const handleImageReplace = (imageData: { url: string; alt?: string; width?: number; height?: number; align?: any; path: any }) => {
      setImageUrl(imageData.url);
      setImageAlt(imageData.alt || '');
      setImageFile(null);
      setImageUploadError('');
      setIsReplacingImage(true);
      setReplacingImagePath(imageData.path);
      setShowImageModal(true);
    };
    
    (window as any).__editiumImageReplaceHandler = handleImageReplace;
    
    return () => {
      delete (window as any).__editiumImageReplaceHandler;
    };
  }, []);

  const blockFormattingItems = ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'];
  const alignmentItems = ['left', 'center', 'right', 'justify'];
  const formatItems = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
  const listItems = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
  const blockItems = ['blockquote', 'code-block'];
  const colorItems = ['text-color', 'bg-color'];
  const insertItems = ['link', 'horizontal-rule', 'image', 'table'];
  const editItems = ['undo', 'redo'];
  
  const colorPalette = [
    { name: 'Black', value: '#000000' },
    { name: 'Dark Gray', value: '#495057' },
    { name: 'Gray', value: '#6c757d' },
    { name: 'Light Gray', value: '#adb5bd' },
    { name: 'Red', value: '#dc3545' },
    { name: 'Orange', value: '#fd7e14' },
    { name: 'Yellow', value: '#ffc107' },
    { name: 'Green', value: '#28a745' },
    { name: 'Teal', value: '#20c997' },
    { name: 'Blue', value: '#007bff' },
    { name: 'Indigo', value: '#6610f2' },
    { name: 'Purple', value: '#6f42c1' },
    { name: 'Pink', value: '#e83e8c' },
    { name: 'White', value: '#ffffff' },
  ];

  const renderToolbarItem = (item: ToolbarItem, index: number) => {
    if (item === 'separator') {
      const prevItem = index > 0 ? items[index - 1] : null;
      if (prevItem) {
        if (formatItems.includes(prevItem)) {
          const firstFormatIndex = items.findIndex(i => formatItems.includes(i));
          if (firstFormatIndex !== index - 1) return null;
        }
        if (listItems.includes(prevItem)) {
          const firstListIndex = items.findIndex(i => listItems.includes(i));
          if (firstListIndex !== index - 1) return null;
        }
        if (alignmentItems.includes(prevItem)) {
          const firstAlignIndex = items.findIndex(i => alignmentItems.includes(i));
          if (firstAlignIndex !== index - 1) return null;
        }
        if (blockFormattingItems.includes(prevItem)) {
          const firstBlockIndex = items.findIndex(i => blockFormattingItems.includes(i));
          if (firstBlockIndex !== index - 1) return null;
        }
        if (insertItems.includes(prevItem)) {
          const firstInsertIndex = items.findIndex(i => insertItems.includes(i));
          if (firstInsertIndex !== index - 1) return null;
        }
        if (editItems.includes(prevItem)) {
          const firstEditIndex = items.findIndex(i => editItems.includes(i));
          if (firstEditIndex !== index - 1) return null;
        }
      }
      return <ToolbarSeparator key={`separator-${index}`} />;
    }
    
    if (blockFormattingItems.includes(item)) {
      const firstBlockIndex = items.findIndex(i => blockFormattingItems.includes(i));
      const currentIndex = items.findIndex(i => i === item);
      
      if (firstBlockIndex !== currentIndex) {
        return null; // Skip rendering individual block formatting buttons
      }
      
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
          trigger={<span>{activeBlock ? getBlockLabel(activeBlock) : 'Paragraph'}</span>}
          title="Block format"
          editor={editor}
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

    if (alignmentItems.includes(item)) {
      const firstAlignIndex = items.findIndex(i => alignmentItems.includes(i));
      const currentIndex = items.findIndex(i => i === item);
      
      if (firstAlignIndex !== currentIndex) {
        return null; // Skip rendering individual alignment buttons
      }
      
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
          trigger={<span>Align</span>}
          title="Text alignment"
          editor={editor}
        >
          {items.filter(i => alignmentItems.includes(i)).map(align => (
            <DropdownItem
              key={align}
              active={isAlignmentActive(editor, align as AlignmentType)}
              onMouseDown={(e) => handleAlignmentToggle(e, align as AlignmentType)}
              icon={getAlignmentIcon(align)}
            >
              {getAlignmentLabel(align)}
            </DropdownItem>
          ))}
        </Dropdown>
      );
    }

    switch (item) {
      case 'bold':
      case 'italic':
      case 'underline':
      case 'strikethrough':
      case 'code':
      case 'superscript':
      case 'subscript': {
        const formatItems = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
        const firstFormatIndex = items.findIndex(i => formatItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstFormatIndex !== currentIndex) return null;
        
        return (
          <Dropdown
            key="format-menu"
            trigger={<span>Format</span>}
            title="Format"
            editor={editor}
          >
            {items.includes('bold') && (
              <DropdownItem
                active={isMarkActive(editor, 'bold')}
                onMouseDown={(e) => handleMarkToggle(e, 'bold')}
                icon={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>B</span>}
              >
                Bold
              </DropdownItem>
            )}
            {items.includes('italic') && (
              <DropdownItem
                active={isMarkActive(editor, 'italic')}
                onMouseDown={(e) => handleMarkToggle(e, 'italic')}
                icon={<span style={{ fontStyle: 'italic', fontSize: '16px' }}>I</span>}
              >
                Italic
              </DropdownItem>
            )}
            {items.includes('underline') && (
              <DropdownItem
                active={isMarkActive(editor, 'underline')}
                onMouseDown={(e) => handleMarkToggle(e, 'underline')}
                icon={<span style={{ textDecoration: 'underline', fontSize: '16px' }}>U</span>}
              >
                Underline
              </DropdownItem>
            )}
            {items.includes('strikethrough') && (
              <DropdownItem
                active={isMarkActive(editor, 'strikethrough')}
                onMouseDown={(e) => handleMarkToggle(e, 'strikethrough')}
                icon={<span style={{ textDecoration: 'line-through', fontSize: '16px' }}>S</span>}
              >
                Strikethrough
              </DropdownItem>
            )}
            {items.includes('code') && (
              <DropdownItem
                active={isMarkActive(editor, 'code')}
                onMouseDown={(e) => handleMarkToggle(e, 'code')}
                icon={<CodeBracketIcon style={{ width: '16px', height: '16px' }} />}
              >
                Code
              </DropdownItem>
            )}
            {items.includes('superscript') && (
              <DropdownItem
                active={isMarkActive(editor, 'superscript')}
                onMouseDown={(e) => handleMarkToggle(e, 'superscript')}
                icon={<span style={{ fontSize: '12px' }}>X<sup>2</sup></span>}
              >
                Superscript
              </DropdownItem>
            )}
            {items.includes('subscript') && (
              <DropdownItem
                active={isMarkActive(editor, 'subscript')}
                onMouseDown={(e) => handleMarkToggle(e, 'subscript')}
                icon={<span style={{ fontSize: '12px' }}>X<sub>2</sub></span>}
              >
                Subscript
              </DropdownItem>
            )}
          </Dropdown>
        );
      }
      
      case 'bulleted-list':
      case 'numbered-list':
      case 'indent':
      case 'outdent': {
        const listItems = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
        const firstListIndex = items.findIndex(i => listItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstListIndex !== currentIndex) return null;
        
        return (
          <Dropdown
            key="lists-menu"
            trigger={<span>Lists</span>}
            title="Lists"
            editor={editor}
          >
            {items.includes('bulleted-list') && (
              <DropdownItem
                active={isBlockActive(editor, 'bulleted-list')}
                onMouseDown={(e) => handleBlockToggle(e, 'bulleted-list')}
                icon={<ListBulletIcon style={{ width: '16px', height: '16px' }} />}
              >
                Bullet list
              </DropdownItem>
            )}
            {items.includes('numbered-list') && (
              <DropdownItem
                active={isBlockActive(editor, 'numbered-list')}
                onMouseDown={(e) => handleBlockToggle(e, 'numbered-list')}
                icon={<span style={{ fontSize: '14px', fontWeight: '600' }}>1.</span>}
              >
                Numbered list
              </DropdownItem>
            )}
            {items.includes('indent') && (
              <DropdownItem
                active={false}
                onMouseDown={handleIndent}
                icon={<ArrowRightIcon style={{ width: '16px', height: '16px' }} />}
              >
                Increase indent
              </DropdownItem>
            )}
            {items.includes('outdent') && (
              <DropdownItem
                active={false}
                onMouseDown={handleOutdent}
                icon={<ArrowLeftIcon style={{ width: '16px', height: '16px' }} />}
              >
                Decrease indent
              </DropdownItem>
            )}
          </Dropdown>
        );
      }
      
      case 'blockquote':
      case 'code-block': {
        const firstBlockItemIndex = items.findIndex(i => blockItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstBlockItemIndex !== currentIndex) return null;
        
        return (
          <Dropdown
            key="blocks-menu"
            trigger={<span>Blocks</span>}
            title="Blocks"
            editor={editor}
          >
            {items.includes('blockquote') && (
              <DropdownItem
                active={isBlockActive(editor, 'blockquote')}
                onMouseDown={(e) => handleBlockToggle(e, 'blockquote')}
                icon={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>❝</span>}
              >
                Blockquote
              </DropdownItem>
            )}
            {items.includes('code-block') && (
              <DropdownItem
                active={isBlockActive(editor, 'code-block')}
                onMouseDown={(e) => handleBlockToggle(e, 'code-block')}
                icon={<CodeBracketIcon style={{ width: '16px', height: '16px' }} />}
              >
                Code Block
              </DropdownItem>
            )}
          </Dropdown>
        );
      }
      
      case 'text-color':
      case 'bg-color': {
        const firstColorIndex = items.findIndex(i => colorItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstColorIndex !== currentIndex) return null;
        
        const activeTextColor = getActiveColor(editor);
        const activeBgColor = getActiveBackgroundColor(editor);
        
        return (
          <Dropdown
            key="color-menu"
            trigger={<span>Color</span>}
            title="Color"
            editor={editor}
          >
            {items.includes('text-color') && (
              <div style={{ padding: '8px 12px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#495057'
                }}>
                  Text Color
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(7, 1fr)', 
                  gap: '4px',
                  marginBottom: '8px'
                }}>
                  {colorPalette.map((color) => (
                    <button
                      key={`text-${color.value}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applyColor(editor, color.value);
                      }}
                      title={color.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: color.value,
                        border: activeTextColor === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        padding: 0,
                        boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  marginBottom: '8px',
                  paddingTop: '4px'
                }}>
                  <input
                    type="color"
                    value={activeTextColor || '#000000'}
                    onChange={(e) => {
                      applyColor(editor, e.target.value);
                    }}
                    title="Pick custom color"
                    style={{
                      width: '24px',
                      height: '24px',
                      border: '1px solid #dee2e6',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      padding: '0',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#6c757d'
                  }}>
                    Custom
                  </span>
                </div>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyColor(editor, null);
                  }}
                  style={{
                    width: '100%',
                    padding: '4px 8px',
                    fontSize: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '3px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: '#495057'
                  }}
                >
                  Remove Color
                </button>
              </div>
            )}
            {items.includes('bg-color') && (
              <div style={{ padding: '8px 12px', borderTop: '1px solid #dee2e6' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#495057'
                }}>
                  Background Highlight
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(7, 1fr)', 
                  gap: '4px',
                  marginBottom: '8px'
                }}>
                  {colorPalette.map((color) => (
                    <button
                      key={`bg-${color.value}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applyBackgroundColor(editor, color.value);
                      }}
                      title={color.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: color.value,
                        border: activeBgColor === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        padding: 0,
                        boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  marginBottom: '8px',
                  paddingTop: '4px'
                }}>
                  <input
                    type="color"
                    value={activeBgColor || '#ffffff'}
                    onChange={(e) => {
                      applyBackgroundColor(editor, e.target.value);
                    }}
                    title="Pick custom color"
                    style={{
                      width: '24px',
                      height: '24px',
                      border: '1px solid #dee2e6',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      padding: '0',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#6c757d'
                  }}>
                    Custom
                  </span>
                </div>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyBackgroundColor(editor, null);
                  }}
                  style={{
                    width: '100%',
                    padding: '4px 8px',
                    fontSize: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '3px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: '#495057'
                  }}
                >
                  Remove Highlight
                </button>
              </div>
            )}
          </Dropdown>
        );
      }
      
      case 'link':
      case 'horizontal-rule':
      case 'image':
      case 'table': {
        const firstInsertIndex = items.findIndex(i => insertItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstInsertIndex !== currentIndex) return null;
        
        return (
          <Dropdown
            key="insert-menu"
            trigger={<span>Insert</span>}
            title="Insert"
            editor={editor}
          >
            {items.includes('link') && (
              <DropdownItem
                active={isLinkActive(editor)}
                onMouseDown={handleLinkToggle}
                icon={<LinkIcon style={{ width: '16px', height: '16px' }} />}
              >
                Link
              </DropdownItem>
            )}
            {items.includes('image') && (
              <DropdownItem
                active={false}
                onMouseDown={handleImageToggle}
                icon={<PhotoIcon style={{ width: '16px', height: '16px' }} />}
              >
                Image
              </DropdownItem>
            )}
            {items.includes('table') && (
              <DropdownItem
                active={false}
                onMouseDown={handleTableToggle}
                icon={<TableCellsIcon style={{ width: '16px', height: '16px' }} />}
              >
                Table
              </DropdownItem>
            )}
            {items.includes('horizontal-rule') && (
              <DropdownItem
                active={false}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertHorizontalRule(editor);
                }}
                icon={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>―</span>}
              >
                Horizontal Rule
              </DropdownItem>
            )}
          </Dropdown>
        );
      }
      
      case 'undo':
      case 'redo': {
        const firstEditIndex = items.findIndex(i => editItems.includes(i));
        const currentIndex = items.findIndex(i => i === item);
        
        if (firstEditIndex !== currentIndex) return null;
        
        return (
          <Dropdown
            key="edit-menu"
            trigger={<span>Edit</span>}
            title="Edit"
            editor={editor}
          >
            {items.includes('undo') && (
              <DropdownItem
                active={false}
                onMouseDown={handleUndo}
                icon={<ArrowUturnLeftIcon style={{ width: '16px', height: '16px' }} />}
              >
                Undo
              </DropdownItem>
            )}
            {items.includes('redo') && (
              <DropdownItem
                active={false}
                onMouseDown={handleRedo}
                icon={<ArrowUturnRightIcon style={{ width: '16px', height: '16px' }} />}
              >
                Redo
              </DropdownItem>
            )}
          </Dropdown>
        );
      }
      case 'view-output':
        return (
          <Dropdown
            key={item}
            trigger={<span>View</span>}
            title="View Output"
            editor={editor}
          >
            <DropdownItem
              active={false}
              onMouseDown={(event) => {
                event.preventDefault();
                if (onViewOutput) {
                  onViewOutput('preview');
                }
              }}
              icon={<ArrowTopRightOnSquareIcon style={{ width: '16px', height: '16px' }} />}
            >
              Preview
            </DropdownItem>
            <DropdownItem
              active={false}
              onMouseDown={(event) => {
                event.preventDefault();
                if (onViewOutput) {
                  onViewOutput('html');
                }
              }}
              icon={<span style={{ fontFamily: 'monospace', fontSize: '14px' }}>&lt;/&gt;</span>}
            >
              View HTML
            </DropdownItem>
            <DropdownItem
              active={false}
              onMouseDown={(event) => {
                event.preventDefault();
                if (onViewOutput) {
                  onViewOutput('json');
                }
              }}
              icon={<span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{ }</span>}
            >
              View JSON
            </DropdownItem>
          </Dropdown>
        );
      case 'find-replace':
        return (
          <ToolbarButton
            key={item}
            active={showFindReplace}
            onMouseDown={handleFindReplaceToggle}
            title="Find & Replace"
          >
            <MagnifyingGlassIcon style={{ width: '18px', height: '18px' }} />
          </ToolbarButton>
        );
      case 'import-docx':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleImportDocx}
            title="Import from Word (.docx)"
          >
            <DocumentArrowUpIcon style={{ width: '18px', height: '18px' }} />
          </ToolbarButton>
        );
      case 'export-docx':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleExportDocx}
            title="Export to Word (.docx)"
          >
            <DocumentArrowDownIcon style={{ width: '18px', height: '18px' }} />
          </ToolbarButton>
        );
      case 'export-pdf':
        return (
          <ToolbarButton
            key={item}
            active={false}
            onMouseDown={handleExportPdf}
            title="Export to PDF"
          >
            <ArrowDownTrayIcon style={{ width: '18px', height: '18px' }} />
          </ToolbarButton>
        );
      case 'fullscreen':
        return (
          <ToolbarButton
            key={item}
            active={isFullscreen}
            onMouseDown={(e) => {
              e.preventDefault();
              onFullscreenToggle?.();
            }}
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F11)"}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon style={{ width: '18px', height: '18px' }} />
            ) : (
              <ArrowsPointingOutIcon style={{ width: '18px', height: '18px' }} />
            )}
          </ToolbarButton>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showLinkModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
          onClick={() => {
            setShowLinkModal(false);
            setLinkText('');
            setLinkUrl('');
            setLinkTitle('');
            setLinkTarget('_self');
            setIsEditingLink(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }}>
              {isEditingLink ? 'Edit Link' : 'Insert Link'}
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                Text to display
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Enter link text"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <small style={{ display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }}>
                If empty, will use URL or selected text as display text
              </small>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                URL <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleInsertLink();
                  }
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                Title
              </label>
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Link title (tooltip)"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <small style={{ display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }}>
                Appears as a tooltip when hovering over the link
              </small>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                Open link in
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="linkTarget"
                    value="_self"
                    checked={linkTarget === '_self'}
                    onChange={(e) => setLinkTarget(e.target.value as '_self' | '_blank')}
                    style={{ marginRight: '6px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Current tab</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="linkTarget"
                    value="_blank"
                    checked={linkTarget === '_blank'}
                    onChange={(e) => setLinkTarget(e.target.value as '_self' | '_blank')}
                    style={{ marginRight: '6px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>New tab</span>
                </label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkText('');
                  setLinkUrl('');
                  setLinkTitle('');
                  setLinkTarget('_self');
                  setIsEditingLink(false);
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Cancel
              </button>
              <button
                onClick={handleInsertLink}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                {isEditingLink ? 'Update Link' : 'Insert Link'}
              </button>
            </div>
          </div>
        </div>
      )}
      {showImageModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
          onClick={() => {
            setShowImageModal(false);
            setImageUrl('');
            setImageAlt('');
            setImageFile(null);
            setImageUploadError('');
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }}>
              {isReplacingImage ? 'Replace Image' : 'Insert Image'}
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                disabled={!!imageFile}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: imageFile ? '#f9fafb' : '#ffffff',
                }}
                onFocus={(e) => !imageFile && (e.target.style.borderColor = '#3b82f6')}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ 
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }}>
                Or upload from your computer
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Choose File
              </label>
              {imageFile && (
                <p style={{ margin: '8px 0 0 0', color: '#374151', fontSize: '13px' }}>
                  Selected: {imageFile.name}
                </p>
              )}
              {!( (window as any).__editiumProps?.onImageUpload) && (
                <p style={{ 
                  margin: '8px 0 0 0', 
                  color: '#dc2626', 
                  fontSize: '12px',
                  fontStyle: 'italic'
                }}>
                  ⚠ Upload not configured. Define onImageUpload in your app.
                </p>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                Alt Text (optional)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the image"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <small style={{ display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }}>
                For accessibility
              </small>
            </div>

            {imageUploadError && (
              <div style={{
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                color: '#dc2626',
                fontSize: '14px'
              }}>
                {imageUploadError}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                  setImageAlt('');
                  setImageFile(null);
                  setImageUploadError('');
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Cancel
              </button>
              <button
                onClick={handleInsertImage}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                {isReplacingImage ? 'Replace' : 'Insert Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Modal */}
      {showTableModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
              Insert Table
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 30px)',
                gridTemplateRows: 'repeat(10, 30px)',
                gap: '2px',
                padding: '8px',
                backgroundColor: '#f9fafb',
                borderRadius: '4px',
                width: 'fit-content',
              }}>
                {Array.from({ length: 100 }, (_, index) => {
                  const row = Math.floor(index / 10) + 1;
                  const col = (index % 10) + 1;
                  const isHighlighted = row <= tableRows && col <= tableCols;
                  
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => {
                        setTableRows(row);
                        setTableCols(col);
                      }}
                      onClick={handleInsertTable}
                      style={{
                        width: '30px',
                        height: '30px',
                        border: '1px solid #d1d5db',
                        backgroundColor: isHighlighted ? '#3b82f6' : 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease',
                        borderRadius: '2px',
                      }}
                    />
                  );
                })}
              </div>
              
              <div style={{ 
                marginTop: '12px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
              }}>
                {tableRows} × {tableCols} Table
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowTableModal(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                Cancel
              </button>
              <button
                onClick={handleInsertTable}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                Insert Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className={className} style={{ 
        border: '1px solid #ccc', 
        borderBottom: showFindReplace ? 'none' : '1px solid #ccc', 
        padding: '4px 8px', 
        backgroundColor: '#fff',
        borderRadius: showFindReplace ? '4px 4px 0 0' : '4px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'none',
        minHeight: '42px',
        maxWidth: '100%',
        overflow: 'visible',
        position: 'relative',
        zIndex: 100
      }}>
        {/* Left side: All items except fullscreen and find-replace */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', alignItems: 'center', flex: 1 }}>
          {items.filter(item => item !== 'fullscreen' && item !== 'find-replace').map((item, index) => renderToolbarItem(item, index))}
        </div>
        
        {/* Right side: Import status, Find-replace and Fullscreen buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '8px' }}>
          {/** Import status pill (dismissible) */}
          {typeof onClearImportStatus === 'function' && typeof importStatus !== 'undefined' && importStatus && (
            <div
              role="status"
              aria-live="polite"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: '16px',
                fontSize: '13px',
                color: importStatus.type === 'error' ? '#7f1d1d' : importStatus.type === 'success' ? '#064e3b' : '#0c4a6e',
                backgroundColor: importStatus.type === 'error' ? '#fef2f2' : importStatus.type === 'success' ? '#ecfccb' : '#e6f2ff',
                border: importStatus.type === 'error' ? '1px solid #fecaca' : importStatus.type === 'success' ? '1px solid #bbf7d0' : '1px solid #bae6fd',
                maxWidth: '360px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <span style={{ display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{importStatus.message}</span>
              <button
                onClick={(e) => { e.preventDefault(); onClearImportStatus?.(); }}
                title="Dismiss"
                aria-label="Dismiss import status"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  color: 'inherit',
                  fontSize: '14px',
                }}
              >
                ×
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '2px' }}>
            {items.includes('find-replace') && renderToolbarItem('find-replace', items.length - 1)}
            {items.includes('fullscreen') && renderToolbarItem('fullscreen', items.length)}
          </div>
        </div>
      </div>

      {/* Find & Replace Panel - Below Toolbar */}
      {showFindReplace && (
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #ccc',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}>
          {/* Search Input */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange?.(e.target.value)}
                placeholder="Find..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 32px',
                  border: searchQuery && totalMatches === 0 ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!searchQuery || totalMatches > 0) {
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  if (searchQuery && totalMatches === 0) {
                    e.currentTarget.style.borderColor = '#ef4444';
                  } else {
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <MagnifyingGlassIcon 
                style={{ 
                  width: '16px', 
                  height: '16px',
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  pointerEvents: 'none',
                }} 
              />
            </div>
            {searchQuery && (
              <div style={{ 
                marginTop: '4px', 
                fontSize: '11px', 
                color: totalMatches === 0 ? '#ef4444' : '#6b7280',
              }}>
                {totalMatches === 0 ? 'No matches' : `${currentMatchIndex + 1} of ${totalMatches}`}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {searchQuery && (
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={handlePrevMatch}
                disabled={totalMatches === 0}
                title="Previous match (Shift+Enter)"
                style={{
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                  cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (totalMatches > 0) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (totalMatches > 0) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              >
                <ChevronLeftIcon style={{ width: '14px', height: '14px' }} />
              </button>
              <button
                onClick={handleNextMatch}
                disabled={totalMatches === 0}
                title="Next match (Enter)"
                style={{
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                  cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (totalMatches > 0) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (totalMatches > 0) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              >
                <ChevronRightIcon style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          )}

          {/* Replace Input */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replace..."
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleReplace}
              disabled={searchMatches.length === 0}
              title="Replace current match"
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: searchMatches.length === 0 ? '#f3f4f6' : 'white',
                color: searchMatches.length === 0 ? '#9ca3af' : '#374151',
                cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (searchMatches.length > 0) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (searchMatches.length > 0) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              Replace
            </button>
            <button
              onClick={handleReplaceAll}
              disabled={searchMatches.length === 0}
              title="Replace all matches"
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: searchMatches.length === 0 ? '#cbd5e1' : '#3b82f6',
                color: 'white',
                cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (searchMatches.length > 0) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (searchMatches.length > 0) {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
            >
              Replace All
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowFindReplace(false)}
            title="Close (Esc)"
            style={{
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.color = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <XMarkIcon style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )}
      
      {/* Hidden file input for .docx import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
    </>
  );
};

export default Toolbar;
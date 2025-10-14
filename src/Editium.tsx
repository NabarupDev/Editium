import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { createEditor, Descendant, Editor, Element as SlateElement, Text, Transforms, Range } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import Toolbar from './Toolbar';
import ResizableImage from './ResizableImage';
import { TableComponent, TableRowComponent, TableCellComponent } from './TableElement';
import { EditiumProps, CustomElement, CustomText, LinkElement, ImageElement, TableElement, TableRowElement, TableCellElement, ALL_TOOLBAR_ITEMS } from './types';
import { defaultInitialValue, serializeToHtml, toggleMark, unwrapLink, getTextContent, countWords, countCharacters, countCharactersNoSpaces } from './utils';

// Render leaf nodes
const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const textLeaf = leaf as CustomText;
  
  if (textLeaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (textLeaf.italic) {
    children = <em>{children}</em>;
  }

  if (textLeaf.underline) {
    children = <u>{children}</u>;
  }

  if (textLeaf.strikethrough) {
    children = <s>{children}</s>;
  }

  if (textLeaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (textLeaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (textLeaf.code) {
    children = <code style={{ 
      backgroundColor: '#f4f4f4', 
      padding: '2px 4px', 
      borderRadius: '3px', 
      fontFamily: 'monospace' 
    }}>{children}</code>;
  }

  // Apply color and background color
  const style: React.CSSProperties = {};
  if (textLeaf.color) {
    style.color = textLeaf.color;
  }
  if (textLeaf.backgroundColor) {
    style.backgroundColor = textLeaf.backgroundColor;
  }
  
  // Apply search highlighting
  if (textLeaf.searchCurrent) {
    style.backgroundColor = '#ff9800';
    style.color = '#fff';
  } else if (textLeaf.search) {
    style.backgroundColor = '#ffeb3b';
  }

  return <span {...attributes} style={Object.keys(style).length > 0 ? style : undefined}>{children}</span>;
};

// Parse initial value
const parseInitialValue = (initialValue?: string | CustomElement[]): CustomElement[] => {
  if (!initialValue) {
    return defaultInitialValue;
  }

  if (typeof initialValue === 'string') {
    // Simple string to editor format conversion
    if (initialValue.trim() === '') {
      return defaultInitialValue;
    }
    return [
      {
        type: 'paragraph',
        children: [{ text: initialValue }],
      },
    ];
  }

  return initialValue.length > 0 ? initialValue : defaultInitialValue;
};

// Custom editor plugin to normalize tables
const withTables = (editor: any) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry: any) => {
    const [node, path] = entry;

    // If this is a table, ensure it only contains table-row children
    if (SlateElement.isElement(node) && node.type === 'table') {
      for (const [child, childPath] of Array.from(Editor.nodes(editor, { at: path }))) {
        if (childPath.length === path.length + 1 && SlateElement.isElement(child) && child.type !== 'table-row') {
          // Remove any non-table-row children from table
          Transforms.removeNodes(editor, { at: childPath });
          return;
        }
      }
    }

    // If this is a table-row, ensure it only contains table-cell children
    if (SlateElement.isElement(node) && node.type === 'table-row') {
      for (const [child, childPath] of Array.from(Editor.nodes(editor, { at: path }))) {
        if (childPath.length === path.length + 1 && SlateElement.isElement(child) && child.type !== 'table-cell') {
          // Remove any non-table-cell children from table-row
          Transforms.removeNodes(editor, { at: childPath });
          return;
        }
      }
    }

    // Fall back to the original `normalizeNode`
    normalizeNode(entry);
  };

  return editor;
};

const Editium: React.FC<EditiumProps> = ({
  initialValue,
  onChange,
  toolbar = ['bold', 'italic', 'underline', 'heading-one', 'heading-two', 'bulleted-list', 'numbered-list', 'link'],
  placeholder = 'Start typing...',
  className = '',
  style = {},
  readOnly = false,
  onImageUpload,
  searchQuery: externalSearchQuery,
  searchMatches: externalSearchMatches,
  currentMatchIndex: externalCurrentMatchIndex,
  showWordCount = true,
  height = '200px',
  minHeight = '150px',
  maxHeight = '250px',
}) => {
  // Parse toolbar configuration - support 'all' keyword
  const toolbarItems = toolbar === 'all' ? ALL_TOOLBAR_ITEMS : toolbar;
  const editor = useMemo(() => withTables(withHistory(withReact(createEditor()))), []);
  const [value, setValue] = useState<CustomElement[]>(() => parseInitialValue(initialValue));
  const [showOutputModal, setShowOutputModal] = useState<'html' | 'json' | 'preview' | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkPopupPosition, setLinkPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedLink, setSelectedLink] = useState<LinkElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Internal search state (used when not controlled externally)
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [internalSearchMatches, setInternalSearchMatches] = useState<Array<{ path: any; offset: number; text: string }>>([]);
  const [internalCurrentMatchIndex, setInternalCurrentMatchIndex] = useState(0);
  
  // Use external state if provided, otherwise use internal state
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const searchMatches = externalSearchMatches !== undefined ? externalSearchMatches : internalSearchMatches;
  const currentMatchIndex = externalCurrentMatchIndex !== undefined ? externalCurrentMatchIndex : internalCurrentMatchIndex;
  
  // Store props in window for Toolbar access
  useEffect(() => {
    (window as any).__editiumProps = { onImageUpload };
    return () => {
      delete (window as any).__editiumProps;
    };
  }, [onImageUpload]);
  const [selectedLinkPath, setSelectedLinkPath] = useState<any>(null);

  // Handle fullscreen toggle
  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle keyboard shortcuts for fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F11 to toggle fullscreen
      if (event.key === 'F11') {
        event.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
      // ESC to exit fullscreen
      if (event.key === 'Escape' && isFullscreen) {
        event.preventDefault();
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Handle Delete/Backspace for selected images
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const { selection } = editor;
      if (selection) {
        // Check if an image node is in the current selection
        const [imageNode] = Array.from(
          Editor.nodes(editor, {
            at: selection,
            match: (n: any) => 
              !Editor.isEditor(n) && 
              SlateElement.isElement(n) && 
              n.type === 'image',
          })
        );
        
        if (imageNode) {
          event.preventDefault();
          const [, imagePath] = imageNode;
          Transforms.removeNodes(editor, { at: imagePath });
          return;
        }
        
        // For Delete key, also check the next node
        if (event.key === 'Delete' && Range.isCollapsed(selection)) {
          try {
            const after = Editor.after(editor, selection);
            if (after) {
              const [nextNode] = Array.from(
                Editor.nodes(editor, {
                  at: after,
                  match: (n: any) => 
                    !Editor.isEditor(n) && 
                    SlateElement.isElement(n) && 
                    n.type === 'image',
                })
              );
              
              if (nextNode) {
                event.preventDefault();
                const [, nextPath] = nextNode;
                Transforms.removeNodes(editor, { at: nextPath });
                return;
              }
            }
          } catch (e) {
            // Ignore errors if we can't find next node
          }
        }
      }
    }

    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'b':
        event.preventDefault();
        toggleMark(editor, 'bold');
        break;
      case 'i':
        event.preventDefault();
        toggleMark(editor, 'italic');
        break;
      case 'u':
        event.preventDefault();
        toggleMark(editor, 'underline');
        break;
      case '`':
        event.preventDefault();
        toggleMark(editor, 'code');
        break;
      case 'd':
        event.preventDefault();
        toggleMark(editor, 'strikethrough');
        break;
      case 'z':
        if (event.shiftKey) {
          event.preventDefault();
          HistoryEditor.redo(editor as HistoryEditor);
        } else {
          event.preventDefault();
          HistoryEditor.undo(editor as HistoryEditor);
        }
        break;
      case 'y':
        event.preventDefault();
        HistoryEditor.redo(editor as HistoryEditor);
        break;
    }
  }, [editor]);

  // Handle value changes
  const handleChange = useCallback((newValue: Descendant[]) => {
    setValue(newValue as CustomElement[]);
    
    if (onChange) {
      const htmlValue = serializeToHtml(newValue as (CustomElement | LinkElement)[]);
      onChange(htmlValue, newValue as CustomElement[]);
    }
  }, [onChange]);

  // Calculate word and character counts
  const textContent = useMemo(() => getTextContent(editor.children), [editor.children]);
  const wordCount = useMemo(() => countWords(textContent), [textContent]);
  const charCount = useMemo(() => countCharacters(textContent), [textContent]);
  const charCountNoSpaces = useMemo(() => countCharactersNoSpaces(textContent), [textContent]);

  // Update value when initialValue prop changes
  useEffect(() => {
    if (initialValue !== undefined) {
      const parsedValue = parseInitialValue(initialValue);
      setValue(parsedValue);
    }
  }, [initialValue]);

  // Handle copy to clipboard
  const handleCopy = useCallback(() => {
    const currentValue = editor.children as CustomElement[];
    const textToCopy = showOutputModal === 'html' 
      ? serializeToHtml(currentValue)
      : JSON.stringify(currentValue, null, 2);
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [showOutputModal, editor]);

  // Handle link click
  const handleLinkClick = useCallback((event: React.MouseEvent, linkElement: LinkElement) => {
    event.preventDefault();
    
    // Find the link node in the editor
    const [linkEntry] = Array.from(
      Editor.nodes(editor, {
        match: (n: any) => n.type === 'link' && n.url === linkElement.url,
      })
    );
    
    if (linkEntry) {
      const [linkNode, path] = linkEntry;
      setSelectedLinkPath(path);
    }
    
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setLinkPopupPosition({ 
      x: rect.left + window.scrollX, 
      y: rect.bottom + window.scrollY + 5 
    });
    setSelectedLink(linkElement);
    setShowLinkPopup(true);
  }, [editor]);

  // Decorate callback for search highlighting
  const decorate = useCallback(([node, path]: any) => {
    const ranges: any[] = [];
    
    if (searchQuery && searchMatches.length > 0 && Text.isText(node)) {
      // Find which matches belong to this text node
      searchMatches.forEach((match, index) => {
        // Check if this match is in the current text node
        if (JSON.stringify(match.path) === JSON.stringify(path)) {
          ranges.push({
            anchor: { path, offset: match.offset },
            focus: { path, offset: match.offset + match.text.length },
            search: true,
            searchCurrent: index === currentMatchIndex,
          });
        }
      });
    }
    
    return ranges;
  }, [searchQuery, searchMatches, currentMatchIndex]);

  // Render elements with link click handler
  const renderElementWithHandlers = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    const style = { margin: '0', fontWeight: 'normal' };
    const alignStyle = (element as CustomElement).align ? { 
      textAlign: (element as CustomElement).align as 'left' | 'center' | 'right' | 'justify' 
    } : {};
    const combinedStyle = { ...style, ...alignStyle };
    
    switch ((element as CustomElement | LinkElement).type) {
      case 'paragraph':
        return <p {...attributes} style={combinedStyle}>{children}</p>;
      case 'heading-one':
        return <h1 {...attributes} style={{...combinedStyle, fontSize: '2em', margin: '0'}}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes} style={{...combinedStyle, fontSize: '1.5em', margin: '0'}}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes} style={{...combinedStyle, fontSize: '1.25em', margin: '0'}}>{children}</h3>;
      case 'heading-four':
        return <h4 {...attributes} style={{...combinedStyle, fontSize: '1.1em', margin: '0'}}>{children}</h4>;
      case 'heading-five':
        return <h5 {...attributes} style={{...combinedStyle, fontSize: '1em', margin: '0'}}>{children}</h5>;
      case 'heading-six':
        return <h6 {...attributes} style={{...combinedStyle, fontSize: '0.9em', margin: '0'}}>{children}</h6>;
      case 'heading-seven':
        return <h1 {...attributes} style={{...combinedStyle, fontSize: '0.85em', margin: '0'}}>{children}</h1>;
      case 'heading-eight':
        return <h1 {...attributes} style={{...combinedStyle, fontSize: '0.8em', margin: '0'}}>{children}</h1>;
      case 'bulleted-list':
        return <ul {...attributes} style={{...style, margin: '0'}}>{children}</ul>;
      case 'numbered-list':
        return <ol {...attributes} style={{...style, margin: '0'}}>{children}</ol>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'blockquote':
        return (
          <blockquote 
            {...attributes} 
            style={{
              ...combinedStyle,
              borderLeft: '4px solid #ddd',
              paddingLeft: '16px',
              marginLeft: '0',
              marginRight: '0',
              color: '#666',
              fontStyle: 'italic'
            }}
          >
            {children}
          </blockquote>
        );
      case 'code-block':
        return (
          <pre 
            {...attributes}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '4px',
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0'
            }}
          >
            <code>{children}</code>
          </pre>
        );
      case 'horizontal-rule':
        return (
          <div {...attributes} contentEditable={false} style={{ userSelect: 'none' }}>
            <hr style={{ 
              border: 'none',
              borderTop: '2px solid #ddd',
              margin: '16px 0'
            }} />
            {children}
          </div>
        );
      case 'image':
        const imageElement = element as ImageElement;
        return <ResizableImage element={imageElement} attributes={attributes} children={children} />;
      case 'table':
        const tableElement = element as TableElement;
        return <TableComponent element={tableElement} attributes={attributes} children={children} />;
      case 'table-row':
        const tableRowElement = element as TableRowElement;
        return <TableRowComponent element={tableRowElement} attributes={attributes} children={children} />;
      case 'table-cell':
        const tableCellElement = element as TableCellElement;
        return <TableCellComponent element={tableCellElement} attributes={attributes} children={children} />;
      case 'link':
        const linkElement = element as LinkElement;
        return (
          <a 
            {...attributes} 
            href={linkElement.url}
            title={linkElement.title}
            onClick={(e) => handleLinkClick(e, linkElement)}
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {children}
          </a>
        );
      default:
        return <p {...attributes} style={combinedStyle}>{children}</p>;
    }
  }, [handleLinkClick]);

  // Handle link actions
  const handleOpenLink = useCallback(() => {
    if (selectedLink) {
      window.open(selectedLink.url, selectedLink.target || '_self');
      setShowLinkPopup(false);
    }
  }, [selectedLink]);

  const handleRemoveLink = useCallback(() => {
    if (selectedLink) {
      // Find the link node in the current editor state
      const linkEntries = Array.from(
        Editor.nodes(editor, {
          match: (n: any) => 
            !Editor.isEditor(n) && 
            SlateElement.isElement(n) && 
            n.type === 'link' && 
            n.url === selectedLink.url,
        })
      );
      
      if (linkEntries.length > 0) {
        const [linkNode, linkPath] = linkEntries[0];
        const link = linkNode as LinkElement;
        
        // Check if link is at root level (path length is 1)
        if (linkPath.length === 1) {
          // Link is at root level - replace it with a paragraph containing the text
          const textChildren = link.children;
          
          Transforms.removeNodes(editor, { at: linkPath });
          
          Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: textChildren,
          } as CustomElement, {
            at: linkPath,
          });
        } else {
          // Link is inside a paragraph - just unwrap it
          Transforms.unwrapNodes(editor, {
            at: linkPath,
          });
        }
      }
      
      setShowLinkPopup(false);
    }
  }, [selectedLink, editor]);

  const handleEditLink = useCallback(() => {
    if (selectedLink && selectedLinkPath) {
      // Get the text content of the link using its path
      const linkText = Editor.string(editor, selectedLinkPath);
      
      // Call the window handler to trigger edit in toolbar
      if ((window as any).__editiumLinkEditHandler) {
        (window as any).__editiumLinkEditHandler({
          url: selectedLink.url,
          title: selectedLink.title,
          target: selectedLink.target,
          text: linkText,
          path: selectedLinkPath
        });
      }
    }
    setShowLinkPopup(false);
  }, [selectedLink, selectedLinkPath, editor]);

  // Format HTML with proper indentation
  const formatHtml = useCallback((html: string): string => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
    
    html.split(/(<[^>]+>)/g).forEach(part => {
      if (part.trim() === '') return;
      
      if (part.startsWith('</')) {
        indent--;
        formatted += tab.repeat(Math.max(0, indent)) + part + '\n';
      } else if (part.startsWith('<')) {
        formatted += tab.repeat(indent) + part + '\n';
        if (!part.includes('</') && !part.endsWith('/>')) {
          indent++;
        }
      } else {
        formatted += tab.repeat(indent) + part.trim() + '\n';
      }
    });
    
    return formatted.trim();
  }, []);

  const editorStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: toolbar.length > 0 ? '0' : '4px 4px 0 0',
    borderBottom: 'none',
    padding: '16px',
    height: typeof height === 'number' ? `${height}px` : height,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '1.6',
    outline: 'none',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    ...style,
  };

  const containerStyle: React.CSSProperties = isFullscreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } : {};

  const editableStyle: React.CSSProperties = isFullscreen ? {
    ...editorStyle,
    flex: 1,
    overflow: 'auto',
    border: 'none',
    borderRadius: 0,
  } : editorStyle;

  return (
    <>
      <style>
        {`
          [data-slate-editor] {
            position: relative;
            min-height: inherit;
            height: 100%;
          }
          
          /* Custom scrollbar styling for better UX */
          [data-slate-editor]::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          [data-slate-editor]::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          [data-slate-editor]::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }
          
          [data-slate-editor]::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          
          [data-slate-editor] [data-slate-placeholder] {
            opacity: 0.333;
            pointer-events: none;
            user-select: none;
            display: inline-block !important;
            width: 100%;
            max-width: 100%;
            white-space: nowrap;
            margin: 0 !important;
            vertical-align: text-top;
          }
          
          [data-slate-editor] p,
          [data-slate-editor] h1,
          [data-slate-editor] h2,
          [data-slate-editor] h3,
          [data-slate-editor] h4,
          [data-slate-editor] h5,
          [data-slate-editor] h6 {
            position: relative;
          }
          
          [data-slate-editor] [contenteditable="true"] {
            outline: none;
            position: relative;
            z-index: 1;
          }
          
          [data-slate-editor] > * {
            margin: 0 !important;
            line-height: 1.6;
          }
          
          [data-slate-editor] p {
            margin: 0 !important;
            line-height: 1.6;
          }
          
          [data-slate-editor] h1,
          [data-slate-editor] h2,
          [data-slate-editor] h3,
          [data-slate-editor] h4,
          [data-slate-editor] h5,
          [data-slate-editor] h6 {
            margin: 0 !important;
            line-height: 1.6;
          }
          
          [data-slate-editor] ul,
          [data-slate-editor] ol {
            margin: 0 !important;
            padding-left: 24px;
          }
        `}
      </style>
      <div className={className} style={containerStyle}>
        {showLinkPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
          }}
          onClick={() => setShowLinkPopup(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: `${linkPopupPosition.y}px`,
              left: `${linkPopupPosition.x}px`,
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              minWidth: '200px',
              overflow: 'hidden',
              zIndex: 9999,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedLink && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Link URL:</div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#111827', 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace'
                }}>
                  {selectedLink.url}
                </div>
              </div>
            )}
            <button
              onClick={handleOpenLink}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#374151',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Link
            </button>
            <button
              onClick={handleEditLink}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#374151',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Link
            </button>
            <button
              onClick={handleRemoveLink}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: 'transparent',
                color: '#ef4444',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove Link
            </button>
          </div>
        </div>
      )}
      <Slate editor={editor} initialValue={value} onValueChange={handleChange}>
        {toolbarItems.length > 0 && (
          <Toolbar 
            items={toolbarItems} 
            onViewOutput={(type) => setShowOutputModal(type)} 
            onEditLink={() => {}}
            searchQuery={searchQuery}
            searchMatches={searchMatches}
            currentMatchIndex={currentMatchIndex}
            onSearchQueryChange={setInternalSearchQuery}
            onSearchMatchesChange={setInternalSearchMatches}
            onCurrentMatchIndexChange={setInternalCurrentMatchIndex}
            isFullscreen={isFullscreen}
            onFullscreenToggle={handleFullscreenToggle}
          />
        )}
        <Editable
          renderElement={renderElementWithHandlers}
          renderLeaf={renderLeaf}
          decorate={decorate}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          style={editableStyle}
        />
      </Slate>
      
      {/* Word and Character Counter / Branding Footer */}
      <div style={{
        padding: '8px 12px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        borderLeft: isFullscreen ? 'none' : '1px solid #ccc',
        borderRight: isFullscreen ? 'none' : '1px solid #ccc',
        borderBottom: isFullscreen ? 'none' : '1px solid #ccc',
        borderRadius: isFullscreen ? '0' : '0 0 4px 4px',
        display: 'flex',
        justifyContent: showWordCount ? 'space-between' : 'flex-end',
        alignItems: 'center',
        gap: '20px',
        fontSize: '12px',
        color: '#6b7280',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        {showWordCount && (
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: '500', color: '#374151' }}>Words:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>{wordCount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: '500', color: '#374151' }}>Characters:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>{charCount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: '500', color: '#374151' }}>Characters (no spaces):</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>{charCountNoSpaces.toLocaleString()}</span>
            </div>
          </div>
        )}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          color: '#9ca3af',
          fontSize: '11px',
        }}>
          <span>Built with</span>
          <span 
            style={{ 
              fontWeight: '600', 
              color: '#3b82f6',
              letterSpacing: '0.5px',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.preventDefault();
              window.open('https://www.npmjs.com/package/editium', '_blank');
            }}
          >
            Editium
          </span>
        </div>
      </div>
      
      {showOutputModal && (
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
            setShowOutputModal(null);
            setCopySuccess(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '900px',
              maxHeight: '85vh',
              width: '90%',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, color: '#111827', fontSize: '24px', fontWeight: '600' }}>
                {showOutputModal === 'html' ? 'HTML Output' : showOutputModal === 'json' ? 'JSON Output' : 'Preview'}
              </h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {showOutputModal !== 'preview' && (
                  <button
                    onClick={handleCopy}
                  style={{
                    backgroundColor: copySuccess ? '#10b981' : '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    if (!copySuccess) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!copySuccess) {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                    }
                  }}
                  title="Copy to clipboard"
                >
                  {copySuccess ? (
                    <>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
                )}
                <button
                  onClick={() => {
                    setShowOutputModal(null);
                    setCopySuccess(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '4px',
                    lineHeight: 1,
                  }}
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div style={{ 
              flex: 1, 
              overflow: 'auto',
              backgroundColor: showOutputModal === 'preview' ? '#ffffff' : '#1e293b',
              borderRadius: '6px',
              border: showOutputModal === 'preview' ? '1px solid #e5e7eb' : '1px solid #334155',
              padding: showOutputModal === 'preview' ? '20px' : '0',
            }}>
              {showOutputModal === 'preview' ? (
                <div
                  dangerouslySetInnerHTML={{ __html: serializeToHtml(editor.children as CustomElement[]) }}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#111827',
                  }}
                />
              ) : (
                <pre
                  style={{
                    margin: 0,
                    padding: '20px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    color: '#e2e8f0',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <code>
                    {showOutputModal === 'html' 
                      ? formatHtml(serializeToHtml(editor.children as CustomElement[]))
                      : JSON.stringify(editor.children, null, 2)
                    }
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Editium;
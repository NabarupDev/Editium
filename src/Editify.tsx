import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { createEditor, Descendant, Editor, Element as SlateElement, Text } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import Toolbar from './Toolbar';
import { EditifyProps, CustomElement, CustomText, LinkElement } from './types';
import { defaultInitialValue, serializeToHtml, toggleMark } from './utils';

// Render elements
const renderElement = ({ attributes, children, element }: RenderElementProps) => {
  const style = { margin: 0, fontWeight: 'normal' };
  const alignStyle = (element as CustomElement).align ? { 
    textAlign: (element as CustomElement).align as 'left' | 'center' | 'right' | 'justify' 
  } : {};
  const combinedStyle = { ...style, ...alignStyle };
  
  switch ((element as CustomElement | LinkElement).type) {
    case 'paragraph':
      return <p {...attributes} style={combinedStyle}>{children}</p>;
    case 'heading-one':
      return <h1 {...attributes} style={{...combinedStyle, fontSize: '2em'}}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes} style={{...combinedStyle, fontSize: '1.5em'}}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes} style={{...combinedStyle, fontSize: '1.25em'}}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes} style={{...combinedStyle, fontSize: '1.1em'}}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes} style={{...combinedStyle, fontSize: '1em'}}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes} style={{...combinedStyle, fontSize: '0.9em'}}>{children}</h6>;
    case 'heading-seven':
      return <h1 {...attributes} style={{...combinedStyle, fontSize: '0.85em'}}>{children}</h1>;
    case 'heading-eight':
      return <h1 {...attributes} style={{...combinedStyle, fontSize: '0.8em'}}>{children}</h1>;
    case 'bulleted-list':
      return <ul {...attributes} style={style}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes} style={style}>{children}</ol>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'link':
      const linkElement = element as LinkElement;
      return (
        <a {...attributes} href={linkElement.url} style={{ color: '#0066cc', textDecoration: 'underline' }}>
          {children}
        </a>
      );
    default:
      return <p {...attributes} style={combinedStyle}>{children}</p>;
  }
};

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

  return <span {...attributes}>{children}</span>;
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

const Editify: React.FC<EditifyProps> = ({
  initialValue,
  onChange,
  toolbar = ['bold', 'italic', 'underline', 'heading-one', 'heading-two', 'bulleted-list', 'numbered-list', 'link'],
  placeholder = 'Start typing...',
  className = '',
  style = {},
  readOnly = false,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<CustomElement[]>(() => parseInitialValue(initialValue));

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
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

  // Update value when initialValue prop changes
  useEffect(() => {
    if (initialValue !== undefined) {
      const parsedValue = parseInitialValue(initialValue);
      setValue(parsedValue);
    }
  }, [initialValue]);

  const editorStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderTop: toolbar.length > 0 ? 'none' : '1px solid #ccc',
    borderRadius: toolbar.length > 0 ? '0 0 4px 4px' : '4px',
    padding: '12px',
    minHeight: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    outline: 'none',
    ...style,
  };

  return (
    <div className={className}>
      <Slate editor={editor} initialValue={value} onValueChange={handleChange}>
        {toolbar.length > 0 && <Toolbar items={toolbar} />}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          style={editorStyle}
        />
      </Slate>
    </div>
  );
};

export default Editify;
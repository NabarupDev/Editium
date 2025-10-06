import React, { useState, useRef, useCallback } from 'react';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor, useSelected, useFocused } from 'slate-react';
import { ImageElement } from './types';

interface ResizableImageProps {
  element: ImageElement;
  attributes: any;
  children: any;
}

const ResizableImage: React.FC<ResizableImageProps> = ({ element, attributes, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: element.width || 0,
    height: element.height || 0,
  });
  const [showActions, setShowActions] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Get natural dimensions when image loads
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!element.width && !element.height) {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  }, [element.width, element.height]);

  // Start resize
  const handleMouseDown = useCallback((e: React.MouseEvent, handle: 'se' | 'sw' | 'ne' | 'nw' | 'n' | 's' | 'e' | 'w') => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    const currentWidth = dimensions.width || imageRef.current?.offsetWidth || 0;
    const currentHeight = dimensions.height || imageRef.current?.offsetHeight || 0;
    
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: currentWidth,
      height: currentHeight,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startPos.current.x;
      const deltaY = moveEvent.clientY - startPos.current.y;
      
      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;

      // Calculate new dimensions based on handle
      switch (handle) {
        case 'se': // Southeast (bottom-right)
          newWidth = Math.max(100, startPos.current.width + deltaX);
          newHeight = Math.max(100, startPos.current.height + deltaY);
          break;
        case 'sw': // Southwest (bottom-left)
          newWidth = Math.max(100, startPos.current.width - deltaX);
          newHeight = Math.max(100, startPos.current.height + deltaY);
          break;
        case 'ne': // Northeast (top-right)
          newWidth = Math.max(100, startPos.current.width + deltaX);
          newHeight = Math.max(100, startPos.current.height - deltaY);
          break;
        case 'nw': // Northwest (top-left)
          newWidth = Math.max(100, startPos.current.width - deltaX);
          newHeight = Math.max(100, startPos.current.height - deltaY);
          break;
        case 'e': // East (right edge)
          newWidth = Math.max(100, startPos.current.width + deltaX);
          newHeight = startPos.current.height;
          break;
        case 'w': // West (left edge)
          newWidth = Math.max(100, startPos.current.width - deltaX);
          newHeight = startPos.current.height;
          break;
        case 'n': // North (top edge)
          newWidth = startPos.current.width;
          newHeight = Math.max(100, startPos.current.height - deltaY);
          break;
        case 's': // South (bottom edge)
          newWidth = startPos.current.width;
          newHeight = Math.max(100, startPos.current.height + deltaY);
          break;
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      
      // Update the element with new dimensions
      const path = ReactEditor.findPath(editor as ReactEditor, element);
      Transforms.setNodes(
        editor,
        { 
          width: dimensions.width,
          height: dimensions.height 
        } as Partial<ImageElement>,
        { at: path }
      );

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [dimensions, editor, element]);

  // Handle image removal
  const handleRemoveImage = useCallback(() => {
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    Transforms.removeNodes(editor, { at: path });
  }, [editor, element]);

  // Handle image replacement
  const handleReplaceImage = useCallback(() => {
    // Trigger the image modal with replacement mode
    if ((window as any).__editiumImageReplaceHandler) {
      const path = ReactEditor.findPath(editor as ReactEditor, element);
      (window as any).__editiumImageReplaceHandler({
        url: element.url,
        alt: element.alt,
        width: element.width,
        height: element.height,
        align: element.align,
        path,
      });
    }
  }, [editor, element]);

  // Handle alignment change
  const handleAlignmentChange = useCallback((alignment: 'left' | 'center' | 'right') => {
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    Transforms.setNodes(
      editor,
      { align: alignment } as Partial<ImageElement>,
      { at: path }
    );
  }, [editor, element]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: element.align === 'center' ? 'center' : 
                   element.align === 'right' ? 'flex-end' : 'flex-start',
    margin: '16px 0',
    position: 'relative',
  };

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    maxWidth: '100%',
    cursor: isResizing ? 'nwse-resize' : 'default',
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    width: dimensions.width ? `${dimensions.width}px` : 'auto',
    height: dimensions.height ? `${dimensions.height}px` : 'auto',
    borderRadius: '4px',
    boxShadow: (selected && focused) || showActions 
      ? '0 0 0 3px #3b82f6' 
      : '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'block',
    transition: showActions || (selected && focused) ? 'none' : 'box-shadow 0.2s ease',
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#3b82f6',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    opacity: showActions ? 1 : 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: showActions ? 'auto' : 'none',
    zIndex: 10,
  };

  return (
    <div {...attributes} contentEditable={false} style={{ userSelect: 'none' }}>
      <div style={containerStyle}>
        <div 
          style={wrapperStyle}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => !isResizing && setShowActions(false)}
        >
          <img
            ref={imageRef}
            src={element.url}
            alt={element.alt || 'Image'}
            style={imageStyle}
            onLoad={handleImageLoad}
            draggable={false}
          />
          
          {/* Corner resize handles - show on hover or when selected */}
          {((selected && focused) || showActions) && (
            <>
          <div
            style={{ ...handleStyle, top: '-6px', left: '-6px', cursor: 'nw-resize' }}
            onMouseDown={(e) => handleMouseDown(e, 'nw')}
            title="Resize"
          />
          <div
            style={{ ...handleStyle, top: '-6px', right: '-6px', cursor: 'ne-resize' }}
            onMouseDown={(e) => handleMouseDown(e, 'ne')}
            title="Resize"
          />
          <div
            style={{ ...handleStyle, bottom: '-6px', left: '-6px', cursor: 'sw-resize' }}
            onMouseDown={(e) => handleMouseDown(e, 'sw')}
            title="Resize"
          />
          <div
            style={{ ...handleStyle, bottom: '-6px', right: '-6px', cursor: 'se-resize' }}
            onMouseDown={(e) => handleMouseDown(e, 'se')}
            title="Resize"
          />
          
          {/* Edge resize handles */}
          <div
            style={{ 
              ...handleStyle, 
              top: '-6px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              cursor: 'n-resize' 
            }}
            onMouseDown={(e) => handleMouseDown(e, 'n')}
            title="Resize Height"
          />
          <div
            style={{ 
              ...handleStyle, 
              bottom: '-6px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              cursor: 's-resize' 
            }}
            onMouseDown={(e) => handleMouseDown(e, 's')}
            title="Resize Height"
          />
          <div
            style={{ 
              ...handleStyle, 
              left: '-6px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              cursor: 'w-resize' 
            }}
            onMouseDown={(e) => handleMouseDown(e, 'w')}
            title="Resize Width"
          />
          <div
            style={{ 
              ...handleStyle, 
              right: '-6px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              cursor: 'e-resize' 
            }}
            onMouseDown={(e) => handleMouseDown(e, 'e')}
            title="Resize Width"
          />
            </>
          )}

          {/* Action buttons */}
          {((selected && focused) || showActions) && (
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 11,
            }}>
              {/* Alignment buttons */}
              <div style={{
                display: 'flex',
                gap: '4px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '4px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              }}>
                <button
                  onClick={() => handleAlignmentChange('left')}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: element.align === 'left' ? '#e0f2fe' : 'transparent',
                    border: 'none',
                    borderRadius: '2px',
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (element.align !== 'left') {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (element.align !== 'left') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  title="Align left"
                >
                  ⬅
                </button>
                <button
                  onClick={() => handleAlignmentChange('center')}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: element.align === 'center' ? '#e0f2fe' : 'transparent',
                    border: 'none',
                    borderRadius: '2px',
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (element.align !== 'center') {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (element.align !== 'center') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  title="Align center"
                >
                  ↔
                </button>
                <button
                  onClick={() => handleAlignmentChange('right')}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: element.align === 'right' ? '#e0f2fe' : 'transparent',
                    border: 'none',
                    borderRadius: '2px',
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (element.align !== 'right') {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (element.align !== 'right') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  title="Align right"
                >
                  ➡
                </button>
              </div>

              {/* Replace and Remove buttons */}
              <div style={{
                display: 'flex',
                gap: '4px',
              }}>
                <button
                  onClick={handleReplaceImage}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  title="Replace image"
                >
                  Replace
                </button>
                <button
                  onClick={handleRemoveImage}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    color: '#dc2626',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  title="Remove image"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ResizableImage;

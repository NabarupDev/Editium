import { Editor, Element as SlateElement, Transforms, Range, Text, Path } from 'slate';
import { ReactEditor } from 'slate-react';
import { CustomElement, CustomText, FormatType, BlockType, LinkElement, AlignmentType, ImageElement } from './types';

// Check if an alignment is active
export const isAlignmentActive = (editor: Editor, alignment: AlignmentType): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as CustomElement).align === alignment,
    })
  );

  return !!match;
};

// Toggle alignment
export const toggleAlignment = (editor: Editor, alignment: AlignmentType): void => {
  const isActive = isAlignmentActive(editor, alignment);
  
  Transforms.setNodes<CustomElement>(
    editor,
    { align: isActive ? undefined : alignment },
    {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'].includes((n as CustomElement).type)
    }
  );
};

// Indent list item
export const indentListItem = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // First, ensure we're in a list item
  const [listItemMatch] = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as CustomElement).type === 'list-item',
    })
  );

  if (!listItemMatch) return;

  // Get the parent list to determine list type
  const [listMatch] = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
    })
  );

  if (listMatch) {
    const [parentList] = listMatch;
    const listType = (parentList as CustomElement).type;
    
    // Wrap the current list item in a new nested list
    Transforms.wrapNodes(
      editor,
      { type: listType, children: [] } as CustomElement,
      {
        match: (n: any) => 
          !Editor.isEditor(n) && 
          SlateElement.isElement(n) && 
          (n as CustomElement).type === 'list-item',
      }
    );
  }
};

// Outdent list item  
export const outdentListItem = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // Check if we're in a nested list structure
  const listNodes = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
    })
  );

  // If we have multiple list levels (nested), unwrap one level
  if (listNodes.length > 1) {
    Transforms.unwrapNodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
      split: true,
    });
  } else if (listNodes.length === 1) {
    // If only one list level, convert to paragraph
    Transforms.unwrapNodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
    });
    
    Transforms.setNodes(editor, 
      { type: 'paragraph' } as Partial<CustomElement>,
      {
        match: (n: any) => 
          !Editor.isEditor(n) && 
          SlateElement.isElement(n) && 
          (n as CustomElement).type === 'list-item'
      }
    );
  }
};

// Check if a mark is active
export const isMarkActive = (editor: Editor, format: FormatType): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Check if a block type is active
export const isBlockActive = (editor: Editor, format: BlockType): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as CustomElement).type === format,
    })
  );

  return !!match;
};

// Toggle a mark
export const toggleMark = (editor: Editor, format: FormatType): void => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Apply color to text
export const applyColor = (editor: Editor, color: string | null): void => {
  if (color === null) {
    Editor.removeMark(editor, 'color');
  } else {
    Editor.addMark(editor, 'color', color);
  }
};

// Apply background color to text
export const applyBackgroundColor = (editor: Editor, color: string | null): void => {
  if (color === null) {
    Editor.removeMark(editor, 'backgroundColor');
  } else {
    Editor.addMark(editor, 'backgroundColor', color);
  }
};

// Get active color
export const getActiveColor = (editor: Editor): string | null => {
  const marks = Editor.marks(editor);
  return marks?.color ? String(marks.color) : null;
};

// Get active background color
export const getActiveBackgroundColor = (editor: Editor): string | null => {
  const marks = Editor.marks(editor);
  return marks?.backgroundColor ? String(marks.backgroundColor) : null;
};

// Toggle a block type
export const toggleBlock = (editor: Editor, format: BlockType): void => {
  const isActive = isBlockActive(editor, format);
  const isList = ['bulleted-list', 'numbered-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) => 
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  if (format === 'list-item') {
    newProperties = { type: isActive ? 'paragraph' : 'list-item' };
  } else {
    newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
  }

  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

// Insert horizontal rule
export const insertHorizontalRule = (editor: Editor): void => {
  const hr: CustomElement = {
    type: 'horizontal-rule',
    children: [{ text: '' }],
  };
  
  Transforms.insertNodes(editor, hr);
  
  // Insert a new paragraph after the horizontal rule
  const paragraph: CustomElement = {
    type: 'paragraph',
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, paragraph);
};

// Insert image
export const insertImage = (editor: Editor, url: string, alt?: string, width?: number): void => {
  const image: any = {
    type: 'image',
    url,
    alt: alt || 'Image',
    width,
    children: [{ text: '' }],
  };
  
  Transforms.insertNodes(editor, image);
  
  // Insert a new paragraph after the image for continued editing
  const paragraph: any = {
    type: 'paragraph',
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, paragraph);
};

// Validate image URL
export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
    const pathname = parsedUrl.pathname.toLowerCase();
    return imageExtensions.some(ext => pathname.endsWith(ext)) || 
           parsedUrl.protocol === 'data:' || // Support data URLs
           pathname.includes('/image') || // Common image path patterns
           parsedUrl.hostname.includes('cdn') || // CDN URLs
           parsedUrl.hostname.includes('imgur') ||
           parsedUrl.hostname.includes('unsplash');
  } catch {
    return false;
  }
};

// Insert a link
export const insertLink = (editor: Editor, url: string, title?: string, target?: '_blank' | '_self'): void => {
  if (editor.selection) {
    wrapLink(editor, url, title, target);
  }
};

export const isLinkActive = (editor: Editor): boolean => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as LinkElement).type === 'link',
    })
  );
  return !!link;
};

export const getLinkAtCursor = (editor: Editor): LinkElement | null => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => 
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as LinkElement).type === 'link',
    })
  );
  return link ? (link[0] as LinkElement) : null;
};

export const unwrapLink = (editor: Editor): void => {
  Transforms.unwrapNodes(editor, {
    match: (n: any) => 
      !Editor.isEditor(n) && 
      SlateElement.isElement(n) && 
      (n as LinkElement).type === 'link',
  });
};

export const wrapLink = (editor: Editor, url: string, title?: string, target?: '_blank' | '_self'): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    ...(title && { title }),
    ...(target && { target }),
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

// Insert table
export const insertTable = (editor: Editor, rows: number = 3, cols: number = 3): void => {
  const tableRows: any[] = [];
  
  for (let i = 0; i < rows; i++) {
    const cells: any[] = [];
    for (let j = 0; j < cols; j++) {
      cells.push({
        type: 'table-cell',
        children: [{ text: '' }],
      });
    }
    tableRows.push({
      type: 'table-row',
      children: cells,
    });
  }

  const table: any = {
    type: 'table',
    children: tableRows,
  };

  const paragraph: any = {
    type: 'paragraph',
    children: [{ text: '' }],
  };

  // Insert both table and paragraph at once
  Transforms.insertNodes(editor, [table, paragraph]);
};

// Check if we're currently in a table
export const isInTable = (editor: Editor): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  return !!tableMatch;
};

// Add table row
export const addTableRow = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // Find the table
  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  if (!tableMatch) return;

  const [table, tablePath] = tableMatch as [any, Path];
  const firstRow = table.children[0];
  const colCount = firstRow?.children?.length || 1;

  // Create new row with same number of columns
  const cells: any[] = [];
  for (let i = 0; i < colCount; i++) {
    cells.push({
      type: 'table-cell',
      children: [{ text: '' }],
    });
  }

  const newRow: any = {
    type: 'table-row',
    children: cells,
  };

  // Insert at the end of the table
  Transforms.insertNodes(editor, newRow, {
    at: [...tablePath, table.children.length],
  });
};

// Remove table row
export const removeTableRow = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // Find the current row
  const [rowMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table-row',
    })
  );

  if (!rowMatch) return;

  const [, rowPath] = rowMatch as [any, Path];
  
  // Check if this is the last row - don't delete if so
  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  if (tableMatch) {
    const [table] = tableMatch as [any, Path];
    if (table.children.length <= 1) {
      // If it's the last row, remove the entire table
      Transforms.removeNodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table',
      });
      return;
    }
  }

  Transforms.removeNodes(editor, { at: rowPath });
};

// Add table column
export const addTableColumn = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // Find the table
  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  if (!tableMatch) return;

  const [table, tablePath] = tableMatch as [any, Path];

  // Add a cell to each row
  table.children.forEach((_row: any, rowIndex: number) => {
    const newCell: any = {
      type: 'table-cell',
      children: [{ text: '' }],
    };

    Transforms.insertNodes(editor, newCell, {
      at: [...tablePath, rowIndex, table.children[rowIndex].children.length],
    });
  });
};

// Remove table column
export const removeTableColumn = (editor: Editor): void => {
  const { selection } = editor;
  if (!selection) return;

  // Find the current cell
  const [cellMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table-cell',
    })
  );

  if (!cellMatch) return;

  const [, cellPath] = cellMatch as [any, Path];
  const cellIndex = cellPath[cellPath.length - 1];

  // Find the table
  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  if (!tableMatch) return;

  const [table, tablePath] = tableMatch as [any, Path];
  
  // Check if this is the last column - don't delete if so
  if (table.children[0]?.children?.length <= 1) {
    // If it's the last column, remove the entire table
    Transforms.removeNodes(editor, { at: tablePath });
    return;
  }

  // Remove the cell from each row
  for (let rowIndex = table.children.length - 1; rowIndex >= 0; rowIndex--) {
    Transforms.removeNodes(editor, {
      at: [...tablePath, rowIndex, cellIndex],
    });
  }
};

// Set table alignment
export const setTableAlignment = (editor: Editor, alignment: AlignmentType): void => {
  const { selection } = editor;
  if (!selection) return;

  // Find the table
  const [tableMatch] = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'table',
    })
  );

  if (!tableMatch) return;

  const [, tablePath] = tableMatch as [any, Path];

  Transforms.setNodes(
    editor,
    { align: alignment } as any,
    { at: tablePath }
  );
};

// Find all text matches in editor
export const findAllMatches = (editor: Editor, searchQuery: string): Array<{ path: Path; offset: number; text: string }> => {
  if (!searchQuery) return [];
  
  const matches: Array<{ path: Path; offset: number; text: string }> = [];
  const searchLower = searchQuery.toLowerCase();
  
  // Iterate through all text nodes
  const textNodes = Array.from(
    Editor.nodes(editor, {
      at: [],
      match: (n: any) => Text.isText(n),
    })
  );

  textNodes.forEach(([node, path]) => {
    const textNode = node as CustomText;
    const text = textNode.text;
    const textLower = text.toLowerCase();
    
    let index = 0;
    while ((index = textLower.indexOf(searchLower, index)) !== -1) {
      matches.push({
        path,
        offset: index,
        text: text.substring(index, index + searchQuery.length),
      });
      index += searchQuery.length;
    }
  });

  return matches;
};

// Navigate to specific match
export const navigateToMatch = (editor: Editor, match: { path: Path; offset: number; text: string }) => {
  const start = { path: match.path, offset: match.offset };
  const end = { path: match.path, offset: match.offset + match.text.length };
  
  Transforms.select(editor, { anchor: start, focus: end });
  
  // Scroll into view
  const domRange = ReactEditor.toDOMRange(editor as any, editor.selection!);
  domRange.startContainer.parentElement?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

// Replace current match
export const replaceMatch = (
  editor: Editor,
  match: { path: Path; offset: number; text: string },
  replaceText: string
): void => {
  const start = { path: match.path, offset: match.offset };
  const end = { path: match.path, offset: match.offset + match.text.length };
  
  Transforms.select(editor, { anchor: start, focus: end });
  Transforms.insertText(editor, replaceText);
};

// Replace all matches
export const replaceAllMatches = (
  editor: Editor,
  matches: Array<{ path: Path; offset: number; text: string }>,
  replaceText: string
): void => {
  // Replace from end to beginning to maintain correct offsets
  const sortedMatches = [...matches].reverse();
  
  Editor.withoutNormalizing(editor, () => {
    sortedMatches.forEach((match) => {
      const start = { path: match.path, offset: match.offset };
      const end = { path: match.path, offset: match.offset + match.text.length };
      
      Transforms.select(editor, { anchor: start, focus: end });
      Transforms.delete(editor);
      Transforms.insertText(editor, replaceText, { at: start });
    });
  });
};

// Serialize to HTML
export const serializeToHtml = (nodes: (CustomElement | LinkElement | ImageElement)[]): string => {
  return nodes.map(node => serializeNode(node)).join('');
};

const serializeNode = (node: CustomElement | LinkElement | ImageElement | CustomText): string => {
  if (Text.isText(node)) {
    const textNode = node as CustomText;
    let string = escapeHtml(textNode.text);
    
    // Collect inline styles
    const styles: string[] = [];
    if (textNode.color) styles.push(`color: ${textNode.color}`);
    if (textNode.backgroundColor) styles.push(`background-color: ${textNode.backgroundColor}`);
    const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
    
    // Apply formatting
    if (textNode.bold) string = `<strong>${string}</strong>`;
    if (textNode.italic) string = `<em>${string}</em>`;
    if (textNode.underline) string = `<u>${string}</u>`;
    if (textNode.code) string = `<code>${string}</code>`;
    if (textNode.strikethrough) string = `<s>${string}</s>`;
    if (textNode.superscript) string = `<sup>${string}</sup>`;
    if (textNode.subscript) string = `<sub>${string}</sub>`;
    
    // Wrap in span if we have color/backgroundColor
    if (styleAttr) {
      string = `<span${styleAttr}>${string}</span>`;
    }
    
    return string;
  }

  const elementNode = node as CustomElement | LinkElement | ImageElement;
  const children = elementNode.children.map((n: any) => serializeNode(n)).join('');
  const alignStyle = (elementNode as CustomElement).align ? ` style="text-align: ${(elementNode as CustomElement).align}"` : '';

  switch (elementNode.type) {
    case 'paragraph':
      return `<p${alignStyle}>${children}</p>`;
    case 'heading-one':
      return `<h1${alignStyle}>${children}</h1>`;
    case 'heading-two':
      return `<h2${alignStyle}>${children}</h2>`;
    case 'heading-three':
      return `<h3${alignStyle}>${children}</h3>`;
    case 'heading-four':
      return `<h4${alignStyle}>${children}</h4>`;
    case 'heading-five':
      return `<h5${alignStyle}>${children}</h5>`;
    case 'heading-six':
      return `<h6${alignStyle}>${children}</h6>`;
    case 'heading-seven':
      return `<h7${alignStyle}>${children}</h7>`;
    case 'heading-eight':
      return `<h8${alignStyle}>${children}</h8>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'blockquote':
      return `<blockquote${alignStyle}>${children}</blockquote>`;
    case 'code-block':
      return `<pre><code>${children}</code></pre>`;
    case 'horizontal-rule':
      return `<hr />`;
    case 'table':
      const tableNode = elementNode as any;
      const tableAlignStyle = tableNode.align ? ` margin-left: ${
        tableNode.align === 'center' ? 'auto' :
        tableNode.align === 'right' ? 'auto' : '0'
      }; margin-right: ${
        tableNode.align === 'center' ? 'auto' :
        tableNode.align === 'right' ? '0' : 'auto'
      };` : '';
      const tableWidthStyle = tableNode.width ? ` width: ${tableNode.width}px; max-width: 100%;` : ' width: 100%;';
      return `<table style="border-collapse: collapse;${tableWidthStyle} margin-top: 16px; margin-bottom: 16px;${tableAlignStyle}">${children}</table>`;
    case 'table-row':
      return `<tr>${children}</tr>`;
    case 'table-cell':
      const cellNode = elementNode as any;
      const cellAlignStyle = cellNode.align ? ` text-align: ${cellNode.align};` : '';
      return `<td style="border: 1px solid #ddd; padding: 8px;${cellAlignStyle}">${children}</td>`;
    case 'image':
      const imageNode = elementNode as ImageElement;
      const altAttr = imageNode.alt ? ` alt="${escapeHtml(imageNode.alt)}"` : ' alt="Image"';
      const widthAttr = imageNode.width ? ` width="${imageNode.width}"` : '';
      const heightAttr = imageNode.height ? ` height="${imageNode.height}"` : '';
      const imgAlignStyle = imageNode.align ? ` style="display: block; margin: ${
        imageNode.align === 'center' ? '0 auto' :
        imageNode.align === 'right' ? '0 0 0 auto' : '0'
      };"` : '';
      return `<img src="${escapeHtml(imageNode.url)}"${altAttr}${widthAttr}${heightAttr}${imgAlignStyle} />`;
    case 'link':
      const linkNode = elementNode as LinkElement;
      const titleAttr = linkNode.title ? ` title="${escapeHtml(linkNode.title)}"` : '';
      const targetAttr = linkNode.target ? ` target="${linkNode.target}"` : '';
      const relAttr = linkNode.target === '_blank' ? ' rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(linkNode.url)}"${titleAttr}${targetAttr}${relAttr}>${children}</a>`;
    default:
      return children;
  }
};

const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Default initial value
export const defaultInitialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

// Word and Character Counter utilities
export const getTextContent = (nodes: any[]): string => {
  return nodes
    .map((node: any) => {
      if (node.text !== undefined) {
        return node.text;
      }
      if (node.children) {
        return getTextContent(node.children);
      }
      return '';
    })
    .join('');
};

export const countWords = (text: string): number => {
  // Remove extra whitespace and split by spaces
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  
  // Split by whitespace and filter out empty strings
  return trimmed.split(/\s+/).filter(word => word.length > 0).length;
};

export const countCharacters = (text: string): number => {
  return text.length;
};

export const countCharactersNoSpaces = (text: string): number => {
  return text.replace(/\s/g, '').length;
};
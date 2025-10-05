import { Editor, Element as SlateElement, Transforms, Range, Text, Path } from 'slate';
import { CustomElement, CustomText, FormatType, BlockType, LinkElement, AlignmentType } from './types';

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

// Insert a link
export const insertLink = (editor: Editor, url: string): void => {
  if (editor.selection) {
    wrapLink(editor, url);
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

export const unwrapLink = (editor: Editor): void => {
  Transforms.unwrapNodes(editor, {
    match: (n: any) => 
      !Editor.isEditor(n) && 
      SlateElement.isElement(n) && 
      (n as LinkElement).type === 'link',
  });
};

export const wrapLink = (editor: Editor, url: string): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

// Serialize to HTML
export const serializeToHtml = (nodes: (CustomElement | LinkElement)[]): string => {
  return nodes.map(node => serializeNode(node)).join('');
};

const serializeNode = (node: CustomElement | LinkElement | CustomText): string => {
  if (Text.isText(node)) {
    const textNode = node as CustomText;
    let string = escapeHtml(textNode.text);
    if (textNode.bold) string = `<strong>${string}</strong>`;
    if (textNode.italic) string = `<em>${string}</em>`;
    if (textNode.underline) string = `<u>${string}</u>`;
    if (textNode.code) string = `<code>${string}</code>`;
    if (textNode.strikethrough) string = `<s>${string}</s>`;
    if (textNode.superscript) string = `<sup>${string}</sup>`;
    if (textNode.subscript) string = `<sub>${string}</sub>`;
    return string;
  }

  const elementNode = node as CustomElement | LinkElement;
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
    case 'link':
      const linkNode = elementNode as LinkElement;
      return `<a href="${escapeHtml(linkNode.url)}">${children}</a>`;
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
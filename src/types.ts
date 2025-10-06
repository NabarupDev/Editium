import { BaseElement, BaseText } from 'slate';

export type FormatType = 'bold' | 'italic' | 'underline' | 'code' | 'strikethrough' | 'superscript' | 'subscript';
export type AlignmentType = 'left' | 'center' | 'right' | 'justify';
export type BlockType = 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'heading-seven' | 'heading-eight' | 'bulleted-list' | 'numbered-list' | 'list-item' | 'blockquote' | 'code-block' | 'horizontal-rule' | 'image' | 'table' | 'table-row' | 'table-cell';
export type ToolbarItem = FormatType | BlockType | AlignmentType | 'link' | 'indent' | 'outdent' | 'undo' | 'redo' | 'separator' | 'view-output' | 'text-color' | 'bg-color' | 'table' | 'find-replace' | 'fullscreen';

export interface CustomElement extends BaseElement {
  type: BlockType;
  url?: string;
  align?: AlignmentType;
  children: CustomText[];
}

export interface CustomText extends BaseText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  backgroundColor?: string;
  search?: boolean;
  searchCurrent?: boolean;
}

export interface LinkElement extends BaseElement {
  type: 'link';
  url: string;
  title?: string;
  target?: '_blank' | '_self';
  children: CustomText[];
}

export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  align?: AlignmentType;
  children: CustomText[];
}

export interface TableElement extends BaseElement {
  type: 'table';
  align?: AlignmentType;
  children: TableRowElement[];
}

export interface TableRowElement extends BaseElement {
  type: 'table-row';
  children: TableCellElement[];
}

export interface TableCellElement extends BaseElement {
  type: 'table-cell';
  children: (CustomElement | CustomText)[];
}

export interface EditifyProps {
  initialValue?: string | CustomElement[];
  onChange?: (value: string, jsonValue: CustomElement[]) => void;
  toolbar?: ToolbarItem[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
  searchQuery?: string;
  searchMatches?: Array<{ path: any; offset: number; text: string }>;
  currentMatchIndex?: number;
  showWordCount?: boolean;
}

declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement | LinkElement | ImageElement | TableElement | TableRowElement | TableCellElement;
    Text: CustomText;
  }
}
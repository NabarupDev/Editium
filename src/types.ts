import { BaseElement, BaseText } from 'slate';

export type FormatType = 'bold' | 'italic' | 'underline' | 'code' | 'strikethrough' | 'superscript' | 'subscript';
export type AlignmentType = 'left' | 'center' | 'right' | 'justify';
export type BlockType = 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'heading-seven' | 'heading-eight' | 'bulleted-list' | 'numbered-list' | 'list-item';
export type ToolbarItem = FormatType | BlockType | AlignmentType | 'link' | 'indent' | 'outdent' | 'undo' | 'redo' | 'separator';

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
}

export interface LinkElement extends BaseElement {
  type: 'link';
  url: string;
  children: CustomText[];
}

export interface EditifyProps {
  initialValue?: string | CustomElement[];
  onChange?: (value: string, jsonValue: CustomElement[]) => void;
  toolbar?: ToolbarItem[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
}

declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement | LinkElement;
    Text: CustomText;
  }
}
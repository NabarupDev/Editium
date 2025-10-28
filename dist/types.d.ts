import { BaseElement, BaseText } from 'slate';
export type FormatType = 'bold' | 'italic' | 'underline' | 'code' | 'strikethrough' | 'superscript' | 'subscript';
export type AlignmentType = 'left' | 'center' | 'right' | 'justify';
export type BlockType = 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'heading-seven' | 'heading-eight' | 'bulleted-list' | 'numbered-list' | 'list-item' | 'blockquote' | 'code-block' | 'horizontal-rule' | 'image' | 'table' | 'table-row' | 'table-cell';
export type ToolbarItem = FormatType | BlockType | AlignmentType | 'link' | 'indent' | 'outdent' | 'undo' | 'redo' | 'separator' | 'view-output' | 'text-color' | 'bg-color' | 'table' | 'find-replace' | 'fullscreen';
export declare const ALL_TOOLBAR_ITEMS: ToolbarItem[];
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
    width?: number;
    children: TableRowElement[];
}
export interface TableRowElement extends BaseElement {
    type: 'table-row';
    children: TableCellElement[];
}
export interface TableCellElement extends BaseElement {
    type: 'table-cell';
    align?: AlignmentType;
    children: (CustomElement | CustomText)[];
}
export interface EditiumProps {
    /** Initial editor content. Default: empty paragraph with empty text node */
    initialValue?: string | CustomElement[];
    /** Callback when content changes. Default: undefined (no callback) */
    onChange?: (html: string, json: CustomElement[]) => void;
    /** Toolbar items to display. Default: 'all' */
    toolbar?: ToolbarItem[] | 'all';
    /** Placeholder text when editor is empty. Default: 'Start typing...' */
    placeholder?: string;
    /** CSS class name for the editor container. Default: '' */
    className?: string;
    /** Inline styles for the editor container. Default: {} */
    style?: React.CSSProperties;
    /** Whether the editor is read-only. Default: false */
    readOnly?: boolean;
    /** Custom image upload handler. Default: undefined */
    onImageUpload?: (file: File) => Promise<string>;
    /** Search query string for highlighting. Default: '' */
    searchQuery?: string;
    /** Array of search match locations. Default: [] */
    searchMatches?: Array<{
        path: any;
        offset: number;
        text: string;
    }>;
    /** Index of current search match. Default: 0 */
    currentMatchIndex?: number;
    /** Whether to show word count. Default: true */
    showWordCount?: boolean;
    /** Editor height. Default: '200px' */
    height?: string | number;
    /** Minimum editor height. Default: '150px' */
    minHeight?: string | number;
    /** Maximum editor height. Default: '250px' */
    maxHeight?: string | number;
}
declare module 'slate' {
    interface CustomTypes {
        Element: CustomElement | LinkElement | ImageElement | TableElement | TableRowElement | TableCellElement;
        Text: CustomText;
    }
}

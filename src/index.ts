export { default as Editify } from './Editify';
export type {
  EditifyProps,
  CustomElement,
  CustomText,
  LinkElement,
  FormatType,
  BlockType,
  ToolbarItem,
} from './types';
export {
  serializeToHtml,
  defaultInitialValue,
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
  insertLink,
  isLinkActive,
} from './utils';
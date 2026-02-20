import { CustomElement } from './types';
/**
 * Import a .docx file and convert it to Slate nodes
 * @param file - The .docx file to import
 * @returns Promise resolving to an array of Slate CustomElements
 */
export declare const importFromDocx: (file: File) => Promise<CustomElement[]>;
/**
 * Export Slate nodes to a .docx file
 * @param nodes - Array of Slate CustomElements
 * @param filename - The filename for the exported file (default: 'document.docx')
 */
export declare const exportToDocx: (nodes: CustomElement[], filename?: string) => Promise<void>;
/**
 * Export Slate nodes to a PDF file
 * @param nodes - Array of Slate CustomElements
 * @param filename - The filename for the exported file (default: 'document.pdf')
 */
export declare const exportToPdf: (nodes: CustomElement[], filename?: string) => Promise<void>;

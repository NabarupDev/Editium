import mammoth from 'mammoth';
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType as DocxAlignment, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { CustomElement, CustomText, AlignmentType, ImageElement, LinkElement, TableElement } from './types';
import { Editor, Text, Element as SlateElement } from 'slate';
import { serializeToHtml } from './utils';

/**
 * Import a .docx file and convert it to Slate nodes
 * @param file - The .docx file to import
 * @returns Promise resolving to an array of Slate CustomElements
 */
export const importFromDocx = async (file: File): Promise<CustomElement[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Use mammoth to convert .docx to HTML
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    
    // Convert HTML to Slate nodes
    const nodes = htmlToSlateNodes(html);
    
    return nodes.length > 0 ? nodes : [{ type: 'paragraph', children: [{ text: '' }] }];
  } catch (error) {
    console.error('Error importing .docx file:', error);
    throw new Error('Failed to import .docx file');
  }
};

/**
 * Convert HTML string to Slate nodes
 * @param html - HTML string from mammoth conversion
 * @returns Array of CustomElements
 */
const htmlToSlateNodes = (html: string): CustomElement[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;
  
  const nodes: CustomElement[] = [];
  
  // Helper to process inline elements and apply formatting
  const processInlineNode = (node: Node, formatting: Partial<CustomText> = {}): (CustomText | CustomElement)[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (!text) return [];
      return [{ text, ...formatting }];
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      
      let newFormatting = { ...formatting };
      
      // Apply inline formatting
      if (tagName === 'strong' || tagName === 'b') {
        newFormatting.bold = true;
      } else if (tagName === 'em' || tagName === 'i') {
        newFormatting.italic = true;
      } else if (tagName === 'u') {
        newFormatting.underline = true;
      } else if (tagName === 's' || tagName === 'del' || tagName === 'strike') {
        newFormatting.strikethrough = true;
      } else if (tagName === 'code') {
        newFormatting.code = true;
      } else if (tagName === 'sup') {
        newFormatting.superscript = true;
      } else if (tagName === 'sub') {
        newFormatting.subscript = true;
      } else if (tagName === 'span' && element.style) {
        if (element.style.color) {
          newFormatting.color = element.style.color;
        }
        if (element.style.backgroundColor) {
          newFormatting.backgroundColor = element.style.backgroundColor;
        }
      } else if (tagName === 'a') {
        // Handle links specially - create link element
        const href = element.getAttribute('href') || '';
        const title = element.getAttribute('title');
        const target = element.getAttribute('target') as '_blank' | '_self' | null;
        
        const linkChildren: CustomText[] = [];
        element.childNodes.forEach(child => {
          const results = processInlineNode(child, newFormatting);
          results.forEach(r => {
            if (Text.isText(r)) {
              linkChildren.push(r as CustomText);
            }
          });
        });
        
        if (linkChildren.length === 0) {
          linkChildren.push({ text: '' });
        }
        
        return [{
          type: 'link',
          url: href,
          title: title || undefined,
          target: target || undefined,
          children: linkChildren
        } as any];
      }
      
      // Process children with accumulated formatting
      const results: (CustomText | CustomElement)[] = [];
      element.childNodes.forEach(child => {
        results.push(...processInlineNode(child, newFormatting));
      });
      
      return results;
    }
    
    return [];
  };
  
  const processNode = (node: Node): CustomElement | null => {
    // Skip text nodes at top level (they'll be handled by processInlineNode)
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim() || '';
      if (!text) return null;
      return { type: 'paragraph', children: [{ text }] };
    }
    
    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      
      // Handle inline formatting elements at block level (wrap in paragraph)
      if (['strong', 'b', 'em', 'i', 'u', 's', 'del', 'strike', 'code', 'sup', 'sub', 'span', 'a'].includes(tagName)) {
        const children = processInlineNode(element);
        if (children.length > 0) {
          const textChildren: CustomText[] = [];
          const otherChildren: CustomElement[] = [];
          
          children.forEach(c => {
            if (Text.isText(c)) {
              textChildren.push(c as CustomText);
            } else {
              otherChildren.push(c as CustomElement);
            }
          });
          
          if (textChildren.length > 0) {
            return { type: 'paragraph', children: textChildren };
          } else if (otherChildren.length > 0) {
            return otherChildren[0];
          }
        }
        return null;
      }
      
      // Process children for block elements
      const processBlockChildren = (): CustomText[] => {
        const results: CustomText[] = [];
        element.childNodes.forEach(child => {
          const inlineResults = processInlineNode(child);
          inlineResults.forEach(r => {
            if (Text.isText(r)) {
              results.push(r as CustomText);
            }
          });
        });
        return results.length > 0 ? results : [{ text: '' }];
      };
      
      // Handle block elements
      switch (tagName) {
        case 'h1':
          return { type: 'heading-one', children: processBlockChildren() };
        case 'h2':
          return { type: 'heading-two', children: processBlockChildren() };
        case 'h3':
          return { type: 'heading-three', children: processBlockChildren() };
        case 'h4':
          return { type: 'heading-four', children: processBlockChildren() };
        case 'h5':
          return { type: 'heading-five', children: processBlockChildren() };
        case 'h6':
          return { type: 'heading-six', children: processBlockChildren() };
        case 'p':
          return { type: 'paragraph', children: processBlockChildren() };
        case 'ul': {
          const listItems: CustomElement[] = [];
          element.childNodes.forEach(child => {
            const processed = processNode(child);
            if (processed && (processed as any).type === 'list-item') {
              listItems.push(processed);
            }
          });
          return listItems.length > 0 ? { type: 'bulleted-list', children: listItems as any[] } : null;
        }
        case 'ol': {
          const listItems: CustomElement[] = [];
          element.childNodes.forEach(child => {
            const processed = processNode(child);
            if (processed && (processed as any).type === 'list-item') {
              listItems.push(processed);
            }
          });
          return listItems.length > 0 ? { type: 'numbered-list', children: listItems as any[] } : null;
        }
        case 'li':
          return { type: 'list-item', children: processBlockChildren() };
        case 'blockquote':
          return { type: 'blockquote', children: processBlockChildren() };
        case 'pre': {
          const codeText = element.textContent || '';
          return { type: 'code-block', children: [{ text: codeText }] };
        }
        case 'hr':
          return { type: 'horizontal-rule', children: [{ text: '' }] };
        case 'img': {
          const src = element.getAttribute('src') || '';
          const alt = element.getAttribute('alt') || 'Image';
          const width = element.getAttribute('width') ? parseInt(element.getAttribute('width')!) : undefined;
          return {
            type: 'image',
            url: src,
            alt,
            width,
            children: [{ text: '' }]
          } as ImageElement;
        }
        case 'table': {
          const rows = Array.from(element.querySelectorAll('tr')).map(tr => {
            const cells = Array.from(tr.querySelectorAll('td, th')).map(td => {
              const cellChildren: CustomElement[] = [];
              td.childNodes.forEach(child => {
                const processed = processNode(child);
                if (processed && !Text.isText(processed)) {
                  cellChildren.push(processed as CustomElement);
                } else if (processed) {
                  cellChildren.push({ type: 'paragraph', children: [processed as CustomText] });
                }
              });
              
              if (cellChildren.length === 0) {
                cellChildren.push({ type: 'paragraph', children: [{ text: '' }] });
              }
              
              return {
                type: 'table-cell',
                children: cellChildren
              };
            });
            
            return {
              type: 'table-row',
              children: cells as any[]
            };
          });
          
          return {
            type: 'table',
            children: rows as any[]
          } as any;
        }
        default: {
          // For unknown elements, treat as paragraph
          const children = processBlockChildren();
          if (children.length > 0) {
            return { type: 'paragraph', children };
          }
          return null;
        }
      }
    }
    
    return null;
  };
  
  // Process all top-level nodes
  body.childNodes.forEach(node => {
    const processed = processNode(node);
    if (processed && !Text.isText(processed)) {
      nodes.push(processed as CustomElement);
    } else if (processed) {
      // Wrap lone text nodes in paragraphs
      nodes.push({ type: 'paragraph', children: [processed as CustomText] });
    }
  });
  
  return nodes;
};

/**
 * Export Slate nodes to a .docx file
 * @param nodes - Array of Slate CustomElements
 * @param filename - The filename for the exported file (default: 'document.docx')
 */
export const exportToDocx = async (nodes: CustomElement[], filename: string = 'document.docx'): Promise<void> => {
  try {
    const docxChildren = await convertSlateNodesToDocx(nodes);
    
    // Filter out null/undefined elements and flatten
    const validChildren = docxChildren.flat().filter(Boolean);
    
    // Ensure we have at least one paragraph
    if (validChildren.length === 0) {
      validChildren.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    }
    
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: 'default-numbering',
            levels: [
              {
                level: 0,
                format: 'decimal',
                text: '%1.',
                alignment: DocxAlignment.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 720, hanging: 360 }
                  }
                }
              }
            ]
          }
        ]
      },
      sections: [{
        properties: {},
        children: validChildren
      }]
    });
    
    // Generate the .docx file
    const { Packer } = await import('docx');
    const blob = await Packer.toBlob(doc);
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to .docx:', error);
    throw new Error('Failed to export to .docx file');
  }
};

/**
 * Convert Slate nodes to docx Paragraph/Table elements
 */
const convertSlateNodesToDocx = async (nodes: CustomElement[]): Promise<any[]> => {
  const docxElements: any[] = [];
  
  for (const node of nodes) {
    const element = await convertSlateNodeToDocx(node);
    if (element) {
      if (Array.isArray(element)) {
        docxElements.push(...element);
      } else {
        docxElements.push(element);
      }
    }
  }
  
  return docxElements;
};

/**
 * Convert a single Slate node to a docx element
 */
const convertSlateNodeToDocx = async (node: CustomElement | any): Promise<any | any[] | null> => {
  const type = node.type;
  
  // Get alignment
  const alignment = node.align ? convertAlignment(node.align) : undefined;
  
  switch (type) {
    case 'paragraph':
      return new Paragraph({
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { after: 200 } // Add spacing after paragraphs
      });
      
    case 'heading-one':
      return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'heading-two':
      return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'heading-three':
      return new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'heading-four':
      return new Paragraph({
        heading: HeadingLevel.HEADING_4,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'heading-five':
      return new Paragraph({
        heading: HeadingLevel.HEADING_5,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'heading-six':
      return new Paragraph({
        heading: HeadingLevel.HEADING_6,
        children: convertTextNodes((node as any).children),
        alignment,
        spacing: { before: 240, after: 120 }
      });
      
    case 'blockquote':
      return new Paragraph({
        children: convertTextNodes((node as any).children),
        indent: { left: 720 }, // 0.5 inch indent
        alignment,
        spacing: { after: 200 }
      });
      
    case 'code-block':
      const codeText = (node as any).children.map((c: any) => c.text || '').join('');
      return new Paragraph({
        children: [new TextRun({ text: codeText, font: 'Courier New' })],
        shading: { fill: 'f4f4f4' }
      });
      
    case 'bulleted-list':
    case 'numbered-list':
      // Convert list items to paragraphs with bullets/numbering
      const listItems = (node as any).children || [];
      return listItems.map((item: CustomElement, index: number) => {
        return new Paragraph({
          children: convertTextNodes((item as any).children),
          bullet: type === 'bulleted-list' ? { level: 0 } : undefined,
          numbering: type === 'numbered-list' ? { reference: 'default-numbering', level: 0 } : undefined
        });
      });
      
    case 'horizontal-rule':
      return new Paragraph({
        border: {
          bottom: {
            color: '000000',
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6
          }
        },
        children: [new TextRun({ text: '' })]
      });
      
    case 'image':
      const imageNode = node as ImageElement;
      try {
        // For now, we'll skip images or add a placeholder
        // Full image support would require fetching and embedding the image data
        return new Paragraph({
          children: [new TextRun({ text: `[Image: ${imageNode.alt || imageNode.url}]` })]
        });
      } catch (error) {
        console.error('Error processing image:', error);
        return new Paragraph({
          children: [new TextRun({ text: '[Image]' })]
        });
      }
      
    case 'table':
      const tableNode = node as any;
      const rows = tableNode.children.map((rowNode: any) => {
        const cells = rowNode.children.map((cellNode: any) => {
          const cellChildren = cellNode.children.map(async (child: any) => {
            if (child.type) {
              const result = await convertSlateNodeToDocx(child as CustomElement);
              return result;
            }
            return new Paragraph({ children: [new TextRun({ text: (child as CustomText).text || '' })] });
          });
          
          return Promise.all(cellChildren).then(children => 
            new TableCell({ children: children.flat().filter(Boolean) })
          );
        });
        
        return Promise.all(cells).then(resolvedCells => 
          new TableRow({ children: resolvedCells })
        );
      });
      
      const resolvedRows = await Promise.all(rows);
      
      return new Table({
        rows: resolvedRows,
        width: { size: 100, type: WidthType.PERCENTAGE }
      });
      
    case 'link':
      // Links need special handling in docx - for now, just extract text
      const linkNode = node as any;
      return new Paragraph({
        children: convertTextNodes(linkNode.children)
      });
      
    default:
      return null;
  }
};

/**
 * Convert Slate text nodes to docx TextRun elements
 */
const convertTextNodes = (children: CustomText[]): TextRun[] => {
  return children.map(child => {
    const text = child.text || '';
    
    return new TextRun({
      text,
      bold: child.bold || false,
      italics: child.italic || false,
      underline: child.underline ? {} : undefined,
      strike: child.strikethrough || false,
      superScript: child.superscript || false,
      subScript: child.subscript || false,
      font: child.code ? 'Courier New' : undefined,
      color: child.color ? child.color.replace('#', '') : undefined,
      shading: child.backgroundColor ? { fill: child.backgroundColor.replace('#', '') } : undefined
    });
  });
};

/**
 * Convert Slate alignment to docx alignment
 */
const convertAlignment = (align: AlignmentType): any => {
  switch (align) {
    case 'left':
      return DocxAlignment.LEFT;
    case 'center':
      return DocxAlignment.CENTER;
    case 'right':
      return DocxAlignment.RIGHT;
    case 'justify':
      return DocxAlignment.JUSTIFIED;
    default:
      return DocxAlignment.LEFT;
  }
};

/**
 * Export Slate nodes to a PDF file
 * @param nodes - Array of Slate CustomElements
 * @param filename - The filename for the exported file (default: 'document.pdf')
 */
export const exportToPdf = async (nodes: CustomElement[], filename: string = 'document.pdf'): Promise<void> => {
  try {
    // Dynamically import jsPDF
    const { jsPDF } = await import('jspdf');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Margins in mm
    const marginTop = 20;
    const marginBottom = 20;
    const marginLeft = 20;
    const marginRight = 20;
    
    const contentWidth = pageWidth - marginLeft - marginRight;
    const maxY = pageHeight - marginBottom;
    
    let currentY = marginTop;
    
    // Helper to add new page if needed
    const checkPageBreak = (requiredHeight: number) => {
      if (currentY + requiredHeight > maxY) {
        pdf.addPage();
        currentY = marginTop;
        return true;
      }
      return false;
    };
    
    // Helper to extract text from children recursively
    const extractText = (children: any[]): string => {
      if (!children) return '';
      return children.map(child => {
        if (typeof child === 'string') return child;
        if (child.text !== undefined) return child.text;
        if (child.children) return extractText(child.children);
        return '';
      }).join('');
    };
    
    // Helper to process inline formatting
    const processInlineText = (children: any[], x: number, y: number, maxWidth: number) => {
      if (!children || children.length === 0) return;
      
      let currentX = x;
      
      for (const child of children) {
        if (child.text !== undefined) {
          const text = child.text || '';
          if (!text) continue;
          
          // Apply formatting
          let fontStyle: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal';
          
          if (child.bold && child.italic) {
            fontStyle = 'bolditalic';
          } else if (child.bold) {
            fontStyle = 'bold';
          } else if (child.italic) {
            fontStyle = 'italic';
          }
          
          pdf.setFont('helvetica', fontStyle);
          
          // Handle text wrapping
          const words = text.split(' ');
          for (let i = 0; i < words.length; i++) {
            const word = words[i] + (i < words.length - 1 ? ' ' : '');
            const wordWidth = pdf.getTextWidth(word);
            
            if (currentX + wordWidth > x + maxWidth && currentX > x) {
              currentX = x;
              currentY += 6; // Line height
              checkPageBreak(6);
            }
            
            pdf.text(word, currentX, currentY);
            currentX += wordWidth;
          }
        } else if (child.children) {
          processInlineText(child.children, currentX, currentY, maxWidth - (currentX - x));
        }
      }
    };
    
    // Process each node
    for (const node of nodes) {
      let fontSize = 11;
      let fontStyle: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal';
      let spaceAfter = 6;
      let spaceBefore = 0;
      
      // Set font based on node type
      switch (node.type) {
        case 'heading-one':
          fontSize = 24;
          fontStyle = 'bold';
          spaceAfter = 8;
          spaceBefore = 4;
          break;
        case 'heading-two':
          fontSize = 20;
          fontStyle = 'bold';
          spaceAfter = 7;
          spaceBefore = 3;
          break;
        case 'heading-three':
          fontSize = 16;
          fontStyle = 'bold';
          spaceAfter = 6;
          spaceBefore = 3;
          break;
        case 'heading-four':
          fontSize = 14;
          fontStyle = 'bold';
          spaceAfter = 5;
          spaceBefore = 2;
          break;
        case 'heading-five':
          fontSize = 12;
          fontStyle = 'bold';
          spaceAfter = 5;
          spaceBefore = 2;
          break;
        case 'heading-six':
          fontSize = 11;
          fontStyle = 'bold';
          spaceAfter = 5;
          break;
        case 'blockquote':
          fontStyle = 'italic';
          spaceAfter = 6;
          break;
        case 'code-block':
          fontSize = 10;
          spaceAfter = 6;
          break;
      }
      
      currentY += spaceBefore;
      
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      // Handle horizontal rule
      if (node.type === 'horizontal-rule') {
        checkPageBreak(5);
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        pdf.line(marginLeft, currentY, pageWidth - marginRight, currentY);
        currentY += 5;
        continue;
      }
      
      // Extract text
      const text = extractText(node.children || []);
      if (!text.trim()) {
        currentY += 6; // Empty line
        continue;
      }
      
      // Handle blockquote with indent
      const xPos = node.type === 'blockquote' ? marginLeft + 10 : marginLeft;
      const textWidth = node.type === 'blockquote' ? contentWidth - 10 : contentWidth;
      
      // Split text into lines
      const lines = pdf.splitTextToSize(text, textWidth);
      const lineHeight = fontSize * 0.352778 * 1.5; // Convert pt to mm with line height
      
      // Check if block fits on page
      const blockHeight = lines.length * lineHeight;
      checkPageBreak(blockHeight + spaceAfter);
      
      // Draw blockquote border
      if (node.type === 'blockquote') {
        pdf.setDrawColor(100);
        pdf.setLineWidth(1);
        pdf.line(marginLeft + 5, currentY - 2, marginLeft + 5, currentY + blockHeight);
      }
      
      // Draw each line with proper text rendering
      for (const line of lines) {
        checkPageBreak(lineHeight);
        
        let alignX = xPos;
        
        // Handle alignment - use simple positioning
        if (node.align === 'center') {
          const lineWidth = pdf.getTextWidth(line);
          alignX = marginLeft + (contentWidth - lineWidth) / 2;
        } else if (node.align === 'right') {
          const lineWidth = pdf.getTextWidth(line);
          alignX = pageWidth - marginRight - lineWidth;
        }
        
        // Render text as selectable (not image)
        pdf.text(line, alignX, currentY);
        currentY += lineHeight;
      }
      
      currentY += spaceAfter;
    }
    
    // Save the PDF
    console.log('PDF generated with text mode - file should have selectable text');
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export to PDF file');
  }
};

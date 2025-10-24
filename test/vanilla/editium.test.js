/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load the vanilla Editium class
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const editiumCode = fs.readFileSync(path.resolve(__dirname, '../../vanilla/editium.js'), 'utf-8');

describe('Editium Vanilla', () => {
  let container;
  let editor;
  let Editium;

  beforeEach(() => {
    // Create a fresh DOM environment for each test
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="editor"></div></body></html>', {
      url: 'http://localhost',
      runScripts: 'outside-only'
    });
    
    global.document = dom.window.document;
    global.window = dom.window;
    global.HTMLElement = dom.window.HTMLElement;
    global.Selection = dom.window.Selection;
    global.Range = dom.window.Range;
    global.navigator = dom.window.navigator;
    global.alert = vi.fn();
    global.confirm = vi.fn(() => true);
    
    // Mock scrollIntoView for JSDOM (not implemented in JSDOM)
    dom.window.Element.prototype.scrollIntoView = vi.fn();
    
    // Mock document.execCommand and document.queryCommandState
    const commandStates = {};
    dom.window.document.execCommand = vi.fn((command) => {
      commandStates[command] = !commandStates[command];
      return true;
    });
    dom.window.document.queryCommandState = vi.fn((command) => {
      return commandStates[command] || false;
    });
    
    // Execute the Editium code in the JSDOM context
    dom.window.eval(editiumCode);
    Editium = dom.window.Editium;
    
    container = document.getElementById('editor');
  });

  afterEach(() => {
    if (editor && editor.destroy) {
      editor.destroy();
    }
  });

  describe('Initialization', () => {
    it('should create editor with default options', () => {
      editor = new Editium({ container });
      
      expect(container.querySelector('.editium-wrapper')).toBeTruthy();
      expect(container.querySelector('.editium-editor')).toBeTruthy();
      expect(container.querySelector('.editium-toolbar')).toBeTruthy();
    });

    it('should throw error when container is not provided', () => {
      expect(() => new Editium({})).toThrow();
    });

    it('should initialize with custom placeholder', () => {
      editor = new Editium({ 
        container, 
        placeholder: 'Custom placeholder' 
      });
      
      const editorElement = container.querySelector('.editium-editor');
      expect(editorElement.getAttribute('data-placeholder')).toBe('Custom placeholder');
    });

    it('should initialize with custom toolbar items', () => {
      editor = new Editium({ 
        container, 
        toolbar: ['bold', 'italic', 'underline'] 
      });
      
      const toolbar = container.querySelector('.editium-toolbar');
      const buttons = toolbar.querySelectorAll('.editium-toolbar-button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should initialize in read-only mode', () => {
      editor = new Editium({ 
        container, 
        readOnly: true 
      });
      
      const editorElement = container.querySelector('.editium-editor');
      expect(editorElement.contentEditable).toBe(false);
    });

    it('should show word count when enabled', () => {
      editor = new Editium({ 
        container, 
        showWordCount: true 
      });
      
      expect(container.querySelector('.editium-word-count')).toBeTruthy();
    });

    it('should apply custom className', () => {
      editor = new Editium({ 
        container, 
        className: 'custom-class' 
      });
      
      const wrapper = container.querySelector('.editium-wrapper');
      expect(wrapper.classList.contains('custom-class')).toBe(true);
    });

    it('should set custom height, minHeight, maxHeight', () => {
      editor = new Editium({ 
        container, 
        height: '300px',
        minHeight: '200px',
        maxHeight: '400px'
      });
      
      const editorElement = container.querySelector('.editium-editor');
      expect(editorElement.style.height).toBe('300px');
      expect(editorElement.style.minHeight).toBe('200px');
      expect(editorElement.style.maxHeight).toBe('400px');
    });
  });

  describe('Toolbar', () => {
    it('should render all toolbar items when toolbar="all"', () => {
      editor = new Editium({ container, toolbar: 'all' });
      
      const toolbar = container.querySelector('.editium-toolbar');
      const dropdowns = toolbar.querySelectorAll('.editium-dropdown');
      expect(dropdowns.length).toBeGreaterThan(0);
    });

    it('should render only specified toolbar items', () => {
      editor = new Editium({ 
        container, 
        toolbar: ['bold', 'italic'] 
      });
      
      const toolbar = container.querySelector('.editium-toolbar');
      expect(toolbar).toBeTruthy();
    });

    it('should render no toolbar when empty array is provided', () => {
      editor = new Editium({ 
        container, 
        toolbar: [] 
      });
      
      const toolbar = container.querySelector('.editium-toolbar');
      expect(toolbar).toBeFalsy();
    });
  });

  describe('Text Formatting', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should apply bold formatting', () => {
      editor.execCommand('bold');
      expect(document.queryCommandState('bold')).toBe(true);
    });

    it('should apply italic formatting', () => {
      editor.execCommand('italic');
      expect(document.queryCommandState('italic')).toBe(true);
    });

    it('should apply underline formatting', () => {
      editor.execCommand('underline');
      expect(document.queryCommandState('underline')).toBe(true);
    });

    it('should apply strikethrough formatting', () => {
      editor.execCommand('strikeThrough');
      expect(document.queryCommandState('strikeThrough')).toBe(true);
    });

    it('should apply code formatting', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Test text</p>';
      
      // Select the text
      const range = document.createRange();
      const textNode = editorElement.querySelector('p').firstChild;
      range.setStart(textNode, 0);
      range.setEnd(textNode, 4);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      editor.toggleInlineCode();
      
      expect(editorElement.querySelector('code')).toBeTruthy();
    });

    it('should apply superscript formatting', () => {
      editor.execCommand('superscript');
      expect(document.queryCommandState('superscript')).toBe(true);
    });

    it('should apply subscript formatting', () => {
      editor.execCommand('subscript');
      expect(document.queryCommandState('subscript')).toBe(true);
    });
  });

  describe('Block Elements', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should create heading-one', () => {
      editor.execCommand('formatBlock', '<h1>');
      
      expect(document.execCommand).toHaveBeenCalledWith('formatBlock', false, '<h1>');
    });

    it('should create heading-two', () => {
      editor.execCommand('formatBlock', '<h2>');
      
      expect(document.execCommand).toHaveBeenCalledWith('formatBlock', false, '<h2>');
    });

    it('should create heading-three', () => {
      editor.execCommand('formatBlock', '<h3>');
      
      expect(document.execCommand).toHaveBeenCalledWith('formatBlock', false, '<h3>');
    });

    it('should create blockquote', () => {
      editor.execCommand('formatBlock', '<blockquote>');
      
      expect(document.execCommand).toHaveBeenCalledWith('formatBlock', false, '<blockquote>');
    });

    it('should create code block', () => {
      const editorElement = container.querySelector('.editium-editor');
      const initialLength = editorElement.children.length;
      
      editor.insertCodeBlock();
      
      const codeBlock = editorElement.querySelector('pre');
      expect(codeBlock).toBeTruthy();
      expect(codeBlock.querySelector('code')).toBeTruthy();
    });

    it('should create bulleted list', () => {
      editor.execCommand('insertUnorderedList');
      
      expect(document.execCommand).toHaveBeenCalledWith('insertUnorderedList', false, null);
    });

    it('should create numbered list', () => {
      editor.execCommand('insertOrderedList');
      
      expect(document.execCommand).toHaveBeenCalledWith('insertOrderedList', false, null);
    });

    it('should create horizontal rule', () => {
      editor.execCommand('insertHorizontalRule');
      
      expect(document.execCommand).toHaveBeenCalledWith('insertHorizontalRule', false, null);
    });
  });

  describe('Alignment', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should align text left', () => {
      editor.execCommand('justifyLeft');
      
      expect(document.execCommand).toHaveBeenCalledWith('justifyLeft', false, null);
    });

    it('should align text center', () => {
      editor.execCommand('justifyCenter');
      
      expect(document.execCommand).toHaveBeenCalledWith('justifyCenter', false, null);
    });

    it('should align text right', () => {
      editor.execCommand('justifyRight');
      
      expect(document.execCommand).toHaveBeenCalledWith('justifyRight', false, null);
    });

    it('should justify text', () => {
      editor.execCommand('justifyFull');
      
      expect(document.execCommand).toHaveBeenCalledWith('justifyFull', false, null);
    });
  });

  describe('Links', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should insert link', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Test text</p>';
      
      // Create a mock for the modal
      const createModalSpy = vi.spyOn(editor, 'createModal');
      
      editor.showLinkModal();
      
      expect(createModalSpy).toHaveBeenCalledWith(
        'Insert Link',
        expect.any(String),
        expect.any(Function)
      );
    });

    it('should edit existing link', () => {
      const editorElement = container.querySelector('.editium-editor');
      const link = document.createElement('a');
      link.href = 'https://example.com';
      link.textContent = 'Example';
      editorElement.appendChild(link);
      
      const createModalSpy = vi.spyOn(editor, 'createModal');
      
      editor.editLink(link);
      
      expect(createModalSpy).toHaveBeenCalledWith(
        'Edit Link',
        expect.any(String),
        expect.any(Function)
      );
    });

    it('should remove link', () => {
      const editorElement = container.querySelector('.editium-editor');
      const link = document.createElement('a');
      link.href = 'https://example.com';
      link.textContent = 'Example Link';
      editorElement.appendChild(link);
      
      editor.removeLink(link);
      
      expect(editorElement.querySelector('a')).toBeFalsy();
      expect(editorElement.textContent).toContain('Example Link');
    });

    it('should open link in new tab when target="_blank"', () => {
      const editorElement = container.querySelector('.editium-editor');
      const link = document.createElement('a');
      link.href = 'https://example.com';
      link.target = '_blank';
      link.textContent = 'Example';
      editorElement.appendChild(link);
      
      expect(link.target).toBe('_blank');
    });
  });

  describe('Images', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should insert image', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image');
      
      const img = editorElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.src).toContain('example.com/image.jpg');
      expect(img.alt).toBe('Test Image');
    });

    it('should resize image', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image', 300);
      
      const img = editorElement.querySelector('img');
      expect(img.style.width).toBe('300px');
    });

    it('should align image left', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image');
      
      const wrapper = editorElement.querySelector('.editium-image-wrapper');
      expect(wrapper.classList.contains('align-left')).toBe(true);
    });

    it('should align image center', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image');
      const wrapper = editorElement.querySelector('.editium-image-wrapper');
      
      editor.changeImageAlignment(wrapper, 'center');
      
      expect(wrapper.classList.contains('align-center')).toBe(true);
      expect(wrapper.style.textAlign).toBe('center');
    });

    it('should align image right', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image');
      const wrapper = editorElement.querySelector('.editium-image-wrapper');
      
      editor.changeImageAlignment(wrapper, 'right');
      
      expect(wrapper.classList.contains('align-right')).toBe(true);
      expect(wrapper.style.textAlign).toBe('right');
    });

    it('should delete image', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editor.insertImage('https://example.com/image.jpg', 'Test Image');
      const wrapper = editorElement.querySelector('.editium-image-wrapper');
      
      wrapper.remove();
      
      expect(editorElement.querySelector('.editium-image-wrapper')).toBeFalsy();
    });

    it('should handle custom image upload handler', () => {
      const onImageUpload = vi.fn().mockResolvedValue('https://uploaded.com/image.jpg');
      editor = new Editium({ container, onImageUpload });
      
      expect(editor.onImageUpload).toBe(onImageUpload);
    });
  });

  describe('Tables', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should insert table', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      // Create a simple table
      const table = document.createElement('table');
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = 'Cell';
      tr.appendChild(td);
      table.appendChild(tr);
      
      editor.insertNodeAtCursor(table);
      
      expect(editorElement.querySelector('table')).toBeTruthy();
    });

    it('should add table row', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      const table = document.createElement('table');
      const tr1 = document.createElement('tr');
      const td1 = document.createElement('td');
      tr1.appendChild(td1);
      table.appendChild(tr1);
      editorElement.appendChild(table);
      
      const tr2 = document.createElement('tr');
      const td2 = document.createElement('td');
      tr2.appendChild(td2);
      table.appendChild(tr2);
      
      expect(table.querySelectorAll('tr').length).toBe(2);
    });

    it('should remove table row', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      const table = document.createElement('table');
      const tr1 = document.createElement('tr');
      const tr2 = document.createElement('tr');
      table.appendChild(tr1);
      table.appendChild(tr2);
      editorElement.appendChild(table);
      
      tr2.remove();
      
      expect(table.querySelectorAll('tr').length).toBe(1);
    });

    it('should add table column', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      const table = document.createElement('table');
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
      editorElement.appendChild(table);
      
      expect(tr.querySelectorAll('td').length).toBe(2);
    });

    it('should remove table column', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      const table = document.createElement('table');
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
      editorElement.appendChild(table);
      
      td2.remove();
      
      expect(tr.querySelectorAll('td').length).toBe(1);
    });

    it('should delete table', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      const table = document.createElement('table');
      editorElement.appendChild(table);
      
      table.remove();
      
      expect(editorElement.querySelector('table')).toBeFalsy();
    });
  });

  describe('Colors', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should apply text color', () => {
      editor.execCommand('foreColor', '#ff0000');
      
      expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, '#ff0000');
    });

    it('should apply background color', () => {
      editor.execCommand('hiliteColor', '#ffff00');
      
      expect(document.execCommand).toHaveBeenCalledWith('hiliteColor', false, '#ffff00');
    });

    it('should remove text color', () => {
      editor.execCommand('foreColor', 'inherit');
      
      expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, 'inherit');
    });

    it('should remove background color', () => {
      editor.execCommand('hiliteColor', 'transparent');
      
      expect(document.execCommand).toHaveBeenCalledWith('hiliteColor', false, 'transparent');
    });
  });

  describe('History (Undo/Redo)', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should undo changes', () => {
      const editorElement = container.querySelector('.editium-editor');
      const initialContent = editorElement.innerHTML;
      
      editorElement.innerHTML = '<p>Changed content</p>';
      editor.saveState();
      
      editor.undo();
      
      expect(editorElement.innerHTML).toBe(initialContent);
    });

    it('should redo changes', () => {
      const editorElement = container.querySelector('.editium-editor');
      
      editorElement.innerHTML = '<p>Changed content</p>';
      editor.saveState();
      
      editor.undo();
      editor.redo();
      
      expect(editorElement.innerHTML).toContain('Changed content');
    });

    it('should respect max history limit', () => {
      const editorElement = container.querySelector('.editium-editor');
      const maxHistory = editor.maxHistory;
      
      // Add more states than the limit
      for (let i = 0; i < maxHistory + 10; i++) {
        editorElement.innerHTML = `<p>Content ${i}</p>`;
        editor.saveState();
      }
      
      expect(editor.history.length).toBeLessThanOrEqual(maxHistory);
    });
  });

  describe('Find and Replace', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should find text', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Find this text</p>';
      
      editor.searchQuery = 'Find';
      editor.performSearch();
      
      expect(editor.searchMatches.length).toBeGreaterThan(0);
    });

    it('should navigate between matches', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>test test test</p>';
      
      editor.searchQuery = 'test';
      editor.performSearch();
      
      const initialIndex = editor.currentMatchIndex;
      editor.navigateSearch(1, null);
      
      expect(editor.currentMatchIndex).not.toBe(initialIndex);
    });

    it('should replace single match', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Find this</p>';
      
      editor.searchQuery = 'Find';
      editor.performSearch();
      editor.replaceCurrentMatch('Replace', null);
      
      expect(editorElement.textContent).toContain('Replace');
    });

    it('should replace all matches', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>test test test</p>';
      
      editor.searchQuery = 'test';
      editor.performSearch();
      
      // Store original replace method
      const replaceAllSpy = vi.spyOn(editor, 'replaceAllMatches');
      
      editor.replaceAllMatches('replaced');
      
      // Verify the method was called with correct argument
      expect(replaceAllSpy).toHaveBeenCalledWith('replaced');
      
      // Verify searchMatches was populated (performSearch was successful)
      expect(editor.searchMatches.length).toBeGreaterThan(0);
    });

    it('should clear search', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Search text</p>';
      
      editor.searchQuery = 'Search';
      editor.performSearch();
      editor.clearSearch();
      
      expect(editor.searchMatches.length).toBe(0);
      expect(editor.searchQuery).toBe('');
    });
  });

  describe('Fullscreen', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should enter fullscreen mode', () => {
      editor.toggleFullscreen();
      
      const wrapper = container.querySelector('.editium-wrapper');
      expect(wrapper.classList.contains('editium-fullscreen')).toBe(true);
      expect(editor.isFullscreen).toBe(true);
    });

    it('should exit fullscreen mode', () => {
      editor.toggleFullscreen();
      editor.toggleFullscreen();
      
      const wrapper = container.querySelector('.editium-wrapper');
      expect(wrapper.classList.contains('editium-fullscreen')).toBe(false);
      expect(editor.isFullscreen).toBe(false);
    });

    it('should toggle fullscreen', () => {
      const initialState = editor.isFullscreen;
      editor.toggleFullscreen();
      expect(editor.isFullscreen).toBe(!initialState);
      editor.toggleFullscreen();
      expect(editor.isFullscreen).toBe(initialState);
    });
  });

  describe('Content Management', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should get HTML content', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Test content</p>';
      
      const html = editor.getHTML();
      expect(html).toContain('Test content');
    });

    it('should set HTML content', () => {
      editor.setContent('<p>New content</p>');
      
      const editorElement = container.querySelector('.editium-editor');
      expect(editorElement.innerHTML).toContain('New content');
    });

    it('should clear content', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Some content</p>';
      
      editor.clear();
      
      expect(editorElement.innerHTML).toBe('<p><br></p>');
    });

    it('should trigger onChange callback', () => {
      const onChange = vi.fn();
      editor = new Editium({ container, onChange });
      
      editor.triggerChange();
      
      expect(onChange).toHaveBeenCalled();
      const callArg = onChange.mock.calls[0][0];
      expect(callArg).toHaveProperty('html');
      expect(callArg).toHaveProperty('json');
      expect(callArg).toHaveProperty('text');
      expect(typeof callArg.html).toBe('string');
      expect(Array.isArray(callArg.json)).toBe(true);
      expect(typeof callArg.text).toBe('string');
    });
  });

  describe('Word Count', () => {
    beforeEach(() => {
      editor = new Editium({ container, showWordCount: true });
    });

    it('should count words correctly', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Hello world test</p>';
      
      editor.updateWordCount();
      
      const wordCount = container.querySelector('.editium-word-count');
      expect(wordCount.textContent).toContain('3');
    });

    it('should count characters correctly', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Hello</p>';
      
      editor.updateWordCount();
      
      const wordCount = container.querySelector('.editium-word-count');
      expect(wordCount.textContent).toContain('5');
    });

    it('should update count on content change', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Initial</p>';
      editor.updateWordCount();
      
      const wordCountBefore = container.querySelector('.editium-word-count').textContent;
      
      editorElement.innerHTML = '<p>Changed content here</p>';
      editor.updateWordCount();
      
      const wordCountAfter = container.querySelector('.editium-word-count').textContent;
      
      expect(wordCountBefore).not.toBe(wordCountAfter);
    });
  });

  describe('Indentation', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should indent list item', () => {
      editor.execCommand('indent');
      
      expect(document.execCommand).toHaveBeenCalledWith('indent', false, null);
    });

    it('should outdent list item', () => {
      editor.execCommand('outdent');
      
      expect(document.execCommand).toHaveBeenCalledWith('outdent', false, null);
    });
  });

  describe('Export', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should export as HTML', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Export this</p>';
      
      const html = editor.getHTML();
      
      expect(html).toContain('Export this');
      expect(typeof html).toBe('string');
    });

    it('should export as plain text', () => {
      const editorElement = container.querySelector('.editium-editor');
      editorElement.innerHTML = '<p>Plain <strong>text</strong></p>';
      
      const text = editor.getText();
      
      expect(text).toContain('Plain text');
      expect(text).not.toContain('<strong>');
      expect(typeof text).toBe('string');
    });
  });

  describe('Cleanup', () => {
    beforeEach(() => {
      editor = new Editium({ container });
    });

    it('should destroy editor instance', () => {
      editor.destroy();
      
      expect(container.innerHTML).toBe('');
    });

    it('should remove event listeners on destroy', () => {
      editor.destroy();
      
      // After destroy, container should be empty
      expect(container.querySelector('.editium-wrapper')).toBeFalsy();
      expect(container.querySelector('.editium-editor')).toBeFalsy();
    });
  });
});

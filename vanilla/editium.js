/**
 * Editium - Vanilla JavaScript Rich Text Editor
 * Matching the React version's polished UI
 */

class Editium {
  constructor(options = {}) {
    this.container = options.container;
    this.placeholder = options.placeholder || 'Start typing...';
    this.toolbar = options.toolbar || ['bold', 'italic', 'underline', 'heading-one', 'heading-two', 'bulleted-list', 'numbered-list', 'link'];
    this.onChange = options.onChange || (() => {});
    this.readOnly = options.readOnly || false;
    this.showWordCount = options.showWordCount || false;
    this.className = options.className || '';
    this.onImageUpload = options.onImageUpload || null;
    
    // Height configuration options with defaults
    this.height = options.height || '200px';
    this.minHeight = options.minHeight || '150px';
    this.maxHeight = options.maxHeight || '250px';
    
    // State
    this.isFullscreen = false;
    this.searchQuery = '';
    this.searchMatches = [];
    this.currentMatchIndex = 0;
    this.findReplacePanel = null;
    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = 50;
    this.openDropdown = null;
    this.linkPopup = null;
    this.selectedLink = null;
    
    if (!this.container) {
      throw new Error('Container element is required');
    }
    
    this.init();
  }
  
  init() {
    this.createEditor();
    this.attachEventListeners();
    
    if (this.editor.innerHTML.trim() === '') {
      this.editor.innerHTML = '<p><br></p>';
    }
    
    // Make any existing images resizable
    this.makeExistingImagesResizable();
    
    // Make any existing links non-editable
    this.makeExistingLinksNonEditable();
    
    this.saveState();
  }
  
  createEditor() {
    this.container.innerHTML = '';
    
    this.wrapper = document.createElement('div');
    this.wrapper.className = `editium-wrapper ${this.className}`;
    if (this.isFullscreen) {
      this.wrapper.classList.add('editium-fullscreen');
    }
    
    const toolbarItems = this.toolbar === 'all' ? this.getAllToolbarItems() : this.toolbar;
    
    if (toolbarItems.length > 0) {
      this.toolbarElement = this.createToolbar(toolbarItems);
      this.wrapper.appendChild(this.toolbarElement);
    }
    
    this.editorContainer = document.createElement('div');
    this.editorContainer.className = 'editium-editor-container';
    
    this.editor = document.createElement('div');
    this.editor.className = 'editium-editor';
    this.editor.contentEditable = !this.readOnly;
    this.editor.setAttribute('data-placeholder', this.placeholder);
    
    // Apply height, minHeight, maxHeight styles (convert numbers to px strings)
    if (!this.isFullscreen) {
      this.editor.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      this.editor.style.minHeight = typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight;
      this.editor.style.maxHeight = typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight;
    } else {
      // Remove height constraints in fullscreen mode
      this.editor.style.height = 'auto';
      this.editor.style.minHeight = 'auto';
      this.editor.style.maxHeight = 'none';
    }
    
    this.editorContainer.appendChild(this.editor);
    this.wrapper.appendChild(this.editorContainer);
    
    if (this.showWordCount) {
      this.wordCountElement = document.createElement('div');
      this.wordCountElement.className = 'editium-word-count';
      this.wrapper.appendChild(this.wordCountElement);
      this.updateWordCount();
    }
    
    this.container.appendChild(this.wrapper);
  }
  
  getAllToolbarItems() {
    return [
      'paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four',
      'heading-five', 'heading-six',
      'separator',
      'bold', 'italic', 'underline', 'strikethrough',
      'separator',
      'superscript', 'subscript', 'code',
      'separator',
      'left', 'center', 'right', 'justify',
      'separator',
      'text-color', 'bg-color',
      'separator',
      'blockquote', 'code-block',
      'separator',
      'bulleted-list', 'numbered-list', 'indent', 'outdent',
      'separator',
      'link', 'image', 'table', 'horizontal-rule', 'undo', 'redo',
      'separator',
      'find-replace', 'fullscreen', 'view-output'
    ];
  }
  
  createToolbar(items) {
    const toolbar = document.createElement('div');
    toolbar.className = 'editium-toolbar';
    
    // Define groups
    const groups = {
      paragraph: ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six'],
      format: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'],
      align: ['left', 'center', 'right', 'justify'],
      color: ['text-color', 'bg-color'],
      blocks: ['blockquote', 'code-block'],
      lists: ['bulleted-list', 'numbered-list', 'indent', 'outdent'],
      insert: ['link', 'image', 'table', 'horizontal-rule'],
      edit: ['undo', 'redo'],
      view: ['preview', 'view-html', 'view-json']
    };
    
    // If using 'all', create organized dropdown groups
    if (this.toolbar === 'all') {
      // Paragraph dropdown (already exists)
      toolbar.appendChild(this.createBlockFormatDropdown());
      
      // Format dropdown
      toolbar.appendChild(this.createGroupDropdown('Format', groups.format));
      
      // Align dropdown (already exists)
      toolbar.appendChild(this.createAlignmentDropdown());
      
      // Color dropdown
      toolbar.appendChild(this.createGroupDropdown('Color', groups.color));
      
      // Blocks dropdown
      toolbar.appendChild(this.createGroupDropdown('Blocks', groups.blocks));
      
      // Lists dropdown
      toolbar.appendChild(this.createGroupDropdown('Lists', groups.lists));
      
      // Insert dropdown
      toolbar.appendChild(this.createGroupDropdown('Insert', groups.insert));
      
      // Edit dropdown
      toolbar.appendChild(this.createGroupDropdown('Edit', groups.edit));
      
      // View dropdown
      toolbar.appendChild(this.createGroupDropdown('View', groups.view));
      
      // Add spacer to push remaining buttons to the right
      const spacer = document.createElement('div');
      spacer.style.flex = '1';
      toolbar.appendChild(spacer);
      
      // Right-aligned buttons
      const findButton = this.createToolbarButton('find-replace');
      const fullscreenButton = this.createToolbarButton('fullscreen');
      if (findButton) toolbar.appendChild(findButton);
      if (fullscreenButton) toolbar.appendChild(fullscreenButton);
    } else {
      // Legacy mode - keep old behavior for custom toolbar arrays
      const blockFormats = groups.paragraph;
      const alignments = groups.align;
      
      let processedGroups = { block: false, align: false };
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item === 'separator') {
          if (i > 0 && items[i-1] !== 'separator') {
            const separator = document.createElement('div');
            separator.className = 'editium-toolbar-separator';
            toolbar.appendChild(separator);
          }
        } else if (blockFormats.includes(item) && !processedGroups.block) {
          toolbar.appendChild(this.createBlockFormatDropdown());
          processedGroups.block = true;
        } else if (alignments.includes(item) && !processedGroups.align) {
          toolbar.appendChild(this.createAlignmentDropdown());
          processedGroups.align = true;
        } else if (!blockFormats.includes(item) && !alignments.includes(item)) {
          const button = this.createToolbarButton(item);
          if (button) {
            toolbar.appendChild(button);
          }
        }
      }
    }
    
    return toolbar;
  }
  
  createGroupDropdown(label, items) {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = label;
    trigger.title = label;
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    
    items.forEach(itemType => {
      const config = this.getButtonConfig(itemType);
      if (!config) return;
      
      const item = document.createElement('button');
      item.type = 'button';
      item.innerHTML = `${config.icon} <span>${config.title}</span>`;
      item.onclick = (e) => {
        e.preventDefault();
        config.action();
        this.closeDropdown();
      };
      menu.appendChild(item);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu);
    };
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  createBlockFormatDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = 'Paragraph';
    trigger.title = 'Block Format';
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    
    const formats = [
      { label: 'Paragraph', value: 'p' },
      { label: 'Heading 1', value: 'h1' },
      { label: 'Heading 2', value: 'h2' },
      { label: 'Heading 3', value: 'h3' },
      { label: 'Heading 4', value: 'h4' },
      { label: 'Heading 5', value: 'h5' },
      { label: 'Heading 6', value: 'h6' },
    ];
    
    formats.forEach(format => {
      const item = document.createElement('button');
      item.type = 'button';
      item.textContent = format.label;
      item.onclick = (e) => {
        e.preventDefault();
        this.execCommand('formatBlock', `<${format.value}>`);
        trigger.textContent = format.label;
        this.closeDropdown();
      };
      menu.appendChild(item);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu);
    };
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  createAlignmentDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = 'Align';
    trigger.title = 'Text Alignment';
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    
    const alignments = [
      { label: 'Align Left', icon: '<i class="fa-solid fa-align-left"></i>', command: 'justifyLeft' },
      { label: 'Align Center', icon: '<i class="fa-solid fa-align-center"></i>', command: 'justifyCenter' },
      { label: 'Align Right', icon: '<i class="fa-solid fa-align-right"></i>', command: 'justifyRight' },
      { label: 'Justify', icon: '<i class="fa-solid fa-align-justify"></i>', command: 'justifyFull' },
    ];
    
    alignments.forEach(align => {
      const item = document.createElement('button');
      item.type = 'button';
      item.innerHTML = `${align.icon} <span>${align.label}</span>`;
      item.onclick = (e) => {
        e.preventDefault();
        this.execCommand(align.command);
        this.closeDropdown();
      };
      menu.appendChild(item);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu);
    };
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  toggleDropdown(menu) {
    if (this.openDropdown === menu) {
      this.closeDropdown();
    } else {
      this.closeDropdown();
      menu.classList.add('show');
      this.openDropdown = menu;
    }
  }
  
  closeDropdown() {
    if (this.openDropdown) {
      this.openDropdown.classList.remove('show');
      this.openDropdown = null;
    }
  }
  
  createToolbarButton(type) {
    const config = this.getButtonConfig(type);
    if (!config) return null;
    
    if (config.dropdown) {
      return this.createDropdownButton(type, config);
    }
    
    const button = document.createElement('button');
    button.className = 'editium-toolbar-button';
    button.type = 'button';
    button.setAttribute('data-command', type);
    button.innerHTML = config.icon;
    button.title = config.title;
    
    button.onclick = (e) => {
      e.preventDefault();
      config.action();
      this.closeDropdown();
    };
    
    return button;
  }
  
  createDropdownButton(type, config) {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.innerHTML = config.icon;
    trigger.title = config.title;
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    
    config.dropdown.forEach(item => {
      const menuItem = document.createElement('button');
      menuItem.type = 'button';
      menuItem.textContent = item.label;
      menuItem.onclick = (e) => {
        e.preventDefault();
        item.action();
        this.closeDropdown();
      };
      menu.appendChild(menuItem);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu);
    };
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  getButtonConfig(type) {
    const configs = {
      'bold': { icon: '<i class="fa-solid fa-bold"></i>', title: 'Bold (Ctrl+B)', action: () => this.execCommand('bold') },
      'italic': { icon: '<i class="fa-solid fa-italic"></i>', title: 'Italic (Ctrl+I)', action: () => this.execCommand('italic') },
      'underline': { icon: '<i class="fa-solid fa-underline"></i>', title: 'Underline (Ctrl+U)', action: () => this.execCommand('underline') },
      'strikethrough': { icon: '<i class="fa-solid fa-strikethrough"></i>', title: 'Strikethrough', action: () => this.execCommand('strikeThrough') },
      'superscript': { icon: '<i class="fa-solid fa-superscript"></i>', title: 'Superscript', action: () => this.execCommand('superscript') },
      'subscript': { icon: '<i class="fa-solid fa-subscript"></i>', title: 'Subscript', action: () => this.execCommand('subscript') },
      'code': { icon: '<i class="fa-solid fa-code"></i>', title: 'Code', action: () => this.toggleInlineCode() },
      'left': { icon: '<i class="fa-solid fa-align-left"></i>', title: 'Align Left', action: () => this.execCommand('justifyLeft') },
      'center': { icon: '<i class="fa-solid fa-align-center"></i>', title: 'Align Center', action: () => this.execCommand('justifyCenter') },
      'right': { icon: '<i class="fa-solid fa-align-right"></i>', title: 'Align Right', action: () => this.execCommand('justifyRight') },
      'justify': { icon: '<i class="fa-solid fa-align-justify"></i>', title: 'Justify', action: () => this.execCommand('justifyFull') },
      'bulleted-list': { icon: '<i class="fa-solid fa-list-ul"></i>', title: 'Bulleted List', action: () => this.execCommand('insertUnorderedList') },
      'numbered-list': { icon: '<i class="fa-solid fa-list-ol"></i>', title: 'Numbered List', action: () => this.execCommand('insertOrderedList') },
      'indent': { icon: '<i class="fa-solid fa-indent"></i>', title: 'Indent', action: () => this.execCommand('indent') },
      'outdent': { icon: '<i class="fa-solid fa-outdent"></i>', title: 'Outdent', action: () => this.execCommand('outdent') },
      'link': { icon: '<i class="fa-solid fa-link"></i>', title: 'Insert Link', action: () => this.showLinkModal() },
      'image': { icon: '<i class="fa-solid fa-image"></i>', title: 'Insert Image', action: () => this.showImageModal() },
      'blockquote': { icon: '<i class="fa-solid fa-quote-left"></i>', title: 'Blockquote', action: () => this.execCommand('formatBlock', '<blockquote>') },
      'code-block': { icon: '<i class="fa-solid fa-file-code"></i>', title: 'Code Block', action: () => this.insertCodeBlock() },
      'horizontal-rule': { icon: '<i class="fa-solid fa-minus"></i>', title: 'Horizontal Rule', action: () => this.execCommand('insertHorizontalRule') },
      'table': { icon: '<i class="fa-solid fa-table"></i>', title: 'Insert Table', action: () => this.showTableModal() },
      'text-color': { icon: '<i class="fa-solid fa-palette"></i>', title: 'Text Color', action: () => this.showColorPicker('foreColor') },
      'bg-color': { icon: '<i class="fa-solid fa-fill-drip"></i>', title: 'Background Color', action: () => this.showColorPicker('hiliteColor') },
      'undo': { icon: '<i class="fa-solid fa-rotate-left"></i>', title: 'Undo (Ctrl+Z)', action: () => this.undo() },
      'redo': { icon: '<i class="fa-solid fa-rotate-right"></i>', title: 'Redo (Ctrl+Y)', action: () => this.redo() },
      'preview': { icon: '<i class="fa-solid fa-eye"></i>', title: 'Preview', action: () => this.viewOutput('preview') },
      'view-html': { icon: '<i class="fa-solid fa-code"></i>', title: 'View HTML', action: () => this.viewOutput('html') },
      'view-json': { icon: '<i class="fa-solid fa-brackets-curly"></i>', title: 'View JSON', action: () => this.viewOutput('json') },
      'find-replace': { icon: '<i class="fa-solid fa-magnifying-glass"></i>', title: 'Find & Replace', action: () => this.toggleFindReplace() },
      'fullscreen': { icon: '<i class="fa-solid fa-expand"></i>', title: 'Toggle Fullscreen (F11)', action: () => this.toggleFullscreen() }
    };
    
    return configs[type];
  }
  
  execCommand(command, value = null) {
    document.execCommand(command, false, value);
    this.editor.focus();
    this.saveState();
    this.triggerChange();
  }
  
  toggleInlineCode() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (selectedText) {
      const code = document.createElement('code');
      code.style.backgroundColor = '#f4f4f4';
      code.style.padding = '2px 4px';
      code.style.borderRadius = '3px';
      code.style.fontFamily = 'monospace';
      code.textContent = selectedText;
      
      range.deleteContents();
      range.insertNode(code);
      
      this.saveState();
      this.triggerChange();
    }
  }
  
  showLinkModal() {
    // Save the current selection/cursor position BEFORE opening modal
    this.editor.focus();
    const selection = window.getSelection();
    const selectedText = selection.toString();
    let savedRange = null;
    
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }
    
    const modal = this.createModal('Insert Link', `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Link Text:</label>
        <input type="text" id="link-text" value="${this.escapeHtml(selectedText)}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">URL: *</label>
        <input type="text" id="link-url" placeholder="https://example.com" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Title (optional):</label>
        <input type="text" id="link-title" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: inline-flex; align-items: center; font-size: 14px; color: #333; cursor: pointer;">
          <input type="checkbox" id="link-target" style="margin-right: 8px;"> Open in new tab
        </label>
      </div>
    `, () => {
      const url = document.getElementById('link-url').value.trim();
      const text = document.getElementById('link-text').value.trim();
      const title = document.getElementById('link-title').value.trim();
      const target = document.getElementById('link-target').checked;
      
      if (!url) {
        alert('URL is required');
        return false;
      }
      
      try {
        new URL(url);
      } catch {
        alert('Please enter a valid URL');
        return false;
      }
      
      // Restore the saved selection before inserting the link
      if (savedRange) {
        this.editor.focus();
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
      
      const link = document.createElement('a');
      link.href = url;
      link.textContent = text || url;
      link.contentEditable = 'false';
      if (title) link.title = title;
      if (target) link.target = '_blank';
      
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
        
        // Add a space after the link for continued typing
        const space = document.createTextNode('\u00A0');
        range.setStartAfter(link);
        range.insertNode(space);
        
        // Move cursor after the space
        range.setStartAfter(space);
        range.setEndAfter(space);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      
      this.saveState();
      this.triggerChange();
      return true;
    });
    
    document.body.appendChild(modal);
    document.getElementById('link-url').focus();
  }
  
  showLinkPopup(linkElement) {
    this.selectedLink = linkElement;
    
    // Close existing popup if any
    this.closeLinkPopup();
    
    const rect = linkElement.getBoundingClientRect();
    
    this.linkPopup = document.createElement('div');
    this.linkPopup.className = 'editium-link-popup';
    this.linkPopup.style.cssText = `
      position: fixed;
      top: ${rect.bottom + window.scrollY + 5}px;
      left: ${rect.left + window.scrollX}px;
      background-color: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      min-width: 200px;
      overflow: hidden;
      z-index: 10000;
    `;
    
    this.linkPopup.innerHTML = `
      <div style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb;">
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Link URL:</div>
        <div style="font-size: 13px; color: #111827; word-break: break-all; font-family: monospace;">
          ${this.escapeHtml(linkElement.href)}
        </div>
      </div>
      <button class="editium-link-popup-btn editium-link-open" style="
        width: 100%;
        padding: 12px 16px;
        border: none;
        background-color: transparent;
        color: #374151;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
      ">
        <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Open Link
      </button>
      <button class="editium-link-popup-btn editium-link-edit" style="
        width: 100%;
        padding: 12px 16px;
        border: none;
        background-color: transparent;
        color: #374151;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
      ">
        <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Link
      </button>
      <button class="editium-link-popup-btn editium-link-remove" style="
        width: 100%;
        padding: 12px 16px;
        border: none;
        border-top: 1px solid #e5e7eb;
        background-color: transparent;
        color: #ef4444;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
      ">
        <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Remove Link
      </button>
    `;
    
    // Add hover effects
    const buttons = this.linkPopup.querySelectorAll('.editium-link-popup-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (btn.classList.contains('editium-link-remove')) {
          btn.style.backgroundColor = '#fef2f2';
        } else {
          btn.style.backgroundColor = '#f3f4f6';
        }
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = 'transparent';
      });
    });
    
    // Add click handlers
    this.linkPopup.querySelector('.editium-link-open').addEventListener('click', () => {
      window.open(linkElement.href, linkElement.target || '_self');
      this.closeLinkPopup();
    });
    
    this.linkPopup.querySelector('.editium-link-edit').addEventListener('click', () => {
      this.closeLinkPopup();
      this.editLink(linkElement);
    });
    
    this.linkPopup.querySelector('.editium-link-remove').addEventListener('click', () => {
      this.removeLink(linkElement);
      this.closeLinkPopup();
    });
    
    document.body.appendChild(this.linkPopup);
  }
  
  closeLinkPopup() {
    if (this.linkPopup) {
      this.linkPopup.remove();
      this.linkPopup = null;
    }
    this.selectedLink = null;
  }
  
  editLink(linkElement) {
    // Save the link element for later update
    const savedLinkElement = linkElement;
    
    const modal = this.createModal('Edit Link', `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Link Text:</label>
        <input type="text" id="link-text" value="${this.escapeHtml(linkElement.textContent)}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">URL: *</label>
        <input type="text" id="link-url" value="${this.escapeHtml(linkElement.href)}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Title (optional):</label>
        <input type="text" id="link-title" value="${this.escapeHtml(linkElement.title || '')}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: inline-flex; align-items: center; font-size: 14px; color: #333; cursor: pointer;">
          <input type="checkbox" id="link-target" ${linkElement.target === '_blank' ? 'checked' : ''} style="margin-right: 8px;"> Open in new tab
        </label>
      </div>
    `, () => {
      const url = document.getElementById('link-url').value.trim();
      const text = document.getElementById('link-text').value.trim();
      const title = document.getElementById('link-title').value.trim();
      const target = document.getElementById('link-target').checked;
      
      if (!url) {
        alert('URL is required');
        return false;
      }
      
      try {
        new URL(url);
      } catch {
        alert('Please enter a valid URL');
        return false;
      }
      
      // Update the link
      savedLinkElement.href = url;
      savedLinkElement.textContent = text || url;
      savedLinkElement.title = title;
      savedLinkElement.target = target ? '_blank' : '';
      savedLinkElement.contentEditable = 'false';
      
      this.saveState();
      this.triggerChange();
      return true;
    });
    
    document.body.appendChild(modal);
    document.getElementById('link-url').focus();
  }
  
  removeLink(linkElement) {
    // Replace the link with its text content
    const textNode = document.createTextNode(linkElement.textContent);
    linkElement.parentNode.replaceChild(textNode, linkElement);
    
    this.saveState();
    this.triggerChange();
  }
  
  showImageModal() {
    // Save the current selection/cursor position BEFORE opening modal
    this.editor.focus();
    const selection = window.getSelection();
    let savedRange = null;
    
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }
    
    const modal = this.createModal('Insert Image', `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Image URL:</label>
        <input type="text" id="image-url" placeholder="https://example.com/image.jpg" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      ${this.onImageUpload ? `
      <div style="margin-bottom: 16px; text-align: center;">
        <div style="color: #666; margin-bottom: 8px;">- OR -</div>
        <input type="file" id="image-file" accept="image/*" style="display: block; margin: 0 auto;">
      </div>
      ` : ''}
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Alt Text:</label>
        <input type="text" id="image-alt" placeholder="Image description" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Width (optional):</label>
        <input type="number" id="image-width" placeholder="e.g., 400" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
    `, async () => {
      let url = document.getElementById('image-url').value.trim();
      const alt = document.getElementById('image-alt').value.trim();
      const width = document.getElementById('image-width').value.trim();
      const fileInput = document.getElementById('image-file');
      
      if (fileInput && fileInput.files.length > 0) {
        if (this.onImageUpload) {
          try {
            url = await this.onImageUpload(fileInput.files[0]);
          } catch (error) {
            alert('Failed to upload image');
            return false;
          }
        }
      }
      
      if (!url) {
        alert('Image URL is required');
        return false;
      }
      
      // Restore the saved selection before inserting
      this.insertImage(url, alt || 'Image', width ? parseInt(width) : null, savedRange);
      
      return true;
    });
    
    document.body.appendChild(modal);
    document.getElementById('image-url').focus();
  }

  insertImage(url, alt = 'Image', width = null, savedRange = null) {
    // Restore the saved range if provided
    if (savedRange) {
      this.editor.focus();
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
    } else {
      // Focus the editor
      this.editor.focus();
    }
    
    // Create a wrapper div for the image with alignment controls
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'editium-image-wrapper align-left';
    imageWrapper.contentEditable = 'false';
    imageWrapper.style.textAlign = 'left'; // Default alignment for HTML output
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.display = 'inline-block';
    
    // Create image element
    const img = document.createElement('img');
    img.src = url;
    img.alt = alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.marginLeft = '0'; // Default left alignment
    img.style.marginRight = 'auto';
    img.className = 'resizable';
    img.draggable = false;
    
    if (width) {
      img.style.width = width + 'px';
    }
    
    // Create toolbar for alignment and actions
    const toolbar = this.createImageToolbar(imageWrapper, img);
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(toolbar);
    imageWrapper.appendChild(imageContainer);
    
    // Add resize functionality
    this.makeImageResizable(img);
    
    // Get current selection
    const selection = window.getSelection();
    let inserted = false;
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      // Delete any selected content
      range.deleteContents();
      
      // Insert the image wrapper at cursor position
      try {
        range.insertNode(imageWrapper);
        
        // Create a new paragraph after the image for continued editing
        const newPara = document.createElement('p');
        newPara.innerHTML = '<br>';
        
        // Insert the paragraph after the image wrapper
        if (imageWrapper.nextSibling) {
          imageWrapper.parentNode.insertBefore(newPara, imageWrapper.nextSibling);
        } else {
          imageWrapper.parentNode.appendChild(newPara);
        }
        
        // Move cursor to the new paragraph
        range.setStart(newPara, 0);
        range.setEnd(newPara, 0);
        selection.removeAllRanges();
        selection.addRange(range);
        
        inserted = true;
      } catch (e) {
        console.error('Error inserting image at cursor:', e);
      }
    }
    
    // Fallback: append to editor if insertion at cursor failed
    if (!inserted) {
      this.editor.appendChild(imageWrapper);
      const newPara = document.createElement('p');
      newPara.innerHTML = '<br>';
      this.editor.appendChild(newPara);
      
      // Move cursor to new paragraph
      const range = document.createRange();
      range.setStart(newPara, 0);
      range.setEnd(newPara, 0);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    this.saveState();
    this.triggerChange();
  }

  createImageToolbar(wrapper, img) {
    const toolbar = document.createElement('div');
    toolbar.className = 'editium-image-toolbar';
    
    // Alignment buttons group
    const alignmentGroup = document.createElement('div');
    alignmentGroup.className = 'editium-image-toolbar-group';
    
    const alignments = [
      { value: 'left', label: '⬅', title: 'Align left' },
      { value: 'center', label: '↔', title: 'Align center' },
      { value: 'right', label: '➡', title: 'Align right' }
    ];
    
    alignments.forEach(align => {
      const btn = document.createElement('button');
      btn.textContent = align.label;
      btn.title = align.title;
      btn.className = align.value === 'left' ? 'active' : '';
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.changeImageAlignment(wrapper, align.value);
        
        // Update active state
        alignmentGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      alignmentGroup.appendChild(btn);
    });
    
    toolbar.appendChild(alignmentGroup);
    
    // Action buttons group
    const actionGroup = document.createElement('div');
    actionGroup.className = 'editium-image-toolbar-group';
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeBtn.title = 'Remove Image';
    removeBtn.style.color = '#dc3545';
    removeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (confirm('Remove this image?')) {
        wrapper.remove();
        this.saveState();
        this.triggerChange();
      }
    };
    actionGroup.appendChild(removeBtn);
    
    toolbar.appendChild(actionGroup);
    
    return toolbar;
  }

  changeImageAlignment(wrapper, alignment) {
    // Remove all alignment classes
    wrapper.classList.remove('align-left', 'align-center', 'align-right');
    
    // Add new alignment class for visual styling
    wrapper.classList.add(`align-${alignment}`);
    
    // Also add inline styles so alignment is preserved in HTML output
    const container = wrapper.querySelector('div[style*="position: relative"]');
    const img = wrapper.querySelector('img');
    
    if (container && img) {
      // Apply text-align to wrapper for HTML output
      if (alignment === 'left') {
        wrapper.style.textAlign = 'left';
        img.style.marginLeft = '0';
        img.style.marginRight = 'auto';
      } else if (alignment === 'center') {
        wrapper.style.textAlign = 'center';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
      } else if (alignment === 'right') {
        wrapper.style.textAlign = 'right';
        img.style.marginLeft = 'auto';
        img.style.marginRight = '0';
      }
    }
    
    this.saveState();
    this.triggerChange();
  }

  makeImageResizable(img) {
    let isResizing = false;
    let startX, startWidth;
    
    const startResize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      isResizing = true;
      startX = e.clientX || e.touches[0].clientX;
      startWidth = img.offsetWidth;
      
      img.classList.add('resizing');
      
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resize);
      document.addEventListener('touchend', stopResize);
    };
    
    const resize = (e) => {
      if (!isResizing) return;
      
      e.preventDefault();
      const currentX = e.clientX || e.touches[0].clientX;
      const diff = currentX - startX;
      const newWidth = startWidth + diff;
      
      if (newWidth > 50 && newWidth <= this.editor.offsetWidth) {
        img.style.width = newWidth + 'px';
      }
    };
    
    const stopResize = () => {
      if (!isResizing) return;
      
      isResizing = false;
      img.classList.remove('resizing');
      
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
      document.removeEventListener('touchmove', resize);
      document.removeEventListener('touchend', stopResize);
      
      this.saveState();
      this.triggerChange();
    };
    
    // Add resize handle on the right edge
    img.addEventListener('mousedown', (e) => {
      const rect = img.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      
      // Check if click is near the right edge (within 20px)
      if (offsetX > rect.width - 20) {
        startResize(e);
      }
    });
    
    img.addEventListener('touchstart', (e) => {
      const rect = img.getBoundingClientRect();
      const touch = e.touches[0];
      const offsetX = touch.clientX - rect.left;
      
      // Check if touch is near the right edge (within 20px)
      if (offsetX > rect.width - 20) {
        startResize(e);
      }
    });
  }
  
  showTableModal() {
    const modal = this.createModal('Insert Table', `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Rows:</label>
        <input type="number" id="table-rows" value="3" min="1" max="20" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Columns:</label>
        <input type="number" id="table-cols" value="3" min="1" max="10" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
    `, () => {
      const rows = parseInt(document.getElementById('table-rows').value) || 3;
      const cols = parseInt(document.getElementById('table-cols').value) || 3;
      
      const table = document.createElement('table');
      table.style.cssText = 'border-collapse: collapse; width: 100%; margin-bottom: 1em; border: 1px solid #ccc;';
      
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
          const cell = i === 0 ? document.createElement('th') : document.createElement('td');
          cell.style.cssText = 'border: 1px solid #ccc; padding: 8px; text-align: left;';
          if (i === 0) {
            cell.style.backgroundColor = '#f0f0f0';
            cell.style.fontWeight = 'bold';
            cell.textContent = `Header ${j + 1}`;
          } else {
            cell.innerHTML = '<br>';
          }
          cell.contentEditable = 'true';
          tr.appendChild(cell);
        }
        table.appendChild(tr);
      }
      
      this.insertNodeAtCursor(table);
      this.saveState();
      this.triggerChange();
      return true;
    });
    
    document.body.appendChild(modal);
  }
  
  showColorPicker(command) {
    const colors = [
      '#000000', '#495057', '#6c757d', '#adb5bd',
      '#dc3545', '#fd7e14', '#ffc107', '#28a745',
      '#20c997', '#007bff', '#6610f2', '#6f42c1',
      '#e83e8c', '#ffffff'
    ];
    
    const colorHTML = colors.map(color => 
      `<button type="button" style="width:30px;height:30px;border:1px solid #ccc;background:${color};cursor:pointer;margin:4px;border-radius:3px;" data-color="${color}"></button>`
    ).join('');
    
    const modal = this.createModal('Choose Color', `
      <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-bottom: 16px;">
        ${colorHTML}
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #333;">Or enter custom color:</label>
        <input type="text" id="custom-color" placeholder="#000000 or rgb(0,0,0)" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px;">
      </div>
    `, () => {
      const customColor = document.getElementById('custom-color').value.trim();
      if (customColor) {
        this.execCommand(command, customColor);
      }
      return true;
    });
    
    modal.querySelectorAll('[data-color]').forEach(btn => {
      btn.onclick = () => {
        this.execCommand(command, btn.getAttribute('data-color'));
        modal.remove();
      };
    });
    
    document.body.appendChild(modal);
  }
  
  createModal(title, content, onSubmit) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
    
    const modal = document.createElement('div');
    modal.style.cssText = 'background:#fff;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.2);max-width:500px;width:100%;max-height:90vh;overflow:auto;';
    
    modal.innerHTML = `
      <div style="padding:16px 20px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;font-size:18px;font-weight:600;color:#222f3e;">${title}</h3>
        <button type="button" class="modal-close" style="background:none;border:none;font-size:24px;color:#666;cursor:pointer;padding:0;width:32px;height:32px;line-height:24px;">×</button>
      </div>
      <div style="padding:20px;">
        ${content}
      </div>
      <div style="padding:16px 20px;border-top:1px solid #ccc;display:flex;justify-content:flex-end;gap:10px;">
        <button type="button" class="modal-cancel" style="padding:8px 16px;border:1px solid #ccc;border-radius:4px;background:#fff;color:#333;cursor:pointer;font-size:14px;">Cancel</button>
        <button type="button" class="modal-submit" style="padding:8px 16px;border:1px solid #007bff;border-radius:4px;background:#007bff;color:#fff;cursor:pointer;font-size:14px;font-weight:500;">Insert</button>
      </div>
    `;
    
    overlay.appendChild(modal);
    
    const close = () => overlay.remove();
    
    modal.querySelector('.modal-close').onclick = close;
    modal.querySelector('.modal-cancel').onclick = close;
    modal.querySelector('.modal-submit').onclick = async () => {
      const result = await onSubmit();
      if (result !== false) {
        close();
      }
    };
    
    overlay.onclick = (e) => {
      if (e.target === overlay) close();
    };
    
    return overlay;
  }
  
  insertCodeBlock() {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = 'Code here...';
    pre.appendChild(code);
    pre.style.cssText = 'background:#f4f4f4;padding:10px;border-radius:3px;font-family:monospace;overflow:auto;margin:1em 0;';
    
    this.insertNodeAtCursor(pre);
    this.saveState();
    this.triggerChange();
  }
  
  insertNodeAtCursor(node) {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      
      range.setStartAfter(node);
      range.setEndAfter(node);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      this.editor.appendChild(node);
    }
  }
  
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      this.wrapper.classList.add('editium-fullscreen');
      // Block background scroll
      document.body.classList.add('editium-fullscreen-active');
      // Remove height constraints in fullscreen mode
      this.editor.style.height = 'auto';
      this.editor.style.minHeight = 'auto';
      this.editor.style.maxHeight = 'none';
    } else {
      this.wrapper.classList.remove('editium-fullscreen');
      // Restore background scroll
      document.body.classList.remove('editium-fullscreen-active');
      // Restore height constraints when exiting fullscreen
      this.editor.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      this.editor.style.minHeight = typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight;
      this.editor.style.maxHeight = typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight;
    }
  }
  
  toggleFindReplace() {
    if (this.findReplacePanel) {
      this.findReplacePanel.remove();
      this.findReplacePanel = null;
      this.clearSearch();
      return;
    }
    
    const panel = document.createElement('div');
    panel.className = 'editium-find-replace';
    panel.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <!-- Search Input Container -->
        <div style="flex: 1; min-width: 200px;">
          <div style="position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; font-size: 14px;"></i>
            <input type="text" placeholder="Find..." class="editium-find-input" autocomplete="off" style="width: 100%; padding: 8px 10px 8px 32px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; transition: all 0.2s; background-color: white; box-sizing: border-box;">
          </div>
          <div class="editium-match-info" style="margin-top: 4px; font-size: 11px; color: #6b7280; min-height: 14px;"></div>
        </div>

        <!-- Navigation Buttons -->
        <div class="editium-nav-buttons" style="display: none; gap: 4px;">
          <button class="editium-btn-prev" title="Previous match (Shift+Enter)" style="padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; background-color: white; cursor: pointer; display: flex; align-items: center; color: #6b7280; transition: all 0.2s;">
            <i class="fa-solid fa-chevron-left" style="font-size: 14px;"></i>
          </button>
          <button class="editium-btn-next" title="Next match (Enter)" style="padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; background-color: white; cursor: pointer; display: flex; align-items: center; color: #6b7280; transition: all 0.2s;">
            <i class="fa-solid fa-chevron-right" style="font-size: 14px;"></i>
          </button>
        </div>

        <!-- Replace Input -->
        <div style="flex: 1; min-width: 200px;">
          <input type="text" placeholder="Replace..." class="editium-replace-input" autocomplete="off" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; transition: all 0.2s; background-color: white; box-sizing: border-box;">
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 6px;">
          <button class="editium-btn-replace" title="Replace current match" style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background-color: white; color: #374151; cursor: pointer; font-size: 13px; font-weight: 500; white-space: nowrap; transition: all 0.2s;">
            Replace
          </button>
          <button class="editium-btn-replace-all" title="Replace all matches" style="padding: 8px 12px; border: none; border-radius: 6px; background-color: #3b82f6; color: white; cursor: pointer; font-size: 13px; font-weight: 500; white-space: nowrap; transition: all 0.2s;">
            Replace All
          </button>
        </div>

        <!-- Close Button -->
        <button class="editium-btn-close" title="Close (Esc)" style="padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; background-color: white; cursor: pointer; display: flex; align-items: center; color: #6b7280; transition: all 0.2s;">
          <i class="fa-solid fa-xmark" style="font-size: 16px;"></i>
        </button>
      </div>
    `;
    
    this.editorContainer.insertBefore(panel, this.editor);
    this.findReplacePanel = panel;
    
    const findInput = panel.querySelector('.editium-find-input');
    const replaceInput = panel.querySelector('.editium-replace-input');
    const matchInfo = panel.querySelector('.editium-match-info');
    const navButtons = panel.querySelector('.editium-nav-buttons');
    const prevBtn = panel.querySelector('.editium-btn-prev');
    const nextBtn = panel.querySelector('.editium-btn-next');
    const replaceBtn = panel.querySelector('.editium-btn-replace');
    const replaceAllBtn = panel.querySelector('.editium-btn-replace-all');
    const closeBtn = panel.querySelector('.editium-btn-close');
    
    // Input focus/blur handlers
    findInput.addEventListener('focus', () => {
      if (!this.searchQuery || this.searchMatches.length > 0) {
        findInput.style.borderColor = '#3b82f6';
      }
    });
    
    findInput.addEventListener('blur', () => {
      if (this.searchQuery && this.searchMatches.length === 0) {
        findInput.style.borderColor = '#ef4444';
      } else {
        findInput.style.borderColor = '#d1d5db';
      }
    });
    
    replaceInput.addEventListener('focus', () => {
      replaceInput.style.borderColor = '#3b82f6';
    });
    
    replaceInput.addEventListener('blur', () => {
      replaceInput.style.borderColor = '#d1d5db';
    });
    
    // Search input handler
    findInput.addEventListener('input', () => {
      this.searchQuery = findInput.value;
      this.performSearch();
      
      if (this.searchQuery) {
        if (this.searchMatches.length === 0) {
          matchInfo.textContent = 'No matches';
          matchInfo.style.color = '#ef4444';
          findInput.style.borderColor = '#ef4444';
          navButtons.style.display = 'none';
          replaceBtn.disabled = true;
          replaceAllBtn.disabled = true;
          replaceBtn.style.backgroundColor = '#f3f4f6';
          replaceBtn.style.color = '#9ca3af';
          replaceBtn.style.cursor = 'not-allowed';
          replaceAllBtn.style.backgroundColor = '#cbd5e1';
          replaceAllBtn.style.cursor = 'not-allowed';
        } else {
          matchInfo.textContent = `${this.currentMatchIndex + 1} of ${this.searchMatches.length}`;
          matchInfo.style.color = '#6b7280';
          findInput.style.borderColor = '#d1d5db';
          navButtons.style.display = 'flex';
          replaceBtn.disabled = false;
          replaceAllBtn.disabled = false;
          replaceBtn.style.backgroundColor = 'white';
          replaceBtn.style.color = '#374151';
          replaceBtn.style.cursor = 'pointer';
          replaceAllBtn.style.backgroundColor = '#3b82f6';
          replaceAllBtn.style.cursor = 'pointer';
        }
      } else {
        matchInfo.textContent = '';
        navButtons.style.display = 'none';
        replaceBtn.disabled = true;
        replaceAllBtn.disabled = true;
      }
    });
    
    // Navigation handlers
    prevBtn.onclick = () => {
      this.navigateSearch(-1, matchInfo);
    };
    
    nextBtn.onclick = () => {
      this.navigateSearch(1, matchInfo);
    };
    
    // Button hover effects
    [prevBtn, nextBtn].forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (this.searchMatches.length > 0) {
          btn.style.backgroundColor = '#f3f4f6';
          btn.style.borderColor = '#9ca3af';
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (this.searchMatches.length > 0) {
          btn.style.backgroundColor = 'white';
          btn.style.borderColor = '#d1d5db';
        }
      });
    });
    
    replaceBtn.addEventListener('mouseenter', () => {
      if (!replaceBtn.disabled) {
        replaceBtn.style.backgroundColor = '#f3f4f6';
        replaceBtn.style.borderColor = '#9ca3af';
      }
    });
    replaceBtn.addEventListener('mouseleave', () => {
      if (!replaceBtn.disabled) {
        replaceBtn.style.backgroundColor = 'white';
        replaceBtn.style.borderColor = '#d1d5db';
      }
    });
    
    replaceAllBtn.addEventListener('mouseenter', () => {
      if (!replaceAllBtn.disabled) {
        replaceAllBtn.style.backgroundColor = '#2563eb';
      }
    });
    replaceAllBtn.addEventListener('mouseleave', () => {
      if (!replaceAllBtn.disabled) {
        replaceAllBtn.style.backgroundColor = '#3b82f6';
      }
    });
    
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.backgroundColor = '#fee2e2';
      closeBtn.style.borderColor = '#ef4444';
      closeBtn.style.color = '#dc2626';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.backgroundColor = 'white';
      closeBtn.style.borderColor = '#d1d5db';
      closeBtn.style.color = '#6b7280';
    });
    
    // Replace handlers
    replaceBtn.onclick = () => {
      this.replaceCurrentMatch(replaceInput.value, matchInfo);
    };
    
    replaceAllBtn.onclick = () => {
      this.replaceAllMatches(replaceInput.value);
      this.clearSearch();
      findInput.value = '';
      replaceInput.value = '';
      matchInfo.textContent = '';
      navButtons.style.display = 'none';
    };
    
    closeBtn.onclick = () => {
      panel.remove();
      this.findReplacePanel = null;
      this.clearSearch();
    };
    
    findInput.focus();
  }
  
  performSearch() {
    this.clearHighlights();
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.searchMatches = [];
      return;
    }
    
    const searchLower = this.searchQuery.toLowerCase();
    const matches = [];
    
    // Get all text nodes in the editor
    const walker = document.createTreeWalker(
      this.editor,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip text nodes that are inside our mark elements
          if (node.parentElement && node.parentElement.classList.contains('editium-search-match')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement && node.parentElement.classList.contains('editium-search-current')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    let currentNode;
    const nodesToProcess = [];
    
    while (currentNode = walker.nextNode()) {
      nodesToProcess.push(currentNode);
    }
    
    // Find all matches
    nodesToProcess.forEach(node => {
      const text = node.textContent;
      const textLower = text.toLowerCase();
      let index = 0;
      
      while ((index = textLower.indexOf(searchLower, index)) !== -1) {
        matches.push({
          node: node,
          offset: index,
          length: this.searchQuery.length
        });
        index += 1; // Move to next character to find overlapping matches
      }
    });
    
    this.searchMatches = matches;
    this.currentMatchIndex = 0;
    
    if (this.searchMatches.length > 0) {
      this.highlightAllMatches();
    }
  }
  
  highlightAllMatches() {
    // Process matches in reverse order to avoid messing up indices
    const sortedMatches = [...this.searchMatches].reverse();
    
    sortedMatches.forEach((match, reverseIdx) => {
      const actualIdx = this.searchMatches.length - 1 - reverseIdx;
      const { node, offset, length } = match;
      
      if (!node.parentNode) return; // Node might have been removed
      
      try {
        // Split the text node at the match boundaries
        const text = node.textContent;
        const before = text.substring(0, offset);
        const matchText = text.substring(offset, offset + length);
        const after = text.substring(offset + length);
        
        // Create the mark element
        const mark = document.createElement('mark');
        const isCurrent = actualIdx === this.currentMatchIndex;
        mark.className = isCurrent ? 'editium-search-current' : 'editium-search-match';
        mark.textContent = matchText;
        
        // Apply styles based on whether it's the current match
        if (isCurrent) {
          mark.style.backgroundColor = '#ff9800';
          mark.style.color = '#ffffff';
          mark.style.fontWeight = '600';
          mark.setAttribute('data-current-match', 'true');
        } else {
          mark.style.backgroundColor = '#ffeb3b';
          mark.style.color = '#000000';
        }
        mark.style.padding = '2px 4px';
        mark.style.borderRadius = '2px';
        
        // Create new text nodes
        const parent = node.parentNode;
        const fragment = document.createDocumentFragment();
        
        if (before) {
          fragment.appendChild(document.createTextNode(before));
        }
        fragment.appendChild(mark);
        if (after) {
          fragment.appendChild(document.createTextNode(after));
        }
        
        // Replace the original text node
        parent.replaceChild(fragment, node);
        
      } catch (e) {
        console.warn('Failed to highlight match:', e);
      }
    });
    
    // Scroll to current match
    if (this.searchMatches.length > 0) {
      setTimeout(() => {
        const currentMark = this.editor.querySelector('[data-current-match="true"]');
        if (currentMark) {
          currentMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 10);
    }
  }
  
  clearHighlights() {
    this.editor.querySelectorAll('.editium-search-match, .editium-search-current').forEach(mark => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
  }
  
  navigateSearch(direction, matchInfoElement) {
    if (this.searchMatches.length === 0) return;
    
    // Update index first
    this.currentMatchIndex += direction;
    if (this.currentMatchIndex < 0) {
      this.currentMatchIndex = this.searchMatches.length - 1;
    } else if (this.currentMatchIndex >= this.searchMatches.length) {
      this.currentMatchIndex = 0;
    }
    
    // Clear highlights and re-search to get fresh node references
    this.clearHighlights();
    
    // Re-find all matches with fresh node references
    const searchLower = this.searchQuery.toLowerCase();
    const matches = [];
    
    const walker = document.createTreeWalker(
      this.editor,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.parentElement && node.parentElement.classList.contains('editium-search-match')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement && node.parentElement.classList.contains('editium-search-current')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    let currentNode;
    const nodesToProcess = [];
    
    while (currentNode = walker.nextNode()) {
      nodesToProcess.push(currentNode);
    }
    
    nodesToProcess.forEach(node => {
      const text = node.textContent;
      const textLower = text.toLowerCase();
      let index = 0;
      
      while ((index = textLower.indexOf(searchLower, index)) !== -1) {
        matches.push({
          node: node,
          offset: index,
          length: this.searchQuery.length
        });
        index += 1;
      }
    });
    
    this.searchMatches = matches;
    
    // Now highlight with the updated currentMatchIndex
    if (this.searchMatches.length > 0) {
      this.highlightAllMatches();
    }
    
    // Update match info display
    if (matchInfoElement) {
      matchInfoElement.textContent = this.searchMatches.length > 0 
        ? `${this.currentMatchIndex + 1} of ${this.searchMatches.length}`
        : 'No matches';
      matchInfoElement.style.color = this.searchMatches.length > 0 ? '#6b7280' : '#ef4444';
    }
  }
  
  updateMatchCount(element) {
    if (element) {
      element.textContent = this.searchMatches.length > 0 
        ? `${this.currentMatchIndex + 1}/${this.searchMatches.length}`
        : '0/0';
    }
  }
  
  replaceCurrentMatch(replacement, matchCountElement) {
    if (this.searchMatches.length === 0) return;
    
    const currentMark = this.editor.querySelectorAll('.editium-search-match, .editium-search-current')[this.currentMatchIndex];
    if (currentMark) {
      currentMark.textContent = replacement;
      const parent = currentMark.parentNode;
      while (currentMark.firstChild) {
        parent.insertBefore(currentMark.firstChild, currentMark);
      }
      parent.removeChild(currentMark);
      parent.normalize();
      
      this.performSearch();
      this.updateMatchCount(matchCountElement);
      this.saveState();
      this.triggerChange();
    }
  }
  
  replaceAllMatches(replacement) {
    this.editor.querySelectorAll('.editium-search-match, .editium-search-current').forEach(mark => {
      mark.textContent = replacement;
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
    
    this.saveState();
    this.triggerChange();
  }
  
  clearSearch() {
    this.clearHighlights();
    this.searchMatches = [];
    this.currentMatchIndex = 0;
    this.searchQuery = '';
  }
  
  viewOutput(type) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
    
    let content = '';
    let title = '';
    
    if (type === 'html') {
      content = this.formatHTML(this.getHTML());
      title = 'HTML Output';
      
      // If content is empty, show a message
      if (!content || content.trim() === '') {
        content = '<!-- No content -->';
      }
    } else if (type === 'json') {
      content = JSON.stringify(this.getJSON(), null, 2);
      title = 'JSON Output';
    } else if (type === 'preview') {
      const htmlContent = this.getHTML();
      const previewContent = htmlContent && htmlContent.trim() !== '' 
        ? htmlContent 
        : '<p style="color:#999;text-align:center;padding:40px;">No content to preview</p>';
      
      modal.innerHTML = `
        <div style="background:#fff;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.2);max-width:1200px;width:100%;max-height:90vh;display:flex;flex-direction:column;">
          <div style="padding:16px 20px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between;align-items:center;">
            <h3 style="margin:0;font-size:18px;font-weight:600;color:#222f3e;">Preview</h3>
            <button class="modal-close" style="background:none;border:none;font-size:24px;color:#666;cursor:pointer;padding:0;">×</button>
          </div>
          <div style="padding:20px;flex:1;overflow:auto;">${previewContent}</div>
          <div style="padding:16px 20px;border-top:1px solid #ccc;display:flex;justify-content:flex-end;gap:10px;">
            <button class="btn-copy" style="padding:8px 16px;border:1px solid #007bff;border-radius:4px;background:#007bff;color:#fff;cursor:pointer;font-size:14px;font-weight:500;">Copy HTML</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      const closeBtn = modal.querySelector('.modal-close');
      const copyBtn = modal.querySelector('.btn-copy');
      
      closeBtn.onclick = () => modal.remove();
      modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
      };
      
      copyBtn.onclick = () => {
        const html = this.getHTML();
        if (html && html.trim() !== '') {
          navigator.clipboard.writeText(html).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#28a745';
            copyBtn.style.borderColor = '#28a745';
            setTimeout(() => {
              copyBtn.textContent = 'Copy HTML';
              copyBtn.style.backgroundColor = '#007bff';
              copyBtn.style.borderColor = '#007bff';
            }, 2000);
          });
        }
      };
      return;
    }
    
    modal.innerHTML = `
      <div style="background:#fff;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.2);max-width:900px;width:100%;max-height:90vh;display:flex;flex-direction:column;">
        <div style="padding:16px 20px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="margin:0;font-size:18px;font-weight:600;color:#222f3e;">${title}</h3>
          <button class="modal-close" style="background:none;border:none;font-size:24px;color:#666;cursor:pointer;padding:0;">×</button>
        </div>
        <div style="padding:0;flex:1;overflow:auto;background:#282c34;">
          <pre style="margin:0;padding:20px;overflow-x:auto;background:#282c34;color:#abb2bf;font-family:'Courier New',Courier,monospace;font-size:13px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word;">${this.highlightCode(content, type)}</pre>
        </div>
        <div style="padding:16px 20px;border-top:1px solid #ccc;display:flex;justify-content:flex-end;gap:10px;">
          <button class="btn-download" style="padding:8px 16px;border:1px solid #6c757d;border-radius:4px;background:#6c757d;color:#fff;cursor:pointer;font-size:14px;font-weight:500;">Download</button>
          <button class="btn-copy" style="padding:8px 16px;border:1px solid #007bff;border-radius:4px;background:#007bff;color:#fff;cursor:pointer;font-size:14px;font-weight:500;">Copy to Clipboard</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    const copyBtn = modal.querySelector('.btn-copy');
    const downloadBtn = modal.querySelector('.btn-download');
    
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(content).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#28a745';
        copyBtn.style.borderColor = '#28a745';
        setTimeout(() => {
          copyBtn.textContent = 'Copy to Clipboard';
          copyBtn.style.backgroundColor = '#007bff';
          copyBtn.style.borderColor = '#007bff';
        }, 2000);
      });
    };
    
    downloadBtn.onclick = () => {
      const blob = new Blob([content], { type: type === 'html' ? 'text/html' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `editium-output.${type === 'html' ? 'html' : 'json'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  }
  
  formatHTML(html) {
    if (!html || html.trim() === '') return '';

    let indentLevel = 0;
    const tab = '  ';
    let formattedHTML = '';
    
    // Split HTML into tags and text, preserving structure
    const rawTokens = html.split(/(<[^>]+>)/);
    
    // Filter out empty strings but keep whitespace info
    const tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
      const token = rawTokens[i];
      if (token.startsWith('<') && token.endsWith('>')) {
        // It's a tag - add as is
        tokens.push({ type: 'tag', content: token });
      } else if (token.trim()) {
        // It's text content - trim but remember if it had leading/trailing spaces
        tokens.push({ type: 'text', content: token.trim() });
      }
    }

    const isBlockTag = (tag) => {
      const tagNameMatch = tag.match(/<\/?([a-zA-Z0-9]+)/);
      if (!tagNameMatch) return false;
      const blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'ul', 'ol', 'li', 'blockquote', 'pre', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'header', 'footer', 'section', 'article', 'aside', 'nav', 'main'];
      return blockTags.includes(tagNameMatch[1].toLowerCase());
    };

    const isInlineTag = (tag) => {
      const tagNameMatch = tag.match(/<\/?([a-zA-Z0-9]+)/);
      if (!tagNameMatch) return false;
      const inlineTags = ['strong', 'em', 'u', 's', 'a', 'span', 'code', 'b', 'i', 'sub', 'sup', 'img', 'br'];
      return inlineTags.includes(tagNameMatch[1].toLowerCase());
    };

    const isSelfClosing = (tag) => {
      return tag.endsWith('/>') || /<br|<hr|<img/.test(tag);
    };

    let onNewLine = true;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const prevToken = i > 0 ? tokens[i - 1] : null;
      const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;

      if (token.type === 'tag') {
        const tag = token.content;
        const isClosing = tag.startsWith('</');
        const isBlock = isBlockTag(tag);
        const isInline = isInlineTag(tag);

        if (isBlock) {
          if (isClosing) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          if (!onNewLine) {
            formattedHTML += '\n';
          }
          
          formattedHTML += tab.repeat(indentLevel) + tag;
          onNewLine = true;
          
          if (!isClosing && !isSelfClosing(tag)) {
            indentLevel++;
          }
        } else if (isInline) {
          // Inline tag
          if (onNewLine) {
            formattedHTML += tab.repeat(indentLevel);
            onNewLine = false;
          }
          
          // Add space before opening inline tag if preceded by text
          if (!isClosing && prevToken && prevToken.type === 'text') {
            formattedHTML += ' ';
          }
          
          formattedHTML += tag;
          
          // Add space after closing inline tag if followed by text
          if (isClosing && nextToken && nextToken.type === 'text') {
            formattedHTML += ' ';
          }
        } else {
          // Other tags
          formattedHTML += tag;
        }
      } else if (token.type === 'text') {
        // Text content
        if (onNewLine) {
          formattedHTML += tab.repeat(indentLevel);
          onNewLine = false;
        }
        
        formattedHTML += token.content;
      }
    }

    return formattedHTML.trim();
  }
  
  highlightCode(code, type) {
    // ALWAYS escape HTML first to prevent rendering
    const escaped = this.escapeHtml(code);
    
    if (type === 'html') {
      // Simple HTML syntax highlighting - be careful with order of replacements
      return escaped
        // First, highlight complete tags (opening brackets + tag names + closing brackets together)
        .replace(/(&lt;\/?)([a-z][a-z0-9]*)(\s[^&]*?)?(&gt;)/gi, (match, open, tagName, attrs, close) => {
          let result = open + '<span style="color:#e06c75;">' + tagName + '</span>';
          if (attrs) {
            // Highlight attributes within the tag
            result += attrs.replace(/\s([a-z-]+)(=)(&quot;[^&quot;]*&quot;)/gi, ' <span style="color:#d19a66;">$1</span>=<span style="color:#98c379;">$3</span>');
          }
          result += close;
          return result;
        });
    } else if (type === 'json') {
      // Simple JSON syntax highlighting with better patterns
      return escaped
        // Highlight property keys (including "html", "text", etc.)
        .replace(/(&quot;)(.*?)(&quot;)(\s*:)/g, '<span style="color:#e06c75;">$1$2$3</span><span style="color:#abb2bf;">$4</span>')
        // Highlight string values (after colons)
        .replace(/(:)(\s*)(&quot;)((?:[^&]|&(?!quot;))*?)(&quot;)/g, '$1$2<span style="color:#98c379;">$3$4$5</span>')
        // Highlight numbers
        .replace(/:\s*(-?\d+\.?\d*)/g, ': <span style="color:#d19a66;">$1</span>')
        // Highlight booleans and null
        .replace(/:\s*(true|false|null)/g, ': <span style="color:#56b6c2;">$1</span>')
        // Highlight brackets and braces
        .replace(/([{}\[\]])/g, '<span style="color:#abb2bf;">$1</span>')
        // Highlight commas
        .replace(/(,)/g, '<span style="color:#abb2bf;">$1</span>');
    }
    
    return escaped;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  saveState() {
    const state = this.editor.innerHTML;
    
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    if (this.history[this.historyIndex] === state) {
      return;
    }
    
    this.history.push(state);
    this.historyIndex++;
    
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.historyIndex--;
    }
  }
  
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.editor.innerHTML = this.history[this.historyIndex];
      this.triggerChange();
    }
  }
  
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.editor.innerHTML = this.history[this.historyIndex];
      this.triggerChange();
    }
  }
  
  attachEventListeners() {
    this.editor.addEventListener('input', () => {
      this.makeExistingLinksNonEditable();
      this.saveState();
      this.triggerChange();
      this.updateWordCount();
    });
    
    this.editor.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        this.execCommand('bold');
      } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        this.execCommand('italic');
      } else if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        this.execCommand('underline');
      } else if (e.ctrlKey && e.key === 'k') {
        // Ctrl+K to edit link if cursor is inside a link
        e.preventDefault();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          let node = selection.anchorNode;
          // Find the parent link element if we're inside one
          while (node && node !== this.editor) {
            if (node.nodeType === 1 && node.tagName === 'A') {
              this.editLink(node);
              return;
            }
            node = node.parentNode;
          }
        }
        // If not in a link, open the insert link modal
        this.showLinkModal();
      } else if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      } else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        this.redo();
      } else if (e.key === 'F11') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === 'Escape' && this.isFullscreen) {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === 'Escape' && this.linkPopup) {
        // Close link popup with Escape key
        e.preventDefault();
        this.closeLinkPopup();
      }
    });
    
    this.editor.addEventListener('mouseup', () => this.updateToolbarStates());
    this.editor.addEventListener('keyup', () => this.updateToolbarStates());
    
    // Prevent direct editing of link text - force users to use the edit modal
    this.editor.addEventListener('beforeinput', (e) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let node = selection.anchorNode;
        
        // Check if we're inside a link element
        while (node && node !== this.editor) {
          if (node.nodeType === 1 && node.tagName === 'A') {
            // Block any input that would modify link content
            if (e.inputType.startsWith('delete') || 
                e.inputType.startsWith('insert') || 
                e.inputType.startsWith('format') ||
                e.inputType === 'historyUndo' ||
                e.inputType === 'historyRedo') {
              e.preventDefault();
              // Show a brief visual feedback
              node.style.backgroundColor = 'rgba(255, 152, 0, 0.2)';
              setTimeout(() => {
                node.style.backgroundColor = '';
              }, 200);
              return;
            }
          }
          node = node.parentNode;
        }
      }
    });
    
    // Handle link clicks - always prevent default and show popup
    this.editor.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        this.showLinkPopup(e.target);
      }
    });
    
    // Prevent text selection in links
    this.editor.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.editium-dropdown')) {
        this.closeDropdown();
      }
      // Close link popup when clicking outside
      if (this.linkPopup && !e.target.closest('.editium-link-popup') && !e.target.closest('a')) {
        this.closeLinkPopup();
      }
    });
  }
  
  updateToolbarStates() {
    if (!this.toolbarElement) return;
    
    const commands = {
      'bold': 'bold',
      'italic': 'italic',
      'underline': 'underline',
      'strikethrough': 'strikeThrough'
    };
    
    Object.entries(commands).forEach(([type, cmd]) => {
      const isActive = document.queryCommandState(cmd);
      const button = this.toolbarElement.querySelector(`[data-command="${type}"]`);
      if (button) {
        button.classList.toggle('active', isActive);
      }
    });
  }
  
  updateWordCount() {
    if (!this.wordCountElement) return;
    
    const text = this.editor.textContent || '';
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    
    this.wordCountElement.innerHTML = `
      <div class="editium-word-count-stats">
        <span>Words: ${words}</span>
        <span>Characters: ${chars}</span>
        <span>Characters (no spaces): ${charsNoSpaces}</span>
      </div>
      <div class="editium-word-count-branding">
        Built with <span class="editium-brand">Editium</span>
      </div>
    `;
  }
  
  triggerChange() {
    this.onChange({
      html: this.getHTML(),
      json: this.getJSON(),
      text: this.getText()
    });
  }
  
  getHTML() {
    // Clone the editor content to avoid modifying the actual DOM
    const clone = this.editor.cloneNode(true);
    
    // Remove all image toolbars from the clone
    const toolbars = clone.querySelectorAll('.editium-image-toolbar');
    toolbars.forEach(toolbar => toolbar.remove());
    
    // Clean up image wrappers - keep structure but remove editor-specific attributes
    const wrappers = clone.querySelectorAll('.editium-image-wrapper');
    wrappers.forEach(wrapper => {
      // Remove editor-specific classes, keep alignment
      const alignment = wrapper.classList.contains('align-center') ? 'center' :
                       wrapper.classList.contains('align-right') ? 'right' : 'left';
      
      wrapper.className = ''; // Remove all classes
      wrapper.removeAttribute('contenteditable');
      
      // Ensure text-align is set for proper HTML output
      wrapper.style.textAlign = alignment;
      wrapper.style.margin = '10px 0';
      wrapper.style.display = 'block';
    });
    
    // Clean up image containers
    const containers = clone.querySelectorAll('div[style*="position: relative"]');
    containers.forEach(container => {
      if (container.querySelector('img')) {
        // This is an image container, simplify it
        container.style.position = '';
        container.style.display = '';
      }
    });
    
    // Remove editor-specific classes from images
    const images = clone.querySelectorAll('img');
    images.forEach(img => {
      img.classList.remove('resizable', 'resizing');
      img.removeAttribute('draggable');
    });
    
    let html = clone.innerHTML;
    
    // If the content is just an empty paragraph or heading with a br, return empty string
    if (html === '<p><br></p>' || html === '<h1><br></h1>' || html.match(/^<[^>]+><br><\/[^>]+>$/)) {
      return '';
    }
    
    return html;
  }
  
  getText() {
    return this.editor.textContent || '';
  }
  
  getJSON() {
    const nodes = [];
    const editorContent = this.editor.cloneNode(true);
    
    // Remove image toolbars and other UI elements
    editorContent.querySelectorAll('.editium-image-toolbar').forEach(el => el.remove());
    
    // Parse each child node
    Array.from(editorContent.childNodes).forEach(node => {
      const parsed = this.parseNodeToJSON(node);
      if (parsed) {
        nodes.push(parsed);
      }
    });
    
    return nodes;
  }
  
  parseNodeToJSON(node) {
    // Skip empty text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text.trim() === '') return null;
      return { text: text };
    }
    
    // Handle element nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      // Map HTML tags to JSON types
      const typeMap = {
        'p': 'paragraph',
        'h1': 'heading-one',
        'h2': 'heading-two',
        'h3': 'heading-three',
        'h4': 'heading-four',
        'h5': 'heading-five',
        'h6': 'heading-six',
        'ul': 'bulleted-list',
        'ol': 'numbered-list',
        'li': 'list-item',
        'blockquote': 'quote',
        'pre': 'code-block',
        'a': 'link',
        'img': 'image',
        'table': 'table',
        'tr': 'table-row',
        'td': 'table-cell',
        'th': 'table-header',
        'hr': 'horizontal-rule'
      };
      
      const type = typeMap[tagName] || 'paragraph';
      const result = { type };
      
      // Handle special cases
      if (tagName === 'a') {
        result.url = node.getAttribute('href') || '';
      } else if (tagName === 'img') {
        const wrapper = node.closest('.editium-image-wrapper');
        return {
          type: 'image',
          url: node.getAttribute('src') || '',
          alt: node.getAttribute('alt') || '',
          width: node.style.width || node.getAttribute('width') || null,
          alignment: wrapper ? (wrapper.classList.contains('align-left') ? 'left' : wrapper.classList.contains('align-right') ? 'right' : 'center') : 'left'
        };
      } else if (tagName === 'hr') {
        return { type: 'horizontal-rule' };
      } else if (tagName === 'br') {
        return null; // Skip br tags
      } else if (tagName === 'div' && node.classList.contains('editium-image-wrapper')) {
        // Parse the image inside the wrapper
        const img = node.querySelector('img');
        if (img) {
          return this.parseNodeToJSON(img);
        }
        return null;
      }
      
      // Parse children
      const children = [];
      Array.from(node.childNodes).forEach(child => {
        const parsed = this.parseInlineNode(child);
        if (parsed) {
          children.push(parsed);
        }
      });
      
      // If no children, add empty text node
      if (children.length === 0) {
        children.push({ text: '' });
      }
      
      result.children = children;
      return result;
    }
    
    return null;
  }
  
  parseInlineNode(node) {
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text === '') return null;
      return { text: text };
    }
    
    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      // Handle formatting marks
      const marks = {};
      
      if (tagName === 'strong' || tagName === 'b') {
        marks.bold = true;
      } else if (tagName === 'em' || tagName === 'i') {
        marks.italic = true;
      } else if (tagName === 'u') {
        marks.underline = true;
      } else if (tagName === 's' || tagName === 'strike') {
        marks.strikethrough = true;
      } else if (tagName === 'code') {
        marks.code = true;
      } else if (tagName === 'sub') {
        marks.subscript = true;
      } else if (tagName === 'sup') {
        marks.superscript = true;
      } else if (tagName === 'a') {
        return {
          type: 'link',
          url: node.getAttribute('href') || '',
          children: this.parseInlineChildren(node)
        };
      } else if (tagName === 'span') {
        // Handle colored text
        const style = node.getAttribute('style') || '';
        if (style.includes('color:')) {
          const colorMatch = style.match(/color:\s*([^;]+)/);
          if (colorMatch) {
            marks.color = colorMatch[1].trim();
          }
        }
        if (style.includes('background-color:')) {
          const bgMatch = style.match(/background-color:\s*([^;]+)/);
          if (bgMatch) {
            marks.backgroundColor = bgMatch[1].trim();
          }
        }
      } else if (tagName === 'br') {
        return { text: '\n' };
      } else if (tagName === 'img') {
        // Inline image
        return {
          type: 'image',
          url: node.getAttribute('src') || '',
          alt: node.getAttribute('alt') || '',
          children: [{ text: '' }]
        };
      }
      
      // If it's a block element, handle differently
      const blockElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre', 'table', 'tr', 'td', 'th'];
      if (blockElements.includes(tagName)) {
        return this.parseNodeToJSON(node);
      }
      
      // Parse children and apply marks
      const children = this.parseInlineChildren(node);
      
      // Apply marks to all text children
      return children.map(child => {
        if (child.text !== undefined) {
          return { ...child, ...marks };
        }
        return child;
      });
    }
    
    return null;
  }
  
  parseInlineChildren(node) {
    const children = [];
    Array.from(node.childNodes).forEach(child => {
      const parsed = this.parseInlineNode(child);
      if (parsed) {
        if (Array.isArray(parsed)) {
          children.push(...parsed);
        } else {
          children.push(parsed);
        }
      }
    });
    
    if (children.length === 0) {
      return [{ text: '' }];
    }
    
    return children;
  }
  
  setContent(content) {
    if (typeof content === 'string') {
      this.editor.innerHTML = content;
    } else if (typeof content === 'object' && content.content) {
      this.editor.innerHTML = content.content;
    }
    
    // Make all existing images resizable
    this.makeExistingImagesResizable();
    
    this.saveState();
    this.triggerChange();
  }

  makeExistingImagesResizable() {
    const images = this.editor.querySelectorAll('img');
    images.forEach(img => {
      // Check if image is already wrapped
      const parent = img.parentElement;
      
      if (parent && parent.classList.contains('editium-image-wrapper')) {
        // Already wrapped, just make sure it's resizable
        if (!img.classList.contains('resizable')) {
          img.classList.add('resizable');
          img.draggable = false;
          this.makeImageResizable(img);
        }
        
        // Make sure toolbar exists
        if (!parent.querySelector('.editium-image-toolbar')) {
          const toolbar = this.createImageToolbar(parent, img);
          const container = img.parentElement;
          if (container) {
            container.appendChild(toolbar);
          }
        }
      } else {
        // Need to wrap the image
        const wrapper = document.createElement('div');
        wrapper.className = 'editium-image-wrapper align-left';
        wrapper.contentEditable = 'false';
        wrapper.style.textAlign = 'left'; // Default alignment
        
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        
        // Replace img with wrapped version
        img.parentNode.insertBefore(wrapper, img);
        img.classList.add('resizable');
        img.draggable = false;
        
        // Set default alignment styles
        if (!img.style.marginLeft && !img.style.marginRight) {
          img.style.marginLeft = '0';
          img.style.marginRight = 'auto';
        }
        
        container.appendChild(img);
        const toolbar = this.createImageToolbar(wrapper, img);
        container.appendChild(toolbar);
        wrapper.appendChild(container);
        
        this.makeImageResizable(img);
      }
    });
  }
  
  makeExistingLinksNonEditable() {
    const links = this.editor.querySelectorAll('a');
    links.forEach(link => {
      link.contentEditable = 'false';
    });
  }
  
  clear() {
    this.editor.innerHTML = '<p><br></p>';
    this.saveState();
    this.triggerChange();
  }
  
  focus() {
    this.editor.focus();
  }
  
  destroy() {
    // Clean up fullscreen state if active
    if (this.isFullscreen) {
      document.body.classList.remove('editium-fullscreen-active');
    }
    this.container.innerHTML = '';
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Editium;
}
if (typeof window !== 'undefined') {
  window.Editium = Editium;
}

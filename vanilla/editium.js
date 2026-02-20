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
    
    this.height = options.height || '200px';
    this.minHeight = options.minHeight || '150px';
    this.maxHeight = options.maxHeight || '250px';
    
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
    this.showEmojiPicker = false;
    this.emojiPickerElement = null;
    
    if (!this.container) {
      throw new Error('Container element is required');
    }
    
    this.init();
  }
  
  init() {
    this.createEditor();
    this.attachEventListeners();
    
    if (this.editor.innerHTML.trim() === '') this.editor.innerHTML = '<p><br></p>';
    
    this.makeExistingImagesResizable();
    this.makeExistingLinksNonEditable();
    this.saveState();
  }
  
  createEditor() {
    this.container.innerHTML = '';
    
    this.wrapper = document.createElement('div');
    this.wrapper.className = `editium-wrapper ${this.className}`;
    if (this.isFullscreen) this.wrapper.classList.add('editium-fullscreen');
    
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
    
    if (!this.isFullscreen) {
      this.editor.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      this.editor.style.minHeight = typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight;
      this.editor.style.maxHeight = typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight;
    } else {
      this.editor.style.height = 'auto';
      this.editor.style.minHeight = 'auto';
      this.editor.style.maxHeight = 'none';
    }
    
    this.editorContainer.appendChild(this.editor);
    this.wrapper.appendChild(this.editorContainer);
    
    this.wordCountElement = document.createElement('div');
    this.wordCountElement.className = 'editium-word-count';
    this.wrapper.appendChild(this.wordCountElement);
    this.updateWordCount();
    
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
      'link', 'image', 'table', 'horizontal-rule', 'emoji', 'undo', 'redo',
      'separator',
      'import-docx', 'export-docx', 'export-pdf',
      'separator',
      'find-replace', 'fullscreen', 'view-output'
    ];
  }
  
  createToolbar(items) {
    const toolbar = document.createElement('div');
    toolbar.className = 'editium-toolbar';

    const groups = {
      paragraph: ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six'],
      format: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'],
      align: ['left', 'center', 'right', 'justify'],
      color: ['text-color', 'bg-color'],
      blocks: ['blockquote', 'code-block'],
      lists: ['bulleted-list', 'numbered-list', 'indent', 'outdent'],
      insert: ['link', 'image', 'table', 'horizontal-rule', 'emoji'],
      edit: ['undo', 'redo'],
      file: ['import-docx', 'export-docx', 'export-pdf'],
      view: ['preview', 'view-html', 'view-json']
    };
    
    if (this.toolbar === 'all') {
      toolbar.appendChild(this.createBlockFormatDropdown());
      toolbar.appendChild(this.createGroupDropdown('Format', groups.format));
      toolbar.appendChild(this.createAlignmentDropdown());
      toolbar.appendChild(this.createGroupDropdown('Color', groups.color));
      toolbar.appendChild(this.createGroupDropdown('Blocks', groups.blocks));
      toolbar.appendChild(this.createGroupDropdown('Lists', groups.lists));
      toolbar.appendChild(this.createGroupDropdown('Insert', groups.insert));
      toolbar.appendChild(this.createGroupDropdown('Edit', groups.edit));
      toolbar.appendChild(this.createGroupDropdown('File', groups.file));
      toolbar.appendChild(this.createGroupDropdown('View', groups.view));
      
      const spacer = document.createElement('div');
      spacer.style.flex = '1';
      toolbar.appendChild(spacer);
      
      const findButton = this.createToolbarButton('find-replace');
      const fullscreenButton = this.createToolbarButton('fullscreen');
      if (findButton) toolbar.appendChild(findButton);
      if (fullscreenButton) toolbar.appendChild(fullscreenButton);
    } else {
      const blockFormats = groups.paragraph;
      const alignments = groups.align;
      const fileItems = groups.file;
      let processedGroups = { block: false, align: false, file: false };
      
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
        } else if (fileItems.includes(item) && !processedGroups.file) {
          toolbar.appendChild(this.createGroupDropdown('File', groups.file));
          processedGroups.file = true;
        } else if (!blockFormats.includes(item) && !alignments.includes(item) && !fileItems.includes(item)) {
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
    
    const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = label;
    trigger.title = label;
    
    // ARIA attributes for accessibility
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menuId);
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-orientation', 'vertical');
    menu.setAttribute('aria-hidden', 'true');
    
    items.forEach((itemType, index) => {
      const config = this.getButtonConfig(itemType);
      if (!config) return;
      
      const item = document.createElement('button');
      item.type = 'button';
      item.innerHTML = `${config.icon} <span>${config.title}</span>`;
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      item.onclick = (e) => {
        e.preventDefault();
        config.action();
        this.closeDropdown();
        this.focusEditor();
      };
      
      menu.appendChild(item);
    });
    
    // Add keyboard navigation to trigger
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu, trigger);
    };
    
    trigger.onkeydown = (e) => {
      this.handleDropdownTriggerKeyDown(e, menu, trigger);
    };
    
    // Add keyboard navigation to menu
    this.addMenuKeyboardNavigation(menu, trigger);
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  createBlockFormatDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = 'Paragraph';
    trigger.title = 'Block Format';
    
    // ARIA attributes for accessibility
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menuId);
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-orientation', 'vertical');
    menu.setAttribute('aria-hidden', 'true');
    
    const formats = [
      { label: 'Paragraph', value: 'p' },
      { label: 'Heading 1', value: 'h1' },
      { label: 'Heading 2', value: 'h2' },
      { label: 'Heading 3', value: 'h3' },
      { label: 'Heading 4', value: 'h4' },
      { label: 'Heading 5', value: 'h5' },
      { label: 'Heading 6', value: 'h6' },
    ];
    
    formats.forEach((format, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.textContent = format.label;
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      item.onclick = (e) => {
        e.preventDefault();
        this.execCommand('formatBlock', `<${format.value}>`);
        trigger.textContent = format.label;
        this.closeDropdown();
        this.focusEditor();
      };
      
      menu.appendChild(item);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu, trigger);
    };
    
    trigger.onkeydown = (e) => {
      this.handleDropdownTriggerKeyDown(e, menu, trigger);
    };
    
    // Add keyboard navigation to menu
    this.addMenuKeyboardNavigation(menu, trigger);
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  createAlignmentDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'editium-dropdown';
    
    const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.textContent = 'Align';
    trigger.title = 'Text Alignment';
    
    // ARIA attributes for accessibility
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menuId);
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-orientation', 'vertical');
    menu.setAttribute('aria-hidden', 'true');
    
    const alignments = [
      { label: 'Align Left', icon: '<i class="fa-solid fa-align-left"></i>', command: 'justifyLeft' },
      { label: 'Align Center', icon: '<i class="fa-solid fa-align-center"></i>', command: 'justifyCenter' },
      { label: 'Align Right', icon: '<i class="fa-solid fa-align-right"></i>', command: 'justifyRight' },
      { label: 'Justify', icon: '<i class="fa-solid fa-align-justify"></i>', command: 'justifyFull' },
    ];
    
    alignments.forEach((align, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.innerHTML = `${align.icon} <span>${align.label}</span>`;
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      item.onclick = (e) => {
        e.preventDefault();
        this.execCommand(align.command);
        this.closeDropdown();
        this.focusEditor();
      };
      
      menu.appendChild(item);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu, trigger);
    };
    
    trigger.onkeydown = (e) => {
      this.handleDropdownTriggerKeyDown(e, menu, trigger);
    };
    
    // Add keyboard navigation to menu
    this.addMenuKeyboardNavigation(menu, trigger);
    
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }
  
  toggleDropdown(menu, trigger) {
    if (this.openDropdown === menu) {
      this.closeDropdown();
    } else {
      this.closeDropdown();
      menu.classList.add('show');
      this.openDropdown = menu;
      this.currentDropdownTrigger = trigger;
      
      // Update ARIA attributes
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'true');
      }
      menu.setAttribute('aria-hidden', 'false');
      
      // Focus first menu item
      const firstItem = menu.querySelector('[role="menuitem"]');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 0);
      }
    }
  }
  
  closeDropdown() {
    if (this.openDropdown) {
      this.openDropdown.classList.remove('show');
      
      // Update ARIA attributes
      if (this.currentDropdownTrigger) {
        this.currentDropdownTrigger.setAttribute('aria-expanded', 'false');
      }
      this.openDropdown.setAttribute('aria-hidden', 'true');
      
      this.openDropdown = null;
      this.currentDropdownTrigger = null;
    }
  }
  
  // New method to handle keyboard navigation on dropdown triggers
  handleDropdownTriggerKeyDown(event, menu, trigger) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown(menu, trigger);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.toggleDropdown(menu, trigger);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      trigger.focus();
    }
  }
  
  // New method to add keyboard navigation to menu items
  addMenuKeyboardNavigation(menu, trigger) {
    menu.addEventListener('keydown', (e) => {
      const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
      const currentIndex = items.indexOf(document.activeElement);
      
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
            this.updateMenuItemTabIndex(items, currentIndex + 1);
          }
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1].focus();
            this.updateMenuItemTabIndex(items, currentIndex - 1);
          }
          break;
          
        case 'Home':
          e.preventDefault();
          items[0].focus();
          this.updateMenuItemTabIndex(items, 0);
          break;
          
        case 'End':
          e.preventDefault();
          items[items.length - 1].focus();
          this.updateMenuItemTabIndex(items, items.length - 1);
          break;
          
        case 'Escape':
          e.preventDefault();
          this.closeDropdown();
          if (trigger) {
            trigger.focus();
          }
          break;
          
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (document.activeElement && document.activeElement.hasAttribute('role')) {
            document.activeElement.click();
          }
          break;
          
        case 'Tab':
          e.preventDefault();
          this.closeDropdown();
          if (trigger) {
            trigger.focus();
          }
          break;
      }
    });
  }
  
  // Update tabindex for roving tabindex pattern
  updateMenuItemTabIndex(items, focusedIndex) {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
    });
  }
  
  // New method to focus the editor
  focusEditor() {
    setTimeout(() => {
      if (this.editor) {
        this.editor.focus();
      }
    }, 0);
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (this.showEmojiPicker) {
      this.createAndShowEmojiPicker();
    } else {
      this.closeEmojiPicker();
    }
  }

  closeEmojiPicker() {
    const backdrop = document.querySelector('[data-emojiBackdrop="true"]');
    if (backdrop && backdrop.parentNode) {
      backdrop.parentNode.removeChild(backdrop);
    }
    if (this.emojiPickerElement && this.emojiPickerElement.parentNode) {
      this.emojiPickerElement.parentNode.removeChild(this.emojiPickerElement);
    }
    this.emojiPickerElement = null;
    this.showEmojiPicker = false;
  }

  getEmojiCategories() {
    return {
      'Smileys': '😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😚😙😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😏😒😞😔😟😕🙁☹️😲😱😳🥺😦😧😨😰😥😢😭😱😱😤😠😡🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊',
      'Animals': '💋👋👏🙌👐🤲🤝🤜🤛✊👊🤚🖐️✋🖖👌🤌🤏✌️🤞🫰🤟🤘🤙👍👎👊👋☝️👆👇👈👉🫵💪🦾🦿🦵🦶👂👃🧠🦷🦴👀👁️👅👄🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐒🐶🐱🐭',
      'Food': '🍎🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🥔🍠🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🥓🥞🍖🍗🥩🍝🍜🍲🍛🍣🍱🥘🍰🎂🧁🍮🍭🍬🍫🍿🍩🍪',
      'Nature': '🌲🌳🌴🌱🌿☘️🍀🎍🎎🎏🎐🎑🌾💐🌷🌹🥀🌺🌻🌼🌸⛅🌤️🌥️☁️🌦️🌧️⛈️🌩️⛈️🌨️❄️☃️⛄🌬️💨💧💦☔🍏🌊🏔️⛰️🌋🗻🏕️⛺🏠🏡',
      'Objects': '⌚📱💻⌨️🖥️🖨️🖱️🖲️🕹️🗜️💽💾💿📀📼📷📸📹🎥🎬📽️🎞️📞☎️📟📠📺📻🎙️🎚️🎛️🧭⏱️⏲️⏰🕰️⌛⌚📡🔋🔌💡🔦🕯️🪔🧯🛢️💸💵💴💶💷💰💳💎⚖️🧰🔧🔨⚒️🛠️⛏️🔩⚙️🧱⛓️🧲🔫💣🧨🪃🔮📿🧿💈⚗️🔭🔬🕯️💇💈💳🎁🎀🎊🎉🎈',
      'Travel': '✈️🛫🛬🛩️💺🛰️🚀🛸✉️📩📨📤📥📦🏷️🧧📪📫📬📭📮📗📕📖📘📙📚📓📒📏📐📈📉📊📵📴🧷🧹🧺🧻🧼🧽🧯🛒🚚🚛🚐🚙🚗🚕🚌🚎🏎️🚓🚑🚒🚐🛻🚚🚛🚜🏍️🛵🦯🦽🦼🛺🚲🛴🛹🛼🚏⛽🚨🚥🚦🛑🚧⚓⛵🛶🚤🛳️⛴️🛥️🚢⚓',
      'Symbols': '❤️🧡💛💚💙💜🖤🤍🤎💔💕💞💓💗💖💘💝💟👋🤚🖐️✋🖖👌🤌🤏✌️🤞🫰🤟🤘🤙👍👎👊☝️👆👇👈👉☜☝☞☟💪🦾🦿🦵🦶👂👃🧠🦷🦴👀👁️👅👄😀😃😄😁😆😅😂🤣😊😇',
      'Flags': '🏁🚩🎌🏴🏳️🏳️‍🌈🏳️‍⚧️🏴‍☠️🇦🇫🇦🇽🇦🇱🇩🇿🇦🇩🇦🇴🇦🇮🇦🇶🇦🇬🇦🇷🇦🇲🇦🇼🇦🇺🇦🇹🇦🇿🇧🇸🇧🇭🇧🇩🇧🇧🇧🇾🇧🇪🇧🇿🇧🇯🇧🇹🇧🇴🇧🇦'
    };
  }

  createAndShowEmojiPicker() {
    if (this.emojiPickerElement) {
      this.closeEmojiPicker();
      return;
    }

    const categories = this.getEmojiCategories();
    
    const pickerContainer = document.createElement('div');
    pickerContainer.className = 'editium-emoji-picker-container';
    pickerContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 12px;
      width: 90%;
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      border-bottom: 1px solid #e9ecef;
      padding-bottom: 8px;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Emoji Picker';
    title.style.cssText = 'margin: 0; font-size: 16px; font-weight: 600; color: #222f3e;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6c757d;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeBtn.onclick = () => this.closeEmojiPicker();

    header.appendChild(title);
    header.appendChild(closeBtn);
    pickerContainer.appendChild(header);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search emoji...';
    searchInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    `;
    pickerContainer.appendChild(searchInput);

    const tabsContainer = document.createElement('div');
    tabsContainer.style.cssText = `
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e9ecef;
      overflow-x: auto;
      padding-bottom: 8px;
    `;

    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 300px;
      overflow-y: auto;
    `;

    const categoryTabs = {};

    Object.keys(categories).forEach((category, index) => {
      const tab = document.createElement('button');
      tab.textContent = category[0];
      tab.style.cssText = `
        background: ${index === 0 ? '#dee2e6' : 'transparent'};
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 6px 10px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        color: #222f3e;
        white-space: nowrap;
        transition: background-color 0.2s;
      `;
      
      tab.onmouseover = () => {
        if (!tab.dataset.active) tab.style.backgroundColor = '#f0f0f0';
      };
      tab.onmouseout = () => {
        if (!tab.dataset.active) tab.style.backgroundColor = 'transparent';
      };

      tab.onclick = () => {
        Object.values(categoryTabs).forEach(t => {
          t.style.backgroundColor = 'transparent';
          t.dataset.active = '';
        });
        tab.style.backgroundColor = '#dee2e6';
        tab.dataset.active = 'true';

        contentContainer.innerHTML = '';
        const emojis = categories[category];
        for (let emoji of emojis) {
          const emojiBtn = document.createElement('button');
          emojiBtn.textContent = emoji;
          emojiBtn.style.cssText = `
            background: none;
            border: 1px solid transparent;
            font-size: 28px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s;
          `;
          emojiBtn.onmouseover = () => {
            emojiBtn.style.backgroundColor = '#f0f0f0';
            emojiBtn.style.borderColor = '#dee2e6';
            emojiBtn.style.transform = 'scale(1.2)';
          };
          emojiBtn.onmouseout = () => {
            emojiBtn.style.backgroundColor = 'transparent';
            emojiBtn.style.borderColor = 'transparent';
            emojiBtn.style.transform = 'scale(1)';
          };
          emojiBtn.onclick = (e) => {
            e.preventDefault();
            this.insertEmoji(emoji);
            this.closeEmojiPicker();
          };
          contentContainer.appendChild(emojiBtn);
        }
      };

      categoryTabs[category] = tab;
      tabsContainer.appendChild(tab);
    });

    // Show first category by default
    const firstTab = Object.values(categoryTabs)[0];
    if (firstTab) firstTab.click();

    pickerContainer.appendChild(tabsContainer);
    pickerContainer.appendChild(contentContainer);

    // Handle search
    searchInput.oninput = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm) {
        contentContainer.innerHTML = '';
        Object.values(categories).forEach(emojis => {
          // Simple emoji search - just show all emojis if searching
          for (let emoji of emojis) {
            const emojiBtn = document.createElement('button');
            emojiBtn.textContent = emoji;
            emojiBtn.style.cssText = `
              background: none;
              border: 1px solid transparent;
              font-size: 28px;
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;
              transition: all 0.2s;
            `;
            emojiBtn.onmouseover = () => {
              emojiBtn.style.backgroundColor = '#f0f0f0';
              emojiBtn.style.borderColor = '#dee2e6';
              emojiBtn.style.transform = 'scale(1.2)';
            };
            emojiBtn.onmouseout = () => {
              emojiBtn.style.backgroundColor = 'transparent';
              emojiBtn.style.borderColor = 'transparent';
              emojiBtn.style.transform = 'scale(1)';
            };
            emojiBtn.onclick = (event) => {
              event.preventDefault();
              this.insertEmoji(emoji);
              this.closeEmojiPicker();
            };
            contentContainer.appendChild(emojiBtn);
          }
        });
      } else {
        firstTab.click();
      }
    };

    // Close on outside click
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    `;
    backdrop.onclick = () => this.closeEmojiPicker();

    document.body.appendChild(backdrop);
    document.body.appendChild(pickerContainer);

    this.emojiPickerElement = pickerContainer;
    backdrop.dataset.emojiBackdrop = 'true';
  }

  insertEmoji(emoji) {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      this.editor.focus();
      document.execCommand('insertText', false, emoji);
    } else {
      const range = selection.getRangeAt(0);
      range.insertNode(document.createTextNode(emoji));
      range.setStartAfter(range.commonAncestorContainer.lastChild);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    this.editor.focus();
    this.saveState();
    this.triggerChange();
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
    
    const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
    
    const trigger = document.createElement('button');
    trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
    trigger.type = 'button';
    trigger.innerHTML = config.icon;
    trigger.title = config.title;
    
    // ARIA attributes for accessibility
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menuId);
    
    const menu = document.createElement('div');
    menu.className = 'editium-dropdown-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-orientation', 'vertical');
    menu.setAttribute('aria-hidden', 'true');
    
    config.dropdown.forEach((item, index) => {
      const menuItem = document.createElement('button');
      menuItem.type = 'button';
      menuItem.textContent = item.label;
      menuItem.setAttribute('role', 'menuitem');
      menuItem.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      menuItem.onclick = (e) => {
        e.preventDefault();
        item.action();
        this.closeDropdown();
        this.focusEditor();
      };
      
      menu.appendChild(menuItem);
    });
    
    trigger.onclick = (e) => {
      e.preventDefault();
      this.toggleDropdown(menu, trigger);
    };
    
    trigger.onkeydown = (e) => {
      this.handleDropdownTriggerKeyDown(e, menu, trigger);
    };
    
    // Add keyboard navigation to menu
    this.addMenuKeyboardNavigation(menu, trigger);
    
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
      'emoji': { icon: '😊', title: 'Emoji Picker', action: () => this.toggleEmojiPicker() },
      'text-color': { icon: '<i class="fa-solid fa-palette"></i>', title: 'Text Color', action: () => this.showColorPicker('foreColor') },
      'bg-color': { icon: '<i class="fa-solid fa-fill-drip"></i>', title: 'Background Color', action: () => this.showColorPicker('hiliteColor') },
      'undo': { icon: '<i class="fa-solid fa-rotate-left"></i>', title: 'Undo (Ctrl+Z)', action: () => this.undo() },
      'redo': { icon: '<i class="fa-solid fa-rotate-right"></i>', title: 'Redo (Ctrl+Y)', action: () => this.redo() },
      'preview': { icon: '<i class="fa-solid fa-eye"></i>', title: 'Preview', action: () => this.viewOutput('preview') },
      'view-html': { icon: '<i class="fa-solid fa-code"></i>', title: 'View HTML', action: () => this.viewOutput('html') },
      'view-json': { icon: '<i class="fa-solid fa-brackets-curly"></i>', title: 'View JSON', action: () => this.viewOutput('json') },
      'find-replace': { icon: '<i class="fa-solid fa-magnifying-glass"></i>', title: 'Find & Replace', action: () => this.toggleFindReplace() },
      'fullscreen': { icon: '<i class="fa-solid fa-expand"></i>', title: 'Toggle Fullscreen (F11)', action: () => this.toggleFullscreen() },
      'import-docx': { icon: '<i class="fa-solid fa-arrow-up-from-bracket"></i>', title: 'Import Word (.docx)', action: () => this.importDocx() },
      'export-docx': { icon: '<i class="fa-solid fa-arrow-down-to-bracket"></i>', title: 'Export to Word (.docx)', action: () => this.exportDocx() },
      'export-pdf': { icon: '<i class="fa-solid fa-download"></i>', title: 'Export to PDF', action: () => this.exportPdf() }
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
    this.editor.focus();
    const selection = window.getSelection();
    const selectedText = selection.toString();
    let savedRange = null;
    
    if (selection.rangeCount > 0) savedRange = selection.getRangeAt(0).cloneRange();
    
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

        const space = document.createTextNode('\u00A0');
        range.setStartAfter(link);
        range.insertNode(space);

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
        var parsedUrl = new URL(url, window.location.origin);
      } catch {
        alert('Please enter a valid URL');
        return false;
      }

      // Only allow http, https, and mailto schemes for safety
      const allowedSchemes = ['http:', 'https:', 'mailto:'];
      if (!allowedSchemes.includes(parsedUrl.protocol)) {
        alert('Only http, https, and mailto links are allowed for security reasons.');
        return false;
      }

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

    const textNode = document.createTextNode(linkElement.textContent);
    linkElement.parentNode.replaceChild(textNode, linkElement);
    
    this.saveState();
    this.triggerChange();
  }
  
  showImageModal() {

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

      this.insertImage(url, alt || 'Image', width ? parseInt(width) : null, savedRange);
      
      return true;
    });
    
    document.body.appendChild(modal);
    document.getElementById('image-url').focus();
  }

  insertImage(url, alt = 'Image', width = null, savedRange = null) {

    if (savedRange) {
      this.editor.focus();
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
    } else {

      this.editor.focus();
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'editium-image-wrapper align-left';
    imageWrapper.contentEditable = 'false';
    imageWrapper.style.textAlign = 'left';

    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.display = 'inline-block';

    const img = document.createElement('img');
    img.src = url;
    img.alt = alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.marginLeft = '0';
    img.style.marginRight = 'auto';
    img.className = 'resizable';
    img.draggable = false;
    
    if (width) {
      img.style.width = width + 'px';
    }

    const toolbar = this.createImageToolbar(imageWrapper, img);
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(toolbar);
    imageWrapper.appendChild(imageContainer);

    this.makeImageResizable(img);

    const selection = window.getSelection();
    let inserted = false;
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      range.deleteContents();

      try {
        range.insertNode(imageWrapper);

        const newPara = document.createElement('p');
        newPara.innerHTML = '<br>';

        if (imageWrapper.nextSibling) {
          imageWrapper.parentNode.insertBefore(newPara, imageWrapper.nextSibling);
        } else {
          imageWrapper.parentNode.appendChild(newPara);
        }

        range.setStart(newPara, 0);
        range.setEnd(newPara, 0);
        selection.removeAllRanges();
        selection.addRange(range);
        
        inserted = true;
      } catch (e) {
        console.error('Error inserting image at cursor:', e);
      }
    }

    if (!inserted) {
      this.editor.appendChild(imageWrapper);
      const newPara = document.createElement('p');
      newPara.innerHTML = '<br>';
      this.editor.appendChild(newPara);

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

        alignmentGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      alignmentGroup.appendChild(btn);
    });
    
    toolbar.appendChild(alignmentGroup);

    const actionGroup = document.createElement('div');
    actionGroup.className = 'editium-image-toolbar-group';

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

    wrapper.classList.remove('align-left', 'align-center', 'align-right');

    wrapper.classList.add(`align-${alignment}`);

    const container = wrapper.querySelector('div[style*="position: relative"]');
    const img = wrapper.querySelector('img');
    
    if (container && img) {

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

    img.addEventListener('mousedown', (e) => {
      const rect = img.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;

      if (offsetX > rect.width - 20) {
        startResize(e);
      }
    });
    
    img.addEventListener('touchstart', (e) => {
      const rect = img.getBoundingClientRect();
      const touch = e.touches[0];
      const offsetX = touch.clientX - rect.left;

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

      document.body.classList.add('editium-fullscreen-active');

      this.editor.style.height = 'auto';
      this.editor.style.minHeight = 'auto';
      this.editor.style.maxHeight = 'none';
    } else {
      this.wrapper.classList.remove('editium-fullscreen');

      document.body.classList.remove('editium-fullscreen-active');

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

    prevBtn.onclick = () => {
      this.navigateSearch(-1, matchInfo);
    };
    
    nextBtn.onclick = () => {
      this.navigateSearch(1, matchInfo);
    };

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
    this.currentMatchIndex = 0;
    
    if (this.searchMatches.length > 0) {
      this.highlightAllMatches();
    }
  }
  
  highlightAllMatches() {

    const sortedMatches = [...this.searchMatches].reverse();
    
    sortedMatches.forEach((match, reverseIdx) => {
      const actualIdx = this.searchMatches.length - 1 - reverseIdx;
      const { node, offset, length } = match;
      
      if (!node.parentNode) return;
      
      try {

        const text = node.textContent;
        const before = text.substring(0, offset);
        const matchText = text.substring(offset, offset + length);
        const after = text.substring(offset + length);

        const mark = document.createElement('mark');
        const isCurrent = actualIdx === this.currentMatchIndex;
        mark.className = isCurrent ? 'editium-search-current' : 'editium-search-match';
        mark.textContent = matchText;

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

        const parent = node.parentNode;
        const fragment = document.createDocumentFragment();
        
        if (before) {
          fragment.appendChild(document.createTextNode(before));
        }
        fragment.appendChild(mark);
        if (after) {
          fragment.appendChild(document.createTextNode(after));
        }

        parent.replaceChild(fragment, node);
        
      } catch (e) {
        console.warn('Failed to highlight match:', e);
      }
    });

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

    this.currentMatchIndex += direction;
    if (this.currentMatchIndex < 0) {
      this.currentMatchIndex = this.searchMatches.length - 1;
    } else if (this.currentMatchIndex >= this.searchMatches.length) {
      this.currentMatchIndex = 0;
    }

    this.clearHighlights();

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

    if (this.searchMatches.length > 0) {
      this.highlightAllMatches();
    }

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

    const rawTokens = html.split(/(<[^>]+>)/);

    const tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
      const token = rawTokens[i];
      if (token.startsWith('<') && token.endsWith('>')) {

        tokens.push({ type: 'tag', content: token });
      } else if (token.trim()) {

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

          if (onNewLine) {
            formattedHTML += tab.repeat(indentLevel);
            onNewLine = false;
          }

          if (!isClosing && prevToken && prevToken.type === 'text') {
            formattedHTML += ' ';
          }
          
          formattedHTML += tag;

          if (isClosing && nextToken && nextToken.type === 'text') {
            formattedHTML += ' ';
          }
        } else {

          formattedHTML += tag;
        }
      } else if (token.type === 'text') {

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

    const escaped = this.escapeHtml(code);
    
    if (type === 'html') {

      return escaped

        .replace(/(&lt;\/?)([a-z][a-z0-9]*)(\s[^&]*?)?(&gt;)/gi, (match, open, tagName, attrs, close) => {
          let result = open + '<span style="color:#e06c75;">' + tagName + '</span>';
          if (attrs) {

            result += attrs.replace(/\s([a-z-]+)(=)(&quot;[^&quot;]*&quot;)/gi, ' <span style="color:#d19a66;">$1</span>=<span style="color:#98c379;">$3</span>');
          }
          result += close;
          return result;
        });
    } else if (type === 'json') {

      return escaped

        .replace(/(&quot;)(.*?)(&quot;)(\s*:)/g, '<span style="color:#e06c75;">$1$2$3</span><span style="color:#abb2bf;">$4</span>')

        .replace(/(:)(\s*)(&quot;)((?:[^&]|&(?!quot;))*?)(&quot;)/g, '$1$2<span style="color:#98c379;">$3$4$5</span>')

        .replace(/:\s*(-?\d+\.?\d*)/g, ': <span style="color:#d19a66;">$1</span>')

        .replace(/:\s*(true|false|null)/g, ': <span style="color:#56b6c2;">$1</span>')

        .replace(/([{}\[\]])/g, '<span style="color:#abb2bf;">$1</span>')

        .replace(/(,)/g, '<span style="color:#abb2bf;">$1</span>');
    }
    
    return escaped;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  importDocx() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          // Validate file type
          if (!file.name.endsWith('.docx')) {
            throw new Error('Please select a valid .docx file');
          }
          
          // Show loading notification
          this.showNotification('Importing document...', 'info');
          
          // Dynamically import mammoth
          const mammoth = await this.loadMammoth();
          
          if (!mammoth) {
            throw new Error('Mammoth library failed to load properly');
          }
          
          // Try reading with Blob first (more direct approach)
          let result;
          try {
            // Use blob approach - Mammoth natively supports this
            result = await mammoth.convertToHtml({ blob: file });
          } catch (blobError) {
            console.warn('Blob approach failed, trying ArrayBuffer:', blobError);
            // Fallback to ArrayBuffer
            const arrayBuffer = await this.readFileAsUint8Array(file);
            
            if (!arrayBuffer || arrayBuffer.length === 0) {
              throw new Error('File is empty or could not be read');
            }
            
            result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
          }
          
          if (!result || !result.value) {
            throw new Error('Could not convert document to HTML');
          }
          
          const html = result.value;
          
          // Append imported content to existing content
          if (html && html.trim()) {
            this.editor.innerHTML += html;
            this.saveState();
            this.triggerChange();
            this.updateWordCount();
            this.showNotification(`Successfully imported ${file.name}`, 'success');
          } else {
            this.showNotification(`Document is empty or could not be imported`, 'error');
          }
        } catch (error) {
          console.error('Error importing .docx file:', error);
          this.showNotification(`Failed to import: ${error.message || 'Unknown error'}`, 'error');
        }
      }
    };
    input.click();
  }
  
  readFileAsUint8Array(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target?.result;
          if (!(arrayBuffer instanceof ArrayBuffer)) {
            throw new Error('Failed to read file as ArrayBuffer');
          }
          
          // Convert ArrayBuffer to Uint8Array for better compatibility
          const uint8Array = new Uint8Array(arrayBuffer);
          
          if (uint8Array.length === 0) {
            throw new Error('File is empty');
          }
          
          resolve(uint8Array);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        reject(new Error('File read error: ' + (error.message || 'Unknown error')));
      };
      
      reader.onabort = () => {
        reject(new Error('File read was aborted'));
      };
      
      try {
        reader.readAsArrayBuffer(file);
      } catch (error) {
        reject(new Error('Failed to initiate file read: ' + error.message));
      }
    });
  }
  
  async loadMammoth() {
    if (window.mammoth && window.mammoth.convertToHtml) {
      return window.mammoth;
    }
    
    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
      script.async = true;
      
      // Set up timeout
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Mammoth library took too long to load (15s)'));
      }, 15000);
      
      // Handle successful load
      script.onload = () => {
        clearTimeout(timeout);
        
        // Wait a bit for library to fully initialize
        setTimeout(() => {
          if (window.mammoth && typeof window.mammoth.convertToHtml === 'function') {
            resolve(window.mammoth);
          } else {
            reject(new Error('Mammoth library loaded but convertToHtml method not found'));
          }
        }, 100);
      };
      
      // Handle load error
      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Failed to load Mammoth library from CDN. Check your internet connection.'));
      };
      
      // Start loading
      document.head.appendChild(script);
    });
  }
  
  exportDocx() {
    try {
      const html = this.getHTML();
      if (!html || html.trim() === '') {
        this.showNotification('No content to export', 'error');
        return;
      }
      
      // Create a proper docx-like file with HTML content
      // Note: This creates an HTML file with .docx extension that opens in Word
      const htmlContent = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta charset="UTF-8" />
<title>Document</title>
<style>
body { font-family: 'Calibri', 'Arial', sans-serif; margin: 20px; line-height: 1.6; color: #000; }
h1 { font-size: 28pt; margin: 12px 0 6px 0; font-weight: bold; }
h2 { font-size: 24pt; margin: 12px 0 6px 0; font-weight: bold; }
h3 { font-size: 20pt; margin: 12px 0 6px 0; font-weight: bold; }
h4 { font-size: 16pt; margin: 12px 0 6px 0; font-weight: bold; }
h5 { font-size: 13pt; margin: 12px 0 6px 0; font-weight: bold; }
h6 { font-size: 11pt; margin: 12px 0 6px 0; font-weight: bold; }
p { margin: 0 0 10px 0; }
ul, ol { margin: 10px 0 10px 40px; }
li { margin: 5px 0; }
blockquote { margin: 10px 0; padding: 10px 20px; border-left: 4px solid #ccc; background: #f9f9f9; }
pre { background: #f4f4f4; padding: 12px; border-radius: 3px; overflow-x: auto; font-family: 'Courier New', monospace; }
code { background: #f4f4f4; padding: 2px 4px; border-radius: 2px; font-family: 'Courier New', monospace; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; }
table, th, td { border: 1px solid #999; }
th, td { padding: 8px; text-align: left; }
th { background: #f0f0f0; font-weight: bold; }
strong, b { font-weight: bold; }
em, i { font-style: italic; }
u { text-decoration: underline; }
s, del { text-decoration: line-through; }
hr { border: none; border-top: 1px solid #ccc; margin: 20px 0; }
</style>
</head>
<body>
${html}
</body>
</html>
      `;
      
      // Create a blob and download
      const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      this.showNotification('Document exported successfully', 'success');
    } catch (error) {
      console.error('Error exporting to .docx:', error);
      this.showNotification(`Failed to export document: ${error.message}`, 'error');
    }
  }
  
  exportPdf() {
    try {
      const html = this.getHTML();
      if (!html || html.trim() === '') {
        this.showNotification('No content to export', 'error');
        return;
      }
      
      // Show loading notification
      this.showNotification('Loading PDF libraries...', 'info');
      
      // Use async wrapper to handle promises properly
      this.loadPdfLibrariesAndExport(html).catch(error => {
        console.error('PDF Export Error:', error);
        this.showNotification(`PDF export failed: ${error.message || 'Unknown error'}`, 'error');
      });
      
    } catch (error) {
      console.error('Error starting PDF export:', error);
      this.showNotification('Failed to start PDF export', 'error');
    }
  }
  
  async loadPdfLibrariesAndExport(html) {
    try {
      // Load libraries
      await this.loadPdfLibraries();
      
      // Check if libraries are available
      if (!window.html2canvas) {
        throw new Error('html2canvas library failed to load');
      }
      
      if (!window.jsPDF) {
        throw new Error('jsPDF library failed to load');
      }
      
      const html2canvas = window.html2canvas;
      const jsPDF = window.jsPDF;
      
      // Create temporary element with content
      const element = document.createElement('div');
      element.innerHTML = html;
      element.style.padding = '20px';
      element.style.backgroundColor = 'white';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.lineHeight = '1.6';
      element.style.color = '#333';
      element.style.maxWidth = '100%';
      element.style.fontSize = '14px';
      
      // Temporarily add to DOM for rendering
      element.style.position = 'fixed';
      element.style.left = '-9999px';
      element.style.top = '-9999px';
      element.style.width = '800px';
      document.body.appendChild(element);
      
      try {
        // Convert to canvas
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          windowHeight: element.scrollHeight,
          windowWidth: element.scrollWidth
        });
        
        // Remove temporary element
        if (element.parentNode) {
          document.body.removeChild(element);
        }
        
        // Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = margin;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - (margin * 2));
        
        // Add subsequent pages if needed
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= (pageHeight - (margin * 2));
        }
        
        pdf.save('document.pdf');
        this.showNotification('PDF exported successfully', 'success');
      } catch (canvasError) {
        // Clean up if error occurs
        if (element.parentNode) {
          document.body.removeChild(element);
        }
        console.error('Canvas/PDF generation error:', canvasError);
        throw new Error('Failed to generate PDF: ' + canvasError.message);
      }
    } catch (error) {
      console.error('Error in PDF export:', error);
      throw error;
    }
  }
  
  async loadPdfLibraries() {
    try {
      // Load html2canvas
      if (!window.html2canvas) {
        await this.loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js', 'html2canvas');
      }
      
      // Load jsPDF - try unpkg CDN first
      if (!window.jsPDF) {
        await this.loadScript('https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js', 'jsPDF');
      }
      
      // If still not loaded, try alternative CDN
      if (!window.html2canvas || !window.jsPDF) {
        throw new Error('PDF libraries did not load properly');
      }
    } catch (error) {
      console.error('Error loading PDF libraries:', error);
      throw error;
    }
  }
  
  loadScript(src, globalName) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window[globalName]) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = false;
      
      // Add a timeout to catch hung requests
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout loading ${globalName} from ${src}`));
      }, 15000);
      
      script.onload = () => {
        clearTimeout(timeout);
        
        // Wait a bit for the library to initialize
        setTimeout(() => {
          if (window[globalName]) {
            resolve();
          } else {
            reject(new Error(`${globalName} not found on window after loading`));
          }
        }, 100);
      };
      
      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load script: ${src}`));
      };
      
      document.head.appendChild(script);
    });
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff';
    
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: ${bgColor};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10001;
      animation: slideInUp 0.3s ease-out;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    if (!document.getElementById('editium-notification-styles')) {
      style.id = 'editium-notification-styles';
      style.textContent = `
        @keyframes slideInUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      notification.style.animation = 'slideInUp 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
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

        e.preventDefault();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          let node = selection.anchorNode;

          while (node && node !== this.editor) {
            if (node.nodeType === 1 && node.tagName === 'A') {
              this.editLink(node);
              return;
            }
            node = node.parentNode;
          }
        }

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

        e.preventDefault();
        this.closeLinkPopup();
      } else if (e.key === 'Escape' && this.showEmojiPicker) {
        e.preventDefault();
        this.closeEmojiPicker();
      }
    });
    
    this.editor.addEventListener('mouseup', () => this.updateToolbarStates());
    this.editor.addEventListener('keyup', () => this.updateToolbarStates());

    this.editor.addEventListener('beforeinput', (e) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let node = selection.anchorNode;

        while (node && node !== this.editor) {
          if (node.nodeType === 1 && node.tagName === 'A') {

            if (e.inputType.startsWith('delete') || 
                e.inputType.startsWith('insert') || 
                e.inputType.startsWith('format') ||
                e.inputType === 'historyUndo' ||
                e.inputType === 'historyRedo') {
              e.preventDefault();

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

    this.editor.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        this.showLinkPopup(e.target);
      }
    });

    this.editor.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.editium-dropdown')) {
        this.closeDropdown();
      }

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
    
    let statsHTML = '';
    
    if (this.showWordCount) {
      const text = this.editor.textContent || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, '').length;
      
      statsHTML = `
        <div class="editium-word-count-stats">
          <span>Words: ${words}</span>
          <span>Characters: ${chars}</span>
          <span>Characters (no spaces): ${charsNoSpaces}</span>
        </div>
      `;
    }
    
    this.wordCountElement.innerHTML = `
      ${statsHTML}
      <div class="editium-word-count-branding">
        Built with <a href="https://www.npmjs.com/package/editium" target="_blank" rel="noopener noreferrer" class="editium-brand">Editium</a>
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

    const clone = this.editor.cloneNode(true);

    const toolbars = clone.querySelectorAll('.editium-image-toolbar');
    toolbars.forEach(toolbar => toolbar.remove());

    const wrappers = clone.querySelectorAll('.editium-image-wrapper');
    wrappers.forEach(wrapper => {

      const alignment = wrapper.classList.contains('align-center') ? 'center' :
                       wrapper.classList.contains('align-right') ? 'right' : 'left';
      
      wrapper.className = '';
      wrapper.removeAttribute('contenteditable');

      wrapper.style.textAlign = alignment;
      wrapper.style.margin = '10px 0';
      wrapper.style.display = 'block';
    });

    const containers = clone.querySelectorAll('div[style*="position: relative"]');
    containers.forEach(container => {
      if (container.querySelector('img')) {

        container.style.position = '';
        container.style.display = '';
      }
    });

    const images = clone.querySelectorAll('img');
    images.forEach(img => {
      img.classList.remove('resizable', 'resizing');
      img.removeAttribute('draggable');
    });
    
    let html = clone.innerHTML;

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

    editorContent.querySelectorAll('.editium-image-toolbar').forEach(el => el.remove());

    Array.from(editorContent.childNodes).forEach(node => {
      const parsed = this.parseNodeToJSON(node);
      if (parsed) {
        nodes.push(parsed);
      }
    });
    
    return nodes;
  }
  
  parseNodeToJSON(node) {

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text.trim() === '') return null;
      return { text: text };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

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
        return null; 
      } else if (tagName === 'div' && node.classList.contains('editium-image-wrapper')) {

        const img = node.querySelector('img');
        if (img) {
          return this.parseNodeToJSON(img);
        }
        return null;
      }

      const children = [];
      Array.from(node.childNodes).forEach(child => {
        const parsed = this.parseInlineNode(child);
        if (parsed) {
          children.push(parsed);
        }
      });

      if (children.length === 0) {
        children.push({ text: '' });
      }
      
      result.children = children;
      return result;
    }
    
    return null;
  }
  
  parseInlineNode(node) {

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text === '') return null;
      return { text: text };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

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

        return {
          type: 'image',
          url: node.getAttribute('src') || '',
          alt: node.getAttribute('alt') || '',
          children: [{ text: '' }]
        };
      }

      const blockElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre', 'table', 'tr', 'td', 'th'];
      if (blockElements.includes(tagName)) {
        return this.parseNodeToJSON(node);
      }

      const children = this.parseInlineChildren(node);

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

    this.makeExistingImagesResizable();
    
    this.saveState();
    this.triggerChange();
  }

  makeExistingImagesResizable() {
    const images = this.editor.querySelectorAll('img');
    images.forEach(img => {

      const parent = img.parentElement;
      
      if (parent && parent.classList.contains('editium-image-wrapper')) {

        if (!img.classList.contains('resizable')) {
          img.classList.add('resizable');
          img.draggable = false;
          this.makeImageResizable(img);
        }

        if (!parent.querySelector('.editium-image-toolbar')) {
          const toolbar = this.createImageToolbar(parent, img);
          const container = img.parentElement;
          if (container) {
            container.appendChild(toolbar);
          }
        }
      } else {

        const wrapper = document.createElement('div');
        wrapper.className = 'editium-image-wrapper align-left';
        wrapper.contentEditable = 'false';
        wrapper.style.textAlign = 'left';
        
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.display = 'inline-block';

        img.parentNode.insertBefore(wrapper, img);
        img.classList.add('resizable');
        img.draggable = false;

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

    if (this.isFullscreen) {
      document.body.classList.remove('editium-fullscreen-active');
    }
    this.container.innerHTML = '';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Editium;
}
if (typeof window !== 'undefined') {
  window.Editium = Editium;
}

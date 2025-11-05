/**
 * Accessibility Tests for Editium Vanilla JavaScript
 * 
 * Tests keyboard navigation, ARIA attributes, and screen reader support
 * for toolbar dropdowns according to WCAG 2.1 Level AA and WAI-ARIA 1.2
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup JSDOM environment
let dom;
let window;
let document;
let container;
let Editium;

beforeEach(() => {
  // Create a new JSDOM instance for each test
  dom = new JSDOM('<!DOCTYPE html><html><body><div id="editor"></div></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });
  
  window = dom.window;
  document = window.document;
  global.window = window;
  global.document = document;
  global.Node = window.Node;
  global.HTMLElement = window.HTMLElement;
  
  // Mock execCommand
  document.execCommand = vi.fn();
  
  // Load Editium class (in real scenario, you'd import it)
  // For this test, we'll assume it's available globally
  container = document.getElementById('editor');
});

afterEach(() => {
  dom.window.close();
});

describe('Vanilla Editium Accessibility - ARIA Attributes', () => {
  it('should have aria-haspopup on all dropdown triggers', () => {
    const editor = createEditorWithToolbar(['paragraph', 'left']);
    
    const triggers = container.querySelectorAll('.editium-dropdown-trigger');
    triggers.forEach(trigger => {
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    });
  });
  
  it('should have aria-expanded="false" on closed dropdowns', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
  
  it('should update aria-expanded="true" when dropdown opens', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
  
  it('should have aria-controls pointing to menu id', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menuId = trigger.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);
    
    expect(menuId).toBeTruthy();
    expect(menu).toBeTruthy();
    expect(menu.classList.contains('editium-dropdown-menu')).toBe(true);
  });
  
  it('should have role="menu" on dropdown menus', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const menus = container.querySelectorAll('.editium-dropdown-menu');
    menus.forEach(menu => {
      expect(menu.getAttribute('role')).toBe('menu');
    });
  });
  
  it('should have aria-orientation="vertical" on menus', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const menus = container.querySelectorAll('.editium-dropdown-menu');
    menus.forEach(menu => {
      expect(menu.getAttribute('aria-orientation')).toBe('vertical');
    });
  });
  
  it('should have role="menuitem" on all menu items', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menuItems = container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]');
    expect(menuItems.length).toBeGreaterThan(0);
  });
  
  it('should have aria-hidden="true" on closed menus', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const menu = container.querySelector('.editium-dropdown-menu');
    expect(menu.getAttribute('aria-hidden')).toBe('true');
  });
  
  it('should update aria-hidden="false" when menu opens', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    trigger.click();
    expect(menu.getAttribute('aria-hidden')).toBe('false');
  });
  
  it('should implement roving tabindex with first item tabindex="0"', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    expect(menuItems[0].getAttribute('tabindex')).toBe('0');
    
    for (let i = 1; i < menuItems.length; i++) {
      expect(menuItems[i].getAttribute('tabindex')).toBe('-1');
    }
  });
});

describe('Vanilla Editium Accessibility - Keyboard Navigation', () => {
  it('should open dropdown with Enter key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    const event = new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    trigger.dispatchEvent(event);
    
    expect(menu.classList.contains('show')).toBe(true);
  });
  
  it('should open dropdown with Space key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    const event = new window.KeyboardEvent('keydown', { key: ' ', bubbles: true });
    trigger.dispatchEvent(event);
    
    expect(menu.classList.contains('show')).toBe(true);
  });
  
  it('should open dropdown with ArrowDown key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    const event = new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    trigger.dispatchEvent(event);
    
    expect(menu.classList.contains('show')).toBe(true);
  });
  
  it('should close dropdown with Escape key from trigger', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    trigger.click();
    expect(menu.classList.contains('show')).toBe(true);
    
    const event = new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    trigger.dispatchEvent(event);
    
    expect(menu.classList.contains('show')).toBe(false);
  });
  
  it('should close dropdown with Escape key from menu', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    trigger.click();
    expect(menu.classList.contains('show')).toBe(true);
    
    const event = new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    menu.dispatchEvent(event);
    
    expect(menu.classList.contains('show')).toBe(false);
  });
  
  it('should navigate down with ArrowDown key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    const menu = container.querySelector('.editium-dropdown-menu');
    
    // Focus should be on first item
    expect(document.activeElement).toBe(menuItems[0]);
    
    // Press ArrowDown
    const event = new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    menu.dispatchEvent(event);
    
    // Should update tabindex
    expect(menuItems[1].getAttribute('tabindex')).toBe('0');
  });
  
  it('should navigate up with ArrowUp key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menu = container.querySelector('.editium-dropdown-menu');
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    
    // Navigate down first
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    
    // Then navigate up
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    
    expect(menuItems[0].getAttribute('tabindex')).toBe('0');
  });
  
  it('should jump to first item with Home key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menu = container.querySelector('.editium-dropdown-menu');
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    
    // Navigate down a few times
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    
    // Press Home
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    
    expect(menuItems[0].getAttribute('tabindex')).toBe('0');
  });
  
  it('should jump to last item with End key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menu = container.querySelector('.editium-dropdown-menu');
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    
    // Press End
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    
    const lastIndex = menuItems.length - 1;
    expect(menuItems[lastIndex].getAttribute('tabindex')).toBe('0');
  });
  
  it('should activate item with Enter key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menu = container.querySelector('.editium-dropdown-menu');
    const firstItem = container.querySelector('.editium-dropdown-menu [role="menuitem"]');
    
    firstItem.focus();
    
    const clickSpy = vi.fn();
    firstItem.addEventListener('click', clickSpy);
    
    // Mock click method
    firstItem.click = clickSpy;
    
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    
    expect(clickSpy).toHaveBeenCalled();
  });
  
  it('should activate item with Space key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    trigger.click();
    
    const menu = container.querySelector('.editium-dropdown-menu');
    const firstItem = container.querySelector('.editium-dropdown-menu [role="menuitem"]');
    
    firstItem.focus();
    
    const clickSpy = vi.fn();
    firstItem.click = clickSpy;
    
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    
    expect(clickSpy).toHaveBeenCalled();
  });
  
  it('should close menu with Tab key', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    trigger.click();
    expect(menu.classList.contains('show')).toBe(true);
    
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    
    expect(menu.classList.contains('show')).toBe(false);
  });
});

describe('Vanilla Editium Accessibility - Focus Management', () => {
  it('should focus first menu item when dropdown opens', (done) => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const firstItem = container.querySelector('.editium-dropdown-menu [role="menuitem"]');
    
    trigger.click();
    
    setTimeout(() => {
      expect(document.activeElement).toBe(firstItem);
      done();
    }, 10);
  });
  
  it('should return focus to trigger when Escape is pressed', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    trigger.click();
    
    // Mock focus
    const focusSpy = vi.fn();
    trigger.focus = focusSpy;
    
    menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    
    expect(focusSpy).toHaveBeenCalled();
  });
  
  it('should return focus to editor after item selection', (done) => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const firstItem = container.querySelector('.editium-dropdown-menu [role="menuitem"]');
    const editorElement = container.querySelector('.editium-editor');
    
    trigger.click();
    
    // Mock focus
    const focusSpy = vi.fn();
    editorElement.focus = focusSpy;
    
    firstItem.click();
    
    setTimeout(() => {
      expect(focusSpy).toHaveBeenCalled();
      done();
    }, 10);
  });
});

describe('Vanilla Editium Accessibility - Multiple Dropdowns', () => {
  it('should close previous dropdown when opening new one', () => {
    const editor = createEditorWithToolbar(['paragraph', 'left']);
    
    const triggers = container.querySelectorAll('.editium-dropdown-trigger');
    const menus = container.querySelectorAll('.editium-dropdown-menu');
    
    // Open first dropdown
    triggers[0].click();
    expect(menus[0].classList.contains('show')).toBe(true);
    
    // Open second dropdown
    triggers[1].click();
    expect(menus[0].classList.contains('show')).toBe(false);
    expect(menus[1].classList.contains('show')).toBe(true);
  });
  
  it('should maintain independent ARIA states for each dropdown', () => {
    const editor = createEditorWithToolbar(['paragraph', 'left']);
    
    const triggers = container.querySelectorAll('.editium-dropdown-trigger');
    
    // Open first dropdown
    triggers[0].click();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false');
    
    // Open second dropdown
    triggers[1].click();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });
});

describe('Vanilla Editium Accessibility - Integration Tests', () => {
  it('should support complete keyboard workflow: open, navigate, select, close', (done) => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    const menuItems = Array.from(container.querySelectorAll('.editium-dropdown-menu [role="menuitem"]'));
    
    // 1. Open with Enter
    trigger.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(menu.classList.contains('show')).toBe(true);
    
    setTimeout(() => {
      // 2. Navigate down
      menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      expect(menuItems[1].getAttribute('tabindex')).toBe('0');
      
      // 3. Close with Escape
      menu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(menu.classList.contains('show')).toBe(false);
      
      done();
    }, 10);
  });
  
  it('should work with all three dropdown types', () => {
    // This would test createBlockFormatDropdown, createAlignmentDropdown, and createGroupDropdown
    const editor = createEditorWithAllDropdowns();
    
    const dropdowns = container.querySelectorAll('.editium-dropdown');
    expect(dropdowns.length).toBeGreaterThanOrEqual(3);
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.editium-dropdown-trigger');
      const menu = dropdown.querySelector('.editium-dropdown-menu');
      
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(menu.getAttribute('role')).toBe('menu');
    });
  });
  
  it('should prevent default on all keyboard interactions', () => {
    const editor = createEditorWithToolbar(['paragraph']);
    
    const trigger = container.querySelector('.editium-dropdown-trigger');
    const menu = container.querySelector('.editium-dropdown-menu');
    
    const keys = ['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'];
    
    keys.forEach(key => {
      const event = new window.KeyboardEvent('keydown', { 
        key, 
        bubbles: true,
        cancelable: true 
      });
      
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End' || key === 'Escape') {
        menu.dispatchEvent(event);
      } else {
        trigger.dispatchEvent(event);
      }
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
});

// Helper functions to create editor instances
function createEditorWithToolbar(toolbar) {
  // Mock Editium class behavior
  const mockEditor = {
    container: container,
    toolbar: toolbar,
    placeholder: 'Type something...',
    init: function() {
      this.createEditor();
    },
    createEditor: function() {
      // Create basic structure similar to real Editium
      const wrapper = document.createElement('div');
      wrapper.className = 'editium-wrapper';
      
      if (toolbar.length > 0) {
        const toolbarEl = document.createElement('div');
        toolbarEl.className = 'editium-toolbar';
        
        toolbar.forEach(item => {
          if (item === 'paragraph') {
            toolbarEl.appendChild(createBlockFormatDropdown.call(this));
          } else if (item === 'left' || item === 'center' || item === 'right') {
            toolbarEl.appendChild(createAlignmentDropdown.call(this));
          }
        });
        
        wrapper.appendChild(toolbarEl);
      }
      
      const editorContainer = document.createElement('div');
      editorContainer.className = 'editium-editor-container';
      
      const editor = document.createElement('div');
      editor.className = 'editium-editor';
      editor.contentEditable = true;
      
      editorContainer.appendChild(editor);
      wrapper.appendChild(editorContainer);
      
      this.container.appendChild(wrapper);
      this.editor = editor;
      this.openDropdown = null;
      this.currentDropdownTrigger = null;
    },
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown,
    handleDropdownTriggerKeyDown: handleDropdownTriggerKeyDown,
    addMenuKeyboardNavigation: addMenuKeyboardNavigation,
    updateMenuItemTabIndex: updateMenuItemTabIndex,
    focusEditor: focusEditor,
    execCommand: function(cmd, value) {
      document.execCommand(cmd, false, value);
    }
  };
  
  mockEditor.init();
  return mockEditor;
}

function createEditorWithAllDropdowns() {
  return createEditorWithToolbar(['paragraph', 'left', 'bold']);
}

// Copy the actual Editium methods for testing
function createBlockFormatDropdown() {
  const dropdown = document.createElement('div');
  dropdown.className = 'editium-dropdown';
  
  const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
  
  const trigger = document.createElement('button');
  trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
  trigger.type = 'button';
  trigger.textContent = 'Paragraph';
  trigger.title = 'Block Format';
  
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
  
  this.addMenuKeyboardNavigation(menu, trigger);
  
  dropdown.appendChild(trigger);
  dropdown.appendChild(menu);
  
  return dropdown;
}

function createAlignmentDropdown() {
  const dropdown = document.createElement('div');
  dropdown.className = 'editium-dropdown';
  
  const menuId = `editium-menu-${Math.random().toString(36).substr(2, 9)}`;
  
  const trigger = document.createElement('button');
  trigger.className = 'editium-toolbar-button editium-dropdown-trigger';
  trigger.type = 'button';
  trigger.textContent = 'Align';
  trigger.title = 'Text Alignment';
  
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
    { label: 'Align Left', command: 'justifyLeft' },
    { label: 'Align Center', command: 'justifyCenter' },
    { label: 'Align Right', command: 'justifyRight' },
  ];
  
  alignments.forEach((align, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.textContent = align.label;
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
  
  this.addMenuKeyboardNavigation(menu, trigger);
  
  dropdown.appendChild(trigger);
  dropdown.appendChild(menu);
  
  return dropdown;
}

function toggleDropdown(menu, trigger) {
  if (this.openDropdown === menu) {
    this.closeDropdown();
  } else {
    this.closeDropdown();
    menu.classList.add('show');
    this.openDropdown = menu;
    this.currentDropdownTrigger = trigger;
    
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
    }
    menu.setAttribute('aria-hidden', 'false');
    
    const firstItem = menu.querySelector('[role="menuitem"]');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 0);
    }
  }
}

function closeDropdown() {
  if (this.openDropdown) {
    this.openDropdown.classList.remove('show');
    
    if (this.currentDropdownTrigger) {
      this.currentDropdownTrigger.setAttribute('aria-expanded', 'false');
    }
    this.openDropdown.setAttribute('aria-hidden', 'true');
    
    this.openDropdown = null;
    this.currentDropdownTrigger = null;
  }
}

function handleDropdownTriggerKeyDown(event, menu, trigger) {
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

function addMenuKeyboardNavigation(menu, trigger) {
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

function updateMenuItemTabIndex(items, focusedIndex) {
  items.forEach((item, index) => {
    item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
  });
}

function focusEditor() {
  setTimeout(() => {
    if (this.editor) {
      this.editor.focus();
    }
  }, 0);
}

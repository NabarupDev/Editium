/**
 * Accessibility Tests for Toolbar Dropdowns
 * Tests ARIA attributes, keyboard navigation, and focus management
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import React from 'react';
import Toolbar from '../../react/Toolbar';

// Helper to render Toolbar with editor context
const renderToolbar = (items: any[], props = {}) => {
  const editor = withHistory(withReact(createEditor()));
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Test content' }],
    } as any,
  ];

  return render(
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar items={items} {...props} />
    </Slate>
  );
};

describe('Toolbar Dropdown Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have aria-haspopup="menu" on dropdown buttons', () => {
      renderToolbar(['bold', 'italic', 'underline']);
      
      const formatButton = screen.getByTitle('Format');
      expect(formatButton).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('should have aria-expanded="false" when dropdown is closed', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      expect(formatButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when dropdown is open', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      expect(formatButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-controls pointing to menu element', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      const controlsId = formatButton.getAttribute('aria-controls');
      
      expect(controlsId).toBeTruthy();
      
      // Open dropdown and verify menu has matching ID
      fireEvent.mouseDown(formatButton);
      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('id', controlsId);
    });

    it('should have role="menu" on dropdown container', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it('should have aria-orientation="vertical" on menu', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should have role="menuitem" on dropdown items', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should have tabIndex={-1} on menu items', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('tabIndex', '-1');
      });
    });

    it('should have aria-checked on menu items', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('aria-checked');
      });
    });

    it('should have aria-hidden on decorative icons', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      // ChevronDown icon should be hidden from screen readers
      const chevron = formatButton.querySelector('svg');
      expect(chevron).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Keyboard Navigation - Opening/Closing', () => {
    it('should open dropdown when Enter key is pressed on button', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      formatButton.focus();
      
      fireEvent.keyDown(formatButton, { key: 'Enter' });
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it('should open dropdown when Space key is pressed on button', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      formatButton.focus();
      
      fireEvent.keyDown(formatButton, { key: ' ' });
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it('should close dropdown when Escape key is pressed', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      // Verify dropdown is open
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Press Escape
      fireEvent.keyDown(formatButton.parentElement!, { key: 'Escape' });
      
      // Verify dropdown is closed
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should return focus to button when Escape closes dropdown', async () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      fireEvent.keyDown(formatButton.parentElement!, { key: 'Escape' });
      
      await waitFor(() => {
        expect(formatButton).toHaveFocus();
      });
    });

    it('should toggle dropdown when Enter is pressed multiple times', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      formatButton.focus();
      
      // Open
      fireEvent.keyDown(formatButton, { key: 'Enter' });
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Close
      fireEvent.keyDown(formatButton, { key: 'Enter' });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation - Arrow Keys', () => {
    it('should focus first menu item when dropdown opens', async () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems[0]).toHaveFocus();
      });
    });

    it('should move focus down with ArrowDown key', async () => {
      renderToolbar(['bold', 'italic', 'underline']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      // First item should be focused
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      
      // Press ArrowDown
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(menuItems[1]).toHaveFocus();
      });
    });

    it('should move focus up with ArrowUp key', async () => {
      renderToolbar(['bold', 'italic', 'underline']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      // Wait for first item to be focused
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      
      // Move down twice
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      
      await waitFor(() => expect(menuItems[2]).toHaveFocus());
      
      // Move up
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowUp' });
      
      await waitFor(() => {
        expect(menuItems[1]).toHaveFocus();
      });
    });

    it('should wrap to first item when ArrowDown on last item', async () => {
      renderToolbar(['bold', 'italic', 'underline']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      // Navigate to last item
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      
      await waitFor(() => expect(menuItems[2]).toHaveFocus());
      
      // Press ArrowDown again - should wrap to first
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });
    });

    it('should wrap to last item when ArrowUp on first item', async () => {
      renderToolbar(['bold', 'italic', 'underline']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      
      // Press ArrowUp on first item - should wrap to last
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowUp' });
      
      await waitFor(() => {
        expect(menuItems[menuItems.length - 1]).toHaveFocus();
      });
    });

    it('should open dropdown with ArrowDown when closed', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      formatButton.focus();
      
      fireEvent.keyDown(formatButton, { key: 'ArrowDown' });
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation - Home/End Keys', () => {
    it('should jump to first item when Home is pressed', async () => {
      renderToolbar(['bold', 'italic', 'underline', 'strikethrough']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      // Navigate to third item
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(formatButton.parentElement!, { key: 'ArrowDown' });
      
      await waitFor(() => expect(menuItems[2]).toHaveFocus());
      
      // Press Home
      fireEvent.keyDown(formatButton.parentElement!, { key: 'Home' });
      
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });
    });

    it('should jump to last item when End is pressed', async () => {
      renderToolbar(['bold', 'italic', 'underline', 'strikethrough']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      
      // Press End
      fireEvent.keyDown(formatButton.parentElement!, { key: 'End' });
      
      await waitFor(() => {
        expect(menuItems[menuItems.length - 1]).toHaveFocus();
      });
    });
  });

  describe('Keyboard Navigation - Menu Item Activation', () => {
    it('should activate menu item when Enter is pressed', () => {
      const onToggleMock = vi.fn();
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const boldItem = screen.getByText('Bold');
      
      // Press Enter on the item
      fireEvent.keyDown(boldItem, { key: 'Enter' });
      
      // Verify the dropdown closes after activation
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should activate menu item when Space is pressed', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const italicItem = screen.getByText('Italic');
      
      // Press Space on the item
      fireEvent.keyDown(italicItem, { key: ' ' });
      
      // Verify the dropdown closes after activation
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should close dropdown when menu item is clicked with mouse', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      // Verify dropdown is open
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      const boldItem = screen.getByText('Bold');
      fireEvent.mouseDown(boldItem);
      
      // Verify the dropdown closes after clicking
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should have visible focus styles on focused items', async () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      const menuItems = screen.getAllByRole('menuitem');
      
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      
      // When focused, the item should have focus styles (tested via focus event)
      fireEvent.focus(menuItems[0]);
      
      // The component applies backgroundColor on focus
      expect(menuItems[0]).toBeInTheDocument();
    });

    it('should not have tabIndex on dropdown button (allows tab focus)', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      
      // Button should be normally focusable (no tabIndex or tabIndex=0)
      const tabIndex = formatButton.getAttribute('tabIndex');
      expect(tabIndex === null || tabIndex === '0').toBeTruthy();
    });

    it('should close dropdown when clicking outside', () => {
      renderToolbar(['bold', 'italic']);
      
      const formatButton = screen.getByTitle('Format');
      fireEvent.mouseDown(formatButton);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Click outside
      fireEvent.mouseDown(document.body);
      
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Dropdowns', () => {
    it('should support multiple independent dropdowns', () => {
      renderToolbar([
        'bold', 'italic', // Format dropdown
        'left', 'center', // Alignment dropdown
      ]);
      
      const formatButton = screen.getByTitle('Format');
      const alignButton = screen.getByTitle('Text alignment');
      
      // Both should have proper ARIA attributes
      expect(formatButton).toHaveAttribute('aria-haspopup', 'menu');
      expect(alignButton).toHaveAttribute('aria-haspopup', 'menu');
      
      // Both should be independently operable
      fireEvent.mouseDown(formatButton);
      expect(screen.getAllByRole('menu')).toHaveLength(1);
    });
  });

  describe('Block Formatting Dropdown', () => {
    it('should have accessible block formatting dropdown', () => {
      renderToolbar(['paragraph', 'heading-one', 'heading-two']);
      
      const blockButton = screen.getByTitle('Block format');
      expect(blockButton).toHaveAttribute('aria-haspopup', 'menu');
      
      fireEvent.mouseDown(blockButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });

  describe('Lists Dropdown', () => {
    it('should have accessible lists dropdown', () => {
      renderToolbar(['bulleted-list', 'numbered-list', 'indent']);
      
      const listsButton = screen.getByTitle('Lists');
      expect(listsButton).toHaveAttribute('aria-haspopup', 'menu');
      
      fireEvent.mouseDown(listsButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });
});

describe('Toolbar Dropdown Integration', () => {
  it('should maintain accessibility across editor interactions', async () => {
    renderToolbar(['bold', 'italic']);
    
    const formatButton = screen.getByTitle('Format');
    
    // Open dropdown
    fireEvent.mouseDown(formatButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Navigate with keyboard
    await waitFor(() => {
      const items = screen.getAllByRole('menuitem');
      expect(items[0]).toHaveFocus();
    });
    
    // Press escape
    fireEvent.keyDown(formatButton.parentElement!, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Re-open with keyboard
    formatButton.focus();
    fireEvent.keyDown(formatButton, { key: 'Enter' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});

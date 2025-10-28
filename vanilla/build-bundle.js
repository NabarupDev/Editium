const fs = require('fs');
const path = require('path');

const jsContent = fs.readFileSync(path.join(__dirname, 'editium.js'), 'utf-8');
const cssContent = fs.readFileSync(path.join(__dirname, 'editium.css'), 'utf-8');
const fontAwesomeCSS = '@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css");';

const bundledContent = `/**
 * Editium - Vanilla JavaScript Rich Text Editor (Bundled Version)
 * Version: 1.0.1 | License: MIT
 * Single file bundle - includes CSS and Font Awesome icons
 */

(function() {
  'use strict';

  function injectStyles() {
    if (typeof document === 'undefined' || document.getElementById('editium-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'editium-styles';
    styleElement.textContent = \`${fontAwesomeCSS}\n\n${cssContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    document.head.appendChild(styleElement);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyles);
  } else {
    injectStyles();
  }

${jsContent.replace(/^\/\*\*[\s\S]*?\*\/\n/, '').replace(/^class Editium/, '  class Editium').replace(/^}/m, '  }').replace(/\n/g, '\n  ')}

  if (typeof module !== 'undefined' && module.exports) module.exports = Editium;
  if (typeof window !== 'undefined') window.Editium = Editium;

})();
`;

fs.writeFileSync(path.join(__dirname, 'editium.bundle.js'), bundledContent, 'utf-8');
console.log('✅ Bundle created: editium.bundle.js');

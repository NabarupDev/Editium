## Next steps

These are the immediate next moves for the project — small, actionable items we can pick off in priority order.

- **Add Markdown support**
	- Description: Implement an optional Markdown editing mode in Editium alongside the existing rich-text editor. Provide a toggle to switch modes, live preview, import/export of Markdown, and robust round-trip conversion where feasible.
	- Acceptance criteria: Users can switch to Markdown mode, edit and preview Markdown, and import/export .md files with formatting preserved for common patterns (headings, lists, code blocks, images).

- **Make toolbar dropdowns accessible**
	- Description: Fix accessibility issues for toolbar dropdowns so they work with keyboard navigation and screen readers. Add proper ARIA roles, keyboard handlers (Enter/Space to open, Esc to close, Arrow keys to navigate), and roving tabindex or focus management.
	- Acceptance criteria: All dropdowns can be operated with keyboard only and are announced correctly by screen readers (NVDA/VoiceOver). Include a small accessibility test plan and automated checks where possible.

- **Add .docx (Word) import & export**
	- Description: Provide direct export to and import from Word (.docx) from within Editium. Preserve basic formatting (headings, bold/italic, lists, images). Evaluate libraries like `mammoth` and `docx` for import/export.
	- Acceptance criteria: Users can export a typical document to .docx and import a .docx with common structures preserved. Include tests for several document shapes (simple article, lists, images).

- **Tests, docs and rollout**
	- Description: Add unit and e2e tests for Markdown mode, accessibility fixes, and .docx import/export. Update `README.md` and docs with usage and limitations. Add a short migration note for existing users if behaviour changes.
	- Acceptance criteria: CI runs include new tests; docs updated; a small demo in `example/` shows Markdown and .docx flows.

Suggested priorities: 1) Dropdown accessibility (small, high impact), 2) Markdown support (medium effort, high value), 3) .docx import/export (larger scope).

Notes
- Keep accessibility and keyboard-first behaviour as primary constraints when designing toolbar and mode switching UX.
- When implementing .docx import/export, add size and performance checks for large documents.


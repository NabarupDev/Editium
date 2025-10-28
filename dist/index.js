'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var slate = require('slate');
var slateReact = require('slate-react');
var slateHistory = require('slate-history');
var outline = require('@heroicons/react/24/outline');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var isAlignmentActive = function (editor, alignment) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var match = Array.from(slate.Editor.nodes(editor, {
        at: slate.Editor.unhangRange(editor, selection),
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.align === alignment;
        },
    }))[0];
    return !!match;
};
var toggleAlignment = function (editor, alignment) {
    var isActive = isAlignmentActive(editor, alignment);
    slate.Transforms.setNodes(editor, { align: isActive ? undefined : alignment }, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'].includes(n.type);
        }
    });
};
var indentListItem = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    var listItemMatch = Array.from(slate.Editor.nodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'list-item';
        },
    }))[0];
    if (!listItemMatch)
        return;
    var listMatch = Array.from(slate.Editor.nodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
    }))[0];
    if (listMatch) {
        var parentList = listMatch[0];
        var listType = parentList.type;
        slate.Transforms.wrapNodes(editor, { type: listType, children: [] }, {
            match: function (n) {
                return !slate.Editor.isEditor(n) &&
                    slate.Element.isElement(n) &&
                    n.type === 'list-item';
            },
        });
    }
};
var outdentListItem = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    var listNodes = Array.from(slate.Editor.nodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
    }));
    if (listNodes.length > 1) {
        slate.Transforms.unwrapNodes(editor, {
            match: function (n) {
                return !slate.Editor.isEditor(n) &&
                    slate.Element.isElement(n) &&
                    ['bulleted-list', 'numbered-list'].includes(n.type);
            },
            split: true,
        });
    }
    else if (listNodes.length === 1) {
        slate.Transforms.unwrapNodes(editor, {
            match: function (n) {
                return !slate.Editor.isEditor(n) &&
                    slate.Element.isElement(n) &&
                    ['bulleted-list', 'numbered-list'].includes(n.type);
            },
        });
        slate.Transforms.setNodes(editor, { type: 'paragraph' }, {
            match: function (n) {
                return !slate.Editor.isEditor(n) &&
                    slate.Element.isElement(n) &&
                    n.type === 'list-item';
            }
        });
    }
};
var isMarkActive = function (editor, format) {
    var marks = slate.Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
var isBlockActive = function (editor, format) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var match = Array.from(slate.Editor.nodes(editor, {
        at: slate.Editor.unhangRange(editor, selection),
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === format;
        },
    }))[0];
    return !!match;
};
var toggleMark = function (editor, format) {
    var isActive = isMarkActive(editor, format);
    if (isActive) {
        slate.Editor.removeMark(editor, format);
    }
    else {
        slate.Editor.addMark(editor, format, true);
    }
};
var applyColor = function (editor, color) {
    if (color === null) {
        slate.Editor.removeMark(editor, 'color');
    }
    else {
        slate.Editor.addMark(editor, 'color', color);
    }
};
var applyBackgroundColor = function (editor, color) {
    if (color === null) {
        slate.Editor.removeMark(editor, 'backgroundColor');
    }
    else {
        slate.Editor.addMark(editor, 'backgroundColor', color);
    }
};
var getActiveColor = function (editor) {
    var marks = slate.Editor.marks(editor);
    return (marks === null || marks === void 0 ? void 0 : marks.color) ? String(marks.color) : null;
};
var getActiveBackgroundColor = function (editor) {
    var marks = slate.Editor.marks(editor);
    return (marks === null || marks === void 0 ? void 0 : marks.backgroundColor) ? String(marks.backgroundColor) : null;
};
var toggleBlock = function (editor, format) {
    var isActive = isBlockActive(editor, format);
    var isList = ['bulleted-list', 'numbered-list'].includes(format);
    slate.Transforms.unwrapNodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
        split: true,
    });
    var newProperties;
    if (format === 'list-item') {
        newProperties = { type: isActive ? 'paragraph' : 'list-item' };
    }
    else {
        newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
    }
    slate.Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
        var block = { type: format, children: [] };
        slate.Transforms.wrapNodes(editor, block);
    }
};
var insertHorizontalRule = function (editor) {
    var hr = {
        type: 'horizontal-rule',
        children: [{ text: '' }],
    };
    slate.Transforms.insertNodes(editor, hr);
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    slate.Transforms.insertNodes(editor, paragraph);
};
var insertImage = function (editor, url, alt, width) {
    var image = {
        type: 'image',
        url: url,
        alt: alt || 'Image',
        width: width,
        children: [{ text: '' }],
    };
    slate.Transforms.insertNodes(editor, image);
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    slate.Transforms.insertNodes(editor, paragraph);
};
var isValidImageUrl = function (url) {
    try {
        var parsedUrl = new URL(url);
        var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
        var pathname_1 = parsedUrl.pathname.toLowerCase();
        return imageExtensions.some(function (ext) { return pathname_1.endsWith(ext); }) ||
            parsedUrl.protocol === 'data:' ||
            pathname_1.includes('/image') ||
            parsedUrl.hostname.includes('cdn') ||
            parsedUrl.hostname.includes('imgur') ||
            parsedUrl.hostname.includes('unsplash');
    }
    catch (_a) {
        return false;
    }
};
var insertLink = function (editor, url, title, target) {
    if (editor.selection) {
        wrapLink(editor, url, title, target);
    }
};
var isLinkActive = function (editor) {
    var link = Array.from(slate.Editor.nodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'link';
        },
    }))[0];
    return !!link;
};
var unwrapLink = function (editor) {
    slate.Transforms.unwrapNodes(editor, {
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'link';
        },
    });
};
var wrapLink = function (editor, url, title, target) {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }
    var selection = editor.selection;
    var isCollapsed = selection && slate.Range.isCollapsed(selection);
    var link = __assign(__assign(__assign({ type: 'link', url: url }, (title && { title: title })), (target && { target: target })), { children: isCollapsed ? [{ text: url }] : [] });
    if (isCollapsed) {
        slate.Transforms.insertNodes(editor, link);
    }
    else {
        slate.Transforms.wrapNodes(editor, link, { split: true });
        slate.Transforms.collapse(editor, { edge: 'end' });
    }
};
var insertTable = function (editor, rows, cols) {
    if (rows === void 0) { rows = 3; }
    if (cols === void 0) { cols = 3; }
    var tableRows = [];
    for (var i = 0; i < rows; i++) {
        var cells = [];
        for (var j = 0; j < cols; j++) {
            cells.push({
                type: 'table-cell',
                children: [{ text: '' }],
            });
        }
        tableRows.push({
            type: 'table-row',
            children: cells,
        });
    }
    var table = {
        type: 'table',
        children: tableRows,
    };
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    slate.Transforms.insertNodes(editor, [table, paragraph]);
};
var isInTable = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    return !!tableMatch;
};
var addTableRow = function (editor) {
    var _a;
    var selection = editor.selection;
    if (!selection)
        return;
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _b = tableMatch, table = _b[0], tablePath = _b[1];
    var firstRow = table.children[0];
    var colCount = ((_a = firstRow === null || firstRow === void 0 ? void 0 : firstRow.children) === null || _a === void 0 ? void 0 : _a.length) || 1;
    var cells = [];
    for (var i = 0; i < colCount; i++) {
        cells.push({
            type: 'table-cell',
            children: [{ text: '' }],
        });
    }
    var newRow = {
        type: 'table-row',
        children: cells,
    };
    slate.Transforms.insertNodes(editor, newRow, {
        at: __spreadArray(__spreadArray([], tablePath, true), [table.children.length], false),
    });
};
var removeTableRow = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    var rowMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table-row';
        },
    }))[0];
    if (!rowMatch)
        return;
    var _a = rowMatch, rowPath = _a[1];
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (tableMatch) {
        var table = tableMatch[0];
        if (table.children.length <= 1) {
            slate.Transforms.removeNodes(editor, {
                match: function (n) {
                    return !slate.Editor.isEditor(n) &&
                        slate.Element.isElement(n) &&
                        n.type === 'table';
                },
            });
            return;
        }
    }
    slate.Transforms.removeNodes(editor, { at: rowPath });
};
var addTableColumn = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _a = tableMatch, table = _a[0], tablePath = _a[1];
    table.children.forEach(function (_row, rowIndex) {
        var newCell = {
            type: 'table-cell',
            children: [{ text: '' }],
        };
        slate.Transforms.insertNodes(editor, newCell, {
            at: __spreadArray(__spreadArray([], tablePath, true), [rowIndex, table.children[rowIndex].children.length], false),
        });
    });
};
var removeTableColumn = function (editor) {
    var _a, _b;
    var selection = editor.selection;
    if (!selection)
        return;
    var cellMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table-cell';
        },
    }))[0];
    if (!cellMatch)
        return;
    var _c = cellMatch, cellPath = _c[1];
    var cellIndex = cellPath[cellPath.length - 1];
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _d = tableMatch, table = _d[0], tablePath = _d[1];
    if (((_b = (_a = table.children[0]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length) <= 1) {
        slate.Transforms.removeNodes(editor, { at: tablePath });
        return;
    }
    for (var rowIndex = table.children.length - 1; rowIndex >= 0; rowIndex--) {
        slate.Transforms.removeNodes(editor, {
            at: __spreadArray(__spreadArray([], tablePath, true), [rowIndex, cellIndex], false),
        });
    }
};
var setTableAlignment = function (editor, alignment) {
    var selection = editor.selection;
    if (!selection)
        return;
    var tableMatch = Array.from(slate.Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !slate.Editor.isEditor(n) &&
                slate.Element.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _a = tableMatch, tablePath = _a[1];
    slate.Transforms.setNodes(editor, { align: alignment }, { at: tablePath });
};
var findAllMatches = function (editor, searchQuery) {
    if (!searchQuery)
        return [];
    var matches = [];
    var searchLower = searchQuery.toLowerCase();
    var textNodes = Array.from(slate.Editor.nodes(editor, {
        at: [],
        match: function (n) { return slate.Text.isText(n); },
    }));
    textNodes.forEach(function (_a) {
        var node = _a[0], path = _a[1];
        var textNode = node;
        var text = textNode.text;
        var textLower = text.toLowerCase();
        var index = 0;
        while ((index = textLower.indexOf(searchLower, index)) !== -1) {
            matches.push({
                path: path,
                offset: index,
                text: text.substring(index, index + searchQuery.length),
            });
            index += searchQuery.length;
        }
    });
    return matches;
};
var navigateToMatch = function (editor, match) {
    var _a;
    var start = { path: match.path, offset: match.offset };
    var end = { path: match.path, offset: match.offset + match.text.length };
    slate.Transforms.select(editor, { anchor: start, focus: end });
    var domRange = slateReact.ReactEditor.toDOMRange(editor, editor.selection);
    (_a = domRange.startContainer.parentElement) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
};
var replaceMatch = function (editor, match, replaceText) {
    var start = { path: match.path, offset: match.offset };
    var end = { path: match.path, offset: match.offset + match.text.length };
    slate.Transforms.select(editor, { anchor: start, focus: end });
    slate.Transforms.insertText(editor, replaceText);
};
var replaceAllMatches = function (editor, matches, replaceText) {
    var sortedMatches = __spreadArray([], matches, true).reverse();
    slate.Editor.withoutNormalizing(editor, function () {
        sortedMatches.forEach(function (match) {
            var start = { path: match.path, offset: match.offset };
            var end = { path: match.path, offset: match.offset + match.text.length };
            slate.Transforms.select(editor, { anchor: start, focus: end });
            slate.Transforms.delete(editor);
            slate.Transforms.insertText(editor, replaceText, { at: start });
        });
    });
};
var serializeToHtml = function (nodes) {
    return nodes.map(function (node) { return serializeNode(node); }).join('');
};
var serializeNode = function (node) {
    if (slate.Text.isText(node)) {
        var textNode = node;
        var string = escapeHtml(textNode.text);
        var styles = [];
        if (textNode.color)
            styles.push("color: ".concat(textNode.color));
        if (textNode.backgroundColor)
            styles.push("background-color: ".concat(textNode.backgroundColor));
        var styleAttr = styles.length > 0 ? " style=\"".concat(styles.join('; '), "\"") : '';
        if (textNode.bold)
            string = "<strong>".concat(string, "</strong>");
        if (textNode.italic)
            string = "<em>".concat(string, "</em>");
        if (textNode.underline)
            string = "<u>".concat(string, "</u>");
        if (textNode.code)
            string = "<code>".concat(string, "</code>");
        if (textNode.strikethrough)
            string = "<s>".concat(string, "</s>");
        if (textNode.superscript)
            string = "<sup>".concat(string, "</sup>");
        if (textNode.subscript)
            string = "<sub>".concat(string, "</sub>");
        if (styleAttr) {
            string = "<span".concat(styleAttr, ">").concat(string, "</span>");
        }
        return string;
    }
    var elementNode = node;
    var children = elementNode.children.map(function (n) { return serializeNode(n); }).join('');
    var alignStyle = elementNode.align ? " style=\"text-align: ".concat(elementNode.align, "\"") : '';
    switch (elementNode.type) {
        case 'paragraph':
            return "<p".concat(alignStyle, ">").concat(children, "</p>");
        case 'heading-one':
            return "<h1".concat(alignStyle, ">").concat(children, "</h1>");
        case 'heading-two':
            return "<h2".concat(alignStyle, ">").concat(children, "</h2>");
        case 'heading-three':
            return "<h3".concat(alignStyle, ">").concat(children, "</h3>");
        case 'heading-four':
            return "<h4".concat(alignStyle, ">").concat(children, "</h4>");
        case 'heading-five':
            return "<h5".concat(alignStyle, ">").concat(children, "</h5>");
        case 'heading-six':
            return "<h6".concat(alignStyle, ">").concat(children, "</h6>");
        case 'heading-seven':
            return "<h7".concat(alignStyle, ">").concat(children, "</h7>");
        case 'heading-eight':
            return "<h8".concat(alignStyle, ">").concat(children, "</h8>");
        case 'bulleted-list':
            return "<ul>".concat(children, "</ul>");
        case 'numbered-list':
            return "<ol>".concat(children, "</ol>");
        case 'list-item':
            return "<li>".concat(children, "</li>");
        case 'blockquote':
            return "<blockquote".concat(alignStyle, ">").concat(children, "</blockquote>");
        case 'code-block':
            return "<pre><code>".concat(children, "</code></pre>");
        case 'horizontal-rule':
            return "<hr />";
        case 'table':
            var tableNode = elementNode;
            var tableAlignStyle = tableNode.align ? " margin-left: ".concat(tableNode.align === 'center' ? 'auto' :
                tableNode.align === 'right' ? 'auto' : '0', "; margin-right: ").concat(tableNode.align === 'center' ? 'auto' :
                tableNode.align === 'right' ? '0' : 'auto', ";") : '';
            var tableWidthStyle = tableNode.width ? " width: ".concat(tableNode.width, "px; max-width: 100%;") : ' width: 100%;';
            return "<table style=\"border-collapse: collapse;".concat(tableWidthStyle, " margin-top: 16px; margin-bottom: 16px;").concat(tableAlignStyle, "\">").concat(children, "</table>");
        case 'table-row':
            return "<tr>".concat(children, "</tr>");
        case 'table-cell':
            var cellNode = elementNode;
            var cellAlignStyle = cellNode.align ? " text-align: ".concat(cellNode.align, ";") : '';
            return "<td style=\"border: 1px solid #ddd; padding: 8px;".concat(cellAlignStyle, "\">").concat(children, "</td>");
        case 'image':
            var imageNode = elementNode;
            var altAttr = imageNode.alt ? " alt=\"".concat(escapeHtml(imageNode.alt), "\"") : ' alt="Image"';
            var widthAttr = imageNode.width ? " width=\"".concat(imageNode.width, "\"") : '';
            var heightAttr = imageNode.height ? " height=\"".concat(imageNode.height, "\"") : '';
            var imgAlignStyle = imageNode.align ? " style=\"display: block; margin: ".concat(imageNode.align === 'center' ? '0 auto' :
                imageNode.align === 'right' ? '0 0 0 auto' : '0', ";\"") : '';
            return "<img src=\"".concat(escapeHtml(imageNode.url), "\"").concat(altAttr).concat(widthAttr).concat(heightAttr).concat(imgAlignStyle, " />");
        case 'link':
            var linkNode = elementNode;
            var titleAttr = linkNode.title ? " title=\"".concat(escapeHtml(linkNode.title), "\"") : '';
            var targetAttr = linkNode.target ? " target=\"".concat(linkNode.target, "\"") : '';
            var relAttr = linkNode.target === '_blank' ? ' rel="noopener noreferrer"' : '';
            return "<a href=\"".concat(escapeHtml(linkNode.url), "\"").concat(titleAttr).concat(targetAttr).concat(relAttr, ">").concat(children, "</a>");
        default:
            return children;
    }
};
var escapeHtml = function (text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};
var defaultInitialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];
var getTextContent = function (nodes) {
    return nodes
        .map(function (node) {
        if (node.text !== undefined) {
            return node.text;
        }
        if (node.children) {
            return getTextContent(node.children);
        }
        return '';
    })
        .join('');
};
var countWords = function (text) {
    var trimmed = text.trim();
    if (trimmed === '')
        return 0;
    return trimmed.split(/\s+/).filter(function (word) { return word.length > 0; }).length;
};
var countCharacters = function (text) {
    return text.length;
};
var countCharactersNoSpaces = function (text) {
    return text.replace(/\s/g, '').length;
};

var Dropdown = function (_a) {
    var trigger = _a.trigger, children = _a.children, title = _a.title;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = React.useRef(null);
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    return (jsxRuntime.jsxs("div", { ref: dropdownRef, style: { position: 'relative', display: 'inline-block' }, children: [jsxRuntime.jsxs("button", { title: title, onMouseDown: function (e) {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }, style: {
                    backgroundColor: isOpen ? '#dee2e6' : 'transparent',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '5px 8px',
                    margin: '0',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#222f3e',
                    transition: 'background-color 0.1s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '28px',
                    boxShadow: 'none',
                    whiteSpace: 'nowrap',
                }, onMouseEnter: function (e) {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                    }
                }, onMouseLeave: function (e) {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }
                }, children: [trigger, jsxRuntime.jsx(outline.ChevronDownIcon, { style: { marginLeft: '4px', width: '12px', height: '12px' } })] }), isOpen && (jsxRuntime.jsx("div", { style: {
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: 9999,
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    minWidth: '180px',
                    marginTop: '4px',
                    overflow: 'hidden',
                    padding: '4px 0'
                }, children: children }))] }));
};
var ToolbarButton = function (_a) {
    var active = _a.active, onMouseDown = _a.onMouseDown, children = _a.children, title = _a.title;
    return (jsxRuntime.jsx("button", { title: title, onMouseDown: onMouseDown, style: {
            backgroundColor: active ? '#dee2e6' : 'transparent',
            border: 'none',
            borderRadius: '3px',
            padding: '5px 8px',
            margin: '0',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '400',
            color: '#222f3e',
            transition: 'background-color 0.1s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '28px',
            boxShadow: 'none',
            whiteSpace: 'nowrap',
        }, onMouseEnter: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = '#e9ecef';
            }
        }, onMouseLeave: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = 'transparent';
            }
        }, children: children }));
};
var DropdownItem = function (_a) {
    var active = _a.active, onMouseDown = _a.onMouseDown, children = _a.children, icon = _a.icon;
    return (jsxRuntime.jsxs("button", { onMouseDown: onMouseDown, style: {
            width: '100%',
            padding: '6px 16px',
            border: 'none',
            backgroundColor: active ? '#e7f4ff' : 'transparent',
            color: '#222f3e',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background-color 0.1s ease',
            borderRadius: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }, onMouseEnter: function (e) {
            e.currentTarget.style.backgroundColor = '#e7f4ff';
        }, onMouseLeave: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = 'transparent';
            }
        }, children: [icon && jsxRuntime.jsx("span", { style: { width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: icon }), children] }));
};
var ToolbarSeparator = function () { return (jsxRuntime.jsx("div", { style: {
        width: '1px',
        height: '24px',
        backgroundColor: '#ccc',
        margin: '0 4px',
        alignSelf: 'center',
    } })); };
var Toolbar = function (_a) {
    var _b;
    var items = _a.items, className = _a.className, onViewOutput = _a.onViewOutput; _a.onEditLink; var _c = _a.searchQuery, propSearchQuery = _c === void 0 ? '' : _c, _d = _a.searchMatches, propSearchMatches = _d === void 0 ? [] : _d, _e = _a.currentMatchIndex, propCurrentMatchIndex = _e === void 0 ? 0 : _e, onSearchQueryChange = _a.onSearchQueryChange, onSearchMatchesChange = _a.onSearchMatchesChange, onCurrentMatchIndexChange = _a.onCurrentMatchIndexChange, _f = _a.isFullscreen, isFullscreen = _f === void 0 ? false : _f, onFullscreenToggle = _a.onFullscreenToggle;
    var editor = slateReact.useSlate();
    var _g = React.useState(false), showLinkModal = _g[0], setShowLinkModal = _g[1];
    var _h = React.useState(''), linkText = _h[0], setLinkText = _h[1];
    var _j = React.useState(''), linkUrl = _j[0], setLinkUrl = _j[1];
    var _k = React.useState(''), linkTitle = _k[0], setLinkTitle = _k[1];
    var _l = React.useState('_self'), linkTarget = _l[0], setLinkTarget = _l[1];
    var _m = React.useState(false), isEditingLink = _m[0], setIsEditingLink = _m[1];
    var _o = React.useState(false); _o[0]; _o[1];
    var _p = React.useState({ x: 0, y: 0 }); _p[0]; _p[1];
    var _q = React.useState(false), showImageModal = _q[0], setShowImageModal = _q[1];
    var _r = React.useState(''), imageUrl = _r[0], setImageUrl = _r[1];
    var _s = React.useState(''), imageAlt = _s[0], setImageAlt = _s[1];
    var _t = React.useState(null), imageFile = _t[0], setImageFile = _t[1];
    var _u = React.useState(''), imageUploadError = _u[0], setImageUploadError = _u[1];
    var _v = React.useState(false), isReplacingImage = _v[0], setIsReplacingImage = _v[1];
    var _w = React.useState(null), replacingImagePath = _w[0], setReplacingImagePath = _w[1];
    var _x = React.useState(false), showTableModal = _x[0], setShowTableModal = _x[1];
    var _y = React.useState(3), tableRows = _y[0], setTableRows = _y[1];
    var _z = React.useState(3), tableCols = _z[0], setTableCols = _z[1];
    var _0 = React.useState(false), showFindReplace = _0[0], setShowFindReplace = _0[1];
    var _1 = React.useState(''), replaceText = _1[0], setReplaceText = _1[1];
    var _2 = React.useState(0), totalMatches = _2[0], setTotalMatches = _2[1];
    var searchQuery = propSearchQuery;
    var searchMatches = propSearchMatches;
    var currentMatchIndex = propCurrentMatchIndex;
    var handleMarkToggle = function (event, format) {
        event.preventDefault();
        toggleMark(editor, format);
    };
    var handleBlockToggle = function (event, format) {
        event.preventDefault();
        toggleBlock(editor, format);
    };
    var handleAlignmentToggle = function (event, alignment) {
        event.preventDefault();
        toggleAlignment(editor, alignment);
    };
    var handleIndent = function (event) {
        event.preventDefault();
        indentListItem(editor);
    };
    var handleOutdent = function (event) {
        event.preventDefault();
        outdentListItem(editor);
    };
    var handleUndo = function (event) {
        event.preventDefault();
        slateHistory.HistoryEditor.undo(editor);
    };
    var handleRedo = function (event) {
        event.preventDefault();
        slateHistory.HistoryEditor.redo(editor);
    };
    var handleLinkToggle = function (event) {
        event.preventDefault();
        var selection = editor.selection;
        if (selection) {
            var selectedText = slate.Editor.string(editor, selection);
            setLinkText(selectedText);
        }
        else {
            setLinkText('');
        }
        setLinkUrl('');
        setLinkTitle('');
        setLinkTarget('_self');
        setIsEditingLink(false);
        setShowLinkModal(true);
    };
    var handleInsertLink = function () {
        if (!linkUrl.trim()) {
            alert('URL is required');
            return;
        }
        try {
            new URL(linkUrl);
        }
        catch (_a) {
            alert('Please enter a valid URL (e.g., https://example.com)');
            return;
        }
        if (isEditingLink) {
            slate.Transforms.setNodes(editor, {
                url: linkUrl,
                title: linkTitle || undefined,
                target: linkTarget
            }, {
                match: function (n) { return n.type === 'link'; }
            });
            if (linkText.trim() && editor.selection) {
                slate.Transforms.delete(editor, { at: editor.selection });
                slate.Transforms.insertText(editor, linkText, { at: editor.selection });
            }
        }
        else {
            if (linkText.trim()) {
                if (editor.selection) {
                    slate.Transforms.delete(editor);
                }
                slate.Transforms.insertNodes(editor, {
                    type: 'link',
                    url: linkUrl,
                    title: linkTitle || undefined,
                    target: linkTarget,
                    children: [{ text: linkText }],
                });
                slate.Transforms.move(editor);
            }
            else if (editor.selection && !slate.Range.isCollapsed(editor.selection)) {
                insertLink(editor, linkUrl, linkTitle || undefined, linkTarget);
            }
            else {
                slate.Transforms.insertNodes(editor, {
                    type: 'link',
                    url: linkUrl,
                    title: linkTitle || undefined,
                    target: linkTarget,
                    children: [{ text: linkUrl }],
                });
                slate.Transforms.move(editor);
            }
        }
        setShowLinkModal(false);
        setLinkText('');
        setLinkUrl('');
        setLinkTitle('');
        setLinkTarget('_self');
        setIsEditingLink(false);
    };
    var handleImageToggle = function (event) {
        event.preventDefault();
        setImageUrl('');
        setImageAlt('');
        setImageFile(null);
        setImageUploadError('');
        setIsReplacingImage(false);
        setReplacingImagePath(null);
        setShowImageModal(true);
    };
    var handleInsertImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var editiumProps, uploadedUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setImageUploadError('');
                    if (!imageFile) return [3 /*break*/, 5];
                    editiumProps = window.__editiumProps;
                    if (!(editiumProps === null || editiumProps === void 0 ? void 0 : editiumProps.onImageUpload)) {
                        setImageUploadError('Upload not configured. Please define onImageUpload in your app.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, editiumProps.onImageUpload(imageFile)];
                case 2:
                    uploadedUrl = _a.sent();
                    if (isReplacingImage && replacingImagePath) {
                        slate.Transforms.setNodes(editor, {
                            url: uploadedUrl,
                            alt: imageAlt || imageFile.name
                        }, { at: replacingImagePath });
                    }
                    else {
                        insertImage(editor, uploadedUrl, imageAlt || imageFile.name);
                    }
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setIsReplacingImage(false);
                    setReplacingImagePath(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setImageUploadError('Failed to upload image: ' + error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
                case 5:
                    if (!imageUrl.trim()) {
                        setImageUploadError('Please enter an image URL or select a file');
                        return [2 /*return*/];
                    }
                    if (!isValidImageUrl(imageUrl)) {
                        setImageUploadError('Please enter a valid image URL');
                        return [2 /*return*/];
                    }
                    if (isReplacingImage && replacingImagePath) {
                        slate.Transforms.setNodes(editor, {
                            url: imageUrl,
                            alt: imageAlt || 'Image'
                        }, { at: replacingImagePath });
                    }
                    else {
                        insertImage(editor, imageUrl, imageAlt || 'Image');
                    }
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setIsReplacingImage(false);
                    setReplacingImagePath(null);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageUploadError('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setImageUploadError('Image size should be less than 5MB');
                return;
            }
            setImageFile(file);
            setImageUploadError('');
        }
    };
    var handleTableToggle = function (event) {
        event.preventDefault();
        setShowTableModal(true);
        setTableRows(3);
        setTableCols(3);
    };
    var handleInsertTable = function () {
        insertTable(editor, tableRows, tableCols);
        setShowTableModal(false);
    };
    var handleFindReplaceToggle = function (event) {
        event.preventDefault();
        setShowFindReplace(!showFindReplace);
        if (!showFindReplace) {
            onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
            setReplaceText('');
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
        }
    };
    React.useEffect(function () {
        if (!searchQuery || !showFindReplace) {
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            return;
        }
        var matches = findAllMatches(editor, searchQuery);
        onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange(matches);
        setTotalMatches(matches.length);
        if (matches.length > 0) {
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            navigateToMatch(editor, matches[0]);
        }
        else {
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
        }
    }, [searchQuery, showFindReplace, editor, onSearchMatchesChange, onCurrentMatchIndexChange]);
    var handleNextMatch = function () {
        if (searchMatches.length === 0)
            return;
        var nextIndex = (currentMatchIndex + 1) % searchMatches.length;
        onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(nextIndex);
        navigateToMatch(editor, searchMatches[nextIndex]);
    };
    var handlePrevMatch = function () {
        if (searchMatches.length === 0)
            return;
        var prevIndex = currentMatchIndex === 0 ? searchMatches.length - 1 : currentMatchIndex - 1;
        onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(prevIndex);
        navigateToMatch(editor, searchMatches[prevIndex]);
    };
    var handleReplace = function () {
        if (searchMatches.length === 0 || currentMatchIndex >= searchMatches.length)
            return;
        replaceMatch(editor, searchMatches[currentMatchIndex], replaceText);
        var matches = findAllMatches(editor, searchQuery);
        onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange(matches);
    };
    var handleReplaceAll = function () {
        if (searchMatches.length === 0)
            return;
        replaceAllMatches(editor, searchMatches, replaceText);
        onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
        setTimeout(function () {
            onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
            setReplaceText('');
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
        }, 50);
    };
    React.useEffect(function () {
        var handleExternalEdit = function (linkData) {
            setLinkText(linkData.text);
            setLinkUrl(linkData.url);
            setLinkTitle(linkData.title || '');
            setLinkTarget(linkData.target || '_self');
            setIsEditingLink(true);
            setShowLinkModal(true);
            if (linkData.path) {
                editor.selection = slate.Editor.range(editor, linkData.path);
            }
        };
        window.__editiumLinkEditHandler = handleExternalEdit;
        return function () {
            delete window.__editiumLinkEditHandler;
        };
    }, [editor]);
    React.useEffect(function () {
        var handleImageReplace = function (imageData) {
            setImageUrl(imageData.url);
            setImageAlt(imageData.alt || '');
            setImageFile(null);
            setImageUploadError('');
            setIsReplacingImage(true);
            setReplacingImagePath(imageData.path);
            setShowImageModal(true);
        };
        window.__editiumImageReplaceHandler = handleImageReplace;
        return function () {
            delete window.__editiumImageReplaceHandler;
        };
    }, []);
    var blockFormattingItems = ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'];
    var alignmentItems = ['left', 'center', 'right', 'justify'];
    var formatItems = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
    var listItems = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
    var blockItems = ['blockquote', 'code-block'];
    var colorItems = ['text-color', 'bg-color'];
    var insertItems = ['link', 'horizontal-rule', 'image', 'table'];
    var editItems = ['undo', 'redo'];
    var colorPalette = [
        { name: 'Black', value: '#000000' },
        { name: 'Dark Gray', value: '#495057' },
        { name: 'Gray', value: '#6c757d' },
        { name: 'Light Gray', value: '#adb5bd' },
        { name: 'Red', value: '#dc3545' },
        { name: 'Orange', value: '#fd7e14' },
        { name: 'Yellow', value: '#ffc107' },
        { name: 'Green', value: '#28a745' },
        { name: 'Teal', value: '#20c997' },
        { name: 'Blue', value: '#007bff' },
        { name: 'Indigo', value: '#6610f2' },
        { name: 'Purple', value: '#6f42c1' },
        { name: 'Pink', value: '#e83e8c' },
        { name: 'White', value: '#ffffff' },
    ];
    var renderToolbarItem = function (item, index) {
        if (item === 'separator') {
            var prevItem = index > 0 ? items[index - 1] : null;
            if (prevItem) {
                if (formatItems.includes(prevItem)) {
                    var firstFormatIndex = items.findIndex(function (i) { return formatItems.includes(i); });
                    if (firstFormatIndex !== index - 1)
                        return null;
                }
                if (listItems.includes(prevItem)) {
                    var firstListIndex = items.findIndex(function (i) { return listItems.includes(i); });
                    if (firstListIndex !== index - 1)
                        return null;
                }
                if (alignmentItems.includes(prevItem)) {
                    var firstAlignIndex = items.findIndex(function (i) { return alignmentItems.includes(i); });
                    if (firstAlignIndex !== index - 1)
                        return null;
                }
                if (blockFormattingItems.includes(prevItem)) {
                    var firstBlockIndex = items.findIndex(function (i) { return blockFormattingItems.includes(i); });
                    if (firstBlockIndex !== index - 1)
                        return null;
                }
                if (insertItems.includes(prevItem)) {
                    var firstInsertIndex = items.findIndex(function (i) { return insertItems.includes(i); });
                    if (firstInsertIndex !== index - 1)
                        return null;
                }
                if (editItems.includes(prevItem)) {
                    var firstEditIndex = items.findIndex(function (i) { return editItems.includes(i); });
                    if (firstEditIndex !== index - 1)
                        return null;
                }
            }
            return jsxRuntime.jsx(ToolbarSeparator, {}, "separator-".concat(index));
        }
        if (blockFormattingItems.includes(item)) {
            var firstBlockIndex = items.findIndex(function (i) { return blockFormattingItems.includes(i); });
            var currentIndex = items.findIndex(function (i) { return i === item; });
            if (firstBlockIndex !== currentIndex) {
                return null; // Skip rendering individual block formatting buttons
            }
            var activeBlock = blockFormattingItems.find(function (block) {
                return items.includes(block) && isBlockActive(editor, block);
            });
            var getBlockLabel_1 = function (block) {
                switch (block) {
                    case 'paragraph': return 'Paragraph';
                    case 'heading-one': return 'Heading 1';
                    case 'heading-two': return 'Heading 2';
                    case 'heading-three': return 'Heading 3';
                    case 'heading-four': return 'Heading 4';
                    case 'heading-five': return 'Heading 5';
                    case 'heading-six': return 'Heading 6';
                    case 'heading-seven': return 'Heading 7';
                    case 'heading-eight': return 'Heading 8';
                    default: return 'Format';
                }
            };
            return (jsxRuntime.jsx(Dropdown, { trigger: jsxRuntime.jsx("span", { children: activeBlock ? getBlockLabel_1(activeBlock) : 'Paragraph' }), title: "Block format", children: items.filter(function (i) { return blockFormattingItems.includes(i); }).map(function (block) { return (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, block), onMouseDown: function (e) { return handleBlockToggle(e, block); }, children: getBlockLabel_1(block) }, block)); }) }, "block-formatting-dropdown"));
        }
        if (alignmentItems.includes(item)) {
            var firstAlignIndex = items.findIndex(function (i) { return alignmentItems.includes(i); });
            var currentIndex = items.findIndex(function (i) { return i === item; });
            if (firstAlignIndex !== currentIndex) {
                return null; // Skip rendering individual alignment buttons
            }
            alignmentItems.find(function (align) {
                return items.includes(align) && isAlignmentActive(editor, align);
            });
            var getAlignmentIcon_1 = function (align) {
                switch (align) {
                    case 'left':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'center':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'center' }, children: [jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '6px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'right':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'flex-end' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'justify':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } })] }));
                    default:
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                }
            };
            var getAlignmentLabel_1 = function (align) {
                switch (align) {
                    case 'left': return 'Align Left';
                    case 'center': return 'Align Center';
                    case 'right': return 'Align Right';
                    case 'justify': return 'Justify';
                    default: return 'Align';
                }
            };
            return (jsxRuntime.jsx(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Align" }), title: "Text alignment", children: items.filter(function (i) { return alignmentItems.includes(i); }).map(function (align) { return (jsxRuntime.jsx(DropdownItem, { active: isAlignmentActive(editor, align), onMouseDown: function (e) { return handleAlignmentToggle(e, align); }, icon: getAlignmentIcon_1(align), children: getAlignmentLabel_1(align) }, align)); }) }, "alignment-dropdown"));
        }
        switch (item) {
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strikethrough':
            case 'code':
            case 'superscript':
            case 'subscript': {
                var formatItems_1 = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
                var firstFormatIndex = items.findIndex(function (i) { return formatItems_1.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstFormatIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Format" }), title: "Format", children: [items.includes('bold') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'bold'), onMouseDown: function (e) { return handleMarkToggle(e, 'bold'); }, icon: jsxRuntime.jsx("span", { style: { fontWeight: 'bold', fontSize: '16px' }, children: "B" }), children: "Bold" })), items.includes('italic') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'italic'), onMouseDown: function (e) { return handleMarkToggle(e, 'italic'); }, icon: jsxRuntime.jsx("span", { style: { fontStyle: 'italic', fontSize: '16px' }, children: "I" }), children: "Italic" })), items.includes('underline') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'underline'), onMouseDown: function (e) { return handleMarkToggle(e, 'underline'); }, icon: jsxRuntime.jsx("span", { style: { textDecoration: 'underline', fontSize: '16px' }, children: "U" }), children: "Underline" })), items.includes('strikethrough') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'strikethrough'), onMouseDown: function (e) { return handleMarkToggle(e, 'strikethrough'); }, icon: jsxRuntime.jsx("span", { style: { textDecoration: 'line-through', fontSize: '16px' }, children: "S" }), children: "Strikethrough" })), items.includes('code') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'code'), onMouseDown: function (e) { return handleMarkToggle(e, 'code'); }, icon: jsxRuntime.jsx(outline.CodeBracketIcon, { style: { width: '16px', height: '16px' } }), children: "Code" })), items.includes('superscript') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'superscript'), onMouseDown: function (e) { return handleMarkToggle(e, 'superscript'); }, icon: jsxRuntime.jsxs("span", { style: { fontSize: '12px' }, children: ["X", jsxRuntime.jsx("sup", { children: "2" })] }), children: "Superscript" })), items.includes('subscript') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'subscript'), onMouseDown: function (e) { return handleMarkToggle(e, 'subscript'); }, icon: jsxRuntime.jsxs("span", { style: { fontSize: '12px' }, children: ["X", jsxRuntime.jsx("sub", { children: "2" })] }), children: "Subscript" }))] }, "format-menu"));
            }
            case 'bulleted-list':
            case 'numbered-list':
            case 'indent':
            case 'outdent': {
                var listItems_1 = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
                var firstListIndex = items.findIndex(function (i) { return listItems_1.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstListIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Lists" }), title: "Lists", children: [items.includes('bulleted-list') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'bulleted-list'), onMouseDown: function (e) { return handleBlockToggle(e, 'bulleted-list'); }, icon: jsxRuntime.jsx(outline.ListBulletIcon, { style: { width: '16px', height: '16px' } }), children: "Bullet list" })), items.includes('numbered-list') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'numbered-list'), onMouseDown: function (e) { return handleBlockToggle(e, 'numbered-list'); }, icon: jsxRuntime.jsx("span", { style: { fontSize: '14px', fontWeight: '600' }, children: "1." }), children: "Numbered list" })), items.includes('indent') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleIndent, icon: jsxRuntime.jsx(outline.ArrowRightIcon, { style: { width: '16px', height: '16px' } }), children: "Increase indent" })), items.includes('outdent') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleOutdent, icon: jsxRuntime.jsx(outline.ArrowLeftIcon, { style: { width: '16px', height: '16px' } }), children: "Decrease indent" }))] }, "lists-menu"));
            }
            case 'blockquote':
            case 'code-block': {
                var firstBlockItemIndex = items.findIndex(function (i) { return blockItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstBlockItemIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Blocks" }), title: "Blocks", children: [items.includes('blockquote') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'blockquote'), onMouseDown: function (e) { return handleBlockToggle(e, 'blockquote'); }, icon: jsxRuntime.jsx("span", { style: { fontSize: '16px', fontWeight: 'bold' }, children: "\u275D" }), children: "Blockquote" })), items.includes('code-block') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'code-block'), onMouseDown: function (e) { return handleBlockToggle(e, 'code-block'); }, icon: jsxRuntime.jsx(outline.CodeBracketIcon, { style: { width: '16px', height: '16px' } }), children: "Code Block" }))] }, "blocks-menu"));
            }
            case 'text-color':
            case 'bg-color': {
                var firstColorIndex = items.findIndex(function (i) { return colorItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstColorIndex !== currentIndex)
                    return null;
                var activeTextColor_1 = getActiveColor(editor);
                var activeBgColor_1 = getActiveBackgroundColor(editor);
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Color" }), title: "Color", children: [items.includes('text-color') && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px' }, children: [jsxRuntime.jsx("div", { style: {
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                        color: '#495057'
                                    }, children: "Text Color" }), jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '4px',
                                        marginBottom: '8px'
                                    }, children: colorPalette.map(function (color) { return (jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                            e.preventDefault();
                                            applyColor(editor, color.value);
                                        }, title: color.name, style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color.value,
                                            border: activeTextColor_1 === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            padding: 0,
                                            boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                                        } }, "text-".concat(color.value))); }) }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginBottom: '8px',
                                        paddingTop: '4px'
                                    }, children: [jsxRuntime.jsx("input", { type: "color", value: activeTextColor_1 || '#000000', onChange: function (e) {
                                                applyColor(editor, e.target.value);
                                            }, title: "Pick custom color", style: {
                                                width: '24px',
                                                height: '24px',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                padding: '0',
                                                backgroundColor: 'transparent'
                                            } }), jsxRuntime.jsx("span", { style: {
                                                fontSize: '12px',
                                                color: '#6c757d'
                                            }, children: "Custom" })] }), jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                        e.preventDefault();
                                        applyColor(editor, null);
                                    }, style: {
                                        width: '100%',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '3px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }, children: "Remove Color" })] })), items.includes('bg-color') && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px', borderTop: '1px solid #dee2e6' }, children: [jsxRuntime.jsx("div", { style: {
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                        color: '#495057'
                                    }, children: "Background Highlight" }), jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '4px',
                                        marginBottom: '8px'
                                    }, children: colorPalette.map(function (color) { return (jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                            e.preventDefault();
                                            applyBackgroundColor(editor, color.value);
                                        }, title: color.name, style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color.value,
                                            border: activeBgColor_1 === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            padding: 0,
                                            boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                                        } }, "bg-".concat(color.value))); }) }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginBottom: '8px',
                                        paddingTop: '4px'
                                    }, children: [jsxRuntime.jsx("input", { type: "color", value: activeBgColor_1 || '#ffffff', onChange: function (e) {
                                                applyBackgroundColor(editor, e.target.value);
                                            }, title: "Pick custom color", style: {
                                                width: '24px',
                                                height: '24px',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                padding: '0',
                                                backgroundColor: 'transparent'
                                            } }), jsxRuntime.jsx("span", { style: {
                                                fontSize: '12px',
                                                color: '#6c757d'
                                            }, children: "Custom" })] }), jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                        e.preventDefault();
                                        applyBackgroundColor(editor, null);
                                    }, style: {
                                        width: '100%',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '3px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }, children: "Remove Highlight" })] }))] }, "color-menu"));
            }
            case 'link':
            case 'horizontal-rule':
            case 'image':
            case 'table': {
                var firstInsertIndex = items.findIndex(function (i) { return insertItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstInsertIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Insert" }), title: "Insert", children: [items.includes('link') && (jsxRuntime.jsx(DropdownItem, { active: isLinkActive(editor), onMouseDown: handleLinkToggle, icon: jsxRuntime.jsx(outline.LinkIcon, { style: { width: '16px', height: '16px' } }), children: "Link" })), items.includes('image') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleImageToggle, icon: jsxRuntime.jsx(outline.PhotoIcon, { style: { width: '16px', height: '16px' } }), children: "Image" })), items.includes('table') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleTableToggle, icon: jsxRuntime.jsx(outline.TableCellsIcon, { style: { width: '16px', height: '16px' } }), children: "Table" })), items.includes('horizontal-rule') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (e) {
                                e.preventDefault();
                                insertHorizontalRule(editor);
                            }, icon: jsxRuntime.jsx("span", { style: { fontSize: '16px', fontWeight: 'bold' }, children: "\u2015" }), children: "Horizontal Rule" }))] }, "insert-menu"));
            }
            case 'undo':
            case 'redo': {
                var firstEditIndex = items.findIndex(function (i) { return editItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstEditIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Edit" }), title: "Edit", children: [items.includes('undo') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleUndo, icon: jsxRuntime.jsx(outline.ArrowUturnLeftIcon, { style: { width: '16px', height: '16px' } }), children: "Undo" })), items.includes('redo') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleRedo, icon: jsxRuntime.jsx(outline.ArrowUturnRightIcon, { style: { width: '16px', height: '16px' } }), children: "Redo" }))] }, "edit-menu"));
            }
            case 'view-output':
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "View" }), title: "View Output", children: [jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('preview');
                                }
                            }, icon: jsxRuntime.jsx(outline.ArrowTopRightOnSquareIcon, { style: { width: '16px', height: '16px' } }), children: "Preview" }), jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('html');
                                }
                            }, icon: jsxRuntime.jsx("span", { style: { fontFamily: 'monospace', fontSize: '14px' }, children: "</>" }), children: "View HTML" }), jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('json');
                                }
                            }, icon: jsxRuntime.jsx("span", { style: { fontFamily: 'monospace', fontSize: '14px' } }), children: "View JSON" })] }, item));
            case 'find-replace':
                return (jsxRuntime.jsx(ToolbarButton, { active: showFindReplace, onMouseDown: handleFindReplaceToggle, title: "Find & Replace", children: jsxRuntime.jsx(outline.MagnifyingGlassIcon, { style: { width: '18px', height: '18px' } }) }, item));
            case 'fullscreen':
                return (jsxRuntime.jsx(ToolbarButton, { active: isFullscreen, onMouseDown: function (e) {
                        e.preventDefault();
                        onFullscreenToggle === null || onFullscreenToggle === void 0 ? void 0 : onFullscreenToggle();
                    }, title: isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F11)", children: isFullscreen ? (jsxRuntime.jsx(outline.ArrowsPointingInIcon, { style: { width: '18px', height: '18px' } })) : (jsxRuntime.jsx(outline.ArrowsPointingOutIcon, { style: { width: '18px', height: '18px' } })) }, item));
            default:
                return null;
        }
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [showLinkModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                }, onClick: function () {
                    setShowLinkModal(false);
                    setLinkText('');
                    setLinkUrl('');
                    setLinkTitle('');
                    setLinkTarget('_self');
                    setIsEditingLink(false);
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }, children: isEditingLink ? 'Edit Link' : 'Insert Link' }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Text to display" }), jsxRuntime.jsx("input", { type: "text", value: linkText, onChange: function (e) { return setLinkText(e.target.value); }, placeholder: "Enter link text", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "If empty, will use URL or selected text as display text" })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsxs("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: ["URL ", jsxRuntime.jsx("span", { style: { color: '#ef4444' }, children: "*" })] }), jsxRuntime.jsx("input", { type: "url", value: linkUrl, onChange: function (e) { return setLinkUrl(e.target.value); }, placeholder: "https://example.com", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; }, onKeyDown: function (e) {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleInsertLink();
                                        }
                                    } })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Title" }), jsxRuntime.jsx("input", { type: "text", value: linkTitle, onChange: function (e) { return setLinkTitle(e.target.value); }, placeholder: "Link title (tooltip)", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "Appears as a tooltip when hovering over the link" })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '24px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Open link in" }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px' }, children: [jsxRuntime.jsxs("label", { style: { display: 'flex', alignItems: 'center', cursor: 'pointer' }, children: [jsxRuntime.jsx("input", { type: "radio", name: "linkTarget", value: "_self", checked: linkTarget === '_self', onChange: function (e) { return setLinkTarget(e.target.value); }, style: { marginRight: '6px', cursor: 'pointer' } }), jsxRuntime.jsx("span", { style: { fontSize: '14px', color: '#374151' }, children: "Current tab" })] }), jsxRuntime.jsxs("label", { style: { display: 'flex', alignItems: 'center', cursor: 'pointer' }, children: [jsxRuntime.jsx("input", { type: "radio", name: "linkTarget", value: "_blank", checked: linkTarget === '_blank', onChange: function (e) { return setLinkTarget(e.target.value); }, style: { marginRight: '6px', cursor: 'pointer' } }), jsxRuntime.jsx("span", { style: { fontSize: '14px', color: '#374151' }, children: "New tab" })] })] })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () {
                                        setShowLinkModal(false);
                                        setLinkText('');
                                        setLinkUrl('');
                                        setLinkTitle('');
                                        setLinkTarget('_self');
                                        setIsEditingLink(false);
                                    }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertLink, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        backgroundColor: '#3b82f6',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: isEditingLink ? 'Update Link' : 'Insert Link' })] })] }) })), showImageModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                }, onClick: function () {
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setImageUploadError('');
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }, children: isReplacingImage ? 'Replace Image' : 'Insert Image' }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Image URL" }), jsxRuntime.jsx("input", { type: "url", value: imageUrl, onChange: function (e) { return setImageUrl(e.target.value); }, placeholder: "https://example.com/image.jpg", disabled: !!imageFile, style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        backgroundColor: imageFile ? '#f9fafb' : '#ffffff',
                                    }, onFocus: function (e) { return !imageFile && (e.target.style.borderColor = '#3b82f6'); }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } })] }), jsxRuntime.jsxs("div", { style: {
                                marginBottom: '16px',
                                padding: '12px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }, children: [jsxRuntime.jsx("p", { style: { margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }, children: "Or upload from your computer" }), jsxRuntime.jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, style: { display: 'none' }, id: "image-upload" }), jsxRuntime.jsx("label", { htmlFor: "image-upload", style: {
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Choose File" }), imageFile && (jsxRuntime.jsxs("p", { style: { margin: '8px 0 0 0', color: '#374151', fontSize: '13px' }, children: ["Selected: ", imageFile.name] })), !((_b = window.__editiumProps) === null || _b === void 0 ? void 0 : _b.onImageUpload) && (jsxRuntime.jsx("p", { style: {
                                        margin: '8px 0 0 0',
                                        color: '#dc2626',
                                        fontSize: '12px',
                                        fontStyle: 'italic'
                                    }, children: "\u26A0 Upload not configured. Define onImageUpload in your app." }))] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Alt Text (optional)" }), jsxRuntime.jsx("input", { type: "text", value: imageAlt, onChange: function (e) { return setImageAlt(e.target.value); }, placeholder: "Describe the image", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "For accessibility" })] }), imageUploadError && (jsxRuntime.jsx("div", { style: {
                                marginBottom: '16px',
                                padding: '12px',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                                color: '#dc2626',
                                fontSize: '14px'
                            }, children: imageUploadError })), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () {
                                        setShowImageModal(false);
                                        setImageUrl('');
                                        setImageAlt('');
                                        setImageFile(null);
                                        setImageUploadError('');
                                    }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertImage, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        backgroundColor: '#3b82f6',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: isReplacingImage ? 'Replace' : 'Insert Image' })] })] }) })), showTableModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }, children: "Insert Table" }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(10, 30px)',
                                        gridTemplateRows: 'repeat(10, 30px)',
                                        gap: '2px',
                                        padding: '8px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '4px',
                                        width: 'fit-content',
                                    }, children: Array.from({ length: 100 }, function (_, index) {
                                        var row = Math.floor(index / 10) + 1;
                                        var col = (index % 10) + 1;
                                        var isHighlighted = row <= tableRows && col <= tableCols;
                                        return (jsxRuntime.jsx("div", { onMouseEnter: function () {
                                                setTableRows(row);
                                                setTableCols(col);
                                            }, onClick: handleInsertTable, style: {
                                                width: '30px',
                                                height: '30px',
                                                border: '1px solid #d1d5db',
                                                backgroundColor: isHighlighted ? '#3b82f6' : 'white',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.1s ease',
                                                borderRadius: '2px',
                                            } }, index));
                                    }) }), jsxRuntime.jsxs("div", { style: {
                                        marginTop: '12px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151',
                                    }, children: [tableRows, " \u00D7 ", tableCols, " Table"] })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () { return setShowTableModal(false); }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'white'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertTable, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: "Insert Table" })] })] }) })), jsxRuntime.jsxs("div", { className: className, style: {
                    border: '1px solid #ccc',
                    borderBottom: showFindReplace ? 'none' : '1px solid #ccc',
                    padding: '4px 8px',
                    backgroundColor: '#fff',
                    borderRadius: showFindReplace ? '4px 4px 0 0' : '4px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    minHeight: '42px',
                    maxWidth: '100%',
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: 100
                }, children: [jsxRuntime.jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '2px', alignItems: 'center', flex: 1 }, children: items.filter(function (item) { return item !== 'fullscreen' && item !== 'find-replace'; }).map(function (item, index) { return renderToolbarItem(item, index); }) }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '2px', marginLeft: '8px' }, children: [items.includes('find-replace') && renderToolbarItem('find-replace', items.length - 1), items.includes('fullscreen') && renderToolbarItem('fullscreen', items.length)] })] }), showFindReplace && (jsxRuntime.jsxs("div", { style: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #ccc',
                    borderTop: 'none',
                    borderRadius: '0 0 4px 4px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                }, children: [jsxRuntime.jsxs("div", { style: { flex: '1', minWidth: '200px' }, children: [jsxRuntime.jsxs("div", { style: { position: 'relative' }, children: [jsxRuntime.jsx("input", { type: "text", value: searchQuery, onChange: function (e) { return onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange(e.target.value); }, placeholder: "Find...", autoFocus: true, style: {
                                            width: '100%',
                                            padding: '8px 10px 8px 32px',
                                            border: searchQuery && totalMatches === 0 ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            transition: 'all 0.2s',
                                            backgroundColor: 'white',
                                            boxSizing: 'border-box',
                                        }, onFocus: function (e) {
                                            if (!searchQuery || totalMatches > 0) {
                                                e.currentTarget.style.borderColor = '#3b82f6';
                                            }
                                        }, onBlur: function (e) {
                                            if (searchQuery && totalMatches === 0) {
                                                e.currentTarget.style.borderColor = '#ef4444';
                                            }
                                            else {
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }
                                        } }), jsxRuntime.jsx(outline.MagnifyingGlassIcon, { style: {
                                            width: '16px',
                                            height: '16px',
                                            position: 'absolute',
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af',
                                            pointerEvents: 'none',
                                        } })] }), searchQuery && (jsxRuntime.jsx("div", { style: {
                                    marginTop: '4px',
                                    fontSize: '11px',
                                    color: totalMatches === 0 ? '#ef4444' : '#6b7280',
                                }, children: totalMatches === 0 ? 'No matches' : "".concat(currentMatchIndex + 1, " of ").concat(totalMatches) }))] }), searchQuery && (jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '4px' }, children: [jsxRuntime.jsx("button", { onClick: handlePrevMatch, disabled: totalMatches === 0, title: "Previous match (Shift+Enter)", style: {
                                    padding: '8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                                    cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: jsxRuntime.jsx(outline.ChevronLeftIcon, { style: { width: '14px', height: '14px' } }) }), jsxRuntime.jsx("button", { onClick: handleNextMatch, disabled: totalMatches === 0, title: "Next match (Enter)", style: {
                                    padding: '8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                                    cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: jsxRuntime.jsx(outline.ChevronRightIcon, { style: { width: '14px', height: '14px' } }) })] })), jsxRuntime.jsx("div", { style: { flex: '1', minWidth: '200px' }, children: jsxRuntime.jsx("input", { type: "text", value: replaceText, onChange: function (e) { return setReplaceText(e.target.value); }, placeholder: "Replace...", style: {
                                width: '100%',
                                padding: '8px 10px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '13px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                backgroundColor: 'white',
                                boxSizing: 'border-box',
                            }, onFocus: function (e) {
                                e.currentTarget.style.borderColor = '#3b82f6';
                            }, onBlur: function (e) {
                                e.currentTarget.style.borderColor = '#d1d5db';
                            } }) }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '6px' }, children: [jsxRuntime.jsx("button", { onClick: handleReplace, disabled: searchMatches.length === 0, title: "Replace current match", style: {
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: searchMatches.length === 0 ? '#f3f4f6' : 'white',
                                    color: searchMatches.length === 0 ? '#9ca3af' : '#374151',
                                    cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: "Replace" }), jsxRuntime.jsx("button", { onClick: handleReplaceAll, disabled: searchMatches.length === 0, title: "Replace all matches", style: {
                                    padding: '8px 12px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    backgroundColor: searchMatches.length === 0 ? '#cbd5e1' : '#3b82f6',
                                    color: 'white',
                                    cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#3b82f6';
                                    }
                                }, children: "Replace All" })] }), jsxRuntime.jsx("button", { onClick: function () { return setShowFindReplace(false); }, title: "Close (Esc)", style: {
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280',
                            transition: 'all 0.2s',
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                            e.currentTarget.style.borderColor = '#ef4444';
                            e.currentTarget.style.color = '#dc2626';
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.color = '#6b7280';
                        }, children: jsxRuntime.jsx(outline.XMarkIcon, { style: { width: '16px', height: '16px' } }) })] }))] }));
};

var ResizableImage = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = slateReact.useSlateStatic();
    var selected = slateReact.useSelected();
    var focused = slateReact.useFocused();
    var _b = React.useState(false), isResizing = _b[0], setIsResizing = _b[1];
    var _c = React.useState({
        width: element.width || 0,
        height: element.height || 0,
    }), dimensions = _c[0], setDimensions = _c[1];
    var _d = React.useState(false), showActions = _d[0], setShowActions = _d[1];
    var imageRef = React.useRef(null);
    var startPos = React.useRef({ x: 0, y: 0, width: 0, height: 0 });
    var handleImageLoad = React.useCallback(function (e) {
        var img = e.currentTarget;
        if (!element.width && !element.height) {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        }
    }, [element.width, element.height]);
    var handleMouseDown = React.useCallback(function (e, handle) {
        var _a, _b;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        var currentWidth = dimensions.width || ((_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        var currentHeight = dimensions.height || ((_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            width: currentWidth,
            height: currentHeight,
        };
        var handleMouseMove = function (moveEvent) {
            var deltaX = moveEvent.clientX - startPos.current.x;
            var deltaY = moveEvent.clientY - startPos.current.y;
            var newWidth = startPos.current.width;
            var newHeight = startPos.current.height;
            switch (handle) {
                case 'se':
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
                case 'sw':
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
                case 'ne':
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 'nw':
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 'e':
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = startPos.current.height;
                    break;
                case 'w':
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = startPos.current.height;
                    break;
                case 'n':
                    newWidth = startPos.current.width;
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 's':
                    newWidth = startPos.current.width;
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
            }
            setDimensions({ width: newWidth, height: newHeight });
        };
        var handleMouseUp = function () {
            setIsResizing(false);
            var path = slateReact.ReactEditor.findPath(editor, element);
            slate.Transforms.setNodes(editor, {
                width: dimensions.width,
                height: dimensions.height
            }, { at: path });
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [dimensions, editor, element]);
    var handleRemoveImage = React.useCallback(function () {
        var path = slateReact.ReactEditor.findPath(editor, element);
        slate.Transforms.removeNodes(editor, { at: path });
    }, [editor, element]);
    var handleReplaceImage = React.useCallback(function () {
        if (window.__editiumImageReplaceHandler) {
            var path = slateReact.ReactEditor.findPath(editor, element);
            window.__editiumImageReplaceHandler({
                url: element.url,
                alt: element.alt,
                width: element.width,
                height: element.height,
                align: element.align,
                path: path,
            });
        }
    }, [editor, element]);
    var handleAlignmentChange = React.useCallback(function (alignment) {
        var path = slateReact.ReactEditor.findPath(editor, element);
        slate.Transforms.setNodes(editor, { align: alignment }, { at: path });
    }, [editor, element]);
    var containerStyle = {
        display: 'flex',
        justifyContent: element.align === 'center' ? 'center' :
            element.align === 'right' ? 'flex-end' : 'flex-start',
        margin: '16px 0',
        position: 'relative',
    };
    var wrapperStyle = {
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        cursor: isResizing ? 'nwse-resize' : 'default',
    };
    var imageStyle = {
        maxWidth: '100%',
        width: dimensions.width ? "".concat(dimensions.width, "px") : 'auto',
        height: dimensions.height ? "".concat(dimensions.height, "px") : 'auto',
        borderRadius: '4px',
        boxShadow: (selected && focused) || showActions
            ? '0 0 0 3px #3b82f6'
            : '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'block',
        transition: showActions || (selected && focused) ? 'none' : 'box-shadow 0.2s ease',
    };
    var handleStyle = {
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: '#3b82f6',
        border: '2px solid #ffffff',
        borderRadius: '50%',
        opacity: showActions ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: showActions ? 'auto' : 'none',
        zIndex: 10,
    };
    return (jsxRuntime.jsxs("div", __assign({}, attributes, { contentEditable: false, style: { userSelect: 'none' }, children: [jsxRuntime.jsx("div", { style: containerStyle, children: jsxRuntime.jsxs("div", { style: wrapperStyle, onMouseEnter: function () { return setShowActions(true); }, onMouseLeave: function () { return !isResizing && setShowActions(false); }, children: [jsxRuntime.jsx("img", { ref: imageRef, src: element.url, alt: element.alt || 'Image', style: imageStyle, onLoad: handleImageLoad, draggable: false }), ((selected && focused) || showActions) && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', left: '-6px', cursor: 'nw-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'nw'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', right: '-6px', cursor: 'ne-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'ne'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', left: '-6px', cursor: 'sw-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'sw'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', right: '-6px', cursor: 'se-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'se'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'n'); }, title: "Resize Height" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 's'); }, title: "Resize Height" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { left: '-6px', top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'w'); }, title: "Resize Width" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { right: '-6px', top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'e'); }, title: "Resize Width" })] })), ((selected && focused) || showActions) && (jsxRuntime.jsxs("div", { style: {
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                zIndex: 11,
                            }, children: [jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '4px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    }, children: [jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('left'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'left' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'left') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'left') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align left", children: "\u2B05" }), jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('center'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'center' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'center') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'center') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align center", children: "\u2194" }), jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('right'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'right' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'right') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'right') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align right", children: "\u27A1" })] }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '4px',
                                    }, children: [jsxRuntime.jsx("button", { onClick: handleReplaceImage, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '6px 12px',
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '4px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                                e.currentTarget.style.borderColor = '#9ca3af';
                                            }, onMouseLeave: function (e) {
                                                e.currentTarget.style.backgroundColor = '#ffffff';
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }, title: "Replace image", children: "Replace" }), jsxRuntime.jsx("button", { onClick: handleRemoveImage, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '6px 12px',
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '4px',
                                                color: '#dc2626',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                e.currentTarget.style.backgroundColor = '#fef2f2';
                                                e.currentTarget.style.borderColor = '#fca5a5';
                                            }, onMouseLeave: function (e) {
                                                e.currentTarget.style.backgroundColor = '#ffffff';
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }, title: "Remove image", children: "Remove" })] })] }))] }) }), children] })));
};

var TableComponent = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = slateReact.useSlateStatic();
    var selected = slateReact.useSelected();
    var focused = slateReact.useFocused();
    var _b = React.useState(false), showControls = _b[0], setShowControls = _b[1];
    var _c = React.useState(element.width || null), tableWidth = _c[0], setTableWidth = _c[1];
    var _d = React.useState(false), isResizing = _d[0], setIsResizing = _d[1];
    var tableRef = React.useRef(null);
    var handleAddRow = function () {
        addTableRow(editor);
    };
    var handleRemoveRow = function () {
        removeTableRow(editor);
    };
    var handleAddColumn = function () {
        addTableColumn(editor);
    };
    var handleRemoveColumn = function () {
        removeTableColumn(editor);
    };
    var handleDeleteTable = function () {
        slate.Transforms.removeNodes(editor, {
            match: function (n) {
                return !slate.Editor.isEditor(n) &&
                    n.type === 'table';
            },
        });
    };
    var handleAlign = function (alignment) {
        setTableAlignment(editor, alignment);
    };
    var updateTableWidth = function (width) {
        setTableWidth(width);
        try {
            var path = slateReact.ReactEditor.findPath(editor, element);
            slate.Transforms.setNodes(editor, { width: width }, { at: path });
        }
        catch (error) {
            console.warn('Could not update table width:', error);
        }
    };
    return (jsxRuntime.jsx("div", { style: {
            position: 'relative',
            margin: '16px 0',
            display: 'flex',
            justifyContent: element.align === 'center' ? 'center' :
                element.align === 'right' ? 'flex-end' : 'flex-start',
        }, children: jsxRuntime.jsxs("div", __assign({}, attributes, { style: { position: 'relative', width: tableWidth ? "".concat(tableWidth, "px") : '100%', maxWidth: '100%' }, onMouseEnter: function () { return setShowControls(true); }, onMouseLeave: function () { return setShowControls(false); }, children: [jsxRuntime.jsx("table", { ref: tableRef, style: {
                        borderCollapse: 'collapse',
                        width: '100%',
                        border: (selected && focused) || showControls ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                        transition: 'border 0.2s ease',
                    }, children: jsxRuntime.jsx("tbody", { children: children }) }), ((selected && focused) || showControls) && (jsxRuntime.jsxs("div", { contentEditable: false, style: {
                        position: 'absolute',
                        top: '-40px',
                        right: '0',
                        display: 'flex',
                        gap: '4px',
                        backgroundColor: '#fff',
                        padding: '4px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        zIndex: 10,
                    }, children: [jsxRuntime.jsxs("button", { onClick: handleAddRow, title: "Add Row", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(outline.PlusIcon, { style: { width: '16px', height: '16px' } }), "Row"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveRow, title: "Remove Row", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(outline.MinusIcon, { style: { width: '16px', height: '16px' } }), "Row"] }), jsxRuntime.jsxs("button", { onClick: handleAddColumn, title: "Add Column", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(outline.PlusIcon, { style: { width: '16px', height: '16px' } }), "Col"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveColumn, title: "Remove Column", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(outline.MinusIcon, { style: { width: '16px', height: '16px' } }), "Col"] }), jsxRuntime.jsx("div", { style: { width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' } }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('left'); }, title: "Align Left", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'left' || !element.align ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'left' && element.align)
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'left' || !element.align ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(outline.Bars3BottomLeftIcon, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('center'); }, title: "Align Center", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'center' ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'center')
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'center' ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(outline.Bars3Icon, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('right'); }, title: "Align Right", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'right' ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'right')
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'right' ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(outline.Bars3BottomRightIcon, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("div", { style: { width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' } }), jsxRuntime.jsxs("button", { onClick: handleDeleteTable, title: "Delete Table", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#dc2626',
                            }, onMouseOver: function (e) {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = '#fff';
                            }, children: [jsxRuntime.jsx(outline.TrashIcon, { style: { width: '16px', height: '16px' } }), "Delete"] })] })), ((selected && focused) || showControls) && (jsxRuntime.jsx("div", { contentEditable: false, onMouseDown: function (e) {
                        var _a;
                        e.preventDefault();
                        e.stopPropagation();
                        setIsResizing(true);
                        var startX = e.clientX;
                        var startWidth = ((_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
                        var finalWidth = startWidth;
                        var handleMouseMove = function (moveEvent) {
                            var diff = moveEvent.clientX - startX;
                            var newWidth = Math.max(200, startWidth + diff);
                            finalWidth = newWidth;
                            setTableWidth(newWidth);
                        };
                        var handleMouseUp = function () {
                            setIsResizing(false);
                            updateTableWidth(finalWidth);
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }, style: {
                        position: 'absolute',
                        right: '-4px',
                        top: '0',
                        bottom: '0',
                        width: '8px',
                        cursor: 'col-resize',
                        backgroundColor: isResizing ? '#3b82f6' : 'transparent',
                        transition: 'background-color 0.2s',
                        zIndex: 5,
                    }, onMouseEnter: function (e) {
                        if (!isResizing)
                            e.currentTarget.style.backgroundColor = '#3b82f680';
                    }, onMouseLeave: function (e) {
                        if (!isResizing)
                            e.currentTarget.style.backgroundColor = 'transparent';
                    } }))] })) }));
};
var TableRowComponent = function (_a) {
    var attributes = _a.attributes, children = _a.children;
    return jsxRuntime.jsx("tr", __assign({}, attributes, { children: children }));
};
var TableCellComponent = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = slateReact.useSlateStatic();
    var selected = slateReact.useSelected();
    var focused = slateReact.useFocused();
    var _b = React.useState(false), showAlignMenu = _b[0], setShowAlignMenu = _b[1];
    var menuRef = React.useRef(null);
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowAlignMenu(false);
            }
        };
        if (showAlignMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return function () { return document.removeEventListener('mousedown', handleClickOutside); };
        }
    }, [showAlignMenu]);
    var handleCellAlign = function (alignment) {
        var path = slateReact.ReactEditor.findPath(editor, element);
        slate.Transforms.setNodes(editor, { align: alignment }, { at: path });
        setShowAlignMenu(false);
    };
    return (jsxRuntime.jsxs("td", __assign({}, attributes, { style: {
            border: '1px solid #e5e7eb',
            padding: '8px 12px',
            minWidth: '100px',
            position: 'relative',
            textAlign: element.align || 'left',
        }, children: [selected && focused && (jsxRuntime.jsxs("div", { ref: menuRef, contentEditable: false, style: {
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    zIndex: 10,
                }, children: [jsxRuntime.jsx("button", { onClick: function () { return setShowAlignMenu(!showAlignMenu); }, style: {
                            padding: '2px 6px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '3px',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, title: "Align cell content", children: jsxRuntime.jsx(outline.Bars3BottomLeftIcon, { style: { width: '12px', height: '12px' } }) }), showAlignMenu && (jsxRuntime.jsxs("div", { style: {
                            position: 'absolute',
                            top: '100%',
                            right: '0',
                            marginTop: '4px',
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            padding: '4px',
                            display: 'flex',
                            gap: '2px',
                            minWidth: '120px',
                        }, children: [jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('left'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'left' || !element.align ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'left' && element.align)
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'left' || !element.align ? '#e0e7ff' : 'transparent';
                                }, title: "Align Left", children: jsxRuntime.jsx(outline.Bars3BottomLeftIcon, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('center'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'center' ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'center')
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'center' ? '#e0e7ff' : 'transparent';
                                }, title: "Align Center", children: jsxRuntime.jsx(outline.Bars3Icon, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('right'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'right' ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'right')
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'right' ? '#e0e7ff' : 'transparent';
                                }, title: "Align Right", children: jsxRuntime.jsx(outline.Bars3BottomRightIcon, { style: { width: '16px', height: '16px' } }) })] }))] })), children] })));
};

// All available toolbar items in a logical grouped order
var ALL_TOOLBAR_ITEMS = [
    'paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four',
    'heading-five', 'heading-six', 'heading-seven', 'heading-eight',
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

var renderLeaf = function (_a) {
    var attributes = _a.attributes, children = _a.children, leaf = _a.leaf;
    var textLeaf = leaf;
    if (textLeaf.bold) {
        children = jsxRuntime.jsx("strong", { children: children });
    }
    if (textLeaf.italic) {
        children = jsxRuntime.jsx("em", { children: children });
    }
    if (textLeaf.underline) {
        children = jsxRuntime.jsx("u", { children: children });
    }
    if (textLeaf.strikethrough) {
        children = jsxRuntime.jsx("s", { children: children });
    }
    if (textLeaf.superscript) {
        children = jsxRuntime.jsx("sup", { children: children });
    }
    if (textLeaf.subscript) {
        children = jsxRuntime.jsx("sub", { children: children });
    }
    if (textLeaf.code) {
        children = jsxRuntime.jsx("code", { style: {
                backgroundColor: '#f4f4f4',
                padding: '2px 4px',
                borderRadius: '3px',
                fontFamily: 'monospace'
            }, children: children });
    }
    var style = {};
    if (textLeaf.color) {
        style.color = textLeaf.color;
    }
    if (textLeaf.backgroundColor) {
        style.backgroundColor = textLeaf.backgroundColor;
    }
    if (textLeaf.searchCurrent) {
        style.backgroundColor = '#ff9800';
        style.color = '#fff';
    }
    else if (textLeaf.search) {
        style.backgroundColor = '#ffeb3b';
    }
    return jsxRuntime.jsx("span", __assign({}, attributes, { style: Object.keys(style).length > 0 ? style : undefined, children: children }));
};
var parseInitialValue = function (initialValue) {
    if (!initialValue) {
        return defaultInitialValue;
    }
    if (typeof initialValue === 'string') {
        if (initialValue.trim() === '') {
            return defaultInitialValue;
        }
        return [
            {
                type: 'paragraph',
                children: [{ text: initialValue }],
            },
        ];
    }
    return initialValue.length > 0 ? initialValue : defaultInitialValue;
};
var withTables = function (editor) {
    var normalizeNode = editor.normalizeNode;
    editor.normalizeNode = function (entry) {
        var node = entry[0], path = entry[1];
        if (slate.Element.isElement(node) && node.type === 'table') {
            for (var _i = 0, _a = Array.from(slate.Editor.nodes(editor, { at: path })); _i < _a.length; _i++) {
                var _b = _a[_i], child = _b[0], childPath = _b[1];
                if (childPath.length === path.length + 1 && slate.Element.isElement(child) && child.type !== 'table-row') {
                    slate.Transforms.removeNodes(editor, { at: childPath });
                    return;
                }
            }
        }
        if (slate.Element.isElement(node) && node.type === 'table-row') {
            for (var _c = 0, _d = Array.from(slate.Editor.nodes(editor, { at: path })); _c < _d.length; _c++) {
                var _e = _d[_c], child = _e[0], childPath = _e[1];
                if (childPath.length === path.length + 1 && slate.Element.isElement(child) && child.type !== 'table-cell') {
                    slate.Transforms.removeNodes(editor, { at: childPath });
                    return;
                }
            }
        }
        normalizeNode(entry);
    };
    return editor;
};
var Editium = function (_a) {
    var initialValue = _a.initialValue, onChange = _a.onChange, _b = _a.toolbar, toolbar = _b === void 0 ? ['bold', 'italic', 'underline', 'heading-one', 'heading-two', 'bulleted-list', 'numbered-list', 'link'] : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Start typing...' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.style, style = _e === void 0 ? {} : _e, _f = _a.readOnly, readOnly = _f === void 0 ? false : _f, onImageUpload = _a.onImageUpload, externalSearchQuery = _a.searchQuery, externalSearchMatches = _a.searchMatches, externalCurrentMatchIndex = _a.currentMatchIndex, _g = _a.showWordCount, showWordCount = _g === void 0 ? true : _g, _h = _a.height, height = _h === void 0 ? '200px' : _h, _j = _a.minHeight, minHeight = _j === void 0 ? '150px' : _j, _k = _a.maxHeight, maxHeight = _k === void 0 ? '250px' : _k;
    var toolbarItems = toolbar === 'all' ? ALL_TOOLBAR_ITEMS : toolbar;
    var editor = React.useMemo(function () { return withTables(slateHistory.withHistory(slateReact.withReact(slate.createEditor()))); }, []);
    var _l = React.useState(function () { return parseInitialValue(initialValue); }), value = _l[0], setValue = _l[1];
    var _m = React.useState(null), showOutputModal = _m[0], setShowOutputModal = _m[1];
    var _o = React.useState(false), copySuccess = _o[0], setCopySuccess = _o[1];
    var _p = React.useState(false), showLinkPopup = _p[0], setShowLinkPopup = _p[1];
    var _q = React.useState({ x: 0, y: 0 }), linkPopupPosition = _q[0], setLinkPopupPosition = _q[1];
    var _r = React.useState(null), selectedLink = _r[0], setSelectedLink = _r[1];
    var _s = React.useState(false), isFullscreen = _s[0], setIsFullscreen = _s[1];
    var _t = React.useState(''), internalSearchQuery = _t[0], setInternalSearchQuery = _t[1];
    var _u = React.useState([]), internalSearchMatches = _u[0], setInternalSearchMatches = _u[1];
    var _v = React.useState(0), internalCurrentMatchIndex = _v[0], setInternalCurrentMatchIndex = _v[1];
    var searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
    var searchMatches = externalSearchMatches !== undefined ? externalSearchMatches : internalSearchMatches;
    var currentMatchIndex = externalCurrentMatchIndex !== undefined ? externalCurrentMatchIndex : internalCurrentMatchIndex;
    React.useEffect(function () {
        window.__editiumProps = { onImageUpload: onImageUpload };
        return function () {
            delete window.__editiumProps;
        };
    }, [onImageUpload]);
    var _w = React.useState(null), selectedLinkPath = _w[0], setSelectedLinkPath = _w[1];
    var handleFullscreenToggle = React.useCallback(function () {
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);
    React.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === 'F11') {
                event.preventDefault();
                setIsFullscreen(!isFullscreen);
            }
            if (event.key === 'Escape' && isFullscreen) {
                event.preventDefault();
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () { return window.removeEventListener('keydown', handleKeyDown); };
    }, [isFullscreen]);
    React.useEffect(function () {
        if (isFullscreen) {
            var originalOverflow_1 = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return function () {
                document.body.style.overflow = originalOverflow_1;
            };
        }
    }, [isFullscreen]);
    // Handle keyboard shortcuts
    var handleKeyDown = React.useCallback(function (event) {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            var selection = editor.selection;
            if (selection) {
                var imageNode = Array.from(slate.Editor.nodes(editor, {
                    at: selection,
                    match: function (n) {
                        return !slate.Editor.isEditor(n) &&
                            slate.Element.isElement(n) &&
                            n.type === 'image';
                    },
                }))[0];
                if (imageNode) {
                    event.preventDefault();
                    var imagePath = imageNode[1];
                    slate.Transforms.removeNodes(editor, { at: imagePath });
                    return;
                }
                if (event.key === 'Delete' && slate.Range.isCollapsed(selection)) {
                    try {
                        var after = slate.Editor.after(editor, selection);
                        if (after) {
                            var nextNode = Array.from(slate.Editor.nodes(editor, {
                                at: after,
                                match: function (n) {
                                    return !slate.Editor.isEditor(n) &&
                                        slate.Element.isElement(n) &&
                                        n.type === 'image';
                                },
                            }))[0];
                            if (nextNode) {
                                event.preventDefault();
                                var nextPath = nextNode[1];
                                slate.Transforms.removeNodes(editor, { at: nextPath });
                                return;
                            }
                        }
                    }
                    catch (e) {
                        // Ignore errors if we can't find next node
                    }
                }
            }
        }
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }
        switch (event.key) {
            case 'b':
                event.preventDefault();
                toggleMark(editor, 'bold');
                break;
            case 'i':
                event.preventDefault();
                toggleMark(editor, 'italic');
                break;
            case 'u':
                event.preventDefault();
                toggleMark(editor, 'underline');
                break;
            case '`':
                event.preventDefault();
                toggleMark(editor, 'code');
                break;
            case 'd':
                event.preventDefault();
                toggleMark(editor, 'strikethrough');
                break;
            case 'z':
                if (event.shiftKey) {
                    event.preventDefault();
                    slateHistory.HistoryEditor.redo(editor);
                }
                else {
                    event.preventDefault();
                    slateHistory.HistoryEditor.undo(editor);
                }
                break;
            case 'y':
                event.preventDefault();
                slateHistory.HistoryEditor.redo(editor);
                break;
        }
    }, [editor]);
    var handleChange = React.useCallback(function (newValue) {
        setValue(newValue);
        if (onChange) {
            var htmlValue = serializeToHtml(newValue);
            onChange(htmlValue, newValue);
        }
    }, [onChange]);
    var textContent = React.useMemo(function () { return getTextContent(editor.children); }, [editor.children]);
    var wordCount = React.useMemo(function () { return countWords(textContent); }, [textContent]);
    var charCount = React.useMemo(function () { return countCharacters(textContent); }, [textContent]);
    var charCountNoSpaces = React.useMemo(function () { return countCharactersNoSpaces(textContent); }, [textContent]);
    React.useEffect(function () {
        if (initialValue !== undefined) {
            var parsedValue = parseInitialValue(initialValue);
            setValue(parsedValue);
        }
    }, [initialValue]);
    var handleCopy = React.useCallback(function () {
        var currentValue = editor.children;
        var textToCopy = showOutputModal === 'html'
            ? serializeToHtml(currentValue)
            : JSON.stringify(currentValue, null, 2);
        navigator.clipboard.writeText(textToCopy).then(function () {
            setCopySuccess(true);
            setTimeout(function () { return setCopySuccess(false); }, 2000);
        });
    }, [showOutputModal, editor]);
    var handleLinkClick = React.useCallback(function (event, linkElement) {
        event.preventDefault();
        var linkEntry = Array.from(slate.Editor.nodes(editor, {
            match: function (n) { return n.type === 'link' && n.url === linkElement.url; },
        }))[0];
        if (linkEntry) {
            linkEntry[0]; var path = linkEntry[1];
            setSelectedLinkPath(path);
        }
        var rect = event.target.getBoundingClientRect();
        setLinkPopupPosition({
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY + 5
        });
        setSelectedLink(linkElement);
        setShowLinkPopup(true);
    }, [editor]);
    var decorate = React.useCallback(function (_a) {
        var node = _a[0], path = _a[1];
        var ranges = [];
        if (searchQuery && searchMatches.length > 0 && slate.Text.isText(node)) {
            searchMatches.forEach(function (match, index) {
                if (JSON.stringify(match.path) === JSON.stringify(path)) {
                    ranges.push({
                        anchor: { path: path, offset: match.offset },
                        focus: { path: path, offset: match.offset + match.text.length },
                        search: true,
                        searchCurrent: index === currentMatchIndex,
                    });
                }
            });
        }
        return ranges;
    }, [searchQuery, searchMatches, currentMatchIndex]);
    var renderElementWithHandlers = React.useCallback(function (props) {
        var attributes = props.attributes, children = props.children, element = props.element;
        var style = { margin: '0', fontWeight: 'normal' };
        var alignStyle = element.align ? {
            textAlign: element.align
        } : {};
        var combinedStyle = __assign(__assign({}, style), alignStyle);
        switch (element.type) {
            case 'paragraph':
                return jsxRuntime.jsx("p", __assign({}, attributes, { style: combinedStyle, children: children }));
            case 'heading-one':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '2em', margin: '0' }), children: children }));
            case 'heading-two':
                return jsxRuntime.jsx("h2", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.5em', margin: '0' }), children: children }));
            case 'heading-three':
                return jsxRuntime.jsx("h3", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.25em', margin: '0' }), children: children }));
            case 'heading-four':
                return jsxRuntime.jsx("h4", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.1em', margin: '0' }), children: children }));
            case 'heading-five':
                return jsxRuntime.jsx("h5", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1em', margin: '0' }), children: children }));
            case 'heading-six':
                return jsxRuntime.jsx("h6", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.9em', margin: '0' }), children: children }));
            case 'heading-seven':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.85em', margin: '0' }), children: children }));
            case 'heading-eight':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.8em', margin: '0' }), children: children }));
            case 'bulleted-list':
                return jsxRuntime.jsx("ul", __assign({}, attributes, { style: __assign(__assign({}, style), { margin: '0' }), children: children }));
            case 'numbered-list':
                return jsxRuntime.jsx("ol", __assign({}, attributes, { style: __assign(__assign({}, style), { margin: '0' }), children: children }));
            case 'list-item':
                return jsxRuntime.jsx("li", __assign({}, attributes, { children: children }));
            case 'blockquote':
                return (jsxRuntime.jsx("blockquote", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { borderLeft: '4px solid #ddd', paddingLeft: '16px', marginLeft: '0', marginRight: '0', color: '#666', fontStyle: 'italic' }), children: children })));
            case 'code-block':
                return (jsxRuntime.jsx("pre", __assign({}, attributes, { style: {
                        backgroundColor: '#f5f5f5',
                        padding: '16px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        margin: '0'
                    }, children: jsxRuntime.jsx("code", { children: children }) })));
            case 'horizontal-rule':
                return (jsxRuntime.jsxs("div", __assign({}, attributes, { contentEditable: false, style: { userSelect: 'none' }, children: [jsxRuntime.jsx("hr", { style: {
                                border: 'none',
                                borderTop: '2px solid #ddd',
                                margin: '16px 0'
                            } }), children] })));
            case 'image':
                var imageElement = element;
                return jsxRuntime.jsx(ResizableImage, { element: imageElement, attributes: attributes, children: children });
            case 'table':
                var tableElement = element;
                return jsxRuntime.jsx(TableComponent, { element: tableElement, attributes: attributes, children: children });
            case 'table-row':
                var tableRowElement = element;
                return jsxRuntime.jsx(TableRowComponent, { element: tableRowElement, attributes: attributes, children: children });
            case 'table-cell':
                var tableCellElement = element;
                return jsxRuntime.jsx(TableCellComponent, { element: tableCellElement, attributes: attributes, children: children });
            case 'link':
                var linkElement_1 = element;
                return (jsxRuntime.jsx("a", __assign({}, attributes, { href: linkElement_1.url, title: linkElement_1.title, onClick: function (e) { return handleLinkClick(e, linkElement_1); }, style: {
                        color: '#0066cc',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }, children: children })));
            default:
                return jsxRuntime.jsx("p", __assign({}, attributes, { style: combinedStyle, children: children }));
        }
    }, [handleLinkClick]);
    var handleOpenLink = React.useCallback(function () {
        if (selectedLink) {
            window.open(selectedLink.url, selectedLink.target || '_self');
            setShowLinkPopup(false);
        }
    }, [selectedLink]);
    var handleRemoveLink = React.useCallback(function () {
        if (selectedLink) {
            var linkEntries = Array.from(slate.Editor.nodes(editor, {
                match: function (n) {
                    return !slate.Editor.isEditor(n) &&
                        slate.Element.isElement(n) &&
                        n.type === 'link' &&
                        n.url === selectedLink.url;
                },
            }));
            if (linkEntries.length > 0) {
                var _a = linkEntries[0], linkNode = _a[0], linkPath = _a[1];
                var link = linkNode;
                if (linkPath.length === 1) {
                    var textChildren = link.children;
                    slate.Transforms.removeNodes(editor, { at: linkPath });
                    slate.Transforms.insertNodes(editor, {
                        type: 'paragraph',
                        children: textChildren,
                    }, {
                        at: linkPath,
                    });
                }
                else {
                    slate.Transforms.unwrapNodes(editor, {
                        at: linkPath,
                    });
                }
            }
            setShowLinkPopup(false);
        }
    }, [selectedLink, editor]);
    var handleEditLink = React.useCallback(function () {
        if (selectedLink && selectedLinkPath) {
            var linkText = slate.Editor.string(editor, selectedLinkPath);
            if (window.__editiumLinkEditHandler) {
                window.__editiumLinkEditHandler({
                    url: selectedLink.url,
                    title: selectedLink.title,
                    target: selectedLink.target,
                    text: linkText,
                    path: selectedLinkPath
                });
            }
        }
        setShowLinkPopup(false);
    }, [selectedLink, selectedLinkPath, editor]);
    var formatHtml = React.useCallback(function (html) {
        var formatted = '';
        var indent = 0;
        var tab = '  ';
        html.split(/(<[^>]+>)/g).forEach(function (part) {
            if (part.trim() === '')
                return;
            if (part.startsWith('</')) {
                indent--;
                formatted += tab.repeat(Math.max(0, indent)) + part + '\n';
            }
            else if (part.startsWith('<')) {
                formatted += tab.repeat(indent) + part + '\n';
                if (!part.includes('</') && !part.endsWith('/>')) {
                    indent++;
                }
            }
            else {
                formatted += tab.repeat(indent) + part.trim() + '\n';
            }
        });
        return formatted.trim();
    }, []);
    var editorStyle = __assign({ border: '1px solid #ccc', borderTop: 'none', borderRadius: toolbar.length > 0 ? '0' : '4px 4px 0 0', borderBottom: 'none', padding: '16px', height: typeof height === 'number' ? "".concat(height, "px") : height, minHeight: typeof minHeight === 'number' ? "".concat(minHeight, "px") : minHeight, maxHeight: typeof maxHeight === 'number' ? "".concat(maxHeight, "px") : maxHeight, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6', outline: 'none', backgroundColor: '#fff', position: 'relative', overflow: 'auto' }, style);
    var containerStyle = isFullscreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    } : {};
    var editableStyle = isFullscreen ? __assign(__assign({}, editorStyle), { flex: 1, overflow: 'auto', border: 'none', borderRadius: 0, 
        // Remove height constraints in fullscreen mode
        height: 'auto', minHeight: 'auto', maxHeight: 'none' }) : editorStyle;
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { children: "\n          [data-slate-editor] {\n            position: relative;\n            min-height: inherit;\n            height: 100%;\n          }\n          \n          /* Custom scrollbar styling for better UX */\n          [data-slate-editor]::-webkit-scrollbar {\n            width: 8px;\n            height: 8px;\n          }\n          \n          [data-slate-editor]::-webkit-scrollbar-track {\n            background: #f1f1f1;\n            border-radius: 4px;\n          }\n          \n          [data-slate-editor]::-webkit-scrollbar-thumb {\n            background: #c1c1c1;\n            border-radius: 4px;\n          }\n          \n          [data-slate-editor]::-webkit-scrollbar-thumb:hover {\n            background: #a8a8a8;\n          }\n          \n          [data-slate-editor] [data-slate-placeholder] {\n            opacity: 0.333;\n            pointer-events: none;\n            user-select: none;\n            display: inline-block !important;\n            width: 100%;\n            max-width: 100%;\n            white-space: nowrap;\n            margin: 0 !important;\n            vertical-align: text-top;\n          }\n          \n          [data-slate-editor] p,\n          [data-slate-editor] h1,\n          [data-slate-editor] h2,\n          [data-slate-editor] h3,\n          [data-slate-editor] h4,\n          [data-slate-editor] h5,\n          [data-slate-editor] h6 {\n            position: relative;\n          }\n          \n          [data-slate-editor] [contenteditable=\"true\"] {\n            outline: none;\n            position: relative;\n            z-index: 1;\n          }\n          \n          [data-slate-editor] > * {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] p {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] h1,\n          [data-slate-editor] h2,\n          [data-slate-editor] h3,\n          [data-slate-editor] h4,\n          [data-slate-editor] h5,\n          [data-slate-editor] h6 {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] ul,\n          [data-slate-editor] ol {\n            margin: 0 !important;\n            padding-left: 24px;\n          }\n        " }), jsxRuntime.jsxs("div", { className: className, style: containerStyle, children: [showLinkPopup && (jsxRuntime.jsx("div", { style: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9998,
                        }, onClick: function () { return setShowLinkPopup(false); }, children: jsxRuntime.jsxs("div", { style: {
                                position: 'absolute',
                                top: "".concat(linkPopupPosition.y, "px"),
                                left: "".concat(linkPopupPosition.x, "px"),
                                backgroundColor: '#ffffff',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                minWidth: '200px',
                                overflow: 'hidden',
                                zIndex: 9999,
                            }, onClick: function (e) { return e.stopPropagation(); }, children: [selectedLink && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }, children: [jsxRuntime.jsx("div", { style: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' }, children: "Link URL:" }), jsxRuntime.jsx("div", { style: {
                                                fontSize: '13px',
                                                color: '#111827',
                                                wordBreak: 'break-all',
                                                fontFamily: 'monospace'
                                            }, children: selectedLink.url })] })), jsxRuntime.jsxs("button", { onClick: handleOpenLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#374151',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }), "Open Link"] }), jsxRuntime.jsxs("button", { onClick: handleEditLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#374151',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Edit Link"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        borderTop: '1px solid #e5e7eb',
                                        backgroundColor: 'transparent',
                                        color: '#ef4444',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#fef2f2'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }), "Remove Link"] })] }) })), jsxRuntime.jsxs(slateReact.Slate, { editor: editor, initialValue: value, onValueChange: handleChange, children: [toolbarItems.length > 0 && (jsxRuntime.jsx(Toolbar, { items: toolbarItems, onViewOutput: function (type) { return setShowOutputModal(type); }, onEditLink: function () { }, searchQuery: searchQuery, searchMatches: searchMatches, currentMatchIndex: currentMatchIndex, onSearchQueryChange: setInternalSearchQuery, onSearchMatchesChange: setInternalSearchMatches, onCurrentMatchIndexChange: setInternalCurrentMatchIndex, isFullscreen: isFullscreen, onFullscreenToggle: handleFullscreenToggle })), jsxRuntime.jsx(slateReact.Editable, { renderElement: renderElementWithHandlers, renderLeaf: renderLeaf, decorate: decorate, placeholder: placeholder, onKeyDown: handleKeyDown, readOnly: readOnly, style: editableStyle })] }), jsxRuntime.jsxs("div", { style: {
                            padding: '8px 12px',
                            backgroundColor: '#f9fafb',
                            borderTop: '1px solid #e5e7eb',
                            borderLeft: isFullscreen ? 'none' : '1px solid #ccc',
                            borderRight: isFullscreen ? 'none' : '1px solid #ccc',
                            borderBottom: isFullscreen ? 'none' : '1px solid #ccc',
                            borderRadius: isFullscreen ? '0' : '0 0 4px 4px',
                            display: 'flex',
                            justifyContent: showWordCount ? 'space-between' : 'flex-end',
                            alignItems: 'center',
                            gap: '20px',
                            fontSize: '12px',
                            color: '#6b7280',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }, children: [showWordCount && (jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '20px' }, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Words:" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: wordCount.toLocaleString() })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Characters:" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: charCount.toLocaleString() })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Characters (no spaces):" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: charCountNoSpaces.toLocaleString() })] })] })), jsxRuntime.jsxs("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#9ca3af',
                                    fontSize: '11px',
                                }, children: [jsxRuntime.jsx("span", { children: "Built with" }), jsxRuntime.jsx("span", { style: {
                                            fontWeight: '600',
                                            color: '#3b82f6',
                                            letterSpacing: '0.5px',
                                            cursor: 'pointer',
                                        }, onClick: function (e) {
                                            e.preventDefault();
                                            window.open('https://www.npmjs.com/package/editium', '_blank');
                                        }, children: "Editium" })] })] }), showOutputModal && (jsxRuntime.jsx("div", { style: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10000,
                        }, onClick: function () {
                            setShowOutputModal(null);
                            setCopySuccess(false);
                        }, children: jsxRuntime.jsxs("div", { style: {
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                padding: '24px',
                                maxWidth: '900px',
                                maxHeight: '85vh',
                                width: '90%',
                                overflow: 'hidden',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                display: 'flex',
                                flexDirection: 'column',
                            }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }, children: [jsxRuntime.jsx("h2", { style: { margin: 0, color: '#111827', fontSize: '24px', fontWeight: '600' }, children: showOutputModal === 'html' ? 'HTML Output' : showOutputModal === 'json' ? 'JSON Output' : 'Preview' }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [showOutputModal !== 'preview' && (jsxRuntime.jsx("button", { onClick: handleCopy, style: {
                                                        backgroundColor: copySuccess ? '#10b981' : '#3b82f6',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        padding: '8px 16px',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                    }, onMouseEnter: function (e) {
                                                        if (!copySuccess) {
                                                            e.currentTarget.style.backgroundColor = '#2563eb';
                                                        }
                                                    }, onMouseLeave: function (e) {
                                                        if (!copySuccess) {
                                                            e.currentTarget.style.backgroundColor = '#3b82f6';
                                                        }
                                                    }, title: "Copy to clipboard", children: copySuccess ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), "Copied!"] })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }), "Copy"] })) })), jsxRuntime.jsx("button", { onClick: function () {
                                                        setShowOutputModal(null);
                                                        setCopySuccess(false);
                                                    }, style: {
                                                        background: 'none',
                                                        border: 'none',
                                                        fontSize: '24px',
                                                        cursor: 'pointer',
                                                        color: '#6b7280',
                                                        padding: '4px',
                                                        lineHeight: 1,
                                                    }, title: "Close", children: "\u00D7" })] })] }), jsxRuntime.jsx("div", { style: {
                                        flex: 1,
                                        overflow: 'auto',
                                        backgroundColor: showOutputModal === 'preview' ? '#ffffff' : '#1e293b',
                                        borderRadius: '6px',
                                        border: showOutputModal === 'preview' ? '1px solid #e5e7eb' : '1px solid #334155',
                                        padding: showOutputModal === 'preview' ? '20px' : '0',
                                    }, children: showOutputModal === 'preview' ? (jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: serializeToHtml(editor.children) }, style: {
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                            color: '#111827',
                                        } })) : (jsxRuntime.jsx("pre", { style: {
                                            margin: 0,
                                            padding: '20px',
                                            fontSize: '13px',
                                            lineHeight: '1.6',
                                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                            color: '#e2e8f0',
                                            overflowX: 'auto',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                        }, children: jsxRuntime.jsx("code", { children: showOutputModal === 'html'
                                                ? formatHtml(serializeToHtml(editor.children))
                                                : JSON.stringify(editor.children, null, 2) }) })) })] }) }))] })] }));
};

exports.ALL_TOOLBAR_ITEMS = ALL_TOOLBAR_ITEMS;
exports.Editium = Editium;
exports.ResizableImage = ResizableImage;
exports.TableCellComponent = TableCellComponent;
exports.TableComponent = TableComponent;
exports.TableRowComponent = TableRowComponent;
exports.addTableColumn = addTableColumn;
exports.addTableRow = addTableRow;
exports.defaultInitialValue = defaultInitialValue;
exports.findAllMatches = findAllMatches;
exports.insertLink = insertLink;
exports.insertTable = insertTable;
exports.isBlockActive = isBlockActive;
exports.isInTable = isInTable;
exports.isLinkActive = isLinkActive;
exports.isMarkActive = isMarkActive;
exports.navigateToMatch = navigateToMatch;
exports.removeTableColumn = removeTableColumn;
exports.removeTableRow = removeTableRow;
exports.replaceAllMatches = replaceAllMatches;
exports.replaceMatch = replaceMatch;
exports.serializeToHtml = serializeToHtml;
exports.setTableAlignment = setTableAlignment;
exports.toggleBlock = toggleBlock;
exports.toggleMark = toggleMark;
//# sourceMappingURL=index.js.map

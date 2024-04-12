"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmNavItem', from: '@wavemaker/app-rn-runtime/components/navigation/navitem/navitem.component' }
];
exports.default = {
    pre: (element, context) => {
        element.childNodes.forEach(n => {
            if (n instanceof node_html_parser_1.HTMLElement && n.tagName === 'WM-ANCHOR') {
                n.setAttribute('class', 'navAnchorItem ' + (n.getAttribute('class') || ''));
            }
        });
        return `<WmNavItem 
    getDisplayExpression={(label) => label && (fragment.appLocale[label.trim()] || label)} 
      ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmNavItem>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=navitem.transformer.js.map
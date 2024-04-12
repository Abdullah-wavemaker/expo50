"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const basenav_transformer_1 = require("./basenav.transformer");
exports.imports = [
    { name: 'WmNavbar', from: '@wavemaker/app-rn-runtime/components/navigation/navbar/navbar.component' }
];
exports.default = {
    pre: (element, context) => {
        const layout = element.getAttribute('layout');
        if (layout) {
            const className = layout === 'stacked' ? 'stackedNav ' : 'justifiedNav ';
            if (layout === 'stacked') {
                element.setAttribute('class', className + (element.getAttribute('class') || ''));
            }
            else {
                element.setAttribute('class', className + (element.getAttribute('class') || ''));
            }
        }
        if (!element.hasAttribute('dataset')) {
            element.childNodes.forEach(n => {
                if (n instanceof node_html_parser_1.HTMLElement && n.tagName === 'WM-NAV-ITEM') {
                    n.setAttribute('defaultview', 'true');
                }
            });
        }
        return `<WmNavbar 
    getDisplayExpression={(label) => label && (fragment.appLocale[label.trim()] || label)} 
      ${(0, basenav_transformer_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmNavbar>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=navbar.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmWizard', from: '@wavemaker/app-rn-runtime/components/container/wizard/wizard.component' }
];
exports.default = {
    pre: (element, context) => {
        let i = 0;
        element.childNodes.forEach((c) => {
            if (c instanceof node_html_parser_1.HTMLElement) {
                c.setAttribute('index', '' + (i++));
            }
        });
        let menudataexpr = (0, transpile_1.createExpression)(element, 'menudataexpr');
        if (menudataexpr) {
            element.removeAttribute('menudataexpr');
        }
        return `<WmWizard ${(0, transpile_1.transformAttrs)(element, context)} 
      ${menudataexpr ? `getmenudataexpression=${menudataexpr}` : ''}>`;
    },
    post: (element, context) => '</WmWizard>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=wizard.transformer.js.map
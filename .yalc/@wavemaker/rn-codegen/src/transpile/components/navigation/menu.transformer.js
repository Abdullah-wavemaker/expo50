"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const basenav_transformer_1 = require("./basenav.transformer");
exports.imports = [
    { name: 'WmMenu', from: '@wavemaker/app-rn-runtime/components/navigation/menu/menu.component' }
];
exports.default = {
    pre: (element, context) => {
        const menuclass = element.getAttribute('menuclass');
        if (menuclass) {
            element.setAttribute('class', menuclass);
            element.removeAttribute('menuclass');
        }
        return `<WmMenu
      getDisplayExpression={(label) => label && (fragment.appLocale[label.trim()] || label)} 
      ${(0, basenav_transformer_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmMenu>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=menu.transformer.js.map
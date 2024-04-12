"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmToggle', from: '@wavemaker/app-rn-runtime/components/input/toggle/toggle.component' }
];
exports.default = {
    pre: (element, context) => {
        let bgColor = element.attrs['backgroundcolor'];
        if (bgColor) {
            element.setAttribute('color', bgColor);
            element.removeAttribute('backgroundcolor');
        }
        const onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        return `<WmToggle ${(0, transpile_1.transformAttrs)(element, context)} ${onChange ? `onChange={${onChange}}` : ''}>`;
    },
    post: (element, context) => '</WmToggle>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=toggle.transformer.js.map
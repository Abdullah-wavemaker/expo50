"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmTextarea', from: '@wavemaker/app-rn-runtime/components/input/textarea/textarea.component' }
];
exports.default = {
    pre: (element, context) => {
        const onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        return `<WmTextarea ${(0, transpile_1.transformAttrs)(element, context)} ${onChange ? `onChange={${onChange}}` : ''}>`;
    },
    post: (element, context) => '</WmTextarea>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=textarea.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmText', from: '@wavemaker/app-rn-runtime/components/input/text/text.component' }
];
exports.default = {
    pre: (element, context) => {
        const onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        return `<WmText ${(0, transpile_1.transformAttrs)(element, context)} ${onChange ? `onChange={${onChange}}` : ''}>`;
    },
    post: (element, context) => '</WmText>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=text.transformer.js.map
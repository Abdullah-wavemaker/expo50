"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmChips', from: '@wavemaker/app-rn-runtime/components/input/chips/chips.component' }
];
exports.default = {
    pre: (element, context) => {
        let getDisplayExpression = (0, transpile_1.createExpression)(element, 'displayexpression');
        if (getDisplayExpression) {
            element.removeAttribute('displayexpression');
        }
        const onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        return `<WmChips ${(0, transpile_1.transformAttrs)(element, context)} ${getDisplayExpression ? `getDisplayExpression=${getDisplayExpression}` : ''} ${onChange ? `onChange={${onChange}}` : ''}>`;
    },
    post: (element, context) => '</WmChips>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=chips.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmRadioset', from: '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component' }
];
exports.default = {
    pre: (element, context) => {
        (0, utils_1.transformItemsPerRow)(element);
        let getDisplayExpression = (0, transpile_1.createExpression)(element, 'displayexpression');
        if (getDisplayExpression) {
            element.removeAttribute('displayexpression');
        }
        const onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        return `<WmRadioset ${(0, transpile_1.transformAttrs)(element, context)} ${getDisplayExpression ? `getDisplayExpression=${getDisplayExpression}` : ''} ${onChange ? `onChange={${onChange}}` : ''} ${(0, utils_1.getRenderItemPartial)()}>`;
    },
    post: (element) => '</WmRadioset>',
    imports: (element) => exports.imports
};
//# sourceMappingURL=radioset.transformer.js.map
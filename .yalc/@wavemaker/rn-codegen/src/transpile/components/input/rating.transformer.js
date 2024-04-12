"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmRating', from: '@wavemaker/app-rn-runtime/components/input/rating/rating.component' }
];
exports.default = {
    pre: (element, context) => {
        let getDisplayExpression = (0, transpile_1.createExpression)(element, 'displayexpression');
        if (getDisplayExpression) {
            element.removeAttribute('displayexpression');
        }
        return `<WmRating ${(0, transpile_1.transformAttrs)(element, context)}  ${getDisplayExpression ? `getDisplayExpression=${getDisplayExpression}` : ''}>`;
    },
    post: (element, context) => '</WmRating>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=rating.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmSpinner', from: '@wavemaker/app-rn-runtime/components/basic/spinner/spinner.component' }
];
exports.default = {
    pre: (element, context) => {
        return `<WmSpinner ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmSpinner>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=spinner.transformer.js.map
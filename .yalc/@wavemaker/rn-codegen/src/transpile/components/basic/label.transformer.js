"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLabel', from: '@wavemaker/app-rn-runtime/components/basic/label/label.component' }
];
exports.default = {
    pre: (element, context) => `<WmLabel ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmLabel>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=label.transformer.js.map
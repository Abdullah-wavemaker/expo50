"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmProgressBar', from: '@wavemaker/app-rn-runtime/components/basic/progress-bar/progress-bar.component' }
];
exports.default = {
    pre: (element, context) => `<WmProgressBar ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmProgressBar>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=progress-bar.transformer.js.map
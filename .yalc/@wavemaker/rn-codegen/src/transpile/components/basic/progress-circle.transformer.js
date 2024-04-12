"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmProgressCircle', from: '@wavemaker/app-rn-runtime/components/basic/progress-circle/progress-circle.component' }
];
exports.default = {
    pre: (element, context) => `<WmProgressCircle ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmProgressCircle>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=progress-circle.transformer.js.map
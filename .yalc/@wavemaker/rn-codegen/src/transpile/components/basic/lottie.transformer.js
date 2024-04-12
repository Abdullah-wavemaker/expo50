"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLottie', from: '@wavemaker/app-rn-runtime/components/basic/lottie/lottie.component' }
];
exports.default = {
    pre: (element, context) => `<WmLottie ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmLottie>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=lottie.transformer.js.map
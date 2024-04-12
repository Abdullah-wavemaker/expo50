"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmVideo', from: '@wavemaker/app-rn-runtime/components/basic/video/video.component' }
];
exports.default = {
    pre: (element, context) => `<WmVideo ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmVideo>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=video.transformer.js.map
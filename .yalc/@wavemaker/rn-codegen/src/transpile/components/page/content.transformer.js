"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmContent', from: '@wavemaker/app-rn-runtime/components/page/content/content.component' }
];
exports.default = {
    pre: (element, context) => `<WmContent ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmContent>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=content.transformer.js.map
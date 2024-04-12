"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmIcon', from: '@wavemaker/app-rn-runtime/components/basic/icon/icon.component' }
];
exports.default = {
    pre: (element, context) => `<WmIcon ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmIcon>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=icon.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmModal', from: '@wavemaker/app-rn-runtime/components/basic/modal/modal.component' }
];
exports.default = {
    pre: (element, context) => `<WmModal ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmModal>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=modal.transformer.js.map
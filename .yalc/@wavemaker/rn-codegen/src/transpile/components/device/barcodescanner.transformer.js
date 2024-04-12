"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmBarcodescanner', from: '@wavemaker/app-rn-runtime/components/device/barcodescanner/barcodescanner.component' }
];
exports.default = {
    pre: (element, context) => `<WmBarcodescanner ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmBarcodescanner>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=barcodescanner.transformer.js.map
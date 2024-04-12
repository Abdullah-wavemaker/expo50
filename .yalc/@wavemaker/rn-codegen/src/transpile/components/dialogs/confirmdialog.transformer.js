"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmConfirmdialog', from: '@wavemaker/app-rn-runtime/components/dialogs/confirmdialog/confirmdialog.component' }
];
exports.default = {
    pre: (element, context) => `<WmConfirmdialog ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmConfirmdialog>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=confirmdialog.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmDialogactions', from: '@wavemaker/app-rn-runtime/components/dialogs/dialogactions/dialogactions.component' }
];
exports.default = {
    pre: (element, context) => `<WmDialogactions ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmDialogactions>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=dialogactions.transformer.js.map
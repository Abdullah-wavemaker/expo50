"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmDialogcontent', from: '@wavemaker/app-rn-runtime/components/dialogs/dialogcontent/dialogcontent.component' }
];
exports.default = {
    pre: (element, context) => `<WmDialogcontent ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmDialogcontent>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=dialogcontent.transformer.js.map
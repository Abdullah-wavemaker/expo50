"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmAlertdialog', from: '@wavemaker/app-rn-runtime/components/dialogs/alertdialog/alertdialog.component' }
];
exports.default = {
    pre: (element, context) => `<WmAlertdialog ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmAlertdialog>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=alertdialog.transformer.js.map
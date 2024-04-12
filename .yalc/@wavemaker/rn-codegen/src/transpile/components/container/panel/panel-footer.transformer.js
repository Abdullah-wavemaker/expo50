"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmPanelFooter', from: '@wavemaker/app-rn-runtime/components/container/panel/panel-footer/panel-footer.component' }
];
exports.default = {
    pre: (element, context) => `<WmPanelFooter ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmPanelFooter>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=panel-footer.transformer.js.map
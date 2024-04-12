"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmPanelContent', from: '@wavemaker/app-rn-runtime/components/container/panel/panel-content/panel-content.component' }
];
exports.default = {
    pre: (element, context) => `<WmPanelContent ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmPanelContent>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=panel-content.transformer.js.map
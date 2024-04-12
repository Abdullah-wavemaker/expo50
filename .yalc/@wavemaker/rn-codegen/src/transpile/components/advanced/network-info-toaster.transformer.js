"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmNetworkInfoToaster', from: '@wavemaker/app-rn-runtime/components/advanced/network-info-toaster/network-info-toaster.component' }
];
exports.default = {
    pre: (element, context) => `<WmNetworkInfoToaster ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmNetworkInfoToaster>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=network-info-toaster.transformer.js.map
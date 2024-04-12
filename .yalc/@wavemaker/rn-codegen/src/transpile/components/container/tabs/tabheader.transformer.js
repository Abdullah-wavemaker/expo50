"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmTabheader', from: '@wavemaker/app-rn-runtime/components/container/tabs/tabheader/tabheader.component' }
];
exports.default = {
    pre: (element, context) => `<WmTabheader ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmTabheader>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=tabheader.transformer.js.map
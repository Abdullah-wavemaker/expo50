"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmCardFooter', from: '@wavemaker/app-rn-runtime/components/data/card/card-footer/card-footer.component' }
];
exports.default = {
    pre: (element, context) => `<WmCardFooter ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmCardFooter>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=card-footer.transformer.js.map
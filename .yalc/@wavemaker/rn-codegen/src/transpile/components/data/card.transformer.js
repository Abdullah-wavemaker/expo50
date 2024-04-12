"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmCard', from: '@wavemaker/app-rn-runtime/components/data/card/card.component' }
];
exports.default = {
    pre: (element, context) => `<WmCard ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmCard>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=card.transformer.js.map
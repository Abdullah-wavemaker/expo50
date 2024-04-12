"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmComposite', from: '@wavemaker/app-rn-runtime/components/input/composite/composite.component' }
];
exports.default = {
    pre: (element, context) => `<WmComposite ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmComposite>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=composite.transformer.js.map
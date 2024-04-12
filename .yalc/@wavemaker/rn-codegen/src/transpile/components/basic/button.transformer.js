"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmButton', from: '@wavemaker/app-rn-runtime/components/basic/button/button.component' }
];
exports.default = {
    pre: (element, context) => `<WmButton ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmButton>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=button.transformer.js.map
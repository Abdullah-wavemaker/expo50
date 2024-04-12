"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmLinearlayoutitem', from: '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component' }
];
exports.default = {
    pre: (element, context) => `<WmLinearlayoutitem ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmLinearlayoutitem>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=linearlayoutitem.transformer.js.map
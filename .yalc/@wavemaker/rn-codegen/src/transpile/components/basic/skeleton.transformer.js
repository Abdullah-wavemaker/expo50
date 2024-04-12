"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmSkeleton', from: '@wavemaker/app-rn-runtime/components/basic/skeleton/skeleton.component' }
];
exports.default = {
    pre: (element, context) => `<WmSkeleton ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmSkeleton>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=skeleton.transformer.js.map
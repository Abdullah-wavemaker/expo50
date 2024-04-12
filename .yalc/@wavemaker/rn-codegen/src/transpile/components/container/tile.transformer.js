"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmTile', from: '@wavemaker/app-rn-runtime/components/container/tile/tile.component' }
];
exports.default = {
    pre: (element, context) => `<WmTile ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmTile>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=tile.transformer.js.map
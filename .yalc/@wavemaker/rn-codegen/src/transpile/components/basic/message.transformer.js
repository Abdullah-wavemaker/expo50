"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmMessage', from: '@wavemaker/app-rn-runtime/components/basic/message/message.component' }
];
exports.default = {
    pre: (element, context) => `<WmMessage ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmMessage>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=message.transformer.js.map
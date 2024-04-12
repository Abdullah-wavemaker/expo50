"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmFileupload', from: '@wavemaker/app-rn-runtime/components/input/fileupload/fileupload.component' }
];
exports.default = {
    pre: (element, context) => `<WmFileupload ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmFileupload>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=fileupload.transformer.js.map
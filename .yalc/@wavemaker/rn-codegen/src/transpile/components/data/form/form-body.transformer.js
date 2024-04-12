"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmFormBody', from: '@wavemaker/app-rn-runtime/components/data/form/form-body/form-body.component' }
];
exports.default = {
    pre: (element, context) => `<WmFormBody ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmFormBody>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=form-body.transformer.js.map
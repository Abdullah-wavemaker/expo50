"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmFormFooter', from: '@wavemaker/app-rn-runtime/components/data/form/form-footer/form-footer.component' }
];
exports.default = {
    pre: (element, context) => `<WmFormFooter ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmFormFooter>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=form-footer.transformer.js.map
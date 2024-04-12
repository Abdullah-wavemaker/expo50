"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmPartial', from: '@wavemaker/app-rn-runtime/components/page/partial/partial.component' }
];
exports.default = {
    pre: (element, context) => `<WmPartial ${(0, transpile_1.transformAttrs)(element, context)}  showskeleton={fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded}>`,
    post: (element, context) => '</WmPartial>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=partial.transformer.js.map
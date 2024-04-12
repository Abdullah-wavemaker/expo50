"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmPageContent', from: '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component' }
];
exports.default = {
    pre: (element, context) => `<WmPageContent ${(0, transpile_1.transformAttrs)(element, context)} showskeleton={fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded}>`,
    post: (element, context) => '</WmPageContent>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=page-content.transformer.js.map
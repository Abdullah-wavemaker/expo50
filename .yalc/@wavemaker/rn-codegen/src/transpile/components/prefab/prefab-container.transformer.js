"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmPrefabContainer', from: '@wavemaker/app-rn-runtime/components/prefab/prefab-container.component' }
];
exports.default = {
    pre: (element, context) => `<WmPrefabContainer ${(0, transpile_1.transformAttrs)(element, context)} showskeleton={fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded}>`,
    post: (element, context) => '</WmPrefabContainer>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=prefab-container.transformer.js.map
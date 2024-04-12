"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmTabs', from: '@wavemaker/app-rn-runtime/components/container/tabs/tabs.component' }
];
exports.default = {
    pre: (element, context) => {
        return `<WmTabs ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmTabs>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=tabs.transformer.js.map
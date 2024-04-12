"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmStackChart', from: '@wavemaker/app-rn-runtime/components/chart/stack-chart/stack-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmStackChart horizontal={true} ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmStackChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=stack-chart.transformer.js.map
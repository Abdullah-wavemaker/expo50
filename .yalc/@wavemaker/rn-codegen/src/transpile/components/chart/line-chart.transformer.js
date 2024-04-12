"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLineChart', from: '@wavemaker/app-rn-runtime/components/chart/line-chart/line-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmLineChart ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmLineChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=line-chart.transformer.js.map
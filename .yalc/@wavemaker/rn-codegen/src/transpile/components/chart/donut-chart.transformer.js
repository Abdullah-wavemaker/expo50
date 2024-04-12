"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmDonutChart', from: '@wavemaker/app-rn-runtime/components/chart/donut-chart/donut-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmDonutChart ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmDonutChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=donut-chart.transformer.js.map
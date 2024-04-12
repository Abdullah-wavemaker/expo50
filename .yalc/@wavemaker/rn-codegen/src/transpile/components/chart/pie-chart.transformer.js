"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmPieChart', from: '@wavemaker/app-rn-runtime/components/chart/pie-chart/pie-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmPieChart ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmPieChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=pie-chart.transformer.js.map
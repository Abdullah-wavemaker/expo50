"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmBarChart', from: '@wavemaker/app-rn-runtime/components/chart/bar-chart/bar-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmBarChart horizontal={true} ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmBarChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=bar-chart.transformer.js.map
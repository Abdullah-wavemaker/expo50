"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmBubbleChart', from: '@wavemaker/app-rn-runtime/components/chart/bubble-chart/bubble-chart.component' }
];
exports.default = {
    pre: (element, context) => `<WmBubbleChart ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmBubbleChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=bubble-chart.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmAreaChart', from: '@wavemaker/app-rn-runtime/components/chart/area-chart/area-chart.component' }
];
exports.default = {
    pre: (element, context) => {
        let xtickexpr = (0, transpile_1.createExpression)(element, 'xtickexpr');
        let ytickexpr = (0, transpile_1.createExpression)(element, 'ytickexpr');
        if (xtickexpr) {
            element.removeAttribute('xtickexpr');
        }
        if (ytickexpr) {
            element.removeAttribute('ytickexpr');
        }
        return `<WmAreaChart ${(0, transpile_1.transformAttrs)(element, context)}
    ${xtickexpr ? `xtickexpr=${xtickexpr}` : ''}
    ${ytickexpr ? `ytickexpr=${ytickexpr}` : ''}>`;
    },
    post: (element, context) => '</WmAreaChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=area-chart.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmColumnChart', from: '@wavemaker/app-rn-runtime/components/chart/column-chart/column-chart.component' }
];
exports.default = {
    pre: (element, context) => {
        const classname = 'app-column-chart ' + (element.getAttribute('class') || '');
        element.setAttribute('class', classname);
        return `<WmColumnChart horizontal={false}  ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmColumnChart>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=column-chart.transformer.js.map
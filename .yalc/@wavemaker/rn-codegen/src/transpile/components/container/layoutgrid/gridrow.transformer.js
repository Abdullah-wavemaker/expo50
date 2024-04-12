"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
const utils_1 = require("../../utils");
exports.imports = [
    { name: 'WmGridrow', from: '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component' }
];
exports.default = {
    pre: (element, context) => {
        const isHeaderRow = (element.attrs['class'] || '').indexOf('table-header-row') >= 0;
        if (isHeaderRow) {
            (0, utils_1.findElement)(element, 'WM-LABEL', (e) => {
                const classes = ('table-header-label ' + (e.attrs['class'] || '')).trim();
                e.setAttribute('class', classes);
            });
        }
        return `<WmGridrow ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmGridrow>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=gridrow.transformer.js.map
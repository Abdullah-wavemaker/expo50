"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmLayoutgrid', from: '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component' }
];
exports.default = {
    pre: (element, context) => {
        let classes = (element.attrs['class'] || '').split(' ');
        if (element.attrs['class']) {
            const stripIndex = classes.findIndex(c => c === 'table-striped');
            const hasStrip = stripIndex >= 0;
            if (hasStrip) {
                classes.splice(stripIndex, 1);
            }
            (0, utils_1.findElement)(element, 'WM-GRIDROW', (row, index) => {
                let rowClass = classes.map(c => c + '-row').join(' ');
                if (hasStrip) {
                    rowClass += ' table-striped-row' + (index % 2);
                }
                row.setAttribute('class', (rowClass + ' ' + (row.attrs['class'] || '')).trim());
                (0, utils_1.findElement)(row, 'WM-GRIDCOLUMN', (column) => {
                    column.setAttribute('class', (classes.map(c => c + '-cell').join(' ') + ' ' + (column.attrs['class'] || '')).trim());
                }, {
                    recursive: false
                });
            }, {
                recursive: false
            });
        }
        return `<WmLayoutgrid ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmLayoutgrid>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=layoutgrid.transformer.js.map
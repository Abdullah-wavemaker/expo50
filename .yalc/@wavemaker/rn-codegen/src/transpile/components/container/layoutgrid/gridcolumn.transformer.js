"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmGridcolumn', from: '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component' }
];
exports.default = {
    pre: (element, context) => {
        let classname = element.attrs['class'];
        if (classname) {
            let classes = classname.split(' ');
            classes.forEach(function (colClass) {
                if (colClass === 'bordered') {
                    colClass = 'column-bordered';
                }
            });
            element.setAttribute('class', classes.join(' '));
        }
        return `<WmGridcolumn ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmGridcolumn>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=gridcolumn.transformer.js.map
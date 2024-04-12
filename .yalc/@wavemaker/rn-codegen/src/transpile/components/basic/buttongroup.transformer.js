"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmButtongroup', from: '@wavemaker/app-rn-runtime/components/basic/buttongroup/buttongroup.component' }
];
exports.default = {
    pre: (element, context) => {
        let lastBtn = null;
        (0, utils_1.findElement)(element, 'WM-BUTTON', (n, i) => {
            lastBtn = n;
            let mClass = (n.attrs['class'] || '') + ' btn-group-child ';
            if (i === 0) {
                mClass += 'btn-group-first-child ';
            }
            n.setAttribute('class', mClass);
        });
        lastBtn ? lastBtn.setAttribute('class', (lastBtn.attrs['class'] || '') + ' btn-group-last-child') : null;
        return `<WmButtongroup ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmButtongroup>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=buttongroup.transformer.js.map
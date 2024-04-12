"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
const utils_1 = require("../../utils");
exports.imports = [
    { name: 'WmTime', from: '@wavemaker/app-rn-runtime/components/input/epoch/time/time.component' }
];
exports.default = {
    pre: (element, context) => {
        const replaceFnName = 'getTimeFormat';
        (0, utils_1.transformFormat)(element, 'timepattern', replaceFnName);
        (0, utils_1.transformFormat)(element, 'outputformat', replaceFnName, false);
        element.setAttribute('datepattern', element.getAttribute('timepattern') || '');
        element.removeAttribute('timepattern');
        return `<WmTime ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmTime>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=time.transformer.js.map
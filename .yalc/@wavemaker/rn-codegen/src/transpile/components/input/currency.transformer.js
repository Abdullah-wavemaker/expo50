"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmCurrency', from: '@wavemaker/app-rn-runtime/components/input/currency/currency.component' }
];
exports.default = {
    pre: (element, context) => {
        const replaceFnName = 'getCurrencySymbol';
        (0, utils_1.transformFormat)(element, 'currency', replaceFnName);
        return `<WmCurrency ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element) => '</WmCurrency>',
    imports: (element) => exports.imports
};
//# sourceMappingURL=currency.transformer.js.map
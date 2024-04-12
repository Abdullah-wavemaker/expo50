"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
const utils_1 = require("../../utils");
exports.imports = [
    { name: 'WmDatetime', from: '@wavemaker/app-rn-runtime/components/input/epoch/datetime/datetime.component' }
];
exports.default = {
    pre: (element, context) => {
        const replaceFnName = 'getDateTimeFormat';
        (0, utils_1.transformFormat)(element, 'datepattern', replaceFnName);
        (0, utils_1.transformFormat)(element, 'outputformat', replaceFnName, false);
        element.setAttribute('locale', `bind:fragment.appConfig.selectedLocale`);
        return `<WmDatetime ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmDatetime>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=datetime.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmCustom', from: '@wavemaker/app-rn-runtime/components/basic/custom/custom.component' }
];
exports.default = {
    pre: (element, context) => {
        var _a;
        for (let attr in element.attributes) {
            if (attr.includes('param')) {
                element.setAttribute((_a = (attr)) === null || _a === void 0 ? void 0 : _a.replace('param', ''), element.attributes[attr]);
                element.removeAttribute(attr);
            }
        }
        return `<WmCustom ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmCustom>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=custom.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmSlider', from: '@wavemaker/app-rn-runtime/components/input/slider/slider.component' }
];
exports.default = {
    pre: (element, context) => `<WmSlider ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmSlider>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=slider.transformer.js.map
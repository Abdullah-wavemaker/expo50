"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmCarouselContent', from: '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel-content/carousel-content.component' }
];
exports.default = {
    pre: (element, context) => `<WmCarouselContent ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmCarouselContent>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=carousel-content.transformer.js.map
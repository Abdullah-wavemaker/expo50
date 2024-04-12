"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const list_template_transformer_1 = __importDefault(require("../../data/list/list-template.transformer"));
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmCarouselTemplate', from: '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel-template/carousel-template.component' }
];
exports.default = {
    pre: (element, context) => `<WmCarouselTemplate ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmCarouselTemplate>',
    imports: (element, context) => exports.imports,
    createComponent: (e, context) => {
        return list_template_transformer_1.default.createComponent(e, context, 'carousel');
    }
};
//# sourceMappingURL=carousel-template.transformer.js.map
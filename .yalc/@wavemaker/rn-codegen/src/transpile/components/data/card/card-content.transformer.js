"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
const partial_container_transformer_1 = __importDefault(require("../../page/partial-container.transformer"));
exports.imports = [
    { name: 'WmCardContent', from: '@wavemaker/app-rn-runtime/components/data/card/card-content/card-content.component' }
];
exports.default = {
    pre: (element, context) => {
        let partial = partial_container_transformer_1.default.pre(element, context) || '';
        if (partial) {
            partial = `renderPartial={(props, onLoad) => (${partial})}`;
        }
        return `<WmCardContent ${(0, transpile_1.transformAttrs)(element, context)}  ${partial}>`;
    },
    post: (element, context) => '</WmCardContent>',
    imports: (element, context) => exports.imports.concat(partial_container_transformer_1.default.imports(element, context))
};
//# sourceMappingURL=card-content.transformer.js.map
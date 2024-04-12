"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const partial_container_transformer_1 = __importDefault(require("./partial-container.transformer"));
exports.imports = [
    { name: 'WmLeftPanel', from: '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component' }
];
exports.default = {
    pre: (element, context) => {
        let partial = partial_container_transformer_1.default.pre(element, context) || '';
        const widgetName = element.attrs['name'];
        if (partial) {
            partial = `renderPartial={(props, onLoad) => (${partial})}`;
        }
        return `<>{fragment.setDrawerContent((<ThemeProvider value={fragment.theme}><WmLeftPanel ${(0, transpile_1.transformAttrs)(element, context)} ${partial}>`;
    },
    post: (element, context) => `</WmLeftPanel></ThemeProvider>), '${element.attrs.animation || 'slide-in'}')}</>`,
    imports: (element, context) => exports.imports.concat(partial_container_transformer_1.default.imports(element, context))
};
//# sourceMappingURL=left-panel.transformer.js.map
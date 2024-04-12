"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
const partial_container_transformer_1 = __importDefault(require("../page/partial-container.transformer"));
exports.imports = [
    { name: 'WmPanel', from: '@wavemaker/app-rn-runtime/components/container/panel/panel.component' }
];
exports.default = {
    pre: (element, context) => {
        const widgetName = element.getAttribute('name');
        let partial = partial_container_transformer_1.default.pre(element, context) || '';
        if (partial) {
            partial = `renderPartial={(props, onLoad) => (${partial})}`;
        }
        const footerIndex = element.childNodes.findIndex(n => n instanceof node_html_parser_1.HTMLElement && n.tagName === 'WM-PANEL-FOOTER');
        if (footerIndex >= 0) {
            const content = (0, node_html_parser_1.parse)(`<wm-panel-content name="${widgetName}_content"></wm-panel-content>`).firstChild;
            const footer = element.childNodes.splice(footerIndex, 1)[0];
            content.childNodes = element.childNodes;
            element.childNodes = [
                content,
                footer
            ];
        }
        return `<WmPanel ${(0, transpile_1.transformAttrs)(element, context)} ${partial}>`;
    },
    post: (element, context) => '</WmPanel>',
    imports: (element, context) => exports.imports.concat(partial_container_transformer_1.default.imports(element, context)),
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=panel.transformer.js.map
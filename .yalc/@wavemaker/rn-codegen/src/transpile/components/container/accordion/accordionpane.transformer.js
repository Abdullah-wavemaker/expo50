"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../../transpile");
const partial_container_transformer_1 = __importDefault(require("../../page/partial-container.transformer"));
exports.imports = [
    { name: 'WmAccordionpane', from: '@wavemaker/app-rn-runtime/components/container/accordion/accordionpane/accordionpane.component' }
];
exports.default = {
    pre: (element, context) => {
        let partial = partial_container_transformer_1.default.pre(element, context) || '';
        const paneContent = (0, node_html_parser_1.parse)(`<wm-panecontent name="${element.getAttribute("name")}Content"></wm-panecontent>`).firstChild;
        paneContent.childNodes = element.childNodes;
        element.childNodes = [paneContent];
        if (partial) {
            partial = `renderPartial={(props, onLoad) => (${partial})}`;
        }
        element.setAttribute('key', element.getAttribute('title') || '');
        return `<WmAccordionpane memoize="false" ${(0, transpile_1.transformAttrs)(element, context)} ${partial}>`;
    },
    post: (element, context) => '</WmAccordionpane>',
    imports: (element, context) => exports.imports.concat(partial_container_transformer_1.default.imports(element, context))
};
//# sourceMappingURL=accordionpane.transformer.js.map
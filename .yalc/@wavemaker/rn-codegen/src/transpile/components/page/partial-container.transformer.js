"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = __importStar(require("node-html-parser"));
const html_entities_1 = require("html-entities");
const utils_1 = require("../../../utils");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmPartialContainer', from: '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component' }
];
exports.default = {
    pre: (element, context) => {
        let content = element.attributes['content'];
        if (content) {
            const params = {};
            Object.keys(element.attrs).forEach(k => {
                if (k !== 'name' && k !== 'show' && k != 'content') {
                    params[k] = element.attrs[k];
                }
            });
            element.childNodes
                .filter(node => node instanceof node_html_parser_1.HTMLElement && node.tagName === 'WM-PARAM')
                .forEach((node) => {
                const e = node;
                params[e.getAttribute('name') || ''] = e.getAttribute('value');
            });
            let paramStr = Object.keys(params)
                .filter(k => k !== 'on-load')
                .map(k => `${k}="${(0, html_entities_1.encode)(params[k])}"`).join(' ');
            paramStr = (0, transpile_1.transformAttrs)((0, node_html_parser_1.default)(`<wm-partial-container ${paramStr}/>`).firstChild, context, utils_1.inferTypeAndParseProperty);
            paramStr += ` name={props.name + '_partial_container'}`;
            paramStr += ` partial_name={props.name + '_partial'}`;
            paramStr += ` content={props.content}`;
            paramStr += ' serviceDefinitions={fragment.serviceDefinitions}';
            paramStr += ' parentWatcher={fragment.watcher}';
            if (context.isPartOfPrefab) {
                paramStr += ' prefab={fragment.prefab || fragment}';
            }
            return `<WmPartialContainer onLoad={onLoad} ${paramStr} themeToUse={fragment.theme}/>`;
        }
        return '';
    },
    post: (element, context) => '',
    imports: (element, context) => element.hasAttribute('content') ? exports.imports : []
};
//# sourceMappingURL=partial-container.transformer.js.map
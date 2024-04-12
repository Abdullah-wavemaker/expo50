"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const lodash_1 = require("lodash");
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmDialog', from: '@wavemaker/app-rn-runtime/components/dialogs/dialog/dialog.component' }
];
const applyAttr = (e, replace, replaceWith) => {
    Object.keys(e.attrs).forEach(k => {
        const v = e.getAttribute(k);
        if ((0, lodash_1.isString)(v)) {
            e.setAttribute(k, v.replace(replace, replaceWith));
        }
    });
    e.childNodes.forEach(c => c instanceof node_html_parser_1.HTMLElement && applyAttr(c, replace, replaceWith));
};
exports.default = {
    pre: (element, context) => {
        const widgetName = element.getAttribute('name');
        const content = new node_html_parser_1.HTMLElement('wm-dialogcontent', {}, null, element, [0, 41]);
        content.nodeType = node_html_parser_1.NodeType.ELEMENT_NODE;
        const actionsIndex = element.childNodes.findIndex(e => ((e instanceof node_html_parser_1.HTMLElement && e.tagName.toLowerCase() === 'wm-dialogactions')));
        content.childNodes = element.childNodes;
        element.childNodes = [content];
        if (actionsIndex >= 0) {
            const actions = content.childNodes.splice(actionsIndex, 1);
            actions && element.childNodes.push(actions[0]);
        }
        applyAttr(element, new RegExp('closeDialog\\(\\)', 'g'), `Widgets.${widgetName}.close()`);
        return `<WmDialog ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmDialog>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=dialog.transformer.js.map
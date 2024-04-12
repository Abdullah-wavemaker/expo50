"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const utils_1 = require("../utils");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmAccordion', from: '@wavemaker/app-rn-runtime/components/container/accordion/accordion.component' }
];
exports.default = {
    pre: (element, context) => {
        const widgetName = element.attrs['name'];
        let dataSet = element.getAttribute('dataset');
        if (dataSet && dataSet.startsWith('bind:') && element.getAttribute('type') === 'dynamic') {
            dataSet = dataSet.substring(5);
            const template = element.childNodes.find(c => c instanceof node_html_parser_1.HTMLElement);
            (0, utils_1.transformRepeatChildData)(template, dataSet + '[0]', 'repeat_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet + '[$i]', 'repeat_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet + '[fragment.$i]', 'repeat_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet + '[fragment.$i]', 'repeat_item');
            context.set('old_props', context.props);
            context.props = ['$item', '$index'];
            return `<WmAccordion ${(0, transpile_1.transformAttrs)(element, context)}>
        {fragment.eval(() => ${dataSet})?.map(($item, $index) => {
          return (
      `;
        }
        return `<WmAccordion ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => {
        if (element.getAttribute('type') === 'dynamic') {
            context.props = context.get('old_props');
            return ');})}</WmAccordion>';
        }
        return '</WmAccordion>';
    },
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => {
        context.props = [];
        return (0, transpile_1.createComponent)(element, context);
    }
};
//# sourceMappingURL=accordion.transformer.js.map
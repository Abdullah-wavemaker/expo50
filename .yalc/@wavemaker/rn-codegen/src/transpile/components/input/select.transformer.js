"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmSelect', from: '@wavemaker/app-rn-runtime/components/input/select/select.component' }
];
const getOnChangeExpr = (element) => {
    const onChange = element.getAttribute('on-change');
    return onChange ? `
    ($event, widget, newVal, oldVal) => {
      ${onChange}
    }
  ` : '';
};
exports.default = {
    pre: (element, context) => {
        let getDisplayExpression;
        //supportedLocale select widget handling
        const dataSet = element.getAttribute('dataset') || '';
        let onChange;
        if (dataSet.indexOf('supportedLocale') > -1) {
            element.setAttribute('datafield', 'dataValue');
            element.setAttribute('displayfield', 'displayValue');
            onChange = getOnChangeExpr(element);
            element.removeAttribute('on-change');
            element.setAttribute('datavalue', 'bind:fragment.appConfig.selectedLocale');
        }
        else {
            getDisplayExpression = (0, transpile_1.createExpression)(element, 'displayexpression');
            if (getDisplayExpression) {
                element.removeAttribute('displayexpression');
            }
            onChange = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-change');
        }
        return `<WmSelect ${(0, transpile_1.transformAttrs)(element, context)}
      ${onChange ? `onChange={${onChange}}` : ''}
      ${getDisplayExpression ? `getDisplayExpression=${getDisplayExpression}` : ''}>`;
    },
    post: (element, context) => '</WmSelect>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=select.transformer.js.map
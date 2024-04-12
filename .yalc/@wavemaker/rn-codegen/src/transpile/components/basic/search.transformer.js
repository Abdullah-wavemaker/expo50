"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmSearch', from: '@wavemaker/app-rn-runtime/components/basic/search/search.component' }
];
const getDatasetVariable = (element) => {
    const dataset = element.getAttribute('dataset');
    if (dataset) {
        const variableArr = dataset.match(/(fragment)+\.Variables\.[^\.]+/g);
        if (variableArr && variableArr.length) {
            return variableArr[0];
        }
    }
};
const getUpdateRequiredExpr = (element) => {
    let variable = getDatasetVariable(element);
    if (variable) {
        return `() => ${variable} && ${variable}.config?.serviceInfo?.parameters.length`;
    }
};
const getSearchSubmitExpr = (element) => {
    let variable = getDatasetVariable(element);
    if (variable) {
        return `(params, success, error) => {
        ${variable} && ${variable}.setInput(params);
        return ${variable}.invoke();
      }`;
    }
};
exports.default = {
    pre: (element, context) => {
        let getDisplayExpression = (0, transpile_1.createExpression)(element, 'displayexpression') || (0, transpile_1.createExpression)(element, 'displaylabel');
        if (getDisplayExpression) {
            element.removeAttribute('displayexpression');
            element.removeAttribute('displaylabel');
        }
        let displayimagesrc = element.getAttribute('displayimagesrc');
        let getDisplayimagesrc = null;
        if (displayimagesrc && displayimagesrc.startsWith('bind:') && !displayimagesrc.startsWith('bind:$formField')) {
            getDisplayimagesrc = (0, transpile_1.createExpression)(element, 'displayimagesrc');
            element.removeAttribute('displayimagesrc');
        }
        if (element.getAttribute('type') === 'autocomplete') {
            const classname = element.getAttribute('class') || '';
            element.setAttribute('class', `app-autocomplete ${classname}`);
        }
        const onSelect = (0, utils_1.getOnChangeExprforFormWidget)(element, 'on-select');
        const onQuerySearch = getSearchSubmitExpr(element);
        const isUpdateRequired = getUpdateRequiredExpr(element);
        return `<WmSearch ${(0, transpile_1.transformAttrs)(element, context)}
      ${(0, utils_1.getRenderItemPartial)()}
      ${onQuerySearch ? `onQuerySearch={${onQuerySearch}}` : ''}
      ${isUpdateRequired ? `isUpdateRequired={${isUpdateRequired}}` : ''}
      ${getDisplayExpression ? `getDisplayExpression=${getDisplayExpression} ` : ''}
      ${getDisplayimagesrc ? `displayimagesrc=${getDisplayimagesrc} ` : ``} ${onSelect ? `onSelect={${onSelect}}` : ''}>`;
    },
    post: (element, context) => '</WmSearch>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=search.transformer.js.map
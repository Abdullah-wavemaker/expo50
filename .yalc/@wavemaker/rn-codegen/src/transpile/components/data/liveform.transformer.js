"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const lodash_1 = require("lodash");
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLiveForm', from: '@wavemaker/app-rn-runtime/components/data/liveform/liveform.component' }
];
const getDataSetExpr = (element, bindExpr) => {
    return element.getAttribute('isLogin') ? '' : `${bindExpr}[widget.props.name] = newVal;`;
};
const getOnChangeExpr = (element) => {
    var _a;
    const formDataSet = ((_a = element.getAttribute('dataset')) === null || _a === void 0 ? void 0 : _a.split(':')) || [];
    let bindExpr = (formDataSet === null || formDataSet === void 0 ? void 0 : formDataSet.length) > 1 ? formDataSet[1] : null;
    if (!bindExpr || (bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.includes('Widgets'))) {
        return '';
    }
    let currentNode = element.parentNode, exp;
    const variableArr = bindExpr.match(/(fragment)+\.Variables\.[^\.]+/g);
    const variableName = (variableArr && variableArr.length) ? variableArr[0] : null;
    while (currentNode) {
        if (currentNode.rawTagName === 'wm-liveform') {
            element.setAttribute('parentForm', currentNode.getAttribute('name') || '');
            // assigning child form name.
            element.setAttribute('childdatasetnode', element.getAttribute('name') || '');
            break;
        }
        currentNode = currentNode.parentNode;
    }
    return `
      ($event, widget, newVal, oldVal) => {
        if(${variableName}?.twoWayBinding && newVal !== oldVal) {
          ${bindExpr !== null ? getDataSetExpr(element, bindExpr) : ''}
        }
      }
    `;
};
const getFormSubmitExpr = (element) => {
    const dataset = element.getAttribute('dataset');
    if (dataset) {
        const variableArr = dataset.match(/(fragment)+\.Variables\.[^\.]+/g);
        if (variableArr && variableArr.length) {
            let variable = variableArr[0];
            return `
      (formData, operationType, success, error) => {
        if (${variable}) {
            switch (operationType) {
                case 'insert':
                    return ${variable}.insertRecord(formData, success, error);
                case 'update':
                    return ${variable}.updateRecord(formData, success, error);
                case 'delete':
                    return ${variable}.deleteRecord(formData, success, error);
                default:
                    return ${variable}.listRecords(formData, success, error);
            }
        }
      }
    `;
        }
    }
};
const getFormSuccessExpr = (element) => {
    const dataset = element.getAttribute('dataset');
    if (dataset) {
        const variableArr = dataset.match(/(fragment)+\.Variables\.[^\.]+/g);
        if (variableArr && variableArr.length) {
            let variable = variableArr[0];
            return `
              (formData, success, error) => {
                ${variable} && ${variable}.listRecords(formData, success, error);
              }
            `;
        }
    }
};
const getRelatedTableData = (element) => {
    const dataset = element.getAttribute('dataset');
    if (dataset) {
        const variableArr = dataset.match(/(fragment)+\.Variables\.[^\.]+/g);
        if (variableArr && variableArr.length) {
            let variable = variableArr[0];
            return `
              (formField) => {
                ${variable} && ${variable}.execute("getRelatedTableData", {
                relatedField: formField.state.props.formKey,
                pagesize: formField.limit,
                orderBy: formField.orderby ? _.replace(formField.orderby, /:/g, ' ') : '',
                filterFields: {},
                filterExpr: formField.filterexpressions ? formField.filterexpressions : {}
            }).then(response => {
                primaryKeys = ${variable}.execute("getRelatedTablePrimaryKeys", formField.state.props.formKey);
                displayField = primaryKeys.length < 0 ? undefined : primaryKeys[0];
                formField.updateFormWidgetDataset(response, displayField);
            });
              }
            `;
        }
    }
};
const removeFormActionNodes = (element) => {
    if (element.childNodes.length) {
        (0, lodash_1.forEach)(element.childNodes, (n) => {
            if (n instanceof node_html_parser_1.HTMLElement && n.rawTagName === 'wm-form-action') {
                n.remove();
            }
            else {
                removeFormActionNodes(n);
            }
        });
    }
};
const setFormActions = (element, context) => {
    const formActions = element.querySelectorAll('wm-form-action');
    const formFooter = (0, node_html_parser_1.parse)(`<wm-form-footer></wm-form-footer>`).firstChild;
    var btnMarkup;
    removeFormActionNodes(element);
    formActions.forEach((formAction) => {
        formAction.setAttribute('formKey', element.attrs['name']);
        formFooter.appendChild(formAction);
    });
    const formBody = (0, node_html_parser_1.parse)(`<wm-form-body></wm-form-body>`).firstChild;
    formBody.childNodes = element.childNodes;
    element.childNodes = [formBody];
    if (formActions.length) {
        element.childNodes.push(formFooter);
    }
};
exports.default = {
    pre: (element, context) => {
        const onChange = getOnChangeExpr(element);
        const formSubmit = getFormSubmitExpr(element);
        const formSuccess = getFormSuccessExpr(element);
        const relatedData = getRelatedTableData(element);
        setFormActions(element, context);
        return `<WmLiveForm ${(0, transpile_1.transformAttrs)(element, context)} 
      ${onChange ? `onChange={${onChange}}` : ''}
      ${formSuccess ? `formSuccess={${formSuccess}}` : ''}
      ${relatedData ? `relatedData={${relatedData}}` : ''}
      ${formSubmit ? `formSubmit={${formSubmit}}` : ''}>`;
    },
    post: (element, context) => `</WmLiveForm>`,
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=liveform.transformer.js.map
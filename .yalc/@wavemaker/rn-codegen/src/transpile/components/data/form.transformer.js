"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const lodash_1 = require("lodash");
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmForm', from: '@wavemaker/app-rn-runtime/components/data/form/form.component' }
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
        if (currentNode.rawTagName === 'wm-form') {
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
      (formData, success, error) => {
        ${variable} && 
        ${variable}.invoke(formData, success, error);
      }
    `;
        }
    }
};
const pluckFormActionNodes = (element, actions = []) => {
    if (element.childNodes.length) {
        (0, lodash_1.forEach)(element.childNodes, (n) => {
            if (n instanceof node_html_parser_1.HTMLElement && n.rawTagName === 'wm-form') {
                return;
            }
            else if (n instanceof node_html_parser_1.HTMLElement && n.rawTagName === 'wm-form-action') {
                actions.push(n);
                n.remove();
            }
            else {
                pluckFormActionNodes(n, actions);
            }
        });
        return actions;
    }
};
const setFormActions = (element, context) => {
    const formActions = pluckFormActionNodes(element);
    const formFooter = (0, node_html_parser_1.parse)(`<wm-form-footer></wm-form-footer>`).firstChild;
    var btnMarkup;
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
const getBeforeRenderEx = (element) => {
    const beforeRender = element.getAttribute('on-beforerender');
    return beforeRender ? `($metadata, widget) =>{return ${beforeRender}}` : '';
};
exports.default = {
    pre: (element, context) => {
        const onChange = getOnChangeExpr(element);
        const formSubmit = getFormSubmitExpr(element);
        const beforeRender = getBeforeRenderEx(element);
        element.removeAttribute('on-beforerender');
        let generateComponent;
        if (element.getAttribute('metadata')) {
            generateComponent = `generateComponent={(metadata, formName) => {return dynamicForm(metadata, formName, fragment);}
      }`;
        }
        setFormActions(element, context);
        return `<WmForm ${(0, transpile_1.transformAttrs)(element, context)} 
      ${onChange ? `onChange={${onChange}}` : ''}
      ${formSubmit ? `formSubmit={${formSubmit}}` : ''}
      ${beforeRender ? `onBeforerender={${beforeRender}}` : ''}
      ${generateComponent || ''}>`;
    },
    post: (element, context) => `</WmForm>`,
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=form.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmFormField', from: '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component' }
];
const getAttribute = (element, attrName) => {
    const value = element.getAttribute(attrName);
    return value === null || value === void 0 ? void 0 : value.replace(/"/g, '&quot;');
};
const getStyleProps = (element) => {
    const attributes = ['fontsize', 'fontweight', 'color', 'textalign', 'fontfamily', 'textdecoration', 'fontstyle'];
    return attributes.reduce((propsString, attr) => {
        const value = getAttribute(element, attr);
        if (value !== undefined) {
            propsString += `${attr}=${value} `;
        }
        return propsString;
    }, '');
};
const extractField = (element, context, formElement) => {
    const widgetType = getAttribute(element, 'widget') || 'text';
    const widgetName = getAttribute(element, 'key') || getAttribute(element, 'name') || 'text' + '_formWidget';
    return getFormWidgetTemplate(widgetType, widgetName, element, getAttribute(formElement, 'formdata'));
};
const getFormWidgetTemplate = (widgetType, widgetName, element, formDataVariable) => {
    widgetName = widgetName.replace('.', '_');
    var labelMarkup = getAttribute(element, 'displayname') ? `<wm-label 
    caption="bind:$formField.displayname"
    class="form-label ${widgetName}_formLabel"
    memoize="false"
    required="bind:$formField.required"
    name="${widgetName}_formLabel"></wm-label>` : '';
    const onFocus = getAttribute(element, 'on-focus');
    if (onFocus) {
        element.removeAttribute('on-focus');
    }
    const onBlur = getAttribute(element, 'on-blur');
    if (onBlur) {
        element.removeAttribute('on-blur');
    }
    const onTap = getAttribute(element, 'on-tap');
    if (onTap) {
        element.removeAttribute('on-tap');
    }
    const placeholder = getAttribute(element, 'placeholder');
    if (placeholder) {
        element.removeAttribute('placeholder');
    }
    const formfieldName = getAttribute(element, 'name');
    var commonFields = `name="${widgetName}"
                      formfieldname="${formfieldName}"
                      formfield="true"
                      memoize="false"
                      required="bind:$formField.required"
                      regexp="bind:$formField.regexp"
                      validationmessage="bind:$formField.validationmessage"
                      datavalue="bind:$formField.defaultvalue"
                      disabled="bind:$formField.disabled"
                      readonly="bind:$formField.readonly"
                      class="form-input form-${widgetType} form-${widgetName}-input"
                      ${placeholder ? 'placeholder="' + placeholder + '"' : ''}
                      ${onFocus ? 'on-focus=' + onFocus : ''}
                      ${onBlur ? 'on-blur=' + onBlur : ''}
                      ${onTap ? 'on-tap=' + onTap : ''}`;
    var widgetMarkup = getWidgetMarkup(widgetType, widgetName, commonFields, element);
    return { label: labelMarkup ? (0, node_html_parser_1.parse)(labelMarkup).firstChild : null, field: (0, node_html_parser_1.parse)(widgetMarkup).firstChild };
};
const getWidgetMarkup = (widgetType, widgetName, commonFields, element) => {
    let tmpl = '';
    const getDisplayExpr = element.getAttribute('displayexpression') || element.getAttribute('displaylabel');
    const displayExp = getDisplayExpr ? `displayexpression='${getDisplayExpr}'` : '';
    switch (widgetType) {
        case 'text':
        case 'password':
            let inputtype = widgetType === 'password' ? 'password' : getAttribute(element, 'inputtype');
            inputtype = inputtype ? `type=${inputtype}` : '';
            tmpl = `<wm-text ${inputtype} ${commonFields} 
                updateon="bind:$formField.updateon || 'blur'"
                maxchars="bind:$formField.maxchars"
                ${getStyleProps(element)}
                ></wm-text>`;
            break;
        case 'textarea':
            tmpl = `<wm-textarea ${commonFields}
                updateon="bind:$formField.updateon || 'blur'"
                maxchars="bind:$formField.maxchars">
                ${getStyleProps(element)}
              </wm-textarea>`;
            break;
        case 'number':
            tmpl = `<wm-number ${commonFields}
                updateon="bind:$formField.updateon || 'blur'"
                minvalue="bind:$formField.minvalue"
                maxvalue="bind:$formField.maxvalue">
                ${getStyleProps(element)}
              </wm-number>`;
            break;
        case 'currency':
            tmpl = `<wm-currency ${commonFields}
                  updateon="bind:$formField.updateon || 'blur'"
                  minvalue="bind:$formField.minvalue"
                  maxvalue="bind:$formField.maxvalue">
                  ${getStyleProps(element)}
                </wm-currency>`;
            break;
        case 'select':
            tmpl = `<wm-select ${commonFields} ${displayExp}
                dataset="bind:$formField.dataset"
                displayfield="bind:$formField.displayfield"
                datafield="bind:$formField.datafield"
                class="form-widget-select"
                ${getStyleProps(element)}
              ></wm-select>`;
            break;
        case 'autocomplete':
            tmpl = `<wm-search ${commonFields} ${displayExp}
                type="autocomplete"
                limit="bind:$formField.limit"
                displayimagesrc="bind:$formField.displayimagesrc"
                searchkey="bind:$formField.searchkey"
                showclear="bind:$formField.showclear || false"
                dataset="bind:$formField.dataset"
                displayfield="bind:$formField.displaylabel"
                datafield="bind:$formField.datafield"
                ${getStyleProps(element)}
                ></wm-search>`;
            break;
        case 'chips':
            tmpl = `<wm-chips ${commonFields} ${displayExp}
                minchars="bind:$formField.minchars || 1"
                maxsize="bind:$formField.maxsize"
                displayimagesrc="bind:$formField.displayimagesrc"
                searchkey="bind:$formField.searchkey"
                dataset="bind:$formField.dataset || 'Option 1, Option 2, Option 3'"
                displayfield="bind:$formField.displayfield"
                datafield="bind:$formField.datafield"
                ></wm-chips>`;
            break;
        case 'checkbox':
            tmpl = `<wm-checkbox ${commonFields}
                  caption="bind:$formField.caption"
                  checkedvalue="bind:$formField.checkedvalue || true"
                  uncheckedvalue="bind:$formField.uncheckedvalue || false">
              </wm-checkbox>`;
            break;
        case 'checkboxset':
            tmpl = `<wm-checkboxset ${commonFields} ${displayExp}
                dataset="bind:$formField.dataset || 'Option 1, Option 2, Option 3'"
                displayfield="bind:$formField.displayfield"
                datafield="bind:$formField.datafield"
              ></wm-checkboxset>`;
            break;
        case 'toggle':
            tmpl = `<wm-toggle ${commonFields}
                type="toggle"
                checkedvalue="bind:$formField.checkedvalue || true"
                uncheckedvalue="bind:$formField.uncheckedvalue || false">
              </wm-toggle>`;
            break;
        case 'switch':
            tmpl = `<wm-switch ${commonFields} ${displayExp}
                dataset="bind:$formField.dataset || 'yes, no, maybe'"
                displayfield="bind:$formField.displayfield"
                datafield="bind:$formField.datafield"
              ></wm-switch>`;
            break;
        case 'radioset':
            tmpl = `<wm-radioset ${commonFields} ${displayExp}
                dataset="bind:$formField.dataset || 'Option 1, Option 2, Option 3'"
                displayfield="bind:$formField.displayfield"
                datafield="bind:$formField.datafield"
              ></wm-radioset>`;
            break;
        case 'date':
            tmpl += `<wm-date ${commonFields}
                mindate="bind:$formField.mindate"
                maxdate="bind:$formField.maxdate"
                datepattern="bind:$formField.datepattern"
                outputformat="bind:$formField.outputformat"
                ></wm-date>`;
            break;
        case 'datetime':
        case 'timestamp':
            tmpl = `<wm-datetime ${commonFields}
                mindate="bind:$formField.mindate"
                maxdate="bind:$formField.maxdate"
                datepattern="bind:$formField.datepattern"
                outputformat="bind:$formField.outputformat"
                ></wm-datetime>`;
            break;
        case 'time':
            tmpl += `<wm-time ${commonFields} 
                timepattern="bind:$formField.timepattern"
                outputformat="bind:$formField.outputformat"
                ></wm-time>`;
            break;
        case 'slider':
            tmpl += `<wm-slider ${commonFields} 
                minvalue="bind:$formField.minvalue || 0"
                maxvalue="bind:$formField.maxvalue || 100"
                step="bind:$formField.step || 1"
                ></wm-slider>`;
            break;
        case 'rating':
            let showcaptions = getAttribute(element, 'showcaptions');
            showcaptions = showcaptions ? `showcaptions="bind:$formField.showcaptions"` : '';
            tmpl += `<wm-rating ${commonFields} ${displayExp}
                ${getAttribute(element, 'dataset') ? 'dataset="bind:$formField.dataset"' : ''}
                displayfield="bind:$formField.displayfield || 'value'"
                datafield="bind:$formField.datafield || 'key'"
                ${showcaptions}
                maxvalue="bind:$formField.maxvalue || 5"
                ></wm-rating>`;
            break;
    }
    return tmpl;
};
exports.default = {
    pre: (element, context) => {
        const listName = context.data.listname;
        let currentNode = element.parentNode;
        while (currentNode) {
            if (currentNode.rawTagName === 'wm-form' || currentNode.rawTagName === 'wm-liveform' || currentNode.getAttribute('type') === "dynamic") {
                break;
            }
            currentNode = currentNode.parentNode;
        }
        let formName, formScope;
        if (currentNode.getAttribute('type') === "dynamic") {
            formName = currentNode.getAttribute('dynamicForm');
            formScope = `formScope={() => fragment.Widgets.${formName}}`;
        }
        else {
            formName = currentNode.getAttribute('name');
        }
        // @ts-ignore
        element.setAttribute('formRef', formName);
        element.setAttribute('primaryKey', element.attrs['primary-key']);
        element.removeAttribute('primary-key');
        element.setAttribute('isRelated', element.attrs['is-related']);
        element.removeAttribute('is-related');
        if (element.getAttribute('dataset')) {
            element.setAttribute('isDataSetBound', "true");
        }
        const validate = `widget.validateFormField.call(widget);`;
        let onChange = element.getAttribute('on-change') || '';
        onChange = listName ? `list.itemWidgets[$index].${currentNode.getAttribute('name')} && list.itemWidgets[$index].${currentNode.getAttribute('name')}.props.onChange && list.itemWidgets[$index].${currentNode.getAttribute('name')}.props.onChange($event, widget, newVal, oldVal);` + onChange
            : `fragment.Widgets.${currentNode.getAttribute('name')} && fragment.Widgets.${currentNode.getAttribute('name')}.props.onChange && fragment.Widgets.${currentNode.getAttribute('name')}.props.onChange($event, widget, newVal, oldVal);` + onChange;
        element.setAttribute('on-change', onChange);
        const formField = extractField(element, context, currentNode);
        if (formField.label) {
            element.childNodes.push(formField.label);
        }
        element.childNodes.push(formField.field);
        element.removeAttribute('datavalue');
        element.removeAttribute('height');
        element.setAttribute('on-validate', validate);
        const childDatasetNode = currentNode.getAttribute('childdatasetnode');
        if (childDatasetNode) {
            element.setAttribute('formKey', childDatasetNode + '.' + element.attrs['name']);
        }
        else {
            element.setAttribute('formKey', element.attrs['key'] || element.attrs['name']);
        }
        element.removeAttribute('key');
        return `<WmFormField ${formScope || ''} ${(0, transpile_1.transformAttrs)(element, context)} renderFormFields={($formField) => (<>`;
    },
    post: (element, context) => '</>)}></WmFormField>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=form-field.transformer.js.map
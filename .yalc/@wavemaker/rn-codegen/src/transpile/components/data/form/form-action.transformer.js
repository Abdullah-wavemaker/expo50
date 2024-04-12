"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmFormAction', from: '@wavemaker/app-rn-runtime/components/data/form/form-action/form-action.component' }
];
const getFormActionExpr = (action) => {
    return `($event) => {
        ${action}
    }`;
};
exports.default = {
    pre: (element, context) => {
        const listName = context.data.listname;
        element.setAttribute('displayName', element.attrs['display-name']);
        element.removeAttribute('display-name');
        element.removeAttribute('key');
        const updateMode = element.attrs['update-mode'];
        updateMode && element.setAttribute('updateMode', updateMode);
        element.removeAttribute('update-mode');
        const formName = element.getAttribute('formKey') || element.attrs['key'] || element.attrs['name'];
        const actionType = element.getAttribute('type');
        let action = element.getAttribute('action');
        let btnClass = 'btn-default';
        if (actionType === 'submit') {
            btnClass = 'btn-primary';
            action = listName ? action = `list.itemWidgets[$index].${formName}.submit();` + (action || '') : `Widgets.${formName}.submit();` + (action || '');
        }
        if (actionType === 'reset') {
            action = listName ? `list.itemWidgets[$index].${formName}.formreset()` + (action || '') : `Widgets.${formName}.formreset();` + (action || '');
        }
        if (action) {
            action = action.endsWith(';') ? action.substring(0, action.length - 1) : action;
            action = action.split(';').map(s => {
                if (s === 'reset()') {
                    return listName ? `list.itemWidgets[$index].${formName}.formreset()` : `fragment.Widgets.${formName}.formreset()`;
                }
                else if (s === 'edit()' || s === 'new()' || s === 'cancel()' || s === 'delete()') {
                    return listName ? `list.itemWidgets[$index].${formName}.` + s : `fragment.Widgets.${formName}.` + s;
                }
                else {
                    return listName ? s : 'fragment.' + s;
                }
            }).join(';');
            element.setAttribute('action', `()=> ${action}`);
        }
        element.setAttribute('btnClass', btnClass);
        element.removeAttribute('type');
        element.setAttribute('name', formName + '_' + actionType + '_formAction');
        return `<WmFormAction ${(0, transpile_1.transformAttrs)(element, context)}
            ${action && actionType ? `formAction={${getFormActionExpr(action)}}` : ''} >`;
    },
    post: (element, context) => '</WmFormAction>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=form-action.transformer.js.map
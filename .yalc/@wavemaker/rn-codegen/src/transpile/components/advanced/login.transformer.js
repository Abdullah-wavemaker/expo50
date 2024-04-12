"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLogin', from: '@wavemaker/app-rn-runtime/components/advanced/login/login.component' }
];
const getOnLoginExpr = () => {
    return `
      (formData, success, error) => {
        fragment.Actions.loginAction.invoke({formData},
          success, error);
      }
    `;
};
const setAction = (element, form) => {
    const formactions = element.querySelectorAll('wm-form-action');
    formactions.forEach((formAction) => {
        const actionType = formAction.getAttribute('type');
        let action = formAction.getAttribute('action');
        if (actionType === 'submit') {
            formAction.setAttribute('action', 'Widgets.loginForm.doLogin(fragment.Widgets.' + form[0].attrs['name'] + '.dataoutput)' + (action || ''));
        }
    });
};
exports.default = {
    pre: (element, context) => {
        const form = element.querySelectorAll('wm-form');
        form.forEach((formRef) => {
            formRef.setAttribute('isLogin', 'true');
        });
        setAction(element, form);
        return `<WmLogin ${(0, transpile_1.transformAttrs)(element, context)} ${`onLogin={${getOnLoginExpr()}}`}>`;
    },
    post: (element, context) => '</WmLogin>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=login.transformer.js.map
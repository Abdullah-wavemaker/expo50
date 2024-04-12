"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmWizardstep', from: '@wavemaker/app-rn-runtime/components/container/wizard/wizardstep/wizardstep.component' }
];
const getOnNext = (element) => {
    const onNext = element.getAttribute('on-next');
    return onNext ? `(widget, currentStep, stepIndex) =>{return ${onNext}}` : '';
};
const getOnPrev = (element) => {
    const onPrev = element.getAttribute('on-prev');
    return onPrev ? `(widget, currentStep, stepIndex) =>{return ${onPrev}}` : '';
};
exports.default = {
    pre: (element, context) => {
        const onNext = getOnNext(element);
        const onPrev = getOnPrev(element);
        element.removeAttribute('on-next');
        element.removeAttribute('on-prev');
        const paneContent = (0, node_html_parser_1.parse)(`<wm-panecontent name="${element.getAttribute("name")}Content"></wm-panecontent>`).firstChild;
        paneContent.childNodes = element.childNodes;
        element.childNodes = [paneContent];
        return `<WmWizardstep ${(0, transpile_1.transformAttrs)(element, context)}
    ${onNext ? `onNext={${onNext}}` : ''} ${onPrev ? `onPrev={${onPrev}}` : ''}>`;
    },
    post: (element, context) => '</WmWizardstep>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=wizardstep.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmAppNavbar', from: '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component' }
];
const widgetClass = {
    'WM-ANCHOR': 'navbarAnchorItem',
    'WM-MENU': 'navbarMenu',
    'WM-POPOVER': 'navbarPopover',
    'WM-BUTTON': 'navbarButton'
};
const addClass = (element) => {
    const defaultClass = widgetClass[element.tagName];
    if (!defaultClass) {
        return;
    }
    let classname = element.getAttribute('class');
    if (!classname) {
        classname = defaultClass;
    }
    if (!classname.includes(defaultClass)) {
        classname = defaultClass + ' ' + classname;
    }
    element.setAttribute('class', classname);
};
exports.default = {
    pre: (element, context) => {
        element.childNodes.forEach(n => n instanceof node_html_parser_1.HTMLElement && addClass(n));
        if (!element.hasAttribute('on-backbtnclick')) {
            element.setAttribute('on-backbtnclick', 'fragment.goBack()');
        }
        element.setAttribute('on-drawerbuttonpress', 'fragment.toggleDrawer()');
        return `<WmAppNavbar ${(0, transpile_1.transformAttrs)(element, context)} showDrawerButton={fragment.hasDrawer}>`;
    },
    post: (element, context) => '</WmAppNavbar>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=appnavbar.transformer.js.map
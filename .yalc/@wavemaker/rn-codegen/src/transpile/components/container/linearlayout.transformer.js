"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const lodash_1 = require("lodash");
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmLinearlayout', from: '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component' }
];
const SPACING_KEY = 'parentLinearLayout.spacing';
const addSpacing = (element, context) => {
    let spacing = element.attrs['spacing'];
    spacing = !spacing || spacing === '0' ? context.get(SPACING_KEY) : spacing;
    let styleName = 'marginLeft';
    const direction = element.attrs['direction'] || 'row';
    const isHorizontal = direction.startsWith('row');
    if (spacing) {
        const reverse = direction.indexOf('reverse') > 0;
        if (isHorizontal && reverse) {
            styleName = 'marginRight';
        }
        else if (!isHorizontal && reverse) {
            styleName = 'marginBottom';
        }
        else if (!isHorizontal) {
            styleName = 'marginTop';
        }
        context.set(SPACING_KEY, spacing);
    }
    element.childNodes.filter(c => {
        if (c instanceof node_html_parser_1.HTMLElement) {
            const e = c;
            return e.tagName === 'WM-LINEARLAYOUTITEM';
        }
        return false;
    }).forEach((c, i) => {
        const e = c;
        i && spacing && e.setAttribute(styleName, spacing);
        if (!isHorizontal && !e.hasAttribute('width')) {
            e.setAttribute('width', '100%');
        }
        if (e.attrs['width'] === 'auto') {
            e.removeAttribute('width');
        }
        if (e.attrs['height'] === 'auto') {
            e.removeAttribute('height');
        }
    });
};
exports.default = {
    pre: (element, context) => {
        addSpacing(element, context);
        return `<WmLinearlayout ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmLinearlayout>',
    imports: (element, context) => exports.imports,
    isStyleProperty: (propName, element, context) => {
        return !(0, lodash_1.includes)(['horizontalalign', 'verticalalign'], propName);
    }
};
//# sourceMappingURL=linearlayout.transformer.js.map
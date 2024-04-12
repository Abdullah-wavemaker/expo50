"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAttrs = void 0;
const transpile_1 = require("../../transpile");
const PROPS = ['itemlabel', 'itemlink', 'itemicon', 'itembadge', 'isactive'];
const transformAttrs = (element, context) => {
    const props = PROPS.map((p, i) => [p, (0, transpile_1.createExpression)(element, p) || (element.getAttribute(p) && `'${element.getAttribute(p)}'`)])
        .filter(p => !!p[1]);
    props.forEach(p => p[0] && element.removeAttribute(p[0]));
    return (0, transpile_1.transformAttrs)(element, context) + props.map(p => `${p[0]}=${p[1]}`).join(' ');
};
exports.transformAttrs = transformAttrs;
//# sourceMappingURL=basenav.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmWebview', from: '@wavemaker/app-rn-runtime/components/advanced/webview/webview.component' }
];
exports.default = {
    pre: (element, context) => {
        if (element.attrs['webviewsrc']) {
            element.setAttribute('src', element.attrs['webviewsrc']);
            element.removeAttribute('webviewsrc');
        }
        return `<WmWebview ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmWebview>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=webview.transformer.js.map
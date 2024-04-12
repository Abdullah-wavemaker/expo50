"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmPage', from: '@wavemaker/app-rn-runtime/components/page/page.component' }
];
exports.default = {
    pre: (element, context) => {
        let hasClippedTabbar = false;
        (0, utils_1.findElement)(element, 'WM-MOBILE-TABBAR', (e) => {
            const classname = e.getAttribute('class');
            hasClippedTabbar = !!(classname === null || classname === void 0 ? void 0 : classname.split(' ').find(v => (v === 'clipped-tabbar')));
        }, {
            recursive: true
        });
        if (hasClippedTabbar) {
            (0, utils_1.findElement)(element, 'WM-PAGE-CONTENT', (e) => {
                const tabbarspacer = (0, node_html_parser_1.parse)(`<wm-container
            name="tabbarSpacer"
            class="app-tabbar tabbar-spacer">
          </wm-container>`).firstChild;
                e.appendChild(tabbarspacer);
            }, {
                recursive: true
            });
        }
        return `<WmPage ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmPage>',
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context)
};
//# sourceMappingURL=page.transformer.js.map
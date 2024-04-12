"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmTabbar', from: '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component' }
];
exports.default = {
    pre: (element, context) => `<WmTabbar
    ${(0, transpile_1.transformAttrs)(element, context)}
    getDisplayExpression={(label) => label && (fragment.appLocale[label.trim()] || label)} 
    isActive={(item) => fragment.appConfig.currentPage?.isActiveTabbarItem({
      label: item.label, 
      link: item.link,
      links: [...(item.childnavigation ? item.childnavigation.map(i => i.link): []), item.link]
    })}
    activePage={fragment.appConfig.currentPage.pageName}>`,
    post: (element, context) => '</WmTabbar>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=tabbar.transformer.js.map
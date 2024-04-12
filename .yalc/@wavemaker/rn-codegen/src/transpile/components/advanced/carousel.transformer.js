"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmCarousel', from: '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel.component' }
];
exports.default = {
    pre: (element, context) => {
        const type = element.attrs['type'];
        let renderSlide = null;
        if (type === 'dynamic') {
            const widgetName = element.attrs['name'];
            const template = element.childNodes.find(c => c instanceof node_html_parser_1.HTMLElement);
            let dataSet = element.getAttribute('dataset');
            if (dataSet && dataSet.startsWith('bind:')) {
                (0, utils_1.transformRepeatChildAttr)(template, `fragment.Widgets.${widgetName}.currentItemWidgets`, 'currentItemWidgets');
                (0, utils_1.transformRepeatChildAttr)(template, `fragment.Widgets.${widgetName}.currentItem`, '$item');
                (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[0]', 'carousel_item');
                (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[$i]', 'carousel_item');
                (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[fragment.$i]', 'carousel_item');
            }
            renderSlide = `renderSlide={($item, $index, carousel) => { const item = $item; const currentItemWidgets = []; return (`;
        }
        const markup = `<WmCarousel ${(0, transpile_1.transformAttrs)(element, context)} ${renderSlide || '>'}`;
        if (element.attrs['type'] === 'dynamic') {
            context.listener = 'listener';
            context.set('old_props', context.props);
            context.props = ['listener', '$item', '$index', 'currentItemWidgets'];
            context.data.carouselCount = (context.data.carouselCount || 0) + 1;
        }
        return markup;
    },
    post: (element, context) => {
        const type = element.attrs['type'];
        if (type === 'dynamic') {
            context.data.carouselCount--;
            return ');}}></WmCarousel>';
        }
        return '</WmCarousel>';
    },
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=carousel.transformer.js.map
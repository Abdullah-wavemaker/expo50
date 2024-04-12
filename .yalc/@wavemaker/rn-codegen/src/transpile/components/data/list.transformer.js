"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const node_html_parser_1 = require("node-html-parser");
const transpile_1 = require("../../transpile");
const utils_1 = require("../utils");
exports.imports = [
    { name: 'WmList', from: '@wavemaker/app-rn-runtime/components/data/list/list.component' }
];
const addTemplateClass = (element) => {
    var _a;
    const classesToAdd = [];
    if (((_a = element.attrs['class']) === null || _a === void 0 ? void 0 : _a.indexOf('list-card')) >= 0) {
        classesToAdd.push('list-card-template');
    }
    if (classesToAdd.length) {
        element.childNodes.forEach(n => {
            if (n instanceof node_html_parser_1.HTMLElement && n.tagName === 'WM-LISTTEMPLATE') {
                n.setAttribute('class', classesToAdd.join(' ') + ' ' + (n.getAttribute('class') || ''));
            }
        });
    }
};
const transformAttr = (name, value) => {
    if (name === 'itemclass') {
        return value.replace(/fragment\.item/g, 'item')
            .replace(/fragment\.index/g, 'index');
    }
    return value;
};
exports.default = {
    pre: (element, context) => {
        var _a, _b, _c, _d, _e;
        const widgetName = element.attrs['name'];
        let dataSet = element.getAttribute('dataset');
        let onEndReached = '';
        let disableitem = '';
        let itemKey = '';
        let currentNode = element.parentNode;
        while (currentNode) {
            if (currentNode.rawTagName === 'wm-form' || currentNode.rawTagName === 'wm-liveform') {
                break;
            }
            currentNode = currentNode.parentNode;
        }
        const formName = currentNode && currentNode.getAttribute('name');
        if (formName) {
            // @ts-ignore
            element.setAttribute('formRef', formName);
        }
        (0, utils_1.transformItemsPerRow)(element);
        if (dataSet && dataSet.startsWith('bind:')) {
            const template = element.childNodes.find(c => c instanceof node_html_parser_1.HTMLElement);
            (0, utils_1.transformRepeatChildAttr)(template, `fragment.Widgets.${widgetName}.currentItemWidgets`, 'currentItemWidgets');
            (0, utils_1.transformRepeatChildAttr)(template, `fragment.Widgets.${widgetName}.currentItem`, '$item');
            if (formName) {
                (0, utils_1.transformRepeatChildAttr)(template, `fragment.Widgets.${formName}.formWidgets.${widgetName}.currentItem`, '$item');
            }
            (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[0]', 'list_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[$i]', 'list_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[fragment.$i]', 'list_item');
            (0, utils_1.transformRepeatChildData)(template, dataSet.substring(5) + '[fragment.$i]', 'list_item');
            (0, utils_1.transformRepeatChildAttr)(template, 'fragment.item', '$item');
            (0, utils_1.transformRepeatChildAttr)(template, 'fragment.index', '$index');
            const isLoading = (_a = dataSet
                .match(/(fragment)+\.Variables\.[^\.]+/g)) === null || _a === void 0 ? void 0 : _a.map(v => v + '.isExecuting').join(' || ');
            if (isLoading) {
                element.setAttribute('loadingdata', `bind:${isLoading}`);
            }
            if ((_b = element.getAttribute('disableitem')) === null || _b === void 0 ? void 0 : _b.startsWith('bind:')) {
                const disabelItemExp = (0, utils_1.replaceAll)(((_c = element.getAttribute('disableitem')) === null || _c === void 0 ? void 0 : _c.substring(5)) || '', dataSet.substring(5) + '[fragment.$i]', '$item');
                disableitem = `disableitem={($item, $index) => fragment.eval(() => ${disabelItemExp})}`;
                element.removeAttribute('disableitem');
            }
            if ((_d = element.getAttribute('itemkey')) === null || _d === void 0 ? void 0 : _d.startsWith('bind:')) {
                let itemKeyExp = ((_e = element.getAttribute('itemkey')) === null || _e === void 0 ? void 0 : _e.substring(5)) || '';
                itemKeyExp = (0, utils_1.replaceAll)(itemKeyExp, dataSet.substring(5) + '[fragment.$i]', '$item');
                itemKeyExp = (0, utils_1.replaceAll)(itemKeyExp, dataSet.substring(5) + '[0]', '$item');
                itemKey = `itemkey={($item, $index) => fragment.eval(() => ${itemKeyExp})}`;
                element.removeAttribute('itemkey');
            }
            const variableArr = dataSet.match(/(fragment)+\.Variables\.[^\.]+/g);
            if (variableArr && variableArr.length === 1) {
                const variable = variableArr[0];
                onEndReached = ` getNextPageData={($event, $list, page) => {
          return new Promise((resolve, reject) => {
            return ${variable}.invoke && ${variable}.invoke({
              page: page
            }, (response) => {
              resolve(${dataSet.substring(5).replace(variable + '.dataSet', 'response')});
            }, reject);
          });
        }} `;
            }
        }
        let listItemClass = element.getAttribute('itemclass');
        if (listItemClass) {
            if (listItemClass.startsWith('bind:')) {
                listItemClass = `bind:(item, index) => (${listItemClass.substring(5)})`;
            }
            else {
                listItemClass = `bind:(item, index) => ("${listItemClass}")`;
            }
            element.setAttribute('itemclass', listItemClass);
        }
        addTemplateClass(element);
        const markup = `<WmList ${(0, transpile_1.transformAttrs)(element, context, transformAttr)}
    ${disableitem || ''}
    ${itemKey || ''}
    ${onEndReached}
     renderItem={($item, $index, list) => {
       return (`;
        context.listener = 'listener';
        context.set('old_props', context.props);
        context.data.listname = widgetName;
        context.props = ['listener', '$item', '$index', 'currentItemWidgets', 'list'];
        context.data.listCount = (context.data.listCount || 0) + 1;
        return markup;
    },
    post: (element, context) => {
        delete context.data.listname;
        context.data.listCount--;
        return ')}}></WmList>';
    },
    imports: (element, context) => exports.imports,
    createComponent: (element, context) => {
        if (!context.data.listCount) {
            context.props = context.get('old_props') || [];
        }
        const componentMarkup = (0, transpile_1.createComponent)(element, context);
        context.props = [];
        return componentMarkup;
    }
};
//# sourceMappingURL=list.transformer.js.map
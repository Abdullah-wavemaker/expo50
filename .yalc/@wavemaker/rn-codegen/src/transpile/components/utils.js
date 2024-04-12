"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChangeExprforFormWidget = exports.getRenderItemPartial = exports.transformItemsPerRow = exports.transformFormat = exports.transformRepeatChildAttr = exports.transformRepeatChildData = exports.findElement = exports.replaceAll = void 0;
const node_html_parser_1 = require("node-html-parser");
const bind_ex_transformer_1 = require("../bind.ex.transformer");
const replaceAll = (str, find, replaceWith) => {
    const splits = str.split(find);
    if (splits.length > 1) {
        return splits.join(replaceWith);
    }
    return str;
};
exports.replaceAll = replaceAll;
const findElement = (e, tagName, callback, options = { recursive: true }) => {
    let index = 0;
    e.childNodes.forEach(n => {
        if (n && n instanceof node_html_parser_1.HTMLElement) {
            if (n.tagName === tagName) {
                callback && callback(n, index++);
            }
            if (options.recursive) {
                (0, exports.findElement)(n, tagName, callback, options);
            }
        }
    });
};
exports.findElement = findElement;
const transformRepeatChildData = (element, dataSetEx, prefix = 'repeat_item') => {
    Object.keys(element.attributes).forEach(name => {
        let value = element.attributes[name];
        if (value.indexOf('fragment.formatters.') >= 0) {
            value = value.replace(new RegExp(bind_ex_transformer_1.FORMAT_CONTEXT, 'g'), "$item");
        }
        element.setAttribute(name, (0, exports.replaceAll)(value, dataSetEx, '$item'));
    });
    element.setAttribute('id', `bind:'${prefix}_' + $index + '_${element.getAttribute('name')}'`);
    element.childNodes.forEach(c => {
        if (c instanceof node_html_parser_1.HTMLElement) {
            (0, exports.transformRepeatChildData)(c, dataSetEx);
        }
    });
    ;
};
exports.transformRepeatChildData = transformRepeatChildData;
const transformRepeatChildAttr = (element, replace, replaceWith) => {
    Object.keys(element.attributes).forEach(name => {
        const value = element.attributes[name];
        element.setAttribute(name, (0, exports.replaceAll)(value, replace, replaceWith));
    });
    element.childNodes.forEach(c => {
        if (c instanceof node_html_parser_1.HTMLElement) {
            (0, exports.transformRepeatChildAttr)(c, replace, replaceWith);
        }
    });
};
exports.transformRepeatChildAttr = transformRepeatChildAttr;
const transformFormat = (element, attrName, replaceFnName, addDefault = true) => {
    let attrValue = element.getAttribute(attrName);
    if (!attrValue) {
        if (addDefault) {
            attrValue = `bind:fragment.${replaceFnName}()`;
        }
    }
    else if (attrValue.startsWith('bind:')) {
        attrValue = `bind:fragment.${replaceFnName}(${attrValue.substring(5)})`;
    }
    else {
        attrValue = `bind:fragment.${replaceFnName}("${attrValue}")`;
    }
    if (attrValue) {
        element.setAttribute(attrName, attrValue);
    }
};
exports.transformFormat = transformFormat;
const transformItemsPerRow = (element) => {
    let itemsPerRow = {};
    let itemsPerRowStr = element.getAttribute('itemsperrow');
    if (itemsPerRowStr) {
        itemsPerRowStr === null || itemsPerRowStr === void 0 ? void 0 : itemsPerRowStr.split(' ').forEach(s => {
            const [k, v] = s.split('-');
            itemsPerRow[k] = parseInt(v);
        });
        element.setAttribute('itemsperrow', 'bind:' + JSON.stringify(itemsPerRow));
    }
};
exports.transformItemsPerRow = transformItemsPerRow;
const getRenderItemPartial = () => {
    return `
    renderitempartial={ (item, index, partialName)=>{
      return (<WmPartialContainer parentWatcher={fragment.watcher} themeToUse={fragment.theme} content={partialName} item={item} listener={fragment} />)
    }}
    `;
};
exports.getRenderItemPartial = getRenderItemPartial;
const getOnChangeExprforFormWidget = (element, eventName) => {
    var _a;
    const formWidgetDatavalue = ((_a = element.getAttribute('datavalue')) === null || _a === void 0 ? void 0 : _a.split(':')) || [];
    let bindExpr = (formWidgetDatavalue === null || formWidgetDatavalue === void 0 ? void 0 : formWidgetDatavalue.length) > 1 ? formWidgetDatavalue[1] : null;
    if (!bindExpr || (bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.includes('?')) || (bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.includes('Widgets')) || (bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.includes('$formField'))) {
        return '';
    }
    const isVariable = bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.includes('Variables');
    const variableExpr = bindExpr === null || bindExpr === void 0 ? void 0 : bindExpr.split('.');
    const variableName = isVariable && variableExpr ? variableExpr[2] : null;
    const callbackEvent = element.getAttribute(eventName);
    const value = eventName === 'on-change' ? 'newVal' : 'selectedValue';
    const oldValue = eventName === 'on-change' ? 'oldVal' : '';
    if (callbackEvent) {
        element.removeAttribute(eventName);
    }
    return `
      ($event, widget, ${value}, ${oldValue}) => {
        if(!${isVariable}  || fragment.Variables.${variableName}.twoWayBinding) {
          ${bindExpr != null ? `${bindExpr} = ${value};` : ''};
        }
        ${callbackEvent ? `${callbackEvent}` : ''};
      }
    `;
};
exports.getOnChangeExprforFormWidget = getOnChangeExprforFormWidget;
//# sourceMappingURL=utils.js.map
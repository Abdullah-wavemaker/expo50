"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpression = exports.createComponent = exports.transformAttrs = exports.transpileMarkup = exports.registerTransformer = exports.TranspilationContext = exports.generateRandomString = void 0;
const lodash_1 = require("lodash");
const node_html_parser_1 = require("node-html-parser");
const fomatter_1 = require("../fomatter");
const bind_ex_transformer_1 = __importStar(require("./bind.ex.transformer"));
const style_transformer_1 = __importDefault(require("./style.transformer"));
const property_parser_1 = require("./property/property-parser");
const generateRandomString = (length = 10) => Math.random().toString(20).substr(2, length);
exports.generateRandomString = generateRandomString;
class TranspilationContext {
    constructor(args) {
        this.result = args.result;
        this.transformer = args.transformer;
        this.isPartOfPrefab = args.isPartOfPrefab;
        this.listener = args.listener;
        this.props = args.props;
        this.data = (0, lodash_1.assign)({}, args.data);
    }
    get(key) {
        return this.data && this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
    }
}
exports.TranspilationContext = TranspilationContext;
class Transpiler {
    constructor() {
        this.transformers = new Map();
        this.componentNamesList = [];
        this.transpile = (e, isPartOfPrefab, splitCode = true, oldContext) => {
            const transformer = this.transformers.get(e && e.tagName.toLowerCase());
            let result = {
                markup: '',
                components: {},
                attrs: {},
                imports: [],
                partials: [],
                prefabs: []
            };
            if (!e.getAttribute('name')) {
                e.setAttribute('name', `${e.tagName.toLowerCase().replace(/-/g, '_')}_${(0, exports.generateRandomString)()}`);
            }
            // for every new page, initially context is empty. Hence clearing the prev page componentNamesList array.
            if (!oldContext) {
                this.componentNamesList = [];
            }
            if (transformer != null) {
                const context = new TranspilationContext({
                    result: result,
                    isPartOfPrefab: isPartOfPrefab,
                    transformer: transformer,
                    listener: oldContext === null || oldContext === void 0 ? void 0 : oldContext.listener,
                    props: (oldContext === null || oldContext === void 0 ? void 0 : oldContext.props) || [],
                    data: oldContext === null || oldContext === void 0 ? void 0 : oldContext.data
                });
                result.imports.push(...(transformer.imports(e, context)));
                result.markup += transformer.pre(e, context).replace(new RegExp(bind_ex_transformer_1.FORMAT_CONTEXT, 'g'), "") + (e.childNodes.length > 0 ? '\n' : '');
                e.childNodes.forEach(c => {
                    if (c && c.nodeType == node_html_parser_1.NodeType.ELEMENT_NODE) {
                        const cResult = this.transpile(c, isPartOfPrefab, splitCode, context);
                        (0, lodash_1.assignIn)(result.components, cResult.components);
                        result.markup += cResult.markup;
                        result.imports.push(...cResult.imports);
                        result.prefabs.push(...cResult.prefabs);
                        result.partials.push(...cResult.partials);
                        result.components = { ...result.components, ...cResult.components };
                    }
                });
                transformer.partials && result.partials.push(...(transformer.partials(e, context)));
                transformer.prefabs && result.prefabs.push(...(transformer.prefabs(e, context)));
                result.markup += transformer.post(e, context).replace(new RegExp(bind_ex_transformer_1.FORMAT_CONTEXT, 'g'), "");
                splitCode && transformer.createComponent && transformer.createComponent(e, context);
                const accessRole = e.attrs['accessroles'];
                if (accessRole) {
                    result.markup = `{fragment.appConfig.SecurityService.hasAccessToWidget('${accessRole}') ? (${result.markup}): null}`;
                }
                result.markup = (0, fomatter_1.prependSpace)(result.markup, 2) + '\n';
            }
            return result;
        };
    }
    preTranspile(e) {
        Object.keys(e.attributes).forEach(name => {
            let value = e.attributes[name];
            if (value.startsWith('bind:')) {
                value = value.substring(5);
                e.setAttribute(name, 'bind:' + (0, bind_ex_transformer_1.default)(value, 'fragment', 'attr'));
            }
            else if (name === 'groupby' && value.includes('(')) {
                e.setAttribute(name, (0, bind_ex_transformer_1.default)(value, 'fragment', 'event'));
            }
            else if (name.startsWith('on-')) {
                if (name === 'on-tap') {
                    value = (e.getAttribute('on-click') || '') + ';' + value;
                    e.removeAttribute('on-click');
                }
                else if (name === 'on-click') {
                    if (e.hasAttribute('on-tap')) {
                        return;
                    }
                    name = 'on-tap';
                    e.removeAttribute('on-click');
                }
                e.setAttribute(name, (0, bind_ex_transformer_1.default)(value, 'fragment', 'event') + ';');
            }
        });
        e.childNodes.forEach(c => {
            if (c instanceof node_html_parser_1.HTMLElement) {
                if (c.rawTagName === 'wm-checkbox' && c.getAttribute('type') === 'toggle') {
                    c.rawTagName = 'wm-toggle';
                }
                if (c.rawTagName === 'wm-chart') {
                    const type = c.getAttribute('type');
                    if (type === 'Line') {
                        c.rawTagName = 'wm-line-chart';
                    }
                    else if (type === 'Pie') {
                        c.rawTagName = 'wm-pie-chart';
                    }
                    else if (type === 'Bar') {
                        c.rawTagName = 'wm-bar-chart';
                    }
                    else if (type === 'Column') {
                        c.rawTagName = 'wm-column-chart';
                    }
                    else if (type === 'Area') {
                        c.rawTagName = 'wm-area-chart';
                    }
                    else if (type === 'Donut') {
                        c.rawTagName = 'wm-donut-chart';
                    }
                    else if (type === 'Bubble') {
                        c.rawTagName = 'wm-bubble-chart';
                    }
                    else if (type === 'Stack') {
                        c.rawTagName = 'wm-stack-chart';
                    }
                }
                this.preTranspile(c);
            }
        });
    }
    transformStyles(e, context) {
        const widgetName = e.getAttribute('name');
        const styleObj = (0, style_transformer_1.default)(e, (propName) => {
            const transformer = context.transformer;
            if (transformer && transformer.isStyleProperty) {
                return transformer.isStyleProperty(propName, e, context);
            }
            return true;
        }) || {};
        let classes = e.getAttribute('class') || '';
        let isStatic = true;
        let styles = styleObj;
        if (styles) {
            Object.keys(styleObj).forEach((i) => {
                Object.keys(styleObj[i]).forEach((name) => {
                    const styleProp = styleObj[i][name];
                    if ((0, lodash_1.isString)(styleProp) && styleProp.startsWith('bind:')) {
                        isStatic = false;
                        styleObj[i][name] = `{___${styleProp.substring(5)}___}`;
                    }
                });
            });
            if (styles.background) {
                styles.root = styles.root || {};
                styles.root._background = styles.background;
                delete styles.background;
            }
            styles = JSON.stringify(styleObj).replace(/\\"/g, '"');
            if (!isStatic) {
                styles = styles.replace(/"\{___/g, 'watch(() =>');
                styles = styles.replace(/___\}"/g, ')');
            }
        }
        let conditionalClasses = e.getAttribute('conditionalclass');
        if (conditionalClasses) {
            conditionalClasses = `${conditionalClasses.substring(5)}`;
            if (conditionalClasses.startsWith('{') && conditionalClasses.endsWith('}')) {
                conditionalClasses = conditionalClasses.slice(1, -1);
                let expressions = conditionalClasses.split(',').map(expression => {
                    const [classname, condition] = expression.split(':');
                    return `(${condition.trim()} ? ${classname.replace(/'$/, " '")} : '')`;
                });
                conditionalClasses = expressions.join("+");
            }
            if (classes) {
                classes = `{'${classes} ' + ${conditionalClasses}}`;
            }
            else {
                classes = `{${conditionalClasses}}`;
            }
        }
        else if (!!classes) {
            classes = `'${classes}'`;
        }
        e.removeAttribute('conditionalclass');
        e.removeAttribute('class');
        return {
            styles: styles,
            classname: classes
        };
    }
    findArgs(str) {
        var _a;
        let argStr = '';
        let maxSplits = 0;
        (_a = (str.match(/\([^;]*\)/g))) === null || _a === void 0 ? void 0 : _a.forEach(s => {
            const c = s.split(',').length;
            if (maxSplits < c) {
                maxSplits = c;
                argStr = s;
            }
        });
        argStr = argStr.replace(/\(|\)/g, '');
        if (argStr.indexOf('currentItemWidgets') > 0) {
            argStr = argStr.split(',').filter((s) => !(0, lodash_1.includes)(['$item', 'currentItemWidgets'], s.trim())).join(',');
        }
        return `(${argStr})`;
    }
    quoteAttr(v) {
        return ('' + v) /* Forces the conversion to string. */
            .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
            .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    ;
    transformAttr(tagName, name, value, context, tx) {
        if (name === 'styles' || name === 'classname') {
            // conntinue
        }
        else if (name === 'groupby' && value.includes('(')) {
            value = `${this.findArgs(value)} => ${value}`;
            value = `{${value}}`;
        }
        else if (name.startsWith('on-')) {
            name = 'on' + name.charAt(3).toUpperCase() + name.substr(4);
            value = value.replace(/item,/g, '$item,');
            value = `${this.findArgs(value)} => {${value}}`;
            value = `{${value}}`;
        }
        else if (value.startsWith('bind:')) {
            let exp = `${value.substring(5)}`;
            value = `{${(0, property_parser_1.parseProperty)(exp, name, tagName, true)}}`;
            if (name === 'conditionalclass') {
                return '';
            }
        }
        else {
            value = this.quoteAttr(value);
            value = (0, property_parser_1.parseProperty)(value, name, tagName);
        }
        if (tx) {
            const rvalue = tx(name, value);
            if (!(0, lodash_1.isNil)(rvalue)) {
                value = rvalue;
            }
        }
        return (0, lodash_1.isNil)(value) || (0, lodash_1.isEmpty)(value) ? '' : `${name}=${value}`;
    }
    transformAttrs(e, context, tx) {
        var _a;
        const { styles, classname } = this.transformStyles(e, context);
        const tagName = e.tagName.toLowerCase();
        if (!(0, lodash_1.isEmpty)(styles) && styles != '{}') {
            e.setAttribute('styles', `{${styles}}`);
        }
        if (!(0, lodash_1.isEmpty)(classname) && classname) {
            e.setAttribute('classname', classname);
        }
        if (tagName === 'wm-composite' && e.getAttribute("captionposition") === 'floating') {
            const labelNode = e.childNodes.find((node) => { var _a; return node.tagName && ((_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'wm-label'; });
            const labelCaption = (labelNode === null || labelNode === void 0 ? void 0 : labelNode.getAttribute('caption')) || '';
            const containerNode = e.childNodes.find((node) => { var _a; return node.tagName && ((_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'wm-container'; });
            const inputNode = (_a = containerNode === null || containerNode === void 0 ? void 0 : containerNode.childNodes) === null || _a === void 0 ? void 0 : _a.find((node) => {
                var _a;
                const inputTag = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                return (inputTag === 'wm-text'
                    || inputTag === 'wm-number'
                    || inputTag === 'wm-currency'
                    || inputTag === 'wm-date'
                    || inputTag === 'wm-time'
                    || inputTag === 'wm-datetime'
                    || inputTag === 'wm-textarea');
            });
            if (inputNode) {
                inputNode.setAttribute('floatinglabel', labelCaption);
                labelNode.remove();
            }
        }
        const str = Object.keys(e.attributes)
            .map(name => this.transformAttr(tagName, name, e.attributes[name], context, tx))
            .join(' ') + ` listener={${context.listener || 'fragment'}}`;
        return str;
    }
    createUniqueComponentName(components, name, counter = 0) {
        name = name + counter;
        if (components[name]) {
            return this.createUniqueComponentName(components, name, counter++);
        }
        return name;
    }
    createComponent(e, context) {
        const result = context.result;
        let widgetName = 'PC_' + (0, lodash_1.capitalize)(e.attrs['name']);
        widgetName = (0, lodash_1.replace)(widgetName, /[^a-zA-Z0-9]/g, '_');
        if (this.componentNamesList.indexOf(widgetName) !== -1) {
            widgetName = this.createUniqueComponentName(result.components, widgetName);
        }
        this.componentNamesList.push(widgetName);
        const props = ['fragment', ...context.props];
        result.components[widgetName] = `({${props.join(',')}}) => {
            return (${result.markup});
        }`;
        result.markup = `<${widgetName} ${props.map(p => `${p}={${p}}`).join(' ')}/>`;
        return result;
    }
    registerTransformer(tagName, transformer) {
        transpiler.transformers.set(tagName, transformer);
    }
}
const transpiler = new Transpiler();
exports.registerTransformer = transpiler.registerTransformer.bind(transpiler);
const transpileMarkup = (markup, isPartOfPrefab, splitCode) => {
    const element = (0, node_html_parser_1.parse)(markup, {
        blockTextElements: {}
    }).firstChild;
    transpiler.preTranspile(element);
    const result = transpiler.transpile(element, isPartOfPrefab, splitCode);
    return result;
};
exports.transpileMarkup = transpileMarkup;
exports.transformAttrs = transpiler.transformAttrs.bind(transpiler);
exports.createComponent = transpiler.createComponent.bind(transpiler);
const createExpression = (element, attrName) => {
    let displayexpression = element.attrs[attrName];
    if (displayexpression === null || displayexpression === void 0 ? void 0 : displayexpression.startsWith('bind:')) {
        displayexpression = displayexpression.substring(5);
        displayexpression = displayexpression.replace(/[[]/g, "['").replace(/[\]]/g, "']");
        displayexpression = displayexpression.replace(/fragment\.\$item/g, "$item");
        displayexpression = displayexpression.replace(/fragment\.\$index/g, "$index");
        displayexpression = displayexpression.replace(/fragment\.\$length/g, "$length");
        displayexpression = displayexpression.replace(/fragment\.\$/g, '$item');
        displayexpression = displayexpression.replace(/\$item\['fragment./g, "$item['");
        displayexpression = displayexpression.replace(/\$item\[/g, "_get($item, ");
        displayexpression = displayexpression.replace(/']/g, "')");
        displayexpression = displayexpression.replace(/fragment.index/g, "$index");
        if (displayexpression.indexOf('fragment.formatters.') >= 0) {
            displayexpression = displayexpression.replace(new RegExp(bind_ex_transformer_1.FORMAT_CONTEXT, 'g'), "$item");
        }
        const exp = (0, lodash_1.includes)(displayexpression, '(') ? `${displayexpression}` : displayexpression;
        if (displayexpression.indexOf('$index') >= 0) {
            return `{($item, $index, $length) => (${exp})}`;
        }
        return `{($item) => (${exp})}`;
    }
};
exports.createExpression = createExpression;
//# sourceMappingURL=transpile.js.map
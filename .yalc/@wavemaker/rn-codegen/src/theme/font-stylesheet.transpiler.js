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
exports.FontStylesheetTranspiler = void 0;
const csstree = __importStar(require("css-tree"));
const lodash_1 = require("lodash");
const css_to_react_native_transform_1 = __importDefault(require("css-to-react-native-transform"));
const style_definition_provider_1 = require("./components/style-definition.provider");
class FontStylesheetTranspiler {
    getRules(rnstylesheet) {
        const ast = csstree.parse(rnstylesheet);
        const rules = [];
        let currentRule = {};
        let currentSelector = null;
        csstree.walk(ast, {
            enter(node) {
                if (node.type === 'Rule') {
                    currentRule = {
                        selectors: [],
                        body: ''
                    };
                    rules.push(currentRule);
                }
                else if (node.type === 'Selector') {
                    currentSelector = [];
                    currentRule.selectors.push(currentSelector);
                }
                else if (node.type === 'ClassSelector') {
                    currentSelector.push('.' + node.name);
                }
                else if (node.type === 'Block') {
                    currentRule.body = csstree.generate(node);
                }
            }
        });
        return rules;
    }
    toReactNativeStyles(rnstylesheet) {
        const regex = /font-family:(.*?);/g;
        const fontFamily = [...rnstylesheet.matchAll(regex)][0][1];
        const rules = this.getRules(rnstylesheet.replace(/\\e/g, '\\ue'));
        const reactStyles = {};
        rules.push({ selectors: [['.' + fontFamily]], body: '{fontFamily: "' + fontFamily + '"}' });
        rules.forEach(r => {
            if (!(0, lodash_1.isEmpty)(r.selectors[0])) {
                const newStyles = (0, css_to_react_native_transform_1.default)(`.style${r.body}`).style;
                r.selectors.map((s) => {
                    var _a;
                    s.push('.app-icon-shape');
                    const _newStyles = (0, lodash_1.clone)(newStyles);
                    if (_newStyles.content) {
                        _newStyles.content = (_a = _newStyles.content) === null || _a === void 0 ? void 0 : _a.replace(/"u/, '@_u').replace(/"/g, '');
                    }
                    if (!_newStyles.fontFamily) {
                        _newStyles.fontFamily = fontFamily;
                    }
                    const cssClass = s.join('');
                    const reactStyleName = (0, style_definition_provider_1.getRNSelector)(cssClass);
                    if (reactStyleName) {
                        const oldStyles = (0, lodash_1.get)(reactStyles, reactStyleName);
                        (0, lodash_1.set)(reactStyles, reactStyleName, oldStyles ? (0, lodash_1.extend)(oldStyles, _newStyles) : _newStyles);
                    }
                    else {
                        reactStyles[cssClass] = _newStyles;
                    }
                });
            }
        });
        Object.keys(reactStyles).forEach(k => {
            const stylename = Object.keys(reactStyles[k])[0];
            if (stylename && stylename.startsWith('app-')) {
                reactStyles[k] = reactStyles[k][stylename];
            }
            const styles = reactStyles[k];
            const childStyles = styles && styles['__child'];
            if (childStyles) {
                delete styles['__child'];
                (0, lodash_1.assignIn)(styles, childStyles);
            }
        });
        return reactStyles;
    }
}
exports.FontStylesheetTranspiler = FontStylesheetTranspiler;
const fontStyleSheet = new FontStylesheetTranspiler();
exports.default = fontStyleSheet;
//# sourceMappingURL=font-stylesheet.transpiler.js.map
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
exports.RnStylesheetTranspiler = void 0;
const csstree = __importStar(require("css-tree"));
const lodash_1 = require("lodash");
const css_to_react_native_transform_1 = __importDefault(require("css-to-react-native-transform"));
const style_definition_provider_1 = require("./components/style-definition.provider");
const DESIGN_STYLE_PREFIX = '.wm-studio .wm-right-panel-container .file-container-pane .wm-file-container .wm-workspace .workspace-content .canvas-panel ';
class RnStylesheetTranspiler {
    getRules(rnstylesheet) {
        const ast = csstree.parse(rnstylesheet);
        const rules = [];
        let currentRule = null;
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
                else if (node.type === 'PseudoClassSelector' && node.name === 'theme-variables') {
                    currentSelector.push(':theme-variables');
                }
                else if (node.type === 'Block') {
                    currentRule.body = csstree.generate(node);
                    if (!/\{[\s]*\}/.test(currentRule.body)
                        && !currentRule.body.endsWith(';}')) {
                        currentRule.body = currentRule.body.replace('}', ';}');
                    }
                }
            }
        });
        return rules;
    }
    toDesignStyles(rnstylesheet) {
        const rules = this.getRules(rnstylesheet);
        const designStyles = rules.map(r => {
            return r.selectors.map(s => {
                return `${DESIGN_STYLE_PREFIX} ${(0, style_definition_provider_1.getStudioSelector)(s.join(''))}`;
            }).join(',') + r.body;
        }).join(' ');
        return designStyles;
    }
    toReactNativeStyles(rnstylesheet) {
        const rules = this.getRules(rnstylesheet);
        const reactStyles = {};
        rules.forEach(r => {
            const rBody = r.body.replace(/:\s*var\(\s*--/g, '_var:var(--');
            const newStyles = (0, css_to_react_native_transform_1.default)(`.style${rBody}`).style;
            Object.keys(newStyles).forEach(k => {
                if ((0, lodash_1.isString)(k) && k.endsWith('Var')) {
                    newStyles[k.replace('Var', '')] = newStyles[k];
                    delete newStyles[k];
                }
                if ((0, lodash_1.isString)(k) && k.endsWith('_var')) {
                    newStyles[k.replace('_var', '')] = newStyles[k];
                    delete newStyles[k];
                }
            });
            r.selectors.map(s => {
                const _newStyles = (0, lodash_1.clone)(newStyles);
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
exports.RnStylesheetTranspiler = RnStylesheetTranspiler;
//# sourceMappingURL=rn-stylesheet.transpiler.js.map
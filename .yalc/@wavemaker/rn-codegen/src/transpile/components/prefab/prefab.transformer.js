"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = __importDefault(require("../../../profiles/profile"));
const transpile_1 = require("../../transpile");
const utils_1 = require("../../../utils");
const capitalize = (str) => {
    return str ? str.split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join('') : str;
};
exports.default = {
    pre: (element, context) => {
        const prefabName = capitalize(element.getAttribute('prefabname'));
        const widgetname = capitalize(element.getAttribute('widgetname'));
        const lazyLoad = profile_1.default.lazyloadPrefabs ? '<React.Suspense fallback={fragment.loadingMessage}>' : '';
        if (widgetname) {
            return `${lazyLoad}<Wm${widgetname} ${(0, transpile_1.transformAttrs)(element, context, utils_1.inferTypeAndParseProperty)}>`;
        }
        return `${lazyLoad}<Wm${prefabName}Prefab ${(0, transpile_1.transformAttrs)(element, context, utils_1.inferTypeAndParseProperty)} themeToUse={fragment.theme} parentWatcher={fragment.watcher}>`;
    },
    post: (element, context) => {
        const prefabName = capitalize(element.getAttribute('prefabname'));
        const widgetname = capitalize(element.getAttribute('widgetname'));
        const lazyLoad = profile_1.default.lazyloadPrefabs ? '</React.Suspense>' : '';
        if (widgetname) {
            return `</Wm${widgetname}>${lazyLoad}`;
        }
        return `</Wm${prefabName}Prefab>${lazyLoad}`;
    },
    imports: (element, context) => {
        const prefabName = element.getAttribute('prefabname');
        const widgetname = element.getAttribute('widgetname');
        const widgetmodule = element.getAttribute('widgetmodule');
        const imports = [{ name: '* as ReactNative', from: 'react-native' }];
        if (widgetname) {
            imports.push({ name: 'Wm' + capitalize(widgetname), from: widgetmodule });
        }
        else {
            imports.push({ name: 'Wm' + capitalize(prefabName) + 'Prefab', from: `../../prefabs/${prefabName}/src/pages/Main/Main.component`, lazy: profile_1.default.lazyloadPrefabs });
        }
        return imports;
    },
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context),
    prefabs: (element, context) => [element.getAttribute('prefabname')]
};
//# sourceMappingURL=prefab.transformer.js.map
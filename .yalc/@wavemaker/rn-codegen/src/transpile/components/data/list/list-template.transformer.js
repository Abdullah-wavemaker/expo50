"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const lodash_1 = require("lodash");
const transpile_1 = require("../../../transpile");
exports.imports = [
    { name: 'WmListTemplate', from: '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component' }
];
exports.default = {
    pre: (element, context) => `<WmListTemplate ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmListTemplate>',
    imports: (element, context) => exports.imports,
    createComponent: (e, context, component = 'list') => {
        const result = context.result;
        const widgetName = (0, lodash_1.capitalize)(e.attrs['name']);
        result.components[widgetName] = `React.memo(({$item, $index, ${component}, fragment}) => {
        const item = $item;
        const [currentItemWidgets] = React.useState({});
        ${component}.itemWidgets = ${component}.itemWidgets || [];
        ${component}.itemWidgets[$index] = currentItemWidgets;
        const [listener] = React.useState({
          onComponentInit: (c) => {
            currentItemWidgets[c.name] = c;
            fragment.onComponentInit(c);
          },
          onComponentDestroy: (c) => {
            fragment.onComponentDestroy(c);
            delete currentItemWidgets[c.name];
          }
        });
        const { watch } = useWatcher(fragment.watcher);
        return (${result.markup});
    })`;
        result.markup = `<${widgetName} $item={$item} $index={$index} ${component}={${component}} fragment={fragment}/>`;
        return result;
    }
};
//# sourceMappingURL=list-template.transformer.js.map
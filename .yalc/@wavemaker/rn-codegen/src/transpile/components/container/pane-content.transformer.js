"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [];
exports.default = {
    pre: (element, context) => {
        return `<ScrollView nestedScrollEnabled={true}>`;
    },
    post: (element, context) => '</ScrollView>',
    createComponent: (element, context) => (0, transpile_1.createComponent)(element, context),
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=pane-content.transformer.js.map
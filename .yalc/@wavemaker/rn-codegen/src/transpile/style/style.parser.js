"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleParser = void 0;
class StyleParser {
    constructor(styleName) {
        this.styleName = styleName;
    }
    parse(value) {
        const style = {};
        style[this.styleName] = value;
        return style;
    }
    ;
}
exports.StyleParser = StyleParser;
//# sourceMappingURL=style.parser.js.map
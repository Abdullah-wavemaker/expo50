"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionStyleParser = void 0;
const numeric_style_parser_1 = require("./numeric-style.parser");
class DimensionStyleParser extends numeric_style_parser_1.NumericalStyleParser {
    constructor(styleName) {
        super(styleName);
    }
    parse(value) {
        if (value === 'auto') {
            return {};
        }
        else if (value && value.endsWith('%')) {
            const style = {};
            style[this.styleName] = value;
            return style;
        }
        return super.parse(value);
    }
}
exports.DimensionStyleParser = DimensionStyleParser;
//# sourceMappingURL=dimension-style.parser.js.map
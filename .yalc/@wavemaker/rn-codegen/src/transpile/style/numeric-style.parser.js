"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericalStyleParser = void 0;
const style_parser_1 = require("./style.parser");
class NumericalStyleParser extends style_parser_1.StyleParser {
    constructor(styleName) {
        super(styleName);
    }
    parse(value) {
        const match = value && value.match('^[0-9\.-]+');
        const style = {};
        let val = match ? parseFloat(match[0]) : 0;
        if (value.includes('em')) {
            val = val * 8;
        }
        style[this.styleName] = val;
        return style;
    }
}
exports.NumericalStyleParser = NumericalStyleParser;
//# sourceMappingURL=numeric-style.parser.js.map
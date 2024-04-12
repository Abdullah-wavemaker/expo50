"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderWidthParser = void 0;
const multi_dimension_style_parser_1 = require("./multi-dimension-style.parser");
class BorderWidthParser extends multi_dimension_style_parser_1.MultiDimensionStyleParser {
    constructor(styleName) {
        super(styleName);
    }
    parse(value) {
        const values = super.parseDimensions(value);
        return {
            borderTopWidth: values[0],
            borderRightWidth: values[1],
            borderBottomWidth: values[2],
            borderLeftWidth: values[3]
        };
    }
}
exports.BorderWidthParser = BorderWidthParser;
//# sourceMappingURL=border-width.parser.js.map
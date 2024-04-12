"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaddingParser = void 0;
const multi_dimension_style_parser_1 = require("./multi-dimension-style.parser");
class PaddingParser extends multi_dimension_style_parser_1.MultiDimensionStyleParser {
    constructor() {
        super('padding');
    }
    parse(value) {
        const values = super.parseDimensions(value);
        return {
            paddingTop: values[0],
            paddingRight: values[1],
            paddingBottom: values[2],
            paddingLeft: values[3]
        };
    }
}
exports.PaddingParser = PaddingParser;
//# sourceMappingURL=padding.parser.js.map
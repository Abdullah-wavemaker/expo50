"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginParser = void 0;
const multi_dimension_style_parser_1 = require("./multi-dimension-style.parser");
class MarginParser extends multi_dimension_style_parser_1.MultiDimensionStyleParser {
    constructor() {
        super('');
    }
    parse(value) {
        const values = super.parseDimensions(value);
        return {
            marginTop: values[0],
            marginRight: values[1],
            marginBottom: values[2],
            marginLeft: values[3]
        };
    }
}
exports.MarginParser = MarginParser;
//# sourceMappingURL=margin.parser.js.map
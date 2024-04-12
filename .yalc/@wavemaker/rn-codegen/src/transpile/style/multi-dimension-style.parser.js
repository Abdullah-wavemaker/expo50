"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiDimensionStyleParser = void 0;
const dimension_style_parser_1 = require("./dimension-style.parser");
class MultiDimensionStyleParser extends dimension_style_parser_1.DimensionStyleParser {
    constructor(styleName) {
        super(styleName);
    }
    parseDimensions(value) {
        const splits = value.split(' ').map(v => {
            if (v != 'unset') {
                return super.parse(v)[this.styleName];
            }
            return null;
        });
        if (splits.length === 1) {
            splits[1] = splits[0];
            splits[2] = splits[0];
            splits[3] = splits[0];
        }
        else if (splits.length === 2) {
            splits[2] = splits[0];
            splits[3] = splits[1];
        }
        return splits;
    }
}
exports.MultiDimensionStyleParser = MultiDimensionStyleParser;
//# sourceMappingURL=multi-dimension-style.parser.js.map
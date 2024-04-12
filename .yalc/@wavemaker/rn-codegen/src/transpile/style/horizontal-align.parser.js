"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalAlignParser = void 0;
const style_parser_1 = require("./style.parser");
const alignValues = {
    'left': 'flex-start',
    'right': 'flex-end',
    'center': 'center'
};
class HorizontalAlignParser extends style_parser_1.StyleParser {
    constructor() {
        super('');
    }
    parse(value) {
        return {
            textAlign: value,
            flexDirection: 'row',
            justifyContent: alignValues[value],
            flexWrap: 'wrap'
        };
    }
}
exports.HorizontalAlignParser = HorizontalAlignParser;
//# sourceMappingURL=horizontal-align.parser.js.map
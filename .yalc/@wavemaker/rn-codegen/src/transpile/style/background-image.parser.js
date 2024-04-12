"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundImageParser = void 0;
const utils_1 = require("../../utils");
const style_parser_1 = require("./style.parser");
class BackgroundImageParser extends style_parser_1.StyleParser {
    constructor() {
        super('backgroundImage');
    }
    parse(url) {
        if (url) {
            url = (0, utils_1.fromUnicode)(url);
        }
        const style = {};
        style[this.styleName] = url ? (0, utils_1.fromUnicode)(url) : url;
        return style;
    }
}
exports.BackgroundImageParser = BackgroundImageParser;
//# sourceMappingURL=background-image.parser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
class Parser {
    parse(value) {
        return `"${value}"`;
    }
    parseBind(value) {
        return value;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=base-parser.js.map
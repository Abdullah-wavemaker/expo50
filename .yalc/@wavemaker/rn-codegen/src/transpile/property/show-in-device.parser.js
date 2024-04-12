"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_IN_DEVICE_PARSER = void 0;
const base_parser_1 = require("../property/base-parser");
class ShowInDeviceParser extends base_parser_1.Parser {
    parse(value) {
        if (value) {
            const devices = value.split(',');
            if (devices.indexOf('all') < 0) {
                return `{[${devices.map(d => `'${d}'`).join(',')}]}`;
            }
        }
        return '';
    }
}
exports.SHOW_IN_DEVICE_PARSER = new ShowInDeviceParser();
//# sourceMappingURL=show-in-device.parser.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const lodash_1 = require("lodash");
const fomatter_1 = require("./fomatter");
const isEvalExpression = (val) => {
    return /^[^\.]+\.eval\(/.test(val);
};
const registerHelpers = () => {
    handlebars_1.default.registerHelper('stringify', (input) => {
        return JSON.stringify(input)
            .replace(/"([a-zA-Z]+\.eval\(.*?\))"/g, (x) => x.substring(1, x.length - 1).replace(/\\"/g, '"'));
    });
    handlebars_1.default.registerHelper('prependSpace', fomatter_1.prependSpace);
    handlebars_1.default.registerHelper('ifEquals', (arg1, arg2, scope, options) => {
        if (arg1 === arg2) {
            return options && options.fn(scope || this);
        }
        else if (options && options.inverse) {
            return options.inverse(scope || this);
        }
    });
    handlebars_1.default.registerHelper('surroundWithCurlyBraces', text => `{${text}}`);
    handlebars_1.default.registerHelper('ifNotEmpty', (arg1, scope, options) => {
        if ((0, lodash_1.isNumber)(arg1) && !(0, lodash_1.isUndefined)(arg1)) {
            return options && options.fn(scope || this);
        }
        else if (!(0, lodash_1.isEmpty)(arg1)) {
            return options && options.fn(scope || this);
        }
        else {
            return options && options.inverse(scope || this);
        }
    });
    handlebars_1.default.registerHelper('quoteIfString', (arg) => {
        if (arg === '') {
            return `"${arg}"`;
        }
        if (!isNaN(arg) || arg === 'true' || arg === 'false') {
            return arg;
        }
        if ((0, lodash_1.isString)(arg) && !isEvalExpression(arg)) {
            return `${JSON.stringify(arg)}`;
        }
        return arg;
    });
    handlebars_1.default.registerHelper('toLowerCase', (str) => {
        if ((0, lodash_1.isString)(str)) {
            return str.toLowerCase();
        }
        return str;
    });
};
exports.default = registerHelpers;
//# sourceMappingURL=handlebar-helpers.js.map
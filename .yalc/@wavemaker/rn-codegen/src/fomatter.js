"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prependSpace = exports.createSpace = void 0;
const spaceCache = [''];
const createSpace = (num = 0) => {
    if (spaceCache[num] == undefined) {
        spaceCache[num] = ' ' + (0, exports.createSpace)(num - 1);
    }
    return spaceCache[num];
};
exports.createSpace = createSpace;
const prependSpace = (input, num = 0) => {
    const space = (0, exports.createSpace)(num);
    return input.split('\n').map(s => space + s).join('\n');
};
exports.prependSpace = prependSpace;
//# sourceMappingURL=fomatter.js.map
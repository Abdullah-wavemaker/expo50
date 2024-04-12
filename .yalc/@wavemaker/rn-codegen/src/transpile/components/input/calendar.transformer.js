"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmCalendar', from: '@wavemaker/app-rn-runtime/components/input/calendar/calendar.component' }
];
exports.default = {
    pre: (element, context) => `<WmCalendar ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmCalendar>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=calendar.transformer.js.map
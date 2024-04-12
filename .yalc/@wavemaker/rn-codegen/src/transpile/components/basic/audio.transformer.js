"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
exports.imports = [
    { name: 'WmAudio', from: '@wavemaker/app-rn-runtime/components/basic/audio/audio.component' }
];
exports.default = {
    pre: (element, context) => `<WmAudio ${(0, transpile_1.transformAttrs)(element, context)}>`,
    post: (element, context) => '</WmAudio>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=audio.transformer.js.map
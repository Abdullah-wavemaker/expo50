"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const transpile_1 = require("../../transpile");
const resizeModes = {
    'fill': 'stretch',
    'contain': 'contain',
    'cover': 'cover',
    'none': 'center'
};
exports.imports = [
    { name: 'WmPicture', from: '@wavemaker/app-rn-runtime/components/basic/picture/picture.component' }
];
const tResizeMode = (element) => {
    const value = resizeModes[element.getAttribute('resizemode') || ''];
    value && element.setAttribute('resizemode', value);
};
exports.default = {
    pre: (element, context) => {
        const url = element.getAttribute('picturesource');
        const pictureplaceholder = element.getAttribute('pictureplaceholder') || 'resources/images/imagelists/default-image.png';
        pictureplaceholder && element.setAttribute('pictureplaceholder', pictureplaceholder);
        tResizeMode(element);
        if (url === null || url === void 0 ? void 0 : url.endsWith('.svg')) {
            element.setAttribute('isSvg', 'true');
        }
        return `<WmPicture ${(0, transpile_1.transformAttrs)(element, context)}>`;
    },
    post: (element, context) => '</WmPicture>',
    imports: (element, context) => exports.imports
};
//# sourceMappingURL=picture.transformer.js.map
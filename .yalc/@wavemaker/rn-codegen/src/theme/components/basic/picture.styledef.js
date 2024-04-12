"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-picture',
            rnStyleSelector: 'app-picture.root',
            studioStyleSelector: '.app-picture',
            style: {}
        }, {
            className: '.app-picture-skeleton',
            rnStyleSelector: 'app-picture.skeleton',
            studioStyleSelector: '.app-picture-skeleton',
            style: {}
        }, {
            className: '.thumbnail-image.app-picture',
            studioStyleSelector: '.img-thumbnail.app-picture',
            style: {
                'background-color': '@pictureThumbBgColor',
                'border-color': '@pictureThumbBorderColor'
            }
        }])
};
//# sourceMappingURL=picture.styledef.js.map
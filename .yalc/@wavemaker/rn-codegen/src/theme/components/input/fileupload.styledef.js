"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-fileupload',
            rnStyleSelector: 'app-fileupload.root',
            studioStyleSelector: '.app-fileupload > .app-single-file-upload',
            style: {
                'background-color': '@fileuploadBgColor',
                'color': '@fileuploadTextColor',
                'border-color': '@fileuploadBorderColor'
            }
        },
        {
            className: '.app-fileupload-text',
            rnStyleSelector: 'app-fileupload.button.text',
            studioStyleSelector: '.app-fileupload .caption',
            style: {
                'color': '@fileuploadTextColor',
            }
        },
        {
            className: '.app-fileupload-btn',
            rnStyleSelector: 'app-fileupload.button',
            studioStyleSelector: '.app-fileupload ',
            style: {
                'color': '@fileuploadTextColor',
            }
        },
        {
            className: '.app-fileupload-icon',
            rnStyleSelector: 'app-fileupload.button.icon.icon',
            studioStyleSelector: '.app-fileupload .app-button i',
            style: {
                'color': '@fileuploadTextColor',
            }
        }
    ])
};
//# sourceMappingURL=fileupload.styledef.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTileBgStyles = (className, color) => {
    return {
        className: `.${className}.app-tile`,
        style: {
            'background-color': color
        }
    };
};
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-tile',
            rnStyleSelector: 'app-tile.root',
            studioStyleSelector: '.app-tile',
            style: {}
        },
        getTileBgStyles('bg-danger', '@tileDangerColor'),
        getTileBgStyles('bg-info', '@tileInfoColor'),
        getTileBgStyles('bg-primary', '@tilePrimaryColor'),
        getTileBgStyles('bg-success', '@tileSuccessColor'),
        getTileBgStyles('bg-warning', '@tileWarningColor'),
        {
            className: `.well.app-tile`,
            style: {
                'background-color': '@tileWellbgColor',
                'border-color': '@tileWellBorderColor'
            }
        },
        {
            className: '.tile-template-text',
            rnStyleSelector: '.tile-template-text.text',
            studioStyleSelector: '.tile-template-text',
            style: {
                color: '@primaryContrastColor'
            }
        }
    ])
};
//# sourceMappingURL=tile.styledef.js.map
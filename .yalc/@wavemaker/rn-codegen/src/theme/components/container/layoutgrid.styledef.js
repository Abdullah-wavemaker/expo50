"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-layoutgrid',
            rnStyleSelector: 'app-layoutgrid.root',
            studioStyleSelector: '.app-grid-layout',
            style: {}
        }, {
            className: '.app-layoutgrid-text',
            rnStyleSelector: 'app-layoutgrid.text',
            studioStyleSelector: '.app-grid-layout',
            style: {}
        }, {
            className: '.table.app-layoutgrid',
            style: {
                'background-color': '@layoutGridBgColor',
                'border-color': '@layoutGridBorderColor'
            }
        }, {
            className: '.table-header-label',
            rnStyleSelector: 'text',
            style: {
                color: '@layoutGridHeaderTextColor'
            }
        }])
};
//# sourceMappingURL=layoutgrid.styledef.js.map
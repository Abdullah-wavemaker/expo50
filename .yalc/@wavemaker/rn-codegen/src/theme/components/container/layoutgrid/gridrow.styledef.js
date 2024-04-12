"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-gridrow',
            rnStyleSelector: 'app-gridrow.root',
            studioStyleSelector: '.app-grid-row',
            style: {}
        }, {
            className: '.table-row.app-gridrow',
            style: {
                'border-color': '@gridColumnBorderColor'
            }
        }, {
            className: '.table-header-row.app-gridrow',
            style: {
                'background-color': '@layoutGridHeaderBgColor'
            }
        }, {
            className: '.table-striped-row0.app-gridrow',
            studioStyleSelector: '.table-striped .app-grid-row:nth-child(even)',
            style: {
                'background-color': '@layoutGridStripColor1'
            }
        }, {
            className: '.table-striped-row1.app-gridrow',
            studioStyleSelector: '.table-striped .app-grid-row:nth-child(old)',
            style: {
                'background-color': '@layoutGridStripColor2'
            }
        },])
};
//# sourceMappingURL=gridrow.styledef.js.map
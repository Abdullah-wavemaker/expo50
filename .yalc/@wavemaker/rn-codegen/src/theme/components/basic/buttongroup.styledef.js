"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-buttongroup',
            rnStyleSelector: 'app-buttongroup.root',
            studioStyleSelector: '.app-button-group',
            style: {
                'border-color': '@buttonGrpBorderColor',
                'background-color': '@buttonGrpBgColor'
            }
        }, {
            className: '.btn-group-child',
            rnStyleSelector: 'btn-group-child',
            studioStyleSelector: '.app-button-group>.app-button',
            style: {
                'border-color': '@buttonGrpBorderColor'
            }
        }, {
            className: '.btn-group-first-child',
            rnStyleSelector: 'btn-group-first-child',
            studioStyleSelector: '.app-button-group>.app-button:first-child',
            style: {
                'border-color': '@buttonGrpBorderColor'
            }
        }, {
            className: '.app-buttongroup-skeleton',
            rnStyleSelector: 'app-buttongroup.skeleton',
            studioStyleSelector: '.app-buttongroup-skeleton',
            style: {}
        }])
};
//# sourceMappingURL=buttongroup.styledef.js.map
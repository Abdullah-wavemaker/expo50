"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-switch',
            rnStyleSelector: 'app-switch.root',
            studioStyleSelector: '.app-switch',
            style: {}
        }, {
            className: '.app-switch-btn',
            rnStyleSelector: 'app-switch.button',
            studioStyleSelector: '.app-switch .btn',
            style: {
                'background-color': '@switchBgColor',
                'border-color': '@switchBorderColor'
            }
        }, {
            className: '.app-switch-btn-selected',
            rnStyleSelector: 'app-switch.selectedButton',
            studioStyleSelector: '.app-switch .btn.selected',
            style: {
                color: '@switchActiveTextColor',
                'background-color': '@switchActiveBgColor'
            }
        }, {
            className: '.app-switch-first-btn',
            rnStyleSelector: 'app-switch.firstButton',
            studioStyleSelector: '.app-switch .btn:first-child',
            style: {}
        }, {
            className: '.app-switch-last-btn',
            rnStyleSelector: 'app-switch.lastButton',
            studioStyleSelector: '.app-switch .btn:last-child',
            style: {}
        }])
};
//# sourceMappingURL=switch.styledef.js.map
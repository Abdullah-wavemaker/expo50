"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-select',
            rnStyleSelector: 'app-select.root',
            studioStyleSelector: '.app-select',
            style: {
                'border-color': '@inputBorderColor',
                'background-color': '@inputBackgroundColor'
            }
        }, {
            className: '.app-select-text',
            rnStyleSelector: 'app-select.text',
            studioStyleSelector: '.app-select',
            style: {}
        }, {
            className: '.app-select-invalid',
            rnStyleSelector: 'app-select.invalid',
            studioStyleSelector: '.app-select.invalid',
            style: {
                'border-bottom-color': '@inputInvalidBorderColor',
            }
        }, {
            className: '.app-select-item',
            rnStyleSelector: 'app-select.selectItem',
            studioStyleSelector: '.app-select.selectItem'
        }, {
            className: '.app-select-item-text',
            rnStyleSelector: 'app-select.selectItemText',
            studioStyleSelector: '.app-select.selectItemText'
        }, {
            className: '.app-select-last-item',
            rnStyleSelector: 'app-select.lastSelectItem',
            studioStyleSelector: '.app-select.lastSelectItem'
        }, {
            className: '.app-select-active-item',
            rnStyleSelector: 'app-select.selectedItem',
            studioStyleSelector: '.app-select.selectedItem'
        }, {
            className: '.app-select-active-item-text',
            rnStyleSelector: 'app-select.selectedItemText',
            studioStyleSelector: '.app-select.selectedItemText'
        }, {
            className: '.app-select-check-icon',
            rnStyleSelector: 'app-select.checkIcon',
            studioStyleSelector: '.app-select.checkIcon'
        }])
};
//# sourceMappingURL=select.styledef.js.map
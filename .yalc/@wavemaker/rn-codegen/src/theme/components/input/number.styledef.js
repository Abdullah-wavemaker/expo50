"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-number',
            rnStyleSelector: 'app-number.root',
            studioStyleSelector: '.app-textbox[type="number"]',
            style: {
                'border-color': '@inputBorderColor',
                'background-color': '@inputBackgroundColor'
            }
        }, {
            className: '.app-number-invalid',
            rnStyleSelector: 'app-number.invalid',
            studioStyleSelector: '',
            style: {
                'border-bottom-color': '@inputInvalidBorderColor'
            }
        }, {
            className: '.app-number-placeholer',
            rnStyleSelector: 'app-number.placeholderText',
            studioStyleSelector: '',
            style: {
                'color': '@inputPlaceholderColor'
            }
        }, {
            className: '.app-number-skeleton',
            rnStyleSelector: 'app-number.skeleton',
            studioStyleSelector: '.app-number-skeleton',
            style: {}
        }, {
            className: '.app-number-flotaing-label',
            rnStyleSelector: 'app-number.floatingLabel',
            style: {}
        }, {
            className: '.app-number-active-flotaing-label',
            rnStyleSelector: 'app-number.activeFloatingLabel',
            style: {}
        }])
};
//# sourceMappingURL=number.styledef.js.map
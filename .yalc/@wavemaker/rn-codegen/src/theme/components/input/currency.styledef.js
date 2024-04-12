"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-currency',
            rnStyleSelector: 'app-currency.root',
            studioStyleSelector: '.app-currency .app-currency-input',
            style: {
                'border-color': '@inputBorderColor',
                'background-color': '@inputBackgroundColor'
            }
        }, {
            className: '.app-currency-label',
            rnStyleSelector: 'app-currency.label',
            studioStyleSelector: '.app-currency span',
            style: {
                'background-color': '@primaryColor',
                'color': '@primaryContrastColor'
            }
        }, {
            className: '.app-currency-flotaing-label',
            rnStyleSelector: 'app-currency.floatingLabel',
            style: {}
        }, {
            className: '.app-currency-active-flotaing-label',
            rnStyleSelector: 'app-currency.activeFloatingLabel',
            style: {}
        }, {
            className: '.app-currency-invalid',
            rnStyleSelector: 'app-currency.invalid',
            studioStyleSelector: '',
            style: {
                'border-bottom-color': '@inputInvalidBorderColor'
            }
        }, {
            className: '.app-currency-placeholder',
            rnStyleSelector: 'app-currency.placeholderText',
            studioStyleSelector: '',
            style: {
                'color': '@inputPlaceholderColor'
            }
        }])
};
//# sourceMappingURL=currency.styledef.js.map
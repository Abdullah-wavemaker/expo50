"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-textarea',
            rnStyleSelector: 'app-textarea.root',
            studioStyleSelector: '.app-textarea',
            style: {
                'border-color': '@inputBorderColor',
                'background-color': '@inputBackgroundColor',
            }
        }, {
            className: '.app-textarea-text',
            rnStyleSelector: 'app-textarea.text',
            studioStyleSelector: '.app-textarea',
            style: {}
        }, {
            className: '.app-textarea-invalid',
            rnStyleSelector: 'app-textarea.invalid',
            studioStyleSelector: '.app-textarea.invalid',
            style: {
                'border-bottom-color': 'red'
            }
        }, {
            className: '.app-textarea-flotaing-label',
            rnStyleSelector: 'app-textarea.floatingLabel',
            style: {}
        }, {
            className: '.app-textarea-active-flotaing-label',
            rnStyleSelector: 'app-textarea.activeFloatingLabel',
            style: {}
        }, {
            className: '.app-textarea-placeholder',
            rnStyleSelector: 'app-textarea.placeholderText',
            studioStyleSelector: '',
            style: {
                'color': '@inputPlaceholderColor'
            }
        }, {
            className: '.app-textarea-skeleton',
            rnStyleSelector: 'app-textarea.skeleton',
            studioStyleSelector: '.app-textarea-skeleton',
            style: {}
        }])
};
//# sourceMappingURL=textarea.styledef.js.map
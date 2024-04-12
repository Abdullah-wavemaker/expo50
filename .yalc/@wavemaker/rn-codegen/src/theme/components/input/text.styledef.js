"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-text',
            rnStyleSelector: 'app-text.root',
            studioStyleSelector: '.app-textbox',
            style: {
                'border-color': '@inputBorderColor',
                'background-color': '@inputBackgroundColor',
            }
        }, {
            className: '.app-text-text',
            rnStyleSelector: 'app-text.text',
            studioStyleSelector: '.app-textbox',
            style: {}
        }, {
            className: '.app-text-invalid',
            rnStyleSelector: 'app-text.invalid',
            studioStyleSelector: '.app-textbox.invalid',
            style: {
                'border-bottom-color': '@inputInvalidBorderColor',
            }
        }, {
            className: '.app-text-flotaing-label',
            rnStyleSelector: 'app-text.floatingLabel',
            style: {}
        }, {
            className: '.app-text-active-flotaing-label',
            rnStyleSelector: 'app-text.activeFloatingLabel',
            style: {}
        }, {
            className: '.app-text-skeleton',
            rnStyleSelector: 'app-text.skeleton',
            studioStyleSelector: '.app-text-skeleton',
            style: {}
        }])
};
//# sourceMappingURL=text.styledef.js.map
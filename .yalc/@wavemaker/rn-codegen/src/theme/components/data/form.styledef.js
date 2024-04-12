"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-form',
            rnStyleSelector: 'app-form.root',
            studioStyleSelector: '.app-form',
            style: {}
        }, {
            className: '.app-form-header',
            rnStyleSelector: 'app-form.heading',
            studioStyleSelector: '.app-form .panel-heading',
            style: {
                'border-color': '@formBorderColor'
            }
        }, {
            className: '.app-form-title',
            rnStyleSelector: 'app-form.title.text',
            studioStyleSelector: '.app-form .panel-heading .heading',
            style: {
                'font-size': '@heading4FontSize',
                color: '@formTitleColor'
            }
        }, {
            className: '.app-form-sub-title',
            rnStyleSelector: 'app-form.subheading.text',
            studioStyleSelector: '.app-form .panel-heading .description',
            style: {
                color: '@formSubTitleColor'
            }
        }])
};
//# sourceMappingURL=form.styledef.js.map
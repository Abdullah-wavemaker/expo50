"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rnStyleToStudio = {
    'success-message': 'alert-success',
    'error-message': 'alert-danger',
    'warning-message': 'alert-warning',
    'info-message': 'alert-info',
    'loading-message': 'alert-loading'
};
const getStyle = (className, bgColor, closeBtnColor, iconcolor, textcolor, borderColor = 'transparent') => {
    const studioClass = rnStyleToStudio[className];
    return [{
            className: `.${className}.app-message`,
            studioStyleSelector: `.${studioClass}.app-message`,
            style: {
                'background-color': bgColor,
                'border-color': borderColor
            }
        }, {
            className: `.${className}.app-message-text`,
            studioStyleSelector: `.${studioClass}.app-message span`,
            style: {
                color: textcolor
            }
        }, {
            className: `.${className}.app-message-icon .app-icon-text`,
            studioStyleSelector: `.${studioClass}.app-message .icon`,
            style: {
                color: iconcolor
            }
        }, {
            className: `.${className}.app-message-closebtn .app-button .app-button-icon .app-icon-text`,
            studioStyleSelector: `.${studioClass}.app-message button.close`,
            style: {
                color: closeBtnColor
            }
        }];
};
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-message',
            rnStyleSelector: 'app-message.root',
            studioStyleSelector: '.app-message',
            style: {}
        }, {
            className: '.app-message-text',
            rnStyleSelector: 'app-message.text',
            studioStyleSelector: '.app-message span',
            style: {}
        }, {
            className: '.app-message-title',
            rnStyleSelector: 'app-message.title',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-message-text-wrapper',
            rnStyleSelector: 'app-message.message',
            studioStyleSelector: '.app-message >div:nth-child(2)',
            style: {}
        }, {
            className: '.app-message-icon',
            rnStyleSelector: 'app-message.icon',
            studioStyleSelector: '.app-message ',
            style: {}
        }, {
            className: '.app-message-closebtn',
            rnStyleSelector: 'app-message.closeBtn',
            studioStyleSelector: '.app-message button.close',
            style: {}
        },
        ...getStyle('success-dark-message', '@messageSuccessColor', '@defaultColorF', '@defaultColorF', '@defaultColorF'),
        ...getStyle('error-dark-message', '@messageErrorColor', '@defaultColorF', '@defaultColorF', '@defaultColorF'),
        ...getStyle('warning-dark-message', '@messageWarningColor', '@defaultColorF', '@defaultColorF', '@defaultColorF'),
        ...getStyle('info-dark-message', '@messageInfoColor', '@defaultColorF', '@defaultColorF', '@defaultColorF'),
        ...getStyle('loading-dark-message', '@messageLoadingColor', '@defaultColorF', '@defaultColorF', '@defaultColorF'),
        ...getStyle('success-light-message', '@defaultColorF', '@defaultColor6', '@messageSuccessColor', '@defaultColor6', '@defaultColorD'),
        ...getStyle('error-light-message', '@defaultColorF', '@defaultColor6', '@messageErrorColor', '@defaultColor6', '@defaultColorD'),
        ...getStyle('warning-light-message', '@defaultColorF', '@defaultColor6', '@messageWarningColor', '@defaultColor6', '@defaultColorD'),
        ...getStyle('info-light-message', '@defaultColorF', '@defaultColor6', '@messageInfoColor', '@defaultColor6', '@defaultColorD'),
        ...getStyle('loading-light-message', '@defaultColorF', '@defaultColor6', '@messageLoadingColor', '@defaultColor6', '@defaultColorD'),
    ])
};
//# sourceMappingURL=message.styledef.js.map
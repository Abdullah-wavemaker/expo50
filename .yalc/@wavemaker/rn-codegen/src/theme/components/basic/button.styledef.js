"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getButtonStyle = (className, bgColor, color, borderColor = bgColor) => ([{
        className: `.${className}.app-button`,
        style: {
            'border-color': borderColor,
            'background-color': bgColor
        }
    }, {
        className: `.${className}.app-button-text`,
        style: {
            color: color
        }
    }, {
        className: `.${className}.app-button-badge`,
        style: {
            'background-color': color,
            'color': bgColor,
            'border-color': bgColor
        }
    }, {
        className: `.${className}.app-button-icon .app-icon`,
        style: {
            color: color
        }
    }]);
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-button',
            rnStyleSelector: 'app-button.root',
            studioStyleSelector: '.app-button',
            style: {}
        }, {
            className: '.app-button-text',
            rnStyleSelector: 'app-button.text',
            studioStyleSelector: '.app-button>.btn-caption',
            style: {}
        }, {
            className: '.app-button-content',
            rnStyleSelector: 'app-button.content',
            studioStyleSelector: '.app-button',
            style: {}
        }, {
            className: '.app-button-badge',
            rnStyleSelector: 'app-button.badge',
            studioStyleSelector: '.app-button>.badge',
            style: {
                'background-color': '@buttonBadgeBackgroundColor',
                'color': '@buttonBadgeTextColor',
                'border-color': '@buttonBadgeTextColor'
            }
        }, {
            className: '.app-button-icon',
            rnStyleSelector: 'app-button.icon',
            studioStyleSelector: '.app-button ',
            style: {}
        }, {
            className: '.app-button-skeleton',
            rnStyleSelector: 'app-button.skeleton',
            studioStyleSelector: '.app-button-skeleton',
            style: {}
        },
        ...getButtonStyle('btn-default', '@buttonDefaultColor', '@buttonDefaultTextColor', '@buttonBorderColor'),
        ...getButtonStyle('btn-info', '@buttonInfoColor', '@buttonInfoTextColor'),
        ...getButtonStyle('btn-primary', '@buttonPrimaryColor', '@buttonPrimaryTextColor'),
        ...getButtonStyle('btn-secondary', '@buttonSecondaryColor', '@buttonSecondaryTextColor', '@buttonSecondaryTextColor'),
        ...getButtonStyle('btn-danger', '@buttonDangerColor', '@buttonDangerTextColor'),
        ...getButtonStyle('btn-success', '@buttonSuccessColor', '@buttonSuccessTextColor'),
        ...getButtonStyle('btn-warning', '@buttonWarningColor', '@buttonWarningTextColor'),
        ...getButtonStyle('btn-link', '@buttonLinkColor', '@buttonLinkTextColor'),
        ...getButtonStyle('btn-dark', '@buttonDarkColor', '@buttonDarkTextColor'),
        ...getButtonStyle('btn-light', '@buttonLightColor', '@buttonLightTextColor'),
    ])
};
//# sourceMappingURL=button.styledef.js.map
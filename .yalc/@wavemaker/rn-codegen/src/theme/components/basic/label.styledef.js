"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLabelStyle = (className, bgColor, color) => [{
        className: `.${className}.app-label`,
        style: {
            'background-color': bgColor,
        }
    }, {
        className: `.${className}.app-label-text`,
        style: {
            'color': color,
        }
    }];
const getTextStyle = (className, color) => [{
        className: `.${className}.app-label-text`,
        style: {
            'color': color,
        }
    }];
const getHeadingStyles = (className, fontSize) => [{
        className: `.${className}.app-label-text`,
        style: {
            'font-size': fontSize,
            'color': '@labelHeaderColor',
        }
    }];
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-label',
            rnStyleSelector: 'app-label.root',
            studioStyleSelector: '.app-label',
            style: {
                color: '@labelDefaultColor'
            }
        }, {
            className: '.app-label-text',
            rnStyleSelector: 'app-label.text',
            studioStyleSelector: '.app-label',
            style: {}
        }, {
            className: '.app-label-asterisk',
            rnStyleSelector: 'app-label.asterisk',
            studioStyleSelector: '.app-label.required:after',
            style: {
                color: '@labelAsteriskColor'
            }
        }, {
            className: '.app-label-skeleton',
            rnStyleSelector: 'app-label.skeleton',
            studioStyleSelector: '.app-label-skeleton',
            style: {}
        }, {
            className: '.app-label-link',
            rnStyleSelector: 'app-label.link',
            style: {}
        },
        ...getLabelStyle('label-danger', '@labelDangerColor', '@labelDangerContrastColor'),
        ...getLabelStyle('label-primary', '@labelPrimaryColor', '@labelPrimaryContrastColor'),
        ...getLabelStyle('label-default', '@labelDefaultColor', '@labelDefaultContrastColor'),
        ...getLabelStyle('label-success', '@labelSuccessColor', '@labelSuccessContrastColor'),
        ...getLabelStyle('label-warning', '@labelWarningColor', '@labelWarningContrastColor'),
        ...getLabelStyle('label-info', '@labelInfoColor', '@labelInfoContrastColor'),
        ...getTextStyle('text-danger', '@labelTextDangerColor'),
        ...getTextStyle('text-primary', '@labelTextPrimaryColor'),
        ...getTextStyle('text-success', '@labelTextSuccessColor'),
        ...getTextStyle('text-warning', '@labelTextWarningColor'),
        ...getTextStyle('text-info', '@labelTextInfoColor'),
        ...getHeadingStyles('h1', '@heading1FontSize'),
        ...getHeadingStyles('h2', '@heading2FontSize'),
        ...getHeadingStyles('h3', '@heading3FontSize'),
        ...getHeadingStyles('h4', '@heading4FontSize'),
        ...getHeadingStyles('h5', '@heading5FontSize'),
        ...getHeadingStyles('h6', '@heading6FontSize'), {
            className: '.text-muted.app-label-text',
            style: {
                color: '@labelTextMutedColor'
            }
        },
    ])
};
//# sourceMappingURL=label.styledef.js.map
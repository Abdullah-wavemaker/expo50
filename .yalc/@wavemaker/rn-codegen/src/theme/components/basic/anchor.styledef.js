"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLinkStyles = (className, color) => {
    return [{
            className: `.${className}.app-anchor-text`,
            style: {
                color: color
            }
        }, {
            className: `.${className}.app-anchor-icon .app-icon`,
            style: {
                color: color
            }
        }, {
            className: `.${className}.app-anchor-badge`,
            style: {
                'background-color': `fade(${color}, 20%)`,
                color: color
            }
        },];
};
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-anchor',
            rnStyleSelector: 'app-anchor.root',
            studioStyleSelector: '.app-anchor',
            style: {}
        }, {
            className: '.app-anchor-text',
            rnStyleSelector: 'app-anchor.text',
            studioStyleSelector: '.app-anchor >.anchor-caption',
            style: {
                color: '@linkDefaultColor'
            }
        }, {
            className: '.app-anchor-badge',
            rnStyleSelector: 'app-anchor.badge',
            studioStyleSelector: '.app-anchor >.badge',
            style: {}
        }, {
            className: '.app-anchor-icon',
            rnStyleSelector: 'app-anchor.icon',
            studioStyleSelector: '.app-anchor ',
        }, {
            className: '.app-anchor-icon.app-icon',
            style: {
                color: '@linkDefaultColor'
            }
        }, {
            className: '.app-anchor-skeleton',
            rnStyleSelector: 'app-anchor.skeleton',
            studioStyleSelector: '.app-anchor-skeleton',
            style: {}
        },
        ...getLinkStyles('link-primary', '@linkPrimaryColor'),
        ...getLinkStyles('link-secondary', '@linkSecondaryColor'),
        ...getLinkStyles('link-success', '@linkSuccessColor'),
        ...getLinkStyles('link-danger', '@linkDangerColor'),
        ...getLinkStyles('link-warning', '@linkWarningColor'),
        ...getLinkStyles('link-info', '@linkInfoColor'),
        ...getLinkStyles('link-light', '@linkLightColor'),
        ...getLinkStyles('link-dark', '@linkDarkColor')
    ])
};
//# sourceMappingURL=anchor.styledef.js.map
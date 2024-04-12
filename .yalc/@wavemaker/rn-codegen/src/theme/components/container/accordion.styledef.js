"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBadgeStyle = (badgeClass, color) => ({
    className: `.app-accordion-header-${badgeClass}-badge`,
    rnStyleSelector: `app-accordion.${badgeClass}`,
    studioStyleSelector: `.app-accordion >.app-accordion-panel >.panel-heading .panel-actions .label.label-${badgeClass}`,
    style: {
        'background-color': color
    }
});
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-accordion',
            rnStyleSelector: 'app-accordion.root',
            studioStyleSelector: 'app-accordion',
            style: {
                'border-color': '@accordionBorderColor',
                'background-color': '@accordionBgColor'
            }
        }, {
            className: '.app-accordion-text',
            rnStyleSelector: 'app-accordion.text',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading .heading',
            style: {
                color: '@accordionTitleColor'
            }
        }, {
            className: '.app-accordion-header',
            rnStyleSelector: 'app-accordion.header',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading',
            style: {
                'border-color': '@accordionBorderColor',
                'background-color': '@accordionHeaderBgColor'
            }
        }, {
            className: '.app-accordion-active-header',
            rnStyleSelector: 'app-accordion.activeHeader',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading.active',
            style: {
                'border-color': '@accordionActiveHeaderBgColor',
                'background-color': '@accordionActiveHeaderBgColor'
            }
        }, {
            className: '.app-accordion-active-header-title',
            rnStyleSelector: 'app-accordion.activeHeaderTitle',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading.active .heading',
            style: {
                'color': '@accordionActiveHeaderTextColor'
            }
        }, {
            className: '.app-accordion-header-subtitle',
            rnStyleSelector: 'app-accordion.subheading',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading .description',
            style: {}
        }, {
            className: '.app-accordion-header-expand-icon',
            rnStyleSelector: 'app-accordion.icon',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading .wi-plus',
            style: {}
        }, {
            className: '.app-accordion-header-left-toggle-icon',
            rnStyleSelector: 'app-accordion.leftToggleIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-accordion-header-right-toggle-icon',
            rnStyleSelector: 'app-accordion.rightToggleIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-accordion-header-collapse-icon',
            rnStyleSelector: 'app-accordion.activeIcon',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading .wi-minus',
            style: {
                'color': '@accordionActiveHeaderTextColor'
            }
        }, {
            className: '.app-accordion-header-badge',
            rnStyleSelector: 'app-accordion.badge',
            studioStyleSelector: '.app-accordion >.app-accordion-panel >.panel-heading .panel-actions .label',
            style: {
                'color': '@accordionIconColor'
            }
        }, {
            className: '.app-accordion-active-header-badge',
            rnStyleSelector: 'app-accordion.activeBadge',
            studioStyleSelector: '',
            style: {
                'border-color': '@accordionActiveHeaderTextColor',
                'color': '@accordionActiveHeaderTextColor'
            }
        }, {
            className: '.app-accordion-skeleton',
            rnStyleSelector: 'app-accordion.skeleton',
            studioStyleSelector: '.app-accordion-skeleton',
            style: {}
        },
        getBadgeStyle('default', '@transparent'),
        getBadgeStyle('danger', '@labelDangerColor'),
        getBadgeStyle('success', '@labelSuccessColor'),
        getBadgeStyle('warning', '@labelWarningColor'),
        getBadgeStyle('info', '@labelInfoColor'),
        getBadgeStyle('primary', '@labelPrimaryColor')
    ])
};
//# sourceMappingURL=accordion.styledef.js.map
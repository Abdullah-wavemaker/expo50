"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPanelStyle = (type, color) => ([
    {
        className: `.panel-${type}.app-panel-header`,
        style: {
            'background-color': color
        }
    }, {
        className: `.panel-${type}.app-panel-title`,
        style: {
            'color': '@panelTextColor'
        }
    }, {
        className: `.panel-${type}.app-panel-sub-title`,
        style: {
            'color': '@panelTextColor'
        }
    }, {
        className: `.panel-${type}.app-panel-icon .app-icon-text`,
        style: {
            'color': '@panelTextColor'
        }
    }
]);
const getBadgeStyle = (badgeClass, color) => ({
    className: `.app-panel-${badgeClass}-badge`,
    rnStyleSelector: `app-panel.${badgeClass}`,
    studioStyleSelector: `.app-panel .panel-heading .panel-actions .label.label-${badgeClass}`,
    style: {
        'background-color': color,
        'color': '@defaultColorF'
    }
});
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-panel',
            rnStyleSelector: 'app-panel.root',
            studioStyleSelector: '.app-panel',
            style: {
                'background-color': '@panelBgColor'
            }
        }, {
            className: '.app-panel-title',
            rnStyleSelector: 'app-panel.text',
            studioStyleSelector: '.app-panel .panel-heading .heading',
            style: {
                color: '@panelHeaderTextColor'
            }
        }, {
            className: '.app-panel-header',
            rnStyleSelector: 'app-panel.header',
            studioStyleSelector: '.app-panel .panel-heading',
            style: {
                'background-color': '@panelHeaderBgColor',
                'border-color': '@panelHeaderBgColor'
            }
        }, {
            className: '.app-panel-sub-title',
            rnStyleSelector: 'app-panel.subHeading',
            studioStyleSelector: '.app-panel .panel-heading .description',
            style: {}
        }, {
            className: '.app-panel-icon',
            rnStyleSelector: 'app-panel.icon',
            studioStyleSelector: '.app-panel .panel-heading ',
            style: {}
        }, {
            className: '.app-panel-toggle-icon',
            rnStyleSelector: 'app-panel.toggleIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-panel-badge',
            rnStyleSelector: 'app-panel.badge',
            studioStyleSelector: '.app-panel .panel-heading .app-badge',
            style: {
                color: '@badgeTextColor'
            }
        },
        getBadgeStyle('default', '@labelDefaultColor'),
        getBadgeStyle('danger', '@labelDangerColor'),
        getBadgeStyle('success', '@labelSuccessColor'),
        getBadgeStyle('warning', '@labelWarningColor'),
        getBadgeStyle('info', '@labelInfoColor'),
        getBadgeStyle('primary', '@labelPrimaryColor'),
        ...getPanelStyle('default', '@panelDefaultColor'),
        ...getPanelStyle('danger', '@panelDangerColor'),
        ...getPanelStyle('success', '@panelSuccessColor'),
        ...getPanelStyle('warning', '@panelWarningColor'),
        ...getPanelStyle('info', '@panelInfoColor'),
        ...getPanelStyle('primary', '@panelPrimaryColor')
    ])
};
//# sourceMappingURL=panel.styledef.js.map
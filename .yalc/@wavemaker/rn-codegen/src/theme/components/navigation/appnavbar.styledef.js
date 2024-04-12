"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-appnavbar',
            rnStyleSelector: 'app-appnavbar.root',
            studioStyleSelector: '.app-mobile-navbar',
            style: {
                'background-color': '@navbarBackgroundColor'
            }
        }, {
            className: '.app-appnavbar-action',
            rnStyleSelector: 'app-appnavbar.action',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-left a',
            style: {}
        }, {
            className: '.app-appnavbar-left-section',
            rnStyleSelector: 'app-appnavbar.leftSection',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-appnavbar-middle-section',
            rnStyleSelector: 'app-appnavbar.middleSection',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-appnavbar-right-section',
            rnStyleSelector: 'app-appnavbar.rightSection',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-appnavbar-left-icon',
            rnStyleSelector: 'app-appnavbar.leftnavIcon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-left li[ng-if="showLeftnav"] a',
            style: {}
        }, {
            className: '.app-appnavbar-left-icon .app-icon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-left li[ng-if="showLeftnav"] a',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }, {
            className: '.app-appnavbar-back-icon',
            rnStyleSelector: 'app-appnavbar.backIcon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-left li[ng-if="backbutton"] a.btn-back',
            style: {}
        }, {
            className: '.app-appnavbar-back-icon .app-icon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-left li[ng-if="backbutton"] a.btn-back',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }, {
            className: '.app-appnavbar-image',
            rnStyleSelector: 'app-appnavbar.image',
            studioStyleSelector: '.app-mobile-navbar .brand-image',
            style: {
                width: '@navbarImageSize',
                height: '@navbarImageSize'
            }
        }, {
            className: '.app-appnavbar-content',
            rnStyleSelector: 'app-appnavbar.content',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-center',
            style: {
                'color': '@navbarTextColor',
                'font-size': 'unit(@navbarFontSize, px)'
            }
        }, {
            className: '.app-appnavbar-badge',
            rnStyleSelector: 'app-appnavbar.badge',
            style: {
                'background-color': '@titleBadgeBackgroundColor',
                'color': '@titleBadgeTextColor',
            }
        }, {
            className: '.navbar-anchor',
            rnStyleSelector: 'navbarAnchorItem.root',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-anchor',
            style: {}
        }, {
            className: '.navbar-anchor-text',
            rnStyleSelector: 'navbarAnchorItem.text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-anchor .anchor-caption',
            style: {
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbar-anchor-icon',
            rnStyleSelector: 'navbarAnchorItem.icon.text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-anchor .app-icon',
            style: {
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbar-button-icon',
            rnStyleSelector: 'navbarButton.icon.text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-button',
            style: {
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbar-button-text',
            rnStyleSelector: 'navbarButton.text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-button .app-icon',
            style: {
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbarMenu.app-menu-trigger',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-menu',
            style: {
                'background-color': 'transparent'
            }
        }, {
            className: '.navbarMenu.app-menu-trigger .app-anchor-icon .app-icon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-menu .app-anchor .app-icon',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbarMenu.app-menu-trigger .app-anchor-text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-menu .app-anchor .caption',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbarPopover.app-popover-link .app-anchor-icon .app-icon',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-anchor[widgettype="wm-popover"] .app-icon',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }, {
            className: '.navbarPopover.app-popover-link .app-anchor-text',
            studioStyleSelector: '.app-mobile-navbar .mobile-navbar-right .app-anchor[widgettype="wm-popover"] .caption',
            style: {
                'font-size': '@navbarIconSize',
                color: '@navbarTextColor'
            }
        }])
};
//# sourceMappingURL=appnavbar.styledef.js.map
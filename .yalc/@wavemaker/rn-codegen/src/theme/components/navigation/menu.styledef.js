"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-menu',
            rnStyleSelector: 'app-popover.popover',
            studioStyleSelector: '',
            style: {
                'background-color': '@popoverBackgroundColor'
            }
        }, {
            className: '.app-menu-trigger',
            rnStyleSelector: 'app-menu.link',
            studioStyleSelector: '.app-menu >.app-anchor',
        }, {
            className: '.app-menu-trigger .app-anchor-icon .app-icon',
            studioStyleSelector: '.app-menu >.app-anchor',
            style: {
                color: '@menuIconColor'
            }
        }, {
            className: '.app-menu-trigger .app-anchor-text',
            studioStyleSelector: '.app-menu >.app-anchor',
            style: {
                color: '@menuTextColor'
            }
        }, {
            className: '.app-menu-content',
            rnStyleSelector: 'app-menu.menu',
            studioStyleSelector: '',
            style: {
                'background-color': '@menuBackgroundColor'
            }
        }, {
            className: '.app-menu-item',
            rnStyleSelector: 'app-menu.menuItem',
            studioStyleSelector: '',
        }, {
            className: '.app-menu-item .app-anchor',
            style: {
                'border-bottom-color': '@menuItemBorderColor'
            }
        }, {
            className: '.app-menu-item .app-anchor-icon .app-icon-shape',
            style: {
                color: '@menuItemIconColor'
            }
        }, {
            className: '.app-menu-item .app-anchor-text',
            style: {
                color: '@menuItemTextColor'
            }
        }])
};
//# sourceMappingURL=menu.styledef.js.map
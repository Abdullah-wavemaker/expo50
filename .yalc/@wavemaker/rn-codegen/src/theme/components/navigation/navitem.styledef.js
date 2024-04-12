"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-navitem',
            rnStyleSelector: 'app-navitem.root',
            studioStyleSelector: '',
            style: {
                'border-color': '@navbarBorderColor'
            }
        }, {
            className: '.app-navitem-anchor',
            rnStyleSelector: 'app-navitem.navAnchorItem',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-navitem-caret',
            rnStyleSelector: 'app-navitem.caretIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-navitem-caret .app-icon-text',
            studioStyleSelector: '',
            style: {
                color: '@navbarCaretColor'
            }
        }, {
            className: '.app-navitem-active.app-navitem',
            style: {
                'background-color': '@navitemActiveBackgroundColor'
            }
        }, {
            className: '.app-navitem-active.app-navitem-anchor .app-anchor-text',
            style: {
                color: '@navitemActiveTextColor'
            }
        }, {
            className: '.app-navitem-active.app-navitem-anchor .app-anchor-icon .app-icon-shape',
            style: {
                color: '@navitemActiveIconColor'
            }
        }, {
            className: '.app-navitem-child.app-navitem',
            style: {
                'background-color': '@navitemChildBackgroundColor'
            }
        }, {
            className: '.app-navitem-child.app-navitem-anchor .app-anchor-text',
            style: {
                color: '@navitemChildTextColor'
            }
        }, {
            className: '.app-navitem-child.app-navitem-anchor .app-anchor-icon .app-icon-shape',
            style: {
                color: '@navitemChildIconColor'
            }
        }])
};
//# sourceMappingURL=navitem.styledef.js.map
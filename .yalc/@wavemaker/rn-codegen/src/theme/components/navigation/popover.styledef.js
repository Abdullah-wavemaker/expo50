"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-popover',
            rnStyleSelector: 'app-popover.popover',
            studioStyleSelector: '',
            style: {
                'background-color': '@popoverBackgroundColor'
            }
        }, {
            className: '.app-popover-title',
            rnStyleSelector: 'app-popover.title',
            studioStyleSelector: '',
            style: {
                'background-color': '@popoverTitleBackgroundColor',
                color: '@popoverTitleColor'
            }
        }, {
            className: '.app-popover-link',
            rnStyleSelector: 'app-popover.link',
            studioStyleSelector: 'a[widgettype="wm-popover"]',
        }, {
            className: '.app-popover-content',
            rnStyleSelector: 'app-popover.popoverContent.root',
            studioStyleSelector: '',
        }, {
            className: '.app-popover-modal-content',
            rnStyleSelector: 'app-popover.modalContent',
            studioStyleSelector: '',
        }])
};
//# sourceMappingURL=popover.styledef.js.map
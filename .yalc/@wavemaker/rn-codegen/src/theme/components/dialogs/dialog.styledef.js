"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-dialog',
            rnStyleSelector: 'app-dialog.root',
            studioStyleSelector: '',
            style: {
                'background-color': '@dialogBackgroundColor'
            }
        }, {
            className: '.app-dialog-modal',
            rnStyleSelector: 'app-dialog.modal',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-dialog-modal-content',
            rnStyleSelector: 'app-dialog.content',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-dialog-header',
            rnStyleSelector: 'app-dialog.header',
            studioStyleSelector: '.app-dialog>.modal-content>.app-dialog-header',
            style: {
                'border-color': '@dialogBorderColor'
            }
        }, {
            className: '.app-dialog-title',
            rnStyleSelector: 'app-dialog.headerLabel',
            studioStyleSelector: '.app-dialog>.modal-content>.app-dialog-header .modal-title',
            style: {}
        }, {
            className: '.app-dialog-icon',
            rnStyleSelector: 'app-dialog.icon',
            studioStyleSelector: '.app-dialog>.modal-content>.app-dialog-header .app-dialog-title i',
            style: {}
        }, {
            className: '.app-dialog-close-btn',
            rnStyleSelector: 'app-dialog.closeBtn',
            studioStyleSelector: '.app-dialog .app-dialog-footer .btn-primary',
            style: {}
        },])
};
//# sourceMappingURL=dialog.styledef.js.map
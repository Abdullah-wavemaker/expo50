"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-search',
            rnStyleSelector: 'app-search.root',
            studioStyleSelector: '.app-search',
            style: {}
        }, {
            className: '.app-search-text',
            rnStyleSelector: 'app-search.text',
            studioStyleSelector: '.app-search>input.app-textbox',
            style: {
                'border-color': '@searchBorderColor',
                'background-color': '@searchDropdownBackgroundColor',
            }
        }, {
            className: '.app-search-invalid',
            rnStyleSelector: 'app-search.invalid',
            studioStyleSelector: '.app-search>input.app-textbox.invalid',
            style: {
                'border-bottom-color': '@inputInvalidBorderColor',
            }
        }, {
            className: '.app-search-dropdown-content',
            rnStyleSelector: 'app-search.dropDownContent',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-search-text-wrapper',
            rnStyleSelector: 'app-search.searchInputWrapper',
            studioStyleSelector: '.app-search',
            style: {}
        }, {
            className: '.app-search-btn',
            rnStyleSelector: 'app-search.searchButton',
            studioStyleSelector: '.app-search .input-group-addon',
            style: {
                'background-color': '@searchButtonColor'
            }
        }, {
            className: '.app-search-btn .app-button-icon .app-icon-text',
            studioStyleSelector: '.app-search .input-group-addon',
            style: {
                color: '@searchButtonTextColor'
            }
        }, {
            className: '.app-search-item',
            rnStyleSelector: 'app-search.searchItem',
            studioStyleSelector: '',
            style: {
                'border-bottom-color': '@searchItemBorderColor',
                color: '@searchItemTextColor'
            }
        }, {
            className: '.app-search-item-text',
            rnStyleSelector: 'app-search.searchItemText',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-search-complete-item',
            rnStyleSelector: 'app-search.dataCompleteItem.root',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-search-placeholder',
            rnStyleSelector: 'app-search.placeholderText',
            studioStyleSelector: '',
            style: {
                color: '@inputPlaceholderColor'
            }
        }, {
            className: '.app-search-modal',
            rnStyleSelector: 'app-search.modal',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-search-modal-content',
            rnStyleSelector: 'app-search.modalContent',
            studioStyleSelector: '',
            style: {}
        },])
};
//# sourceMappingURL=search.styledef.js.map
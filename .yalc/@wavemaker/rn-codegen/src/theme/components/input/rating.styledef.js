"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-rating',
            rnStyleSelector: 'app-rating.root',
            studioStyleSelector: '.app-ratings',
            style: {}
        }, {
            className: '.app-rating-text',
            rnStyleSelector: 'app-rating.text',
            studioStyleSelector: '.app-ratings .caption',
            style: {
                color: '@ratingSelectedIconColor'
            }
        }, {
            className: '.app-rating-icon',
            rnStyleSelector: 'app-rating.icon.text',
            studioStyleSelector: '.app-ratings label',
            style: {
                color: '@ratingIconColor'
            }
        }, {
            className: '.app-rating-selected-icon',
            rnStyleSelector: 'app-rating.selectedIcon.text',
            studioStyleSelector: '.app-ratings label.active',
            style: {
                color: '@ratingSelectedIconColor'
            }
        }])
};
//# sourceMappingURL=rating.styledef.js.map
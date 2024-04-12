"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-card',
            rnStyleSelector: 'app-card.root',
            studioStyleSelector: '.app-card',
            style: {
                'border-color': '@cardBorderColor',
                'shadowColor': '@cardShadowColor',
                'background-color': '@cardBgColor'
            }
        }, {
            className: '.app-card-icon',
            rnStyleSelector: 'app-card.cardIcon',
            studioStyleSelector: '.app-card .app-card-avatar ',
            style: {}
        }, {
            className: '.app-card-header',
            rnStyleSelector: 'app-card.heading',
            studioStyleSelector: '.app-card .app-card-header',
            style: {
                'background-color': '@cardHeaderBgColor'
            }
        }, {
            className: '.app-card-title',
            rnStyleSelector: 'app-card.title.root',
            studioStyleSelector: '.app-card .app-card-header .card-heading',
            style: {
                color: '@cardTitleColor'
            }
        }, {
            className: '.app-card-sub-title',
            rnStyleSelector: 'app-card.subheading.root',
            studioStyleSelector: '.app-card .app-card-header .card-subheading',
            style: {
                color: '@cardSubTitleColor'
            }
        }, {
            className: '.app-card-picture',
            rnStyleSelector: 'app-card.picture',
            studioStyleSelector: '.app-card .app-card-header .img-circle',
            style: {}
        }])
};
//# sourceMappingURL=card.styledef.js.map
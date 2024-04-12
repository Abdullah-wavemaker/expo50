"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-slider',
            rnStyleSelector: 'app-slider.root',
            studioStyleSelector: '.app-slider',
            style: {}
        }, {
            className: '.app-slider-text',
            rnStyleSelector: 'app-slider.text',
            style: {}
        }, {
            className: '.app-slider-minimum-text',
            rnStyleSelector: 'app-slider.minimumValue',
            style: {}
        }, {
            className: '.app-slider-maximum-text',
            rnStyleSelector: 'app-slider.maximumValue',
            style: {}
        }, {
            className: '.app-slider-value-text',
            rnStyleSelector: 'app-slider.value',
            style: {}
        }, {
            className: '.app-slider-minimum-track',
            rnStyleSelector: 'app-slider.minimumTrack',
            studioStyleSelector: '.app-slider .app-slider-value',
            style: {
                'background-color': '@minimumTrackTintColor'
            }
        }, {
            className: '.app-slider-maximum-track',
            rnStyleSelector: 'app-slider.maximumTrack',
            studioStyleSelector: '.app-slider .app-slider-value',
            style: {
                'background-color': '@maximumTrackTintColor'
            }
        }, {
            className: '.app-slider-thumb',
            rnStyleSelector: 'app-slider.thumb',
            studioStyleSelector: '.app-slider .range-input',
            style: {
                'background-color': '@thumbTintColor',
                'color': '@thumbTintColor'
            }
        }])
};
//# sourceMappingURL=slider.styledef.js.map
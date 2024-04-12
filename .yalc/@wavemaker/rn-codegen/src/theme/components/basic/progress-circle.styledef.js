"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStyle = (className, type, color) => ([{
        className: `.${className}.app-progress-circle-bg`,
        studioStyleSelector: `.app-progress[type="${type}"]>svg path:first-child`,
        style: {
            'background-color': `fade(${color}, 60%)`,
            stroke: `fade(${color}, 60%)`
        }
    }, {
        className: `.${className}.app-progress-circle-value`,
        studioStyleSelector: `.app-progress[type="${type}"]>svg path:nth-child(2)`,
        style: {
            color: color,
            stroke: color
        }
    }]);
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-progress-circle',
            rnStyleSelector: 'app-progress-circle.root',
            studioStyleSelector: '.app-progress',
            style: {}
        }, {
            className: '.app-progress-circle-text',
            rnStyleSelector: 'app-progress-circle.text',
            studioStyleSelector: '.app-progress.app-progress-label',
            style: {}
        }, {
            className: '.app-progress-circle-bg',
            rnStyleSelector: 'app-progress-circle.progressCircle',
            studioStyleSelector: '.app-progress>svg>path:first-child',
            style: {
                'background-color': 'fade(@progressCircleDefaultColor, 60%)',
                stroke: 'fade(@progressCircleDefaultColor, 60%)'
            }
        }, {
            className: '.app-progress-circle-value',
            rnStyleSelector: 'app-progress-circle.progressValue',
            studioStyleSelector: '.app-progress>svg>path:nth-child(2)',
            style: {
                color: '@progressCircleDefaultColor',
                stroke: '@progressCircleDefaultColor'
            }
        }, {
            className: '.app-progress-circle-subtitle',
            rnStyleSelector: 'app-progress-circle.subTitle',
            studioStyleSelector: '',
            style: {
                color: '@labelTextMutedColor'
            }
        },
        ...getStyle('app-default-progress-circle', 'default', '@progressCircleDefaultColor'),
        ...getStyle('app-success-progress-circle', 'success', '@progressCircleSuccessColor'),
        ...getStyle('app-info-progress-circle', 'info', '@progressCircleInfoColor'),
        ...getStyle('app-danger-progress-circle', 'danger', '@progressCircleDangerColor'),
        ...getStyle('app-warning-progress-circle', 'warning', '@progressCircleWarningColor'),
    ])
};
//# sourceMappingURL=progress-circle.styledef.js.map
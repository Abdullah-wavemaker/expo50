"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStyle = (className, type, color) => ([{
        className: `.${className}.app-progress-bar-bg`,
        rnStyleSelector: `app-${type}-progress-bar.progressBar`,
        studioStyleSelector: `.app-progress[type="${type}"]`,
        style: {
            'background-color': `fade(${color}, 20%)`
        }
    }, {
        className: `.${className}.app-progress-bar-value`,
        rnStyleSelector: `app-${type}-progress-bar.progressValue`,
        studioStyleSelector: `.app-progress >.progress-bar-${type}`,
        style: {
            color: color
        }
    }]);
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-progress-bar',
            rnStyleSelector: 'app-progress-bar.root',
            studioStyleSelector: '.app-progress',
            style: {}
        }, {
            className: '.app-progress-bar-text',
            rnStyleSelector: 'app-progress-bar.text',
            studioStyleSelector: '.app-progress.app-progress-label',
            style: {}
        }, {
            className: '.app-progress-bar-bg',
            rnStyleSelector: 'app-progress-bar.progressBar',
            studioStyleSelector: '.app-progress',
            style: {}
        }, {
            className: '.app-progress-bar-value',
            rnStyleSelector: 'app-progress-bar.progressValue',
            studioStyleSelector: '.app-progress',
            style: {}
        },
        ...getStyle('app-default-progress-bar', 'default', '@progressBarDefaultColor'),
        ...getStyle('app-success-progress-bar', 'success', '@progressBarSuccessColor'),
        ...getStyle('app-info-progress-bar', 'info', '@progressBarInfoColor'),
        ...getStyle('app-danger-progress-bar', 'danger', '@progressBarDangerColor'),
        ...getStyle('app-warning-progress-bar', 'warning', '@progressBarWarningColor'),
    ])
};
//# sourceMappingURL=progress-bar.styledef.js.map
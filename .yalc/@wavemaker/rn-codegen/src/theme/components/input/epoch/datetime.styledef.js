"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpochStyles = void 0;
const getEpochStyles = (className, widgetType) => ([{
        className: `.${className}`,
        rnStyleSelector: `${className}.root`,
        studioStyleSelector: `input[widgettype="${widgetType}"]`,
        style: {
            'background-color': '@inputBackgroundColor',
            'border-color': '@inputBorderColor'
        }
    }, {
        className: `.${className}-text`,
        rnStyleSelector: `${className}.text`,
        studioStyleSelector: `input[widgettype="${widgetType}"]`,
        style: {
            color: '@inputTextColor'
        }
    }, {
        className: `.${className}-invalid`,
        rnStyleSelector: `${className}.invalid`,
        studioStyleSelector: `input[widgettype="${widgetType}"]`,
        style: {
            'border-bottom-color': '@inputInvalidBorderColor',
        }
    }, {
        className: `.${className}-clear-icon`,
        rnStyleSelector: `${className}.clearIcon`,
        studioStyleSelector: '',
        style: {}
    }, {
        className: `.${className}-calendar-icon`,
        rnStyleSelector: `${className}.calendarIcon`,
        studioStyleSelector: '',
        style: {}
    }, {
        className: `.${className}-flotaing-label`,
        rnStyleSelector: 'app-textarea.floatingLabel',
        style: {}
    }, {
        className: `.${className}-active-flotaing-label`,
        rnStyleSelector: 'app-textarea.activeFloatingLabel',
        style: {}
    }, {
        className: `.${className}-action-wrapper`,
        rnStyleSelector: `${className}.actionWrapper`,
        style: {}
    }, {
        className: `.${className}-select-btn`,
        rnStyleSelector: `${className}.selectBtn`,
        style: {}
    }, {
        className: `.${className}-cancel-btn`,
        rnStyleSelector: `${className}.cancelBtn`,
        style: {}
    }, {
        className: `.${className}-ios-dialog`,
        rnStyleSelector: `${className}.dialog`,
        style: {}
    },]);
exports.getEpochStyles = getEpochStyles;
exports.default = {
    getStyleDefs: () => (0, exports.getEpochStyles)('app-datetime', 'wm-datetime')
};
//# sourceMappingURL=datetime.styledef.js.map
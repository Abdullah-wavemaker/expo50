"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProperty = void 0;
const lodash_1 = require("lodash");
const dimension_style_parser_1 = require("../style/dimension-style.parser");
const base_parser_1 = require("./base-parser");
const show_in_device_parser_1 = require("./show-in-device.parser");
class NumericParser extends base_parser_1.Parser {
    parse(value) {
        const dimensionVal = new dimension_style_parser_1.DimensionStyleParser('dimension').parse(value).dimension;
        return (0, lodash_1.isString)(dimensionVal) && dimensionVal.endsWith('%')
            ? `{'${dimensionVal}'}` : `{${dimensionVal}}`;
    }
    parseBind(value) {
        return `fragment.toNumber(${value})`;
    }
}
class BooleanParser extends base_parser_1.Parser {
    parse(value) {
        if (value === 'true' || value === 'false') {
            return `{${(value === 'true')}}`;
        }
        return super.parse(value);
    }
    parseBind(value) {
        return value == 'true' ? true : value == 'false' ? false : value;
    }
}
const NUMERIC_PARSER = new NumericParser();
const BOOLEAN_PARSER = new BooleanParser();
const STRING_PARSER = new base_parser_1.Parser();
const PARSER_MAP = new Map([['base', new Map([
            ['animationinterval', NUMERIC_PARSER],
            ['autofocus', BOOLEAN_PARSER],
            ['autocomplete', BOOLEAN_PARSER],
            ['autotrim', BOOLEAN_PARSER],
            ['autoplay', BOOLEAN_PARSER],
            ['backbutton', BOOLEAN_PARSER],
            ['cache', BOOLEAN_PARSER],
            ['checkedvalue', BOOLEAN_PARSER],
            ['collapsible', BOOLEAN_PARSER],
            ['columnwidth', NUMERIC_PARSER],
            ['controls', BOOLEAN_PARSER],
            ['closable', BOOLEAN_PARSER],
            ['closeothers', BOOLEAN_PARSER],
            ['defaultpaneindex', NUMERIC_PARSER],
            ['deferload', BOOLEAN_PARSER],
            ['disabled', BOOLEAN_PARSER],
            ['disableitem', BOOLEAN_PARSER],
            ['donutratio', NUMERIC_PARSER],
            ['encodeurl', BOOLEAN_PARSER],
            ['expanded', BOOLEAN_PARSER],
            ['flexgrow', NUMERIC_PARSER],
            ['flexshrink', NUMERIC_PARSER],
            ['hideclose', BOOLEAN_PARSER],
            ['iconsize', NUMERIC_PARSER],
            ['imageheight', NUMERIC_PARSER],
            ['imagequality', NUMERIC_PARSER],
            ['imagetargetwidth', NUMERIC_PARSER],
            ['imagetargetheight', NUMERIC_PARSER],
            ['imagewidth', NUMERIC_PARSER],
            ['index', NUMERIC_PARSER],
            ['isDataSetBound', BOOLEAN_PARSER],
            ['isRelated', BOOLEAN_PARSER],
            ['limit', NUMERIC_PARSER],
            ['loop', BOOLEAN_PARSER],
            ['minchars', NUMERIC_PARSER],
            ['maxchars', NUMERIC_PARSER],
            ['maxsize', NUMERIC_PARSER],
            ['maxvalue', NUMERIC_PARSER],
            ['minvalue', NUMERIC_PARSER],
            ['multiselect', BOOLEAN_PARSER],
            ['modal', BOOLEAN_PARSER],
            ['multilineskeleton', BOOLEAN_PARSER],
            ['muted', BOOLEAN_PARSER],
            ['pagesize', NUMERIC_PARSER],
            ['primaryKey', BOOLEAN_PARSER],
            ['offsettop', NUMERIC_PARSER],
            ['offsetbottom', NUMERIC_PARSER],
            ['offsetleft', NUMERIC_PARSER],
            ['offsetright', NUMERIC_PARSER],
            ['refreshdataonattach', BOOLEAN_PARSER],
            ['readonly', BOOLEAN_PARSER],
            ['required', BOOLEAN_PARSER],
            ['scrollable', BOOLEAN_PARSER],
            ['show', BOOLEAN_PARSER],
            ['showindevice', show_in_device_parser_1.SHOW_IN_DEVICE_PARSER],
            ['showskeleton', BOOLEAN_PARSER],
            ['showclear', BOOLEAN_PARSER],
            ['searchbutton', BOOLEAN_PARSER],
            ['selectionlimit', NUMERIC_PARSER],
            ['selectfirstitem', BOOLEAN_PARSER],
            ['showcaptions', BOOLEAN_PARSER],
            ['showheader', BOOLEAN_PARSER],
            ['speed', NUMERIC_PARSER],
            ['step', NUMERIC_PARSER],
            ['uncheckedvalue', BOOLEAN_PARSER],
            ['updateMode', BOOLEAN_PARSER],
            ['vertical', BOOLEAN_PARSER],
            ['xscolumnwidth', NUMERIC_PARSER],
            ['cancelable', BOOLEAN_PARSER],
            ['highlightpoints', BOOLEAN_PARSER],
            ['tooltips', BOOLEAN_PARSER],
            ['showvalues', BOOLEAN_PARSER],
            ['showyaxis', BOOLEAN_PARSER],
            ['showxaxis', BOOLEAN_PARSER],
            ['skeletonwidth', NUMERIC_PARSER],
            ['skeletonheight', NUMERIC_PARSER],
            ['wrap', BOOLEAN_PARSER],
            ['thickness', NUMERIC_PARSER],
            ['tooltipwidth', NUMERIC_PARSER],
            ['tooltipheight', NUMERIC_PARSER],
            ['tooltippointerlength', NUMERIC_PARSER],
            ['tooltippointerwidth', NUMERIC_PARSER],
            ['tooltipcenteroffsetx', NUMERIC_PARSER],
            ['tooltipcenteroffsety', NUMERIC_PARSER],
            ['tooltipcenteroffsety', NUMERIC_PARSER],
            ['iconheight', NUMERIC_PARSER],
            ['iconwidth', NUMERIC_PARSER],
            ['iconmargin', NUMERIC_PARSER],
            ['offsetxaxis', NUMERIC_PARSER],
            ['offsetyaxis', NUMERIC_PARSER],
            ['yaxislabeldistance', NUMERIC_PARSER],
            ['xaxislabeldistance', NUMERIC_PARSER],
            ['enableskip', BOOLEAN_PARSER],
            ['disableprev', BOOLEAN_PARSER],
            ['disablenext', BOOLEAN_PARSER],
            ['disabledone', BOOLEAN_PARSER],
            ['showprev', BOOLEAN_PARSER],
            ['shownext', BOOLEAN_PARSER],
            ['showdone', BOOLEAN_PARSER],
            ['nooflines', NUMERIC_PARSER],
            ['autoadjustlabels', BOOLEAN_PARSER],
        ])
    ], ['wm-checkbox', new Map([
            ['datavalue', BOOLEAN_PARSER]
        ])], ['wm-toggle', new Map([
            ['datavalue', BOOLEAN_PARSER]
        ])], ['wm-number', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])], ['wm-currency', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])], ['wm-rating', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])], ['wm-slider', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])], ['wm-progress-bar', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])], ['wm-progress-circle', new Map([
            ['datavalue', NUMERIC_PARSER]
        ])]]);
const parseProperty = (value, propertyName, widgetName, runtime = false) => {
    var _a, _b;
    if ((0, lodash_1.isUndefined)(value)) {
        return `""`;
    }
    let parser = (_a = PARSER_MAP.get(widgetName)) === null || _a === void 0 ? void 0 : _a.get(propertyName);
    parser = parser || ((_b = PARSER_MAP.get('base')) === null || _b === void 0 ? void 0 : _b.get(propertyName));
    if (parser) {
        return runtime ? parser.parseBind(value) : parser.parse(value);
    }
    return runtime ? STRING_PARSER.parseBind(value) : STRING_PARSER.parse(value);
};
exports.parseProperty = parseProperty;
//# sourceMappingURL=property-parser.js.map
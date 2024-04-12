"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const style_parser_1 = require("./style/style.parser");
const dimension_style_parser_1 = require("./style/dimension-style.parser");
const margin_parser_1 = require("./style/margin.parser");
const padding_parser_1 = require("./style/padding.parser");
const border_width_parser_1 = require("./style/border-width.parser");
const numeric_style_parser_1 = require("./style/numeric-style.parser");
const horizontal_align_parser_1 = require("./style/horizontal-align.parser");
const background_image_parser_1 = require("./style/background-image.parser");
const StyleProps = new Map([
    ['backgroundimage', new background_image_parser_1.BackgroundImageParser()],
    ['backgroundsize', new style_parser_1.StyleParser('backgroundSize')],
    ['backgroundrepeat', new style_parser_1.StyleParser('backgroundRepeat')],
    ['backgroundresizemode', new style_parser_1.StyleParser('backgroundResizeMode')],
    ['backgroundposition', new style_parser_1.StyleParser('backgroundPosition')],
    ['backgroundcolor', new style_parser_1.StyleParser('backgroundColor')],
    ['bordercolor', new style_parser_1.StyleParser('borderColor')],
    ['borderradius', new dimension_style_parser_1.DimensionStyleParser('borderRadius')],
    ['borderstyle', new style_parser_1.StyleParser('borderStyle')],
    ['borderwidth', new border_width_parser_1.BorderWidthParser('borderWidth')],
    ['borderbottomwidth', new dimension_style_parser_1.DimensionStyleParser('borderBottomWidth')],
    ['borderleftwidth', new dimension_style_parser_1.DimensionStyleParser('borderLeftWidth')],
    ['borderrightwidth', new dimension_style_parser_1.DimensionStyleParser('borderRightWidth')],
    ['bordertopwidth', new dimension_style_parser_1.DimensionStyleParser('borderTopWidth')],
    ['color', new style_parser_1.StyleParser('color')],
    //['cursor', ''],
    //['display', ''],
    ['fontsize', new dimension_style_parser_1.DimensionStyleParser('fontSize')],
    ['fontfamily', new style_parser_1.StyleParser('fontFamily')],
    ['fontstyle', new style_parser_1.StyleParser('fontStyle')],
    //['fontunit', ''],
    ['fontvariant', new style_parser_1.StyleParser('fontVariant')],
    ['fontweight', new style_parser_1.StyleParser('fontWeight')],
    ['height', new dimension_style_parser_1.DimensionStyleParser('height')],
    ['horizontalalign', new dimension_style_parser_1.DimensionStyleParser('horizontalAlign')],
    ['lineheight', new dimension_style_parser_1.DimensionStyleParser('lineHeight')],
    ['margin', new margin_parser_1.MarginParser()],
    ['marginbottom', new dimension_style_parser_1.DimensionStyleParser('marginBottom')],
    ['marginleft', new dimension_style_parser_1.DimensionStyleParser('marginLeft')],
    ['marginright', new dimension_style_parser_1.DimensionStyleParser('marginRight')],
    ['margintop', new dimension_style_parser_1.DimensionStyleParser('marginTop')],
    ['opacity', new numeric_style_parser_1.NumericalStyleParser('opacity')],
    ['overflow', new style_parser_1.StyleParser('overflow')],
    ['padding', new padding_parser_1.PaddingParser()],
    ['paddingbottom', new dimension_style_parser_1.DimensionStyleParser('paddingBottom')],
    ['paddingleft', new dimension_style_parser_1.DimensionStyleParser('paddingLeft')],
    ['paddingright', new dimension_style_parser_1.DimensionStyleParser('paddingRight')],
    ['paddingtop', new dimension_style_parser_1.DimensionStyleParser('paddingTop')],
    //['picturesource', ''],
    ['textalign', new style_parser_1.StyleParser('textAlign')],
    ['textdecoration', new style_parser_1.StyleParser('textDecorationLine')],
    ['horizontalalign', new horizontal_align_parser_1.HorizontalAlignParser()],
    ['verticalalign', new style_parser_1.StyleParser('textAlignVertical')],
    //['visibility', ''],
    //['whitespace', ''],
    ['width', new dimension_style_parser_1.DimensionStyleParser('width')],
    //['wordbreak', ''],
    ['zindex', new numeric_style_parser_1.NumericalStyleParser('zIndex')]
]);
const TextStyleProps = [
    'color',
    'fontSize',
    'fontFamily',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'lineHeight',
    'textAlign',
    'textDecorationLine',
    'textAlignVertical'
];
exports.default = (element, isStyleProperty) => {
    const rootStyle = {};
    const textStyle = {};
    StyleProps.forEach((parser, k) => {
        if (!!element.hasAttribute(k) && isStyleProperty && isStyleProperty(k)) {
            const value = element.getAttribute(k);
            element.removeAttribute(k);
            if (value) {
                if (value.startsWith('bind:')) {
                    rootStyle[parser.styleName || k] = value;
                }
                else {
                    (0, lodash_1.merge)(rootStyle, parser.parse(value));
                }
            }
        }
    });
    Object.keys(rootStyle).forEach(k => {
        if ((0, lodash_1.isNil)(rootStyle[k])) {
            delete rootStyle[k];
        }
    });
    if ((0, lodash_1.isEmpty)(rootStyle)) {
        return null;
    }
    if (rootStyle['borderStyle'] === 'none') {
        delete rootStyle['borderStyle'];
    }
    TextStyleProps.forEach(k => {
        textStyle[k] = rootStyle[k];
    });
    const styles = { root: rootStyle };
    if (!(0, lodash_1.isEmpty)(textStyle)) {
        styles.text = textStyle;
    }
    return styles;
};
//# sourceMappingURL=style.transformer.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export class StyleProps {
  constructor() {
    _defineProperty(this, "backgroundimage", void 0);
    _defineProperty(this, "backgroundsize", void 0);
    _defineProperty(this, "backgroundrepeat", void 0);
    _defineProperty(this, "backgroundresizemode", void 0);
    _defineProperty(this, "backgroundposition", void 0);
    _defineProperty(this, "backgroundcolor", void 0);
    _defineProperty(this, "bordercolor", void 0);
    _defineProperty(this, "borderradius", void 0);
    _defineProperty(this, "borderstyle", void 0);
    _defineProperty(this, "borderwidth", void 0);
    _defineProperty(this, "borderbottomwidth", void 0);
    _defineProperty(this, "borderleftwidth", void 0);
    _defineProperty(this, "borderrightwidth", void 0);
    _defineProperty(this, "bordertopwidth", void 0);
    _defineProperty(this, "color", void 0);
    _defineProperty(this, "display", void 0);
    _defineProperty(this, "fontsize", void 0);
    _defineProperty(this, "fontfamily", void 0);
    _defineProperty(this, "fontstyle", void 0);
    _defineProperty(this, "fontvariant", void 0);
    _defineProperty(this, "fontweight", void 0);
    _defineProperty(this, "height", void 0);
    _defineProperty(this, "horizontalalign", void 0);
    _defineProperty(this, "lineheight", void 0);
    _defineProperty(this, "margin", void 0);
    _defineProperty(this, "marginbottom", void 0);
    _defineProperty(this, "marginleft", void 0);
    _defineProperty(this, "marginright", void 0);
    _defineProperty(this, "margintop", void 0);
    _defineProperty(this, "opacity", void 0);
    _defineProperty(this, "overflow", void 0);
    _defineProperty(this, "padding", void 0);
    _defineProperty(this, "paddingbottom", void 0);
    _defineProperty(this, "paddingleft", void 0);
    _defineProperty(this, "paddingright", void 0);
    _defineProperty(this, "paddingtop", void 0);
    _defineProperty(this, "textalign", void 0);
    _defineProperty(this, "textdecoration", void 0);
    _defineProperty(this, "verticalalign", void 0);
    _defineProperty(this, "width", void 0);
    _defineProperty(this, "zindex", void 0);
  }
}
const styleMapping = {
  backgroundimage: 'backgroundImage',
  backgroundsize: 'backgroundSize',
  backgroundrepeat: 'backgroundRepeat',
  backgroundresizemode: 'backgroundResizeMode',
  backgroundposition: 'backgroundPosition',
  backgroundcolor: 'backgroundColor',
  bordercolor: 'borderColor',
  borderradius: 'borderRadius',
  borderstyle: 'borderStyle',
  borderwidth: 'borderWidth',
  borderbottomwidth: 'borderBottomWidth',
  borderleftwidth: 'borderLeftWidth',
  borderrightwidth: 'borderRightWidth',
  bordertopwidth: 'borderTopWidth',
  color: 'color',
  display: 'display',
  fontsize: 'fontSize',
  fontfamily: 'fontFamily',
  fontstyle: 'fontStyle',
  fontvariant: 'fontVariant',
  fontweight: 'fontWeight',
  height: 'height',
  //horizontalalign: any;
  lineheight: 'lineHeight',
  margin: 'margin',
  marginbottom: 'marginBottom',
  marginleft: 'marginLeft',
  marginright: 'marginRight',
  margintop: 'marginTop',
  opacity: 'opacity',
  overflow: 'overflow',
  padding: 'padding',
  paddingbottom: 'paddingBottom',
  paddingleft: 'paddingLeft',
  paddingright: 'paddingRight',
  paddingtop: 'paddingTop',
  textalign: 'textAlign',
  textdecoration: 'textDecoration',
  verticalalign: 'verticalAlign',
  width: 'width',
  zindex: 'zindex'
};
export const getStyleName = name => styleMapping[name];
//# sourceMappingURL=style-props.js.map
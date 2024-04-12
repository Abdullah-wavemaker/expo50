function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class BaseChartComponentProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "xaxisdatakey", '');
    _defineProperty(this, "yaxisdatakey", '');
    _defineProperty(this, "iconclass", '');
    _defineProperty(this, "dataset", void 0);
    _defineProperty(this, "type", '');
    _defineProperty(this, "title", '');
    _defineProperty(this, "subheading", '');
    _defineProperty(this, "theme", '');
    _defineProperty(this, "xaxislabel", '');
    _defineProperty(this, "xunits", '');
    _defineProperty(this, "staggerlabels", false);
    _defineProperty(this, "yaxislabel", '');
    _defineProperty(this, "yunits", '');
    _defineProperty(this, "yaxislabeldistance", undefined);
    _defineProperty(this, "xaxislabeldistance", undefined);
    _defineProperty(this, "offsetxaxis", undefined);
    _defineProperty(this, "offsetyaxis", undefined);
    _defineProperty(this, "customcolors", '');
    _defineProperty(this, "legendheight", 0);
    _defineProperty(this, "labellegendheight", 0);
    _defineProperty(this, "labeltype", 'percent');
    _defineProperty(this, "bubblesize", '');
    _defineProperty(this, "shape", '');
    _defineProperty(this, "loadingicon", 'fa fa-circle-o-notch fa-pulse');
    _defineProperty(this, "loadingdatamsg", 'Loading...');
    _defineProperty(this, "nodatamessage", 'No data found');
    _defineProperty(this, "offsetbottom", 50);
    _defineProperty(this, "offsettop", 70);
    _defineProperty(this, "offsetleft", 65);
    _defineProperty(this, "offsetright", 25);
    _defineProperty(this, "showlegend", 'top');
    _defineProperty(this, "showlabels", 'outside');
    _defineProperty(this, "tooltips", false);
    _defineProperty(this, "interpolation", 'linear');
    _defineProperty(this, "highlightpoints", false);
    _defineProperty(this, "showvalues", false);
    _defineProperty(this, "showyaxis", true);
    _defineProperty(this, "showxaxis", true);
    _defineProperty(this, "ydomain", 'Min');
    _defineProperty(this, "xdomain", 'Min');
    _defineProperty(this, "labelangle", 0);
    _defineProperty(this, "xtickexpr", void 0);
    _defineProperty(this, "ytickexpr", void 0);
    _defineProperty(this, "hidegridxaxis", false);
    _defineProperty(this, "hidegridyaxis", false);
    _defineProperty(this, "autoadjustlabels", false);
    _defineProperty(this, "tooltiporientation", 'top');
    _defineProperty(this, "tooltipwidth", undefined);
    _defineProperty(this, "tooltipheight", undefined);
    _defineProperty(this, "tooltippointerlength", undefined);
    _defineProperty(this, "tooltippointerwidth", undefined);
    _defineProperty(this, "tooltipcenteroffsetx", undefined);
    _defineProperty(this, "tooltipcenteroffsety", undefined);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", 'none');
  }
}
//# sourceMappingURL=basechart.props.js.map
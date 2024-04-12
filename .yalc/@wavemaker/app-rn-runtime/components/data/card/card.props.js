function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmCardProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "children", null);
    _defineProperty(this, "actions", null);
    _defineProperty(this, "itemlabel", null);
    _defineProperty(this, "itemlink", null);
    _defineProperty(this, "itemicon", null);
    _defineProperty(this, "itembadge", null);
    _defineProperty(this, "isactive", null);
    _defineProperty(this, "itemchildren", null);
    _defineProperty(this, "iconclass", null);
    _defineProperty(this, "imageheight", 200);
    _defineProperty(this, "picturesource", null);
    _defineProperty(this, "subheading", null);
    _defineProperty(this, "title", null);
    _defineProperty(this, "iconurl", null);
    _defineProperty(this, "iconheight", null);
    _defineProperty(this, "iconwidth", null);
    _defineProperty(this, "iconmargin", null);
  }
}
//# sourceMappingURL=card.props.js.map
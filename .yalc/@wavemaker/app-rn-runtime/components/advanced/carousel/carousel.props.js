function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmCarouselProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "dataset", null);
    _defineProperty(this, "type", 'static');
    _defineProperty(this, "animation", 'auto');
    _defineProperty(this, "animationinterval", 3);
    _defineProperty(this, "controls", 'both');
    _defineProperty(this, "children", null);
    _defineProperty(this, "itemkey", null);
    _defineProperty(this, "renderSlide", void 0);
    _defineProperty(this, "enablegestures", true);
    _defineProperty(this, "maxnoofdots", 20);
  }
}
//# sourceMappingURL=carousel.props.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmLabelProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "animation", null);
    _defineProperty(this, "caption", 'Label');
    _defineProperty(this, "required", null);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "wrap", true);
    _defineProperty(this, "nooflines", undefined);
    _defineProperty(this, "skeletonheight", null);
    _defineProperty(this, "skeletonwidth", null);
    _defineProperty(this, "multilineskeleton", false);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", 'text');
    _defineProperty(this, "onTap", null);
  }
}
//# sourceMappingURL=label.props.js.map
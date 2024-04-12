function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseNavProps } from '@wavemaker/app-rn-runtime/components/navigation/basenav/basenav.props';
export default class WmNavbarProps extends BaseNavProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "type", 'pills');
    _defineProperty(this, "layout", '');
    _defineProperty(this, "children", []);
    _defineProperty(this, "indent", 0);
    _defineProperty(this, "onSelect", ($event, target, $item) => {});
    _defineProperty(this, "ischildnav", false);
  }
}
//# sourceMappingURL=navbar.props.js.map
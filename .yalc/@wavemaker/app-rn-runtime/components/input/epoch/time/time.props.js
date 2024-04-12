function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import WmDatetimeProps from '../datetime/datetime.props';
export default class WmDateProps extends WmDatetimeProps {
  constructor() {
    super();
    _defineProperty(this, "timepattern", '');
    this.mode = 'time';
    this.placeholder = 'Select time';
    this.datepattern = this.timepattern;
    this.outputformat = 'HH:mm:ss';
  }
}
//# sourceMappingURL=time.props.js.map
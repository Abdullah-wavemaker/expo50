function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmDatetimeProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "mode", 'datetime');
    _defineProperty(this, "datavalue", undefined);
    _defineProperty(this, "datepattern", '');
    _defineProperty(this, "outputformat", 'timestamp');
    _defineProperty(this, "mindate", undefined);
    _defineProperty(this, "maxdate", undefined);
    _defineProperty(this, "placeholder", 'Select date time');
    _defineProperty(this, "readonly", false);
    _defineProperty(this, "onFieldChange", void 0);
    _defineProperty(this, "locale", '');
    _defineProperty(this, "timestamp", void 0);
    _defineProperty(this, "triggerValidation", void 0);
    _defineProperty(this, "floatinglabel", void 0);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", "none");
    _defineProperty(this, "accessibilitylabelledby", undefined);
  }
}
//# sourceMappingURL=datetime.props.js.map
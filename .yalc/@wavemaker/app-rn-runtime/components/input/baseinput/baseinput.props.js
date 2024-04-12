function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class BaseInputProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "autofocus", null);
    _defineProperty(this, "autocomplete", true);
    _defineProperty(this, "autotrim", true);
    _defineProperty(this, "datavalue", void 0);
    _defineProperty(this, "maxchars", null);
    _defineProperty(this, "readonly", null);
    _defineProperty(this, "regexp", null);
    _defineProperty(this, "type", 'text');
    _defineProperty(this, "updateon", 'blur');
    _defineProperty(this, "required", false);
    _defineProperty(this, "checkFormField", void 0);
    _defineProperty(this, "onFieldChange", void 0);
    _defineProperty(this, "triggerValidation", void 0);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", "none");
    _defineProperty(this, "accessibilitylabelledby", undefined);
    _defineProperty(this, "maskchar", null);
    _defineProperty(this, "displayformat", null);
  }
}
//# sourceMappingURL=baseinput.props.js.map
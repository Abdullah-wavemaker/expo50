function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmFormFieldProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "formRef", void 0);
    _defineProperty(this, "defaultvalue", void 0);
    _defineProperty(this, "generator", '');
    _defineProperty(this, "datavalue", void 0);
    _defineProperty(this, "onChange", void 0);
    _defineProperty(this, "renderFormFields", void 0);
    _defineProperty(this, "validationmessage", void 0);
    _defineProperty(this, "required", false);
    _defineProperty(this, "primaryKey", false);
    _defineProperty(this, "isRelated", void 0);
    _defineProperty(this, "widget", void 0);
    _defineProperty(this, "onFieldChange", void 0);
    _defineProperty(this, "formKey", '');
    _defineProperty(this, "dataset", void 0);
    _defineProperty(this, "displayfield", void 0);
    _defineProperty(this, "datafield", '');
    _defineProperty(this, "isDataSetBound", false);
    _defineProperty(this, "readonly", false);
    _defineProperty(this, "onValidate", void 0);
    _defineProperty(this, "formScope", () => {});
    _defineProperty(this, "maskchar", null);
    _defineProperty(this, "displayformat", null);
  }
}
//# sourceMappingURL=form-field.props.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmFormProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "dataoutput", void 0);
    _defineProperty(this, "onBeforesubmit", void 0);
    _defineProperty(this, "formdata", void 0);
    _defineProperty(this, "parentForm", '');
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "title", void 0);
    _defineProperty(this, "subheading", void 0);
    _defineProperty(this, "iconclass", void 0);
    _defineProperty(this, "postmessage", 'Data posted successfully');
    _defineProperty(this, "errormessage", 'An error occured. Please try again!');
    _defineProperty(this, "messagelayout", 'Inline');
    _defineProperty(this, "formSubmit", () => {});
    _defineProperty(this, "formSuccess", () => {});
    _defineProperty(this, "relatedData", () => {});
    _defineProperty(this, "onSuccess", () => {});
    _defineProperty(this, "onError", () => {});
    _defineProperty(this, "onBeforerender", () => {});
    _defineProperty(this, "generateComponent", metadata => {});
  }
}
//# sourceMappingURL=form.props.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmWizardProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "actionsalignment", 'right');
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "cancelable", true);
    _defineProperty(this, "cancelbtnlabel", 'Cancel');
    _defineProperty(this, "donebtnlabel", 'Done');
    _defineProperty(this, "nextbtnlabel", 'Next');
    _defineProperty(this, "previousbtnlabel", 'Previous');
    _defineProperty(this, "defaultstep", 'none');
    _defineProperty(this, "progresstitle", '');
    _defineProperty(this, "progresstype", 'default');
    _defineProperty(this, "getmenudataexpression", undefined);
    _defineProperty(this, "popovericonclass", 'fa fa-caret-down');
  }
}
//# sourceMappingURL=wizard.props.js.map
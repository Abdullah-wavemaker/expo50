function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmDialogProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "animation", null);
    _defineProperty(this, "show", false);
    _defineProperty(this, "children", null);
    _defineProperty(this, "closable", true);
    _defineProperty(this, "dialogtype", 'design-dialog');
    _defineProperty(this, "iconclass", '');
    _defineProperty(this, "modal", true);
    _defineProperty(this, "showheader", true);
    _defineProperty(this, "title", '');
    _defineProperty(this, "onOpened", null);
    _defineProperty(this, "iconurl", null);
    _defineProperty(this, "iconheight", null);
    _defineProperty(this, "iconwidth", null);
    _defineProperty(this, "iconmargin", null);
  }
}
//# sourceMappingURL=dialog.props.js.map
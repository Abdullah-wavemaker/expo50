function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmWizardstepProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "disableprev", false);
    _defineProperty(this, "disablenext", false);
    _defineProperty(this, "disabledone", false);
    _defineProperty(this, "showprev", true);
    _defineProperty(this, "shownext", true);
    _defineProperty(this, "showdone", true);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "enableskip", false);
    _defineProperty(this, "iconclass", 'wm-sl-l sl-check');
    _defineProperty(this, "title", 'Step Title');
    _defineProperty(this, "subtitle", 'Sub Title');
    _defineProperty(this, "index", 0);
  }
}
//# sourceMappingURL=wizardstep.props.js.map
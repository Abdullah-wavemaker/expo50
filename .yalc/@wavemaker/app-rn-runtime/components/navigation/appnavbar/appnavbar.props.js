function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmAppNavbarProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "title", '');
    _defineProperty(this, "backbutton", true);
    _defineProperty(this, "backbuttonlabel", '');
    _defineProperty(this, "showDrawerButton", false);
    _defineProperty(this, "leftnavpaneliconclass", 'wm-sl-l sl-hamburger-menu');
    _defineProperty(this, "backbuttoniconclass", 'wi wi-back');
    _defineProperty(this, "imgsrc", null);
    _defineProperty(this, "searchbutton", false);
    _defineProperty(this, "searchbuttoniconclass", 'wm-sl-l sl-search');
    _defineProperty(this, "badgevalue", void 0);
  }
}
//# sourceMappingURL=appnavbar.props.js.map
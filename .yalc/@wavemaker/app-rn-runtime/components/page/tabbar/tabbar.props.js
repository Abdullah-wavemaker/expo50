function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseNavProps } from '../../navigation/basenav/basenav.props';
export default class WmTabbarProps extends BaseNavProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "morebuttoniconclass", 'wi wi-more-horiz');
    _defineProperty(this, "morebuttonlabel", 'more');
    _defineProperty(this, "itemchildren", 'children');
    _defineProperty(this, "isActive", item => false);
    _defineProperty(this, "dataset", [{
      'label': 'Home',
      'icon': 'wm-sl-r sl-home'
    }, {
      'label': 'Analytics',
      'icon': 'wm-sl-r sl-graph-ascend'
    }, {
      'label': 'Alerts',
      'icon': 'wm-sl-r sl-alarm-bell'
    }, {
      'label': 'Settings',
      'icon': 'wm-sl-r sl-settings'
    }]);
  }
}
//# sourceMappingURL=tabbar.props.js.map
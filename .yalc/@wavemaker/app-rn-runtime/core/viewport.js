function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Dimensions } from "react-native";
import EventNotifier from "./event-notifier";
export const SCREEN_ORIENTATION = {
  LANDSCAPE: 'LANDSCAPE',
  PORTRAIT: 'PORTRAIT'
};
export const EVENTS = {
  ORIENTATION_CHANGE: 'orientationChange',
  SIZE_CHANGE: 'sizeChange'
};
export class ViewPort extends EventNotifier {
  constructor() {
    super();
    _defineProperty(this, "width", void 0);
    _defineProperty(this, "height", void 0);
    _defineProperty(this, "orientation", void 0);
    _defineProperty(this, "isMobileType", true);
    const dim = Dimensions.get('window');
    this.width = dim.width;
    this.height = dim.height;
    this.orientation = this.width > this.height ? SCREEN_ORIENTATION.LANDSCAPE : SCREEN_ORIENTATION.PORTRAIT;
    Dimensions.addEventListener('change', () => {
      const dim = Dimensions.get('window');
      const orientation = dim.width > dim.height ? SCREEN_ORIENTATION.LANDSCAPE : SCREEN_ORIENTATION.PORTRAIT;
      this.notify(EVENTS.SIZE_CHANGE, [{
        width: dim.width,
        height: dim.height
      }, {
        width: this.width,
        height: this.height
      }]);
      this.width = dim.width;
      this.height = dim.height;
      if (this.orientation != orientation) {
        this.notify(EVENTS.ORIENTATION_CHANGE, [orientation, this.orientation]);
        this.orientation = orientation;
      }
    });
  }
}
export default new ViewPort();
//# sourceMappingURL=viewport.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BackHandler } from "react-native";
import injector from "@wavemaker/app-rn-runtime/core/injector";
export class AppDisplayManagerService {
  constructor() {
    _defineProperty(this, "displayOptions", {});
    _defineProperty(this, "handleBackButtonPress", () => {
      if (this.displayOptions.content) {
        this.destroy();
        return true;
      }
      return false;
    });
  }
  clearBackButtonPress() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
  }
  setBackButtonPress() {
    this.clearBackButtonPress();
    if (this.displayOptions.content) {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
    }
  }
  show(options) {
    this.displayOptions = options;
    this.refresh();
    this.setBackButtonPress();
    return this.destroy;
  }
  displayContent(content) {
    this.displayOptions.content = content;
  }
  refresh() {
    injector.get('AppConfig').refresh();
  }
  destroy() {
    this.clearBackButtonPress();
    this.displayOptions.onDestroy && this.displayOptions.onDestroy();
    this.displayOptions = {};
    this.refresh();
  }
}
const appDisplayManagerService = new AppDisplayManagerService();
export default appDisplayManagerService;
//# sourceMappingURL=app-display-manager.service.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BackHandler } from "react-native";
import injector from '@wavemaker/app-rn-runtime/core/injector';
class AppModalService {
  constructor() {
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "modalsOpened", []);
    _defineProperty(this, "appConfig", void 0);
    _defineProperty(this, "animatedRefs", []);
    _defineProperty(this, "handleBackButtonPress", () => {
      if (this.modalsOpened.length) {
        this.hideModal();
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
    if (this.modalsOpened.length > 0) {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
    }
  }
  getAppConfig() {
    if (!this.appConfig) {
      this.appConfig = injector.get('APP_CONFIG');
    }
    return this.appConfig;
  }
  showLastModal() {
    this.modalOptions = this.modalsOpened.length ? this.modalsOpened[this.modalsOpened.length - 1] : {};
    this.refresh();
    // widgets in dialog are not accessible. Hence adding setTimeout
    setTimeout(() => {
      this.modalOptions.onOpen && this.modalOptions.onOpen();
    }, 500);
    this.setBackButtonPress();
  }
  refresh() {
    this.getAppConfig().refresh();
  }
  showModal(options) {
    const i = this.modalsOpened.findIndex(o => o === options);
    if (i < 0) {
      options.elevationIndex = parseInt(this.getAppConfig().app.toastsOpened + this.modalsOpened.length + 1);
      this.modalsOpened.push(options);
      this.showLastModal();
    }
  }
  hideModal(options) {
    const i = options ? this.modalsOpened.findIndex(o => o === options) : this.modalsOpened.length - 1;
    if (i >= 0) {
      Promise.resolve().then(() => this.modalsOpened.length > 1 && this.animatedRefs && this.animatedRefs[i].triggerExit()).then(() => {
        const o = this.modalsOpened[i];
        return o && o.onClose && o.onClose();
      }).then(() => this.modalsOpened.splice(i, 1)).then(() => this.showLastModal());
    }
    this.clearBackButtonPress();
  }
}
const appModalService = new AppModalService();
export default appModalService;
//# sourceMappingURL=app-modal.service.js.map
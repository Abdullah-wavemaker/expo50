function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import injector from '@wavemaker/app-rn-runtime/core/injector';
class AppToastService {
  constructor() {
    _defineProperty(this, "toastsOpened", []);
    _defineProperty(this, "appConfig", void 0);
    _defineProperty(this, "refreshCount", 0);
  }
  getAppConfig() {
    if (!this.appConfig) {
      this.appConfig = injector.get('APP_CONFIG');
    }
    return this.appConfig;
  }
  refresh() {
    this.refreshCount++;
    this.appConfig.refresh();
  }
  showToast(options) {
    const i = this.toastsOpened.findIndex(o => o.name === options.name);
    let timeout;
    this.refreshCount++;
    if (i < 0) {
      options.elevationIndex = this.toastsOpened.length + this.getAppConfig().app.modalsOpened + 1;
      this.toastsOpened.push(options);
      // hide the toast when toaster is clicked
      if (options.hideOnClick) {
        let cb = options.onClick;
        options.onClick = () => {
          cb && cb();
          this.hideToast(options);
          clearTimeout(timeout);
        };
      }
      if (options.duration) {
        timeout = setTimeout(() => {
          this.hideToast(options);
        }, options.duration);
      }
    }
    this.refresh();
  }
  hideToast(options) {
    const i = options ? this.toastsOpened.findIndex(o => o.name === options.name) : this.toastsOpened.length - 1;
    if (i >= 0) {
      const o = this.toastsOpened.splice(i, 1)[0];
      this.refresh();
      (options === null || options === void 0 ? void 0 : options.onClose) && options.onClose();
    }
  }
}
const appToastService = new AppToastService();
export default appToastService;
//# sourceMappingURL=app-toast.service.js.map
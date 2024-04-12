function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseAction } from "./base-action";
const DEFAULT_DURATION = 3000;
export class NotificationAction extends BaseAction {
  constructor(config) {
    super(config);
    _defineProperty(this, "showDialog", void 0);
    this.showDialog = config.showDialog;
  }
  prepareToastOptions() {
    var _options$class, _params$class;
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const params = this.config.paramProvider();
    const o = {};
    o.text = options.message || params.text;
    o.type = ((_options$class = options.class) === null || _options$class === void 0 ? void 0 : _options$class.toLowerCase()) || ((_params$class = params.class) === null || _params$class === void 0 ? void 0 : _params$class.toLowerCase());
    o.onClose = () => {
      this.config.onClose && this.config.onClose(this);
    }, o.onClick = () => {
      this.config.onOk && this.config.onOk(this);
    }, o.content = this.config.partialContent;
    o.hideOnClick = options.hideOnClick || true;
    const toasterPosition = options.position || params.toasterPosition || 'bottom right';
    const placement = toasterPosition.split(' ')[0];
    switch (placement) {
      case 'top':
        o.styles = {
          top: 0
        };
        break;
      case 'bottom':
        o.styles = {
          bottom: 0
        };
        break;
      case 'center':
        o.styles = {
          top: '50%'
        };
        break;
    }
    if (this.config.partialContent) {
      if (!o.styles) {
        o.styles = {};
      }
    }
    if (!params.duration) {
      params.duration = params.duration !== 0 && o.type === 'success' ? DEFAULT_DURATION : 0;
    }
    o.duration = parseInt(options.duration || params.duration);
    o.name = this.name;
    return o;
  }
  getMessage() {
    return this.config.paramProvider().text;
  }
  invoke(options, success, error) {
    super.invoke(options, success, error);
    if (this.config.operation === 'toast') {
      const toasterService = this.config.toasterService();
      return toasterService.showToast(this.prepareToastOptions(options));
    } else {
      return this.showDialog && this.showDialog({
        ...this.params,
        onOk: this.config.onOk,
        onCancel: this.config.onCancel,
        onClose: this.config.onClose
      });
    }
  }
}
//# sourceMappingURL=notification-action.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseAction } from "./base-action";
export class TimerAction extends BaseAction {
  constructor(config) {
    super(config);
    _defineProperty(this, "repeating", void 0);
    _defineProperty(this, "_isFired", false);
    _defineProperty(this, "_schedulerID", -1);
    _defineProperty(this, "delay", void 0);
    this.repeating = config.repeating;
    this.delay = config.delay || 500;
  }
  invoke(options, success, error) {
    super.invoke(options, success, error);
    return this.fire(this.params, success, error);
  }
  cancel() {
    if (this._schedulerID > -1) {
      if (this.repeating) {
        clearInterval(this._schedulerID);
      } else {
        clearTimeout(this._schedulerID);
      }
      this._schedulerID = -1;
    }
  }
  destroy() {
    this.cancel();
  }
  pause() {
    this.cancel();
  }
  trigger(options, success, error) {
    if (this._schedulerID > -1) {
      return;
    }
    const repeatTimer = this.repeating,
      delay = this.delay,
      exec = () => {
        this.config.onSuccess && this.config.onSuccess();
      };
    this._schedulerID = repeatTimer ? setInterval(exec, delay) : setTimeout(() => {
      exec();
      this._schedulerID = -1;
    }, delay);
    return this._schedulerID;
  }
  fire(options, success, error) {
    if (this.repeating) {
      this._isFired = true;
    }
    return this.trigger(options, success, error);
  }
}
//# sourceMappingURL=timer-action.js.map
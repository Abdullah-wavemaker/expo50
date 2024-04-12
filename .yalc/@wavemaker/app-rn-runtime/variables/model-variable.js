function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { clone, isEqual } from 'lodash-es';
import { VariableEvents } from './base-variable';
import { ModelVariable as _ModelVariable } from '@wavemaker/variables/src/model/variable/model-variable';
export class ModelVariable extends _ModelVariable {
  constructor(config) {
    const variable = {
      name: config.name,
      dataSet: config.paramProvider(),
      isList: config.isList,
      twoWayBinding: config.twoWayBinding
    };
    super(variable);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "lastParams", void 0);
    this.config = config;
    this.invoke();
  }
  invoke(params, onSuccess, onError) {
    let result;
    this.dataSet = this.config.paramProvider();
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);
    try {
      result = super.execute(params, () => {});
      this.config.onSuccess && this.config.onSuccess(this, this.dataSet);
      onSuccess && onSuccess(this, this.dataSet);
      this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
    } catch (error) {
      this.config.onError && this.config.onError(this, this.dataSet);
      onError && onError(this, this.dataSet);
      this.notify(VariableEvents.ERROR, [this, this.dataSet]);
    }
    this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
    return result;
  }
  invokeOnParamChange() {
    const latest = this.config.paramProvider();
    if (!isEqual(this.lastParams, latest)) {
      this.invoke();
      this.lastParams = clone(latest);
    }
    return Promise.resolve(this);
  }
}
//# sourceMappingURL=model-variable.js.map
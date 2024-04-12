function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import DatasetUtil from './utils/dataset-util';
import EventNotifier from '@wavemaker/app-rn-runtime/core/event-notifier';
import { ROOT_LOGGER } from '@wavemaker/app-rn-runtime/core/logger';
import { isNumber, isObject, isBoolean, get, isEqual } from 'lodash';
export let VariableEvents = /*#__PURE__*/function (VariableEvents) {
  VariableEvents["BEFORE_INVOKE"] = "beforeInvoke";
  VariableEvents["SUCCESS"] = "success";
  VariableEvents["ERROR"] = "error";
  VariableEvents["AFTER_INVOKE"] = "afterInvoke";
  return VariableEvents;
}({});
;
export const VARIABLE_LOGGER = ROOT_LOGGER.extend('variable');
export class BaseVariable extends EventNotifier {
  constructor(config) {
    super();
    this.config = config;
    _defineProperty(this, "name", '');
    _defineProperty(this, "params", {});
    _defineProperty(this, "dataSet", {});
    _defineProperty(this, "isList", void 0);
    _defineProperty(this, "twoWayBinding", void 0);
    _defineProperty(this, "isExecuting", false);
    this.name = config.name;
    this.isList = config.isList;
    this.twoWayBinding = config.twoWayBinding;
    this.dataSet = this.isList ? [] : this.dataSet;
    this.subscribe(VariableEvents.BEFORE_INVOKE, () => {
      this.isExecuting = true;
      VARIABLE_LOGGER.info(`Before Invoking variable ${this.name}`);
    });
    this.subscribe(VariableEvents.AFTER_INVOKE, () => {
      this.isExecuting = false;
      VARIABLE_LOGGER.info(`After Invoking variable ${this.name}`);
    });
  }
  invoke(params, onSuccess, onError) {
    if (!params) {
      this.params = this.config.paramProvider();
    } else {
      this.params = params;
    }
    return Promise.resolve(this);
  }
  doNext() {
    return Promise.reject(this);
  }
  invokeOnParamChange() {
    const last = this.params;
    const latest = this.config.paramProvider();
    if (!isEqual(last, latest)) {
      return this.invoke(latest);
    }
    return Promise.resolve(this);
  }
  getData() {
    return this.dataSet;
  }
  setData(dataSet) {
    if (DatasetUtil.isValidDataset(dataSet, this.isList)) {
      this.dataSet = dataSet;
    }
    return this.dataSet;
  }
  getValue(key, index) {
    return DatasetUtil.getValue(this.dataSet, key, index, this.isList);
  }
  setValue(key, value) {
    return DatasetUtil.setValue(this.dataSet, key, value, this.isList);
  }
  getItem(index) {
    return DatasetUtil.getItem(this.dataSet, index, this.isList);
  }
  setItem(index, value, options) {
    options = DatasetUtil.getChildDetails(this.dataSet, options, this.isList);
    return DatasetUtil.setItem(this.dataSet, index, value, options);
  }
  addItem(value, options) {
    let index;
    if (isNumber(options)) {
      index = options;
    }
    if (isObject(options)) {
      // @ts-ignore
      index = options.index;
    }
    options = DatasetUtil.getChildDetails(this.dataSet, options, this.isList);
    return DatasetUtil.addItem(this.dataSet, value, index, options);
  }
  removeItem(index, options) {
    let exactMatch, parentIndex;
    if (options) {
      if (isBoolean(options)) {
        exactMatch = options;
      }
      if (isObject(options)) {
        // @ts-ignore
        exactMatch = options.exactMatch;
        if (this.isList) {
          // @ts-ignore
          parentIndex = options.parentIndex || 0;
        }
      }
    }
    return DatasetUtil.removeItem(this.dataSet, index, {
      exactMatch,
      path: get(options, 'path'),
      parentIndex
    });
  }
  clearData() {
    this.dataSet = DatasetUtil.getValidDataset(this.isList);
    return this.dataSet;
  }
  getCount() {
    return DatasetUtil.getCount(this.dataSet, this.isList);
  }
  pause() {}
  resume() {}
  destroy() {}
}
//# sourceMappingURL=base-variable.js.map
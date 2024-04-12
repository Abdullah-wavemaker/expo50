function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { VariableEvents } from './base-variable';
import { isEqual, isString } from 'lodash';
import { deepCopy } from '@wavemaker/app-rn-runtime/core/utils';
import { ServiceVariable as _ServiceVariable } from '@wavemaker/variables/src/model/variable/service-variable';
import httpService from '@wavemaker/app-rn-runtime/variables/http.service';
import injector from '@wavemaker/app-rn-runtime/core/injector';
var _ServiceVariableEvents = /*#__PURE__*/function (_ServiceVariableEvents) {
  _ServiceVariableEvents["BEFORE_INVOKE"] = "beforeInvoke";
  return _ServiceVariableEvents;
}(_ServiceVariableEvents || {});
export class ServiceVariable extends _ServiceVariable {
  constructor(config) {
    let variableConfig = {
      name: config.name,
      dataSet: config.paramProvider(),
      dataBinding: {},
      isList: config.isList,
      service: config.service,
      serviceType: config.serviceType,
      maxResults: config.maxResults,
      _context: config._context,
      operation: config.operation,
      operationId: config.operationId,
      serviceInfo: config.getServiceInfo(),
      httpClientService: httpService,
      inFlightBehavior: config.inFlightBehavior,
      onSuccess: (context, args) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.SUCCESS, [args.variable, args.data, args.options]);
        return config.onSuccess && config.onSuccess(args.variable, args.data, args.options);
      },
      onError: (context, args) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.ERROR, [args.variable, args.data, args.options]);
        return config.onError && config.onError(args.variable, args.data, args.options);
      },
      onCanUpdate: (context, args) => {
        return config.onCanUpdate && config.onCanUpdate(args.variable, args.data, args.options);
      },
      onBeforeUpdate: (context, args) => {
        this.notify(VariableEvents.BEFORE_INVOKE, [args.variable, args.inputData, args.options]);
        return config.onBeforeUpdate && config.onBeforeUpdate(args.variable, args.inputData, args.options);
      },
      onResult: (context, args) => {
        return config.onResult && config.onResult(args.variable, args.data, args.options);
      },
      onBeforeDatasetReady: (context, args) => {
        return config.onBeforeDatasetReady && config.onBeforeDatasetReady(args.variable, args.data, args.options);
      }
    };
    if (config.onError) {
      variableConfig.onError = (context, args) => {
        return config.onError && config.onError(args.variable, args.data, args.options);
      };
    }
    super(variableConfig);
    this.config = config;
    _defineProperty(this, "cancelTokenSource", void 0);
    _defineProperty(this, "params", {});
    _defineProperty(this, "appConfig", injector.get('APP_CONFIG'));
    this.subscribe(VariableEvents.AFTER_INVOKE, () => {
      this.dataBinding = {};
    });
    this.init();
  }
  invokeOnParamChange() {
    const last = this.params;
    const latest = this.config.paramProvider();
    if (!isEqual(last, latest)) {
      this.invoke(latest);
    }
    return Promise.resolve(this);
  }
  async doNext() {
    let page = 0;
    if (isString(this.pagination.page)) {
      page = parseInt(this.pagination.page) + 1 + '';
    } else {
      page = this.pagination.page + 1;
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        page: page
      }, dataset => resolve(dataset), reject);
    });
  }
  onDataUpdated() {
    this.appConfig.refresh(false);
  }
  invoke(options, onSuccess, onError) {
    this.params = this.config.paramProvider();
    this.params = deepCopy({}, this.params, this.dataBinding);
    if (options) {
      this.params = deepCopy({}, this.params, options.inputFields ? options.inputFields : options);
    }
    options = options || {};
    options.inputFields = this.params;
    // service definitions data depends on whether user logged in or not
    // Try to get the latest definition
    this.serviceInfo = this.config.getServiceInfo();
    if (!this.serviceInfo) {
      console.error(`Service Info is missing for (${this.name}) variable.`);
    }
    return super.invoke(options, onSuccess, onError);
  }

  // cancel($file?: any) {
  //   // CHecks if there is any pending requests in the queue
  //   if ($queue.requestsQueue.has(this)) {
  //     // If the request is a File upload request then modify the elements associated with file upload
  //     // else unsubscribe from the observable on the variable.
  //     if (false) {
  //       // $file._uploadProgress.unsubscribe();
  //       // $file.status = 'abort';
  //       // this.totalFilesCount--;
  //       // initiateCallback(VARIABLE_CONSTANTS.EVENT.ABORT, variable, $file);
  //       // if (!this.isFileUploadInProgress(variable.dataBinding) && this.totalFilesCount === 0) {
  //       //   $queue.process(variable);
  //       //   // notify inflight variable
  //       //   this.notifyInflight(variable, false);
  //       // }
  //     } else {
  //       if (true) {
  //         this.cancelTokenSource.cancel();
  //         $queue.process(this);
  //         // notify inflight variable
  //         //this.notifyInflight(variable, false);
  //       }
  //     }
  //   }
  // }

  // setInput(key: any, val?: any, options?: any) {
  //   this.params = merge({}, this.config.paramProvider(), _setInput(this.params, key, val, options));
  //    return this.params;
  // }
}
//# sourceMappingURL=service-variable.js.map
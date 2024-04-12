function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isEqual, isUndefined, isFunction, forEach, isEmpty } from 'lodash';
import { LiveVariable as _LiveVariable } from '@wavemaker/variables/src/model/variable/live-variable';
import httpService from '@wavemaker/app-rn-runtime/variables/http.service';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import { deepCopy } from '@wavemaker/app-rn-runtime/core/utils';
import Formatters from '@wavemaker/app-rn-runtime/core/formatters';
var _LiveVariableEvents = /*#__PURE__*/function (_LiveVariableEvents) {
  _LiveVariableEvents["BEFORE_INVOKE"] = "beforeInvoke";
  return _LiveVariableEvents;
}(_LiveVariableEvents || {});
export class LiveVariable extends _LiveVariable {
  constructor(config) {
    const variableConfig = {
      name: config.name,
      dataSet: config.paramProvider(),
      inputFields: config.paramProvider(),
      filterExpressions: config.filterExpressions,
      filterFields: config.paramProvider(),
      isList: config.isList,
      maxResults: config.maxResults,
      _context: config._context,
      operation: config.operation,
      type: config.type,
      autoUpdate: config.autoUpdate,
      liveSource: config.liveSource,
      orderBy: config.orderBy,
      category: config.category,
      properties: config.properties,
      propertiesMap: config.propertiesMap,
      tableName: config.tableName,
      tableType: config.tableType,
      relatedTables: config.relatedTables,
      httpClientService: httpService,
      inFlightBehavior: config.inFlightBehavior,
      onSuccess: (context, args) => {
        return config.onSuccess && config.onSuccess(args.variable, args.data, args.options);
      },
      onCanUpdate: (context, args) => {
        return config.onCanUpdate && config.onCanUpdate(args.variable, args.data, args.options);
      },
      onBeforeUpdate: (context, args) => {
        return config.onBeforeUpdate && config.onBeforeUpdate(args.variable, args.dataFilter || args.inputData, args.options);
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
    _defineProperty(this, "params", {});
    _defineProperty(this, "filters", {});
    _defineProperty(this, "appConfig", injector.get('APP_CONFIG'));
    this.dateFormatter = Formatters.get('toDate');
    this.init();
  }
  setFilterExpValue(filter) {
    var _this$filterExpressio;
    (_this$filterExpressio = this.filterExpressions) === null || _this$filterExpressio === void 0 ? void 0 : _this$filterExpressio.rules.forEach(r => {
      r.value = filter[r.target];
    });
  }
  invokeOnParamChange() {
    const last = this.params;
    const latest = this.config.paramProvider();
    if (this.config.operation === 'read') {
      const lastFilter = this.filters;
      const latestFilter = this.config.filterProvider && this.config.filterProvider();
      if (!isEqual(lastFilter, latestFilter)) {
        this.setFilterExpValue(latestFilter);
        if (this.autoUpdate && !isEmpty(latestFilter) && isFunction(this.update)) {
          this.filters = latestFilter;
          this.invoke();
        }
      }
    }
    if (!isEqual(last, latest)) {
      if (this.config.operation === 'read') {
        forEach(latest, (val, key) => {
          this.filterFields[key] = {
            'value': val
          };
        });
      } else {
        this.inputFields = latest;
      }
      /* if auto-update set for the variable with read operation only, get its data */
      // @ts-ignore
      if (this.autoUpdate && !isUndefined(latest) && isFunction(this[this.config.operation + 'Record'])) {
        this.invoke();
      }
    }
    return Promise.resolve(this);
  }
  listRecords(options, onSuccess, onError) {
    this.filters = this.config.filterProvider && this.config.filterProvider();
    if (options) {
      this.filters = deepCopy({}, this.filters, options.filterFields ? options.filterFields : options);
    }
    options = options || {};
    options.filterFields = this.filters;
    this.setFilterExpValue(this.filters);
    return super.listRecords(options, onSuccess, onError);
  }
}
//# sourceMappingURL=live-variable.js.map
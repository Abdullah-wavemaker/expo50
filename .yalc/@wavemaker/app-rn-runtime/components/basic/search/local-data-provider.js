function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { filter, includes, values, isNumber, split, toLower, get, toString, isArray, isObject, isString } from 'lodash';
export class DataProvider {
  constructor() {
    _defineProperty(this, "localDataProvider", new LocalDataProvider());
  }
  // check if the variable is of type service variable and whether update is required.
  init(self) {
    let response = self.invokeEventCallback('isUpdateRequired', []);
    return response;
  }

  // setting the inputFields and invoking the variable
  invokeVariable(self, query) {
    var _self$props;
    let paramsObj = null;
    ((_self$props = self.props) === null || _self$props === void 0 ? void 0 : _self$props.searchkey) && self.props.searchkey.split(',').forEach(k => {
      if (!paramsObj) {
        paramsObj = {};
      }
      paramsObj[k] = query;
    });
    let invokeEvent = get(self.props, 'formfield') ? self.props.invokeEvent : self.invokeEventCallback;
    if (invokeEvent) {
      return invokeEvent.call(self, 'onQuerySearch', [paramsObj]);
    }
    return Promise.resolve();
  }
  filter(config, cb) {
    const props = config.props;
    if (props.searchkey) {
      const keys = split(props.searchkey, ',');
      if (keys.length && cb) {
        cb();
        return;
      }
    }
    return this.localDataProvider.filter(config);
  }
}
export class LocalDataProvider {
  applyFilter(entry, queryText) {
    entry = isNumber(entry) ? entry.toString() : entry;
    return includes(entry, queryText);
  }
  filter(config) {
    const entries = config.entries;
    let queryText = config.query;
    const props = config.props;
    let filteredData;
    const casesensitive = false;

    /**
     * If searchkey is defined, then check for match string against each item in the dataset with item's field name as the searchkey
     * return the filtered data containing the matching string.
     */
    if (props.searchkey) {
      const keys = split(props.searchkey, ',');
      if (!entries.length) {
        return [];
      }
      let entryObj = entries[0];
      entryObj = entryObj.hasOwnProperty('dataObject') ? entryObj['dataObject'] : entryObj;
      const entryKeys = Object.keys(entryObj);
      const hasEntry = keys.find(k => {
        if (k.includes('.')) {
          k = split(k, '.')[0];
        }
        return entryKeys.includes(k);
      });
      if (!hasEntry) {
        // widget bound to query variable, searchkey is query or path params and not the key from the entry obj
        return entries;
      }
      filteredData = filter(entries, item => {
        return keys.some(key => {
          let a = get(item.dataObject, key),
            b = queryText;
          if (!casesensitive) {
            a = toLower(toString(a));
            b = toLower(toString(b));
          }
          return this.applyFilter(a, b);
        });
      });
    } else {
      // local search on data with array of objects.
      // Iterate over each item and return the filtered data containing the matching string.
      if (isArray(entries) && isObject(entries[0])) {
        filteredData = filter(entries, entry => {
          let a = isString(entry.dataObject) ? entry.dataObject : values(entry.dataObject).join(' ');
          if (!casesensitive) {
            a = toLower(a);
            queryText = toLower(queryText);
          }
          return this.applyFilter(a, queryText);
        });
      } else {
        filteredData = filter(entries, entry => {
          if (!casesensitive) {
            entry = toLower(entry);
            queryText = toLower(queryText);
          }
          return this.applyFilter(entry, queryText);
        });
      }
    }
    return filteredData;
  }
}
//# sourceMappingURL=local-data-provider.js.map
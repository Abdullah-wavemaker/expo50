import { Platform } from 'react-native';
import moment from "moment";
import * as FileSystem from "expo-file-system";
import { isFunction, includes, isUndefined, isNull, orderBy, groupBy, toLower, get, forEach, sortBy, cloneDeep, keys, values, isArray, isString, isNumber } from 'lodash';
const GROUP_BY_OPTIONS = {
  ALPHABET: 'alphabet',
  WORD: 'word',
  OTHERS: 'Others'
};
const TIME_ROLLUP_OPTIONS = {
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};
const _deepCopy = function (o1) {
  for (var _len = arguments.length, o2 = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    o2[_key - 1] = arguments[_key];
  }
  o2.forEach(o => {
    if (o) {
      Object.keys(o).forEach(k => {
        const v = o[k];
        if (v && !isString(v) && !isArray(v) && typeof v === 'object') {
          o1[k] = _deepCopy(o1[k] || {}, o[k]);
        } else {
          o1[k] = _deepCopy(v);
        }
      });
    }
  });
  return o1;
};
export const deepCopy = function () {
  for (var _len2 = arguments.length, objects = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objects[_key2] = arguments[_key2];
  }
  return _deepCopy({}, ...objects);
};
export const toBoolean = val => {
  return val === true || val === 'true' || !(val === false || val === null || val === undefined || val === '');
};
export const toNumber = val => {
  try {
    return parseFloat(val) || 0;
  } catch (e) {
    return 0;
  }
};

/**
 * this method encodes the url and returns the encoded string
 */
export const encodeUrl = url => {
  let splits = url.split('#');
  const hash = splits[1];
  splits = splits[0].split('?');
  let params = '';
  if (splits.length > 1) {
    params = splits[1].split('&').map(p => p.split('=')).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
  }
  return encodeURI(splits[0]) + (params ? '?' + params : '') + (hash ? '#' + hash : '');
};
export const isWebPreviewMode = () => Platform.OS === 'web';
export const isDevMode = () => isWebPreviewMode() || __DEV__;
export const widgetsWithUndefinedValue = ['checkbox', 'toggle'];
export const isAndroid = () => Platform.OS === 'android' || Platform.OS === 'web' && /android/i.test(window.navigator.userAgent);
export const isIos = () => Platform.OS === 'ios' || Platform.OS === 'web' && /iPhone|iPad/i.test(window.navigator.userAgent);
const getGroupKey = (fieldDef, groupby, widgetScope, innerItem) => isFunction(groupby) ? groupby.apply(widgetScope.proxy, [innerItem ? fieldDef[innerItem] : fieldDef]) : get(innerItem ? fieldDef[innerItem] : fieldDef, groupby);

/**
 * This method prepares the grouped data.
 *
 * @param fieldDefs array of objects i.e. dataset
 * @param groupby string groupby
 * @param match string match
 * @param orderby string orderby
 * @param dateFormat string date format
 */
export const getGroupedData = (fieldDefs, groupby, match, orderby, dateFormat, widgetScope, innerItem) => {
  // handling case-in-sensitive scenario
  // ordering the data based on groupby field. If there is innerItem then apply orderby using the innerItem's containing the groupby field.
  fieldDefs = orderBy(fieldDefs, fieldDef => {
    const groupKey = getGroupKey(fieldDef, groupby, widgetScope, innerItem);
    if (groupKey) {
      return toLower(groupKey);
    }
    return '';
  });

  // extract the grouped data based on the field obtained from 'groupDataByField'.
  const groupedLiData = groupBy(fieldDefs, function (fieldDef) {
    let concatStr = getGroupKey(fieldDef, groupby, widgetScope, innerItem);
    // by default set the undefined groupKey as 'others'
    if (isUndefined(concatStr) || isNull(concatStr) || concatStr.toString().trim() === '') {
      return GROUP_BY_OPTIONS.OTHERS;
    }
    // if match prop is alphabetic ,get the starting alphabet of the word as key.
    if (match === GROUP_BY_OPTIONS.ALPHABET) {
      concatStr = concatStr.substr(0, 1);
    }

    // if match contains the time options then get the concatStr using 'getTimeRolledUpString'
    if (includes(values(TIME_ROLLUP_OPTIONS), match)) {
      dateFormat = dateFormat && dateFormat.replace(/d/g, 'D');
      dateFormat = dateFormat && dateFormat.replace(/y/g, 'Y');
      concatStr = moment(concatStr).format(dateFormat);
    }
    return concatStr;
  });
  return getSortedGroupedData(groupedLiData, groupby, orderby, innerItem);
};

/**
 * function to get the ordered dataset based on the given orderby
 */
export const getOrderedDataset = (dataSet, orderby, innerItem) => {
  if (!orderBy) {
    return cloneDeep(dataSet);
  }

  // The order by only works when the dataset contains list of objects.
  const items = orderby && orderby.split(','),
    fields = [],
    directions = [];
  items && items.forEach(obj => {
    const item = obj.split(':');
    fields.push(innerItem ? innerItem + '.' + item[0] : item[0]);
    directions.push(item[1]);
  });
  return orderBy(dataSet, fields, directions);
};

/**
 * This method returns sorted data based to groupkey.
 * Returns a array of objects, each object containing key which is groupKey and data is the sorted data which is sorted by groupby field in the data.
 *
 * @param groupedLiData, grouped data object with key as the groupKey and its value as the array of objects grouped under the groupKey.
 * @param groupBy, string groupby property
 * @returns {any[]}
 */
export const getSortedGroupedData = (groupedLiData, groupBy, orderby, innerItem) => {
  const _groupedData = [];
  forEach(keys(groupedLiData), (groupkey, index) => {
    const liData = getOrderedDataset(groupedLiData[groupkey], orderby, innerItem);
    _groupedData.push({
      key: groupkey,
      data: sortBy(liData, data => {
        data._groupIndex = index;
        return get(data, groupBy) || get(data[innerItem], groupBy);
      })
    });
  });
  return _groupedData;
};
export const isDefined = v => typeof v !== 'undefined';

// try to convert the chekedvalue and unchecked values to boolean/number
export const unStringify = (val, defaultVal) => {
  if (val === null) {
    return defaultVal;
  }
  if (val === true || val === 'true') {
    return true;
  }
  if (val === false || val === 'false') {
    return false;
  }
  const number = parseInt(val, 10);
  if (!isNaN(number)) {
    return number;
  }
  return val;
};

/**
 * This function invokes the given the function (fn) until the function successfully executes or the maximum number
 * of retries is reached or onBeforeRetry returns false.
 *
 * @param fn - a function that is needs to be invoked. The function can also return a promise as well.
 * @param interval - minimum time gap between successive retries. This argument should be greater or equal to 0.
 * @param maxRetries - maximum number of retries. This argument should be greater than 0. For all other values,
 * maxRetries is infinity.
 * @param onBeforeRetry - a callback function that will be invoked before re-invoking again. This function can
 * return false or a promise that is resolved to false to stop further retry attempts.
 * @returns {*} a promise that is resolved when fn is success (or) maximum retry attempts reached
 * (or) onBeforeRetry returned false.
 */
export const retryIfFails = function (fn, interval, maxRetries) {
  let onBeforeRetry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => Promise.resolve(false);
  let retryCount = 0;
  const tryFn = () => {
    retryCount++;
    if (isFunction(fn)) {
      return fn();
    }
  };
  maxRetries = isNumber(maxRetries) && maxRetries > 0 ? maxRetries : 0;
  interval = isNumber(interval) && interval > 0 ? interval : 0;
  return new Promise((resolve, reject) => {
    const errorFn = function () {
      const errArgs = arguments;
      setTimeout(() => {
        Promise.resolve().then(() => onBeforeRetry()).then(function (retry) {
          if (retry !== false && (!maxRetries || retryCount <= maxRetries)) {
            Promise.resolve().then(() => tryFn()).then(resolve, errorFn);
          } else {
            reject(errArgs);
          }
        }, () => reject(errArgs));
      }, interval);
    };
    Promise.resolve().then(() => tryFn()).then(resolve, errorFn);
  });
};

/**
 * Promise of a defer created using this function, has abort function that will reject the defer when called.
 * @returns {*} angular defer object
 */
export const getAbortableDefer = () => {
  const _defer = {
    promise: null,
    reject: null,
    resolve: null,
    onAbort: () => {},
    isAborted: false
  };
  _defer.promise = new Promise((resolve, reject) => {
    _defer.resolve = resolve;
    _defer.reject = reject;
  });
  _defer.promise.abort = () => {
    _defer.onAbort && _defer.onAbort();
    _defer.reject('aborted');
    _defer.isAborted = true;
  };
  return _defer;
};
export const validateField = (props, value) => {
  let requiredCheck = true,
    regexCheck = true;
  if (props.required) {
    if (isArray(value)) {
      requiredCheck = value.length === 0 ? false : true;
    } else {
      requiredCheck = !value ? false : true;
    }
    if (!requiredCheck) {
      return {
        errorType: 'required',
        isValid: false
      };
    }
  }
  if (value && props.regexp) {
    const condition = new RegExp("^" + props.regexp + "$", 'g');
    regexCheck = condition.test(value);
    if (!regexCheck) {
      return {
        errorType: 'regexp',
        isValid: false
      };
    }
  }
  if (value && props.maxchars && value.length > props.maxchars) {
    return {
      errorType: 'maxchars',
      isValid: false
    };
  }
  if (value && props.mindate && new Date(props.datavalue) < moment(props.mindate).startOf('day').toDate()) {
    return {
      errorType: 'mindate',
      isValid: false
    };
  }
  if (value && props.maxdate && new Date(props.datavalue) > moment(props.maxdate).endOf('day').toDate()) {
    return {
      errorType: 'maxdate',
      isValid: false
    };
  }
  return {
    isValid: true
  };
};
export const countDecimalDigits = number => {
  if (!number) return 0;

  // * convert the number to a string
  const numberString = number.toString();

  // * regular expression to match and count the decimal digits
  const decimalMatch = numberString.match(/\.(\d+)/);
  if (decimalMatch) {
    const decimalDigits = decimalMatch[1];
    return decimalDigits.length;
  } else {
    return 0; // * no decimal digits found
  }
};

export const formatCompactNumber = number => {
  const isNegative = number < 0;
  number = isNegative ? number * -1 : number;
  let formattedNumber = number + '';
  if (number >= 1000 && number < 1_000_000) {
    formattedNumber = (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    formattedNumber = (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    formattedNumber = (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    formattedNumber = (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "T";
  }
  return (isNegative ? '-' : '') + formattedNumber;
};
export const toBase64 = function (path) {
  return FileSystem.readAsStringAsync(path, {
    encoding: 'base64'
  });
};
const DATASET_WIDGETS = new Set(['select', 'checkboxset', 'radioset', 'switch', 'autocomplete', 'chips', 'typeahead', 'rating']);
export const isDataSetWidget = widget => {
  return DATASET_WIDGETS.has(widget);
};
export const isFullPathUrl = url => {
  return isString(url) && (url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:') || url.startsWith('file:'));
};
export function removeUndefinedKeys(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      // * if the value is an object, recursively call the function
      removeUndefinedKeys(obj[key]);
    }
  }
  return obj;
}
//# sourceMappingURL=utils.js.map
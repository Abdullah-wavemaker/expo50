import { parseInt } from 'lodash';
import moment from 'moment';
import { CURRENCY_INFO } from './constants/currency-constants';
import injector from '@wavemaker/app-rn-runtime/core/injector';
export class DateToStringFormatter {
  format(input, format) {
    if (!input) {
      return '';
    }
    if (format === 'timestamp') {
      return input.getTime() + '';
    }
    format = format.replace(/d/g, 'D');
    const _moment = moment(input, ["M/D/YYYY", "M-D-YYYY", "M.D.YYYY", "M/DD/YYYY", "M-DD-YYYY", "M.DD.YYYY", "YYYY/M/D", "YYYY-M-D", "YYYY.M.D", "MM/D/YYYY", "MM-D-YYYY", "MM.D.YYYY", "M/D/YY", "M-D-YY", "M.D.YY", "D MMM YYYY", "MM/DD/YYYY", "MM-DD-YYYY", "MM.DD.YYYY", "YYYY/MM/DD", "YYYY-MM-DD", "YYYY.MM.DD", "MM/DD/YY", "MM-DD-YY", "MM.DD.YY", "DD MMM YYYY"], true);
    return _moment.isValid() ? _moment.format(format) : input.toString();
  }
}
export class PrependFormatter {
  format(input, prefix) {
    return (prefix || '') + (input !== null || input != undefined ? input : '');
  }
}
export class AppendFormatter {
  format(input, suffix) {
    return (input !== null || input != undefined ? input : '') + (suffix || '');
  }
}
export class NumberToStringFormatter {
  format(input, fractionSize) {
    const i18nService = injector.I18nService.get();
    const selectedLocale = i18nService.getSelectedLocale();
    let formatCurrency = new Intl.NumberFormat(selectedLocale, {
      minimumFractionDigits: fractionSize,
      maximumFractionDigits: fractionSize
    });
    return isNaN(input) ? '' : formatCurrency.format(input);
  }
}
export class CurrencyFormatter {
  format(data, currencySymbol, fracSize) {
    const _currencySymbol = (CURRENCY_INFO[currencySymbol] || {}).symbol || currencySymbol || '';
    let _val = new NumberToStringFormatter().format(data, fracSize);
    const isNegativeNumber = _val.startsWith('-');
    if (isNegativeNumber) {
      _val = _val.replace('-', '');
    }
    return _val ? isNegativeNumber ? '-' + _currencySymbol + _val : _currencySymbol + _val : '';
  }
}
export class TimeFromNowFormatter {
  format(timestamp) {
    return timestamp ? moment(timestamp).fromNow() : undefined;
  }
}
export class StringToNumberFormatter {
  format(input) {
    return parseInt(input);
  }
}
const createFormatter = (key, defaultFormatter) => {
  return {
    format: function (input) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      const output = defaultFormatter.format(input, ...params);
      const customFormatter = formatters.get(`custom.${key}`);
      return customFormatter ? customFormatter.format(output, ...params) : output;
    }
  };
};
const formatters = new Map([['numberToString', createFormatter('numberToString', new NumberToStringFormatter())], ['prefix', createFormatter('prefix', new PrependFormatter())], ['suffix', createFormatter('suffix', new AppendFormatter())], ['stringToNumber', createFormatter('stringToNumber', new StringToNumberFormatter())], ['timeFromNow', createFormatter('timeFromNow', new TimeFromNowFormatter())], ['toDate', createFormatter('toDate', new DateToStringFormatter())], ['toCurrency', createFormatter('toCurrency', new CurrencyFormatter())]]);
export default formatters;
//# sourceMappingURL=formatters.js.map
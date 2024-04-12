function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import axios from 'axios';
import StorageService from '@wavemaker/app-rn-runtime/core/storage.service';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import { I18nManager } from 'react-native';
const APP_LOCALE_ROOT_PATH = '/resources/i18n';
const STORAGE_KEY = 'selectedLocale';
const RTL_LANGUAGE_CODES = (() => {
  const map = {};
  ["ar", "ar-001", "ar-ae", "ar-bh", "ar-dz", "ar-eg", "ar-iq", "ar-jo", "ar-kw", "ar-lb", "ar-ly", "ar-ma", "ar-om", "ar-qa", "ar-sa", "ar-sd", "ar-sy", "ar-tn", "ar-ye", "arc", "bcc", "bqi", "ckb", "dv", "fa", "glk", "he", "ku", "mzn", "pnb", "ps", "sd", "ug", "ur", "yi"].forEach(v => {
    map[v] = true;
  });
  return map;
})();
class AppI18nService {
  constructor() {
    _defineProperty(this, "appLocale", void 0);
    _defineProperty(this, "defaultSupportedLocale", 'en');
    _defineProperty(this, "selectedLocale", void 0);
    _defineProperty(this, "dateFormat", '');
    _defineProperty(this, "timeFormat", '');
    _defineProperty(this, "dateTimeFormat", '');
    _defineProperty(this, "currencyCode", '');
    _defineProperty(this, "timezone", '');
  }
  async init() {
    this.selectedLocale = await StorageService.getItem(STORAGE_KEY);
  }
  isRTLLocale() {
    let newLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectedLocale;
    return !!(newLocale && RTL_LANGUAGE_CODES[newLocale]);
  }
  setRTL(locale) {
    const flag = this.isRTLLocale(locale);
    const needsRestart = !isWebPreviewMode() && I18nManager.isRTL !== flag;
    I18nManager.forceRTL(flag);
    return needsRestart;
  }
  loadAppLocaleBundle(url) {
    return Promise.resolve().then(() => {
      const path = `${url + APP_LOCALE_ROOT_PATH}/${this.selectedLocale}.json`;
      return axios.get(path).then(bundle => {
        this.dateFormat = bundle.data.formats.date;
        this.timeFormat = bundle.data.formats.time;
        this.currencyCode = bundle.data.formats.currency;
        this.dateTimeFormat = this.dateFormat + ' ' + this.timeFormat;
        return bundle;
      }).catch(() => {
        console.warn(`error loading locale resource from ${path}`);
      });
    });
  }
  setTimezone(timezone) {
    this.timezone = timezone;
  }
  getTimezone() {
    return this.timezone;
  }
  setSelectedLocale(locale) {
    this.selectedLocale = locale;
    StorageService.setItem(STORAGE_KEY, locale);
    return this.setRTL(locale);
  }
  getSelectedLocale() {
    return this.selectedLocale;
  }
}
const i18nService = new AppI18nService();
export default i18nService;
//# sourceMappingURL=app-i18n.service.js.map
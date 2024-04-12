var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { cloneDeep, isNil, forEach, flatten, isArray, isEmpty, isObject, isString, get, reverse } from 'lodash';
import React from 'react';
import { camelCase } from 'lodash-es';
import { deepCopy, isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import EventNotifier from '@wavemaker/app-rn-runtime/core/event-notifier';
import ViewPort, { EVENTS as ViewPortEvents } from '@wavemaker/app-rn-runtime/core/viewport';
import MediaQueryList from './MediaQueryList';
import ThemeVariables from './theme.variables';
import { getErrorMessage, getStyleReference, isValidStyleProp } from './style-prop.validator';
export const DEFAULT_CLASS = 'DEFAULT_CLASS';
if (typeof window !== "undefined") {
  // @ts-ignore: does not properly extend MediaQueryList
  window.matchMedia = query => new MediaQueryList(query);
}
export const DEVICE_BREAK_POINTS = {
  'MIN_EXTRA_SMALL_DEVICE': '0px',
  'MAX_EXTRA_SMALL_DEVICE': '767px',
  'MIN_SMALL_DEVICE': '768px',
  'MAX_SMALL_DEVICE': '991px',
  'MIN_MEDIUM_DEVICE': '992px',
  'MAX_MEDIUM_DEVICE': '1199px',
  'MIN_LARGE_DEVICE': '1200px',
  'MAX_LARGE_DEVICE': '1000000px'
};
export let ThemeEvent = /*#__PURE__*/function (ThemeEvent) {
  ThemeEvent["CHANGE"] = "change";
  return ThemeEvent;
}({});
;
export class Theme {
  constructor(parent, name) {
    this.parent = parent;
    this.name = name;
    _defineProperty(this, "eventNotifer", new EventNotifier());
    _defineProperty(this, "children", []);
    _defineProperty(this, "styles", {});
    _defineProperty(this, "cache", {});
    _defineProperty(this, "traceEnabled", false);
    _defineProperty(this, "styleGenerators", []);
    if (parent) {
      this.traceEnabled = parent.traceEnabled;
    } else {
      this.traceEnabled = isWebPreviewMode();
    }
  }
  subscribe(event, fn) {
    return this.eventNotifer.subscribe(event, fn);
  }
  notify(event) {
    this.eventNotifer.notify(event, []);
    this.children.forEach(t => t.notify(event));
  }
  replaceVariables(val) {
    if (isString(val)) {
      (val.match(/_*var\([^\)]*\)/g) || []).forEach(s => {
        const variableName = s.substring(4, s.length - 1);
        val = val.replace(s, ThemeVariables.INSTANCE[variableName] || ThemeVariables.INSTANCE[variableName.substring(2)] || ThemeVariables.INSTANCE[camelCase(variableName.substring(2))]);
        val = this.replaceVariables(val);
      });
    }
    return val;
  }
  clearCache() {
    this.cache = {};
    this.children.forEach(t => t.clearCache());
  }
  registerStyle(fn) {
    this.styleGenerators.push(fn);
    fn(ThemeVariables.INSTANCE, this.addStyle.bind(this));
  }
  checkStyleProperties(name, value) {
    if (isObject(value)) {
      Object.keys(value).map(k => this.checkStyleProperties(k, value[k]));
    } else if (name && !isValidStyleProp(name, value)) {
      console.log(`%cInvalid Style property in ${this.name}: ${getErrorMessage(name, value)}`, 'background-color: #FF0000;font-weight: bold; color: #fff');
      console.log(`Refer: ${getStyleReference(name)}`);
    }
  }
  addStyle(name, extend, style) {
    this.styles[name] = deepCopy(this.getStyle(extend), this.styles[name], style);
  }
  addTrace(styleName, mergedChildstyle, childStyle, parentStyle) {
    if (!this.traceEnabled) {
      return;
    }
    let addTrace = !isEmpty(childStyle);
    forEach(mergedChildstyle, (v, k) => {
      if (v && !isString(v) && !isArray(v) && isObject(v)) {
        addTrace = false;
        this.addTrace(styleName + '.' + k, v, childStyle && childStyle[k], parentStyle && parentStyle[k]);
      }
    });
    if (addTrace) {
      mergedChildstyle['__trace'] = [{
        name: styleName,
        value: childStyle
      }, ...((parentStyle === null || parentStyle === void 0 ? void 0 : parentStyle.__trace) || [])];
    } else {
      mergedChildstyle['__trace'] = [...((parentStyle === null || parentStyle === void 0 ? void 0 : parentStyle.__trace) || [])];
    }
  }
  flatten(style) {
    let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let collect = !isEmpty(style);
    forEach(style, (v, k) => {
      if (v && !isString(v) && !isArray(v) && isObject(v)) {
        collect = false;
        this.flatten(v, (prefix ? prefix + '.' : '') + k, result);
      }
    });
    if (collect) {
      result[prefix] = style;
    }
    return result;
  }
  mergeStyle() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
    const style = deepCopy(...styles);
    if (this.traceEnabled) {
      const flattenStyles = this.flatten(style);
      Object.keys(flattenStyles).forEach(k => {
        const s = flattenStyles[k];
        s['__trace'] = flatten(reverse(styles.map(v => {
          const cs = get(v, k);
          if (cs && cs.__trace) {
            return [...cs.__trace];
          }
          return [];
        }).filter(t => t.length > 0)));
      });
    }
    return style;
  }
  cleanseStyleProperties(style) {
    if (!(style && isObject(style)) || isString(style) || isArray(style)) {
      return;
    }
    style = style;
    if (isObject(style) && !isArray(style)) {
      Object.keys(style).forEach(k => {
        style[k] = this.replaceVariables(style[k]);
      });
    }
    if (!isNil(style['shadowRadius'])) {
      if (style['shadowRadius'] <= 0) {
        style['shadowColor'] = 'transparent';
      } else if (isNil(style['elevation'])) {
        style['elevation'] = 2;
      }
    }
    if (!isNil(style['margin'])) {
      style['marginLeft'] = style['marginLeft'] || style['margin'];
      style['marginRight'] = style['marginRight'] || style['margin'];
      style['marginTop'] = style['marginTop'] || style['margin'];
      style['marginBottom'] = style['marginBottom'] || style['margin'];
      delete style['margin'];
    }
    if (!isNil(style['padding'])) {
      style['paddingLeft'] = style['paddingLeft'] || style['padding'];
      style['paddingRight'] = style['paddingRight'] || style['padding'];
      style['paddingTop'] = style['paddingTop'] || style['padding'];
      style['paddingBottom'] = style['paddingBottom'] || style['padding'];
      delete style['padding'];
    }
    Object.keys(style).forEach((k, i) => this.cleanseStyleProperties(style[k]));
  }
  getStyle(name) {
    let style = this.cache[name];
    if (style) {
      return style;
    }
    if (!name) {
      return {};
    }
    if (name.indexOf(' ') > 0) {
      style = this.mergeStyle(...name.split(' ').map(c => this.getStyle(c)));
    } else {
      const parentStyle = this.parent && this.parent.getStyle(name);
      const mediaQuery = (this.styles[name] || {})['@media'];
      let clonedStyle = {};
      if (!mediaQuery || matchMedia(mediaQuery).matches) {
        clonedStyle = cloneDeep(this.styles[name]);
        this.cleanseStyleProperties(clonedStyle);
      }
      if (this !== Theme.BASE && isWebPreviewMode()) {
        this.checkStyleProperties('', clonedStyle);
      }
      style = deepCopy(parentStyle, clonedStyle);
      this.addTrace(`@${this.name}:${name}`, style, clonedStyle, parentStyle);
    }
    this.cache[name] = style;
    return style;
  }
  $new() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const newTheme = new Theme(this, name);
    newTheme.reset(styles);
    this.children.push(newTheme);
    return newTheme;
  }
  destroy() {
    const i = this.parent.children.indexOf(this);
    if (i >= 0) {
      this.parent.children.splice(i, 1);
    }
  }
  getTextStyle(s) {
    if (!s) {
      return {};
    }
    return {
      color: s.color,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontStyle: s.fontStyle,
      fontWeight: s.fontWeight,
      includeFontPadding: s.includeFontPadding,
      fontVariant: s.fontVariant,
      letterSpacing: s.letterSpacing,
      lineHeight: s.lineHeight,
      textAlign: s.textAlign,
      textAlignVertical: s.textAlignVertical,
      textDecorationColor: s.textDecorationColor,
      textDecorationStyle: s.textDecorationStyle,
      textShadowColor: s.textShadowColor,
      textShadowOffset: s.textShadowOffset,
      textShadowRadius: s.textShadowRadius,
      textTransform: s.textTransform,
      verticalAlign: s.verticalAlign,
      writingDirection: s.writingDirection,
      userSelect: s.userSelect
    };
  }
  reset(styles) {
    this.styles = {};
    this.clearCache();
    if (styles) {
      this.registerStyle((themeVariables, addStyle) => {
        Object.keys(styles).forEach(k => {
          addStyle(k, '', styles[k]);
        });
      });
    } else {
      this.styleGenerators.forEach(fn => fn(ThemeVariables.INSTANCE, this.addStyle.bind(this)));
    }
    this.notify(ThemeEvent.CHANGE);
  }
}
_class = Theme;
_defineProperty(Theme, "BASE", new _class(null, 'default'));
ViewPort.subscribe(ViewPortEvents.SIZE_CHANGE, () => {
  _class.BASE.reset();
});
export default Theme.BASE;
const ThemeContext = /*#__PURE__*/React.createContext(null);
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
/**
 * Common styles
 */
Theme.BASE.registerStyle((themeVariables, addStyle) => {
  const addColStyles = (device, minWidth) => {
    for (let i = 1; i <= 12; i++) {
      addStyle(`col-${device}-${i}`, '', {
        "@media": `(min-width: ${minWidth})`,
        root: {
          width: 100 * i / 12 + '%'
        }
      });
    }
  };
  addColStyles('xs', DEVICE_BREAK_POINTS.MIN_EXTRA_SMALL_DEVICE);
  addColStyles('sm', DEVICE_BREAK_POINTS.MIN_SMALL_DEVICE);
  addColStyles('md', DEVICE_BREAK_POINTS.MIN_MEDIUM_DEVICE);
  addColStyles('lg', DEVICE_BREAK_POINTS.MIN_LARGE_DEVICE);
  addStyle('d-none', '', {
    root: {
      display: 'none'
    }
  });
  addStyle('d-flex', '', {
    root: {
      display: 'flex'
    }
  });
  const addDisplayStyles = (device, minWidth, maxWidth) => {
    addStyle(`d-${device}-none`, '', {
      "@media": `(min-width: ${minWidth}) and (max-width: ${maxWidth})`,
      root: {
        display: 'none'
      }
    });
    addStyle(`d-${device}-flex`, '', {
      "@media": `(min-width: ${minWidth}) and (max-width: ${maxWidth})`,
      root: {
        display: 'flex'
      }
    });
  };
  addDisplayStyles('all', DEVICE_BREAK_POINTS.MIN_EXTRA_SMALL_DEVICE, DEVICE_BREAK_POINTS.MAX_LARGE_DEVICE);
  addDisplayStyles('xs', DEVICE_BREAK_POINTS.MIN_EXTRA_SMALL_DEVICE, DEVICE_BREAK_POINTS.MAX_EXTRA_SMALL_DEVICE);
  addDisplayStyles('sm', DEVICE_BREAK_POINTS.MIN_SMALL_DEVICE, DEVICE_BREAK_POINTS.MAX_SMALL_DEVICE);
  addDisplayStyles('md', DEVICE_BREAK_POINTS.MIN_MEDIUM_DEVICE, DEVICE_BREAK_POINTS.MAX_MEDIUM_DEVICE);
  addDisplayStyles('lg', DEVICE_BREAK_POINTS.MIN_LARGE_DEVICE, DEVICE_BREAK_POINTS.MAX_LARGE_DEVICE);
  const addElevationClasses = () => {
    for (let i = 1; i <= 10; i++) {
      addStyle(`elevate${i}`, '', {
        root: {
          shadowColor: "#000000",
          shadowOffset: {
            width: i,
            height: i
          },
          shadowOpacity: 0.27,
          shadowRadius: i,
          elevation: i,
          zIndex: 1
        }
      });
    }
  };
  addElevationClasses();
  addStyle('hidden', '', {
    root: {
      width: 0,
      height: 0,
      transform: [{
        scale: 0
      }]
    }
  });
  addStyle('bg-danger', '', {
    root: {
      backgroundColor: themeVariables.dangerColor
    }
  });
  addStyle('bg-info', '', {
    root: {
      backgroundColor: themeVariables.infoColor
    }
  });
  addStyle('bg-primary', '', {
    root: {
      backgroundColor: themeVariables.primaryColor
    }
  });
  addStyle('bg-success', '', {
    root: {
      backgroundColor: themeVariables.successColor
    }
  });
  addStyle('bg-warning', '', {
    root: {
      backgroundColor: themeVariables.warningColor
    }
  });
  addStyle('border-danger', '', {
    root: {
      borderColor: themeVariables.dangerColor
    }
  });
  addStyle('border-info', '', {
    root: {
      borderColor: themeVariables.infoColor
    }
  });
  addStyle('border-primary', '', {
    root: {
      borderColor: themeVariables.primaryColor
    }
  });
  addStyle('border-success', '', {
    root: {
      borderColor: themeVariables.successColor
    }
  });
  addStyle('border-warning', '', {
    root: {
      borderColor: themeVariables.warningColor
    }
  });
  addStyle('hide-context-menu', '', {
    text: {
      userSelect: 'none'
    }
  });
});
//# sourceMappingURL=theme.js.map
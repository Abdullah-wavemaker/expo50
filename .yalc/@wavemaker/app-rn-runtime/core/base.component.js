function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { assign, isUndefined, isNil } from 'lodash';
import React from 'react';
import { AccessibilityInfo, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import { StyleProps, getStyleName } from '@wavemaker/app-rn-runtime/styles/style-props';
import { BackgroundComponent } from '@wavemaker/app-rn-runtime/styles/background.component';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import { ROOT_LOGGER } from '@wavemaker/app-rn-runtime/core/logger';
import { deepCopy } from '@wavemaker/app-rn-runtime/core/utils';
import BASE_THEME, { ThemeConsumer, ThemeEvent } from '../styles/theme';
import EventNotifier from './event-notifier';
import { PropsProvider } from './props.provider';
import { assignIn } from 'lodash-es';
import { HideMode } from './if.component';
import { AssetConsumer } from './asset.provider';
import { FixedView } from './fixed-view.component';
import { TextIdPrefixConsumer } from './testid.provider';
import { isScreenReaderEnabled } from './accessibility';
export const WIDGET_LOGGER = ROOT_LOGGER.extend('widget');
export const ParentContext = /*#__PURE__*/React.createContext(null);
export class BaseComponentState {
  constructor() {
    _defineProperty(this, "animationId", 0);
    _defineProperty(this, "animatableProps", undefined);
    _defineProperty(this, "props", {});
    _defineProperty(this, "hide", false);
  }
}
export function defineStyles(styles) {
  return deepCopy({
    text: {
      fontFamily: ThemeVariables.INSTANCE.baseFont,
      userSelect: 'text'
    }
  }, styles);
}
export class BaseProps extends StyleProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "id", null);
    _defineProperty(this, "name", null);
    _defineProperty(this, "key", null);
    _defineProperty(this, "disabled", false);
    _defineProperty(this, "show", true);
    _defineProperty(this, "styles", null);
    _defineProperty(this, "classname", null);
    _defineProperty(this, "listener", null);
    _defineProperty(this, "showindevice", null);
    _defineProperty(this, "showskeleton", false);
    _defineProperty(this, "deferload", false);
  }
}
export class BaseComponent extends React.Component {
  constructor(markupProps, defaultClass, defaultProps, defaultState) {
    super(markupProps);
    this.defaultClass = defaultClass;
    _defineProperty(this, "styles", null);
    _defineProperty(this, "hideMode", HideMode.ADD_TO_DOM);
    _defineProperty(this, "propertyProvider", void 0);
    _defineProperty(this, "proxy", void 0);
    _defineProperty(this, "initialized", false);
    _defineProperty(this, "cleanup", []);
    _defineProperty(this, "theme", BASE_THEME);
    _defineProperty(this, "updateStateTimeouts", []);
    _defineProperty(this, "parent", null);
    _defineProperty(this, "destroyed", false);
    _defineProperty(this, "_showSkeleton", false);
    _defineProperty(this, "isFixed", false);
    _defineProperty(this, "notifier", new EventNotifier());
    _defineProperty(this, "parentListenerDestroyers", []);
    _defineProperty(this, "_background", /*#__PURE__*/React.createElement(React.Fragment, null));
    _defineProperty(this, "styleOverrides", {});
    _defineProperty(this, "loadAsset", null);
    _defineProperty(this, "i18nService", injector.I18nService.get());
    _defineProperty(this, "testIdPrefix", '');
    _defineProperty(this, "_showView", true);
    this.state = defaultState || {};
    this.notifier.name = this.props.name || '';
    this.propertyProvider = new PropsProvider(assign({
      show: true
    }, defaultProps), assign({}, markupProps), (name, $new, $old) => {
      WIDGET_LOGGER.debug(() => `${this.props.name || this.constructor.name}: ${name} changed from ${$old} to ${$new}`);
      if (this.initialized) {
        const styleName = getStyleName(name);
        if (styleName) {
          if ($new === undefined) {
            delete this.styleOverrides[styleName];
          } else {
            this.styleOverrides[styleName] = $new;
          }
        }
      }
      if (name === 'showskeleton' && this.initialized) {
        setTimeout(() => this.cleanRefresh(), 100);
      }
      this.onPropertyChange(name, $new, $old);
    });
    //@ts-ignore
    this.state.props = this.propertyProvider.get();
    //@ts-ignore
    this._showView = !this.props.deferload;
    this.propertyProvider.check();
    //@ts-ignore
    this.proxy = new Proxy(this, {
      get: (target, prop, receiver) => {
        const propName = prop.toString();
        if (this.propertyProvider.has(propName)) {
          //@ts-ignore
          return this.state.props[propName];
        }
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        const propName = prop.toString();
        if (this.propertyProvider.has(propName)) {
          // @ts-ignore
          const props = {};
          props[propName] = value;
          this.updateState({
            props: props
          });
          return true;
        } else {
          return Reflect.set(target, prop, value);
        }
      }
    });
    this.cleanup.push(() => {
      this.updateStateTimeouts.forEach(v => clearTimeout(v));
    });
    this.cleanup.push(this.theme.subscribe(ThemeEvent.CHANGE, () => {
      this.forceUpdate();
    }));
    this.cleanup.push(AccessibilityInfo.addEventListener('screenReaderChanged', () => {
      setTimeout(() => {
        this.forceUpdate();
      }, 100);
    }).remove);
    this.cleanup.push(() => {
      this.destroyParentListeners();
    });
  }
  subscribe(event, fn) {
    return this.notifier.subscribe(event, fn);
  }
  notify(event, args) {
    return this.notifier.notify(event, args);
  }
  get isRTL() {
    return this.i18nService.isRTLLocale();
  }
  animate(props) {
    this.setState({
      animationId: Date.now(),
      animatableProps: props
    });
  }
  setProp(propName, value) {
    this.propertyProvider.set(propName, value);
    this.updateState({
      props: {}
    });
  }
  setPropDefault(propName, value) {
    this.propertyProvider.setDefault(propName, value);
  }
  onPropertyChange(name, $new, $old) {}
  getDefaultStyles() {
    return this.theme.getStyle(this.defaultClass);
  }
  reset() {}
  updateState(newPartialState, callback) {
    if (this.destroyed) {
      return;
    }
    const stateFn = oldState => {
      const oldProps = oldState.props;
      const newState = this.initialized ? assignIn({}, oldState, newPartialState) : assignIn(oldState, newPartialState);
      if (newPartialState.props) {
        Object.keys(newPartialState.props).forEach(k => {
          //@ts-ignore
          oldProps[k] = newState.props[k];
        });
        newState.props = oldProps;
      }
      return newState;
    };
    const onUpdateState = () => {
      var _this$props$listener, _this$props$listener2;
      callback && callback();
      ((_this$props$listener = this.props.listener) === null || _this$props$listener === void 0 ? void 0 : _this$props$listener.onComponentChange) && ((_this$props$listener2 = this.props.listener) === null || _this$props$listener2 === void 0 ? void 0 : _this$props$listener2.onComponentChange(this));
    };
    if (!this.initialized) {
      this.state = stateFn(this.state);
      onUpdateState();
    } else {
      const timeoutId = setTimeout(() => {
        this.setState(stateFn, onUpdateState);
        this.updateStateTimeouts.splice(this.updateStateTimeouts.indexOf(timeoutId), 1);
      });
      this.updateStateTimeouts.push(timeoutId);
    }
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.propertyProvider.check(nextProps)) {
      return true;
    }
    for (let key in nextState) {
      if (key !== 'props' && (!(key in this.state) || nextState[key] !== this.state[key])) {
        return true;
      }
    }
    for (let key in this.state) {
      if (key !== 'props' && (!(key in nextState) || this.state[key] !== nextState[key])) {
        return true;
      }
    }
    return false;
  }
  componentDidMount() {
    if (this.props.listener && this.props.listener.onComponentInit) {
      this.props.listener.onComponentInit(this.proxy);
    }
    this.initialized = true;
  }
  componentWillAttach() {
    if (this.isFixed) {
      this.setState({
        hide: false
      });
    }
  }
  componentWillDetach() {
    if (this.isFixed) {
      this.setState({
        hide: true
      });
    }
  }
  componentWillUnmount() {
    this.destroyed = true;
    if (this.props.listener && this.props.listener.onComponentDestroy) {
      this.props.listener.onComponentDestroy(this.proxy);
    }
    this.cleanup.forEach(f => f && f());
    this.notifier.destroy();
    this.notifier.notify('destroy', []);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.propertyProvider.check(this.props)) {
      this.forceUpdate();
    }
  }
  invokeEventCallback(eventName, args) {
    //@ts-ignore
    const callBack = this.props[eventName];
    args = args && args.map(a => a === this ? this.proxy : a);
    if (callBack) {
      try {
        return callBack.apply(this.proxy, args);
      } catch (e) {
        console.error(e);
      }
    }
  }
  showView() {
    return this.isVisible();
  }
  isVisible() {
    const show = this.state.props.show;
    return show !== false && show !== 'false' && show !== '0' && !isNil(show);
  }
  refresh() {
    this.forceUpdate();
  }
  cleanRefresh() {
    this.forceUpdate(() => this.notifier.notify('forceUpdate', []));
  }
  renderSkeleton(props) {
    return null;
  }
  destroyParentListeners() {
    this.parentListenerDestroyers.map(fn => fn());
  }
  setParent(parent) {
    if (parent && this.parent !== parent) {
      this.parent = parent;
      this.notifier.setParent(parent.notifier);
      this.parentListenerDestroyers = [this.parent.subscribe('forceUpdate', () => {
        this.cleanRefresh();
      }), this.parent.subscribe('destroy', () => {
        this.destroyParentListeners();
      })];
    }
  }
  copyStyles(property, from, to) {
    if (!isUndefined(from[property])) {
      to[property] = from[property];
    }
  }
  renderFixedContainer(props) {
    const style = {};
    const rootStyle = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%"
    };
    this.copyStyles('left', this.styles.root, style);
    this.copyStyles('top', this.styles.root, style);
    this.copyStyles('right', this.styles.root, style);
    this.copyStyles('bottom', this.styles.root, style);
    this.copyStyles('width', this.styles.root, style);
    this.copyStyles('height', this.styles.root, style);
    this.styles = this.theme.mergeStyle(this.styles, {
      root: rootStyle
    });
    return /*#__PURE__*/React.createElement(FixedView, {
      style: style,
      theme: this.theme
    }, this.addAnimation(this.renderWidget(props)));
  }
  addAnimation(n) {
    if (!this.state.animatableProps) {
      return n;
    }
    return /*#__PURE__*/React.createElement(Animatable.View, _extends({
      key: this.state.animationId
    }, this.state.animatableProps), n);
  }
  setBackground() {
    const bgStyle = this.styles.root;
    this._background = /*#__PURE__*/React.createElement(BackgroundComponent, {
      image: bgStyle.backgroundImage,
      position: bgStyle.backgroundPosition,
      size: bgStyle.backgroundSize,
      repeat: bgStyle.backgroundRepeat,
      resizeMode: bgStyle.backgroundResizeMode,
      style: {
        borderRadius: this.styles.root.borderRadius
      }
    });
    delete this.styles.root['backgroundImage'];
    delete this.styles.root['backgroundPosition'];
    delete this.styles.root['backgroundResizeMode'];
    delete this.styles.root['backgroundSize'];
    delete this.styles.root['backgroundRepeat'];
  }
  getTestId(suffix) {
    let id = this.props.id || this.props.name;
    if (this.testIdPrefix) {
      id = this.testIdPrefix + '_' + id;
    }
    if (suffix) {
      id = id + '_' + suffix;
    }
    return id;
  }
  getTestProps(suffix) {
    let id = this.getTestId(suffix);
    if (isScreenReaderEnabled()) {
      return {};
    }
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      return {
        accessibilityLabel: id,
        testID: id
      };
    }
    return {
      accessible: false,
      testID: id
    };
  }
  getStyleClassName() {
    return this.state.props.classname;
  }
  getTestPropsForInput(suffix) {
    return this.getTestProps(suffix || 'i');
  }
  getTestPropsForAction(suffix) {
    return this.getTestProps(suffix || 'a');
  }
  getTestPropsForLabel(suffix) {
    return this.getTestProps(suffix || 'l');
  }
  getDependenciesFromContext(fn) {
    return /*#__PURE__*/React.createElement(TextIdPrefixConsumer, null, testIdPrefix => {
      this.testIdPrefix = testIdPrefix || '';
      return /*#__PURE__*/React.createElement(AssetConsumer, null, loadAsset => {
        this.loadAsset = loadAsset;
        return /*#__PURE__*/React.createElement(ParentContext.Consumer, null, parent => {
          var _this$parent;
          this.setParent(parent);
          this._showSkeleton = ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent._showSkeleton) || !!this.state.props.showskeleton;
          return /*#__PURE__*/React.createElement(ParentContext.Provider, {
            value: this
          }, /*#__PURE__*/React.createElement(ThemeConsumer, null, theme => {
            this.theme = theme || BASE_THEME;
            return fn();
          }));
        });
      });
    });
  }
  render() {
    const props = this.state.props;
    this.isFixed = false;
    const selectedLocale = this.i18nService.getSelectedLocale();
    return this.getDependenciesFromContext(() => {
      WIDGET_LOGGER.info(() => `${this.props.name || this.constructor.name} is rendering.`);
      this._showView = this._showView || this.showView();
      if (this.state.hide || !this.isVisible() && this.hideMode === HideMode.DONOT_ADD_TO_DOM || !this._showView) {
        return null;
      }
      const classname = this.getStyleClassName();
      this.styles = this.theme.mergeStyle(this.getDefaultStyles(), {
        text: this.theme.getStyle('app-' + selectedLocale)
      }, {
        text: this.theme.getStyle(this.defaultClass + '-' + selectedLocale)
      }, props.disabled ? this.theme.getStyle(this.defaultClass + '-disabled') : null, this.isRTL ? this.theme.getStyle(this.defaultClass + '-rtl') : null, classname && this.theme.getStyle(classname), props.showindevice && this.theme.getStyle('d-all-none ' + props.showindevice.map(d => `d-${d}-flex`).join(' ')), this.props.styles, {
        root: this.styleOverrides,
        text: this.styleOverrides
      });
      if (this.styles.root.hasOwnProperty('_background')) {
        delete this.styles.root.backgroundColor;
      }
      if (!this.isVisible()) {
        assign(this.styles, this.theme.getStyle('hidden'));
      }
      let eleToRender = this._showSkeleton && this.renderSkeleton(props);
      if (eleToRender) {
        return eleToRender;
      }
      this.setBackground();
      this.isFixed = this.styles.root.position === 'fixed';
      if (this.isFixed) {
        this.styles.root.position = undefined;
        return this.renderFixedContainer(props);
      }
      return this.addAnimation(this.renderWidget(this.state.props));
    });
  }
}
//# sourceMappingURL=base.component.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text } from 'react-native';
import { get, filter, isNil } from 'lodash';
import { TestIdPrefixProvider, TextIdPrefixConsumer } from '@wavemaker/app-rn-runtime/core/testid.provider';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import { toBoolean, toNumber, isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';
import { BaseComponent, BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
import BASE_THEME, { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import { VariableEvents } from '@wavemaker/app-rn-runtime/variables/base-variable';
import { default as _viewPort, EVENTS as viewportEvents } from '@wavemaker/app-rn-runtime/core/viewport';
import WmFormField from '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component';
import WmForm from '@wavemaker/app-rn-runtime/components/data/form/form.component';
import { ToastConsumer } from '@wavemaker/app-rn-runtime/core/toast.service';
import spinnerService from '@wavemaker/app-rn-runtime/runtime/services/app-spinner.service';
import AppI18nService from './services/app-i18n.service';
import WmFormAction from '@wavemaker/app-rn-runtime/components/data/form/form-action/form-action.component';
export class FragmentProps extends BaseProps {}
export default class BaseFragment extends BaseComponent {
  constructor(props, defaultProps) {
    super(props, null, defaultProps);
    _defineProperty(this, "App", void 0);
    _defineProperty(this, "onReady", () => {});
    _defineProperty(this, "baseUrl", '');
    _defineProperty(this, "resourceBaseUrl", '');
    _defineProperty(this, "targetWidget", null);
    _defineProperty(this, "Widgets", {});
    _defineProperty(this, "Variables", {});
    _defineProperty(this, "theme", BASE_THEME);
    _defineProperty(this, "appLocale", {});
    _defineProperty(this, "startUpVariables", []);
    _defineProperty(this, "startUpVariablesLoaded", false);
    _defineProperty(this, "startUpActions", []);
    _defineProperty(this, "autoUpdateVariables", []);
    _defineProperty(this, "cleanUpVariablesandActions", []);
    _defineProperty(this, "fragmentVariables", {});
    _defineProperty(this, "fragmentActions", {});
    _defineProperty(this, "Actions", {});
    _defineProperty(this, "appConfig", injector.get('APP_CONFIG'));
    _defineProperty(this, "cache", false);
    _defineProperty(this, "refreshdataonattach", true);
    _defineProperty(this, "isReactNativeApp", true);
    _defineProperty(this, "fragments", {});
    _defineProperty(this, "isDetached", false);
    _defineProperty(this, "_memoize", {});
    _defineProperty(this, "toaster", void 0);
    _defineProperty(this, "formatters", void 0);
    _defineProperty(this, "serviceDefinitions", {});
    _defineProperty(this, "Viewport", _viewPort);
    _defineProperty(this, "loadingMessage", /*#__PURE__*/React.createElement(Text, [], ['loading...']));
    _defineProperty(this, "showContent", false);
    _defineProperty(this, "notification", {
      text: '',
      title: '',
      okButtonText: '',
      cancelButtonText: '',
      onOk: () => {},
      onCancel: () => {},
      onClose: () => {}
    });
    _defineProperty(this, "watcher", null);
    this.App = this.appConfig.app;
    this.formatters = this.App.formatters;
    this.Actions = Object.assign({}, this.App.Actions);
    this.Variables = Object.assign({}, this.App.Variables);
    this.cleanup.push(_viewPort.subscribe(viewportEvents.ORIENTATION_CHANGE, ($new, $old) => {
      !this.isDetached && this.targetWidget && this.targetWidget.invokeEventCallback('onOrientationchange', [null, this.proxy, {
        screenWidth: _viewPort.width,
        screenHeight: _viewPort.height
      }]);
    }));
    this.cleanup.push(_viewPort.subscribe(viewportEvents.SIZE_CHANGE, ($new, $old) => {
      !this.isDetached && this.targetWidget && this.targetWidget.invokeEventCallback('onResize', [null, this.proxy, {
        screenWidth: $new.width,
        screenHeight: $new.height
      }]);
    }));
    this.cleanup.push(() => {
      var _this$theme;
      return (_this$theme = this.theme) === null || _this$theme === void 0 ? void 0 : _this$theme.destroy();
    });
    this.baseUrl = this.appConfig.url;
    this.resourceBaseUrl = this.appConfig.url;
    this.cleanup.push(() => this.onDestroy());
  }
  onContentReady() {
    this.onReady();
    this.appConfig.refresh();
    this.targetWidget && this.targetWidget.invokeEventCallback('onLoad', [null, this.proxy]);
    this.onContentReady = () => {};
  }
  onComponentChange(w) {
    this.refresh();
  }
  onComponentInit(w) {
    const id = w.props.id || w.props.name;
    let formWidgets, formFields, formActions;
    if (w instanceof WmForm) {
      if (!this.Widgets[id]) {
        this.Widgets[id] = w;
      }
      if (w.props.id) {
        const name = w.props.name;
        formWidgets = this.Widgets[name].formWidgets;
        formFields = this.Widgets[name].formFields;
        formActions = this.Widgets[name].buttonArray;
        this.Widgets[name].formFields = [];
        this.Widgets[name].buttonArray = [];
        this.Widgets[name].formWidgets = {};
      } else {
        formWidgets = this.Widgets[id].formWidgets;
        formFields = this.Widgets[id].formFields;
        formActions = this.Widgets[id].buttonArray;
      }
      this.Widgets[id] = w;
      if (w.parentFormRef) {
        let pid = w.parentFormRef.props.id || w.parentFormRef.props.name;
        formFields.forEach(ff => {
          const formKey = ff.props.formKey || ff.props.name;
          this.Widgets[pid].formFields.push(ff);
          this.Widgets[pid].formWidgets[formKey] = formWidgets[ff.props.name];
        });
      }
      w.registerFormFields(formFields, formWidgets);
      w.registerFormActions(formActions);
      return;
    }
    if (w.props.formfield) {
      if (!this.Widgets[w.props.formRef]) {
        this.Widgets[w.props.formRef] = {
          formFields: [],
          formWidgets: {}
        };
      } else if (!this.Widgets[w.props.formRef].formFields) {
        this.Widgets[w.props.formRef].formFields = [];
      }
      if (!this.Widgets[w.props.formRef].formWidgets) {
        this.Widgets[w.props.formRef].formWidgets = {};
      }
      this.Widgets[w.props.formRef].formWidgets[w.props.name] = w;
      return;
    }
    if (w instanceof WmFormAction) {
      if (!this.Widgets[w.props.formKey]) {
        this.Widgets[w.props.formKey] = {};
      }
      if (!this.Widgets[w.props.formKey].buttonArray) {
        this.Widgets[w.props.formKey].buttonArray = [];
      }
      this.Widgets[w.props.formKey].buttonArray.push(w);
      return;
    }
    if (w instanceof WmFormField) {
      if (!this.Widgets[w.props.formRef]) {
        this.Widgets[w.props.formRef] = {};
      }
      if (!this.Widgets[w.props.formRef].formFields) {
        this.Widgets[w.props.formRef].formFields = [];
      }
      this.Widgets[w.props.formRef].formWidgets = this.Widgets[w.props.formRef].formWidgets || {};
      this.Widgets[w.props.formRef].formFields.push(w);
      return;
    }
    this.Widgets[id] = w;
    if (w instanceof BaseFragment && w !== this) {
      this.fragments[id] = w;
    }
  }
  onComponentDestroy(w) {
    const id = w.props.id || w.props.name;
    delete this.Widgets[id];
    if (w instanceof BaseFragment) {
      delete this.fragments[id];
    }
    if (w instanceof WmForm) {
      w.formWidgets = {};
      w.formFields = [];
      w.formfields = {};
    }
  }
  handleUrl(url) {
    if (isFullPathUrl(url)) {
      return url;
    }
    return this.appConfig.url + (url.startsWith('/') ? '' : '/') + url;
  }
  getDateFormat(fmt) {
    // getting formats from appLocale when app locale is loaded locally.
    return (fmt || AppI18nService.dateFormat || get(this.appConfig, 'appLocale.formats.date')).replace(/d/g, 'D').replace(/E/g, 'd').replace(/y/g, 'Y');
  }
  getTimeFormat(fmt) {
    return fmt || AppI18nService.timeFormat || get(this.appConfig, 'appLocale.formats.time');
  }
  getDateTimeFormat(fmt) {
    return (fmt || AppI18nService.dateTimeFormat || get(this.appConfig, 'appLocale.formats.date') + ' ' + get(this.appConfig, 'appLocale.formats.time')).replace(/d/g, 'D').replace(/E/g, 'd').replace(/y/g, 'Y');
  }
  getCurrencySymbol(fmt) {
    return fmt || AppI18nService.currencyCode || 'USD';
  }
  getStyle(classes) {
    let inlineStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (classes && classes.trim().length > 0) {
      return this.theme.mergeStyle({}, this.theme.getStyle(classes), inlineStyles);
    }
    return inlineStyles;
  }
  resetAppLocale() {
    this.appLocale = this.appConfig.appLocale.messages;
    Object.values(this.fragments).forEach(f => f.resetAppLocale());
  }
  eval(fn) {
    let failOnError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    try {
      return fn.call(this);
    } catch (e) {
      if (failOnError) {
        throw e;
      } else {
        return null;
      }
    }
  }
  toBoolean(val) {
    if (isNil(val)) {
      return false;
    }
    return toBoolean(val);
  }
  toNumber(val) {
    if (isNil(val)) {
      return val;
    }
    return toNumber(val);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.targetWidget && this.targetWidget.invokeEventCallback('onDestroy', [null, this.proxy]);
  }
  componentDidMount() {
    this.resetAppLocale();
    super.componentDidMount();
  }
  memoize(key, o) {
    if (!this._memoize[key]) {
      this._memoize[key] = o;
    }
    return this._memoize[key];
  }
  initVariableSpinner() {
    let variables = filter(this.Variables, v => !!get(v, 'config.spinnerContext'));
    const actions = filter(this.Actions, v => !!get(v, 'config.spinnerContext'));
    variables = variables.concat(actions);
    if (!variables.length) {
      return;
    }
    this.cleanup.push(...variables.map(v => {
      return v.subscribe(VariableEvents.BEFORE_INVOKE, () => {
        spinnerService.show({
          message: get(v, 'config.spinnerMessage'),
          spinner: this.App.appConfig.spinner
        });
      });
    }));
    this.cleanup.push(...variables.map(v => {
      return v.subscribe(VariableEvents.AFTER_INVOKE, () => {
        spinnerService.hide();
      });
    }));
  }
  onFragmentReady() {
    this.cleanup.push(...Object.values({
      ...this.Variables,
      ...this.Actions
    }).map(v => {
      return v.subscribe(VariableEvents.AFTER_INVOKE, () => this.App.refresh());
    }));
    this.initVariableSpinner();
    this.cleanUpVariablesandActions.push(...Object.values({
      ...this.fragmentVariables,
      ...this.fragmentActions
    }));
    this.startUpActions.map(a => this.Actions[a] && this.Actions[a].invoke());
    return Promise.all(this.startUpVariables.map(s => this.Variables[s] && this.Variables[s].invoke())).catch(error => {
      // catch errors and show content
      console.error(error);
    }).then(() => {
      this.startUpVariablesLoaded = true;
      this.showContent = true;
      this.appConfig.refresh();
    });
  }
  onAttach() {
    var _this$targetWidget;
    this.isDetached = false;
    this.watcher.isActive = true;
    this.resetAppLocale();
    Object.values(this.fragments).forEach(f => f.onAttach());
    this.cleanUpVariablesandActions.forEach(v => v.unmute && v.unmute());
    (_this$targetWidget = this.targetWidget) === null || _this$targetWidget === void 0 ? void 0 : _this$targetWidget.invokeEventCallback('onAttach', [null, this.proxy]);
    if (this.refreshdataonattach) {
      Promise.all(this.startUpVariables.map(s => this.Variables[s] && this.Variables[s].invoke()));
    }
    Object.values(this.Widgets).forEach(w => {
      w.componentWillAttach && w.componentWillAttach();
    });
  }
  onDetach() {
    var _this$targetWidget2;
    this.isDetached = true;
    this.watcher.isActive = false;
    Object.values(this.fragments).forEach(f => f.onDetach());
    this.cleanUpVariablesandActions.forEach(v => v.mute && v.mute());
    (_this$targetWidget2 = this.targetWidget) === null || _this$targetWidget2 === void 0 ? void 0 : _this$targetWidget2.invokeEventCallback('onDetach', [null, this.proxy]);
    Object.values(this.Widgets).forEach(w => {
      w.componentWillDetach && w.componentWillDetach();
    });
  }
  onDestroy() {
    this.cleanUpVariablesandActions.forEach(v => v.destroy());
    this.watcher.destroy();
  }
  refresh() {
    injector.get('AppConfig').refresh();
  }
  forceUpdate() {
    super.forceUpdate();
    Object.values(this.fragments).forEach(f => f.forceUpdate());
  }
  generateTestIdPrefix() {
    const testId = this.getTestId();
    return testId && testId.split('').reduce((a, v, i) => a + v.charCodeAt(0) * (i + 1), 0) + '';
  }
  render() {
    if (this.startUpVariablesLoaded) {
      this.autoUpdateVariables.forEach(value => {
        var _this$Variables$value;
        return (_this$Variables$value = this.Variables[value]) === null || _this$Variables$value === void 0 ? void 0 : _this$Variables$value.invokeOnParamChange();
      });
    }
    return this.isVisible() ? /*#__PURE__*/React.createElement(ThemeProvider, {
      value: this.theme
    }, /*#__PURE__*/React.createElement(TextIdPrefixConsumer, null, testIdPrefix => {
      this.testIdPrefix = testIdPrefix || '';
      return /*#__PURE__*/React.createElement(TestIdPrefixProvider, {
        value: this.generateTestIdPrefix() || ''
      }, /*#__PURE__*/React.createElement(ToastConsumer, null, toastService => {
        this.toaster = toastService;
        return this.renderWidget(this.props);
      }));
    })) : null;
  }
}
//# sourceMappingURL=base-fragment.component.js.map
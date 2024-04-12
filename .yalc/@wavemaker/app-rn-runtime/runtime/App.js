function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import axios from 'axios';
import { Platform, TouchableOpacity, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import ProtoTypes from 'prop-types';
import { SafeAreaProvider, SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Linking } from 'react-native';
import { NativeModulesProxy } from 'expo-modules-core';
import * as WebBrowser from 'expo-web-browser';
import { get, last } from 'lodash';
import { RENDER_LOGGER } from '@wavemaker/app-rn-runtime/core/logger';
import EventNotifier from '@wavemaker/app-rn-runtime/core/event-notifier';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import StorageService from '@wavemaker/app-rn-runtime/core/storage.service';
import ConstantService from '@wavemaker/app-rn-runtime/core/constant.service';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import formatters from '@wavemaker/app-rn-runtime/core/formatters';
import { deepCopy, isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import * as Utils from '@wavemaker/app-rn-runtime/core/utils';
import { ModalProvider } from '@wavemaker/app-rn-runtime/core/modal.service';
import { FixedViewContainer } from '@wavemaker/app-rn-runtime/core/fixed-view.component';
import { ToastProvider } from '@wavemaker/app-rn-runtime/core/toast.service';
import { NavigationServiceProvider } from '@wavemaker/app-rn-runtime/core/navigation.service';
import { PartialProvider } from '@wavemaker/app-rn-runtime/core/partial.service';
import WmNetworkInfoToaster from '@wavemaker/app-rn-runtime/components/advanced/network-info-toaster/network-info-toaster.component';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import WmMessage from '@wavemaker/app-rn-runtime/components/basic/message/message.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import AppI18nService from '@wavemaker/app-rn-runtime/runtime/services/app-i18n.service';
import { Watcher } from './watcher';
import { preparePatch } from './lib-patch';
import AppDisplayManagerService from './services/app-display-manager.service';
import AppModalService from './services/app-modal.service';
import AppToastService from './services/app-toast.service';
import AppPartialService from './services/partial.service';
import AppSpinnerService from './services/app-spinner.service';
import { AppNavigator } from './App.navigator';
import { SecurityProvider } from '../core/security.service';
import { CameraProvider } from '../core/device/camera-service';
import CameraService from './services/device/camera-service';
import { ScanProvider } from '../core/device/scan-service';
import ScanService from './services/device/scan-service';
import AppSecurityService from './services/app-security.service';
import { getValidJSON, parseErrors } from '@wavemaker/app-rn-runtime/variables/utils/variable.utils';
import MaterialCommunityIconsFont from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import * as SplashScreen from 'expo-splash-screen';
import { WmMemo } from './memo.component';
//some old react libraries need this
View['propTypes'] = {
  style: ProtoTypes.any
};
const MIN_TIME_BETWEEN_REFRESH_CYCLES = 200;
class DrawerImpl {
  constructor(onChange) {
    this.onChange = onChange;
    _defineProperty(this, "content", void 0);
    _defineProperty(this, "animation", 'slide-in');
  }
  setContent(content) {
    this.content = content;
    this.onChange();
  }
  getContent() {
    return this.content;
  }
  setAnimation(animation) {
    this.animation = animation;
    this.onChange();
  }
  getAnimation() {
    return this.animation;
  }
}
const SUPPORTED_SERVICES = {
  Utils: Utils,
  CONSTANTS: ConstantService,
  StorageService: StorageService,
  AppDisplayManagerService: AppDisplayManagerService
};
export default class BaseApp extends React.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "Actions", {});
    _defineProperty(this, "Variables", {});
    _defineProperty(this, "onAppVariablesReady", () => {});
    _defineProperty(this, "isStarted", false);
    _defineProperty(this, "appConfig", injector.get('APP_CONFIG'));
    _defineProperty(this, "eventNotifier", new EventNotifier());
    _defineProperty(this, "baseUrl", '');
    _defineProperty(this, "targetPlatform", 'NATIVE_MOBILE');
    _defineProperty(this, "cleanup", []);
    _defineProperty(this, "commonPartial", null);
    _defineProperty(this, "startUpVariables", []);
    _defineProperty(this, "startUpActions", []);
    _defineProperty(this, "autoUpdateVariables", []);
    _defineProperty(this, "axiosInterceptorIds", []);
    _defineProperty(this, "formatters", formatters);
    _defineProperty(this, "serviceDefinitions", {});
    _defineProperty(this, "animatedRef", void 0);
    _defineProperty(this, "modalsOpened", 0);
    _defineProperty(this, "toastsOpened", 0);
    _defineProperty(this, "watcher", Watcher.ROOT);
    _defineProperty(this, "paperTheme", {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: ThemeVariables.INSTANCE.primaryColor
      }
    });
    _defineProperty(this, "lib", preparePatch(() => {
      this.refresh();
    }));
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => SplashScreen.hideAsync(), 10000);
    this.appConfig.app = this;
    this.appConfig.drawer = new DrawerImpl(() => this.refresh());
    AppSpinnerService.setDefaultOptions({
      spinner: this.appConfig.spinner
    });
    let refreshAfterWait = false;
    this.baseUrl = this.appConfig.url;
    let wait = 0;
    this.bindServiceInterceptors();
    this.appConfig.refresh = function () {
      let complete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (complete) {
        _this.reload();
        return;
      }
      if (!wait) {
        RENDER_LOGGER.debug('refreshing the app...');
        wait = MIN_TIME_BETWEEN_REFRESH_CYCLES;
        refreshAfterWait = false;
        setTimeout(() => {
          var _this$commonPartial, _this$appConfig$curre;
          _this.forceUpdate();
          (_this$commonPartial = _this.commonPartial) === null || _this$commonPartial === void 0 ? void 0 : _this$commonPartial.forceUpdate();
          (_this$appConfig$curre = _this.appConfig.currentPage) === null || _this$appConfig$curre === void 0 ? void 0 : _this$appConfig$curre.forceUpdate();
          _this.watcher.check();
        });
        setTimeout(() => {
          wait = 0;
          refreshAfterWait && _this.appConfig.refresh();
        }, wait);
      } else {
        RENDER_LOGGER.debug('will refresh the app in the next cycle.');
        refreshAfterWait = true;
      }
    };
  }
  subscribe(event, fn) {
    return this.eventNotifier.subscribe(event, fn);
  }
  notify(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return this.eventNotifier.notify(event, args);
  }
  get activePage() {
    return this.appConfig.currentPage;
  }
  get Widgets() {
    var _this$commonPartial2;
    return (_this$commonPartial2 = this.commonPartial) === null || _this$commonPartial2 === void 0 ? void 0 : _this$commonPartial2.Widgets;
  }
  goToPage(pageName, params) {
    var _this$appConfig$curre2;
    return (_this$appConfig$curre2 = this.appConfig.currentPage) === null || _this$appConfig$curre2 === void 0 ? void 0 : _this$appConfig$curre2.goToPage(pageName, params);
  }
  goBack(pageName, params) {
    var _this$appConfig$curre3;
    return (_this$appConfig$curre3 = this.appConfig.currentPage) === null || _this$appConfig$curre3 === void 0 ? void 0 : _this$appConfig$curre3.goBack(pageName, params);
  }
  openUrl(url, params) {
    var _this$appConfig$curre4;
    return (_this$appConfig$curre4 = this.appConfig.currentPage) === null || _this$appConfig$curre4 === void 0 ? void 0 : _this$appConfig$curre4.openUrl(url, params);
  }
  onBeforeServiceCall(config) {
    //DO NOT WRITE CODE HERE:
    //This is a placeholder for the WaveMaker developer.
    return config;
  }
  isSkeletonEnabled() {
    return this.appConfig.spinner.loader == "skeleton";
  }
  onServiceSuccess(data, response) {
    //DO NOT WRITE CODE HERE:
    //This is a placeholder for the WaveMaker developer.
  }
  onServiceError(errorMsg, error) {
    //DO NOT WRITE CODE HERE:
    //This is a placeholder for the WaveMaker developer.
  }
  invokeNativeApi(key, data) {
    if (NativeModulesProxy.EmbedCommModule && (Platform.OS === 'android' || Platform.OS === 'ios')) {
      return NativeModulesProxy.EmbedCommModule.sendToNative(key, data || {});
    } else {
      return Promise.reject('Not able to invoke Native API in this platform.');
    }
  }
  onPageReady(activePageName, activePageScope) {}
  setTimezone(timezone) {
    AppI18nService.setTimezone(timezone);
  }
  get spinner() {
    return AppSpinnerService;
  }
  openBrowser(url) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (url) {
      if (isWebPreviewMode()) {
        window.open(url, '_blank');
      } else if (url.startsWith('http') && params.target === '_blank') {
        WebBrowser.openBrowserAsync(url);
      } else {
        return Linking.openURL(url);
      }
    }
    return Promise.resolve();
  }

  // To support old api
  reload() {}
  bindServiceInterceptors() {
    this.axiosInterceptorIds = [axios.interceptors.request.use(config => {
      const url = config.url;
      if (!(url.startsWith('http://') || url.startsWith("https://"))) {
        config.url = this.appConfig.url + '/' + url;
      }
      config.headers = config.headers || {};
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      console.log('onBeforeService call invoked on ' + config.url);
      return this.onBeforeServiceCall(config);
    }), axios.interceptors.response.use(response => {
      this.onServiceSuccess(response.data, response);
      return response;
    }, error => {
      var _errorDetails, _errorDetails2, _error$response, _error$response2, _error$response3, _error$response4;
      let errorDetails = error.response,
        errMsg;
      errorDetails = getValidJSON((_errorDetails = errorDetails) === null || _errorDetails === void 0 ? void 0 : _errorDetails.data) || ((_errorDetails2 = errorDetails) === null || _errorDetails2 === void 0 ? void 0 : _errorDetails2.data);
      if (errorDetails && errorDetails.errors) {
        errMsg = parseErrors(errorDetails.errors) || "Service Call Failed";
      } else {
        errMsg = error.message || "Service Call Failed";
      }
      error.message = errMsg;
      console.error(`Error ${errMsg} recieved from ${(_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.config) === null || _error$response === void 0 ? void 0 : _error$response.url}`);
      this.onServiceError(error.message, error);
      if ((_error$response2 = error.response) !== null && _error$response2 !== void 0 && (_error$response2 = _error$response2.config.url) !== null && _error$response2 !== void 0 && _error$response2.startsWith(this.appConfig.url) && !((_error$response3 = error.response) !== null && _error$response3 !== void 0 && (_error$response3 = _error$response3.config.url) !== null && _error$response3 !== void 0 && _error$response3.includes('/services/')) && ((_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.status) === 401) {
        var _this$appConfig$curre5, _this$appConfig$curre6;
        ((_this$appConfig$curre5 = this.appConfig.currentPage) === null || _this$appConfig$curre5 === void 0 ? void 0 : _this$appConfig$curre5.pageName) !== 'Login' && ((_this$appConfig$curre6 = this.appConfig.currentPage) === null || _this$appConfig$curre6 === void 0 ? void 0 : _this$appConfig$curre6.goToPage('Login'));
      }
      return Promise.reject(error);
    })];
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
  triggerStartUpVariables() {
    return Promise.all(this.startUpVariables.map(s => this.Variables[s] && this.Variables[s].invoke())).catch(() => {});
  }
  componentDidMount() {
    AppSpinnerService.show({
      spinner: this.appConfig.spinner
    });
    this.triggerStartUpVariables().then(() => {
      this.onAppVariablesReady();
      this.isStarted = true;
      this.forceUpdate();
    }, () => {}).then(() => {
      SplashScreen.hideAsync().then(() => {});
    });
    this.startUpActions.map(a => this.Actions[a] && this.Actions[a].invoke());
  }
  componentWillUnmount() {
    this.axiosInterceptorIds.map(id => {
      axios.interceptors.request.eject(id);
    });
    this.cleanup.forEach(fn => fn());
  }
  refresh() {
    this.appConfig.refresh();
  }
  getProviders(content) {
    return /*#__PURE__*/React.createElement(NavigationServiceProvider, {
      value: this
    }, /*#__PURE__*/React.createElement(ToastProvider, {
      value: AppToastService
    }, /*#__PURE__*/React.createElement(PartialProvider, {
      value: AppPartialService
    }, /*#__PURE__*/React.createElement(SecurityProvider, {
      value: AppSecurityService
    }, /*#__PURE__*/React.createElement(CameraProvider, {
      value: CameraService
    }, /*#__PURE__*/React.createElement(ScanProvider, {
      value: ScanService
    }, /*#__PURE__*/React.createElement(ModalProvider, {
      value: AppModalService
    }, content)))))));
  }
  renderToasters() {
    this.toastsOpened = AppToastService.toastsOpened.length;
    return /*#__PURE__*/React.createElement(WmMemo, {
      watcher: this.watcher,
      render: watch => {
        watch(() => AppToastService.refreshCount);
        return /*#__PURE__*/React.createElement(React.Fragment, null, AppToastService.toastsOpened.map((o, i) => {
          return this.getProviders( /*#__PURE__*/React.createElement(ThemeProvider, {
            value: this.appConfig.theme
          }, /*#__PURE__*/React.createElement(View, {
            key: i,
            style: [{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              elevation: o.elevationIndex,
              zIndex: o.elevationIndex
            }, o.styles]
          }, /*#__PURE__*/React.createElement(TouchableOpacity, {
            onPress: () => o.onClick && o.onClick()
          }, o.content, o.text && /*#__PURE__*/React.createElement(WmMessage, {
            name: "message" + i,
            type: o.type,
            caption: o.text,
            hideclose: true
          })))));
        }));
      }
    });
  }
  renderDialogs() {
    return /*#__PURE__*/React.createElement(WmMemo, {
      watcher: this.watcher,
      render: watch => {
        watch(() => {
          var _last;
          return (_last = last(AppModalService.modalsOpened)) === null || _last === void 0 ? void 0 : _last.content;
        });
        this.modalsOpened = AppModalService.modalsOpened.length;
        AppModalService.animatedRefs.length = 0;
        return /*#__PURE__*/React.createElement(React.Fragment, null, AppModalService.modalOptions.content && AppModalService.modalsOpened.map((o, i) => {
          return /*#__PURE__*/React.createElement(View, {
            key: (o.name || '') + i,
            onStartShouldSetResponder: () => true,
            onResponderEnd: () => o.isModal && AppModalService.hideModal(o),
            style: deepCopy(styles.appModal, o.centered ? styles.centeredModal : null, o.modalStyle, {
              elevation: o.elevationIndex,
              zIndex: o.elevationIndex
            })
          }, /*#__PURE__*/React.createElement(Animatedview, {
            entryanimation: o.animation || 'fadeIn',
            ref: ref => {
              this.animatedRef = ref;
              AppModalService.animatedRefs[i] = ref;
            },
            style: [styles.appModalContent, o.contentStyle]
          }, /*#__PURE__*/React.createElement(View, {
            onStartShouldSetResponder: evt => true,
            onResponderEnd: e => e.stopPropagation(),
            style: {
              width: '100%',
              'alignItems': 'center'
            }
          }, this.getProviders(o.content))));
        }));
      }
    });
  }
  renderDisplayManager() {
    return /*#__PURE__*/React.createElement(WmMemo, {
      watcher: this.watcher,
      render: watch => {
        watch(() => AppDisplayManagerService.displayOptions.content);
        return AppDisplayManagerService.displayOptions.content ? /*#__PURE__*/React.createElement(ThemeProvider, {
          value: this.appConfig.theme
        }, /*#__PURE__*/React.createElement(View, {
          style: [styles.displayViewContainer, {
            elevation: this.toastsOpened + this.modalsOpened + 1,
            zIndex: this.toastsOpened + this.modalsOpened + 1
          }]
        }, AppDisplayManagerService.displayOptions.content)) : null;
      }
    });
  }
  renderIconsViewSupportForWeb() {
    try {
      return /*#__PURE__*/React.createElement("style", {
        type: "text/css"
      }, `
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${MaterialCommunityIconsFont}) format('truetype');
        }
      `);
    } catch (e) {
      console.log('require react-native-vector-icons could not be loaded.');
    }
    return null;
  }
  getSelectedLocale() {
    return this.appConfig.selectedLocale;
  }
  getDependency(serviceName) {
    const service = get(SUPPORTED_SERVICES, serviceName);
    if (service) {
      return service;
    }
  }
  renderApp(commonPartial) {
    var _this2 = this;
    this.autoUpdateVariables.forEach(value => {
      var _this$Variables$value;
      return (_this$Variables$value = this.Variables[value]) === null || _this$Variables$value === void 0 ? void 0 : _this$Variables$value.invokeOnParamChange();
    });
    return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(PaperProvider, {
      theme: this.paperTheme
    }, /*#__PURE__*/React.createElement(React.Fragment, null, Platform.OS === 'web' ? this.renderIconsViewSupportForWeb() : null, /*#__PURE__*/React.createElement(SafeAreaInsetsContext.Consumer, null, function () {
      var _this2$props, _this2$appConfig$draw, _this2$appConfig$draw2;
      let insets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
      return _this2.getProviders( /*#__PURE__*/React.createElement(SafeAreaView, {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(FixedViewContainer, null, /*#__PURE__*/React.createElement(ThemeProvider, {
        value: _this2.appConfig.theme
      }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
        behavior: Platform.OS === "ios" ? "padding" : undefined,
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.container
      }, /*#__PURE__*/React.createElement(AppNavigator, {
        app: _this2,
        landingPage: _this2.props.pageName,
        landingPageParams: ((_this2$props = _this2.props) === null || _this2$props === void 0 ? void 0 : _this2$props.pageName) && _this2.props,
        hideDrawer: ((_this2$appConfig$draw = _this2.appConfig.drawer) === null || _this2$appConfig$draw === void 0 ? void 0 : _this2$appConfig$draw.getContent()) === null,
        drawerContent: () => _this2.appConfig.drawer ? _this2.getProviders(_this2.appConfig.drawer.getContent()) : null,
        drawerAnimation: (_this2$appConfig$draw2 = _this2.appConfig.drawer) === null || _this2$appConfig$draw2 === void 0 ? void 0 : _this2$appConfig$draw2.getAnimation()
      }), commonPartial, _this2.renderToasters(), _this2.renderDialogs(), _this2.renderDisplayManager())), _this2.appConfig.url ? /*#__PURE__*/React.createElement(WmNetworkInfoToaster, {
        appLocale: _this2.appConfig.appLocale
      }) : null))));
    }))));
  }
}
const styles = {
  container: {
    flex: 1
  },
  appModal: {
    position: 'absolute',
    width: '100%'
  },
  appModalContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  centeredModal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%'
  },
  displayViewContainer: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};
//# sourceMappingURL=App.js.map
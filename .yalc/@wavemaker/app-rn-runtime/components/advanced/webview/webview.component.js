function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { BackHandler, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { HideMode } from '@wavemaker/app-rn-runtime/core/if.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmWebviewProps from './webview.props';
import { DEFAULT_CLASS } from './webview.styles';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
class WmWebViewState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "currentTarget", {
      title: '',
      src: ''
    });
  }
}
export default class WmWebview extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmWebviewProps());
    _defineProperty(this, "webview", null);
    _defineProperty(this, "webViewState", null);
    _defineProperty(this, "invokeJSCallbacks", {});
    _defineProperty(this, "handleBackButtonPress", () => {
      if (this.webview && this.webViewState && this.webViewState.canGoBack) {
        this.webview.goBack();
        return true;
      }
      return false;
    });
    _defineProperty(this, "onMessage", event => {
      var _event$nativeEvent;
      const data = (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 ? void 0 : _event$nativeEvent.data;
      if (data && data.startsWith('afterInjectJavaScript')) {
        const id = data === null || data === void 0 ? void 0 : data.match(/\:([0-9]+)\:/);
        const callback = id && this.invokeJSCallbacks[id[1]];
        const result = data.substring(data.indexOf(':', data.indexOf(':') + 1) + 1);
        callback && callback(this.parseResult(result));
      } else {
        this.invokeEventCallback('onMessage', [event, this]);
      }
    });
    this.hideMode = HideMode.DONOT_ADD_TO_DOM;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
  }
  get title() {
    var _this$state$currentTa;
    return (_this$state$currentTa = this.state.currentTarget) === null || _this$state$currentTa === void 0 ? void 0 : _this$state$currentTa.title;
  }
  get currentsrc() {
    var _this$state$currentTa2;
    return (_this$state$currentTa2 = this.state.currentTarget) === null || _this$state$currentTa2 === void 0 ? void 0 : _this$state$currentTa2.src;
  }
  executeScript(fn) {
    return new Promise((resolve, reject) => {
      if (this.webview) {
        const id = '' + Date.now();
        this.invokeJSCallbacks[id] = resolve;
        fn = `
         (function(){
          try{
            return (${fn});
          } catch(e) {
            return e.getMessage();
          }
         }())
        `;
        this.webview.injectJavaScript(`window.ReactNativeWebView.postMessage('afterInjectJavaScript:' + ${id} + ':' + JSON.stringify(${fn}))`);
      } else {
        reject();
      }
    });
  }
  insertCSS() {
    let style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    style = style.replace(/[\n\t\r]/g, '');
    return this.executeScript(`
    function() {
      const style = document.createElement('style');
      style.innerHTML = '${style}';
      document.head.appendChild(style);
      return 'SUCCESS';
    }()
    `);
  }
  parseResult(result) {
    try {
      return JSON.parse(result);
    } catch (e) {
      if (result === 'undefined' || result === 'null') {
        return null;
      }
      return result;
    }
  }
  getTitle(iframe) {
    try {
      return iframe.currentTarget.contentWindow.document.title;
    } catch (e) {
      // browser blocks cross origin access to iframe content.
    }
  }
  onLoad(e, title, src) {
    this.updateState({
      currentTarget: {
        title: title,
        src: src
      }
    }, () => {
      this.invokeEventCallback('onLoad', [e, this]);
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, Platform.OS === 'web' ? /*#__PURE__*/React.createElement("iframe", {
      src: props.src,
      width: '100%',
      height: '100%',
      onLoad: e => this.onLoad(e, this.getTitle(e.currentTarget), e.currentTarget.src)
    }) : /*#__PURE__*/React.createElement(WebView, _extends({
      ref: ref => this.webview = ref,
      nestedScrollEnabled: true,
      style: this.styles.webview,
      source: {
        uri: props.src
      },
      testID: this.getTestId('web_view')
    }, getAccessibilityProps(AccessibilityWidgetType.WEBVIEW, props), {
      incognito: props.incognito,
      onMessage: this.onMessage,
      sharedCookiesEnabled: true,
      onNavigationStateChange: state => {
        this.webViewState = state;
      },
      scrollEnabled: true,
      onLoadEnd: e => this.onLoad(e, e.nativeEvent.title, e.nativeEvent.url)
    })));
  }
}
//# sourceMappingURL=webview.component.js.map
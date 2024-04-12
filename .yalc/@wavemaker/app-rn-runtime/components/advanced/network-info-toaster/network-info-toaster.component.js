function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NetworkService from '@wavemaker/app-rn-runtime/core/network.service';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { ToastConsumer } from '@wavemaker/app-rn-runtime/core/toast.service';
import WmNetworkInfoToasterProps from './network-info-toaster.props';
import { DEFAULT_CLASS } from './network-info-toaster.styles';
import { isEqual } from 'lodash-es';
export class WmNetworkInfoToasterState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "newtworkState", {});
    _defineProperty(this, "showToast", false);
  }
}
export default class WmNetworkInfoToaster extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmNetworkInfoToasterProps(), new WmNetworkInfoToasterState());
    _defineProperty(this, "options", {});
    _defineProperty(this, "_close", null);
    this.updateState({
      newtworkState: NetworkService.getState(),
      showToast: !NetworkService.isConnected()
    });
    this.cleanup.push(NetworkService.notifier.subscribe('onNetworkStateChange', networkState => {
      if (!isEqual(networkState, this.state.newtworkState)) {
        this.updateState({
          newtworkState: networkState,
          showToast: true
        });
      }
    }));
  }
  getToastContent() {
    if (this.state.newtworkState.isConnected) {
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('msg'), {
        style: this.styles.text
      }), this.props.appLocale.messages.MESSAGE_SERVICE_CONNECTED), /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('close'), {
        style: this.styles.action,
        onPress: () => this._close()
      }), /*#__PURE__*/React.createElement(Text, {
        style: this.styles.actionText
      }, this.props.appLocale.messages.LABEL_HIDE_NETWORK_INFO)));
    }
    if (this.state.newtworkState.isConnecting) {
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('msg'), {
        style: this.styles.text
      }), this.props.appLocale.messages.MESSAGE_SERVICE_CONNECTING));
    }
    if (this.state.newtworkState.isServiceAvailable) {
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('msg'), {
        style: this.styles.text
      }), this.props.appLocale.messages.MESSAGE_SERVICE_AVAILABLE), /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('close'), {
        style: this.styles.action,
        onPress: () => this._close()
      }), /*#__PURE__*/React.createElement(Text, {
        style: this.styles.actionText
      }, this.props.appLocale.messages.LABEL_HIDE_NETWORK_INFO)), /*#__PURE__*/React.createElement(Text, {
        style: this.styles.actionSeparator
      }, "|"), /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('connect'), {
        style: this.styles.action
      }), /*#__PURE__*/React.createElement(Text, {
        style: this.styles.actionText
      }, this.props.appLocale.messages.LABEL_CONNECT_TO_SERVICE)));
    }
    if (!this.state.newtworkState.isNetworkAvailable) {
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('msg'), {
        style: this.styles.text
      }), this.props.appLocale.messages.MESSAGE_NETWORK_NOT_AVAILABLE), /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('close'), {
        style: this.styles.action,
        onPress: () => this._close()
      }), /*#__PURE__*/React.createElement(Text, {
        style: this.styles.actionText
      }, this.props.appLocale.messages.LABEL_HIDE_NETWORK_INFO)));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('msg'), {
      style: this.styles.text
    }), this.props.appLocale.messages.MESSAGE_SERVICE_NOT_AVAILABLE), /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('close'), {
      style: this.styles.action,
      onPress: () => this._close()
    }), /*#__PURE__*/React.createElement(Text, {
      style: this.styles.actionText
    }, this.props.appLocale.messages.LABEL_HIDE_NETWORK_INFO)));
  }
  renderWidget(props) {
    this.options.content = this.getToastContent();
    this.options.onClose = () => {
      this._close = null;
      this.updateState({
        showToast: false
      });
    };
    return this.options.content && this.state.showToast ? /*#__PURE__*/React.createElement(ToastConsumer, null, toastService => {
      this._close = () => toastService.hideToast(this.options);
      toastService.showToast(this.options);
      return null;
    }) : null;
  }
}
//# sourceMappingURL=network-info-toaster.component.js.map
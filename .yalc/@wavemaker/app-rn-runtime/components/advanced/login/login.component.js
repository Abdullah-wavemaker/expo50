function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLoginProps from './login.props';
import { DEFAULT_CLASS } from './login.styles';
export class WmLoginState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "errorMsg", '');
  }
}
export default class WmLogin extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLoginProps());
  }
  onLoginSuccess(response) {}
  onLoginError(error) {
    this.updateState({
      errorMsg: error === null || error === void 0 ? void 0 : error.message
    });
  }
  doLogin(formData) {
    this.props.onLogin(formData, this.onLoginSuccess.bind(this), this.onLoginError.bind(this));
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, this.state.errorMsg && /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('error'), {
      style: this.styles.errorMsgStyles
    }), this.state.errorMsg), /*#__PURE__*/React.createElement(View, {
      style: this.styles.formStyles
    }, props.children));
  }
}
//# sourceMappingURL=login.component.js.map
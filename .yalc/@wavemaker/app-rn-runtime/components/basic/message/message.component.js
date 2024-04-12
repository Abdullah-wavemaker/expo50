function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmMessageProps from './message.props';
import { DEFAULT_CLASS } from './message.styles';
import WmIcon from '../icon/icon.component';
import WmButton from '../button/button.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmMessageState extends BaseComponentState {}
const MESSAGE_ICONS = {
  'success': 'wm-sl-l sl-check',
  'warning': 'wm-sl-l sl-alarm-bell',
  'error': 'fa fa-times-circle',
  'info': 'wi wi-info',
  'loading': 'fa fa-spinner fa-spin'
};
const DEFAULT_TITLE = {
  'success': 'Success',
  'warning': 'Warning',
  'error': 'Error',
  'info': 'Info',
  'loading': 'Processing'
};
export default class WmMessage extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmMessageProps());
    _defineProperty(this, "close", () => {
      this.updateState({
        props: {
          show: false
        }
      }, () => this.invokeEventCallback('onClose', [null, this]));
    });
  }
  showMessage() {
    this.updateState({
      props: {
        show: true
      }
    });
  }
  hideMessage() {
    this.updateState({
      props: {
        show: false
      }
    });
  }
  renderWidget(props) {
    const styles = this.theme.mergeStyle(this.theme.getStyle(`${props.type}-${props.variant}-message`), this.styles);
    return /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: styles.root
    }, this._background, /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon'),
      iconclass: props.type && MESSAGE_ICONS[props.type],
      styles: styles.icon
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.message
    }, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('title'), {
      style: styles.title
    }, getAccessibilityProps(AccessibilityWidgetType.MESSAGE, props)), props.title || DEFAULT_TITLE[props.type || '']), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('caption'), {
      style: styles.text
    }, getAccessibilityProps(AccessibilityWidgetType.MESSAGE, props)), props.caption)), props.hideclose ? null : /*#__PURE__*/React.createElement(WmButton, {
      id: this.getTestId('close'),
      iconclass: "wi wi-close",
      styles: styles.closeBtn,
      onTap: this.close
    }));
  }
}
//# sourceMappingURL=message.component.js.map
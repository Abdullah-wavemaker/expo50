function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Platform } from 'react-native';
import { isNull } from 'lodash';
import WmNumberProps from './number.props';
import { DEFAULT_CLASS } from './number.styles';
import { WMTextInput } from '@wavemaker/app-rn-runtime/core/components/textinput.component';
import { BaseNumberComponent, BaseNumberState } from '@wavemaker/app-rn-runtime/components/input/basenumber/basenumber.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmNumberState extends BaseNumberState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "keyboardType", void 0);
  }
}
export default class WmNumber extends BaseNumberComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmNumberProps(), new WmNumberState());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-number-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    var _this$state$textValue;
    let opts = {};
    const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
    opts[valueExpr] = ((_this$state$textValue = this.state.textValue) === null || _this$state$textValue === void 0 ? void 0 : _this$state$textValue.toString()) || '';
    return /*#__PURE__*/React.createElement(WMTextInput, _extends({}, this.getTestPropsForInput(), getAccessibilityProps(AccessibilityWidgetType.NUMBER, props), {
      ref: ref => {
        this.widgetRef = ref;
        // @ts-ignore
        if (ref && !isNull(ref.selectionStart) && !isNull(ref.selectionEnd)) {
          // @ts-ignore
          ref.selectionStart = ref.selectionEnd = this.cursor;
        }
      }
    }, opts, {
      floatingLabel: props.floatinglabel,
      floatingLabelStyle: this.styles.floatingLabel,
      activeFloatingLabelStyle: this.styles.activeFloatingLabel,
      style: [this.styles.root, this.state.isValid ? {} : this.styles.invalid],
      keyboardType: "numeric",
      placeholderTextColor: this.styles.placeholderText.color,
      autoFocus: props.autofocus,
      editable: props.disabled || props.readonly ? false : true,
      placeholder: props.placeholder,
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onKeyPress: this.validateInputEntry.bind(this),
      onChangeText: text => {
        this.onChangeText.bind(this)(text, 'number');
      },
      onChange: this.invokeChange.bind(this),
      allowContentSelection: this.styles.text.userSelect === 'text'
    }));
  }
}
//# sourceMappingURL=number.component.js.map
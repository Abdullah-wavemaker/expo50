function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Platform } from 'react-native';
import WmTextProps from './text.props';
import { DEFAULT_CLASS } from './text.styles';
import { WMTextInput } from '@wavemaker/app-rn-runtime/core/components/textinput.component';
import { BaseInputComponent, BaseInputState } from "@wavemaker/app-rn-runtime/components/input/baseinput/baseinput.component";
import { isNull } from 'lodash';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmTextState extends BaseInputState {}
export default class WmText extends BaseInputComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTextProps(), new WmTextState());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-text-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    var _this$state$textValue;
    let opts = {};
    const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
    opts[valueExpr] = ((_this$state$textValue = this.state.textValue) === null || _this$state$textValue === void 0 ? void 0 : _this$state$textValue.toString()) || '';
    return /*#__PURE__*/React.createElement(WMTextInput, _extends({}, this.getTestPropsForInput(), getAccessibilityProps(AccessibilityWidgetType.TEXT, props), {
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
      placeholderTextColor: this.styles.placeholderText.color,
      style: [this.styles.root, this.styles.text, this.state.isValid ? {} : this.styles.invalid],
      keyboardType: this.state.keyboardType,
      autoComplete: props.autocomplete ? 'username' : 'off',
      autoFocus: props.autofocus,
      editable: props.disabled || props.readonly ? false : true,
      secureTextEntry: props.type === 'password' && !props.maskchar ? true : false,
      displayformat: props.displayformat,
      maskchar: props.maskchar,
      maxLength: props.maxchars,
      placeholder: props.placeholder,
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onKeyPress: this.onKeyPress.bind(this),
      onChangeText: this.onChangeText.bind(this),
      onChange: this.invokeChange.bind(this),
      allowContentSelection: this.styles.text.userSelect === 'text'
    }));
  }
}
//# sourceMappingURL=text.component.js.map
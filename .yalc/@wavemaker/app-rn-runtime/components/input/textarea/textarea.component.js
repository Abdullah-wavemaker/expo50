function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Platform } from 'react-native';
import WmTextareaProps from './textarea.props';
import { DEFAULT_CLASS } from './textarea.styles';
import { BaseInputComponent, BaseInputState } from '@wavemaker/app-rn-runtime/components/input/baseinput/baseinput.component';
import { WMTextInput } from '@wavemaker/app-rn-runtime/core/components/textinput.component';
import { isNull } from 'lodash';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmTextareaState extends BaseInputState {}
export default class WmTextarea extends BaseInputComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTextareaProps(), new WmTextareaState());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-textarea-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    var _this$state$textValue;
    let opts = {};
    const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
    opts[valueExpr] = ((_this$state$textValue = this.state.textValue) === null || _this$state$textValue === void 0 ? void 0 : _this$state$textValue.toString()) || '';
    return /*#__PURE__*/React.createElement(WMTextInput, _extends({}, this.getTestPropsForInput(), getAccessibilityProps(AccessibilityWidgetType.TEXTAREA, props), {
      ref: ref => {
        this.widgetRef = ref;
        // @ts-ignore
        if (ref && !isNull(ref.selectionStart) && !isNull(ref.selectionEnd)) {
          // @ts-ignore
          ref.selectionStart = ref.selectionEnd = this.cursor;
        }
      },
      placeholderTextColor: this.styles.placeholderText.color,
      style: [this.styles.root, this.styles.text, this.state.isValid ? {} : this.styles.invalid],
      multiline: true,
      numberOfLines: 4,
      keyboardType: this.state.keyboardType
    }, opts, {
      floatingLabel: props.floatinglabel,
      floatingLabelStyle: this.styles.floatingLabel,
      activeFloatingLabelStyle: this.styles.activeFloatingLabel,
      autoComplete: props.autocomplete ? 'username' : 'off',
      autoFocus: props.autofocus,
      editable: props.disabled || props.readonly ? false : true,
      maxLength: props.maxchars,
      placeholder: props.placeholder || 'Place your text',
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onKeyPress: this.onKeyPress.bind(this),
      onChangeText: this.onChangeText.bind(this),
      onChange: this.invokeChange.bind(this),
      allowContentSelection: this.styles.text.userSelect === 'text'
    }));
  }
}
//# sourceMappingURL=textarea.component.js.map
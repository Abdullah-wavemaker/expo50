function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text, Platform } from 'react-native';
import WmCurrencyProps from './currency.props';
import { CURRENCY_INFO } from '@wavemaker/app-rn-runtime/core/currency-constants';
import { WMTextInput } from '@wavemaker/app-rn-runtime/core/components/textinput.component';
import { DEFAULT_CLASS } from './currency.styles';
import { BaseNumberComponent, BaseNumberState } from '@wavemaker/app-rn-runtime/components/input/basenumber/basenumber.component';
import { isNull } from "lodash";
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmCurrencyState extends BaseNumberState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "currencySymbol", void 0);
  }
}
export default class WmCurrency extends BaseNumberComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCurrencyProps(), new WmCurrencyState());
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'currency':
        if ($new) {
          this.updateState({
            currencySymbol: CURRENCY_INFO[$new].symbol
          });
        }
        break;
    }
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-currency-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    var _this$state$textValue;
    let opts = {};
    const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
    opts[valueExpr] = ((_this$state$textValue = this.state.textValue) === null || _this$state$textValue === void 0 ? void 0 : _this$state$textValue.toString()) || '';
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.labelWrapper
    }, /*#__PURE__*/React.createElement(Text, {
      style: this.styles.label
    }, this.state.currencySymbol)), /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(WMTextInput, _extends({}, this.getTestPropsForInput(), getAccessibilityProps(AccessibilityWidgetType.CURRENCY, props), {
      ref: ref => {
        this.widgetRef = ref;
        // @ts-ignore
        if (ref && !isNull(ref.selectionStart) && !isNull(ref.selectionEnd)) {
          // @ts-ignore
          ref.selectionStart = ref.selectionEnd = this.cursor;
        }
      },
      keyboardType: "numeric",
      placeholderTextColor: this.styles.placeholderText.color,
      style: [this.styles.input, this.styles.text, this.state.isValid ? {} : this.styles.invalid]
    }, opts, {
      floatingLabel: props.floatinglabel,
      floatingLabelStyle: this.styles.floatingLabel,
      activeFloatingLabelStyle: this.styles.activeFloatingLabel,
      editable: props.disabled || props.readonly ? false : true,
      placeholder: props.placeholder,
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onKeyPress: this.validateInputEntry.bind(this),
      onChangeText: text => {
        this.onChangeText.bind(this)(text, 'currency');
      },
      onChange: this.invokeChange.bind(this),
      allowContentSelection: this.styles.text.userSelect === 'text'
    }))));
  }
}
//# sourceMappingURL=currency.component.js.map
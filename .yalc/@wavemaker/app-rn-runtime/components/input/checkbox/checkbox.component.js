function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { unStringify, validateField } from '@wavemaker/app-rn-runtime/core/utils';
import WmCheckboxProps from './checkbox.props';
import { DEFAULT_CLASS } from './checkbox.styles';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmCheckboxState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isChecked", false);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "errorType", '');
  }
}
export default class WmCheckbox extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCheckboxProps(), new WmCheckboxState());
  }
  setChecked(dataValue, checkedvalue) {
    const value = unStringify(dataValue) === unStringify(checkedvalue, true);
    this.updateState({
      isChecked: value
    });
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'checkedvalue':
        this.setChecked(this.state.props.datavalue, $new);
        break;
      case 'datavalue':
        this.setChecked($new, this.state.props.checkedvalue);
        break;
    }
  }
  updateDatavalue(value) {
    this.updateState({
      props: {
        datavalue: value
      }
    });
  }
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.updateState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  onPress() {
    if (!this.state.props.readonly) {
      this.invokeEventCallback('onFocus', [null, this.proxy]);
    }
    this.invokeEventCallback('onTap', [null, this.proxy]);
    if (this.state.props.disabled) {
      return;
    }
    const oldValue = this.state.props.datavalue;
    const value = !this.state.isChecked;
    this.validate(value);
    this.updateState({
      isChecked: value
    });
    const dataValue = value === true ? this.state.props.checkedvalue : this.state.props.uncheckedvalue;
    this.updateState({
      props: {
        datavalue: dataValue
      }
    }, () => {
      if (!this.props.onFieldChange) {
        this.invokeEventCallback('onChange', [null, this.proxy, dataValue, oldValue]);
      } else {
        this.props.onFieldChange && this.props.onFieldChange('datavalue', dataValue, oldValue);
      }
      this.invokeEventCallback('onBlur', [null, this.proxy]);
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction(), {
      style: this.styles.root,
      onPress: this.onPress.bind(this)
    }, getAccessibilityProps(AccessibilityWidgetType.CHECKBOX, {
      ...props,
      checked: this.state.isChecked
    }), {
      accessibilityRole: "checkbox",
      accessibilityLabel: `Checkbox for ${props.caption}`
    }), this._background, /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: "wi wi-check",
      styles: this.state.isChecked ? this.styles.checkicon : this.styles.uncheckicon,
      disabled: props.readonly || props.disabled
    }), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel(), {
      style: this.styles.text
    }), props.caption));
  }
}
//# sourceMappingURL=checkbox.component.js.map
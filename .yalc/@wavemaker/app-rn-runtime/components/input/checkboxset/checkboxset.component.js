function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { find, forEach, isEqual, isEmpty } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import WmCheckboxsetProps from './checkboxset.props';
import { DEFAULT_CLASS } from './checkboxset.styles';
import { BaseDatasetComponent, BaseDatasetState } from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmCheckboxsetState extends BaseDatasetState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "template", "");
  }
}
export default class WmCheckboxset extends BaseDatasetComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCheckboxsetProps());
  }
  onPress(item) {
    this.invokeEventCallback('onTap', [null, this.proxy]);
    if (this.state.props.disabled || this.state.props.readonly) {
      return;
    }
    item.selected = !item.selected;
    const selectedValue = [];
    const selectedItem = find(this.state.dataItems, d => isEqual(d.key, item.key));
    const oldValue = this.state.props.datavalue;
    selectedItem.selected = item.selected;
    forEach(this.state.dataItems, item => {
      if (item.selected) {
        selectedValue.push(item.datafield);
      }
    });
    this.validate(selectedValue);
    this.updateState({
      props: {
        datavalue: selectedValue
      }
    }, () => {
      this.computeDisplayValue();
      this.invokeEventCallback('onChange', [undefined, this.proxy, selectedValue, oldValue]);
    });
  }
  renderChild(item, index) {
    const props = this.state.props;
    const displayText = item.displayexp || item.displayfield;
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction(index + ''), {
      style: this.styles.item,
      onPress: this.onPress.bind(this, item),
      key: item.key
    }, getAccessibilityProps(AccessibilityWidgetType.CHECKBOX, {
      ...props,
      checked: item.selected
    }), {
      accessibilityRole: "checkbox",
      accessibilityLabel: `Checkbox for ${displayText}`
    }), /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: "wi wi-check",
      styles: item.selected ? this.styles.checkicon : this.styles.uncheckicon,
      disabled: props.readonly || props.disabled
    }), !isEmpty(this.state.template) && this.props.renderitempartial ? this.props.renderitempartial(item.dataObject, index, this.state.template) : /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel(index + ''), {
      style: this.styles.text
    }), displayText));
  }
  computeDisplayValue() {
    this.updateState({
      props: {
        displayValue: (this.state.dataItems || []).filter(item => item.selected).map(item => item.displayexp || item.displayfield) || ''
      }
    });
  }
  updateDatavalue(value) {
    this.updateState({
      props: {
        datavalue: value
      }
    });
    return Promise.resolve();
  }
  setTemplate(partialName) {
    this.updateState({
      template: partialName
    });
  }
  renderGroupby() {
    const groupedData = this.state.groupedData;
    return /*#__PURE__*/React.createElement(View, null, groupedData && groupedData.length ? groupedData.map((groupObj, index) => {
      return /*#__PURE__*/React.createElement(View, {
        key: groupObj.key
      }, /*#__PURE__*/React.createElement(Text, {
        style: this.styles.groupHeaderTitle
      }, groupObj.key), this.renderCheckboxses(groupObj.data));
    }) : null);
  }
  renderCheckboxses(items) {
    const props = this.state.props;
    return /*#__PURE__*/React.createElement(View, null, items && items.length ? items.map((item, index) => this.renderChild(item, index)) : null);
  }
  renderWidget(props) {
    const items = this.state.dataItems;
    return /*#__PURE__*/React.createElement(ScrollView, {
      style: this.styles.root
    }, /*#__PURE__*/React.createElement(ScrollView, {
      horizontal: true
    }, props.groupby && this.renderGroupby(), !props.groupby && this.renderCheckboxses(items)));
  }
}
//# sourceMappingURL=checkboxset.component.js.map
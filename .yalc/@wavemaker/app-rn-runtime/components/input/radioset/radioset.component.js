function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import WmRadiosetProps from './radioset.props';
import { DEFAULT_CLASS } from './radioset.styles';
import { BaseDatasetComponent, BaseDatasetState } from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { find, isEqual } from 'lodash-es';
import { isEmpty } from 'lodash';
export class WmRadiosetState extends BaseDatasetState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "template", '');
  }
}
export default class WmRadioset extends BaseDatasetComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmRadiosetProps());
  }
  onPress(item) {
    this.invokeEventCallback('onTap', [null, this.proxy]);
    if (this.state.props.disabled || this.state.props.readonly) {
      return;
    }
    item.selected = true;
    let selectedValue = "";
    const selectedItem = find(this.state.dataItems, d => isEqual(d.key, item.key));
    const oldValue = this.state.props.datavalue;
    selectedItem.selected = item.selected;
    selectedValue = selectedItem.selected ? selectedItem.datafield : null;
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
  renderChild(item, index, colWidth) {
    const displayText = item.displayexp || item.displayfield;
    const value = this.state.props.datafield === 'All Fields' ? this.getItemKey(item.datafield) : item.datafield;
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      style: [this.styles.item, item.selected ? this.styles.selectedItem : null, {
        width: colWidth
      }],
      onPress: this.onPress.bind(this, item),
      key: item.key
    }, this.getTestPropsForAction()), /*#__PURE__*/React.createElement(WmIcon, _extends({}, this.getTestProps('' + index), {
      iconclass: "wi wi-fiber-manual-record",
      styles: item.selected ? this.styles.checkedRadio : this.styles.uncheckedRadio,
      disabled: this.state.props.readonly || this.state.props.disabled,
      accessibilitylabel: `Radio button for ${displayText}`
    })), !isEmpty(this.state.template) && this.props.renderitempartial ? this.props.renderitempartial(item.dataObject, index, this.state.template) : /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.radioLabel
    }, this.getTestPropsForLabel('caption')), displayText));
  }
  setTemplate(partialName) {
    this.updateState({
      template: partialName
    });
  }
  renderGroupby() {
    const groupedData = this.state.groupedData;
    return /*#__PURE__*/React.createElement(View, {
      accessibilityRole: "radiogroup"
    }, groupedData && groupedData.length ? groupedData.map((groupObj, index) => {
      return /*#__PURE__*/React.createElement(View, {
        key: groupObj.key
      }, /*#__PURE__*/React.createElement(Text, {
        style: this.styles.groupHeaderTitle
      }, groupObj.key), this.renderRadioButtons(groupObj.data));
    }) : null);
  }
  renderRadioButtons(items) {
    const props = this.state.props;
    const noOfColumns = props.itemsperrow.xs || 1;
    const colWidth = Math.round(100 / noOfColumns) + '%';
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.group
    }, items && items.length ? items.map((item, index) => this.renderChild(item, index, colWidth)) : null);
  }
  renderWidget(props) {
    const items = this.state.dataItems;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, props.groupby && this.renderGroupby(), !props.groupby && this.renderRadioButtons(items));
  }
}
//# sourceMappingURL=radioset.component.js.map
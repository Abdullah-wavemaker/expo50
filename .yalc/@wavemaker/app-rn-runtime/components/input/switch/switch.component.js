function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text, View } from "react-native";
import { isEqual, find } from 'lodash';
import WmSwitchProps from './switch.props';
import { DEFAULT_CLASS } from './switch.styles';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { BaseDatasetComponent, BaseDatasetState } from '../basedataset/basedataset.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmSwitchState extends BaseDatasetState {}
export default class WmSwitch extends BaseDatasetComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmSwitchProps());
  }
  onChange(value) {
    if (!value) {
      return;
    }
    const oldVal = this.state.props.datavalue;
    this.validate(value);
    if (value === oldVal) {
      return;
    }
    if (this.state.props.datafield === 'All Fields') {
      const selectedItem = find(this.state.dataItems, item => isEqual(item.key, value));
      value = selectedItem && selectedItem.dataObject;
    }
    // @ts-ignore
    this.updateState({
      props: {
        datavalue: value
      },
      isDefault: false
    }, () => {
      if (!this.props.invokeEvent) {
        this.invokeEventCallback('onChange', [undefined, this.proxy, value, oldVal]);
      }
    });
  }
  onTap(event, item) {
    const value = this.state.props.datafield === 'All Fields' ? this.getItemKey(item.datafield) : item.datafield;
    this.onChange(value);
    this.invokeEventCallback('onTap', [event, this.proxy]);
  }
  renderChild(item, index) {
    let btnClass = 'button';
    const props = this.state.props;
    if (index === 0) {
      btnClass = 'firstButton';
    } else if (index + 1 === this.state.dataItems.length) {
      btnClass = 'lastButton';
    }
    const displayText = item.displayexp || item.displayfield;
    const isSelected = this.state.props.datafield === 'All Fields' ? isEqual(props.datavalue, item.datafield) : this.state.props.datavalue === item.datafield;
    return /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(index + ''), getAccessibilityProps(AccessibilityWidgetType.SWITCH, {
      ...this.state.props,
      selected: isSelected
    }), {
      onTap: this.state.props.disabled ? undefined : this.onTap.bind(this, null, item),
      styles: [this.styles.button, this.styles[btnClass], isSelected ? this.styles.selectedButton : null],
      key: item.key
    }), this.state.props.iconclass ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon' + index),
      styles: this.styles.loadingIcon,
      iconclass: item.icon,
      caption: displayText
    }) : /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('' + index), {
      style: [this.styles.text, {
        color: isSelected ? this.styles.selectedButton.color : this.styles.button.color
      }]
    }), displayText)));
  }
  renderWidget(props) {
    const items = this.state.dataItems;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, items && items.length ? items.map((item, index) => this.renderChild(item, index)) : null);
  }
}
//# sourceMappingURL=switch.component.js.map
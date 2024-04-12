function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmRatingProps from './rating.props';
import { DEFAULT_CLASS } from './rating.styles';
import { cloneDeep, isArray, isNumber, isString } from 'lodash-es';
export class WmRatingState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "items", null);
    _defineProperty(this, "caption", null);
    _defineProperty(this, "selectedIndex", -1);
    _defineProperty(this, "isDefault", false);
  }
}
export default class WmRating extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmRatingProps());
  }
  get caption() {
    return this.state.caption;
  }
  prepareItems(props) {
    let items = [];
    if (!props.dataset && props.maxvalue) {
      items = Array.from(Array(+props.maxvalue).keys());
      items = items.map(v => v + 1);
    } else if (isString(props.dataset)) {
      items = props.dataset.split(',');
    } else {
      items = props.dataset || [];
    }
    if (isArray(items) && items[0] !== Object(items[0])) {
      items = items.map((v, i) => ({
        key: i + 1,
        value: v
      }));
    }
    let selectedIndex = -1;
    if (props.datavalue !== undefined && props.datavalue !== null) {
      selectedIndex = items.findIndex((item, k) => item[props.datafield] == props.datavalue);
      if (selectedIndex === -1 && isNumber(props.datavalue)) {
        selectedIndex = props.datavalue;
      }
    }
    let caption = '';
    if (selectedIndex > -1 && props.showcaptions) {
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        if (props.getDisplayExpression) {
          caption = props.getDisplayExpression(selectedItem);
        } else {
          caption = selectedItem[props.displayfield];
        }
      } else {
        caption = selectedIndex + 1;
      }
    }
    this.updateState({
      items: items,
      selectedIndex: selectedIndex,
      caption: caption
    });
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'dataset':
      case 'datafield':
      case 'displayfield':
      case 'maxvalue':
      case 'datavalue':
        this.prepareItems(this.state.props);
        if (name === 'datavalue') {
          const isDefault = this.state.isDefault;
          if (isDefault) {
            this.updateState({
              isDefault: false
            }, this.props.onFieldChange && this.props.onFieldChange.bind(this, 'datavalue', $new, $old, isDefault));
          } else {
            this.props.onFieldChange && this.props.onFieldChange('datavalue', $new, $old, isDefault);
          }
        }
        break;
      case 'readonly':
        this.updateState({
          props: {
            disabled: $new
          }
        });
        break;
    }
  }
  changeValue(i) {
    const props = this.state.props;
    const oldValue = props.datavalue;
    if (!props.readonly) {
      let value = this.state.items[i] ? this.state.items[i][props.datafield || ''] : i;
      this.updateState({
        props: {
          datavalue: value
        }
      }, () => {
        !this.props.onFieldChange && value !== oldValue && this.invokeEventCallback('onChange', [undefined, this.proxy, value, oldValue]);
      });
    }
  }
  renderWidget(props) {
    const maxValue = props.maxvalue ? +props.maxvalue : 5;
    const arr = Array.from(Array(maxValue).keys());
    let selectedIconStyles = this.styles.selectedIcon;
    if (props.iconcolor) {
      selectedIconStyles = cloneDeep(this.styles.selectedIcon);
      selectedIconStyles.text.color = props.iconcolor;
    }
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, arr.map((v, i) => this.state.selectedIndex > -1 && i <= this.state.selectedIndex ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('star' + i),
      key: i,
      iconclass: "wi wi-star",
      iconsize: props.iconsize,
      styles: selectedIconStyles,
      onTap: () => {
        this.changeValue(i);
      }
    }) : null), arr.map((v, i) => this.state.selectedIndex === -1 || i > this.state.selectedIndex ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('star' + i),
      key: i,
      iconclass: "wi wi-star-border",
      iconsize: props.iconsize,
      styles: this.styles.icon,
      onTap: () => {
        this.changeValue(i);
      }
    }) : null), !!props.showcaptions ? /*#__PURE__*/React.createElement(Text, {
      style: this.styles.text
    }, this.state.caption) : null);
  }
}
//# sourceMappingURL=rating.component.js.map
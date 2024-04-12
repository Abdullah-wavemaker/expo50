function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmNavItemProps from './navitem.props';
import { DEFAULT_CLASS } from './navitem.styles';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmNavItemState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "collapsed", true);
  }
}
export default class WmNavItem extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmNavItemProps(), new WmNavItemState());
  }
  onSelectItem(cb, $item, $event) {
    cb && cb($event, this, $item === null || $item === void 0 ? void 0 : $item.data);
  }
  renderWidget(props) {
    const getDisplayLabel = this.props.getDisplayExpression || (label => label);
    let child = props.children;
    if (props.view === 'anchor') {
      child = /*#__PURE__*/React.createElement(WmAnchor, _extends({
        id: this.getTestId('navlink')
      }, getAccessibilityProps(AccessibilityWidgetType.NAV, props), {
        styles: this.styles.navAnchorItem,
        caption: getDisplayLabel(props.item.label),
        hyperlink: props.item.link,
        badgevalue: props.item.badge,
        iconclass: props.item.icon,
        onTap: this.onSelectItem.bind(this, props.onSelect, props.item)
      }));
    }
    if (props.view === 'dropdown') {
      child = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
        id: this.getTestId('navlink'),
        onPress: () => {
          this.updateState({
            collapsed: !this.state.collapsed
          });
        }
      }, /*#__PURE__*/React.createElement(View, {
        style: this.styles.dropdownNav
      }, /*#__PURE__*/React.createElement(WmAnchor, _extends({
        id: this.getTestId('navlink'),
        styles: this.styles.navAnchorItem,
        caption: getDisplayLabel(props.item.label),
        iconclass: props.item.icon,
        onTap: this.onSelectItem.bind(this, props.onSelect, props.item)
      }, getAccessibilityProps(AccessibilityWidgetType.NAV, props))), /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('icon'),
        styles: this.styles.caretIcon,
        iconclass: this.state.collapsed ? 'fa fa-sort-down' : 'fa fa-sort-up'
      }))), !this.state.collapsed && props.children);
    }
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, child);
  }
}
//# sourceMappingURL=navitem.component.js.map
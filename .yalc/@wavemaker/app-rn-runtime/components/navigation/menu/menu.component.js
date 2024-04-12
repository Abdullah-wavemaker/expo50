function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import { BaseNavComponent, BaseNavState } from '../basenav/basenav.component';
import WmPopover from '../popover/popover.component';
import WmMenuProps from './menu.props';
import { DEFAULT_CLASS } from './menu.styles';
export class WmMenuState extends BaseNavState {}
const animationMap = {
  slide: 'slideInDown',
  fade: 'fadeIn',
  scale: 'zoomIn'
};
export default class WmMenu extends BaseNavComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmMenuProps(), new WmMenuState());
    _defineProperty(this, "popOverRef", null);
    _defineProperty(this, "listener", {
      onComponentInit: c => {
        if (c instanceof WmPopover) {
          this.popOverRef = c;
        }
      }
    });
  }
  renderMenuItem(item, index) {
    const getDisplayLabel = this.props.getDisplayExpression || (label => label);
    return /*#__PURE__*/React.createElement(WmAnchor, {
      id: this.getTestId('menuitem' + index),
      iconclass: item.icon,
      caption: getDisplayLabel(item.label),
      hyperlink: item.link,
      styles: this.styles.menuItem,
      onTap: () => {
        this.invokeEventCallback('onSelect', [null, this, item]);
        this.popOverRef.hide();
      }
    });
  }
  renderWidget(props) {
    const menuItems = this.state.dataItems;
    return /*#__PURE__*/React.createElement(WmPopover, {
      id: this.getTestId('menu'),
      styles: this.styles,
      contentanimation: animationMap[props.animateitems || 'scale'],
      caption: props.caption,
      iconclass: props.iconclass,
      listener: this.listener,
      popoverheight: this.styles.menu.height || null,
      popoverwidth: this.styles.menu.width || null,
      iconposition: "right",
      type: "dropdown"
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.menu
    }, menuItems.map((item, index) => /*#__PURE__*/React.createElement(View, {
      key: item.key
    }, this.renderMenuItem(item, index)))));
  }
}
//# sourceMappingURL=menu.component.js.map
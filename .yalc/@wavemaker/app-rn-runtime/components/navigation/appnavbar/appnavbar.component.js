function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, BackHandler } from 'react-native';
import { Badge } from 'react-native-paper';
import { isAndroid } from '@wavemaker/app-rn-runtime/core/utils';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmAppNavbarProps from './appnavbar.props';
import { DEFAULT_CLASS } from './appnavbar.styles';
export class WmAppNavbarState extends BaseComponentState {}
export default class WmAppNavbar extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAppNavbarProps());
    _defineProperty(this, "onDrawerBtnPress", void 0);
    _defineProperty(this, "onBackBtnPress", void 0);
    _defineProperty(this, "onSearchBtnPress", void 0);
    this.onDrawerBtnPress = (() => this.invokeEventCallback('onDrawerbuttonpress', [null, this])).bind(this);
    this.onBackBtnPress = (() => this.invokeEventCallback('onBackbtnclick', [null, this])).bind(this);
    this.onSearchBtnPress = (() => this.invokeEventCallback('onSearchbuttonpress', [null, this])).bind(this);
    if (isAndroid()) {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        this.onBackBtnPress();
        return true;
      });
      this.cleanup.push(() => subscription.remove());
    }
  }
  renderWidget(props) {
    //@ts-ignore
    const badge = props.badgevalue != undefined ? /*#__PURE__*/React.createElement(Badge, {
      style: this.styles.badge
    }, props.badgevalue) : null;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(View, {
      style: this.styles.leftSection
    }, props.showDrawerButton && /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('leftnavbtn'),
      styles: this.theme.mergeStyle({}, this.styles.action, this.styles.leftnavIcon),
      iconclass: props.leftnavpaneliconclass,
      onTap: this.onDrawerBtnPress
    }), props.backbutton && /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('backbtn'),
      styles: this.theme.mergeStyle({}, this.styles.action, this.styles.backIcon),
      iconclass: props.backbuttoniconclass,
      caption: props.backbuttonlabel,
      onTap: this.onBackBtnPress
    })), /*#__PURE__*/React.createElement(View, {
      style: this.styles.middleSection
    }, props.imgsrc && /*#__PURE__*/React.createElement(WmPicture, {
      id: this.getTestId('picture'),
      styles: this.styles.image,
      picturesource: props.imgsrc
    }), /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.content
    }, this.getTestPropsForLabel('title')), props.title), badge), /*#__PURE__*/React.createElement(View, {
      style: this.styles.rightSection
    }, props.searchbutton && /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('searchbtn'),
      styles: this.theme.mergeStyle({}, this.styles.action, this.styles.leftnavIcon),
      iconclass: props.searchbuttoniconclass,
      onTap: this.onSearchBtnPress
    }), props.children));
  }
}
//# sourceMappingURL=appnavbar.component.js.map
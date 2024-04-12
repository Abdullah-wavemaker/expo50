function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Animated, Easing, Text, Image, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmIconProps from './icon.props';
import { DEFAULT_CLASS } from './icon.styles';
import WavIcon from './wavicon/wavicon.component';
import StreamlineLightIcon from './streamline-light-icon/streamline-light-icon.component';
import StreamlineRegularIcon from './streamline-regular-icon/streamline-regular-icon.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { createSkeleton } from '../skeleton/skeleton.component';
const ICON_SIZES = new Map([['fa-lg', 24], ['fa-2x', 36], ['fa-3x', 48], ['fa-4x', 60], ['fa-5x', 72]]);
const ICON_ROTATTION = new Map([['fa-rotate-90', '90deg'], ['fa-rotate-180', '180deg'], ['fa-rotate-270', '270deg']]);
export class WmIconState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "iconDef", {});
  }
}
export default class WmIcon extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmIconProps());
    _defineProperty(this, "spinValue", new Animated.Value(0));
    _defineProperty(this, "pulseValue", new Animated.Value(0));
    _defineProperty(this, "stopAnimation", true);
    _defineProperty(this, "_iconSource", null);
  }
  getIconDef(iconClass) {
    const iconDef = {
      rotate: '0'
    };
    const splits = iconClass.split(' ');
    iconDef.isFontAwesome = !!splits.find(v => v === 'fa');
    iconDef.isStreamlineLightIcon = !!splits.find(v => v === 'wm-sl-l');
    iconDef.isStreamlineRegularIcon = !!splits.find(v => v === 'wm-sl-r');
    if (iconDef.isFontAwesome) {
      var _splits$find;
      iconDef.type = ((_splits$find = splits.find(v => v.startsWith('fa-'))) === null || _splits$find === void 0 ? void 0 : _splits$find.substring(3)) || '';
    } else if (iconDef.isStreamlineLightIcon) {
      var _splits$find2;
      iconDef.type = ((_splits$find2 = splits.find(v => v.startsWith('sl-'))) === null || _splits$find2 === void 0 ? void 0 : _splits$find2.substring(3)) || '';
    } else if (iconDef.isStreamlineRegularIcon) {
      var _splits$find3;
      iconDef.type = ((_splits$find3 = splits.find(v => v.startsWith('sl-'))) === null || _splits$find3 === void 0 ? void 0 : _splits$find3.substring(3)) || '';
    } else {
      var _splits$find4;
      iconDef.isWavIcon = !iconDef.isFontAwesome && !!splits.find(v => v === 'wi');
      iconDef.type = iconDef.isWavIcon && ((_splits$find4 = splits.find(v => v.startsWith('wi-'))) === null || _splits$find4 === void 0 ? void 0 : _splits$find4.substring(3)) || '';
    }
    if (iconClass.indexOf('fa-spin') >= 0) {
      iconDef.animation = 'spin';
    } else if (iconClass.indexOf('fa-pulse') >= 0) {
      iconDef.animation = 'pulse';
    }
    iconDef.size = splits.map(v => ICON_SIZES.get(v)).find(v => !!v) || 12;
    iconDef.rotate = splits.map(v => ICON_ROTATTION.get(v)).find(v => !!v) || '0deg';
    return iconDef;
  }
  spin() {
    if (this.stopAnimation) {
      return;
    }
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.spin());
  }
  componentDidMount() {
    super.componentDidMount();
    this.spin();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.stopAnimation = true;
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'iconclass':
        $new && this.updateState({
          iconDef: this.getIconDef($new)
        });
        break;
    }
  }
  getCustomIcon(props, style) {
    var _this$theme$getStyle;
    const customIcon = this.theme.mergeStyle({}, ((_this$theme$getStyle = this.theme.getStyle((props === null || props === void 0 ? void 0 : props.iconclass) || '')) === null || _this$theme$getStyle === void 0 ? void 0 : _this$theme$getStyle.icon) || this.styles.icon);
    const customIconContent = customIcon === null || customIcon === void 0 ? void 0 : customIcon.content;
    if (customIconContent) {
      delete customIcon.content;
      return /*#__PURE__*/React.createElement(Text, {
        style: [style, customIcon.fontFamily ? {
          fontFamily: customIcon.fontFamily
        } : null]
      }, decodeURIComponent(customIconContent));
    }
    return null;
  }
  renderSkeleton(props) {
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      width: this.props.skeletonwidth || this.props.iconsize || this.styles.root.width,
      height: this.props.skeletonheight || this.props.iconsize || this.styles.root.height
    });
  }
  getElementToShow(props, iconSrc) {
    const {
      iconmargin,
      iconheight,
      iconwidth
    } = props;
    let width, height;
    let elementToshow, source;
    if (iconwidth) width = iconwidth;else if (iconheight) width = iconheight;else width = 12;
    if (iconheight) height = iconheight;else if (iconwidth) height = iconwidth;else height = 12;
    if (isFullPathUrl(iconSrc)) {
      source = {
        uri: iconSrc
      };
    } else {
      source = iconSrc;
    }
    elementToshow = /*#__PURE__*/React.createElement(Image, {
      testID: this.getTestId('icon'),
      style: {
        margin: iconmargin ?? 0,
        height: height,
        width: width
      },
      source: source
    });
    return elementToshow;
  }
  loadIcon(iconImage) {
    if (!iconImage || !this.loadAsset) {
      return null;
    }
    const iconImageSrc = this.loadAsset(iconImage);
    if (iconImageSrc && typeof iconImageSrc !== 'function') {
      return iconImageSrc;
    }
    return null;
  }
  renderIcon(props) {
    let iconJsx = null;
    this._iconSource = this._iconSource || this.loadIcon(props.iconurl);
    const iconSrc = this._iconSource;
    if (iconSrc) {
      return this.getElementToShow(props, iconSrc);
    }
    const iconDef = this.state.iconDef;
    if (!iconDef) {
      return null;
    }
    const {
      root,
      text,
      icon
    } = this.styles;
    const style = [{
      color: root.color || text.color
    }, icon, {
      transform: [{
        rotate: iconDef.rotate
      }]
    }];
    const customIcon = this.getCustomIcon(props, style);
    const iconSize = props.iconsize || this.styles.root.fontSize || this.styles.text.fontSize || iconDef.size;
    if (props.show && iconDef && iconDef.isFontAwesome) {
      //@ts-ignore type information is not matching
      iconJsx = /*#__PURE__*/React.createElement(FontAwesome, {
        name: customIcon ? '' : iconDef.type,
        style: style,
        size: iconSize
      }, customIcon);
    } else if (props.show && iconDef) {
      var _this$styles$icon;
      let WMCustomIcon = WavIcon;
      if (iconDef.isStreamlineLightIcon) {
        WMCustomIcon = StreamlineLightIcon;
      } else if (iconDef.isStreamlineRegularIcon) {
        WMCustomIcon = StreamlineRegularIcon;
      } else if (!iconDef.isWavIcon && !customIcon && !((_this$styles$icon = this.styles.icon) !== null && _this$styles$icon !== void 0 && _this$styles$icon.fontFamily)) {
        return null;
      }
      //@ts-ignore type information is not matching
      iconJsx = WMCustomIcon ? /*#__PURE__*/React.createElement(WMCustomIcon, {
        name: customIcon ? '' : iconDef.type,
        style: style,
        size: iconSize
      }, customIcon) : null;
    }
    if (iconJsx && iconDef.animation === 'spin') {
      const rotate = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });
      const animation = {
        transform: [{
          rotate
        }]
      };
      this.stopAnimation = false;
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: animation
      }, iconJsx);
    } else if (iconJsx && iconDef.animation === 'pulse') {
      const opacity = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      });
      const animation = {
        opacity: opacity
      };
      this.stopAnimation = false;
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: animation
      }, iconJsx);
    } else {
      this.stopAnimation = true;
    }
    return /*#__PURE__*/React.createElement(View, getAccessibilityProps(AccessibilityWidgetType.ICON, this.props), iconJsx);
  }
  renderWidget(props) {
    let icon = this.renderIcon(props);
    let iterationCount = props.iterationcount ? props.iterationcount != 'infinite' ? parseInt(props.iterationcount) : 'infinite' : undefined;
    return /*#__PURE__*/React.createElement(Tappable, _extends({
      target: this,
      rippleColor: this.styles.root.rippleColor
    }, this.getTestPropsForAction()), /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: this.styles.root,
      iterationCount: iterationCount
    }, this._background, props.iconposition === 'left' && icon || null, props.caption && /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('caption'), {
      style: this.styles.text
    }), props.caption) || null, props.iconposition === 'right' && icon || null));
  }
}
//# sourceMappingURL=icon.component.js.map
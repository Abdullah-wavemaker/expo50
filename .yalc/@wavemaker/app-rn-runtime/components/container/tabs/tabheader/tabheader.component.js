function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmTabheaderProps from './tabheader.props';
import { DEFAULT_CLASS } from './tabheader.styles';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { createSkeleton } from '@wavemaker/app-rn-runtime/components/basic/skeleton/skeleton.component';
import { BackgroundComponent } from '@wavemaker/app-rn-runtime/styles/background.component';
export class WmTabheaderState extends BaseComponentState {}
export default class WmTabheader extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTabheaderProps(), new WmTabheaderState());
    _defineProperty(this, "headerPanelLayout", null);
    _defineProperty(this, "headersLayout", []);
    _defineProperty(this, "headerScrollPosition", new Animated.Value(0));
    _defineProperty(this, "headerScrollPositionValue", 0);
    _defineProperty(this, "indicatorPosition", new Animated.Value(0));
    _defineProperty(this, "reverseIndicatorWidth", new Animated.Value(0));
    _defineProperty(this, "indicatorWidth", new Animated.Value(0));
    this.headerScrollPosition.addListener(_ref => {
      let {
        value
      } = _ref;
      return this.headerScrollPositionValue = value;
    });
  }
  setHeaderPanelPositon(nativeEvent) {
    this.headerPanelLayout = nativeEvent.nativeEvent.layout;
    this.forceUpdate();
  }
  setHeaderPositon(index, nativeEvent) {
    this.headersLayout[index] = nativeEvent.nativeEvent.layout;
    if (index === this.props.selectedTabIndex) {
      this.forceUpdate();
    }
  }
  onTabSelection(index) {
    if (this.state.props.selectedTabIndex != index) {
      this.state.props.onIndexChange && this.state.props.onIndexChange(index);
    }
  }
  setPosition() {
    var _this$headersLayout$s, _this$headerPanelLayo, _this$headerPanelLayo2;
    const selectedTabIndex = this.state.props.selectedTabIndex;
    let toIndicatorPosition = 0;
    let toIndicatorWidth = ((_this$headersLayout$s = this.headersLayout[selectedTabIndex]) === null || _this$headersLayout$s === void 0 ? void 0 : _this$headersLayout$s.width) || 0;
    let toHeaderScrollPosition = this.headerScrollPositionValue;
    let totalWidth = 0;
    if (this.state.props.data.length !== this.headersLayout.length) {
      return;
    }
    this.headersLayout.forEach((p, i) => {
      if (i < selectedTabIndex) {
        toIndicatorPosition += p.width;
      }
      totalWidth += p.width;
    });
    toHeaderScrollPosition = -1 * (toIndicatorPosition - (((_this$headerPanelLayo = this.headerPanelLayout) === null || _this$headerPanelLayo === void 0 ? void 0 : _this$headerPanelLayo.width) || 0) / 2 + toIndicatorWidth / 2);
    const minScrollPosition = -1 * (totalWidth - (((_this$headerPanelLayo2 = this.headerPanelLayout) === null || _this$headerPanelLayo2 === void 0 ? void 0 : _this$headerPanelLayo2.width) || 0));
    const maxScrollPosition = 0;
    toHeaderScrollPosition = Math.max(minScrollPosition, toHeaderScrollPosition);
    toHeaderScrollPosition = Math.min(maxScrollPosition, toHeaderScrollPosition);
    let positionIndicator = toIndicatorPosition - (100 - toIndicatorWidth) / 2;
    let position = this.isRTL ? -positionIndicator : positionIndicator;
    Animated.parallel([Animated.timing(this.headerScrollPosition, {
      useNativeDriver: true,
      toValue: toHeaderScrollPosition,
      duration: 200,
      easing: Easing.linear
    }), Animated.timing(this.indicatorWidth, {
      useNativeDriver: true,
      toValue: toIndicatorWidth / 100,
      duration: 200,
      easing: Easing.linear
    }), Animated.timing(this.reverseIndicatorWidth, {
      useNativeDriver: true,
      toValue: toIndicatorWidth ? 100 / toIndicatorWidth : 0,
      duration: 200,
      easing: Easing.linear
    }), Animated.timing(this.indicatorPosition, {
      useNativeDriver: true,
      toValue: position,
      duration: 200,
      easing: Easing.linear
    })]).start();
  }
  renderSkeleton(props) {
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        transform: [{
          translateX: this.headerScrollPosition
        }]
      },
      onLayout: this.setHeaderPanelPositon.bind(this)
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this.props.data.map((header, i) => {
      var _this$styles$root, _this$styles$root2, _this$styles$activeHe;
      const isSelected = i === this.props.selectedTabIndex;
      return /*#__PURE__*/React.createElement(Tappable, {
        onTap: this.onTabSelection.bind(this, i),
        key: header.key,
        styles: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(View, {
        onLayout: this.setHeaderPositon.bind(this, i),
        style: [this.styles.header, isSelected ? this.styles.activeHeader : null]
      }, createSkeleton(this.theme, {
        root: {
          borderRadius: 4
        }
      }, {
        ...this.styles.root,
        width: ((_this$styles$root = this.styles.root) === null || _this$styles$root === void 0 ? void 0 : _this$styles$root.width) || "80%",
        height: ((_this$styles$root2 = this.styles.root) === null || _this$styles$root2 === void 0 ? void 0 : _this$styles$root2.height) || ((_this$styles$activeHe = this.styles.activeHeaderText) === null || _this$styles$activeHe === void 0 ? void 0 : _this$styles$activeHe.fontSize) || 16
      })));
    })), /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.activeIndicator, {
        transform: [{
          translateX: this.indicatorPosition
        }, {
          scaleX: this.indicatorWidth
        }]
      }]
    }));
  }
  renderWidget(props) {
    this.setPosition();
    const arrowIndicator = this.styles.arrowIndicator;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        overflow: 'hidden',
        zIndex: 16
      }
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        transform: [{
          translateX: this.headerScrollPosition
        }]
      },
      onLayout: this.setHeaderPanelPositon.bind(this)
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.data.map((header, i) => {
      const isSelected = i === props.selectedTabIndex;
      return /*#__PURE__*/React.createElement(Tappable, _extends({
        onTap: this.onTabSelection.bind(this, i)
      }, this.getTestPropsForAction(i + ''), {
        key: header.key,
        styles: this.styles.header.flexGrow ? {
          flexGrow: this.styles.header.flexGrow
        } : null
      }), /*#__PURE__*/React.createElement(View, {
        onLayout: this.setHeaderPositon.bind(this, i)
      }, /*#__PURE__*/React.createElement(View, {
        style: [this.styles.header, {
          flexGrow: undefined
        }, isSelected ? this.styles.activeHeader : null]
      }, /*#__PURE__*/React.createElement(Text, _extends({
        numberOfLines: 1,
        style: [this.styles.headerText, isSelected ? this.styles.activeHeaderText : null]
      }, this.getTestPropsForLabel(i + '_title')), header.title))));
    })), /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.activeIndicator, {
        transform: [{
          translateX: this.indicatorPosition
        }, {
          scaleX: this.indicatorWidth
        }]
      }]
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [{
        transform: [{
          scaleX: this.reverseIndicatorWidth
        }]
      }, this.styles.arrowIndicator]
    }, arrowIndicator.backgroundImage ? /*#__PURE__*/React.createElement(BackgroundComponent, {
      image: arrowIndicator.backgroundImage,
      position: arrowIndicator.backgroundPosition,
      size: arrowIndicator.backgroundSize,
      repeat: arrowIndicator.backgroundRepeat,
      resizeMode: arrowIndicator.backgroundResizeMode,
      style: {
        borderRadius: this.styles.root.borderRadius
      }
    }) : null, /*#__PURE__*/React.createElement(View, {
      style: this.styles.arrowIndicatorDot
    })))));
  }
}
//# sourceMappingURL=tabheader.component.js.map
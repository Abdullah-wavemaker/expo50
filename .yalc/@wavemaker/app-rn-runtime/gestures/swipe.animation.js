function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isNil } from 'lodash-es';
import React from 'react';
import { Animated, Easing, View as RNView } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import injector from '@wavemaker/app-rn-runtime/core/injector';
export class Handlers {
  constructor() {
    _defineProperty(this, "bounds", null);
    _defineProperty(this, "onAnimation", () => {});
    _defineProperty(this, "onLower", () => {});
    _defineProperty(this, "onUpper", () => {});
    _defineProperty(this, "computePhase", null);
  }
}
export class Props {
  constructor() {
    _defineProperty(this, "threshold", 30);
    _defineProperty(this, "direction", 'horizontal');
    _defineProperty(this, "handlers", {});
    _defineProperty(this, "style", {});
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "enableGestures", void 0);
    _defineProperty(this, "slideWidth", '100%');
    _defineProperty(this, "slideMinWidth", undefined);
  }
}
export class State {
  constructor() {
    _defineProperty(this, "threshold", 30);
    _defineProperty(this, "isHorizontal", false);
    _defineProperty(this, "bounds", {});
    _defineProperty(this, "maxPosition", Number.MAX_VALUE);
  }
}
export class View extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "gesture", Gesture.Pan());
    _defineProperty(this, "position", new Animated.Value(0));
    _defineProperty(this, "animationPhase", new Animated.Value(0));
    _defineProperty(this, "i18nService", injector.I18nService.get());
    _defineProperty(this, "childrenLayout", []);
    _defineProperty(this, "viewLayout", null);
    this.state = {
      isHorizontal: props.direction === 'horizontal',
      threshold: props.threshold || 30,
      bounds: {}
    };
    var touchStart = {
      x: 0,
      y: 0,
      active: false
    };
    this.gesture.maxPointers(1).minDistance(this.state.threshold).enabled(this.props.enableGestures && !isWebPreviewMode()).onTouchesDown((e, s) => {
      touchStart = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        active: false
      };
    }).onTouchesMove((e, s) => {
      if (touchStart.active) {
        return;
      }
      const translationX = e.allTouches[0].x - touchStart.x;
      const translationY = e.allTouches[0].y - touchStart.y;
      const d = this.state.isHorizontal ? translationX : translationY;
      const od = this.state.isHorizontal ? translationY : translationX;
      if (Math.abs(d) >= this.state.threshold && Math.abs(od) < Math.tan(15 * Math.PI / 180) * this.state.threshold) {
        touchStart.active = true;
      }
    }).onChange(e => {
      var _this$props$handlers, _this$props$handlers2;
      if (!touchStart.active) {
        return;
      }
      const bounds = ((_this$props$handlers = this.props.handlers) === null || _this$props$handlers === void 0 ? void 0 : _this$props$handlers.bounds) && ((_this$props$handlers2 = this.props.handlers) === null || _this$props$handlers2 === void 0 ? void 0 : _this$props$handlers2.bounds(e)) || {};
      const d = this.state.isHorizontal ? e.translationX : e.translationY;
      let phase = this.computePhase((bounds === null || bounds === void 0 ? void 0 : bounds.center) || 0);
      if (d && d < 0 && !isNil(bounds.center) && !isNil(bounds.lower) && bounds.center !== bounds.lower) {
        phase += d / (bounds.center - bounds.lower) || 0;
      } else if (d && d > 0 && !isNil(bounds.center) && !isNil(bounds.upper) && bounds.center !== bounds.upper) {
        phase += d / (bounds.upper - bounds.center) || 0;
      }
      this.animationPhase.setValue(phase);
      this.position.setValue((this.isRTL() ? -(bounds === null || bounds === void 0 ? void 0 : bounds.center) : (bounds === null || bounds === void 0 ? void 0 : bounds.center) || 0) + d);
    }).onEnd(e => {
      var _this$props$handlers3, _this$props$handlers4;
      if (!touchStart.active) {
        return;
      }
      touchStart = {
        x: 0,
        y: 0,
        active: false
      };
      ((_this$props$handlers3 = this.props.handlers) === null || _this$props$handlers3 === void 0 ? void 0 : _this$props$handlers3.onAnimation) && ((_this$props$handlers4 = this.props.handlers) === null || _this$props$handlers4 === void 0 ? void 0 : _this$props$handlers4.onAnimation(e));
      if (e.translationX < 0) {
        this.isRTL() ? this.goToLower(e) : this.goToUpper(e);
      } else if (e.translationX > 0) {
        this.isRTL() ? this.goToUpper(e) : this.goToLower(e);
      }
    });
  }
  computeMaxScroll() {
    var _this$viewLayout2;
    let max = Number.MAX_VALUE;
    const childrenWidth = this.childrenLayout.reduce((s, v) => s + v.width, 0);
    const childrenHeight = this.childrenLayout.reduce((s, v) => s + v.height, 0);
    if (this.props.direction === 'horizontal') {
      var _this$viewLayout;
      if (childrenWidth && (_this$viewLayout = this.viewLayout) !== null && _this$viewLayout !== void 0 && _this$viewLayout.width) {
        max = childrenWidth - this.viewLayout.width;
      }
    } else if (childrenHeight && (_this$viewLayout2 = this.viewLayout) !== null && _this$viewLayout2 !== void 0 && _this$viewLayout2.height) {
      max = childrenHeight - this.viewLayout.height;
    }
    this.setState({
      maxPosition: -1 * max
    });
  }
  setChildrenLayout(event, index) {
    this.childrenLayout[index] = event.nativeEvent.layout;
    this.computeMaxScroll();
  }
  setViewLayout(event) {
    this.viewLayout = event.nativeEvent.layout;
    this.computeMaxScroll();
  }
  computePhase(value) {
    var _this$props$handlers5, _this$props$handlers6;
    return ((_this$props$handlers5 = this.props.handlers) === null || _this$props$handlers5 === void 0 ? void 0 : _this$props$handlers5.computePhase) && ((_this$props$handlers6 = this.props.handlers) === null || _this$props$handlers6 === void 0 ? void 0 : _this$props$handlers6.computePhase(value)) || 0;
  }
  isRTL() {
    return this.i18nService.isRTLLocale();
  }
  goToLower(e) {
    var _this$props$handlers7, _this$props$handlers8;
    const bounds = ((_this$props$handlers7 = this.props.handlers) === null || _this$props$handlers7 === void 0 ? void 0 : _this$props$handlers7.bounds) && ((_this$props$handlers8 = this.props.handlers) === null || _this$props$handlers8 === void 0 ? void 0 : _this$props$handlers8.bounds(e)) || {};
    this.setPosition(bounds.lower).then(() => {
      if (!isNil(bounds.lower) && bounds.center !== bounds.lower) {
        var _this$props$handlers9, _this$props$handlers10;
        ((_this$props$handlers9 = this.props.handlers) === null || _this$props$handlers9 === void 0 ? void 0 : _this$props$handlers9.onLower) && ((_this$props$handlers10 = this.props.handlers) === null || _this$props$handlers10 === void 0 ? void 0 : _this$props$handlers10.onLower(e));
      }
    });
  }
  goToUpper(e) {
    var _this$props$handlers11, _this$props$handlers12;
    const bounds = ((_this$props$handlers11 = this.props.handlers) === null || _this$props$handlers11 === void 0 ? void 0 : _this$props$handlers11.bounds) && ((_this$props$handlers12 = this.props.handlers) === null || _this$props$handlers12 === void 0 ? void 0 : _this$props$handlers12.bounds(e)) || {};
    this.setPosition(bounds.upper).then(() => {
      if (!isNil(bounds.upper) && bounds.center !== bounds.upper) {
        var _this$props$handlers13, _this$props$handlers14;
        ((_this$props$handlers13 = this.props.handlers) === null || _this$props$handlers13 === void 0 ? void 0 : _this$props$handlers13.onUpper) && ((_this$props$handlers14 = this.props.handlers) === null || _this$props$handlers14 === void 0 ? void 0 : _this$props$handlers14.onUpper(e));
      }
    });
  }
  setPosition(value) {
    if (isNil(value)) {
      return Promise.reject();
    }
    let position = isNaN(this.state.maxPosition) ? value : Math.max(this.state.maxPosition, value);
    return new Promise(resolve => {
      Animated.parallel([Animated.timing(this.animationPhase, {
        useNativeDriver: true,
        toValue: this.computePhase(value),
        duration: 200,
        easing: Easing.out(Easing.linear)
      }), Animated.timing(this.position, {
        useNativeDriver: true,
        toValue: (this.isRTL() ? -1 : 1) * position,
        duration: 200,
        easing: Easing.out(Easing.linear)
      })]).start(resolve);
    });
  }
  render() {
    const isHorizontal = this.props.direction === 'horizontal';
    return (
      /*#__PURE__*/
      //@ts-ignore
      React.createElement(GestureDetector, {
        gesture: this.gesture
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: [isHorizontal ? {
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center'
        } : null, this.props.style, {
          transform: this.state.isHorizontal ? [{
            translateX: this.position
          }] : [{
            translateY: this.position
          }]
        }],
        onLayout: this.setViewLayout.bind(this)
      }, this.props.children.map((c, i) => {
        var _this$props$style;
        return /*#__PURE__*/React.createElement(RNView, {
          onLayout: e => this.setChildrenLayout(e, i),
          key: c.key,
          style: [this.props.slideMinWidth ? {
            minWidth: this.props.slideMinWidth
          } : {
            width: this.props.slideWidth
          }, ((_this$props$style = this.props.style) === null || _this$props$style === void 0 ? void 0 : _this$props$style.height) === '100%' ? {
            height: '100%'
          } : null]
        }, c);
      })))
    );
  }
}
_defineProperty(View, "defaultProps", new Props());
//# sourceMappingURL=swipe.animation.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmSkeletonProps from './skeleton.props';
import { DEFAULT_CLASS } from './skeleton.styles';
import { isUndefined } from 'lodash-es';
export class WmSkeletonState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "layout", {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    });
    _defineProperty(this, "animate", false);
  }
}
class AnimationRunner {
  constructor() {
    _defineProperty(this, "time", 1000);
    _defineProperty(this, "speed", 1);
    _defineProperty(this, "counter", 0);
    _defineProperty(this, "animationValue", new Animated.Value(0.2));
  }
  run() {
    if (this.counter == 0) {
      return;
    }
    Animated.timing(this.animationValue, {
      duration: this.time * this.speed,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear
    }).start(event => {
      if (event.finished) {
        this.animationValue.setValue(0);
        this.run();
      }
    });
  }
  start() {
    this.counter++;
    if (this.counter == 1) {
      this.run();
    }
  }
  stop() {
    this.counter = Math.max(--this.counter, 0);
  }
  getValue() {
    return this.animationValue;
  }
}
export default class WmSkeleton extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmSkeletonProps(), new WmSkeletonState());
    _defineProperty(this, "skeletonloaderRef", null);
    _defineProperty(this, "animationRunner", new AnimationRunner());
    _defineProperty(this, "onLayoutChange", event => {
      var _this$skeletonloaderR;
      (_this$skeletonloaderR = this.skeletonloaderRef) === null || _this$skeletonloaderR === void 0 ? void 0 : _this$skeletonloaderR.measure((x, y, width, height, px, py) => {
        let layout = {
          left: px,
          top: py,
          width: width,
          height: height
        };
        this.setState({
          layout: {
            ...layout
          },
          animate: true
        });
      });
    });
  }
  componentDidMount() {
    this.animationRunner.start();
  }
  componentWillUnmount() {
    this.animationRunner.stop();
  }
  renderWidget(props) {
    var _this$styles$gradient, _this$styles$gradient2, _this$styles$gradient3;
    let outpuRange = [-this.state.layout.width - this.state.layout.left, this.state.layout.width + this.state.layout.height];
    let deg = -20;
    let translateX = this.animationRunner.getValue().interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 400]
    });
    return /*#__PURE__*/React.createElement(View, {
      ref: ref => {
        this.skeletonloaderRef = ref;
      },
      onLayout: this.onLayoutChange,
      style: this.styles.root
    }, this.state.animate ? /*#__PURE__*/React.createElement(Animated.View, {
      style: [StyleSheet.absoluteFill, this.styles.animatedView, {
        transform: [{
          translateX
        }, {
          rotate: deg + 'deg'
        }]
      }]
    }, /*#__PURE__*/React.createElement(LinearGradient, {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 1,
        y: 0
      },
      colors: [(_this$styles$gradient = this.styles.gradientForeground.backgroundColor) === null || _this$styles$gradient === void 0 ? void 0 : _this$styles$gradient.toString(), (_this$styles$gradient2 = this.styles.gradient.backgroundColor) === null || _this$styles$gradient2 === void 0 ? void 0 : _this$styles$gradient2.toString(), (_this$styles$gradient3 = this.styles.gradientForeground.backgroundColor) === null || _this$styles$gradient3 === void 0 ? void 0 : _this$styles$gradient3.toString()],
      locations: [0, 0.5, 1],
      style: [this.styles.gradient, {
        backgroundColor: this.styles.animatedView.backgroundColor
      }]
    })) : null);
  }
}
export const createSkeleton = (theme, skeletonStyles, wrapper) => {
  const style = {};
  const addStyleProp = propName => {
    if (!isUndefined(wrapper[propName])) {
      style[propName] = wrapper[propName];
    }
  };
  addStyleProp('width');
  addStyleProp('height');
  addStyleProp('borderRadius');
  addStyleProp('borderRadius');
  addStyleProp('marginTop');
  addStyleProp('marginBottom');
  addStyleProp('marginLeft');
  addStyleProp('marginRight');
  return /*#__PURE__*/React.createElement(WmSkeleton, {
    styles: theme.mergeStyle(skeletonStyles, {
      root: style
    })
  });
};
//# sourceMappingURL=skeleton.component.js.map
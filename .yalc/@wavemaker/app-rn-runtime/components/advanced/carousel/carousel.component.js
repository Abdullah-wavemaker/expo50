function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { isArray, isUndefined } from 'lodash-es';
import { Animated, Easing, View } from 'react-native';
import { DefaultKeyExtractor } from '@wavemaker/app-rn-runtime/core/key.extractor';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import * as SwipeAnimation from '@wavemaker/app-rn-runtime/gestures/swipe.animation';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import WmCarouselProps from './carousel.props';
import { DEFAULT_CLASS } from './carousel.styles';
export class WmCarouselState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "activeIndex", 1);
  }
}
export default class WmCarousel extends BaseComponent {
  constructor(_props) {
    super(_props, DEFAULT_CLASS, new WmCarouselProps(), new WmCarouselState());
    _defineProperty(this, "noOfSlides", 0);
    _defineProperty(this, "slidesLayout", []);
    _defineProperty(this, "keyExtractor", new DefaultKeyExtractor());
    _defineProperty(this, "stopPlay", null);
    _defineProperty(this, "dotScale", new Animated.Value(0));
    _defineProperty(this, "dotPosition", new Animated.Value(0));
    _defineProperty(this, "animationView", null);
    _defineProperty(this, "animationHandlers", {
      bounds: e => {
        var _this$slidesLayout, _this$slidesLayout$ac;
        const activeTabIndex = this.state.activeIndex - 1;
        let lower = 0;
        if (activeTabIndex > 0) {
          lower = this.slidesLayout.filter((l, i) => i < activeTabIndex - 1).reduce((s, l) => s + l.width, 0);
        }
        let center = lower + (((_this$slidesLayout = this.slidesLayout[activeTabIndex - 1]) === null || _this$slidesLayout === void 0 ? void 0 : _this$slidesLayout.width) || 0);
        let upper = center + (((_this$slidesLayout$ac = this.slidesLayout[activeTabIndex]) === null || _this$slidesLayout$ac === void 0 ? void 0 : _this$slidesLayout$ac.width) || 0);
        return {
          lower: -1 * lower,
          center: -1 * center,
          upper: -1 * upper
        };
      },
      computePhase: value => {
        var _this$slidesLayout$ac2;
        const activeTabIndex = this.state.activeIndex - 1;
        const w = ((_this$slidesLayout$ac2 = this.slidesLayout[activeTabIndex]) === null || _this$slidesLayout$ac2 === void 0 ? void 0 : _this$slidesLayout$ac2.width) || 0;
        return w && Math.abs(value / w);
      },
      onLower: e => {
        this.onSlideChange(this.state.activeIndex - 1);
      },
      onUpper: e => {
        this.onSlideChange(this.state.activeIndex + 1);
      }
    });
    _defineProperty(this, "onSlideChange", index => {
      const prevIndex = this.state.activeIndex;
      this.updateState({
        activeIndex: index
      }, () => this.invokeEventCallback('onChange', [this, index, prevIndex]));
      this.animatePagination(index);
    });
    _defineProperty(this, "renderItem", (item, index) => {
      const props = this.state.props;
      if (props.type === 'dynamic') {
        return props.renderSlide ? props.renderSlide(item, index, this) : null;
      }
      return props.children[index];
    });
    _defineProperty(this, "next", () => {
      const props = this.state.props;
      const data = props.type === 'dynamic' ? props.dataset : props.children;
      if (this.state.activeIndex >= (data === null || data === void 0 ? void 0 : data.length) || 0) {
        var _this$animationView;
        this.onSlideChange(1);
        (_this$animationView = this.animationView) === null || _this$animationView === void 0 ? void 0 : _this$animationView.setPosition(0);
      } else {
        var _this$animationView2;
        (_this$animationView2 = this.animationView) === null || _this$animationView2 === void 0 ? void 0 : _this$animationView2.goToUpper();
      }
    });
    _defineProperty(this, "prev", () => {
      var _this$animationView3;
      (_this$animationView3 = this.animationView) === null || _this$animationView3 === void 0 ? void 0 : _this$animationView3.goToLower();
    });
    this.cleanup.push(() => {
      this.stopPlay && this.stopPlay();
    });
  }
  addSlideLayout(index, nativeEvent) {
    this.slidesLayout[index] = nativeEvent.nativeEvent.layout;
    if (index === this.state.activeIndex) {
      this.forceUpdate();
    }
  }
  generateItemKey(item, index, props) {
    if (props.itemkey && item && !this._showSkeleton) {
      return props.itemkey(item, index);
    }
    return 'list_item_' + this.keyExtractor.getKey(item, true);
  }
  autoPlay() {
    const props = this.state.props;
    this.stopPlay && this.stopPlay();
    if (props.animation === 'auto' && props.animationinterval) {
      const intervalId = setInterval(() => {
        this.next();
      }, props.animationinterval * 1000);
      this.stopPlay = () => clearInterval(intervalId);
    } else {
      setTimeout(() => {
        var _this$animationView4;
        this.onSlideChange(1);
        (_this$animationView4 = this.animationView) === null || _this$animationView4 === void 0 ? void 0 : _this$animationView4.setPosition(0);
      }, 1000);
    }
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'dataset':
        {
          var _this$keyExtractor;
          (_this$keyExtractor = this.keyExtractor) === null || _this$keyExtractor === void 0 ? void 0 : _this$keyExtractor.clear();
          this.updateState({
            activeIndex: Math.min(this.state.activeIndex, ($new === null || $new === void 0 ? void 0 : $new.length) || 1)
          });
          break;
        }
      case 'animation':
      case 'animationinterval':
        {
          this.autoPlay();
        }
    }
  }
  animatePagination(index) {
    var _this$styles$dotStyle, _this$styles$dotStyle2, _this$styles$dotStyle3;
    const prevIndex = this.state.activeIndex;
    const margin = (((_this$styles$dotStyle = this.styles.dotStyle) === null || _this$styles$dotStyle === void 0 ? void 0 : _this$styles$dotStyle.marginLeft) || 0) + (((_this$styles$dotStyle2 = this.styles.dotStyle) === null || _this$styles$dotStyle2 === void 0 ? void 0 : _this$styles$dotStyle2.marginRight) || 0);
    const width = ((_this$styles$dotStyle3 = this.styles.dotStyle) === null || _this$styles$dotStyle3 === void 0 ? void 0 : _this$styles$dotStyle3.width) || 2;
    const size = margin + width;
    const position = Math.max(index - 1, 0) * size;
    const scale = Math.abs(index - prevIndex) * size;
    const options = {
      useNativeDriver: true,
      duration: 200,
      easing: Easing.out(Easing.linear)
    };
    if (prevIndex < index) {
      Animated.sequence([Animated.timing(this.dotScale, {
        toValue: scale,
        ...options
      }), Animated.parallel([Animated.timing(this.dotScale, {
        toValue: 0,
        ...options
      }), Animated.timing(this.dotPosition, {
        toValue: (this.isRTL ? -1 : 1) * position,
        ...options
      })])]).start();
    } else if (prevIndex > index) {
      Animated.sequence([Animated.parallel([Animated.timing(this.dotScale, {
        toValue: scale,
        ...options
      }), Animated.timing(this.dotPosition, {
        toValue: (this.isRTL ? -1 : 1) * position,
        ...options
      })]), Animated.timing(this.dotScale, {
        toValue: 0,
        ...options
      })]).start();
    }
  }
  renderPagination(data) {
    const maxNoOfDots = this.state.props.maxnoofdots;
    let minIndex = Math.max(this.state.activeIndex - maxNoOfDots + 1, 0);
    let maxIndex = Math.min(minIndex + maxNoOfDots - 1, data.length);
    if (maxIndex === data.length) {
      minIndex = maxIndex - maxNoOfDots;
    }
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.dotsWrapperStyle
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: this.isRTL ? 'row-reverse' : 'row'
      }
    }, data.map((item, index) => {
      return index >= minIndex && index <= maxIndex ? /*#__PURE__*/React.createElement(View, {
        key: 'dots_' + this.generateItemKey(item, index, this.state.props),
        style: [this.styles.dotStyle]
      }) : null;
    }), /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.dotStyle, this.styles.activeDotStyle, {
        width: undefined,
        height: undefined,
        transform: [{
          translateX: this.dotPosition
        }]
      }, this.isRTL ? {
        right: 0
      } : {
        left: 0
      }]
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [{
        width: 1,
        height: 1
      }, {
        // This is failing in Android
        // minWidth: this.dotScale
      }]
    }))));
  }
  renderWidget(props) {
    var _data, _this$styles$slide;
    const hasNavs = props.controls === 'both' || props.controls === 'navs';
    const hasDots = props.controls === 'both' || props.controls === 'indicators';
    let styles = this.styles;
    let data = props.type === 'dynamic' ? props.dataset : props.children;
    data = isArray(data) ? data : [];
    this.noOfSlides = ((_data = data) === null || _data === void 0 ? void 0 : _data.length) || 0;
    let slideScale = undefined;
    let slideTranslateX = undefined;
    if (isArray((_this$styles$slide = this.styles.slide) === null || _this$styles$slide === void 0 ? void 0 : _this$styles$slide.transform)) {
      var _this$styles$slide2, _this$styles$slide3;
      slideScale = (_this$styles$slide2 = this.styles.slide) === null || _this$styles$slide2 === void 0 || (_this$styles$slide2 = _this$styles$slide2.transform) === null || _this$styles$slide2 === void 0 || (_this$styles$slide2 = _this$styles$slide2.find(o => !isUndefined(o.scale))) === null || _this$styles$slide2 === void 0 ? void 0 : _this$styles$slide2.scale;
      slideTranslateX = (_this$styles$slide3 = this.styles.slide) === null || _this$styles$slide3 === void 0 || (_this$styles$slide3 = _this$styles$slide3.transform) === null || _this$styles$slide3 === void 0 || (_this$styles$slide3 = _this$styles$slide3.find(o => !isUndefined(o.translateX))) === null || _this$styles$slide3 === void 0 ? void 0 : _this$styles$slide3.translateX;
    }
    // TODO: loop prop on Carousel is not working Refer: https://github.com/meliorence/react-native-snap-carousel/issues/608
    return /*#__PURE__*/React.createElement(View, {
      style: styles.root
    }, this._background, /*#__PURE__*/React.createElement(SwipeAnimation.View, {
      enableGestures: props.enablegestures,
      style: {
        height: props.type === 'dynamic' ? undefined : '100%'
      },
      direction: "horizontal",
      ref: r => {
        this.animationView = r;
      },
      handlers: this.animationHandlers,
      slideMinWidth: this.styles.slide.width
    }, data.map((item, index) => {
      var _this$animationView5, _this$animationView6;
      const isActive = index === this.state.activeIndex - 1;
      let scale = (_this$animationView5 = this.animationView) === null || _this$animationView5 === void 0 ? void 0 : _this$animationView5.animationPhase.interpolate({
        inputRange: [-2000, index - 1, index, index + 1, 2000],
        outputRange: [slideScale, slideScale, 1, slideScale, slideScale]
      });
      let translateX = (_this$animationView6 = this.animationView) === null || _this$animationView6 === void 0 ? void 0 : _this$animationView6.animationPhase.interpolate({
        inputRange: [-2000, index - 1, index, index + 1, 2000],
        outputRange: [-56, -56, 0, 56, 56]
      });
      return /*#__PURE__*/React.createElement(Animated.View, {
        key: this.generateItemKey(item, index, props),
        onLayout: this.addSlideLayout.bind(this, index),
        style: [{
          height: props.type === 'dynamic' ? undefined : '100%'
        }, this.styles.slide, index === 0 ? this.styles.firstSlide : null, index === data.length - 1 ? this.styles.lastSlide : null, isActive ? this.styles.activeSlide : null, translateX && scale ? {
          transform: [{
            translateX: !isUndefined(slideTranslateX) ? slideTranslateX : translateX
          }, {
            scale: scale
          }]
        } : null]
      }, /*#__PURE__*/React.createElement(Tappable, {
        onTap: () => {
          var _this$animationView7;
          this.onSlideChange(index + 1);
          const position = this.slidesLayout.filter((l, i) => i < index).reduce((s, l) => s + l.width, 0);
          (_this$animationView7 = this.animationView) === null || _this$animationView7 === void 0 ? void 0 : _this$animationView7.setPosition(-1 * position);
        },
        rippleColor: this.styles.root.rippleColor
      }, this.renderItem(item, index)));
    })), hasNavs ? /*#__PURE__*/React.createElement(View, {
      style: styles.btnPanel
    }, /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('prev_icon'),
      iconclass: "wi wi-chevron-left fa-2x",
      styles: styles.prevBtn,
      onTap: this.prev,
      accessibilitylabel: "back"
    }), /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('next_icon'),
      iconclass: "wi wi-chevron-right fa-2x",
      styles: styles.nextBtn,
      onTap: this.next,
      accessibilitylabel: "next"
    })) : null, hasDots && data ? this.renderPagination(data) : null);
  }
}
//# sourceMappingURL=carousel.component.js.map
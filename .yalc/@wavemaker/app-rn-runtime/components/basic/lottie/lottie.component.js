function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import axios from 'axios';
import { Platform, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLottieProps from './lottie.props';
import { DEFAULT_CLASS } from './lottie.styles';
export class WmLottieState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "animationData", void 0);
    _defineProperty(this, "isCompleted", false);
  }
}
export default class WmLottie extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLottieProps(), new WmLottieState());
    _defineProperty(this, "lottie", /*#__PURE__*/React.createRef());
  }
  play() {
    if (this.lottie.current) {
      if (this.state.isCompleted) {
        this.reset();
      } else {
        this.lottie.current.play();
        this.invokeEventCallback('onPlay', [null, this.proxy]);
      }
    }
  }
  pause() {
    if (this.lottie.current) {
      this.lottie.current.pause();
      this.invokeEventCallback('onPause', [null, this.proxy]);
    }
  }
  reset() {
    if (this.lottie.current) {
      if (this.lottie.current.reset) {
        this.lottie.current.reset();
        this.lottie.current.play();
      } else if (this.lottie.current.goToAndPlay) {
        this.lottie.current.goToAndPlay(0);
      } else {
        return;
      }
      this.invokeEventCallback('onPlay', [null, this.proxy]);
      this.updateState({
        isCompleted: false
      });
    }
  }
  onReady() {
    this.invokeEventCallback('onReady', [null, this.proxy]);
    if (this.state.props.autoplay) {
      this.invokeEventCallback('onPlay', [null, this.proxy]);
    }
  }
  loadAnimationData() {
    if (this.state.animationData || !this.loadAsset) {
      return;
    }
    if (Platform.OS == 'web') {
      const url = this.loadAsset(this.state.props.source);
      axios.get(url).then(_ref => {
        let {
          data
        } = _ref;
        this.updateState({
          animationData: data
        }, () => this.onReady());
      });
    } else {
      this.updateState({
        animationData: this.loadAsset(this.state.props.source)
      }, () => this.onReady());
    }
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'src':
        this.loadAnimationData();
        break;
      case 'loop':
        if (this.initialized && !this.state.isCompleted && ($new || this.state.props.autoplay)) {
          setTimeout(() => this.reset(), 200);
        }
        break;
    }
  }
  componentDidMount() {
    super.componentDidMount();
    this.loadAnimationData();
  }
  renderWebLottie(props) {
    const Lottie = require('react-lottie-player');
    return /*#__PURE__*/React.createElement(Lottie, {
      animationData: this.state.animationData,
      ref: this.lottie,
      loop: props.loop,
      play: props.autoplay,
      speed: props.speed,
      style: this.styles.lottie,
      onComplete: () => {
        this.updateState({
          isCompleted: true
        });
        this.invokeEventCallback('onComplete', [null, this.proxy]);
      }
    });
  }
  renderNativeLottie(props) {
    return /*#__PURE__*/React.createElement(LottieView, {
      source: this.state.animationData,
      ref: this.lottie,
      autoPlay: props.autoplay,
      speed: props.speed,
      loop: props.loop,
      style: this.styles.lottie,
      onAnimationFinish: () => {
        this.updateState({
          isCompleted: true
        });
        this.invokeEventCallback('onComplete', [null, this.proxy]);
      }
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, this.state.animationData ? Platform.OS == 'web' ? this.renderWebLottie(props) : this.renderNativeLottie(props) : null);
  }
}
//# sourceMappingURL=lottie.component.js.map
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { debounce, isNumber, isNil } from 'lodash';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BackgroundComponent } from '@wavemaker/app-rn-runtime/styles/background.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmSliderProps from './slider.props';
import { DEFAULT_CLASS } from './slider.styles';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
export class WmSliderState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "track", void 0);
  }
}
export default class WmSlider extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmSliderProps());
    _defineProperty(this, "valueBeforeSlide", 0);
    _defineProperty(this, "position", new Animated.Value(0));
    _defineProperty(this, "trackGesture", Gesture.Pan());
    _defineProperty(this, "knobGesture", Gesture.Pan());
    _defineProperty(this, "onChange", debounce(value => {
      if (this.state.props.datavalue !== value) {
        this.updateState({
          props: {
            datavalue: value
          }
        });
        this.props.onFieldChange && this.props.onFieldChange('datavalue', value, this.state.props.datavalue);
      }
    }, 200));
    _defineProperty(this, "onLayoutChange", e => {
      const layout = e.nativeEvent.layout;
      this.updateState({
        track: {
          top: isWebPreviewMode() ? layout.top : layout.y,
          left: isWebPreviewMode() ? layout.left : layout.x,
          width: layout.width,
          height: layout.height
        }
      }, () => this.computePosition(this.state.props.datavalue));
    });
    this.configureGesture(this.trackGesture);
    this.configureGesture(this.knobGesture);
  }
  getValueFromGesture(positionX) {
    if (this.state.track) {
      const factor = (positionX - this.state.track.left) / this.state.track.width;
      const props = this.state.props;
      const step = props.step || (props.maxvalue - props.minvalue) / 100;
      let value = Math.round((factor * props.maxvalue + props.minvalue) / step) * step;
      return Math.max(Math.min(props.maxvalue, value), props.minvalue);
    }
    return 0;
  }
  configureGesture(gesture) {
    gesture.maxPointers(1).minDistance(0).onChange(e => {
      const value = this.getValueFromGesture(e.absoluteX);
      this.computePosition(value);
      this.forceUpdate();
    }).onEnd(e => {
      if (this.state.track) {
        const value = this.getValueFromGesture(e.absoluteX);
        this.onChange(value);
        this.forceUpdate();
      }
    });
  }
  getDataValue() {
    if (isNil(this.props.datavalue)) {
      return this.state.props.minvalue + (this.state.props.maxvalue - this.state.props.minvalue) / 2;
    }
    return Math.min(Math.max(this.props.datavalue, this.state.props.minvalue), this.state.props.maxvalue);
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'datavalue':
        if (isNumber($new) && isNumber($old)) {
          this.invokeEventCallback('onChange', [null, this, $new, $old]);
        }
      case 'maxvalue':
      case 'minvalue':
        this.setProp('datavalue', this.getDataValue() || 0);
        this.computePosition(this.state.props.datavalue);
    }
  }
  computePosition(datavalue) {
    var _this$state$track, _this$position;
    const props = this.state.props;
    const width = ((_this$state$track = this.state.track) === null || _this$state$track === void 0 ? void 0 : _this$state$track.width) || 0;
    const value = (datavalue - props.minvalue) / props.maxvalue * width;
    (_this$position = this.position) === null || _this$position === void 0 ? void 0 : _this$position.setValue(isNaN(value) ? 0 : value);
  }
  renderWidget(props) {
    var _this$state$track2;
    const width = ((_this$state$track2 = this.state.track) === null || _this$state$track2 === void 0 ? void 0 : _this$state$track2.width) || 0;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestProps('min'), {
      style: [this.styles.text, this.styles.minimumValue]
    }), props.minvalue), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestProps('value'), {
      style: [this.styles.text, this.styles.value]
    }), props.datavalue), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestProps('max'), {
      style: [this.styles.text, this.styles.maximumValue]
    }), props.maxvalue)), /*#__PURE__*/React.createElement(GestureDetector, {
      gesture: this.trackGesture
    }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      activeOpacity: 1,
      style: this.styles.track,
      onLayout: this.onLayoutChange
    }, this.getTestProps()), /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.minimumTrack, {
        width: width,
        transform: [{
          translateX: this.position.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
          })
        }]
      }]
    }), /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.maximumTrack, {
        width: width,
        transform: [{
          translateX: this.position
        }]
      }]
    }))), /*#__PURE__*/React.createElement(GestureDetector, {
      gesture: this.knobGesture
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.styles.thumb, {
        transform: [{
          translateX: this.position
        }]
      }]
    }, /*#__PURE__*/React.createElement(BackgroundComponent, {
      size: this.styles.thumb.backgroundSize || 'contain',
      position: this.styles.thumb.backgroundPosition,
      image: this.styles.thumb.backgroundImage,
      repeat: this.styles.thumb.backgroundRepeat || 'no-repeat'
    }))));
  }
}
//# sourceMappingURL=slider.component.js.map
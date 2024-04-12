function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmVideoProps from './video.props';
import { DEFAULT_CLASS } from './video.styles';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';
export class WmVideoState extends BaseComponentState {}
export default class WmVideo extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmVideoProps(), new WmVideoState());
    _defineProperty(this, "video", null);
  }
  getSource(path) {
    if (!path) {
      return null;
    }
    const resource = this.loadAsset(path);
    if (isFullPathUrl(resource)) {
      return {
        uri: resource
      };
    }
    return resource;
  }
  componentDidMount() {
    if (this.state.props.autoplay) {
      var _this$video;
      (_this$video = this.video) === null || _this$video === void 0 ? void 0 : _this$video.playAsync();
    }
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(Video, _extends({}, getAccessibilityProps(AccessibilityWidgetType.VIDEO, props), {
      ref: video => {
        this.video = video;
      },
      style: {
        width: '100%',
        height: '100%',
        flex: 1
      },
      source: this.getSource(props.mp4format || props.webmformat),
      posterSource: this.getSource(props.videoposter),
      useNativeControls: props.controls,
      resizeMode: ResizeMode.CONTAIN,
      isLooping: props.loop,
      isMuted: props.muted,
      testID: this.getTestId('video')
    })));
  }
}
//# sourceMappingURL=video.component.js.map
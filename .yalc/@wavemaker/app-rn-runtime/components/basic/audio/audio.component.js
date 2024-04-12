function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Platform, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { isString } from 'lodash-es';
import { Audio } from 'expo-av';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmAudioProps from './audio.props';
import { DEFAULT_CLASS } from './audio.styles';
import WmIcon from '../icon/icon.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
export class WmAudioState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "playing", false);
    _defineProperty(this, "currentTime", 0);
    _defineProperty(this, "totalTime", 0);
  }
}
export default class WmAudio extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAudioProps(), new WmAudioState());
    _defineProperty(this, "loading", false);
    _defineProperty(this, "sound", null);
    _defineProperty(this, "timer", void 0);
    _defineProperty(this, "offsetTime", 0);
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'mp3format':
        {
          if (this.initialized) {
            Promise.resolve().then(() => {
              var _this$sound;
              return (_this$sound = this.sound) === null || _this$sound === void 0 ? void 0 : _this$sound.unloadAsync();
            }).then(() => {
              this.sound = null;
              this.onSeekChange(0);
              if (this.state.playing || this.state.props.autoplay) {
                this.play();
              }
            });
          }
        }
        break;
      case 'autoplay':
        if (this.initialized && $new) {
          this.play();
        }
    }
  }
  getSource() {
    const source = this.loadAsset && this.state.props.mp3format && this.loadAsset(this.state.props.mp3format);
    if (isString(source)) {
      return {
        uri: source
      };
    }
    return source;
  }
  addPadding(str, maxLen) {
    let pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    if (str.length < maxLen) {
      return this.addPadding(pad + str, maxLen, pad);
    }
    return str;
  }
  formatTime(v) {
    const t = v / 60;
    const mins = Math.floor(t);
    const seconds = Math.round((t - mins) * 60);
    return this.addPadding(mins + '', 2) + ':' + this.addPadding(seconds + '', 2);
  }
  setTimer() {
    this.cancelTimer();
    this.timer = setInterval(() => {
      if (this.state.currentTime >= this.state.totalTime) {
        if (this.state.props.loop) {
          this.replay();
        } else {
          this.stop();
        }
        return;
      }
      this.setState({
        currentTime: Math.max(this.offsetTime + this.state.currentTime + 1, 0)
      });
      this.offsetTime = 0;
    }, 1000);
  }
  cancelTimer() {
    clearInterval(this.timer);
  }
  stop() {
    var _this$sound2;
    this.pause();
    (_this$sound2 = this.sound) === null || _this$sound2 === void 0 ? void 0 : _this$sound2.unloadAsync();
    this.sound = null;
    this.cancelTimer();
    this.offsetTime = 0;
    this.updateState({
      currentTime: 0
    });
  }
  replay() {
    this.updateState({
      currentTime: 0
    }, () => {
      this.sound.replayAsync();
    });
  }
  play() {
    if (isWebPreviewMode() || this.loading || this.state.playing && this.sound) {
      return;
    }
    if (this.sound) {
      this.sound.playAsync();
      this.setTimer();
      this.updateState({
        playing: true
      });
    } else {
      this.loading = true;
      const source = this.getSource();
      source && Audio.Sound.createAsync(source, {
        isMuted: this.state.props.muted
      }).then(res => {
        this.sound = res.sound;
        this.sound.playAsync();
        this.sound.getStatusAsync().then(status => {
          this.updateState({
            currentTime: 0,
            totalTime: Math.round(status['durationMillis'] / 1000)
          }, () => this.setTimer());
        });
        this.updateState({
          playing: true
        });
      }).catch(() => {}).then(() => {
        this.loading = false;
      });
    }
  }
  pause() {
    var _this$sound3;
    this.cancelTimer();
    (_this$sound3 = this.sound) === null || _this$sound3 === void 0 ? void 0 : _this$sound3.pauseAsync().then(() => {
      this.updateState({
        playing: false
      });
    });
  }
  mute() {
    this.sound.setStatusAsync({
      isMuted: true
    }).then(() => {
      this.updateState({
        props: {
          muted: true
        }
      });
    });
  }
  unmute() {
    this.sound.setStatusAsync({
      isMuted: false
    }).then(() => {
      this.updateState({
        props: {
          muted: false
        }
      });
    });
  }
  onSeekChange(time) {
    if (time !== this.state.currentTime) {
      var _this$sound4;
      this.offsetTime = time - this.state.currentTime;
      (_this$sound4 = this.sound) === null || _this$sound4 === void 0 ? void 0 : _this$sound4.setPositionAsync(time * 1000);
    }
  }
  componentDidMount() {
    super.componentDidMount();
    //without settimeout, app is crashing with errors
    setTimeout(() => {
      if (this.state.props.autoplay) {
        this.play();
      }
    }, 1000);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.stop();
  }
  renderWidget(props) {
    return props.controls ? /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, !this.state.playing ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('play'),
      name: props.name + "_play",
      styles: this.styles.playIcon,
      iconclass: "wi wi-play-arrow fa-2x",
      onTap: () => this.play()
    }) : /*#__PURE__*/React.createElement(WmIcon, {
      name: props.name + "_pause",
      id: this.getTestId('pause'),
      iconclass: "wi wi-pause fa-2x",
      styles: this.styles.pauseIcon,
      onTap: () => this.pause()
    }), /*#__PURE__*/React.createElement(Text, {
      style: this.styles.text
    }, `${this.formatTime(this.state.currentTime)} / ${this.formatTime(this.state.totalTime)}`), /*#__PURE__*/React.createElement(Slider, {
      testID: this.getTestId('slider'),
      step: 1,
      style: {
        flex: 1
      },
      value: this.state.currentTime,
      disabled: isWebPreviewMode(),
      onValueChange: this.onSeekChange.bind(this),
      minimumValue: 0,
      inverted: this.isRTL && (Platform.OS == "android" || Platform.OS == "web"),
      maximumValue: this.state.totalTime || 1,
      thumbTintColor: this.styles.slider.thumb.backgroundColor,
      minimumTrackTintColor: this.styles.slider.minimumTrack.backgroundColor,
      maximumTrackTintColor: this.styles.slider.maximumTrack.backgroundColor
    }), !props.muted ? /*#__PURE__*/React.createElement(WmIcon, {
      name: props.name + "_mute",
      id: this.getTestId('mute'),
      iconclass: "wi wi-volume-up fa-2x",
      styles: this.styles.muteIcon,
      onTap: () => this.mute()
    }) : /*#__PURE__*/React.createElement(WmIcon, {
      name: props.name + "_unmute",
      id: this.getTestId('unmute'),
      iconclass: "wi wi-volume-off fa-2x",
      styles: this.styles.unmuteIcon,
      onTap: () => this.unmute()
    })) : null;
  }
}
//# sourceMappingURL=audio.component.js.map
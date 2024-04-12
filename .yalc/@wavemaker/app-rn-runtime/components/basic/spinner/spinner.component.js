function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, Platform } from 'react-native';
import Color from "color";
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmSpinnerProps from './spinner.props';
import { DEFAULT_CLASS } from './spinner.styles';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import LottieView from 'lottie-react-native';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
export class WmSpinnerState extends BaseComponentState {}
export default class WmSpinner extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmSpinnerProps());
    _defineProperty(this, "recursiveSearch", (obj, colors) => {
      obj && Object.keys(obj).forEach(key => {
        let value = obj[key];
        let ind = Math.floor(Math.random() * (0 - colors.length) + colors.length);
        if (key == "nm" && (value.toLowerCase().includes('fill ') || value.toLowerCase().includes('stroke '))) {
          if (obj["c"] && obj["c"]["k"] && (obj["c"]["k"].length == 4 || obj["c"]["k"].length == 3 && typeof obj["c"]["k"][0] == 'number')) {
            obj["c"]["k"] = colors[ind];
          } else {
            if (obj["c"] && obj["c"]["k"]) {
              for (let shape in obj["c"]["k"]) {
                if (obj["c"]["k"][shape] && obj["c"]["k"][shape]["s"]) {
                  obj["c"]["k"][shape]["s"] = colors[ind];
                }
              }
            }
          }
        } else if (typeof value === 'object') {
          this.recursiveSearch(value, colors);
        }
      });
      return obj;
    });
  }
  prepareIcon(props) {
    return /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon'),
      styles: this.styles.icon,
      iconclass: props.iconclass + ' fa-spin',
      iconsize: props.iconsize
    });
  }
  prepareImage(props) {
    return /*#__PURE__*/React.createElement(WmPicture, {
      id: this.getTestId('picture'),
      styles: this.styles.image,
      picturesource: props.image
    });
  }
  toRgbArray(color) {
    return [color.red() / 255, color.green() / 255, color.blue() / 255, 1];
  }
  addClasstoLottie(lottiePath) {
    let primaryColor = Color(ThemeVariables.INSTANCE.primaryColor);
    let colors = [this.toRgbArray(primaryColor), this.toRgbArray(primaryColor.darken(0.2)), this.toRgbArray(primaryColor.darken(0.4)), this.toRgbArray(primaryColor.darken(0.6)), this.toRgbArray(primaryColor.darken(0.8))];
    return this.recursiveSearch(lottiePath.json, lottiePath.loader == 'circleSpinner' ? [colors[0]] : colors);
  }
  prepareLottie(props) {
    var _Lottie;
    let Lottie = Platform.OS == 'web' ? require('react-lottie-player') : null;
    Lottie = ((_Lottie = Lottie) === null || _Lottie === void 0 ? void 0 : _Lottie.default) || Lottie;
    return Platform.OS == 'web' ? /*#__PURE__*/React.createElement(Lottie, {
      animationData: this.addClasstoLottie(props.lottie),
      loop: true,
      play: true,
      style: this.styles.lottie
    }) : /*#__PURE__*/React.createElement(LottieView, {
      testID: this.getTestId('lottie'),
      source: this.addClasstoLottie(props.lottie),
      resizeMode: "contain",
      autoPlay: true,
      loop: true,
      style: this.styles.lottie
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.lottie ? this.prepareLottie(props) : props.image ? this.prepareImage(props) : this.prepareIcon(props), props.caption ? /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel(), {
      style: this.styles.text
    }), props.caption) : null);
  }
}
//# sourceMappingURL=spinner.component.js.map
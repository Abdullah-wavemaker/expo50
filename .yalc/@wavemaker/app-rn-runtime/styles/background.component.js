function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import * as React from 'react';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { isEmpty, isNil, isNumber } from 'lodash-es';
import imageSizeEstimator from '@wavemaker/app-rn-runtime/core/imageSizeEstimator';
import { AssetConsumer } from '@wavemaker/app-rn-runtime/core/asset.provider';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';
const IMAGE_URL_REGEX = /url\(['|"]?(.+)['|"]?\)$/gi;
const LINEAT_GRADIENT_REGEX = /linear-gradient\((.+)\)$/gi;
const DIMENSION_REGEX = /([0-9%]+)[a-z]*/g;
const BACKGROUND_POSITION_REGEX = /([0-9%]+)[a-z]*\s*([0-9%]+)[a-z]*/g;
const BACKGROUND_SIZE_REGEX = /([0-9%]+)[a-z]*\s*([0-9%]+)[a-z]*/g;
const ASSET_CACHE = {};
export class LinearGradient extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.parse();
  }
  parse() {
    let val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;
    let state = {};
    const splits = val.split(',').map(v => v.trim());
    let angle = 0;
    const locations = [];
    if (splits[0].endsWith('deg')) {
      angle = parseInt(splits[0].split('deg')[0]) % 360;
      angle = angle < 0 ? 360 + angle : angle;
      splits.shift();
    }
    angle += 90;
    const delta = Math.round(Math.tan(angle * Math.PI / 180) * 100) / 100;
    if (Math.abs(delta) > 1) {
      state = {
        end: {
          x: -0.5 / delta + 0.5,
          y: 0
        },
        start: {
          x: 0.5 / delta + 0.5,
          y: 1
        }
      };
    } else {
      state = {
        start: {
          x: 0,
          y: -0.5 * delta + 0.5
        },
        end: {
          x: 1,
          y: 0.5 * delta + 0.5
        }
      };
    }
    if (angle >= 270 && angle <= 450) {
      state = {
        start: state.end,
        end: state.start
      };
    }
    state.colors = [];
    state.locations = [];
    splits.map(s => {
      var _s$matchAll$next;
      const p = (_s$matchAll$next = s.matchAll(/\s*([0-9]+)%/g).next()) === null || _s$matchAll$next === void 0 ? void 0 : _s$matchAll$next.value;
      if (p) {
        state.locations.push(parseInt(p[1]) / 100);
        state.colors.push(s.replace(p[0], ''));
      } else {
        state.locations.push(null);
        state.colors.push(s);
      }
    });
    return state;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState(this.parse());
    }
  }
  render() {
    var _this$props$size, _this$props$style;
    return /*#__PURE__*/React.createElement(View, {
      style: [{
        borderWidth: 0,
        overflow: 'hidden'
      }, StyleSheet.absoluteFill, this.props.style]
    }, /*#__PURE__*/React.createElement(View, {
      style: [StyleSheet.absoluteFill, this.props.middle ? {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      } : null]
    }, /*#__PURE__*/React.createElement(ExpoLinearGradient, {
      colors: this.state.colors,
      locations: this.state.locations,
      start: this.state.start,
      end: this.state.end,
      style: [(_this$props$size = this.props.size) !== null && _this$props$size !== void 0 && _this$props$size.width ? this.props.size : StyleSheet.absoluteFill, this.props.position, {
        position: 'absolute',
        borderRadius: (_this$props$style = this.props.style) === null || _this$props$style === void 0 ? void 0 : _this$props$style.borderRadius
      }]
    })), this.props.children);
  }
}
export class BackgroundComponent extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "loadAsset", null);
    this.state = {
      imageSrc: this.props.image ? ASSET_CACHE[this.props.image] : undefined
    };
  }
  caluculateSize(imageSrc) {
    if (isNumber(imageSrc)) {
      const {
        width,
        height
      } = Image.resolveAssetSource(imageSrc);
      this.setState({
        naturalImageWidth: width,
        naturalImageHeight: height
      });
    } else if (!isNil(imageSrc)) {
      imageSizeEstimator.getSize(imageSrc.uri, (width, height) => {
        this.setState({
          naturalImageWidth: width,
          naturalImageHeight: height
        });
      });
    }
  }
  getDimension(dim) {
    if (dim) {
      const value = dim.matchAll(DIMENSION_REGEX).next().value;
      if (value[1]) {
        return value[1].endsWith('%') ? value[1] : parseInt(value[1]);
      }
    }
    return null;
  }
  getPosition() {
    const result = {};
    if (!this.props.position) {
      return result;
    }
    const position = this.props.position.split(' ').map(s => s.trim());
    if (position[0] === 'center') {
      result.alignItems = 'center';
    } else if (position[0] === 'top') {
      result.top = 0;
    } else if (position[0] === 'bottom') {
      result.bottom = 0;
    } else {
      result.top = this.getDimension(position[0]);
    }
    if (position[1] === 'center') {
      result.justifyContent = 'center';
    } else if (position[1] === 'left') {
      result.left = 0;
    } else if (position[1] === 'bottom') {
      result.right = 0;
    } else {
      result.left = this.getDimension(position[1]);
    }
    return result;
  }
  getPositionAndSize() {
    var _this$props$size2, _this$getGradient;
    const result = {};
    if (this.props.resizeMode) {
      result.resizeMode = this.props.resizeMode;
      return result;
    } else if (this.props.position === 'center') {
      result.resizeMode = 'center';
      result.position = {
        justifyContent: 'center',
        alignItems: 'center'
      };
    } else if (this.props.size === 'contain' || this.props.size === 'cover') {
      result.resizeMode = this.props.size;
      return result;
    }
    const size = (_this$props$size2 = this.props.size) === null || _this$props$size2 === void 0 ? void 0 : _this$props$size2.matchAll(BACKGROUND_SIZE_REGEX).next().value;
    result.size = {};
    if (size) {
      result.size.width = size[1].endsWith('%') ? size[1] : parseInt(size[1]);
      result.size.height = size[2].endsWith('%') ? size[2] : parseInt(size[2]);
    }
    if (!result.resizeMode && this.props.position) {
      result.position = this.getPosition();
    }
    if (!((_this$getGradient = this.getGradient()) !== null && _this$getGradient !== void 0 && (_this$getGradient = _this$getGradient.value) !== null && _this$getGradient !== void 0 && _this$getGradient.length)) {
      if (this.props.repeat === 'no-repeat') {
        result.size.width = result.size.width || this.state.naturalImageWidth;
        result.size.height = result.size.height || this.state.naturalImageHeight;
      } else if (this.props.repeat === 'repeat-x') {
        result.resizeMode = 'repeat';
        result.size.width = result.size.width || '100%';
        result.size.height = result.size.height || this.state.naturalImageHeight;
      } else if (this.props.repeat === 'repeat-y') {
        result.resizeMode = 'repeat';
        result.size.width = result.size.width || this.state.naturalImageWidth;
        result.size.height = result.size.height || '100%';
      } else {
        result.resizeMode = 'repeat';
      }
    }
    return result;
  }
  renderLinearGradient(data) {
    const psresult = this.getPositionAndSize();
    return /*#__PURE__*/React.createElement(LinearGradient, {
      value: data || '',
      style: this.props.style,
      size: psresult.size,
      position: psresult.position,
      middle: psresult.resizeMode === 'center'
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.image && prevProps.image !== this.props.image) {
      this.setImage();
    }
  }
  componentDidMount() {
    setTimeout(() => this.setImage(), 100);
  }
  setImage() {
    var _this$props$image, _source;
    let source = (_this$props$image = this.props.image) === null || _this$props$image === void 0 ? void 0 : _this$props$image.trim();
    if (!source) {
      return;
    }
    if ((_source = source) !== null && _source !== void 0 && _source.startsWith('url')) {
      var _this$props$image2;
      source = (_this$props$image2 = this.props.image) === null || _this$props$image2 === void 0 ? void 0 : _this$props$image2.matchAll(IMAGE_URL_REGEX).next().value[1];
    }
    if (this.loadAsset) {
      source = this.loadAsset(source);
    }
    if (isFullPathUrl(source)) {
      source = {
        uri: source
      };
    }
    this.caluculateSize(source);
    this.setState({
      imageSrc: source
    });
    if (this.props.image) {
      ASSET_CACHE[this.props.image] = source;
    }
  }
  getGradient() {
    var _this$props$image3;
    return (_this$props$image3 = this.props.image) === null || _this$props$image3 === void 0 ? void 0 : _this$props$image3.trim().matchAll(LINEAT_GRADIENT_REGEX).next();
  }
  renderImage() {
    const psresult = this.getPositionAndSize();
    return /*#__PURE__*/React.createElement(AssetConsumer, null, loadAsset => {
      var _psresult$position, _psresult$position2;
      const loadImage = this.loadAsset !== loadAsset;
      this.loadAsset = loadAsset;
      loadImage && this.setImage();
      return /*#__PURE__*/React.createElement(View, {
        style: [{
          borderWidth: 0,
          overflow: 'hidden'
        }, StyleSheet.absoluteFill, this.props.style]
      }, /*#__PURE__*/React.createElement(View, {
        style: [StyleSheet.absoluteFill, {
          flexDirection: 'row',
          justifyContent: (_psresult$position = psresult.position) === null || _psresult$position === void 0 ? void 0 : _psresult$position.justifyContent,
          alignItems: (_psresult$position2 = psresult.position) === null || _psresult$position2 === void 0 ? void 0 : _psresult$position2.alignItems
        }]
      }, /*#__PURE__*/React.createElement(View, {
        style: [{
          position: 'absolute',
          overflow: 'hidden'
        }, psresult.position, isEmpty(psresult.size) ? StyleSheet.absoluteFill : psresult.size]
      }, /*#__PURE__*/React.createElement(Image, {
        source: this.state.imageSrc,
        resizeMode: psresult.resizeMode || 'cover',
        style: [{
          width: '100%',
          height: '100%'
        }, !isEmpty(psresult.size) || psresult.resizeMode === 'cover' || psresult.resizeMode === 'contain' ? null : {
          minWidth: this.state.naturalImageWidth,
          minHeight: this.state.naturalImageHeight
        }]
      }))));
    });
  }
  render() {
    var _gradientData$value;
    const gradientData = this.getGradient();
    if (gradientData !== null && gradientData !== void 0 && (_gradientData$value = gradientData.value) !== null && _gradientData$value !== void 0 && _gradientData$value.length) {
      return this.renderLinearGradient(gradientData.value[1]);
    } else if (this.props.image && this.state.imageSrc) {
      return this.renderImage();
    }
    return null;
  }
}
//# sourceMappingURL=background.component.js.map
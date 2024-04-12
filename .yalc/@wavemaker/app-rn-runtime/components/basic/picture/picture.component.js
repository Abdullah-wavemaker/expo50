function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Image, View } from 'react-native';
// import { NumberProp, SvgUri } from 'react-native-svg';
import { isNumber } from 'lodash-es';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import ImageSizeEstimator from '@wavemaker/app-rn-runtime/core/imageSizeEstimator';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmPictureProps from './picture.props';
import { DEFAULT_CLASS } from './picture.styles';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { createSkeleton } from '../skeleton/skeleton.component';
export class WmPictureState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "naturalImageWidth", 0);
    _defineProperty(this, "naturalImageHeight", 0);
    _defineProperty(this, "imageWidth", 0);
    _defineProperty(this, "imageHeight", 0);
  }
}
export default class WmPicture extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPictureProps());
    _defineProperty(this, "_pictureSource", null);
    _defineProperty(this, "_picturePlaceHolder", null);
    _defineProperty(this, "onViewLayoutChange", e => {
      let imageWidth = e.nativeEvent.layout.width;
      let imageHeight = e.nativeEvent.layout.height;
      if (!imageWidth && !imageHeight) {
        return;
      }
      if (!this.styles.root.height || typeof this.styles.root.height === 'string' && !this.styles.root.height.includes('%')) {
        imageHeight = 0;
      }
      if (imageWidth && !imageHeight) {
        imageHeight = imageWidth * this.state.naturalImageHeight / this.state.naturalImageWidth;
      } else if (imageHeight && !imageWidth) {
        imageWidth = imageHeight * this.state.naturalImageWidth / this.state.naturalImageHeight;
      }
      this.updateState({
        imageWidth: imageWidth,
        imageHeight: imageHeight
      });
    });
  }
  loadImage(image) {
    if (!image || !this.loadAsset) {
      return null;
    }
    const imageSrc = this.loadAsset(image);
    if (imageSrc && typeof imageSrc === 'object' && typeof imageSrc.default === 'function') {
      return null;
    }
    if (isNumber(imageSrc)) {
      const {
        width,
        height
      } = Image.resolveAssetSource(imageSrc);
      this.updateState({
        naturalImageWidth: width,
        naturalImageHeight: height
      });
    } else if (imageSrc !== null) {
      const cancel = ImageSizeEstimator.getSize(imageSrc, (width, height) => {
        this.updateState({
          naturalImageWidth: width,
          naturalImageHeight: height
        });
        this.cleanup.splice(this.cleanup.indexOf(cancel), 1);
      });
      this.cleanup.push(cancel);
    }
    return imageSrc;
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'picturesource':
        this._pictureSource = null;
      case 'pictureplaceholder':
        this._picturePlaceHolder = null;
        break;
    }
  }
  createShape(shape, imageWidth) {
    if (shape) {
      switch (shape) {
        case 'circle':
          return {
            picture: {
              borderRadius: isNumber(imageWidth) ? imageWidth / 2 : 4
            }
          };
        case 'rounded':
          return this.theme.getStyle('rounded-image');
        case 'thumbnail':
          return this.theme.getStyle('thumbnail-image');
      }
    }
    return {};
  }
  getElementToShow(props, imgSrc, shapeStyles) {
    let elementToshow, source;
    if (imgSrc && typeof imgSrc === 'object' && typeof (imgSrc === null || imgSrc === void 0 ? void 0 : imgSrc.default) === 'function') {
      let imgStyle = {};
      if (props.resizemode === 'contain') {
        imgStyle['width'] = '100%';
        imgStyle['height'] = '100%';
      }
      elementToshow = /*#__PURE__*/React.createElement(imgSrc === null || imgSrc === void 0 ? void 0 : imgSrc.default, imgStyle);
      //} else if (!isWebPreviewMode() && props.isSvg) {
      //  svg from uri
      //  elementToshow = <SvgUri testID={this.getTestId('picture')} width={this.styles.root.width as NumberProp} height={this.styles.root.height as NumberProp} uri={imgSrc}/>;
    } else if (isFullPathUrl(imgSrc)) {
      source = {
        uri: imgSrc
      };
    } else {
      source = imgSrc;
    }
    if (this.state.naturalImageWidth) {
      elementToshow = /*#__PURE__*/React.createElement(Image, _extends({
        testID: this.getTestId('picture'),
        style: [this.styles.picture, shapeStyles.picture],
        resizeMode: props.resizemode,
        source: source
      }, getAccessibilityProps(AccessibilityWidgetType.PICTURE, props)));
    }
    return elementToshow;
  }
  renderSkeleton(props) {
    var _this$styles$root, _shapeStyles$root, _shapeStyles$picture, _this$styles$root2, _shapeStyles$root2, _shapeStyles$picture2, _this$styles$root3, _shapeStyles$picture3, _shapeStyles$root3, _this$styles$root4;
    const imageWidth = this.state.imageWidth;
    const imageHeight = this.state.imageHeight;
    const shapeStyles = this.createShape(this.props.shape, imageWidth);
    const skeletonWidth = this.props.skeletonwidth || ((_this$styles$root = this.styles.root) === null || _this$styles$root === void 0 ? void 0 : _this$styles$root.width) || ((_shapeStyles$root = shapeStyles.root) === null || _shapeStyles$root === void 0 ? void 0 : _shapeStyles$root.width) || ((_shapeStyles$picture = shapeStyles.picture) === null || _shapeStyles$picture === void 0 ? void 0 : _shapeStyles$picture.width) || imageWidth;
    const skeletonHeight = this.props.skeletonheight || ((_this$styles$root2 = this.styles.root) === null || _this$styles$root2 === void 0 ? void 0 : _this$styles$root2.height) || ((_shapeStyles$root2 = shapeStyles.root) === null || _shapeStyles$root2 === void 0 ? void 0 : _shapeStyles$root2.height) || ((_shapeStyles$picture2 = shapeStyles.picture) === null || _shapeStyles$picture2 === void 0 ? void 0 : _shapeStyles$picture2.height) || imageHeight;
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      borderRadius: this.props.shape == 'circle' && (_this$styles$root3 = this.styles.root) !== null && _this$styles$root3 !== void 0 && _this$styles$root3.width ? 25 : ((_shapeStyles$picture3 = shapeStyles.picture) === null || _shapeStyles$picture3 === void 0 ? void 0 : _shapeStyles$picture3.borderRadius) || ((_shapeStyles$root3 = shapeStyles.root) === null || _shapeStyles$root3 === void 0 ? void 0 : _shapeStyles$root3.borderRadius) || ((_this$styles$root4 = this.styles.root) === null || _this$styles$root4 === void 0 ? void 0 : _this$styles$root4.borderRadius) || 4,
      width: skeletonWidth,
      height: skeletonHeight
    });
  }
  renderWidget(props) {
    var _shapeStyles$picture4;
    const imageWidth = this.state.imageWidth;
    const imageHeight = this.state.imageHeight;
    const shapeStyles = this.createShape(props.shape, imageWidth);
    this._pictureSource = this._pictureSource || this.loadImage(props.picturesource);
    this._picturePlaceHolder = this._picturePlaceHolder || this.loadImage(props.pictureplaceholder);
    const imgSrc = this._pictureSource || this._picturePlaceHolder;
    let elementToshow;
    if (imgSrc) {
      elementToshow = this.getElementToShow(props, imgSrc, shapeStyles);
    }
    return imgSrc && (this.state.naturalImageWidth || props.isSvg) ? /*#__PURE__*/React.createElement(View, {
      style: [{
        width: imageWidth,
        height: imageHeight
      }, this.styles.root, shapeStyles.root, shapeStyles.picture]
    }, this._background, /*#__PURE__*/React.createElement(View, {
      style: [{
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }],
      onLayout: this.onViewLayoutChange
    }, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      rippleColor: this.styles.root.rippleColor,
      target: this,
      styles: {
        width: imageWidth ? null : '100%',
        height: imageHeight ? null : '100%'
      }
    }), /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: [{
        height: imageHeight,
        width: imageWidth,
        borderRadius: (_shapeStyles$picture4 = shapeStyles.picture) === null || _shapeStyles$picture4 === void 0 ? void 0 : _shapeStyles$picture4.borderRadius
      }]
    }, this.state.imageWidth ? elementToshow : null)))) : null;
  }
}
//# sourceMappingURL=picture.component.js.map
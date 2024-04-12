function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCameraProps from './camera.props';
import { DEFAULT_CLASS } from './camera.styles';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import { CameraConsumer } from "@wavemaker/app-rn-runtime/core/device/camera-service";
export class WmCameraState extends BaseComponentState {}
export default class WmCamera extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCameraProps());
    _defineProperty(this, "camera", null);
    _defineProperty(this, "localFile", '');
  }
  onCameraTap() {
    const props = this.state.props;
    if (props.capturetype === 'IMAGE') {
      const params = {
        allowImageEdit: props.allowedit,
        imageQuality: props.imagequality,
        imageEncodingType: props.imageencodingtype,
        imageTargetWidth: props.imagetargetwidth,
        imageTargetHeight: props.imagetargetheight
      };
      this.camera.captureImage(params).then(res => {
        this.updateModel(null, res.imagePath, res.content);
      });
    } else {
      this.camera.captureVideo().then(res => {
        this.updateModel(null, res.videoPath, res.content);
      });
    }
  }
  updateModel($event, value, content) {
    value = (value.startsWith('file://') ? '' : 'file://') + value;
    this.localFile = content;
    this.updateState({
      props: {
        datavalue: value,
        localFilePath: value
      }
    }, this.invokeEventCallback.bind(this, 'onSuccess', [null, this.proxy, value, this.localFile]));
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(CameraConsumer, null, cameraService => {
      {
        this._background;
      }
      this.camera = cameraService;
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, /*#__PURE__*/React.createElement(WmButton, {
        id: this.getTestId('button'),
        iconclass: props.iconclass,
        styles: this.styles.button,
        iconsize: props.iconsize,
        onTap: this.onCameraTap.bind(this),
        accessibilitylabel: props.accessibilitylabel,
        hint: props.hint,
        accessibilityrole: props.accessibilityrole
      }));
    });
  }
}
//# sourceMappingURL=camera.component.js.map
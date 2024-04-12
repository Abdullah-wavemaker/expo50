function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Platform, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmFileuploadProps from './fileupload.props';
import { DEFAULT_CLASS } from './fileupload.styles';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
export class WmFileuploadState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "selectedFiles", void 0);
  }
}
const namedParameters = {
  copyToCacheDirectory: false,
  multiple: false,
  type: '*/*'
};
export default class WmFileupload extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFileuploadProps());
  }
  onTap() {
    DocumentPicker.getDocumentAsync(namedParameters).then(response => {
      let selectedFile;
      if (Platform.OS !== 'web') {
        selectedFile = response;
        selectedFile.type = selectedFile.mimeType;
      } else {
        selectedFile = response.file;
      }
      this.invokeEventCallback('onBeforeselect', [null, this.proxy, selectedFile]);
      this.updateState({
        props: {
          selectedFiles: selectedFile
        }
      }, this.invokeEventCallback.bind(this, 'onSelect', [null, this.proxy, selectedFile]));
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(WmButton, {
      accessibilitylabel: props.accessibilitylabel || props.caption,
      hint: props.hint,
      id: this.getTestId(),
      iconclass: props.iconclass,
      caption: props.caption,
      styles: this.styles.button,
      iconsize: props.iconsize,
      onTap: this.onTap.bind(this)
    }));
  }
}
//# sourceMappingURL=fileupload.component.js.map
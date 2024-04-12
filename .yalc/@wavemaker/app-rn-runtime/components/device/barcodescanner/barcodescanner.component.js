function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { ScanConsumer } from '@wavemaker/app-rn-runtime/core/device/scan-service';
import WmBarcodescannerProps from './barcodescanner.props';
import { DEFAULT_CLASS } from './barcodescanner.styles';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
export class WmBarcodescannerState extends BaseComponentState {}
export default class WmBarcodescanner extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmBarcodescannerProps());
    _defineProperty(this, "scanner", null);
  }
  onScanTap() {
    const params = {
      barcodeFormat: this.state.props.barcodeformat
    };
    this.scanner.scanBarcode(params).then(res => {
      this.updateState({
        props: {
          datavalue: res.text
        }
      }, () => {
        this.invokeEventCallback('onSuccess', [null, this.proxy]);
      });
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(ScanConsumer, null, scanService => {
      this.scanner = scanService;
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, /*#__PURE__*/React.createElement(WmButton, {
        id: this.getTestId('button'),
        iconclass: props.iconclass,
        styles: this.styles.button,
        onTap: this.onScanTap.bind(this),
        caption: props.caption,
        iconsize: props.iconsize,
        accessibilitylabel: props.accessibilitylabel,
        hint: props.hint,
        accessibilityrole: props.accessibilityrole
      }));
    });
  }
}
//# sourceMappingURL=barcodescanner.component.js.map
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import permissionManager from '@wavemaker/app-rn-runtime/runtime/services/device/permissions';
import appDisplayManagerService from '@wavemaker/app-rn-runtime/runtime/services/app-display-manager.service';
const barcodeFormatOptions = {
  'ALL': 'ALL',
  'CODABAR': 'codabar',
  'CODE_39': 'code39',
  'CODE_93': 'code93',
  'CODE_128': 'code128',
  'DATA_MATRIX': 'datamatrix',
  'EAN_8': 'ean8',
  'EAN_13': 'ean13',
  'ITF': 'itf14',
  'PDF_417': 'pdf417',
  'QR_CODE': 'qr',
  'RSS14': 'rss14',
  'RSS_EXPANDED': 'rssexpanded',
  'UPC_E': 'upc_e',
  'UPC_A': 'upc_a'
};
const opacity = 'rgba(0, 0, 0, 0.6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  closeWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32
  },
  topWrapper: {
    flex: 2,
    backgroundColor: opacity
  },
  centerWrapper: {
    flex: 2,
    flexDirection: 'row'
  },
  leftWrapper: {
    flex: 2,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  rightWrapper: {
    flex: 2,
    backgroundColor: opacity
  },
  bottomWrapper: {
    flex: 2,
    backgroundColor: opacity
  }
});
export class ScanService {
  constructor(displayManager) {
    this.displayManager = displayManager;
  }
  getTestProps(suffix) {
    const id = "scan" + (suffix ? '_' + suffix : '');
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      return {
        accessibilityLabel: id,
        testID: id
      };
    }
    return {
      accessible: false,
      testID: id
    };
  }
  scanBarcode(params) {
    const format = (params === null || params === void 0 ? void 0 : params.barcodeFormat) || 'ALL';
    const barcodeFormat = Platform.OS === 'ios' ? undefined : barcodeFormatOptions[format];
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('camera').then(() => {
        const destroy = this.displayManager.show({
          content: /*#__PURE__*/React.createElement(Camera, {
            barCodeScannerSettings: barcodeFormat ? {
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType[barcodeFormat]]
            } : undefined,
            onBarCodeScanned: result => {
              destroy.call(this.displayManager);
              resolve(result);
            },
            style: StyleSheet.absoluteFillObject
          }, /*#__PURE__*/React.createElement(View, {
            style: styles.topWrapper
          }), /*#__PURE__*/React.createElement(View, {
            style: styles.centerWrapper
          }, /*#__PURE__*/React.createElement(View, {
            style: styles.leftWrapper
          }), /*#__PURE__*/React.createElement(View, {
            style: styles.focused
          }), /*#__PURE__*/React.createElement(View, {
            style: styles.rightWrapper
          })), /*#__PURE__*/React.createElement(View, {
            style: styles.bottomWrapper
          }, /*#__PURE__*/React.createElement(View, {
            style: styles.closeWrapper
          }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestProps('close_button'), {
            onPress: () => {
              destroy.call(this.displayManager);
            }
          }), /*#__PURE__*/React.createElement(Ionicons, {
            name: "close-circle",
            size: 48,
            color: "white"
          })))))
        });
      }, reject);
    }).then(response => {
      let format;
      if (response.type) {
        const values = Object.values(BarCodeScanner.Constants.BarCodeType);
        const index = values.indexOf(response.type);
        format = index > -1 ? Object.keys(BarCodeScanner.Constants.BarCodeType)[index] : '';
      }
      return Promise.resolve({
        text: response.data,
        format: format || response.type,
        cancelled: false
      });
    });
  }
}
const scanService = new ScanService(appDisplayManagerService);
export default scanService;
//# sourceMappingURL=scan-service.js.map
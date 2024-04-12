function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import appDisplayManagerService from '@wavemaker/app-rn-runtime/runtime/services/app-display-manager.service';
import WmSpinner from '@wavemaker/app-rn-runtime/components/basic/spinner/spinner.component';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
export class AppSpinnerService {
  constructor(displayManager) {
    this.displayManager = displayManager;
    _defineProperty(this, "displayOptions", {});
    _defineProperty(this, "destroy", void 0);
    _defineProperty(this, "delay", 0);
    _defineProperty(this, "count", 0);
    _defineProperty(this, "image", '');
    _defineProperty(this, "skeleton", false);
    _defineProperty(this, "defaultDisplayOptions", {});
  }
  setImage(path) {
    this.image = path;
  }
  setDefaultOptions(options) {
    this.defaultDisplayOptions = options;
  }
  show() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultDisplayOptions;
    this.skeleton = options.spinner.loader == 'skeleton';
    if (this.count === 0 && !this.destroy) {
      setTimeout(() => {
        const content = /*#__PURE__*/React.createElement(React.Fragment, null, !this.skeleton ? /*#__PURE__*/React.createElement(View, {
          style: [styles.appSpinnerContainer, {
            backgroundColor: ThemeVariables.INSTANCE.pageContentBgColor
          }]
        }, /*#__PURE__*/React.createElement(WmSpinner, {
          caption: options.message || '',
          classname: "global-spinner",
          lottie: options.spinner
        })) : null);
        this.destroy = this.displayManager.show({
          content: content
        });
      }, this.delay);
    }
    this.count++;
  }
  hide() {
    this.skeleton = false;
    if (this.count > 0) {
      this.count--;
    } else {
      this.count = 0;
    }
    if (this.count === 0) {
      setTimeout(() => {
        if (!this.count && this.destroy) {
          this.destroy.call(this.displayManager);
          this.destroy = null;
        }
      }, 300);
    }
  }
}
const styles = {
  appSpinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.8
  }
};
const spinnerService = new AppSpinnerService(appDisplayManagerService);
export default spinnerService;
//# sourceMappingURL=app-spinner.service.js.map
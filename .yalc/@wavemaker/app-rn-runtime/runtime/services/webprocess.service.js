function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import axios from "axios";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import WmWebview from "@wavemaker/app-rn-runtime/components/advanced/webview/webview.component";
import injector from "@wavemaker/app-rn-runtime/core/injector";
import AppDisplayManagerService from "./app-display-manager.service";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class WebProcessWebViewProps {
  constructor() {
    _defineProperty(this, "src", "");
    _defineProperty(this, "process", "");
    _defineProperty(this, "incognito", false);
    _defineProperty(this, "onComplete", null);
  }
}
class WebProcessWebView extends Component {
  constructor(props) {
    super(props);
  }
  getScriptToInject(process) {
    return `(function() {
            var elements = document.querySelectorAll('body.flex>a.link');
            for (var i = 0; i < elements.length; i++) {
                var href = elements[i].href;
                if (href && href.indexOf('://services/webprocess/${process}?process_output=')) {
                    return href.split('process_output=')[1];
                }
            }
            window.isWebLoginProcess = true;
        })()`;
  }
  render() {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        width: windowWidth,
        height: windowHeight
      }
    }, /*#__PURE__*/React.createElement(WmWebview, {
      src: this.props.src,
      incognito: this.props.incognito,
      styles: {
        root: {
          width: '100%',
          height: '100%'
        }
      },
      onLoad: (e, w) => {
        setTimeout(() => {
          w.executeScript(this.getScriptToInject(this.props.process)).then(output => {
            if (output) {
              const onComplete = this.props.onComplete;
              onComplete && onComplete(output);
            }
          });
        }, 1000);
      }
    }));
  }
}
export class WebProcessService {
  constructor() {
    _defineProperty(this, "baseUrl", null);
  }
  execute(process, hookUrl) {
    let useSystemBrowser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let incognito = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (!this.baseUrl) {
      this.baseUrl = injector.get('APP_CONFIG').url;
    }
    return axios.get(this.baseUrl + `/services/webprocess/prepare?processName=${process}&hookUrl=${hookUrl}&requestSourceType=MOBILE`, {
      withCredentials: true
    }).then(response => {
      if (useSystemBrowser) {
        return this.executeWithSystemBrowser(response.data);
      } else {
        return this.executeWithInAppBrowser(response.data, process, incognito);
      }
    }).then(output => {
      return axios.get(this.baseUrl + '/services/webprocess/decode?encodedProcessdata=' + output, {
        withCredentials: true
      });
    });
  }
  executeWithSystemBrowser(processInfo) {
    return Promise.reject('Web Process in System browser is nor ready yet');
  }
  executeWithInAppBrowser(processInfo, process, incognito) {
    return new Promise((resolve, reject) => {
      let destroyFn = () => {};
      destroyFn = AppDisplayManagerService.show({
        content: /*#__PURE__*/React.createElement(WebProcessWebView, {
          src: this.baseUrl + '/services/webprocess/start?process=' + encodeURIComponent(processInfo),
          incognito: incognito,
          process: process,
          onComplete: ouput => {
            resolve(ouput);
            destroyFn.call(AppDisplayManagerService);
          }
        })
      });
    });
  }
}
export default new WebProcessService();
//# sourceMappingURL=webprocess.service.js.map
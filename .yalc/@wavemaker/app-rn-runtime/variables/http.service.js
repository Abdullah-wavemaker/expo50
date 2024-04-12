import axios from 'axios';
import { WS_CONSTANTS } from '@wavemaker/app-rn-runtime/variables/utils/variable.constants';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import injector from '@wavemaker/app-rn-runtime/core/injector';
export class HttpService {
  send(options, variable) {
    var _variable$serviceInfo;
    const serviceInfo = variable.serviceInfo;
    let headers = options.headers,
      requestBody = options.data,
      url = options.url;
    variable.cancelTokenSource = axios.CancelToken.source();
    if (!isWebPreviewMode() && ((variable === null || variable === void 0 || (_variable$serviceInfo = variable.serviceInfo) === null || _variable$serviceInfo === void 0 ? void 0 : _variable$serviceInfo.consumes) || [])[0] === 'multipart/form-data') {
      headers['Content-Type'] = 'multipart/form-data';
      let formData = new FormData();
      (variable.serviceInfo.parameters || []).forEach(p => {
        const v = variable.params[p.name];
        if (v) {
          formData.append(p.name, variable.params[p.name]);
        }
      });
      requestBody = formData;
    }
    if (!isWebPreviewMode() && variable.category === 'wm.LiveVariable' && !(url.startsWith('http://') || url.startsWith("https://"))) {
      options.url = options.url.replace('./', '/');
      url = variable.config.baseUrl + options.url;
    }
    const methodType = (serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.methodType) || options.method.toLowerCase();
    const isNonDataMethod = WS_CONSTANTS.NON_DATA_AXIOS_METHODS.indexOf(methodType.toUpperCase()) > -1;
    const axiosConfig = {
      headers: headers,
      cancelToken: variable.cancelTokenSource.token,
      withCredentials: !isWebPreviewMode() || (options === null || options === void 0 ? void 0 : options.withCredentials) !== false
    };
    return new Promise((resolve, reject) => {
      // @ts-ignore
      axios[methodType].apply(variable, isNonDataMethod ? [url, axiosConfig] : [url, requestBody || {}, axiosConfig]).then(result => {
        resolve(result);
      }, err => {
        reject(err.response);
      });
    });
  }
  sendCall(requestParams, variable) {
    return new Promise((resolve, reject) => {
      this.send(requestParams, variable).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  }
  getLocale() {
    const appConfig = injector.get('APP_CONFIG');
    return appConfig.appLocale.messages;
  }
  cancel(variable) {
    variable.cancelTokenSource.cancel();
  }
  uploadFile(url, data, variable, options) {
    const requestParams = {
      url: url,
      data: data
    };
    return new Promise((resolve, reject) => {
      return this.send(requestParams, variable).then(event => {
        resolve(event.data);
      }, error => {
        reject(error);
      });
    });
  }
}
const httpService = new HttpService();
export default httpService;
//# sourceMappingURL=http.service.js.map
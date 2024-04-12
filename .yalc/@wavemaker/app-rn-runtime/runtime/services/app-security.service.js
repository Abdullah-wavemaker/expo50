function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Platform } from 'react-native';
import axios from 'axios';
import { each, includes } from 'lodash';
import networkService from '@wavemaker/app-rn-runtime/core/network.service';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import StorageService from '@wavemaker/app-rn-runtime/core/storage.service';
import WebProcessService from './webprocess.service';
var USER_ROLE = /*#__PURE__*/function (USER_ROLE) {
  USER_ROLE["EVERYONE"] = "Everyone";
  USER_ROLE["ANONYMOUS"] = "Anonymous";
  USER_ROLE["AUTHENTICATED"] = "Authenticated";
  return USER_ROLE;
}(USER_ROLE || {});
const authCookieStr = 'AUTH_COOKIE';
const XSRF_COOKIE_NAME = 'wm_xsrf_token';
const xsrf_header_name = 'X-WM-XSRF-TOKEN';
class AppSecurityService {
  constructor() {
    _defineProperty(this, "securityConfig", void 0);
    _defineProperty(this, "isLoggedIn", false);
    _defineProperty(this, "loggedInUser", {});
    _defineProperty(this, "token", void 0);
    _defineProperty(this, "appConfig", void 0);
    _defineProperty(this, "baseUrl", '');
    _defineProperty(this, "defaultSecurityConfig", void 0);
    axios.interceptors.request.use(config => this.onBeforeServiceCall(config));
  }
  onBeforeServiceCall(config) {
    if (!this.appConfig) {
      this.appConfig = this.getAppConfig();
      this.baseUrl = this.appConfig.url;
    }
    return this.getXsrfToken().then(token => {
      var _config$url;
      if ((_config$url = config.url) !== null && _config$url !== void 0 && _config$url.startsWith(this.baseUrl) && token) {
        if (config.headers) config.headers[xsrf_header_name] = token;
      }
      return config;
    });
  }
  getXsrfToken() {
    if (this.token) {
      return Promise.resolve(this.token);
    }
    return StorageService.getItem(XSRF_COOKIE_NAME).then(xsrf_token => {
      this.token = xsrf_token;
      return this.token;
    });
  }
  getAppConfig() {
    return injector.get('APP_CONFIG');
  }
  navigateToLandingPage(details) {
    var _this$appConfig$curre, _details$userInfo;
    (_this$appConfig$curre = this.appConfig.currentPage) === null || _this$appConfig$curre === void 0 ? void 0 : _this$appConfig$curre.goToPage(((_details$userInfo = details.userInfo) === null || _details$userInfo === void 0 ? void 0 : _details$userInfo.landingPage) || 'Main', null, true);
  }
  appLogin(options) {
    // encode all parameters
    let payload = '';
    each(options.formData, function (value, name) {
      payload += (payload ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
    });
    axios.defaults.withCredentials = true;
    return axios.post(options.baseURL + '/j_spring_security_check', payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      const xsrfCookieValue = response.data ? response.data[XSRF_COOKIE_NAME] : '';
      this.token = xsrfCookieValue;
      StorageService.setItem(XSRF_COOKIE_NAME, xsrfCookieValue);
      this.isLoggedIn = true;
    }).then(() => this.load(options.baseURL)).then(async () => {
      const userData = await this.getLoggedInUserDetails(options.baseURL, options.useDefaultSuccessHandler);
      await this.appConfig.app.triggerStartUpVariables();
      return userData;
    });
  }
  load(baseURL) {
    return Promise.resolve().then(() => {
      if (networkService.isConnected()) {
        return axios.get(baseURL + '/services/security/info').then(response => response.data);
      }
      return this.appConfig.getServiceDefinitions(this.appConfig.url).then(() => Promise.resolve(this.defaultSecurityConfig));
    }).then(details => {
      const loggedInUser = {};
      this.securityConfig = details;
      const appConfig = this.appConfig;
      if (typeof details !== 'string' && (!details.securityEnabled || details.authenticated)) {
        if (details.authenticated) {
          loggedInUser.isAuthenticated = details.authenticated;
          loggedInUser.isSecurityEnabled = details.authenticated;
          loggedInUser.roles = details.userInfo.userRoles;
          loggedInUser.name = details.userInfo.userName;
          loggedInUser.id = details.userInfo.userId;
          loggedInUser.tenantId = details.userInfo.tenantId;
          loggedInUser.userAttributes = details.userInfo.userAttributes;
          appConfig.loggedInUser = loggedInUser;
          this.loggedInUser.dataSet = loggedInUser;
        }
        return appConfig.getServiceDefinitions(appConfig.url).then(() => {
          return details;
        });
      } else {
        return appConfig.getServiceDefinitions(appConfig.url).then(() => {
          this.redirectToLogin();
        });
      }
    });
  }
  getLoggedInUserDetails(baseURL) {
    let useDefaultSuccessHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!baseURL) {
      this.loggedInUser = {};
      return Promise.resolve({});
    }
    return this.load(baseURL);
  }
  redirectToLogin() {
    var _this$securityConfig;
    if (((_this$securityConfig = this.securityConfig) === null || _this$securityConfig === void 0 || (_this$securityConfig = _this$securityConfig.loginConfig) === null || _this$securityConfig === void 0 ? void 0 : _this$securityConfig.type) === 'SSO') {
      const authUrl = this.appConfig.url + '/services/security/ssologin';
      if (Platform.OS === 'web') {
        (window.parent || window).location.href = authUrl;
      } else {
        setTimeout(() => {
          WebProcessService.execute('LOGIN', '/services/security/ssologin', false, true).then(output => {
            if (output) {
              return JSON.parse(output.data && output.data.replace(/&quot;/g, "\""));
            }
            return Promise.reject();
          }).then(output => {
            if (output[XSRF_COOKIE_NAME]) {
              this.token = output[XSRF_COOKIE_NAME];
              StorageService.setItem(XSRF_COOKIE_NAME, output[XSRF_COOKIE_NAME]);
            }
          }).then(() => {
            this.appConfig.refresh(true);
          }).then(() => this.load(this.baseUrl)).then(() => {
            return this.getLoggedInUserDetails(this.baseUrl);
          });
        }, 1000);
      }
    } else {
      var _this$securityConfig$, _this$appConfig$curre2;
      const loginPage = ((_this$securityConfig$ = this.securityConfig.loginConfig) === null || _this$securityConfig$ === void 0 ? void 0 : _this$securityConfig$.pageName) || 'Login';
      injector.get('APP_CONFIG').landingPage = loginPage;
      (_this$appConfig$curre2 = this.appConfig.currentPage) === null || _this$appConfig$curre2 === void 0 ? void 0 : _this$appConfig$curre2.goToPage(loginPage, null, true);
    }
    this.appConfig.refresh();
  }
  appLogout(options) {
    return axios.post(options.baseURL + '/j_spring_security_logout', null, {
      withCredentials: true
    }).catch(() => {}).then(() => {
      this.isLoggedIn = false;
      this.redirectToLogin();
    });
  }
  canUserAccessPage(pageName) {
    var _this$securityConfig2;
    if (this.baseUrl && (_this$securityConfig2 = this.securityConfig) !== null && _this$securityConfig2 !== void 0 && _this$securityConfig2.isSecurityEnabled) {
      return axios.get(this.baseUrl + `/pages/${pageName}/${pageName}.html`).catch(res => res).then(res => res.status === 200 || res.status === 304);
    } else {
      return Promise.resolve(true);
    }
  }
  matchRoles(widgetRoles, userRoles) {
    return widgetRoles.some(function (item) {
      return includes(userRoles, item);
    });
  }
  hasAccessToWidget(widgetRoles) {
    var _this$loggedInUser$da, _this$loggedInUser$da2, _this$loggedInUser$da3, _this$loggedInUser$da4;
    const widgetRolesArr = widgetRoles.split(',');
    // access the widget when 'Everyone' is chosen
    if (includes(widgetRolesArr, USER_ROLE.EVERYONE)) {
      return true;
    }

    // access the widget when 'Anonymous' is chosen and user is not authenticated
    if (includes(widgetRolesArr, USER_ROLE.ANONYMOUS) && !((_this$loggedInUser$da = this.loggedInUser.dataSet) !== null && _this$loggedInUser$da !== void 0 && _this$loggedInUser$da.isAuthenticated)) {
      return true;
    }

    // access the widget when 'Only Authenticated Users' is chosen and user is authenticated
    if (includes(widgetRolesArr, USER_ROLE.AUTHENTICATED) && (_this$loggedInUser$da2 = this.loggedInUser.dataSet) !== null && _this$loggedInUser$da2 !== void 0 && _this$loggedInUser$da2.isAuthenticated) {
      return true;
    }

    // access the widget when widget role and logged in user role matches
    return ((_this$loggedInUser$da3 = this.loggedInUser.dataSet) === null || _this$loggedInUser$da3 === void 0 ? void 0 : _this$loggedInUser$da3.isAuthenticated) && this.matchRoles(widgetRolesArr, (_this$loggedInUser$da4 = this.loggedInUser.dataSet) === null || _this$loggedInUser$da4 === void 0 ? void 0 : _this$loggedInUser$da4.roles);
  }
}
const appSecurityService = new AppSecurityService();
export default appSecurityService;
//# sourceMappingURL=app-security.service.js.map
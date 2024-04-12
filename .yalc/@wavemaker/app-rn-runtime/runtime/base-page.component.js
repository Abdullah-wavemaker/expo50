function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { clone, isEqual } from 'lodash';
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import { NavigationServiceProvider } from '@wavemaker/app-rn-runtime/core/navigation.service';
import AppSecurityService from './services/app-security.service';
import AppSpinnerService from './services/app-spinner.service';
import BaseFragment from './base-fragment.component';
import { Watcher } from './watcher';
export default class BasePage extends BaseFragment {
  constructor(props) {
    var _this$appConfig$drawe;
    super(props);
    _defineProperty(this, "pageName", null);
    _defineProperty(this, "pageParams", {});
    _defineProperty(this, "hasDrawer", false);
    _defineProperty(this, "hasTabbar", false);
    _defineProperty(this, "drawerContent", null);
    _defineProperty(this, "drawerType", '');
    this.pageName = props.route.name;
    this.pageParams = props.route.params;
    this.appConfig.currentPage = this;
    (_this$appConfig$drawe = this.appConfig.drawer) === null || _this$appConfig$drawe === void 0 ? void 0 : _this$appConfig$drawe.setContent(null);
    this.serviceDefinitions = this.App.serviceDefinitions;
    this.watcher = Watcher.ROOT.create();
    AppSecurityService.canUserAccessPage(this.pageName).then(flag => {
      if (!flag) {
        this.cache = false;
        AppSecurityService.redirectToLogin();
      }
    });
  }
  onComponentInit(w) {
    super.onComponentInit(w);
    if (w instanceof WmPage) {
      this.targetWidget = w;
      const props = w.props;
      this.cache = !(props.cache === false);
      this.refreshdataonattach = !(props.refreshdataonattach === false);
    }
  }
  toggleDrawer() {
    this.props.navigation.toggleDrawer();
  }
  setDrawerContent() {
    let content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.drawerContent;
    let drawerType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.drawerType;
    if (!content) {
      return;
    }
    this.drawerContent = content;
    this.drawerType = drawerType;
    this.hasDrawer = true;
    setTimeout(() => {
      if (this.appConfig.currentPage === this || this.appConfig.currentPage.proxy === this) {
        var _this$appConfig$drawe2, _this$appConfig$drawe4;
        (_this$appConfig$drawe2 = this.appConfig.drawer) === null || _this$appConfig$drawe2 === void 0 ? void 0 : _this$appConfig$drawe2.setContent(null);
        setTimeout(() => {
          var _this$appConfig$drawe3;
          (_this$appConfig$drawe3 = this.appConfig.drawer) === null || _this$appConfig$drawe3 === void 0 ? void 0 : _this$appConfig$drawe3.setContent( /*#__PURE__*/React.createElement(NavigationServiceProvider, {
            value: this
          }, content));
        }, 500);
        (_this$appConfig$drawe4 = this.appConfig.drawer) === null || _this$appConfig$drawe4 === void 0 ? void 0 : _this$appConfig$drawe4.setAnimation(drawerType);
      }
    }, 10);
  }
  onAttach() {
    super.onAttach();
    this.setDrawerContent();
  }
  onFragmentReady() {
    return super.onFragmentReady().then(() => {
      this.onContentReady();
      this.App.onPageReady(this.pageName, this.proxy);
      AppSpinnerService.hide();
      this.cleanup.push(this.props.navigation.addListener('focus', () => {
        if (this.appConfig.currentPage !== this) {
          this.appConfig.currentPage = this;
          this.onAttach();
          this.appConfig.refresh();
        }
      }));
    });
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  goToPage(pageName, params) {
    let clearCahe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const navigation = this.props.navigation;
    const _params = clone(params);
    _params && delete _params['pageName'];
    if (pageName !== this.pageName || !isEqual(_params, this.pageParams)) {
      if (pageName === this.pageName) {
        navigation.push(pageName, _params);
      } else if (clearCahe) {
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{
            name: pageName,
            params: params
          }]
        }));
      } else {
        navigation.navigate(pageName, _params);
      }
      if (this.cache) {
        this.onDetach();
      } else {
        this.props.destroyMe();
      }
    } else {
      this.props.navigation.closeDrawer();
    }
    return Promise.resolve();
  }
  goBack() {
    const navigation = this.props.navigation;
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (window && window.history) {
      window.history.back();
    }
    return Promise.resolve();
  }
  openUrl(url) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (url) {
      if (url.startsWith('#')) {
        url = url.substring(1);
        url = url.startsWith('/') ? url.substring(1) : url;
        const splits = url.split('?');
        const pageName = splits[0];
        let params = {};
        if (splits.length > 1) {
          splits[1].split('&').map(p => p.split('=')).forEach(p => params[p[0]] = p[1]);
        }
        return this.goToPage(pageName, params);
      } else {
        this.App.openBrowser(url, params);
      }
    }
    return Promise.resolve();
  }
  isActiveTabbarItem(_ref) {
    let {
      label,
      link,
      links
    } = _ref;
    const pageName = this.pageName;
    const possibleLinks = [pageName, '#' + pageName, '#/' + pageName];
    return links && links.find(l => possibleLinks.includes(l));
  }
  renderWidget(props) {
    return this.renderPage();
  }
}
//# sourceMappingURL=base-page.component.js.map
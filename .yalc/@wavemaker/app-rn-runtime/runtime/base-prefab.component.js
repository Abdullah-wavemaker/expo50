var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { merge } from 'lodash-es';
import { PartialProvider } from '@wavemaker/app-rn-runtime/core/partial.service';
import WmPrefabContainer from '@wavemaker/app-rn-runtime/components/prefab/prefab-container.component';
import BaseFragment from './base-fragment.component';
import axios from 'axios';
export default class BasePrefab extends BaseFragment {
  constructor(props, defualtProps, partialService) {
    super(props, defualtProps);
    this.partialService = partialService;
    _defineProperty(this, "appUrl", '');
    _defineProperty(this, "prefabParams", {});
    _defineProperty(this, "_renderPrefab", null);
    this.App = this.appConfig.app;
    this.Actions = {};
    this.Variables = {};
    this.appUrl = this.appConfig.url;
    this.resourceBaseUrl = `${this.baseUrl}/app/prefabs/${props.prefabname}`;
    this.baseUrl = `${this.baseUrl}/prefabs/${props.prefabname}`;
    this.watcher = props.parentWatcher.create();
  }
  getServiceDefinitions() {
    return BasePrefab.getServiceDefinitions(this.props.prefabname, `${this.appUrl}/services/prefabs/${this.props.prefabname}`);
  }
  onComponentInit(w) {
    super.onComponentInit(w);
    if (w instanceof WmPrefabContainer) {
      this.targetWidget = w;
    }
  }
  onFragmentReady() {
    this._renderPrefab = () => {
      const component = this.renderPrefab();
      super.onFragmentReady().then(() => {
        this.onContentReady();
        this.invokeEventCallback('onLoad', [null, this]);
      });
      this._renderPrefab = () => this.renderPrefab();
      return component;
    };
    this.refresh();
    return Promise.resolve();
  }
  resetAppLocale() {
    this.appLocale = merge({}, this.appConfig.appLocale.messages, this.appConfig.appLocale.prefabMessages[this.props.prefabname]);
    Object.values(this.fragments).forEach(f => f.resetAppLocale());
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.invokeEventCallback('onDestroy', [null, this]);
  }
  renderWidget(props) {
    var _props$styles;
    return /*#__PURE__*/React.createElement(PartialProvider, {
      value: this.partialService
    }, /*#__PURE__*/React.createElement(View, {
      style: [{
        width: '100%'
      }, (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.root]
    }, this._renderPrefab ? this._renderPrefab() : null));
  }
}
_class = BasePrefab;
_defineProperty(BasePrefab, "SERVICE_DEFINITION_CACHE", {});
_defineProperty(BasePrefab, "getServiceDefinitions", (prefabName, url) => {
  const defs = _class.SERVICE_DEFINITION_CACHE[prefabName];
  if (defs) {
    return Promise.resolve(defs);
  } else {
    return axios.get(url + '/servicedefs').catch(() => ({})).then(response => {
      var _response$data;
      const serviceDefinitions = (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.serviceDefs) || {};
      _class.SERVICE_DEFINITION_CACHE[prefabName] = serviceDefinitions;
      return Promise.resolve(serviceDefinitions);
    });
  }
});
//# sourceMappingURL=base-prefab.component.js.map
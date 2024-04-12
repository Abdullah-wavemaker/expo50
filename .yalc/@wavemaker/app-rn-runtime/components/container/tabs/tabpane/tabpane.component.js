function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmTabpaneProps from './tabpane.props';
import { DEFAULT_CLASS } from './tabpane.styles';
export class WmTabpaneState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
    _defineProperty(this, "isActive", false);
  }
}
export default class WmTabpane extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTabpaneProps(), new WmTabpaneState());
    this.subscribe('scroll', event => {
      return this.state.isActive;
    });
  }
  onPartialLoad() {
    this.invokeEventCallback('onLoad', [null, this]);
  }
  renderContent(props) {
    if (props.renderPartial) {
      if (!this.state.isPartialLoaded) {
        setTimeout(() => {
          this.updateState({
            isPartialLoaded: true
          });
        });
      }
      return props.renderPartial(props, this.onPartialLoad.bind(this));
    }
    return props.children;
  }
  showView() {
    return this.isVisible() && this.state.isActive;
  }
  componentDidMount() {
    const tabs = this.parent;
    tabs.addTabPane(this.proxy);
    super.componentDidMount();
  }
  _onSelect() {
    this.updateState({
      isActive: true
    });
    this.invokeEventCallback('onSelect', [null, this.proxy]);
  }
  _onDeselect() {
    this.updateState({
      isActive: false
    });
    this.invokeEventCallback('onDeselect', [null, this.proxy]);
  }
  select() {
    this.parent.selectTabPane(this);
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, this.renderContent(props));
  }
}
//# sourceMappingURL=tabpane.component.js.map
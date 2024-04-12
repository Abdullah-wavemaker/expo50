function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmAccordionpaneProps from './accordionpane.props';
import { DEFAULT_CLASS } from './accordionpane.styles';
import { View } from 'react-native';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import { CollapsiblePane } from '../../panel/collapsible-pane.component';
export class WmAccordionpaneState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
    _defineProperty(this, "collapsed", true);
  }
}
export default class WmAccordionpane extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAccordionpaneProps(), new WmAccordionpaneState());
  }
  isCollapsed() {
    return this.state.collapsed;
  }
  show() {
    this.updateState({
      collapsed: false
    });
    this.invokeEventCallback('onExpand', [null, this.proxy]);
  }
  hide() {
    this.updateState({
      collapsed: true
    });
    this.invokeEventCallback('onCollapse', [null, this.proxy]);
  }
  expand() {
    this.parent.expand(this.props.name || '');
  }
  collapse() {
    this.parent.expand(this.props.name || '');
  }
  componentDidMount() {
    const accordion = this.parent;
    accordion.addAccordionPane(this);
    super.componentDidMount();
  }
  onPartialLoad() {
    this.invokeEventCallback('onLoad', [this]);
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
  renderWidget(props) {
    return isWebPreviewMode() ? /*#__PURE__*/React.createElement(View, {
      style: this.state.collapsed ? {
        maxHeight: 0,
        overflow: 'hidden'
      } : {}
    }, this._background, this.renderContent(props)) : /*#__PURE__*/React.createElement(CollapsiblePane, {
      close: this.state.collapsed
    }, this._background, this.renderContent(props));
  }
}
//# sourceMappingURL=accordionpane.component.js.map
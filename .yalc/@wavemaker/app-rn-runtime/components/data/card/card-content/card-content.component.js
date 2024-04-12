function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCardContentProps from './card-content.props';
import { DEFAULT_CLASS } from './card-content.styles';
export class WmCardContentState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
  }
}
export default class WmCardContent extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCardContentProps());
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
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, this.renderContent(props));
  }
}
//# sourceMappingURL=card-content.component.js.map
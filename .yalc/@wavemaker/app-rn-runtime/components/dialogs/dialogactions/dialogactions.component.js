function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmDialogactionsProps from './dialogactions.props';
import { DEFAULT_CLASS } from './dialogactions.styles';
export class WmDialogactionsState extends BaseComponentState {}
export default class WmDialogactions extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmDialogactionsProps());
    _defineProperty(this, "__TYPE", 'WmDialogactions');
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=dialogactions.component.js.map
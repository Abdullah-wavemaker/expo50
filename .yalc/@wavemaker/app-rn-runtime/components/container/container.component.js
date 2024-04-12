function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import WmContainerProps from './container.props';
import { DEFAULT_CLASS } from './container.styles';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { PartialHost, PartialHostState } from './partial-host.component';
export class WmContainerState extends PartialHostState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
  }
}
export default class WmContainer extends PartialHost {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmContainerProps(), new WmContainerState());
  }
  renderWidget(props) {
    const dimensions = {
      width: this.styles.root.width ? '100%' : undefined,
      height: this.styles.root.height ? '100%' : undefined
    };
    return /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this,
      styles: dimensions
    }), /*#__PURE__*/React.createElement(View, {
      style: [dimensions, this.styles.content]
    }, this.renderContent(props))));
  }
}
//# sourceMappingURL=container.component.js.map
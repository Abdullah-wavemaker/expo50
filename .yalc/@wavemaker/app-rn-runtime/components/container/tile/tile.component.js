function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmTileProps from './tile.props';
import { DEFAULT_CLASS } from './tile.styles';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
export class WmTileState extends BaseComponentState {}
export default class WmTile extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTileProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this
    }), /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: this.styles.root
    }, this._background, props.children));
  }
}
//# sourceMappingURL=tile.component.js.map
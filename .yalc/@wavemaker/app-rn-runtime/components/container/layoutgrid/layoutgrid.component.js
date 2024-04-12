import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLayoutgridProps from './layoutgrid.props';
import { DEFAULT_CLASS } from './layoutgrid.styles';
export class WmLayoutgridState extends BaseComponentState {}
export default class WmLayoutgrid extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLayoutgridProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=layoutgrid.component.js.map
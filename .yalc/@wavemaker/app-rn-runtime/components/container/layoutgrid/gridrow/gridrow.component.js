import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmGridrowProps from './gridrow.props';
import { DEFAULT_CLASS } from './gridrow.styles';
export class WmGridrowState extends BaseComponentState {}
export default class WmGridrow extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmGridrowProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=gridrow.component.js.map
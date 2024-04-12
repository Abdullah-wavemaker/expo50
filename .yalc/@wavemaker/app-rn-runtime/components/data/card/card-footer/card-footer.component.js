import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCardFooterProps from './card-footer.props';
import { DEFAULT_CLASS } from './card-footer.styles';
export class WmCardFooterState extends BaseComponentState {}
export default class WmCardFooter extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCardFooterProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=card-footer.component.js.map
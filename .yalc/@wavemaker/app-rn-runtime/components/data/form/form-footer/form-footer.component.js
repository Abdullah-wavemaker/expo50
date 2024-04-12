import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmFormFooterProps from './form-footer.props';
import { DEFAULT_CLASS } from './form-footer.styles';
export class WmFormFooterState extends BaseComponentState {}
export default class WmFormFooter extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFormFooterProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=form-footer.component.js.map
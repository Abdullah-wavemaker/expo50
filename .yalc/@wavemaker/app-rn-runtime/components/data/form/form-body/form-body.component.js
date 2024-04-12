import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmFormBodyProps from './form-body.props';
import { DEFAULT_CLASS } from './form-body.styles';
export class WmFormBodyState extends BaseComponentState {}
export default class WmFormBody extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFormBodyProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=form-body.component.js.map
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { DEFAULT_CLASS } from './partial.styles';
export class WmPartialState extends BaseComponentState {}
export default class WmPartial extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS);
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=partial.component.js.map
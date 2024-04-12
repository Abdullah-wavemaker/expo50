import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmPanelContentProps from './panel-content.props';
import { DEFAULT_CLASS } from './panel-content.styles';
export class WmPanelContentState extends BaseComponentState {}
export default class WmPanelContent extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPanelContentProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=panel-content.component.js.map
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmPanelFooterProps from './panel-footer.props';
import { DEFAULT_CLASS } from './panel-footer.styles';
export class WmPanelFooterState extends BaseComponentState {}
export default class WmPanelFooter extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPanelFooterProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=panel-footer.component.js.map
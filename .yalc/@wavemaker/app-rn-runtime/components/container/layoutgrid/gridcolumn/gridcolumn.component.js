import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmGridcolumnProps from './gridcolumn.props';
import { DEFAULT_CLASS } from './gridcolumn.styles';
export class WmGridcolumnState extends BaseComponentState {}
export default class WmGridcolumn extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmGridcolumnProps());
  }
  renderWidget(props) {
    if (this.styles.root.height) {
      this.styles.root.overflow = undefined;
    }
    const styles = this.theme.getStyle(`col-xs-${props.xscolumnwidth}  col-sm-${props.columnwidth}`);
    return /*#__PURE__*/React.createElement(View, {
      style: [{
        width: "100%"
      }, styles.root, this.styles.root]
    }, this._background, props.children);
  }
}
//# sourceMappingURL=gridcolumn.component.js.map
import React from 'react';
import { View, Platform } from 'react-native';
import { isNil } from 'lodash-es';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLinearlayoutitemProps from './linearlayoutitem.props';
import { DEFAULT_CLASS } from './linearlayoutitem.styles';
export class WmLinearlayoutitemState extends BaseComponentState {}
export default class WmLinearlayoutitem extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLinearlayoutitemProps());
  }
  renderWidget(props) {
    const direction = this.parent.state.props.direction;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        ...this.styles.root,
        flexGrow: props.flexgrow,
        flexShrink: isNil(props.flexshrink) ? props.flexgrow : props.flexshrink,
        flexBasis: Platform.OS == "web" ? 'auto' : props.flexgrow && (direction === 'row' || direction === 'row-reverse') ? 0 : 'auto'
      }
    }, this._background, props.children);
  }
}
//# sourceMappingURL=linearlayoutitem.component.js.map
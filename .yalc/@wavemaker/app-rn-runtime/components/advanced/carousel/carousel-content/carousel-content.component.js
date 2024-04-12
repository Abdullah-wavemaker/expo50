import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCarouselContentProps from './carousel-content.props';
import { DEFAULT_CLASS } from './carousel-content.styles';
export class WmCarouselContentState extends BaseComponentState {}
export default class WmCarouselContent extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCarouselContentProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=carousel-content.component.js.map
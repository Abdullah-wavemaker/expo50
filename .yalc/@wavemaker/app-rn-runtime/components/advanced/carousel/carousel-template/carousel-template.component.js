import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCarouselTemplateProps from './carousel-template.props';
import { DEFAULT_CLASS } from './carousel-template.styles';
export class WmCarouselTemplateState extends BaseComponentState {}
export default class WmCarouselTemplate extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCarouselTemplateProps());
  }
  renderWidget(props) {
    var _this$parent;
    return /*#__PURE__*/React.createElement(View, {
      style: [this.styles.root, {
        height: this.styles.root.height || ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.styles.root.height) && '100%'
      }]
    }, this._background, props.children);
  }
}
//# sourceMappingURL=carousel-template.component.js.map
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmButtongroupProps from './buttongroup.props';
import { DEFAULT_CLASS } from './buttongroup.styles';
import { createSkeleton } from '../skeleton/skeleton.component';
export class WmButtongroupState extends BaseComponentState {}
export default class WmButtongroup extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmButtongroupProps());
  }
  renderSkeleton(props) {
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      width: this.props.skeletonwidth || this.styles.root.width,
      height: this.props.skeletonheight || this.styles.root.height
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: [this.styles.root, {
        flexDirection: props.vertical ? 'column' : 'row'
      }]
    }, this._background, props.children);
  }
}
//# sourceMappingURL=buttongroup.component.js.map
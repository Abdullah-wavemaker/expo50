import React from 'react';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmCustomProps from './custom.props';
import { DEFAULT_CLASS } from './custom.styles';
import { View } from 'react-native';
import { createSkeleton } from '../skeleton/skeleton.component';
export class WmCustomState extends BaseComponentState {}
export default class WmCustom extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCustomProps(), new WmCustomState());
  }
  renderSkeleton(prop) {
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      width: this.props.skeletonwidth || this.styles.root.width,
      height: this.props.skeletonheight || this.styles.root.height
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, props.renderview(props));
  }
}
//# sourceMappingURL=custom.component.js.map
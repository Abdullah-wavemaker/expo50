import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLinearlayoutProps from './linearlayout.props';
import { DEFAULT_CLASS } from './linearlayout.styles';
const ALIGNMENT_MAP = {
  'top': 'flex-start',
  'left': 'flex-start',
  'center': 'center',
  'right': 'flex-end',
  'bottom': 'flex-end'
};
export class WmLinearlayoutState extends BaseComponentState {}
export default class WmLinearlayout extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLinearlayoutProps());
  }
  getStyles(props) {
    const s = {};
    const direction = props.direction;
    s.display = 'flex';
    s.width = "100%";
    s.flexDirection = direction;
    const isHorizontal = direction.startsWith('row');
    if (isHorizontal) {
      s.justifyContent = ALIGNMENT_MAP[props.horizontalalign];
      s.alignItems = ALIGNMENT_MAP[props.verticalalign];
    } else {
      s.justifyContent = ALIGNMENT_MAP[props.verticalalign];
      s.alignItems = ALIGNMENT_MAP[props.horizontalalign];
    }
    return s;
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        ...this.getStyles(props),
        ...this.styles.root
      }
    }, this._background, props.children);
  }
}
//# sourceMappingURL=linearlayout.component.js.map
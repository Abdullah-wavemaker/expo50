import React from 'react';
import { View } from 'react-native';
import { isNil } from 'lodash';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmListTemplateProps from './list-template.props';
import { DEFAULT_CLASS } from './list-template.styles';
export class WmListTemplateState extends BaseComponentState {}
export default class WmListTemplate extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmListTemplateProps());
  }
  renderWidget(props) {
    var _style;
    const list = this.parent;
    const listProps = list.state.props;
    const isHorizontalList = listProps.direction === 'horizontal';
    const noOfCols = list.getNoOfColumns();
    let style = this.theme.getStyle(isHorizontalList ? 'horizontal-list-template' : 'vertical-list-template');
    if (isNil(style['flex']) && !isHorizontalList && noOfCols === 1) {
      style = this.theme.mergeStyle({
        root: {
          flex: 1
        }
      }, style);
    }
    return /*#__PURE__*/React.createElement(View, {
      style: [this.styles.root, (_style = style) === null || _style === void 0 ? void 0 : _style.root]
    }, this._background, props.children);
  }
}
//# sourceMappingURL=list-template.component.js.map
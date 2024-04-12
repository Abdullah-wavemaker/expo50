import React from 'react';
import { ScrollView } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmDialogcontentProps from './dialogcontent.props';
import { DEFAULT_CLASS } from './dialogcontent.styles';
export class WmDialogcontentState extends BaseComponentState {}
export default class WmDialogcontent extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmDialogcontentProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(ScrollView, {
      contentContainerStyle: [this.styles.root, {
        maxHeight: undefined
      }],
      onScroll: event => {
        this.notify('scroll', [event]);
      },
      scrollEventThrottle: 48,
      style: {
        maxHeight: this.styles.root.maxHeight
      }
    }, this._background, props.children);
  }
}
//# sourceMappingURL=dialogcontent.component.js.map
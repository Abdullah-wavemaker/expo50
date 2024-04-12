import React from 'react';
import { View, Modal as ReactModal } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmModalProps from './modal.props';
import { DEFAULT_CLASS } from './modal.styles';
export class WmModalState extends BaseComponentState {}
export default class WmModal extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmModalProps());
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, /*#__PURE__*/React.createElement(ReactModal, {
      animationType: props.animationType,
      transparent: true,
      //@ts-ignore
      style: this.styles.content
    }, props.children));
  }
}
//# sourceMappingURL=modal.component.js.map
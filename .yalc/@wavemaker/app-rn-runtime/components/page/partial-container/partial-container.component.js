import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmPartialContainerProps from './partial-container.props';
import { DEFAULT_CLASS } from './partial-container.styles';
import { HideMode } from '@wavemaker/app-rn-runtime/core/if.component';
import { PartialConsumer } from '@wavemaker/app-rn-runtime/core/partial.service';
export class WmPartialContainerState extends BaseComponentState {}
export default class WmPartialContainer extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPartialContainerProps());
    this.hideMode = HideMode.DONOT_ADD_TO_DOM;
  }
  renderWidget(props) {
    const params = {};
    Object.keys(this.props).forEach(k => {
      //@ts-ignore
      params[k] = props[k];
    });
    params.parent = this.parent;
    params['name'] = params['partial_name'];
    delete params['partial_name'];
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(PartialConsumer, null, partialService => {
      const partial = partialService.get(props.content);
      return partial ? /*#__PURE__*/React.createElement(partial, params) : null;
    }));
  }
}
//# sourceMappingURL=partial-container.component.js.map
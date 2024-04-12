import React from 'react';
import { ScrollView, View } from 'react-native';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import { HideMode } from '@wavemaker/app-rn-runtime/core/if.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmPageContentProps from './page-content.props';
import { DEFAULT_CLASS } from './page-content.styles';
export class WmPageContentState extends BaseComponentState {}
export default class WmPageContent extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPageContentProps());
    this.hideMode = HideMode.DONOT_ADD_TO_DOM;
  }
  renderWidget(props) {
    const showScrollbar = this.styles.root.scrollbarColor != 'transparent';
    return props.scrollable || isWebPreviewMode() ? /*#__PURE__*/React.createElement(View, {
      style: {
        height: '100%',
        width: '100%',
        backgroundColor: this.styles.root.backgroundColor
      }
    }, this._background, /*#__PURE__*/React.createElement(ScrollView, {
      contentContainerStyle: [this.styles.root, {
        backgroundColor: 'transparent'
      }],
      showsVerticalScrollIndicator: showScrollbar,
      onScroll: event => {
        this.notify('scroll', [event]);
      },
      scrollEventThrottle: 48
    }, props.children)) : /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=page-content.component.js.map
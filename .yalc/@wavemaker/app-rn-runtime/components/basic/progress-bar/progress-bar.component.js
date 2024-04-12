function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmProgressBarProps from './progress-bar.props';
import { DEFAULT_CLASS } from './progress-bar.styles';
export class WmProgressBarState extends BaseComponentState {}
export default class WmProgressBar extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmProgressBarProps());
  }
  renderWidget(props) {
    let value = (props.datavalue - props.minvalue) / (props.maxvalue - props.minvalue);
    const styles = this.theme.mergeStyle(this.theme.getStyle(`app-${props.type}-progress-bar`), this.styles);
    return /*#__PURE__*/React.createElement(View, {
      style: styles.root
    }, this._background, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this,
      styles: {
        root: {
          width: '100%',
          height: '100%'
        }
      }
    }), /*#__PURE__*/React.createElement(ProgressBar, _extends({}, getAccessibilityProps(AccessibilityWidgetType.PROGRESSBAR, props), {
      progress: value,
      color: styles.progressValue.color,
      style: [styles.progressBar, {
        height: styles.root.height || styles.progressBar.height
      }]
    }))));
  }
}
//# sourceMappingURL=progress-bar.component.js.map
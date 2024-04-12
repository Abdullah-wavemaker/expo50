function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text } from 'react-native';
import { Badge } from 'react-native-paper';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { encodeUrl } from '@wavemaker/app-rn-runtime/core/utils';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { NavigationServiceConsumer } from '@wavemaker/app-rn-runtime/core/navigation.service';
import WmAnchorProps from './anchor.props';
import { DEFAULT_CLASS } from './anchor.styles';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { createSkeleton } from '../skeleton/skeleton.component';
export class WmAnchorState extends BaseComponentState {}
export default class WmAnchor extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAnchorProps());
  }
  onTap(navigationService, e) {
    const props = this.state.props;
    if (props.hyperlink) {
      const link = props.encodeurl ? encodeUrl(props.hyperlink) : props.hyperlink;
      navigationService.openUrl(link, {
        target: this.state.props.target
      });
    }
    this.invokeEventCallback('onTap', [e, this.proxy]);
  }
  renderSkeleton(props) {
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      width: this.props.skeletonwidth || this.styles.root.width,
      height: this.props.skeletonheight || this.styles.root.height
    });
  }
  renderWidget(props) {
    const {
      iconclass,
      iconurl,
      name,
      iconheight,
      iconmargin,
      iconwidth,
      badgevalue
    } = props;
    if (this.styles.icon && this.styles.icon.text) {
      this.styles.icon.text.color = this.styles.text.color;
    }
    const icon = (iconclass || iconurl) && /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon'),
      styles: this.styles.icon,
      name: name + '_icon',
      iconclass: iconclass,
      iconurl: iconurl,
      iconheight: iconheight,
      iconmargin: iconmargin,
      iconwidth: iconwidth
    });
    //@ts-ignore
    const badge = badgevalue != undefined ? /*#__PURE__*/React.createElement(Badge, {
      style: this.styles.badge
    }, badgevalue) : null;
    return /*#__PURE__*/React.createElement(NavigationServiceConsumer, null, navigationService => /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: {
        width: this.styles.root.width,
        height: this.styles.root.height,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this,
      styles: [this.styles.root, this.styles.root.width && this.styles.root.height ? {
        width: '100%',
        height: '100%'
      } : null, {
        flexDirection: props.iconposition === 'top' ? 'column' : 'row'
      }],
      onTap: props.hyperlink || props.onTap ? e => this.onTap(navigationService, e) : undefined
    }), this._background, props.iconposition === 'top' && icon, props.iconposition === 'left' && icon, props.caption ? /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.text
    }, this.getTestPropsForLabel('caption'), getAccessibilityProps(AccessibilityWidgetType.ANCHOR, props), {
      numberOfLines: props.nooflines
    }), props.caption) : null, props.iconposition === 'right' && icon, badge)));
  }
}
//# sourceMappingURL=anchor.component.js.map
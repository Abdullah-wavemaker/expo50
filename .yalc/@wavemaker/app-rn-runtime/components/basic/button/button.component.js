function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text, View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { Badge } from 'react-native-paper';
import WmButtonProps from './button.props';
import { DEFAULT_CLASS } from './button.styles';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { createSkeleton } from '../skeleton/skeleton.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmButtonState extends BaseComponentState {}
export default class WmButton extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmButtonProps());
  }
  prepareIcon(_ref) {
    let {
      iconclass,
      iconurl,
      name,
      iconsize,
      iconheight,
      iconmargin,
      iconwidth
    } = _ref;
    return iconclass || iconurl ? /*#__PURE__*/React.createElement(WmIcon, _extends({}, this.getTestPropsForLabel('icon'), {
      styles: this.styles.icon,
      name: `${name}_icon`,
      iconclass: iconclass,
      iconsize: iconsize,
      iconurl: iconurl,
      iconheight: iconheight,
      iconmargin: iconmargin,
      iconwidth: iconwidth
    })) : null;
  }
  prepareBadge(props) {
    //@ts-ignore
    return /*#__PURE__*/React.createElement(Badge, {
      style: this.styles.badge
    }, props.badgevalue);
  }
  renderSkeleton(prop) {
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...this.styles.root,
      width: this.props.skeletonwidth || this.styles.root.width,
      height: this.props.skeletonheight || this.styles.root.height
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: [this.styles.root, {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'hidden'
      }],
      accessibilityProps: {
        ...getAccessibilityProps(AccessibilityWidgetType.BUTTON, props)
      }
    }, this._background, /*#__PURE__*/React.createElement(Tappable, _extends({
      styles: {
        paddingTop: this.styles.root.paddingTop,
        paddingBottom: this.styles.root.paddingBottom,
        paddingLeft: this.styles.root.paddingLeft,
        paddingRight: this.styles.root.paddingRight
      },
      rippleColor: this.styles.root.rippleColor,
      target: this
    }, this.getTestPropsForAction()), /*#__PURE__*/React.createElement(View, {
      style: [this.styles.content, {
        flexDirection: props.iconposition === 'top' ? 'column' : 'row'
      }]
    }, props.iconposition === 'top' && this.prepareIcon(props), props.iconposition === 'left' && this.prepareIcon(props), props.caption ? /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.text
    }, this.getTestPropsForLabel('caption'), {
      importantForAccessibility: 'no'
      // accessibilityLabel={`${props.caption}`}
    }), props.caption) : null, props.iconposition === 'right' && this.prepareIcon(props)))), props.badgevalue && this.prepareBadge(props));
  }
}
//# sourceMappingURL=button.component.js.map
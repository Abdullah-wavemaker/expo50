function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmMenu from '@wavemaker/app-rn-runtime/components/navigation/menu/menu.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmCardProps from './card.props';
import { DEFAULT_CLASS } from './card.styles';
export class WmCardState extends BaseComponentState {}
export default class WmCard extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCardProps());
  }
  renderHeader(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      }
    }, props.iconclass || props.title || props.subheading || props.actions ? /*#__PURE__*/React.createElement(View, {
      style: this.styles.heading
    }, props.iconclass || props.iconurl ? /*#__PURE__*/React.createElement(WmIcon, {
      styles: this.styles.cardIcon,
      iconclass: props.iconclass,
      iconurl: props.iconurl,
      iconheight: props.iconheight,
      iconmargin: props.iconmargin,
      iconwidth: props.iconwidth
    }) : null, /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(WmLabel, {
      styles: this.styles.title,
      caption: props.title
    }), /*#__PURE__*/React.createElement(WmLabel, {
      styles: this.styles.subheading,
      caption: props.subheading
    })), /*#__PURE__*/React.createElement(WmMenu, {
      caption: "",
      iconclass: "wm-sl-l sl-more-menu-vertical",
      dataset: props.actions,
      itemlabel: props.itemlabel,
      itemlink: props.itemlink,
      itemicon: props.itemicon,
      itembadge: props.itembadge,
      isactive: props.isactive,
      itemchildren: props.itemchildren
    })) : null, props.picturesource && /*#__PURE__*/React.createElement(WmPicture, {
      picturesource: props.picturesource,
      styles: this.theme.mergeStyle({
        root: {
          height: props.imageheight
        }
      }, this.styles.picture)
    }));
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this,
      styles: {
        width: '100%',
        height: this.styles.root.height ? '100%' : null
      }
    }), this.renderHeader(props), props.children));
  }
}
//# sourceMappingURL=card.component.js.map
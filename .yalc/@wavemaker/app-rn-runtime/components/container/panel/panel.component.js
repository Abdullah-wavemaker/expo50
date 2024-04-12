function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { isUndefined } from 'lodash';
import { Badge } from 'react-native-paper';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmPanelProps from './panel.props';
import { DEFAULT_CLASS } from './panel.styles';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import { CollapsiblePane } from './collapsible-pane.component';
export class WmPanelState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
  }
}
export default class WmPanel extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPanelProps());
  }
  onPartialLoad() {
    this.invokeEventCallback('onLoad', [this]);
  }
  renderContent(props) {
    if (props.renderPartial) {
      if (!this.state.isPartialLoaded) {
        setTimeout(() => {
          this.updateState({
            isPartialLoaded: true
          });
        });
      }
      return props.renderPartial(props, this.onPartialLoad.bind(this));
    }
  }
  onPanelPress() {
    if (!this.state.props.collapsible) {
      return;
    }
    const eventName = this.state.props.expanded ? 'onCollapse' : 'onExpand';
    this.updateState({
      props: {
        expanded: !this.state.props.expanded
      }
    });
    this.invokeEventCallback(eventName, [null, this.proxy]);
  }
  expandCollapseIcon(isExpanded) {
    const widgetProps = this.state.props;
    //@ts-ignore
    const badge = widgetProps.badgevalue != undefined ? /*#__PURE__*/React.createElement(Badge, {
      style: [this.styles.badge, this.styles[widgetProps.badgetype || 'default']]
    }, widgetProps.badgevalue) : null;
    const iconclass = isExpanded ? 'wi wi-chevron-up' : 'wi wi-chevron-down';
    const expandCollapseIcon = widgetProps.collapsible ? /*#__PURE__*/React.createElement(WmIcon, {
      name: 'expand_collapse_icon',
      styles: this.styles.toggleIcon,
      iconclass: iconclass
    }) : null;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, badge, expandCollapseIcon);
  }
  renderHeader() {
    const props = this.state.props;
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction(`header`), {
      style: [this.styles.header],
      onPress: this.onPanelPress.bind(this)
    }), props.iconclass || props.iconurl ? /*#__PURE__*/React.createElement(WmIcon, {
      styles: this.styles.icon,
      name: props.name + '_icon',
      iconclass: props.iconclass,
      iconheight: props.iconheight,
      iconwidth: props.iconwidth,
      iconmargin: props.iconmargin,
      iconurl: props.iconurl
    }) : null, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Text, _extends({
      style: [this.styles.text, this.styles.heading]
    }, this.getTestPropsForAction(`header_title`)), isUndefined(props.title) ? 'Title' : props.title), props.subheading ? /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.subheading
    }, this.getTestPropsForAction(`subheader`)), props.subheading) : null), this.expandCollapseIcon(props.expanded));
  }
  renderPane(content) {
    const expanded = this.state.props.expanded;
    return isWebPreviewMode() ? /*#__PURE__*/React.createElement(View, {
      style: expanded ? {} : {
        maxHeight: 0,
        overflow: 'hidden'
      }
    }, content) : /*#__PURE__*/React.createElement(CollapsiblePane, {
      close: !expanded
    }, content);
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, this.renderHeader(), this.renderPane( /*#__PURE__*/React.createElement(React.Fragment, null, this.renderContent(props), /*#__PURE__*/React.createElement(View, null, props.children))));
  }
}
//# sourceMappingURL=panel.component.js.map
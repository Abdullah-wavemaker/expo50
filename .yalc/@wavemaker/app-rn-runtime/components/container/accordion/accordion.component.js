function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { isArray } from 'lodash';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmAccordionProps from './accordion.props';
import { DEFAULT_CLASS } from './accordion.styles';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { isDefined } from '@wavemaker/app-rn-runtime/core/utils';
export class WmAccordionState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "lastExpandedIndex", -1);
    _defineProperty(this, "isExpanded", []);
  }
}
export default class WmAccordion extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAccordionProps(), new WmAccordionState());
    _defineProperty(this, "accordionPanes", []);
    _defineProperty(this, "newIndex", 0);
  }
  addAccordionPane(accordionPane) {
    var _this$state$isExpande;
    const i = this.accordionPanes.findIndex(t => t.props.title === accordionPane.props.title);
    if (i >= 0) {
      this.accordionPanes[i] = accordionPane;
    } else {
      this.accordionPanes[this.newIndex++] = accordionPane;
    }
    if (!((_this$state$isExpande = this.state.isExpanded) !== null && _this$state$isExpande !== void 0 && _this$state$isExpande.find(v => v))) {
      this.toggle(this.state.props.defaultpaneindex + 1);
    }
  }
  expand(accordionName) {
    const i = this.accordionPanes.findIndex(t => t.props.name === accordionName);
    this.toggle(i + 1, true);
  }
  collapse(accordionName) {
    const i = this.accordionPanes.findIndex(t => t.props.name === accordionName);
    this.toggle(i + 1, false);
  }
  expandCollapseIcon(item, index) {
    let showBadge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let showIcon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    let useChevron = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    let isExpanded = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    const widgetProps = item.props;
    //@ts-ignore
    const badge = showBadge && widgetProps.badgevalue != undefined ? /*#__PURE__*/React.createElement(Badge, _extends({
      style: [this.styles.badge, isExpanded ? this.styles.activeBadge : null, this.styles[widgetProps.badgetype || 'default']]
    }, this.getTestProps('badge' + index)), widgetProps.badgevalue) : null;
    let iconclass = null;
    if (useChevron) {
      iconclass = isExpanded ? 'wi wi-chevron-down' : 'wi wi-chevron-up';
    } else {
      iconclass = isExpanded ? 'wi wi-minus' : 'wi wi-plus';
    }
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      }
    }, badge, showIcon ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon' + index),
      styles: this.theme.mergeStyle({}, this.styles.icon, isExpanded ? this.styles.activeIcon : null),
      name: 'expand_collapse_icon',
      iconclass: iconclass
    }) : null);
  }
  renderAccordionpane(item, index) {
    let accordionpanes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    const showIconOnLeft = this.styles.leftToggleIcon.root.width !== undefined;
    const isExpanded = this.state.isExpanded[index];
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.pane,
      key: item.props.title
    }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      key: 'accordionpane_' + (index + 1)
    }, this.getTestPropsForAction(`header${index}`), {
      style: [this.styles.header, index === 0 ? this.styles.firstHeader : null, index === accordionpanes.length - 1 && !isExpanded ? this.styles.lastHeader : null, isExpanded ? this.styles.activeHeader : {}],
      onPress: this.toggle.bind(this, index + 1, !isExpanded)
    }), this.expandCollapseIcon(item, index, false, showIconOnLeft, true, isExpanded), item.props.iconclass ? /*#__PURE__*/React.createElement(WmIcon, {
      styles: this.styles.icon,
      name: item.props.name + '_icon',
      iconclass: item.props.iconclass
    }) : null, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Text, _extends({
      style: [this.styles.text, this.styles.heading, isExpanded ? this.styles.activeHeaderTitle : {}]
    }, this.getTestPropsForAction(`header${index}_title`)), isDefined(item.props.title) ? item.props.title : 'Title'), item.props.description ? /*#__PURE__*/React.createElement(Text, _extends({
      style: this.styles.subheading
    }, this.getTestPropsForAction(`header${index}_description`)), item.props.description) : null), this.expandCollapseIcon(item, index, true, !showIconOnLeft, true, isExpanded)), item);
  }
  toggle(index) {
    let expand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let expandedId = expand ? index : -1;
    let collapseId = expand ? -1 : index;
    if (expand && this.state.isExpanded[expandedId - 1] || !expand && this.state.isExpanded[collapseId - 1] === false) {
      return;
    }
    if (collapseId < 0 && this.state.props.closeothers) {
      collapseId = this.state.lastExpandedIndex;
    }
    const collapsedPane = this.accordionPanes[collapseId - 1];
    collapsedPane === null || collapsedPane === void 0 ? void 0 : collapsedPane.hide();
    Promise.resolve().then(() => {
      const expandedPane = expandedId ? this.accordionPanes[expandedId - 1] : null;
      expandedPane === null || expandedPane === void 0 ? void 0 : expandedPane.show();
      this.setState(state => {
        if (collapseId > 0 && collapsedPane) {
          state.isExpanded[collapseId - 1] = false;
        }
        if (expandedId > 0 && expandedPane) {
          state.isExpanded[expandedId - 1] = true;
        }
        return {
          lastExpandedIndex: expandedId,
          isExpanded: [...state.isExpanded]
        };
      }, () => {
        this.invokeEventCallback('onChange', [{}, this.proxy, expandedId - 1, collapseId ? collapseId - 1 : null, expandedPane && expandedPane.props.name, collapsedPane && collapsedPane.props.name]);
      });
    }, () => {});
  }
  componentDidMount() {
    super.componentDidMount();
    this.toggle(this.state.props.defaultpaneindex + 1);
  }
  renderWidget(props) {
    const accordionpanes = props.children;
    const expandedId = this.state.lastExpandedIndex || 0;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, accordionpanes ? isArray(accordionpanes) && accordionpanes.length ? accordionpanes.map((item, index) => this.renderAccordionpane(item, index, accordionpanes)) : this.renderAccordionpane(accordionpanes, 0) : null);
  }
}
//# sourceMappingURL=accordion.component.js.map
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { isString } from 'lodash-es';
import { TouchableOpacity, Text, View, ScrollView, Dimensions } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmPopoverProps from './popover.props';
import { DEFAULT_CLASS } from './popover.styles';
import WmContainer from '../../container/container.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmPopoverState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isOpened", false);
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "position", {});
    _defineProperty(this, "isPartialLoaded", false);
  }
}
export default class WmPopover extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmPopoverProps(), new WmPopoverState());
    _defineProperty(this, "view", null);
    _defineProperty(this, "computePosition", e => {
      const position = {};
      if (this.state.props.type === 'dropdown') {
        const windowDimensions = Dimensions.get('window');
        this.view.measure((x, y, width, height, px, py) => {
          let popoverwidth = this.state.props.popoverwidth;
          if (popoverwidth && isString(popoverwidth)) {
            popoverwidth = parseInt(popoverwidth);
          }
          position.left = px;
          if (px + popoverwidth > windowDimensions.width) {
            position.left = px + width - popoverwidth;
          }
          position.top = py + height;
          this.updateState({
            position: position
          });
        });
      }
    });
    _defineProperty(this, "showPopover", e => {
      this.setState({
        isOpened: true
      });
      this.invokeEventCallback('onShow', [e, this]);
      e === null || e === void 0 ? void 0 : e.stopPropagation();
    });
    _defineProperty(this, "hide", () => {});
  }
  prepareModalOptions(content, styles, modalService) {
    const o = this.state.modalOptions;
    o.modalStyle = styles.modal;
    o.contentStyle = {
      ...styles.modalContent,
      ...this.state.position
    };
    o.content = content;
    o.isModal = this.state.props.autoclose !== 'disabled';
    o.centered = true;
    o.animation = this.state.props.contentanimation || 'slideInUp';
    o.onClose = () => {
      this.hide = () => {};
      this.setState({
        isOpened: false,
        isPartialLoaded: false,
        modalOptions: {}
      });
      this.invokeEventCallback('onHide', [null, this]);
    };
    this.hide = () => modalService.hideModal(this.state.modalOptions);
    return o;
  }
  renderWidget(props) {
    let dimensions = {};
    const styles = this.theme.mergeStyle(this.theme.getStyle('popover-' + props.type), this.styles);
    if (props.type === 'dropdown') {
      if (props.popoverwidth) {
        dimensions.width = props.popoverwidth;
        styles.modalContent.width = props.popoverwidth;
      }
      if (props.popoverheight) {
        dimensions.height = props.popoverheight;
      }
    }
    return /*#__PURE__*/React.createElement(View, _extends({
      style: styles.root,
      onLayout: this.computePosition,
      ref: ref => {
        this.view = ref;
      }
    }, getAccessibilityProps(AccessibilityWidgetType.POVOVER, props)), this._background, /*#__PURE__*/React.createElement(WmAnchor, {
      id: this.getTestId('trigger'),
      animation: props.animation,
      caption: props.caption,
      badgevalue: props.badgevalue,
      iconclass: props.iconclass,
      iconposition: props.iconposition,
      iconheight: props.iconheight,
      iconwidth: props.iconwidth,
      iconmargin: props.iconmargin,
      iconurl: props.iconurl,
      styles: styles.link,
      onTap: this.showPopover
    }), this.state.isOpened ? /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(ScrollView, {
        style: this.theme.mergeStyle(styles.popover, dimensions),
        onScroll: event => {
          this.notify('scroll', [event]);
        },
        scrollEventThrottle: 48,
        accessible: props.type !== "dropdown",
        accessibilityViewIsModal: true
      }, props.title ? /*#__PURE__*/React.createElement(Text, {
        style: styles.title
      }, props.title) : null, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('outercontent'), {
        activeOpacity: 1,
        onPress: () => {
          props.autoclose === 'always' && this.hide();
        },
        style: styles.popoverContent.root
      }), /*#__PURE__*/React.createElement(WmContainer, _extends({
        styles: styles.popoverContent,
        onLoad: () => this.invokeEventCallback('onLoad', [this])
      }, props.renderPartial ? {
        renderPartial: (p, onLoad) => {
          return props.renderPartial && props.renderPartial(props, onLoad);
        }
      } : {}), props.renderPartial ? null : props.children))), styles, modalService));
      return null;
    }) : null);
  }
}
//# sourceMappingURL=popover.component.js.map
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { NavigationServiceConsumer } from '@wavemaker/app-rn-runtime/core/navigation.service';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmLabelProps from './label.props';
import { DEFAULT_CLASS } from './label.styles';
import { isNil, toString } from 'lodash-es';
import { Animatedview } from '@wavemaker/app-rn-runtime/components/basic/animatedview.component';
import { createSkeleton } from '../skeleton/skeleton.component';
export class WmLabelState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "parts", []);
  }
}
export default class WmLabel extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLabelProps(), new WmLabelState());
  }
  getAsterisk() {
    return /*#__PURE__*/React.createElement(Text, {
      style: this.styles.asterisk
    }, "*");
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case "caption":
        this.updateState({
          parts: this.parseCaption($new)
        });
        break;
    }
  }
  getMultilineSkeleton(width, height) {
    const styles = {
      borderRadius: 4,
      marginBottom: 10,
      height: height
    };
    return createSkeleton(this.theme, this.styles.skeleton, {
      ...styles,
      width: width,
      height: height
    });
  }
  parseCaption(caption) {
    if (!caption) {
      return [];
    }
    caption += '';
    caption = caption.replace(/\s*\(\s*\$event,\s*\$widget\s*\)\s*/, '');
    caption = caption.replace(/\(\s*\)/, '(#/__EMPTY__)');
    const pattern = /\[([^\]]+)\]\(([^)]*)\)/g;
    const linkRegex = /^(((http|https):\/\/)|javascript:|#).+$/;
    const captionSplit = caption.split(pattern);
    let parts = [];
    for (let i = 0; i < captionSplit.length; i++) {
      const isLink = linkRegex.test(captionSplit[i]);
      let part = {};
      const isNextTextALink = linkRegex.test(captionSplit[i + 1]);
      if (isLink) {
        part.text = captionSplit[i - 1] ?? '';
        part.link = captionSplit[i] === '#/__EMPTY__' ? '' : captionSplit[i];
      } else {
        part.text = isNextTextALink ? "" : captionSplit[i];
      }
      ;
      if (part.text) {
        parts.push(part);
      }
    }
    return parts;
  }
  renderSkeleton(props) {
    var _this$styles$root, _this$styles$root2;
    const skeletonWidth = this.props.skeletonwidth || ((_this$styles$root = this.styles.root) === null || _this$styles$root === void 0 ? void 0 : _this$styles$root.width);
    const skeletonHeight = this.props.skeletonheight || ((_this$styles$root2 = this.styles.root) === null || _this$styles$root2 === void 0 ? void 0 : _this$styles$root2.height) || this.styles.text.fontSize;
    if (this.props.multilineskeleton) {
      return /*#__PURE__*/React.createElement(View, {
        style: {
          width: skeletonWidth
        }
      }, this.getMultilineSkeleton('100%', skeletonHeight), this.getMultilineSkeleton('70%', skeletonHeight), this.getMultilineSkeleton('40%', skeletonHeight));
    } else {
      return createSkeleton(this.theme, this.styles.skeleton, {
        ...this.styles.root,
        width: skeletonWidth,
        height: skeletonHeight
      });
    }
  }
  renderWidget(props) {
    const linkStyles = this.theme.mergeStyle({
      text: this.styles.text
    }, this.styles.link);
    return !isNil(props.caption) ? /*#__PURE__*/React.createElement(Animatedview, {
      entryanimation: props.animation,
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(NavigationServiceConsumer, null, navigationService => {
      var _this$state$parts, _this$state$parts2;
      return /*#__PURE__*/React.createElement(Tappable, {
        target: this
      }, /*#__PURE__*/React.createElement(Text, _extends({
        style: this.state.parts.length <= 1 ? this.styles.text : {
          flexWrap: "wrap",
          textAlign: this.styles.text.textAlign
        }
      }, this.state.parts.length <= 1 ? this.getTestPropsForLabel('caption') : {}, {
        numberOfLines: props.nooflines,
        ellipsizeMode: "tail"
      }), ((_this$state$parts = this.state.parts) === null || _this$state$parts === void 0 ? void 0 : _this$state$parts.length) === 1 ? this.state.props.caption : (_this$state$parts2 = this.state.parts) === null || _this$state$parts2 === void 0 ? void 0 : _this$state$parts2.map((part, index) => {
        const isLink = !isNil(part.link);
        return /*#__PURE__*/React.createElement(Text, _extends({
          key: `part_${index}`,
          style: [this.styles.text, isLink ? this.styles.link.text : null, props.isValid ? null : {
            color: 'red'
          }]
        }, this.getTestPropsForLabel(isLink ? `link_${index}` : `caption_${index}`), {
          selectable: this.styles.text.userSelect === 'text',
          onPress: () => {
            if (part.link) {
              if (part.link.startsWith('http:') || part.link.startsWith('https:') || part.link.startsWith('#')) {
                navigationService.openUrl(part.link, '_blank');
              } else if (part.link.startsWith('javascript:')) {
                const eventName = part.link.substring(11);
                this.invokeEventCallback(eventName, [null, this.proxy]);
              }
            }
            this.invokeEventCallback('onTap', [null, this.proxy]);
          }
        }, getAccessibilityProps(AccessibilityWidgetType.LABEL, props)), toString(part.text), props.required && this.getAsterisk());
      })));
    })) : null;
  }
}
//# sourceMappingURL=label.component.js.map
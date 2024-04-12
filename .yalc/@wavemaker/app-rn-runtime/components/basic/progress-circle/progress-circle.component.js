function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text } from 'react-native';
import { isNumber } from 'lodash';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmProgressCircleProps from './progress-circle.props';
import { DEFAULT_CLASS } from './progress-circle.styles';
export class WmProgressCircleState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "radius", 10);
  }
}
export default class WmProgressCircle extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmProgressCircleProps(), new WmProgressCircleState());
  }
  onLayout(e) {
    const width = e.nativeEvent.layout.width;
    const height = e.nativeEvent.layout.height;
    let radius = this.state.radius;
    if (!width) {
      radius = height;
    } else if (!height) {
      radius = width;
    } else {
      radius = Math.min(width, height);
    }
    this.updateState({
      radius: radius
    });
  }
  renderWidget(props) {
    let value = 0;
    if (isNumber(props.datavalue) && isNumber(props.minvalue) && isNumber(props.maxvalue)) {
      value = (+props.datavalue - +props.minvalue) / (+props.maxvalue - +props.minvalue) * 100;
    }
    const styles = this.theme.mergeStyle(this.theme.getStyle(`app-${props.type}-progress-circle`), this.styles);
    const showText = props.captionplacement !== 'hidden';
    return /*#__PURE__*/React.createElement(View, _extends({
      style: styles.root,
      onLayout: this.onLayout.bind(this)
    }, getAccessibilityProps(AccessibilityWidgetType.PROGRESSCIRCLE, props)), this._background, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(), {
      target: this,
      styles: {
        root: {
          width: '100%',
          height: '100%'
        }
      }
    }), /*#__PURE__*/React.createElement(AnimatedCircularProgress, {
      fill: value,
      width: styles.progressValue.height,
      backgroundWidth: styles.progressValue.height,
      rotation: 0,
      tintColor: styles.progressValue.backgroundColor,
      lineCap: styles.progressValue.buttStyle || "butt",
      backgroundColor: styles.progressCircle.backgroundColor,
      size: this.state.radius
    }, fill => /*#__PURE__*/React.createElement(View, {
      style: {
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.text
    }, showText ? props.title || value : ''), showText && props.subtitle ? /*#__PURE__*/React.createElement(Text, {
      style: styles.subTitle
    }, props.subtitle) : null))));
  }
}
//# sourceMappingURL=progress-circle.component.js.map
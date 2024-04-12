function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from "react";
import { Platform, View } from "react-native";
import { get } from "lodash";
import injector from "./injector";
import { TouchableRipple } from "react-native-paper";
export const ParentTappableContext = /*#__PURE__*/React.createContext(null);
export class SyntheticEvent {
  constructor() {
    //
    _defineProperty(this, "propagationEnabled", true);
  }
  stopPropagation() {
    this.propagationEnabled = false;
  }
}
export class Tappable extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "lastPress", 0);
    _defineProperty(this, "lastTap", 0);
    _defineProperty(this, "lastDoubleTap", 0);
    _defineProperty(this, "isLongTap", false);
    _defineProperty(this, "parent", null);
  }
  onPress(e) {
    var _this$props$target;
    this.lastPress = Date.now();
    const target = this.props.target;
    this.props.onTouchStart && this.props.onTouchStart(e);
    (_this$props$target = this.props.target) === null || _this$props$target === void 0 ? void 0 : _this$props$target.invokeEventCallback('onTouchstart', [e, this.props.target]);
    const currentTime = Date.now();
    const tapDelta = currentTime - this.lastTap;
    if (this.isLongTap) {
      this.isLongTap = false;
      return;
    }
    if (e.propagationEnabled) {
      var _injector$FOCUSED_ELE;
      (_injector$FOCUSED_ELE = injector.FOCUSED_ELEMENT.get()) === null || _injector$FOCUSED_ELE === void 0 ? void 0 : _injector$FOCUSED_ELE.blur();
      if (this.lastDoubleTap !== this.lastTap && tapDelta < 500) {
        this.props.onDoubleTap && this.props.onDoubleTap(e);
        setTimeout(() => {
          target === null || target === void 0 ? void 0 : target.invokeEventCallback('onDoubletap', [e, target]);
        }, 200);
        this.lastDoubleTap = currentTime;
      }
      setTimeout(() => {
        var _this$parent;
        if (this.props.onTap) {
          this.props.onTap(e);
        } else {
          target === null || target === void 0 ? void 0 : target.invokeEventCallback('onTap', [e, target]);
        }
        (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.onPress(e);
      }, 200);
      this.lastTap = currentTime;
    }
  }
  onLongTap(e) {
    if (!e.propagationEnabled) {
      return;
    }
    this.props.onLongTap && this.props.onLongTap(e);
    setTimeout(() => {
      var _this$props$target2, _this$parent2;
      (_this$props$target2 = this.props.target) === null || _this$props$target2 === void 0 ? void 0 : _this$props$target2.invokeEventCallback('onLongtap', [e, this.props.target]);
      (_this$parent2 = this.parent) === null || _this$parent2 === void 0 ? void 0 : _this$parent2.onPressOut(e);
    }, 200);
    this.isLongTap = true;
  }
  onPressOut(e) {
    if (!e.propagationEnabled) {
      return;
    }
    this.props.onTouchEnd && this.props.onTouchEnd(e);
    setTimeout(() => {
      var _this$props$target3, _this$parent3;
      (_this$props$target3 = this.props.target) === null || _this$props$target3 === void 0 ? void 0 : _this$props$target3.invokeEventCallback('onTouchend', [e, this.props.target]);
      (_this$parent3 = this.parent) === null || _this$parent3 === void 0 ? void 0 : _this$parent3.onPressOut(e);
    }, 200);
    this.isLongTap = false;
  }
  setParent(parent) {
    if (parent && this.parent !== parent) {
      this.parent = parent;
    }
  }
  render() {
    const target = this.props.target;
    if (target !== null && target !== void 0 && target.props.onTap || target !== null && target !== void 0 && target.props.onLongtap || target !== null && target !== void 0 && target.props.onDoubletap || this.props.onTap || this.props.onLongTap || this.props.onDoubleTap) {
      return /*#__PURE__*/React.createElement(ParentTappableContext.Consumer, null, parent => {
        this.setParent(parent);
        return /*#__PURE__*/React.createElement(ParentTappableContext.Provider, {
          value: this
        }, /*#__PURE__*/React.createElement(TouchableRipple, _extends({
          rippleColor: this.props.rippleColor,
          borderless: true
        }, Platform.OS === 'android' || Platform.OS === 'web' ? {
          accessibilityLabel: this.props.testID,
          testID: this.props.testID
        } : {
          // accessible: false,
          testID: this.props.testID
        }, {
          disabled: get(target === null || target === void 0 ? void 0 : target.proxy, 'disabled'),
          style: this.props.styles,
          onPress: e => this.onPress(new SyntheticEvent()),
          onLongPress: e => this.onLongTap(new SyntheticEvent()),
          onPressOut: e => this.onPressOut(new SyntheticEvent())
        }), /*#__PURE__*/React.createElement(React.Fragment, null, this.props.children)));
      });
    }
    return /*#__PURE__*/React.createElement(View, {
      style: this.props.styles
    }, this.props.children);
  }
}
//# sourceMappingURL=tappable.component.js.map
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { ScrollView as RNScrollView, View } from 'react-native';
const ScrollViewContext = /*#__PURE__*/React.createContext(null);
export const ScrollViewProvider = ScrollViewContext.Provider;
export const ScrollViewConsumer = ScrollViewContext.Consumer;
// TODO: implement scroll view that handles FlatList.
export class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "instance", null);
    this.state = {
      scrollEnabled: true
    };
  }
  enableScroll() {
    this.setState({
      scrollEnabled: true
    });
  }
  disableScroll() {
    this.setState({
      scrollEnabled: false
    });
  }
  isScrollEnabled() {
    return this.state.scrollEnabled;
  }
  get contentOffset() {
    return this.instance.contentOffset;
  }
  render() {
    return /*#__PURE__*/React.createElement(ScrollViewProvider, {
      value: this
    }, /*#__PURE__*/React.createElement(View, {
      onStartShouldSetResponderCapture: () => {
        this.setState({
          scrollEnabled: true
        });
        return true;
      }
    }, /*#__PURE__*/React.createElement(RNScrollView, _extends({
      ref: scrollRef => this.instance = scrollRef
    }, this.props, {
      scrollEnabled: this.state.scrollEnabled
    }), this.props.children)));
  }
}
//# sourceMappingURL=scroll-view.component.js.map
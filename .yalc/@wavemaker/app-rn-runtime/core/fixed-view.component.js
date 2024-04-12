function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from "react";
import { View } from "react-native";
import { ThemeProvider } from "../styles/theme";
const FixedViewContext = /*#__PURE__*/React.createContext(null);
export class FixedView extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "container", null);
    _defineProperty(this, "cachedComponent", void 0);
    _defineProperty(this, "id", FixedView.counter++);
  }
  componentWillUnmount() {
    this.container.remove(this);
  }
  render() {
    this.cachedComponent = this.props.usememo === true && this.cachedComponent || /*#__PURE__*/React.createElement(FixedViewContext.Consumer, null, container => {
      this.container = container;
      if (this.props.show) {
        container.add(this, /*#__PURE__*/React.createElement(ThemeProvider, {
          value: this.props.theme,
          key: this.id
        }, /*#__PURE__*/React.createElement(View, {
          style: [{
            position: 'absolute'
          }, this.props.style]
        }, this.props.children)));
      } else {
        container.remove(this);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    });
    return this.cachedComponent;
  }
}
_defineProperty(FixedView, "defaultProps", {
  show: true
});
_defineProperty(FixedView, "counter", Date.now());
export class FixedViewContainer extends React.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "children", new Map());
    _defineProperty(this, "id", 0);
  }
  add(c, n) {
    this.children.set(c, n);
    setTimeout(() => this.setState({
      id: ++this.id
    }));
  }
  remove(c) {
    this.children.delete(c);
    setTimeout(() => this.setState({
      id: ++this.id
    }));
  }
  render() {
    return /*#__PURE__*/React.createElement(FixedViewContext.Provider, {
      value: this
    }, this.props.children, Array.from(this.children.values()));
  }
}
;
//# sourceMappingURL=fixed-view.component.js.map
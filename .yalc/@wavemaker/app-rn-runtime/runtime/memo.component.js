function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from "react";
export class WmMemo extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "watcher", null);
    _defineProperty(this, "refresh", () => {
      this.setState({
        id: this.state.id + 1
      });
    });
    this.watcher = props.watcher.create();
    this.state = {
      id: 0
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(nextProps).reduce((p, k) => {
      return p || k !== 'render' && this.props[k] !== nextProps[k];
    }, false) || this.state.id !== nextState.id;
  }
  componentWillUnmount() {
    this.watcher && this.watcher.destroy();
  }
  watch(fn) {
    return this.watcher.watch(fn, this.refresh).value;
  }
  render() {
    this.watcher.clear();
    return this.props.render(this.watch.bind(this));
  }
}
//# sourceMappingURL=memo.component.js.map
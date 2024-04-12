function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseComponent, BaseComponentState, BaseProps } from "@wavemaker/app-rn-runtime/core/base.component";
export class PartialHostState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isPartialLoaded", false);
  }
}
export class PartialHostProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "renderPartial", void 0);
    _defineProperty(this, "children", void 0);
  }
}
export class PartialHost extends BaseComponent {
  constructor(markupProps, defaultClass, defaultProps, defaultState) {
    super(markupProps, defaultClass, defaultProps, defaultState);
  }
  onPartialLoad() {
    this.invokeEventCallback('onLoad', [this]);
  }
  renderContent(props) {
    if (props.renderPartial) {
      if (!this.state.isPartialLoaded && !this.isVisible()) {
        return null;
      }
      if (!this.state.isPartialLoaded) {
        setTimeout(() => {
          this.updateState({
            isPartialLoaded: true
          });
        });
      }
      return props.renderPartial(props, this.onPartialLoad.bind(this));
    }
    return props.children;
  }
}
//# sourceMappingURL=partial-host.component.js.map
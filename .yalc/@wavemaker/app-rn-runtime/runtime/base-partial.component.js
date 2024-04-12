function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import BaseFragment from './base-fragment.component';
export default class BasePartial extends BaseFragment {
  constructor(props) {
    super(props);
    _defineProperty(this, "partialParams", {});
    _defineProperty(this, "Prefab", null);
    const isPartOfPrefab = !!this.props.prefab;
    this.App = this.appConfig.app;
    this.Actions = Object.assign({}, isPartOfPrefab ? {} : this.App.Actions);
    this.Variables = Object.assign({}, isPartOfPrefab ? {} : this.App.Variables);
    this.serviceDefinitions = this.props.serviceDefinitions;
    if (isPartOfPrefab) {
      this.Prefab = this.props.prefab;
      this.baseUrl = this.Prefab.baseUrl;
    }
    this.watcher = props.parentWatcher.create();
  }
  onFragmentReady() {
    return super.onFragmentReady().then(() => {
      this.onContentReady();
      const parent = this.props.parent;
      if (parent) {
        parent.Widgets = this.Widgets;
        parent.Variables = this.fragmentVariables;
      }
      this.invokeEventCallback('onLoad', [this]);
    });
  }
  get prefabname() {
    var _this$Prefab;
    return (_this$Prefab = this.Prefab) === null || _this$Prefab === void 0 ? void 0 : _this$Prefab.props.prefabname;
  }
  onComponentInit(w) {
    super.onComponentInit(w);
    if (w instanceof WmPartial) {
      this.targetWidget = w;
    }
  }
  onComponentDestroy(w) {
    super.onComponentDestroy(w);
    const parent = this.props.parent;
    if (parent) {
      delete parent.Widgets;
      delete parent.Variables;
    }
  }
  renderWidget(props) {
    return this.renderPartial();
  }
}
//# sourceMappingURL=base-partial.component.js.map
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import BaseDatasetProps from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.props';
export default class WmSearchProps extends BaseDatasetProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "autofocus", false);
    _defineProperty(this, "query", '');
    _defineProperty(this, "searchkey", void 0);
    _defineProperty(this, "type", 'search');
    _defineProperty(this, "datacompletemsg", 'No more data to load');
    _defineProperty(this, "placeholder", 'Search');
    _defineProperty(this, "limit", null);
    _defineProperty(this, "minchars", null);
    _defineProperty(this, "imagewidth", 32);
    _defineProperty(this, "imageheight", 32);
    _defineProperty(this, "searchon", 'typing');
    _defineProperty(this, "onSubmit", void 0);
    _defineProperty(this, "onChange", null);
    _defineProperty(this, "result", void 0);
    _defineProperty(this, "showclear", false);
    _defineProperty(this, "showSearchIcon", true);
    // internal property
    _defineProperty(this, "invokeEvent", void 0);
    _defineProperty(this, "formFieldInstance", void 0);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", 'search');
    _defineProperty(this, "renderitempartial", void 0);
  }
}
//# sourceMappingURL=search.props.js.map
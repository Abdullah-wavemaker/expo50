function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { DEFAULT_CLASS } from './basenav.styles';
import { isArray } from 'lodash-es';
export class BaseNavState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "dataItems", []);
  }
}
export class BaseNavComponent extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 ? arguments[2] : undefined;
    let defaultState = arguments.length > 3 ? arguments[3] : undefined;
    super(props, defaultClass, defaultProps, defaultState);
    this.defaultClass = defaultClass;
  }
  getValue(item, val) {
    if (typeof val === 'string') {
      return item[val];
    } else if (typeof val === 'function') {
      return val(item);
    }
    return null;
  }
  setDataItems() {
    let dataset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.props.dataset;
    const name = this.props.name;
    let dataItems = [];
    if (typeof dataset === 'string') {
      dataItems = dataset.split(',').map((s, i) => {
        return {
          key: `${name}_item${i}`,
          label: s,
          data: s
        };
      });
    } else if (dataset) {
      if (!isArray(dataset)) {
        dataset = [dataset];
      }
      dataItems = dataset.map((d, i) => {
        return {
          key: `${name}_item${i}`,
          label: this.getValue(d, this.state.props.itemlabel),
          icon: this.getValue(d, this.state.props.itemicon),
          link: this.getValue(d, this.state.props.itemlink),
          badge: this.getValue(d, this.state.props.itembadge),
          isactive: this.getValue(d, this.state.props.isactive),
          data: d,
          childnavigation: this.state.props.itemchildren ? d[this.state.props.itemchildren] : null
        };
      });
    }
    this.updateState({
      dataItems: dataItems
    });
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'dataset':
        this.setDataItems($new);
        break;
      case 'itemlabel':
      case 'itemicon':
      case 'itemlink':
      case 'itemchildren':
        this.setDataItems();
        break;
    }
  }
}
//# sourceMappingURL=basenav.component.js.map
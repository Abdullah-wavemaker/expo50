function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { assign, isNil } from "lodash-es";
export class PropsProvider {
  constructor(defaultProps, initprops) {
    let onChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (name, $new, $old) => {};
    this.defaultProps = defaultProps;
    this.initprops = initprops;
    this.onChange = onChange;
    _defineProperty(this, "oldProps", {});
    _defineProperty(this, "overriddenProps", {});
    _defineProperty(this, "propsProxy", void 0);
    _defineProperty(this, "isDirty", false);
    _defineProperty(this, "propertyNames", {});
    this.initprops = this.initprops || {};
    Object.keys(defaultProps).forEach(k => this.propertyNames[k] = true);
    Object.keys(initprops).forEach(k => this.propertyNames[k] = true);
    //@ts-ignore
    this.propsProxy = new Proxy({}, {
      get: (target, prop, receiver) => {
        const propName = prop.toString();
        let value = this.defaultProps[propName];
        if (this.overriddenProps.hasOwnProperty(propName)) {
          value = this.overriddenProps[propName];
        } else if (this.oldProps.hasOwnProperty(propName)) {
          value = this.oldProps[propName];
        }
        return value;
      },
      set: (target, prop, value) => {
        const propName = prop.toString();
        if (!this.has(propName)) {
          return false;
        }
        this.isDirty = this.isDirty || this.overriddenProps[propName] !== value;
        this.overriddenProps[propName] = value;
        if (this.oldProps[propName] !== value) {
          const oldValue = this.oldProps[propName];
          this.onChange(propName, value, oldValue);
          this.oldProps[propName] = value;
        }
        return true;
      }
    });
  }
  setDefault(propName, value) {
    this.defaultProps[propName] = value;
  }
  check(nextProps) {
    if (!nextProps) {
      nextProps = assign({}, this.defaultProps, this.initprops);
    }
    const result = Object.keys(nextProps).reduce((b, k) => {
      let flag = false;
      //@ts-ignore
      const value = nextProps[k];
      const oldValue = this.oldProps[k];
      if (isNil(this.overriddenProps[k]) && (!this.oldProps.hasOwnProperty(k) || this.oldProps[k] !== value)) {
        this.oldProps[k] = value;
        this.onChange(k, value, oldValue);
        flag = true;
      }
      return b || flag;
    }, false) || this.isDirty;
    this.isDirty = false;
    return result;
  }

  // sets the property. But, value gets overriden when the original prop changes.
  set(name, value) {
    this.oldProps[name] = value;
    const oldValue = this.oldProps[name];
    if (oldValue !== value) {
      this.oldProps[name] = value;
      this.onChange(name, value, oldValue);
    }
  }
  has(propName) {
    return !!this.propertyNames[propName];
  }
  get() {
    return this.propsProxy;
  }
}
//# sourceMappingURL=props.provider.js.map
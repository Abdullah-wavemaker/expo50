function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export class DefaultKeyExtractor {
  constructor() {
    _defineProperty(this, "store", new Map());
    _defineProperty(this, "nextKey", 1);
  }
  getKey(o) {
    let create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let k = this.store.get(o);
    if (!k && create) {
      k = `key:${Date.now()}:${this.nextKey++}`;
      this.store.set(o, k);
    }
    return k;
  }
  clear() {
    this.store = new Map();
  }
}
//# sourceMappingURL=key.extractor.js.map
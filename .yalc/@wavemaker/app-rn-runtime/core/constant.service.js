function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export class ConstantService {
  constructor() {
    _defineProperty(this, "VALIDATOR", {
      REQUIRED: 'required',
      MAXCHARS: 'maxchars',
      MINVALUE: 'minvalue',
      MAXVALUE: 'maxvalue',
      REGEXP: 'regexp',
      MINDATE: 'mindate',
      MAXDATE: 'maxdate',
      MINTIME: 'mintime',
      MAXTIME: 'maxtime',
      EXCLUDEDATES: 'excludedates',
      EXCLUDEDAYS: 'excludedays'
    });
  }
}
export default new ConstantService();
//# sourceMappingURL=constant.service.js.map
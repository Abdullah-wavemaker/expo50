function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import AsyncStorage from '@react-native-async-storage/async-storage';
export class StorageService {
  constructor() {
    _defineProperty(this, "target", 'GLOBAL');
  }
  getKey(key) {
    return `${this.target}_${key}`;
  }
  getItem(key, callback) {
    return AsyncStorage.getItem(this.getKey(key), callback);
  }
  setItem(key, value, callback) {
    return AsyncStorage.setItem(this.getKey(key), value, callback);
  }
  removeItem(key, callback) {
    return AsyncStorage.removeItem(this.getKey(key), callback);
  }
}
export default new StorageService();
//# sourceMappingURL=storage.service.js.map
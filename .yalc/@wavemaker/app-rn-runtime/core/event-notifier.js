function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let i = 1;
export default class EventNotifier {
  constructor() {
    _defineProperty(this, "name", '');
    _defineProperty(this, "id", i++);
    _defineProperty(this, "listeners", {});
    _defineProperty(this, "parent", null);
    _defineProperty(this, "children", []);
  }
  setParent(parent) {
    if (parent !== this.parent) {
      this.removeFromParent();
      this.parent = parent;
      this.parent.children.push(this);
    }
  }
  notify(event, args) {
    let propagate = true;
    if (this.listeners[event]) {
      propagate = !this.listeners[event].find(l => {
        try {
          return (l && l.apply(null, args)) === false;
        } catch (e) {
          console.error(e);
        }
        return true;
      });
    }
    if (propagate) {
      this.children.forEach(c => {
        c.notify(event, args);
      });
    }
  }
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      const eventListeners = this.listeners[event];
      const i = eventListeners.findIndex(fni => fni === fn);
      eventListeners.splice(i, 1);
    };
  }
  removeFromParent() {
    if (this.parent) {
      const i = this.parent.children.indexOf(this) || -1;
      if (i >= 0) {
        this.parent.children.splice(i, 1);
      }
      this.parent = null;
    }
  }
  destroy() {
    this.removeFromParent();
  }
}
//# sourceMappingURL=event-notifier.js.map
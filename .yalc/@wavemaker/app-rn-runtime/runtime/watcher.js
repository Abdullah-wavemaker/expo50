var _class2;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isArray, clone } from 'lodash';
import { useEffect, useState } from 'react';
import { WIDGET_LOGGER } from '@wavemaker/app-rn-runtime/core/base.component';
const WATCH_LOGGER = WIDGET_LOGGER.extend("watch");
class WatchExpression {
  constructor(fn, onChange) {
    this.fn = fn;
    this.onChange = onChange;
    _defineProperty(this, "last", null);
    _defineProperty(this, "expBody", null);
    _defineProperty(this, "lastExecutionTime", 0);
    this.last = this.execute();
    if (isArray(this.last)) {
      this.last = clone(this.last);
    }
  }
  getExpBody() {
    if (!this.expBody) {
      const expStr = this.fn.toString();
      this.expBody = expStr.substring(expStr.indexOf('return ') + 7, expStr.lastIndexOf(';'));
    }
    return this.expBody;
  }
  execute() {
    try {
      return this.fn();
    } catch (e) {
      //do nothing
      return null;
    }
  }
  isEqual($old, $new) {
    const isArrayObj = isArray($old) || isArray($new);
    if (isArrayObj) {
      if ($old && !$new || !$old && $new || $old.length !== $new.length) {
        return false;
      }
      for (let i = 0; i < $old.length; i++) {
        if ($old[i] !== $new[i]) {
          return false;
        }
      }
      return true;
    }
    return $old === $new;
  }
  get value() {
    return this.last;
  }
  check() {
    const start = Date.now();
    const now = this.execute();
    const changed = !this.isEqual(this.last, now);
    this.lastExecutionTime = Date.now() - start;
    if (changed) {
      WATCH_LOGGER.debug(() => {
        if (this.getExpBody() !== 'fragment') {
          return `Watcher: <${this.getExpBody()}> Changed from ${this.last} to ${now} `;
        }
        return '';
      });
      this.onChange(this.last, now);
      this.last = now;
      if (isArray(this.last)) {
        this.last = clone(this.last);
      }
      return true;
    }
    return false;
  }
}
export class Watcher {
  constructor() {
    _defineProperty(this, "expressions", []);
    _defineProperty(this, "isActive", true);
    _defineProperty(this, "parent", null);
    _defineProperty(this, "children", []);
  }
  check() {
    if (this.isActive) {
      this.expressions.forEach(expression => expression.check());
      this.children.forEach(child => {
        child.check();
      });
    }
  }
  create() {
    const child = new Watcher();
    child.parent = this;
    this.children.push(child);
    return child;
  }
  remove(child) {
    if (this.children.length > 0) {
      const i = this.children.indexOf(child);
      if (i >= 0) {
        this.children.splice(i, 1);
      }
    }
  }
  destroy() {
    this.clear();
    this.parent && this.parent.remove(this);
  }
  clear() {
    this.children = [];
    this.expressions = [];
  }
  watch(fn, onChange) {
    const expression = new WatchExpression(fn, onChange);
    this.expressions.push(expression);
    return expression;
  }
  count() {
    if (!this.isActive) {
      return 0;
    }
    let count = this.expressions.length;
    this.children.forEach(child => {
      count += child.count();
    });
    return count;
  }
}
_class2 = Watcher;
_defineProperty(Watcher, "ROOT", new _class2());
export function useWatcher(parent) {
  const [change, onChange] = useState({});
  let [watcher] = useState(() => parent.create());
  watcher.clear();
  useEffect(() => {
    return () => {
      watcher.destroy();
    };
  }, []);
  return {
    watch: fn => {
      return watcher.watch(fn, () => onChange({})).value;
    }
  };
}
;
//# sourceMappingURL=watcher.js.map
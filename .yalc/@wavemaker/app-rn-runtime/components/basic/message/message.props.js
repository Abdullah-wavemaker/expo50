function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmMessageProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "animation", 'fadeIn');
    _defineProperty(this, "title", '');
    _defineProperty(this, "variant", 'dark');
    _defineProperty(this, "caption", 'Message');
    _defineProperty(this, "type", 'success');
    _defineProperty(this, "hideclose", false);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", 'alert');
    _defineProperty(this, "onClose", void 0);
  }
}
//# sourceMappingURL=message.props.js.map
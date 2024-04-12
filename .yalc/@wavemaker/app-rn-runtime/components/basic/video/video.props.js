function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
export default class WmVideoProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "autoplay", false);
    _defineProperty(this, "controls", false);
    _defineProperty(this, "loop", false);
    _defineProperty(this, "mp4format", null);
    _defineProperty(this, "muted", false);
    _defineProperty(this, "oggformat", null);
    _defineProperty(this, "subtitlelang", 'en');
    _defineProperty(this, "subtitlesource", null);
    _defineProperty(this, "videoposter", 'resources/images/imagelists/default-image.png');
    _defineProperty(this, "videopreload", 'none');
    _defineProperty(this, "videosupportmessage", 'Your browser does not support the video tag.');
    _defineProperty(this, "webmformat", null);
    _defineProperty(this, "accessibilitylabel", undefined);
    _defineProperty(this, "hint", undefined);
    _defineProperty(this, "accessibilityrole", 'none');
  }
}
//# sourceMappingURL=video.props.js.map
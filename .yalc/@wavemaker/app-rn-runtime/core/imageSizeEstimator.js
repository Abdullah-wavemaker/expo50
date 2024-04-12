function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { remove } from "lodash-es";
import { Image } from "react-native";
class ImageSizeEstimator {
  constructor() {
    _defineProperty(this, "requestId", 1);
    _defineProperty(this, "requests", new Map());
  }
  createRequest(requestId, onComplete) {
    const request = {};
    request.onComplete = onComplete, request.cancel = () => {
      if (this.requests.has(requestId)) {
        remove(this.requests.get(requestId) || [], request);
      }
    };
    return request;
  }
  getImageSize(imgSrc) {
    Image.getSize(imgSrc, (width, height) => {
      const reqs = this.requests.get(imgSrc);
      if (reqs) {
        reqs.map(req => {
          req.onComplete && req.onComplete(width, height);
        });
        this.requests.delete(imgSrc);
      }
    }, () => this.requests.delete(imgSrc));
  }
  getSize(imgSrc, onComplete) {
    if (!imgSrc) {
      setTimeout(() => onComplete(0, 0), 100);
      return () => {};
    }
    const requestId = imgSrc;
    const request = this.createRequest(requestId, onComplete);
    if (this.requests.has(requestId)) {
      var _this$requests$get;
      (_this$requests$get = this.requests.get(requestId)) === null || _this$requests$get === void 0 ? void 0 : _this$requests$get.push(request);
    } else {
      const reqQueue = [];
      this.requests.set(requestId, reqQueue);
      reqQueue.push(request);
      this.getImageSize(requestId);
    }
    return request.cancel;
  }
}
export default new ImageSizeEstimator();
//# sourceMappingURL=imageSizeEstimator.js.map
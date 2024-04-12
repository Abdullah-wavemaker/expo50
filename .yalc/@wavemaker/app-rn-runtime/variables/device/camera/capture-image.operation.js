export class CaptureImageOperation {
  constructor(camera) {
    this.camera = camera;
  }
  invoke(params) {
    return this.camera.captureImage(params);
  }
}
//# sourceMappingURL=capture-image.operation.js.map
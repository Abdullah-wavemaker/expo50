export class CaptureVideoOperation {
  constructor(camera) {
    this.camera = camera;
  }
  invoke() {
    return this.camera.captureVideo();
  }
}
//# sourceMappingURL=capture-video.operation.js.map
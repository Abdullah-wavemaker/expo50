export class CurrentGeoPositionOperation {
  constructor(location) {
    this.location = location;
  }
  invoke(params) {
    return this.location.getCurrentGeoPosition(params);
  }
}
//# sourceMappingURL=current-geo-position.operation.js.map
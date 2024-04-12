export class ScanOperation {
  constructor(scan) {
    this.scan = scan;
  }
  invoke(params) {
    return this.scan.scanBarcode(params);
  }
}
//# sourceMappingURL=scan.operation.js.map
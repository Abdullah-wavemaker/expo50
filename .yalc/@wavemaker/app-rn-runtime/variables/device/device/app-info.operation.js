import React from "react";
export class AppInfoOperation {
  constructor(data) {
    this.data = data;
  }
  invoke() {
    return Promise.resolve({
      appversion: this.data.appVersion,
      reactversion: React.version
    });
  }
}
//# sourceMappingURL=app-info.operation.js.map
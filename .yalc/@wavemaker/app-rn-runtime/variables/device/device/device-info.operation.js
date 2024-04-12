import * as Device from 'expo-device';
export class DeviceInfoOperation {
  invoke() {
    return Promise.resolve({
      deviceModel: Device.modelName,
      os: Device.osName,
      osVersion: Device.osVersion,
      deviceUUID: ''
    });
  }
}
//# sourceMappingURL=device-info.operation.js.map
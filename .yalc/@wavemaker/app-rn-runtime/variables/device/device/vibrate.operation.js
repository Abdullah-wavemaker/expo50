import { Vibration } from 'react-native';
export class VibrateOperation {
  invoke(params) {
    Vibration.vibrate(params.vibrationtime * 1000);
    return Promise.resolve({});
  }
}
//# sourceMappingURL=vibrate.operation.js.map
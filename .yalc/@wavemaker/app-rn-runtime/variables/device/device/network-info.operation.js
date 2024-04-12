import * as Network from 'expo-network';
export class NetworkInfoOperation {
  invoke() {
    return Network.getNetworkStateAsync().then(response => {
      return {
        connectionType: Network.NetworkStateType[response.type],
        isNetworkAvailable: response.isInternetReachable,
        isOnline: response.isInternetReachable
      };
    });
  }
}
//# sourceMappingURL=network-info.operation.js.map
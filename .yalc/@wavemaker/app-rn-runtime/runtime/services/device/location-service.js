import * as Location from 'expo-location';
import permissionManager from "@wavemaker/app-rn-runtime/runtime/services/device/permissions";
export class LocationService {
  constructor() {}
  getCurrentGeoPosition(params) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('location').then(() => {
        const options = {
          accuracy: 4
        };
        resolve(Location.getCurrentPositionAsync(options));
      }, reject);
    });
  }
}
//# sourceMappingURL=location-service.js.map
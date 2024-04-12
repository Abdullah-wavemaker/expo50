function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import axios from 'axios';
import { clone, isEqual, noop } from 'lodash-es';
import * as Network from 'expo-network';
import NetInfo from '@react-native-community/netinfo';
import StorageService from './storage.service';
import EventNotifier from './event-notifier';
import { getAbortableDefer, isWebPreviewMode, retryIfFails } from './utils';
export class NetworkState {
  constructor() {
    _defineProperty(this, "isConnecting", false);
    _defineProperty(this, "isConnected", true);
    _defineProperty(this, "isNetworkAvailable", true);
    _defineProperty(this, "isServiceAvailable", true);
    _defineProperty(this, "noServiceRequired", false);
  }
}
const AUTO_CONNECT_KEY = 'WM.NetworkService._autoConnect',
  IS_CONNECTED_KEY = 'WM.NetworkService.isConnected',
  excludedList = [new RegExp('/wmProperties.js')],
  networkState = new NetworkState();

/**
 * If server is not connected and url does not match the unblock list of regular expressions,
 * then this function return true. Otherwise, return false.
 * @param url
 * @returns {boolean}
 */
const blockUrl = url => {
  return !networkState.isConnected && url.startsWith('http') && excludedList.findIndex(regExp => regExp.test(url)) < 0;
};
axios.interceptors.request.use(request => {
  if (!networkState.noServiceRequired && request.url && blockUrl(request.url)) {
    const url = request.url;
    const urlSplits = url.split('://');
    const pathIndex = urlSplits[1].indexOf('/');
    urlSplits[1] = 'localhost' + (pathIndex > 0 ? urlSplits[1].substr(pathIndex) : '/');
    request.url = urlSplits.join('://');
  }
  return request;
});
class NetworkService {
  constructor() {
    _defineProperty(this, "_autoConnect", true);
    _defineProperty(this, "_lastKnownNetworkState", void 0);
    _defineProperty(this, "_isCheckingServer", false);
    _defineProperty(this, "appConfig", null);
    _defineProperty(this, "notifier", new EventNotifier());
    /**
     * When the auto connect is enabled, then app is automatically connected  whenever server is available.
     * Every time when app goes offline, auto connect is enabled. Before app coming to online, one can disable
     * the auto connection flow using this method.
     */
    _defineProperty(this, "disableAutoConnect", () => this.setAutoConnect(false));
    /**
     * Returns true, if app is connected to server. Otherwise, returns false.
     *
     * @returns {boolean} Returns true, if app is connected to server. Otherwise, returns false.
     */
    _defineProperty(this, "isConnected", () => {
      this.checkForNetworkStateChange();
      return networkState.isConnected;
    });
    /**
     * Returns true if app is trying to connect to server. Otherwise, returns false.
     *
     * @returns {boolean} Returns true if app is trying to connect to server. Otherwise, returns false.
     */
    _defineProperty(this, "isConnecting", () => networkState.isConnecting);
  }

  /**
   * This method attempts to connect app to the server and returns a promise that will be resolved with
   * a boolean value based on the operation result.
   *
   * @returns {object} promise
   */
  connect() {
    let silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.setAutoConnect(true);
    return this.tryToConnect(silent);
  }
  /**
   * This method disconnects the app from the server and returns a promise that will be resolved with
   * a boolean value based on the operation result. Use connect method to reconnect.
   *
   * @returns {object} promise
   */
  disconnect() {
    const p = this.tryToDisconnect();
    this.disableAutoConnect();
    return p;
  }

  /**
   * If pingServer is true, then it returns a promise that will be resolved with boolean based on service availability
   * check.If pingServer is false, returns a boolean value based on the last known service availability.
   *
   * @returns {boolean} if pingServer is true, then a promise is returned. Otherwise, a boolean value.
   */
  isAvailable() {
    let pingServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (pingServer) {
      return this.isServiceAvailable().then(() => {
        this.checkForNetworkStateChange();
        return networkState.isServiceAvailable;
      });
    }
    return networkState.isServiceAvailable;
  }
  /**
   * This method returns a promise that is resolved when connection is established with server.
   *
   * @returns {object} promise a promise that is resolved with the returned object of fn
   */
  onConnect() {
    let defer = getAbortableDefer(),
      cancelSubscription;
    if (this.isConnected()) {
      return Promise.resolve();
    }
    cancelSubscription = this.notifier.subscribe('onNetworkStateChange', () => {
      if (this.isConnected()) {
        defer.resolve(true);
        cancelSubscription();
      }
    });
    defer.promise.catch(function () {
      cancelSubscription();
    });
    return defer.promise;
  }

  /**
   * This is a util method. If fn cannot execute successfully and network lost connection, then the fn will
   * be invoked when network is back. The returned can also be aborted.
   *
   * @param {function()} fn method to invoke.
   * @returns {object} promise a promise that is resolved with the returned object of fn
   */
  retryIfNetworkFails(fn) {
    const defer = getAbortableDefer();
    retryIfFails(fn, 0, 0, () => {
      let onConnectPromise;
      if (!this.isConnected()) {
        onConnectPromise = this.onConnect();
        defer.promise.catch(function () {
          onConnectPromise.abort();
        });
        return onConnectPromise;
      }
      return false;
    }).then(defer.resolve, defer.reject);
    return defer.promise;
  }
  async start(appConfig) {
    this.appConfig = appConfig;
    networkState.noServiceRequired = !appConfig.url;
    networkState.isConnected = (await StorageService.getItem(IS_CONNECTED_KEY)) === 'true';
    this._autoConnect = (await StorageService.getItem(AUTO_CONNECT_KEY)) !== 'false';
    const state = await Network.getNetworkStateAsync();
    networkState.isNetworkAvailable = !!state.isConnected;
    networkState.isConnected = networkState.isNetworkAvailable && networkState.isConnected;
    !isWebPreviewMode() && NetInfo.addEventListener(state => {
      if (state.isConnected !== networkState.isConnected) {
        if (state.isConnected) {
          networkState.isNetworkAvailable = !!state.isConnected;
          this.tryToConnect().catch(noop);
        } else {
          networkState.isNetworkAvailable = false;
          networkState.isServiceAvailable = false;
          networkState.isConnected = false;
          this.tryToDisconnect();
        }
      }
    });
    this.notifier.subscribe('onNetworkStateChange', data => {
      /**
       * If network is available and server is not available,then
       * try to connect when server is available.
       */
      if (data.isNetworkAvailable && !data.isServiceAvailable && !this._isCheckingServer && !data.noServiceRequired) {
        this._isCheckingServer = true;
        this.checkForServiceAvailiblity().then(() => {
          this._isCheckingServer = false;
          this.connect();
        }, () => {
          this._isCheckingServer = false;
        });
      }
    });
    // to set the default n/w connection values.
    return this.tryToConnect(true).catch(noop);
  }
  getServiceName() {
    return NetworkService.SERVICE_NAME;
  }

  /**
   * This function adds the given regular expression to the unblockList. Even app is in offline mode,
   * the urls matching with the given regular expression are not blocked by NetworkService.
   *
   * @param {string} urlRegex regular expression
   */
  unblock(urlRegex) {
    excludedList.push(new RegExp(urlRegex));
  }
  getState() {
    return clone(networkState);
  }
  checkForNetworkStateChange() {
    if (!isEqual(this._lastKnownNetworkState, networkState)) {
      this._lastKnownNetworkState = clone(networkState);
      this.notifier.notify('onNetworkStateChange', [this._lastKnownNetworkState]);
    }
  }

  /**
   * Returns a promise that is resolved when server is available.
   * @returns {*}
   */
  checkForServiceAvailiblity() {
    const maxTimeout = 4500;
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (networkState.isNetworkAvailable) {
          this.isServiceAvailable(maxTimeout).then(available => {
            if (available) {
              clearInterval(intervalId);
              resolve();
            }
          });
        }
      }, 5000);
    });
  }

  /**
   * Pings server to check whether server is available. Based on ping response network state is modified.
   * @returns {*} a promise that resolved with true, if server responds with valid status.
   * Otherwise, the promise is resolved with false.
   */
  isServiceAvailable(maxTimeout) {
    if (networkState.noServiceRequired) {
      networkState.isServiceAvailable = false;
      networkState.noServiceRequired = true;
      return Promise.resolve(false);
    }
    return this.pingServer(maxTimeout).then(response => {
      networkState.isServiceAvailable = response;
      if (!networkState.isServiceAvailable) {
        networkState.isConnecting = false;
        networkState.isConnected = false;
      }
      return response;
    });
  }

  /**
   * Pings server
   * @returns {*} a promise that resolved with true, if server responds with valid status.
   * Otherwise, the promise is resolved with false.
   * default timeout value is 1min.
   */
  pingServer() {
    let maxTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60000;
    let baseURL = this.appConfig.url;
    if (baseURL && !baseURL.endsWith('/')) {
      baseURL += '/';
    } else {
      baseURL = baseURL || '';
    }
    return axios.get(baseURL + 'services/application/wmProperties.js?t=' + Date.now(), {
      responseType: 'text',
      timeout: maxTimeout
    }).then(res => res.status === 200, () => false);
  }
  setAutoConnect(flag) {
    this._autoConnect = flag;
    StorageService.setItem(AUTO_CONNECT_KEY, '' + flag);
  }

  /**
   * Tries to connect to remote server. Network State will be changed based on the success of connection
   * operation and emits an event notifying the network state change.
   *
   * @param silentMode {boolean} if true and connection is successful, then no event is emitted. Otherwise,
   * events are emitted for network status change.
   * @returns {*} a promise
   */
  tryToConnect() {
    let silentMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return new Promise((resolve, reject) => {
      this.isServiceAvailable(5000).then(() => {
        if (networkState.isServiceAvailable && this._autoConnect) {
          networkState.isConnecting = true;
          if (!silentMode) {
            this.checkForNetworkStateChange();
          }
          setTimeout(() => {
            networkState.isConnecting = false;
            networkState.isConnected = true;
            StorageService.setItem(IS_CONNECTED_KEY, '' + true);
            if (!silentMode) {
              this.checkForNetworkStateChange();
            }
            resolve(true);
          }, silentMode ? 0 : 5000);
        } else {
          networkState.isConnecting = false;
          networkState.isConnected = false;
          StorageService.setItem(IS_CONNECTED_KEY, '' + false);
          reject();
          this.checkForNetworkStateChange();
        }
      });
    });
  }
  tryToDisconnect() {
    networkState.isConnected = false;
    networkState.isConnecting = false;
    this.checkForNetworkStateChange();
    StorageService.setItem(IS_CONNECTED_KEY, '' + networkState.isConnected);
    return Promise.resolve(networkState.isConnected);
  }
}
_defineProperty(NetworkService, "SERVICE_NAME", 'NetworkService');
export default new NetworkService();
//# sourceMappingURL=network.service.js.map
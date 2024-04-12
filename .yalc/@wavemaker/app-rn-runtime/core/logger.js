function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { keys, sortBy } from 'lodash-es';
import { logger } from 'react-native-logs';
import StorageService from './storage.service';
class LoggerCollection {
  constructor() {
    _defineProperty(this, "loggerMap", new Map());
    _defineProperty(this, "config", {});
    _defineProperty(this, "key", 'wm.log.config');
  }
  init() {
    StorageService.getItem(this.key).then(data => {
      if (data) {
        this.config = JSON.parse(data) || {};
        keys(this.config).forEach(k => {
          var _this$loggerMap$get;
          (_this$loggerMap$get = this.loggerMap.get(k)) === null || _this$loggerMap$get === void 0 ? void 0 : _this$loggerMap$get.setLevel(this.config[k].level);
        });
      }
    }).catch(() => {});
  }
  get(name) {
    return this.loggerMap.get(name);
  }
  set(name, logger) {
    this.loggerMap.set(name, logger);
  }
  setLogLevel(name, level) {
    if (!level && name && levels[name] !== undefined) {
      level = name;
      name = undefined;
    }
    if (level !== undefined) {
      [...this.loggerMap.keys()].filter(k => !name || k.startsWith(name)).forEach(k => {
        var _this$loggerMap$get2;
        level && ((_this$loggerMap$get2 = this.loggerMap.get(k)) === null || _this$loggerMap$get2 === void 0 ? void 0 : _this$loggerMap$get2.setLevel(level));
        if (k) {
          this.config[k] = this.config[k] || {};
          this.config[k].level = level;
        }
      });
      StorageService.setItem(this.key, JSON.stringify(this.config));
    }
  }
  getLogLevel(name, level) {
    var _this$config$name;
    return name && ((_this$config$name = this.config[name]) === null || _this$config$name === void 0 ? void 0 : _this$config$name.level);
  }
  list() {
    return sortBy([...this.loggerMap.keys()]);
  }
}
const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
const loggerCollection = new LoggerCollection();
const log = logger.createLogger({
  severity: 'debug',
  levels: levels,
  enabledExtensions: []
});
export class Logger {
  constructor(name, level) {
    this.name = name;
    this.level = level;
    _defineProperty(this, "ins", null);
    this.ins = log.extend(this.name);
    log.enable(this.name);
  }
  isEnabled(level) {
    return levels[level] >= levels[this.level];
  }
  log(level, msg) {
    if (this.isEnabled(level)) {
      if (msg instanceof Function) {
        msg = msg();
      }
      this.ins[level](msg);
    }
  }
  extend(name) {
    return getLogger(this.name + '.' + name);
  }
  setLevel(level) {
    this.level = level;
  }
  debug(msg) {
    this.log('debug', msg);
  }
  info(msg) {
    this.log('info', msg);
  }
  warn(msg) {
    this.log('warn', msg);
  }
  error(msg) {
    this.log('error', msg);
  }
}
const getLogger = (name, level) => {
  let logger = loggerCollection.get(name);
  if (!logger) {
    logger = new Logger(name, loggerCollection.getLogLevel(name) || 'error');
    loggerCollection.set(name, logger);
  }
  return logger;
};
export const ROOT_LOGGER = getLogger('root');
export const PERFORMANCE_LOGGER = ROOT_LOGGER.extend('performance');
export const RENDER_LOGGER = PERFORMANCE_LOGGER.extend('render');
export default {
  get: getLogger,
  setLogLevel: (name, level) => loggerCollection.setLogLevel(name, level),
  list: () => loggerCollection.list(),
  reset: () => loggerCollection.setLogLevel('root', 'error'),
  init: () => loggerCollection.init()
};
//# sourceMappingURL=logger.js.map
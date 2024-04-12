function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class InflightQueue {
  constructor() {
    _defineProperty(this, "requestsQueue", new Map());
  }
  /**
   * pushes the process against a variable in its queue
   * @param variable
   * @param {{resolve: (value?: any) => void; reject: (reason?: any) => void}} param2
   * the resolve callback will be called on
   */
  addToQueue(variable, param2) {
    if (this.requestsQueue.has(variable)) {
      this.requestsQueue.get(variable).push(param2);
    } else {
      const processes = [];
      processes.push({
        resolve: param2.resolve,
        reject: param2.reject,
        active: false
      });
      this.requestsQueue.set(variable, processes);
    }
  }

  /**
   * Calls the reject method against the passed process
   * @param process
   */
  rejectProcess(process) {
    process.reject('PROCESS_REJECTED_IN_QUEUE');
  }

  /**
   * clears the queue against a variable
   * @param variable
   */
  clear(variable) {
    this.requestsQueue.delete(variable);
  }

  /**
   * executes the n/w calls for a specified variable pushed in its respective queue (pushed while it was inFlight)
   * @param variable
   */
  process(variable) {
    const processes = this.requestsQueue.get(variable);
    let nextProcess;

    // process request queue for the variable only if it is not empty
    if (!processes || !processes.length) {
      this.clear(variable);
      return;
    }

    // If only one item in queue
    if (processes.length === 1) {
      nextProcess = processes[0];
      if (nextProcess.active) {
        this.clear(variable);
      } else {
        nextProcess.active = true;
        nextProcess.resolve();
      }
      return;
    }
    switch (variable.config.inFlightBehavior) {
      case 'executeLast':
        for (let i = 0; i < processes.length - 2; i++) {
          this.rejectProcess(processes[i]);
        }
        processes.splice(0, processes.length - 1);
        this.process(variable);
        break;
      case 'executeAll':
        nextProcess = processes.splice(0, 1)[0];
        if (nextProcess.active) {
          nextProcess = processes.splice(0, 1)[0];
        }
        nextProcess.active = true;
        nextProcess.resolve();
        break;
      default:
        for (let i = 0; i < processes.length - 1; i++) {
          this.rejectProcess(processes[i]);
        }
        this.clear(variable);
        break;
    }
  }

  /**
   * initializes the queue against a variable and makes the first process call
   * If already initialized and a process in queue is in progress, the queue is not processed.
   * To process the next item in the queue, the process method has to be called from the caller.
   * @param variable
   * @returns {Promise<any>}
   */
  submit(variable) {
    return new Promise((resolve, reject) => {
      this.addToQueue(variable, {
        resolve: resolve,
        reject: reject
      });
      if (this.requestsQueue.get(variable).length === 1) {
        this.process(variable);
      }
    });
  }
}
export const $queue = new InflightQueue();
//# sourceMappingURL=inflight-queue.js.map
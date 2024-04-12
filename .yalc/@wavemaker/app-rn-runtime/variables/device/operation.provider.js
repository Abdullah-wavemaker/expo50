const registry = new Map();
export class OperationProvider {
  set(name, operation) {
    return registry.set(name, operation);
  }
  get(name) {
    return registry.get(name);
  }
}
export default new OperationProvider();
//# sourceMappingURL=operation.provider.js.map
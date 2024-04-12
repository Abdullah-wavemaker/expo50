import { BaseVariable, VariableEvents } from '@wavemaker/app-rn-runtime/variables/base-variable';
import OperationProvider from './device/operation.provider';
export class DeviceVariable extends BaseVariable {
  constructor(config) {
    super(config);
    this.dataSet = this.isList ? [] : {};
  }
  invoke(params, onSuccess, onError) {
    super.invoke(params, onSuccess, onError);
    const operation = OperationProvider.get(`${this.config.service}.${this.config.operation}`);
    if (!operation) {
      return Promise.resolve(this);
    }
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);
    return operation.invoke(this.params, onSuccess, onError).then(data => {
      this.dataSet = data;
      this.config.onSuccess && this.config.onSuccess(this, this.dataSet);
      this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
    }, err => {
      this.config.onError && this.config.onError(this, null);
      this.notify(VariableEvents.ERROR, [this, this.dataSet]);
    }).then(() => {
      this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
      return this;
    });
  }
}
//# sourceMappingURL=device-variable.js.map
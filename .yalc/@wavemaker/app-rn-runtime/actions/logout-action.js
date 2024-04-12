import { BaseAction } from "./base-action";
import { VariableEvents } from '../variables/base-variable';
export class LogoutAction extends BaseAction {
  constructor(config) {
    super(config);
  }
  invoke(options, successcb, errorcb) {
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return this.config.securityService().appLogout({
      baseURL: this.config.baseURL
    }).then(data => {
      this.notify(VariableEvents.AFTER_INVOKE, [this, data]);
      this.config.onSuccess && this.config.onSuccess(this, data);
      successcb && successcb(data);
    }).catch(error => {
      this.config.onError && this.config.onError(this, error);
      errorcb && errorcb(error);
      this.notify(VariableEvents.AFTER_INVOKE, [this, error]);
    });
  }
}
//# sourceMappingURL=logout-action.js.map
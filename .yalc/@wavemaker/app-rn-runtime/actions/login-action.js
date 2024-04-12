import { BaseAction } from "./base-action";
import { VariableEvents } from '../variables/base-variable';
import { get } from 'lodash';
export class LoginAction extends BaseAction {
  constructor(config) {
    super(config);
  }
  invoke(options, successcb, errorcb) {
    let params;
    if (!get(options, 'formData')) {
      params = this.config.paramProvider();
    }
    this.notify(VariableEvents.BEFORE_INVOKE, [this, params]);
    return this.config.securityService().appLogin({
      baseURL: this.config.baseURL,
      formData: get(options, 'formData') || params,
      useDefaultSuccessHandler: this.config.useDefaultSuccessHandler
    }).then(data => {
      this.config.onSuccess && this.config.onSuccess(this, get(data, 'userInfo'));
      successcb && successcb(data);
      this.notify(VariableEvents.AFTER_INVOKE, [this, data]);
      if (this.config.useDefaultSuccessHandler) {
        this.config.securityService().navigateToLandingPage(data);
      }
    }).catch(error => {
      this.config.onError && this.config.onError(this, error);
      errorcb && errorcb(error);
      this.notify(VariableEvents.AFTER_INVOKE, [this, error]);
    });
  }
}
//# sourceMappingURL=login-action.js.map
import { VariableEvents } from "@wavemaker/app-rn-runtime/variables/base-variable";
import { BaseAction } from "./base-action";
import { merge } from "lodash";
export class NavigationAction extends BaseAction {
  constructor(config) {
    super(config);
  }
  invoke(params, onSuccess, onError) {
    var _params;
    const config = this.config;
    // @ts-ignore
    params = (_params = params) !== null && _params !== void 0 && _params.data ? merge(this.config.paramProvider(), params.data) : merge(this.config.paramProvider(), this.dataSet);
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);
    return super.invoke(params, onSuccess, onError).then(() => {
      var _config$appConfig$cur, _this$config$_context, _params2, _this$config$_context2, _params3, _config$appConfig$cur2;
      switch (config.operation) {
        case 'goToPreviousPage':
          (_config$appConfig$cur = config.appConfig.currentPage) === null || _config$appConfig$cur === void 0 ? void 0 : _config$appConfig$cur.goBack();
          break;
        case 'gotoTab':
          (_this$config$_context = this.config._context) === null || _this$config$_context === void 0 ? void 0 : _this$config$_context.Widgets[(_params2 = params) === null || _params2 === void 0 ? void 0 : _params2.tabName].select();
          break;
        case 'gotoAccordion':
          (_this$config$_context2 = this.config._context) === null || _this$config$_context2 === void 0 ? void 0 : _this$config$_context2.Widgets[(_params3 = params) === null || _params3 === void 0 ? void 0 : _params3.accordionName].expand();
          break;
        case 'gotoPage':
          (_config$appConfig$cur2 = config.appConfig.currentPage) === null || _config$appConfig$cur2 === void 0 ? void 0 : _config$appConfig$cur2.goToPage(this.params.pageName, this.params);
      }
    }).then(() => {
      config.onSuccess && config.onSuccess(this, this.dataSet);
      this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
    }, () => {
      config.onError && config.onError(this, null);
      this.notify(VariableEvents.ERROR, [this, this.dataSet]);
    }).then(() => {
      this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
      return this;
    });
  }
  navigate(params, onSuccess, onError) {
    return this.invoke(params, onSuccess, onError);
  }
}
//# sourceMappingURL=navigation-action.js.map
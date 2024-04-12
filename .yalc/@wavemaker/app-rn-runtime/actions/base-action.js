import { BaseVariable } from "@wavemaker/app-rn-runtime/variables/base-variable";
import { merge } from "lodash";
export class BaseAction extends BaseVariable {
  constructor(config) {
    super(config);
  }
  setData(dataSet) {
    // @ts-ignore
    this.dataSet = merge(this.config.paramProvider(), dataSet);
  }
}
//# sourceMappingURL=base-action.js.map
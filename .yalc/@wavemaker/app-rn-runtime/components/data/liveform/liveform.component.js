function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { forEach, isEmpty, some, get } from 'lodash';
import WmForm from '@wavemaker/app-rn-runtime/components/data/form/form.component';
export class WmFormState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isValid", false);
    _defineProperty(this, "type", 'success');
    _defineProperty(this, "message", '');
    _defineProperty(this, "showInlineMsg", false);
  }
}
const Live_Operations = {
  INSERT: 'insert',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read'
};
export default class WmLiveForm extends WmForm {
  findOperationType() {
    let operation;
    let isPrimary = false;
    // const sourceOperation = this.form.datasource && this.form.datasource.execute(DataSource.Operation.GET_OPERATION_TYPE);
    // if (sourceOperation && sourceOperation !== 'read') {
    //   return sourceOperation;
    // }
    /*If OperationType is not set then based on the formdata object return the operation type,
        this case occurs only if the form is outside a livegrid*/
    /*If the formdata object has primary key value then return update else insert*/
    if (this.primaryKey && !isEmpty(this.state.props.formdata)) {
      /*If only one column is primary key*/
      if (this.primaryKey.length === 1) {
        if (this.state.props.formdata[this.primaryKey[0]]) {
          operation = Live_Operations.UPDATE;
        }
        /*If only no column is primary key*/
      } else if (this.primaryKey.length === 0) {
        forEach(this.state.props.formdata, value => {
          if (value) {
            isPrimary = true;
          }
        });
        if (isPrimary) {
          operation = Live_Operations.UPDATE;
        }
        /*If multiple columns are primary key*/
      } else {
        // @ts-ignore
        isPrimary = some(this.primaryKey, primaryKey => {
          if (this.state.props.formdata[primaryKey]) {
            return true;
          }
        });
        if (isPrimary) {
          operation = Live_Operations.UPDATE;
        }
      }
    }
    return operation || Live_Operations.INSERT;
  }

  // @ts-ignore
  handleSubmit(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const formData = this.state.props.dataoutput || this.formdataoutput;
    const operationType = this.findOperationType();
    if (!this.validateFieldsOnSubmit()) {
      return false;
    }
    if (this.props.onBeforesubmit) {
      this.invokeEventCallback('onBeforesubmit', [null, this.proxy, formData]);
    }
    if (this.props.formSubmit) {
      this.props.formSubmit({
        inputFields: formData
      }, operationType, data => {
        this.invokeEventCallback('onSubmit', [null, this.proxy, formData]);
        this.onResultCb(get(data, 'params'), 'success');
      }, error => {
        this.invokeEventCallback('onSubmit', [null, this.proxy, formData]);
        this.onResultCb(error, '');
      });
    } else {
      this.invokeEventCallback('onSubmit', [null, this.proxy, formData]);
    }
  }
  onResultCb(response, status, event) {
    this.invokeEventCallback('onResult', [null, this.proxy, response]);
    if (status) {
      this.invokeEventCallback('onSuccess', [null, this.proxy, response]);
      this.props.formSuccess && this.props.formSuccess();
      !this.props.onSuccess && this.state.props.postmessage && this.toggleMessage('success', this.state.props.postmessage);
    } else {
      this.invokeEventCallback('onError', [null, this.proxy, response]);
      !this.props.onError && this.toggleMessage('error', this.state.props.errormessage || get(response, 'message') || response);
    }
  }
}
//# sourceMappingURL=liveform.component.js.map
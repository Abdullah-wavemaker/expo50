function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { isDefined } from '@wavemaker/app-rn-runtime/core/utils';
import { debounce, find, forEach, isNil, get, set, cloneDeep, isEmpty } from 'lodash';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmMessage from '@wavemaker/app-rn-runtime/components/basic/message/message.component';
import { ToastConsumer } from '@wavemaker/app-rn-runtime/core/toast.service';
import WmFormProps from './form.props';
import { DEFAULT_CLASS } from './form.styles';
import { isDataSetWidget } from '@wavemaker/app-rn-runtime/core/utils';
export class WmFormState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isValid", false);
    _defineProperty(this, "type", 'success');
    _defineProperty(this, "message", '');
    _defineProperty(this, "showInlineMsg", false);
    _defineProperty(this, "isUpdateMode", true);
    _defineProperty(this, "dynamicForm", void 0);
  }
}
export default class WmForm extends BaseComponent {
  // object containing key as name of formField and value as WmFormField proxy.
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFormProps(), new WmFormState());
    _defineProperty(this, "formFields", []);
    // contains array of direct widget elements [WmText, WmNumber, WmCurrent]
    _defineProperty(this, "parentFormRef", void 0);
    _defineProperty(this, "formfields", {});
    _defineProperty(this, "formdataoutput", void 0);
    _defineProperty(this, "toaster", void 0);
    _defineProperty(this, "formActions", []);
    _defineProperty(this, "primaryKey", []);
    _defineProperty(this, "buttonArray", []);
    _defineProperty(this, "formWidgets", {});
    _defineProperty(this, "_debouncedSubmitForm", debounce(this.handleSubmit, 250));
  }
  componentDidMount() {
    super.componentDidMount();
    this.getParentFormRef(this.props.parentForm);
  }
  getParentFormRef(pformName) {
    let current = this.parent;
    while (current) {
      if (get(current, 'props.name') === pformName) {
        this.parentFormRef = current;
        break;
      }
      current = current.parent;
    }
  }
  setReadonlyFields() {
    var _this$formFields;
    (_this$formFields = this.formFields) === null || _this$formFields === void 0 ? void 0 : _this$formFields.forEach(field => {
      field.setReadOnlyState(this.state.isUpdateMode);
    });
  }
  setReadonlyState(updateMode) {
    this.updateState({
      isUpdateMode: updateMode
    });
    setTimeout(() => {
      this.showActions();
      this.setReadonlyFields();
    }, 100);
  }
  edit() {
    this.setReadonlyState(true);
  }
  new() {
    this.setReadonlyState(true);
  }
  cancel() {
    this.setReadonlyState(false);
  }
  delete() {}
  registerFormFields(formFields, formWidgets) {
    forEach(formFields, w => {
      if (!w.form) {
        w.form = this;
        w.formwidget = w.props.formKey && formWidgets[w.props.formKey] || w.props.name && formWidgets[w.props.name];
      }
    });
    this.formFields = formFields;
    this.formWidgets = formWidgets;
    formFields === null || formFields === void 0 ? void 0 : formFields.forEach(f => {
      if (f.props.name) {
        set(this.formfields, f.props.name, f);
      }
    });
    this.setReadonlyFields();
    this.applyFormData();
    this.applyDefaultValue();

    // setting default form dataoutput.
    if (!this.formdataoutput) {
      this.formdataoutput = {};
      formFields === null || formFields === void 0 ? void 0 : formFields.forEach(w => {
        const name = get(w.props, 'formKey') || w.props.name;
        if (name) {
          set(this.formdataoutput, name, w.props.datavalue);
        }
      });
      this.updateState({
        props: {
          dataoutput: this.formdataoutput
        }
      });
    }
  }
  showActions() {
    var _this$buttonArray;
    (_this$buttonArray = this.buttonArray) === null || _this$buttonArray === void 0 ? void 0 : _this$buttonArray.forEach(action => {
      action.updateState({
        props: {
          show: action.updateMode === this.state.isUpdateMode
        }
      });
    });
  }
  registerFormActions(formActions) {
    this.buttonArray = formActions;
    this.showActions();
  }
  _updateFieldOnDataSourceChange(field, formFields) {
    if (!field.state.props.isDataSetBound && isDataSetWidget(field.props.widget)) {
      if (field.state.props.isRelated) {
        field.updateState({
          props: {
            isDataSetBound: true
          }
        });
        this.props.relatedData && this.props.relatedData(field);
      }
    }
  }
  applyFormData() {
    var _this$parentFormRef;
    let formData = this.state.props.formdata || ((_this$parentFormRef = this.parentFormRef) === null || _this$parentFormRef === void 0 ? void 0 : _this$parentFormRef.state.props.formdata);
    if (!formData || this.parentFormRef && this.state.props.formdata) {
      return;
    }
    forEach(this.formFields, formField => {
      var _formField$props;
      let fw = ((_formField$props = formField.props) === null || _formField$props === void 0 ? void 0 : _formField$props.name) && this.formWidgets[formField.props.name];
      if (!fw) {
        fw = find(this.formWidgets, fw => {
          return get(fw, 'formfieldname') === formField.props.name;
        });
      }
      let key = get(formField, 'formKey') || get(fw, 'props.name');
      fw && fw.setState({
        isDefault: true
      });
      formField.updateState({
        props: {
          datavalue: get(formData, key)
        }
      });
    });
  }
  updateFormFieldDefaultValue(formField) {
    if (formField) {
      const dv = formField.state.props.defaultvalue;
      if (isDefined(dv) && dv !== null && this.formFields) {
        var _formField$props2;
        let field = ((_formField$props2 = formField.props) === null || _formField$props2 === void 0 ? void 0 : _formField$props2.name) && this.formWidgets[formField.props.name];
        if (!field) {
          field = find(this.formWidgets, fw => {
            return get(fw, 'formfieldname') === formField.props.name;
          });
        }
        if (field) {
          field.setState({
            isDefault: true
          });
          field.updateState({
            props: {
              datavalue: dv
            }
          }, this.invokeEventCallback.bind(formField, 'onFieldChange', [undefined, formField, dv]));
        }
      }
    }
  }
  get dataoutput() {
    return this.formdataoutput;
  }
  applyDefaultValue(formField) {
    if (formField) {
      this.updateFormFieldDefaultValue(formField);
      return;
    }
    forEach(this.formFields, w => {
      this.updateFormFieldDefaultValue(w);
    });
  }
  formreset() {
    this.formdataoutput = {};
    forEach(this.formFields, ff => {
      const defaultValue = isNil(ff.state.props.defaultvalue) ? '' : ff.state.props.defaultvalue;
      ff.updateState({
        props: {
          datavalue: defaultValue
        }
      }, () => {
        const id = ff.props.formKey || ff.props.name;
        if (id) {
          var _widget;
          let widget = this.formWidgets[id];
          if (!widget) {
            widget = find(this.formWidgets, fw => {
              return get(fw, 'formfieldname') === ff.props.name;
            });
          }
          widget.updateState({
            isValid: true,
            props: {
              datavalue: defaultValue
            }
          }, () => ff.updateState({
            isValid: true
          }));
          (_widget = widget) === null || _widget === void 0 ? void 0 : _widget.reset();
        }
      });
    });
  }
  submit() {
    this._debouncedSubmitForm();
  }

  // Function to generate and compile the form fields from the metadata
  generateFormFields() {
    let userFields;
    let fields = this.state.props.metadata ? this.state.props.metadata.data || this.state.props.metadata : [];
    if (isEmpty(fields)) {
      return;
    }
    if (this.props.onBeforerender) {
      userFields = this.invokeEventCallback('onBeforerender', [fields, this.proxy]);
      if (userFields) {
        fields = userFields;
      }
    }
    this.updateState({
      dynamicForm: this.props.generateComponent(fields, this.props.name)
    });
  }
  onPropertyChange(name, $new, $old) {
    var _this$formFields2;
    switch (name) {
      case 'formdata':
        if ($new) {
          this.applyFormData();
        }
        break;
      case 'defaultmode':
        this.updateState({
          isUpdateMode: $new && $new === 'Edit' ? true : false
        });
        break;
      case 'dataset':
        (_this$formFields2 = this.formFields) === null || _this$formFields2 === void 0 ? void 0 : _this$formFields2.forEach(w => {
          this._updateFieldOnDataSourceChange(w, this.formFields);
        });
        break;
      case 'metadata':
        this.generateFormFields();
        break;
    }
  }
  setPrimaryKey(fieldName) {
    /*Store the primary key of data*/
    this.primaryKey = this.primaryKey || [];
    // @ts-ignore
    if (this.primaryKey.indexOf(fieldName) === -1) {
      // @ts-ignore
      this.primaryKey.push(fieldName);
    }
  }
  // Disable the form submit if form is in invalid state. Highlight all the invalid fields if validation type is default
  validateFieldsOnSubmit() {
    let isValid = true;
    forEach(this.formFields, field => {
      const val = field === null || field === void 0 ? void 0 : field.state.props.datavalue;
      const onValidate = get(field, 'props.onValidate');
      onValidate && onValidate(field);
      if (!val && field !== null && field !== void 0 && field.state.props.required) {
        isValid = false;
        const msg = get(field.defaultValidatorMessages, 'required') || field.state.props.validationmessage;
        field.updateState({
          isValid: isValid,
          props: {
            validationmessage: msg
          }
        });
        field.formwidget.validate && field.formwidget.validate(val);
      }
      // check for isvalid state of formwidget
      if (field.formwidget.state.isValid === false) {
        isValid = false;
      }
    });
    return isValid;
  }

  // @ts-ignore
  handleSubmit(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const formData = cloneDeep(this.state.props.dataoutput || this.formdataoutput);
    if (!this.validateFieldsOnSubmit()) {
      return false;
    }
    if (this.props.onBeforesubmit) {
      this.invokeEventCallback('onBeforesubmit', [null, this.proxy, formData]);
    }
    if (this.props.formSubmit) {
      this.props.formSubmit(formData, data => {
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
      !this.props.onSuccess && this.state.props.postmessage && this.toggleMessage('success', this.state.props.postmessage);
    } else {
      this.invokeEventCallback('onError', [null, this.proxy, response]);
      !this.props.onError && this.toggleMessage('error', this.state.props.errormessage || get(response, 'message'));
    }
  }
  updateDataOutput(key, val) {
    const current = this.formdataoutput || {};
    if (key) {
      set(current, key, val);
    } else {
      Object.assign(current, val);
    }
    this.formdataoutput = current;
    this.updateState({
      props: {
        dataoutput: current
      }
    });
    this.parentFormRef && this.parentFormRef.updateDataOutput(undefined, this.formdataoutput);
    this.updateState({
      props: {
        dataoutput: this.formdataoutput
      }
    });
  }
  toggleMessage(type, message) {
    if (this.state.props.messagelayout === 'Inline') {
      this.setState({
        type: type,
        message: message,
        showInlineMsg: true
      });
      return;
    }
    this.toaster.showToast({
      name: this,
      placement: "",
      styles: {
        bottom: 0
      },
      text: message,
      type: type,
      hideOnClick: true,
      duration: 5000
    });
  }
  onMsgClose() {
    this.setState({
      showInlineMsg: false
    });
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(ToastConsumer, null, toastService => {
      this.toaster = toastService;
      return /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, props.iconclass || props.title || props.subheading ? /*#__PURE__*/React.createElement(View, {
        style: this.styles.heading
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          flex: 1,
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('icon'),
        styles: this.styles.listIcon,
        iconclass: props.iconclass
      }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(WmLabel, {
        id: this.getTestId('title'),
        styles: this.styles.title,
        caption: props.title
      }), /*#__PURE__*/React.createElement(WmLabel, {
        id: this.getTestId('description'),
        styles: this.styles.subheading,
        caption: props.subheading
      })))) : null, this.state.showInlineMsg ? /*#__PURE__*/React.createElement(WmMessage, {
        type: this.state.type,
        caption: this.state.message,
        hideclose: false,
        onClose: this.onMsgClose.bind(this)
      }) : null, props.metadata && this.state.dynamicForm, props.children);
    });
  }
}
//# sourceMappingURL=form.component.js.map
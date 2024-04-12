function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { isEqual, get, find, cloneDeep, forEach, keys } from 'lodash';
import WmFormFieldProps from './form-field.props';
import { DEFAULT_CLASS } from './form-field.styles';
import { PERFORMANCE_LOGGER } from "@wavemaker/app-rn-runtime/core/logger";
export class WmFormFieldState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isValid", true);
  }
}
export default class WmFormField extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFormFieldProps(), new WmFormFieldState());
    _defineProperty(this, "form", void 0);
    _defineProperty(this, "formwidget", void 0);
    _defineProperty(this, "_syncValidators", void 0);
    _defineProperty(this, "defaultValidatorMessages", []);
    _defineProperty(this, "notifyForFields", []);
    _defineProperty(this, "_asyncValidatorFn", void 0);
    if (!this.form) {
      this.form = props.formScope && props.formScope();
    }
  }
  componentDidMount() {
    var _this$form, _this$form2, _this$form3;
    super.componentDidMount();
    this.formwidget = this.props.formKey && ((_this$form = this.form) === null || _this$form === void 0 ? void 0 : _this$form.formWidgets[this.props.formKey]) || this.props.name && ((_this$form2 = this.form) === null || _this$form2 === void 0 ? void 0 : _this$form2.formWidgets[this.props.name]);
    (_this$form3 = this.form) === null || _this$form3 === void 0 ? void 0 : _this$form3.registerFormFields(this.form.formFields, this.form.formWidgets);
  }
  onFieldChangeEvt(name, $new, $old, isDefault) {
    this.notifyChanges();
    if (!isEqual($old, $new)) {
      this.updateState({
        props: {
          datavalue: $new
        }
      }, () => {
        !isDefault && this.invokeEventCallback('onChange', [undefined, this, $new, $old]);
        this.validateFormField();
      });
      if (this.form) {
        this.form.updateDataOutput.call(this.form, get(this.props, 'formKey', this.props.name), $new);
      }
    }
  }

  // Registers observer of validation fields
  observeOn(fields) {
    forEach(fields, field => {
      const formfield = find(this.form.formFields, f => f.proxy.name === field);
      if (formfield) {
        formfield.notifyForFields.push(this);
      }
    });
  }

  // Notifies changes to observing validation fields
  notifyChanges() {
    forEach(this.notifyForFields, field => {
      field.formwidget.validate(field.formwidget.datavalue);
      setTimeout(() => field.validateFormField());
    });
  }
  getPromiseList(validators) {
    const arr = [];
    forEach(validators, fn => {
      let promise = fn;
      if (fn instanceof Function && fn.bind) {
        promise = fn(this.formwidget.proxy, this.form);
      }
      if (promise instanceof Promise) {
        arr.push(promise);
      }
    });
    return arr;
  }

  // this method sets the asyncValidation on the form field. Assigns validationmessages from the returned response
  setAsyncValidators(validators) {
    this._asyncValidatorFn = () => {
      return Promise.all(this.getPromiseList(validators)).then(() => {
        return null;
      }, err => {
        let validationMsg;
        // if err obj has validationMessage key, then set validationMessage using this value
        // else return the value of the first key in the err object as validation message.
        if (err.hasOwnProperty('errorMessage')) {
          validationMsg = get(err, 'errorMessage');
        } else {
          const messageKeys = keys(err);
          validationMsg = err[messageKeys[0]].toString();
        }
        this.setInvalidState(validationMsg);
        return err;
      });
    };
  }

  // sets the default validation on the form field
  setValidators(validators) {
    let _cloneValidators = cloneDeep(validators);
    this._syncValidators = [];
    forEach(_cloneValidators, (obj, index) => {
      // custom validation is bound to function.
      if (obj && obj instanceof Function) {
        // passing formwidget and form as arguments to the obj (i.e. validator function)
        _cloneValidators[index] = obj.bind(undefined, this.formwidget.proxy, this.form);
        this._syncValidators.push(_cloneValidators[index]);
      } else {
        // checks for default validator like required, maxchars etc.
        const key = get(obj, 'type');
        this.defaultValidatorMessages[key] = get(obj, 'errorMessage');
        const value = get(obj, 'validator');
        let propsObj = {
          props: {}
        };
        propsObj.props[key] = value;
        key === 'required' && this.updateState(propsObj);
        this.formwidget.updateState(propsObj);
      }
    });
  }
  updateFormWidgetDataset(res, displayField) {
    this.formwidget.updateState({
      props: {
        dataset: res.data,
        datafield: 'All Fields',
        displayfield: this.formwidget.state.props.displayfield || displayField
      }
    });
  }
  setInvalidState(msg) {
    this.updateState({
      isValid: false,
      props: {
        validationmessage: msg
      }
    });
    this.formwidget.updateState({
      isValid: false,
      props: {
        validationmessage: msg
      }
    });
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'datavalue':
        if (!isEqual($old, $new)) {
          PERFORMANCE_LOGGER.debug(`form field ${this.props.name} changed from ${$old} to ${$new}`);
        }
        break;
      case 'defaultvalue':
        if (!isEqual($old, $new)) {
          get(this, 'form') && this.form.applyDefaultValue(this);
        }
        break;
      case 'primary-key':
        if ($new) {
          this.form.setPrimaryKey(this.props.name);
        }
        break;
    }
  }
  setReadOnlyState(updateMode) {
    var _this$formwidget;
    (_this$formwidget = this.formwidget) === null || _this$formwidget === void 0 ? void 0 : _this$formwidget.updateState({
      props: {
        readonly: !updateMode
      }
    });
  }
  validateFormField() {
    var _this$formwidget2, _this$_syncValidators;
    if (((_this$formwidget2 = this.formwidget) === null || _this$formwidget2 === void 0 ? void 0 : _this$formwidget2.state.isValid) === false) {
      var _this$formwidget3;
      const errorType = (_this$formwidget3 = this.formwidget) === null || _this$formwidget3 === void 0 || (_this$formwidget3 = _this$formwidget3.state) === null || _this$formwidget3 === void 0 ? void 0 : _this$formwidget3.errorType;
      let validationMsg = get(this.defaultValidatorMessages, errorType);
      if (validationMsg) {
        if (validationMsg instanceof Function) {
          // passing formwidget and form as arguments to the errorMessage function.
          validationMsg = validationMsg(this.formwidget.proxy, this.form);
        }
        this.updateState({
          props: {
            validationmessage: validationMsg
          }
        });
      }
      this.updateState({
        isValid: false
      });
    } else {
      this.updateState({
        isValid: true
      });
    }
    (_this$_syncValidators = this._syncValidators) === null || _this$_syncValidators === void 0 ? void 0 : _this$_syncValidators.forEach(fn => {
      const errormsg = fn();
      let validationMsg = errormsg === null || errormsg === void 0 ? void 0 : errormsg.errorMessage;
      if (validationMsg) {
        if (validationMsg instanceof Function) {
          // passing formwidget and form as arguments to the errorMessage function.
          validationMsg = validationMsg(this.formwidget.proxy, this.form);
        }
        this.setInvalidState(validationMsg);
      }
    });
    this._asyncValidatorFn && this._asyncValidatorFn();
  }
  get value() {
    return this.state.props.datavalue;
  }
  renderWidget(props) {
    var childrenWithProps = React.Children.map(props.renderFormFields(this.proxy).props.children, child => {
      return /*#__PURE__*/React.cloneElement(child, {
        datavalue: props.datavalue,
        value: this.value,
        isValid: this.state.isValid,
        maskchar: props.maskchar,
        displayformat: props.displayformat,
        invokeEvent: this.invokeEventCallback.bind(this),
        triggerValidation: this.validateFormField.bind(this),
        onFieldChange: this.onFieldChangeEvt.bind(this),
        formRef: props.formRef
      });
    });
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, childrenWithProps, this.state.isValid === false && /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel('error_msg'), {
      style: this.styles.errorMsg
    }), props.validationmessage));
  }
}
//# sourceMappingURL=form-field.component.js.map
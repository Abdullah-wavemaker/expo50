function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { DEFAULT_CLASS } from '@wavemaker/app-rn-runtime/components/navigation/basenav/basenav.styles';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { isString } from 'lodash';
import { Platform } from 'react-native';
import { validateField } from '@wavemaker/app-rn-runtime/core/utils';
import Injector from '@wavemaker/app-rn-runtime/core/injector';
export class BaseInputState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "keyboardType", 'default');
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "textValue", '');
    _defineProperty(this, "isDefault", false);
    _defineProperty(this, "errorType", '');
  }
}
export class BaseInputComponent extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 ? arguments[2] : undefined;
    let defaultState = arguments.length > 3 ? arguments[3] : undefined;
    super(props, defaultClass, defaultProps, defaultState);
    this.defaultClass = defaultClass;
    _defineProperty(this, "widgetRef", null);
    _defineProperty(this, "isTouched", false);
    _defineProperty(this, "cursor", 0);
  }
  focus() {
    var _this$widgetRef;
    this === null || this === void 0 || (_this$widgetRef = this.widgetRef) === null || _this$widgetRef === void 0 ? void 0 : _this$widgetRef.focus();
  }
  blur() {
    var _this$widgetRef2, _this$widgetRef3;
    (this === null || this === void 0 || (_this$widgetRef2 = this.widgetRef) === null || _this$widgetRef2 === void 0 ? void 0 : _this$widgetRef2.blur) && (this === null || this === void 0 || (_this$widgetRef3 = this.widgetRef) === null || _this$widgetRef3 === void 0 ? void 0 : _this$widgetRef3.blur());
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'type':
        let keyboardType;
        if (this.props.type === 'number') {
          keyboardType = 'numeric';
        } else if (this.props.type === 'tel') {
          keyboardType = 'phone-pad';
        } else if (this.props.type === 'email') {
          keyboardType = 'email-address';
        }
        this.updateState({
          keyboardType: keyboardType
        });
        break;
      case 'datavalue':
        this.updateState({
          textValue: $new
        });
        const isDefault = this.state.isDefault;
        if (isDefault) {
          this.updateState({
            isDefault: false
          }, this.props.onFieldChange && this.props.onFieldChange.bind(this, 'datavalue', $new, $old, isDefault));
        } else {
          this.props.onFieldChange && this.props.onFieldChange('datavalue', $new, $old, isDefault);
        }
    }
  }
  onChange(event) {
    if (this.state.props.updateon === 'default') {
      this.updateDatavalue(event.target.value, event);
    }
  }
  onChangeText(value) {
    this.updateState({
      textValue: value
    }, () => {
      if (this.state.props.updateon === 'default') {
        this.validate(value);
        this.updateDatavalue(value, null);
      }
    });
  }
  invokeChange(e) {
    if (Platform.OS === 'web') {
      this.cursor = e.target.selectionStart;
      this.setState({
        textValue: e.target.value
      });
    }
  }
  updateDatavalue(value, event, source) {
    const props = this.state.props;
    const oldValue = props.datavalue;
    if (value === oldValue) {
      return;
    }

    // autotrim
    if (props.autotrim && props.datavalue && isString(props.datavalue)) {
      value = value.trim();
    }
    this.updateState({
      props: {
        datavalue: value
      }
    }, () => {
      !this.props.onFieldChange && value !== oldValue && this.invokeEventCallback('onChange', [event, this.proxy, value, oldValue]);
      if (source === 'blur') {
        this.invokeEventCallback('onBlur', [event, this.proxy]);
      }
    });
  }
  onBlur(event) {
    Injector.FOCUSED_ELEMENT.remove();
    this.isTouched = true;
    let newVal = this.state.textValue;
    let oldVal = this.state.props.datavalue || '';
    this.validate(newVal);
    if (newVal === '' || newVal == undefined) {
      setTimeout(() => {
        this.props.triggerValidation && this.props.triggerValidation();
      }, 10);
    }
    if (this.state.props.updateon === 'blur') {
      if (oldVal !== newVal) {
        this.updateDatavalue(newVal, event, 'blur');
      } else {
        this.invokeEventCallback('onBlur', [event, this.proxy]);
      }
    }
  }
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.setState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  onFocus(event) {
    // When input widgets are inside list widget and try to focus the field, list is selecting but unable to enter values in input fields
    // because on tap event of list is triggering after 200ms timeout So added 250ms timeout here
    setTimeout(() => {
      Injector.FOCUSED_ELEMENT.set(this);
      this.invokeEventCallback('onFocus', [event, this.proxy]);
    }, 250);
  }
  onKeyPress(event) {
    this.invokeEventCallback('onKeypress', [event, this.proxy]);
  }
}
//# sourceMappingURL=baseinput.component.js.map
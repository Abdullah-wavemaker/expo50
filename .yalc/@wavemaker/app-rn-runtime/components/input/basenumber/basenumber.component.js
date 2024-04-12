function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { includes, intersection, isNaN, isFinite, toArray, isNil } from 'lodash';
import { BaseComponent, BaseComponentState } from "@wavemaker/app-rn-runtime/core/base.component";
import { DEFAULT_CLASS } from "@wavemaker/app-rn-runtime/components/navigation/basenav/basenav.styles";
import { Platform } from 'react-native';
import { countDecimalDigits, validateField } from '@wavemaker/app-rn-runtime/core/utils';
export class BaseNumberState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "textValue", '');
    _defineProperty(this, "isDefault", false);
    _defineProperty(this, "errorType", '');
  }
}
export class BaseNumberComponent extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 ? arguments[2] : undefined;
    let defaultState = arguments.length > 3 ? arguments[3] : undefined;
    super(props, defaultClass, defaultProps, defaultState);
    this.defaultClass = defaultClass;
    _defineProperty(this, "DECIMAL", void 0);
    _defineProperty(this, "GROUP", void 0);
    _defineProperty(this, "widgetRef", null);
    _defineProperty(this, "cursor", 0);
    this.DECIMAL = '.';
    this.GROUP = ',';
  }
  onChange(event) {
    if (this.state.props.updateon === 'default') {
      this.updateDatavalue(event.target.value, event);
    }
  }
  focus() {
    var _this$widgetRef;
    this === null || this === void 0 || (_this$widgetRef = this.widgetRef) === null || _this$widgetRef === void 0 ? void 0 : _this$widgetRef.focus();
  }
  validateOnDevice(value, type) {
    var _value$match;
    const isCurrencyField = type === 'currency';
    let isValidText = true;

    // * no alphabets except E, may contain E only once
    if (/[a-df-zA-DF-Z]/.test(value) || !/^[^eE]*[eE]?[^eE]*$/.test(value)) {
      isValidText = false;
    }

    // * currency only: check for negative number
    if (isCurrencyField && (Number(value) < 0 || /-/g.test(value))) {
      isValidText = false;
    }

    // * number only: not more than one minus and doesn't end with minus (-)
    if (!isCurrencyField && Number((_value$match = value.match(/-/g)) === null || _value$match === void 0 ? void 0 : _value$match.length) > 1 || /\w-/.test(value)) {
      isValidText = false;
    }

    // * check for more than one decimal point
    if (/^\d*\.\d*\..*$/.test(value)) {
      isValidText = false;
    }

    // * check for spaces and comma
    if (/[\s,]/.test(value)) {
      isValidText = false;
    }
    return isValidText;
  }
  onChangeText(value, type) {
    const isValidTextOnDevice = this.validateOnDevice(value, type);
    if (!isValidTextOnDevice) {
      return;
    }
    const decimalPlacesInNumber = countDecimalDigits(value);
    if (this.props.decimalPlaces < decimalPlacesInNumber) {
      return;
    }
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
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.updateState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  handleValidation(value) {
    const props = this.state.props;
    if (props.regexp) {
      const condition = new RegExp(props.regexp, 'g');
      return condition.test(value);
    }
    return true;
  }

  /**
   * Method parses the Localized number(string) to a valid number.
   * if the string dose not result to a valid number then returns NaN.
   * @param {string} val Localized number.
   * @returns {number}
   */
  parseNumber(val) {
    // splits string into two parts. decimal and number.
    const parts = val.split(this.DECIMAL);
    if (!parts.length) {
      return;
    }
    if (parts.length > 2) {
      return NaN;
    }
    // If number have decimal point and not have a decimal value then return.
    if (parts[1] === '') {
      return NaN;
    }
    // replaces all group separators form the number.
    const number = Number(parts[0].split(this.GROUP).join(''));
    const decimal = Number(`0.${parts[1] || 0}`);
    if (Number.isNaN(number) || Number.isNaN(decimal)) {
      return NaN;
    }
    const sum = parts.length > 1 ? parseFloat((number + decimal).toFixed(parts[1].length)) : number + decimal;
    // if the number is negative then calculate the number as number - decimal
    // Ex: number = -123 and decimal = 0.45 then number - decimal = -123-045 = -123.45
    // If entered number is -0.1 to -0.9 then the number is -0 and decimal is 0.1 to 0.9. Now calaculate the number as number-decimal
    // Ex: number = -0 and decimal = 0.1 then number-decimal = -0-0.1 = -0.1
    if (number === 0) {
      return Object.is(0, number) ? sum : number - decimal;
    }
    return number > 0 ? sum : number - decimal;
  }
  updateDatavalue(value, event, source) {
    const model = value && this.parseNumber(value.toString());
    const props = this.state.props;
    const oldValue = props.datavalue;
    if (value === oldValue) {
      return;
    }
    const validNumber = this.isValidNumber(model) || value == oldValue + '.';
    if (!validNumber) {
      this.invokeEventCallback('onError', [event, this.proxy, value, oldValue]);
      return;
    }
    this.updateState({
      props: {
        datavalue: model || Number(value)
      }
    }, () => {
      !this.props.onFieldChange && value !== oldValue && this.invokeEventCallback('onChange', [event, this.proxy, model, oldValue]);
      if (source === 'blur') {
        this.invokeEventCallback('onBlur', [event, this.proxy]);
      }
    });
  }
  onBlur(event) {
    let newVal = event.target.value || this.state.textValue;
    this.validate(newVal);
    if (newVal === '' || newVal == undefined) {
      setTimeout(() => {
        this.props.triggerValidation && this.props.triggerValidation();
      }, 10);
    }
    if (this.state.props.updateon === 'blur') {
      let oldVal = this.state.props.datavalue || '';
      if (oldVal !== newVal) {
        this.updateDatavalue(newVal, event, 'blur');
      } else {
        this.invokeEventCallback('onBlur', [event, this.proxy]);
      }
    }
  }
  onFocus(event) {
    this.invokeEventCallback('onFocus', [event, this.proxy]);
  }

  /**
   * returns the number of decimal places a number have.
   * @param value: number
   * @returns {number}
   */
  countDecimals(value) {
    if (value && value % 1 !== 0) {
      const decimalValue = value.toString().split('.')[1];
      return decimalValue && decimalValue.length;
    }
    return 0;
  }
  validateInputEntry($event) {
    const props = this.state.props;

    // allow actions if control key is pressed or if backspace is pressed. (for Mozilla).
    if ($event.ctrlKey || includes(['Backspace', 'ArrowRight', 'ArrowLeft', 'Tab', 'Enter', 'Delete'], $event.key)) {
      return;
    }
    const validity = new RegExp(`^[\\d\\s-,.e+${this.GROUP}${this.DECIMAL}]$`, 'i');
    const inputValue = $event.target.value;
    // validates entering of decimal values only when user provides decimal limit(i.e step contains decimal values).
    if (inputValue && this.countDecimals(props.step) && this.countDecimals(inputValue) >= this.countDecimals(props.step)) {
      $event.preventDefault();
    }
    // validates if user entered an invalid character.
    if (!validity.test($event.key)) {
      $event.preventDefault();
    }
    // a decimal value can be entered only once in the input.
    if (includes(inputValue, this.DECIMAL) && $event.key === this.DECIMAL) {
      $event.preventDefault();
    }
    // 'e' can be entered only once in the input.
    if (intersection(toArray(inputValue), ['e', 'E']).length && includes('eE', $event.key)) {
      $event.preventDefault();
    }
    if ((includes(inputValue, '+') || includes(inputValue, '-')) && ($event.key === '+' || $event.key === '-')) {
      $event.preventDefault();
    }
    this.invokeEventCallback('onKeypress', [$event, this.proxy]);
  }

  /**
   * returns a valid number by validating the minimum and maximum values.
   * @param {number} value
   * @returns {number}
   */
  getValueInRange(value) {
    const props = this.state.props;
    if (!isNil(value) && !isNaN(props.minvalue) && value < props.minvalue) {
      this.updateState({
        errorType: 'minvalue'
      });
      return props.minvalue;
    }
    if (!isNil(value) && !isNaN(props.maxvalue) && value > props.maxvalue) {
      this.updateState({
        errorType: 'maxvalue'
      });
      return props.maxvalue;
    }
    return value;
  }

  /**
   * Adds validations for the number before updating the widget model. like validating min and max value for the widget.
   * @param {number} val number to be validated
   * @returns {number}
   */
  isValidNumber(val) {
    const props = this.state.props;

    //empty number widget should not show validation error when required is false
    // @ts-ignore
    if (this.state.props.required === false && val === '') {
      return true;
    }
    // id number is infinite then consider it as invalid value
    if (isNaN(val) || !isFinite(val) || !Number.isInteger(props.step) && this.countDecimals(val) > this.countDecimals(props.step)) {
      this.updateState({
        isValid: false
      });
      return false;
    }
    if (val !== this.getValueInRange(val)) {
      this.updateState({
        isValid: false
      });
      return true;
    }
    this.resetValidations();
    return true;
  }

  // resets all the flags related to the widget's validation.
  resetValidations() {
    this.updateState({
      isValid: true
    });
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'minvalue':
      case 'maxvalue':
        if ($new || $old) {
          this.isValidNumber($new);
        }
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
}
//# sourceMappingURL=basenumber.component.js.map
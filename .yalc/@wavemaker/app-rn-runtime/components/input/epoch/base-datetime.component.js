function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmDatetimeProps from './datetime/datetime.props';
import { DEFAULT_CLASS } from './datetime/datetime.styles';
import WebDatePicker from './date-picker.component';
import { isNumber, isString } from 'lodash-es';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import { validateField } from '@wavemaker/app-rn-runtime/core/utils';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { FloatingLabel } from '@wavemaker/app-rn-runtime/core/components/floatinglabel.component';
import AppI18nService from '@wavemaker/app-rn-runtime/runtime/services/app-i18n.service';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
export class BaseDatetimeState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "showDatePicker", false);
    _defineProperty(this, "dateValue", null);
    _defineProperty(this, "displayValue", null);
    _defineProperty(this, "isFocused", false);
    _defineProperty(this, "timerId", null);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "errorType", '');
  }
}
const CURRENT_DATE = 'CURRENT_DATE';
const CURRENT_TIME = 'CURRENT_TIME';
export default class BaseDatetime extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new WmDatetimeProps();
    let defaultState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new BaseDatetimeState();
    super(props, defaultClass, defaultProps, defaultState);
    _defineProperty(this, "clearBtnClicked", false);
    _defineProperty(this, "modes", []);
    _defineProperty(this, "nativeModalOptions", {});
    _defineProperty(this, "prevDatavalue", void 0);
  }
  format(date, format) {
    if (format === 'timestamp') {
      return date instanceof Date ? '' + date.getTime() : date;
    }
    return date && moment(date).format(format);
  }
  parse(date, format) {
    if (format === 'timestamp') {
      if (isString(date)) {
        return new Date(parseInt(date));
      }
      if (isNumber(date)) {
        return new Date(date);
      }
    }
    return date && moment(date, format).toDate();
  }
  monitorAndUpdateCurrentTime() {
    this.stopCurrentTimeMonitor();
    const timerId = setInterval(() => {
      this.updateState({
        props: {
          readonly: true,
          datavalue: Date.now()
        },
        timerId: timerId
      });
    }, 1000);
  }
  stopCurrentTimeMonitor() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }
  convertTimezone(date) {
    const timezone = AppI18nService.getTimezone();
    if (timezone) {
      const parsedDateString = new Date(date).toLocaleString(this.props.locale ? this.props.locale : 'en-us', {
        timeZone: timezone
      });
      return moment(parsedDateString, 'M/D/YYYY, h:mm:ss A');
    } else {
      return null;
    }
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    const props = this.state.props;
    switch (name) {
      //@ts-ignore
      case 'datavalue':
        this.invokeEventCallback('onChange', [null, this, $new, $old]);
        this.prevDatavalue = $old;
        if (props.datavalue === CURRENT_TIME) {
          this.monitorAndUpdateCurrentTime();
        }
      case 'datepattern':
      case 'outputformat':
        if (props.datavalue && props.outputformat && props.datepattern) {
          let datavalue = props.datavalue;
          if (datavalue === CURRENT_DATE || datavalue === CURRENT_TIME) {
            datavalue = new Date();
          }
          const date = isString(datavalue) ? this.parse(datavalue, props.outputformat) : datavalue;
          datavalue = this.convertTimezone(datavalue);
          this.updateState({
            dateValue: date,
            displayValue: this.format(datavalue ? datavalue : date, props.datepattern)
          });
        } else {
          this.updateState({
            dateValue: null,
            displayValue: null
          });
        }
        this.props.onFieldChange && this.props.onFieldChange('datavalue', props.datavalue, this.prevDatavalue);
        break;
      case 'mindate':
        if (isString($new)) {
          const minDateVal = $new === CURRENT_DATE || $new === CURRENT_TIME ? new Date() : props.mindate;
          this.updateState({
            props: {
              mindate: moment(minDateVal, props.datepattern).toDate()
            }
          });
        }
        break;
      case 'maxdate':
        if (isString($new)) {
          const maxDateVal = $new === CURRENT_DATE || $new === CURRENT_TIME ? new Date() : props.maxdate;
          this.updateState({
            props: {
              maxdate: moment(maxDateVal, props.datepattern).toDate()
            }
          });
        }
        break;
      case 'readonly':
        this.updateState({
          props: {
            disabled: $new
          }
        });
        break;
    }
  }
  onDateChange($event, date) {
    this.validate(date);
    this.modes.shift();
    this.updateState({
      isFocused: false,
      showDatePicker: !!this.modes.length,
      props: {
        datavalue: this.format(date, this.state.props.outputformat),
        timestamp: this.format(date, 'timestamp')
      }
    });
  }
  onBlur() {
    if (Platform.OS === 'web') {
      this.validate(this.state.props.datavalue);
      setTimeout(() => this.props.triggerValidation && this.props.triggerValidation());
    }
    this.invokeEventCallback('onBlur', [null, this]);
  }
  onFocus() {
    if (!this.state.props.readonly) {
      if (Platform.OS !== 'web' && this.state.props.mode === 'datetime') {
        this.modes = ['date', 'time'];
      } else {
        this.modes = [this.state.props.mode];
      }
      this.updateState({
        showDatePicker: true,
        isFocused: true
      });
      this.invokeEventCallback('onFocus', [null, this]);
    }
  }
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.setState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.stopCurrentTimeMonitor();
  }
  renderWebWidget(props) {
    return /*#__PURE__*/React.createElement(WebDatePicker, {
      mode: this.state.props.mode,
      locale: props.locale,
      value: this.state.dateValue || new Date(),
      onDateChange: date => this.onDateChange(null, date),
      onDismiss: () => this.updateState({
        isFocused: false,
        showDatePicker: false
      }, () => this.onBlur()),
      minimumDate: props.mindate,
      maximumDate: props.maxdate
    });
  }
  renderNativeWidget(props, onDismiss) {
    return /*#__PURE__*/React.createElement(DateTimePicker, _extends({
      mode: this.modes[0]
    }, getAccessibilityProps(AccessibilityWidgetType.DATE, {
      ...this.state.props
    }), {
      value: this.state.dateValue || new Date(),
      is24Hour: true,
      display: "default",
      onChange: (event, date) => {
        if (date && this.state.props.mode === 'datetime' && this.modes[0] === 'time') {
          const dateSelected = this.state.dateValue;
          date = moment(date).set('month', dateSelected.getMonth()).set('year', dateSelected.getFullYear()).set('date', dateSelected.getDate()).toDate();
        }
        this.onDateChange(event, date || this.state.dateValue);
        if (this.modes.length <= 1) {
          this.onBlur();
          onDismiss && onDismiss();
        }
      },
      minimumDate: props.mindate,
      maximumDate: props.maxdate
    }));
  }
  renderNativeIOSWidget(props, onDismiss) {
    let date_change = undefined;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.dialog
    }, /*#__PURE__*/React.createElement(DateTimePicker, {
      mode: this.modes[0],
      value: this.state.dateValue || new Date(),
      is24Hour: true,
      display: "spinner",
      onChange: (event, date) => {
        if (date && this.state.props.mode === 'datetime' && this.modes[0] === 'time') {
          const dateSelected = this.state.dateValue;
          date = moment(date).set('month', dateSelected.getMonth()).set('year', dateSelected.getFullYear()).set('date', dateSelected.getDate()).toDate();
        }
        date_change = date;
      },
      minimumDate: props.mindate,
      maximumDate: props.maxdate
    }), /*#__PURE__*/React.createElement(View, {
      style: this.styles.actionWrapper
    }, /*#__PURE__*/React.createElement(WmButton, {
      styles: this.styles.selectBtn,
      caption: "Select",
      onTap: () => {
        this.onDateChange(null, date_change || this.state.dateValue || new Date());
        if (this.modes.length <= 1) {
          this.onBlur();
          onDismiss && onDismiss();
        }
      }
    }), /*#__PURE__*/React.createElement(WmButton, {
      styles: this.styles.cancelBtn,
      caption: "Cancel",
      onTap: () => {
        this.modes.shift();
        this.onDateChange(null, this.state.dateValue || undefined);
        this.onBlur();
        onDismiss && onDismiss();
      }
    })));
  }
  renderNativeIOSWidgetWithModal(props) {
    return /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      this.nativeModalOptions.content = /*#__PURE__*/React.createElement(React.Fragment, null, this.renderNativeIOSWidget(props, () => modalService.hideModal(this.nativeModalOptions)));
      this.nativeModalOptions.centered = true;
      this.nativeModalOptions.onClose = () => {
        this.onBlur();
      };
      modalService.showModal(this.nativeModalOptions);
      return null;
    });
  }
  renderNativeWidgetWithModal(props) {
    return /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      this.nativeModalOptions.content = /*#__PURE__*/React.createElement(React.Fragment, null, this.renderNativeWidget(props, () => modalService.hideModal(this.nativeModalOptions)));
      this.nativeModalOptions.centered = true;
      this.nativeModalOptions.onClose = () => {
        this.onBlur();
      };
      modalService.showModal(this.nativeModalOptions);
      return null;
    });
  }
  addTouchableOpacity(props, children, styles) {
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction(), {
      style: styles,
      onPress: () => {
        if (!props.readonly) {
          this.onFocus();
        }
        this.invokeEventCallback('onTap', [null, this]);
      }
    }), children);
  }
  getIcon() {
    if (this.state.props.mode === 'time') {
      return 'wm-sl-l sl-time';
    }
    return 'wm-sl-l sl-calendar';
  }
  renderWidget(props) {
    return this.addTouchableOpacity(props, /*#__PURE__*/React.createElement(View, {
      style: [this.styles.root, this.state.isValid ? {} : this.styles.invalid, this.state.isFocused ? this.styles.focused : null]
    }, this._background, props.floatinglabel ? /*#__PURE__*/React.createElement(FloatingLabel, {
      moveUp: !!(props.datavalue || this.state.isFocused),
      label: props.floatinglabel ?? props.placeholder,
      style: {
        ...(this.styles.floatingLabel || []),
        ...(this.state.isFocused ? this.styles.activeFloatingLabel || {} : {})
      }
    }) : null, /*#__PURE__*/React.createElement(View, {
      style: this.styles.container
    }, this.addTouchableOpacity(props, /*#__PURE__*/React.createElement(Text, _extends({
      style: [this.styles.text, this.state.displayValue ? {} : this.styles.placeholderText]
    }, this.getTestPropsForLabel()), this.state.displayValue || (props.floatinglabel ? '' : this.state.props.placeholder)), [{
      flex: 1
    }, this.isRTL ? {
      flexDirection: 'row',
      textAlign: 'right'
    } : {}]), !props.readonly && props.datavalue && /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: "wi wi-clear",
      styles: {
        color: this.styles.text.color,
        ...this.styles.clearIcon
      },
      id: this.getTestId('clearicon'),
      onTap: () => {
        this.onDateChange(null, null);
        this.clearBtnClicked = true;
      }
    }) || null, this.addTouchableOpacity(props, /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: this.getIcon(),
      styles: {
        color: this.styles.text.color,
        ...this.styles.calendarIcon
      }
    }))), this.state.showDatePicker && (Platform.OS === 'web' && this.renderWebWidget(props) || Platform.OS === 'android' && this.renderNativeWidget(props) || Platform.OS === 'ios' && this.renderNativeIOSWidgetWithModal(props))));
  }
}
//# sourceMappingURL=base-datetime.component.js.map
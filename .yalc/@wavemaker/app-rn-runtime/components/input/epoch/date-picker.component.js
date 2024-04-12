function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { DatePickerModalContent, TimePickerModal } from 'react-native-paper-dates';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
export class DatePickerProps {
  constructor() {
    _defineProperty(this, "mode", 'datetime');
    _defineProperty(this, "value", new Date());
    _defineProperty(this, "minimumDate", null);
    _defineProperty(this, "maximumDate", null);
    _defineProperty(this, "onDateChange", null);
    _defineProperty(this, "onDismiss", null);
    _defineProperty(this, "locale", '');
  }
}
export class DatePickerState {
  constructor() {
    _defineProperty(this, "value", null);
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "showDatePicker", false);
    _defineProperty(this, "showTimePicker", false);
  }
}
const styles = {
  root: {},
  text: {},
  modal: {},
  content: {
    backgroundColor: ThemeVariables.INSTANCE.datepickerBgColor
  }
};
export default class DatePickerComponnent extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "timemodal", null);
    this.state = {
      showDatePicker: this.props.mode !== 'time',
      showTimePicker: this.props.mode === 'time',
      value: props.value,
      modalOptions: {}
    };
  }
  prepareModalOptions(content) {
    const o = this.state.modalOptions;
    o.content = content;
    o.modalStyle = styles.modal;
    o.centered = true;
    return o;
  }
  onDateChange(date, modalService) {
    const old = this.state.value;
    if (old && date) {
      date.setHours(old.getHours());
      date.setMinutes(old.getMinutes());
    }
    if (this.props.mode === 'date') {
      this.setState({
        value: date,
        showDatePicker: false,
        showTimePicker: false
      }, () => {
        this.props.onDateChange && this.props.onDateChange(this.state.value);
        this.close(modalService);
      });
    } else if (date) {
      this.setState({
        value: date,
        showDatePicker: false,
        showTimePicker: true
      }, () => {
        modalService.refresh();
      });
    }
  }
  onTimeChange(hours, minutes, modalService) {
    const date = this.state.value || new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    this.setState({
      value: date,
      showDatePicker: false,
      showTimePicker: false
    }, () => {
      this.props.onDateChange && this.props.onDateChange(this.state.value);
      this.timemodal = null;
      this.close(modalService);
    });
  }
  prepareTimeModal(modalService) {
    if (!this.timemodal) {
      var _this$props$value, _this$props$value2;
      this.timemodal = /*#__PURE__*/React.createElement(View, {
        style: {
          height: 600,
          marginTop: 600
        }
      }, /*#__PURE__*/React.createElement(TimePickerModal, {
        hours: ((_this$props$value = this.props.value) === null || _this$props$value === void 0 ? void 0 : _this$props$value.getHours()) || 0,
        minutes: ((_this$props$value2 = this.props.value) === null || _this$props$value2 === void 0 ? void 0 : _this$props$value2.getMinutes()) || 0,
        visible: true,
        onDismiss: () => this.close(modalService),
        onConfirm: params => {
          this.onTimeChange(params.hours, params.minutes, modalService);
        }
      }));
    }
    return this.timemodal;
  }
  close(modalService) {
    modalService.hideModal(this.state.modalOptions);
    this.props.onDismiss && this.props.onDismiss();
  }
  render() {
    return this.state.showDatePicker || this.state.showTimePicker ? /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(View, {
        style: this.state.showDatePicker ? styles.content : {}
      }, this.state.showDatePicker && /*#__PURE__*/React.createElement(DatePickerModalContent, {
        mode: "single",
        date: this.props.value,
        onDismiss: () => this.close(modalService),
        onConfirm: params => this.onDateChange(params.date, modalService),
        validRange: {
          startDate: this.props.minimumDate,
          endDate: this.props.maximumDate
        },
        locale: this.props.locale
      }), this.state.showTimePicker && this.prepareTimeModal(modalService))));
      return null;
    }) : null;
  }
}
//# sourceMappingURL=date-picker.component.js.map
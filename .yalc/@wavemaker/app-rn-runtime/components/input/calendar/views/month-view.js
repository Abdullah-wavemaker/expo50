function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/****
 * Copied code from a repo with no active maintenance.
 * https://github.com/hungdev/react-native-customize-selected-date
 * That js lib was converted to ts and fixed bugs. 
 */
import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './month-view.styles';
import _ from 'lodash';
export class MonthViewProps {
  constructor() {
    _defineProperty(this, "testID", null);
    _defineProperty(this, "accessibilityLabel", null);
    _defineProperty(this, "date", null);
    _defineProperty(this, "minDate", moment('1990-01-01', 'YYYY-MM-DD'));
    _defineProperty(this, "maxDate", moment('2100-01-01', 'YYYY-MM-DD'));
    _defineProperty(this, "customMonth", ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    _defineProperty(this, "customWeekdays", ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    _defineProperty(this, "renderPrevYearButton", null);
    _defineProperty(this, "format", 'YYYY-MM-DD');
    _defineProperty(this, "renderPrevMonthButton", null);
    _defineProperty(this, "renderNextYearButton", null);
    _defineProperty(this, "renderNextMonthButton", null);
    _defineProperty(this, "renderChildDay", day => /*#__PURE__*/React.createElement(React.Fragment, null));
    _defineProperty(this, "selectDate", day => {});
    //style
    _defineProperty(this, "getDayStyle", date => ({}));
    _defineProperty(this, "containerStyle", null);
    _defineProperty(this, "warpRowControlMonthYear", null);
    _defineProperty(this, "warpRowWeekdays", null);
    _defineProperty(this, "weekdayStyle", null);
    _defineProperty(this, "textDayStyle", null);
    _defineProperty(this, "currentDayStyle", null);
    _defineProperty(this, "currentDayTextStyle", null);
    _defineProperty(this, "notDayOfCurrentMonthStyle", null);
    _defineProperty(this, "warpDayStyle", null);
    _defineProperty(this, "dateSelectedWarpDayStyle", null);
    _defineProperty(this, "selectedDayTextStyle", null);
    _defineProperty(this, "monthTextStyle", null);
    _defineProperty(this, "yearTextStyle", null);
  }
}
export class MonthViewState {
  constructor() {
    let selectedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : moment();
    this.selectedDate = selectedDate;
    _defineProperty(this, "viewMode", 'day');
    _defineProperty(this, "currentYear", null);
  }
}
export class MonthView extends Component {
  constructor(props) {
    super(props);
    this.state = new MonthViewState(this.props.date);
  }
  calendarArray(date) {
    const dates = [];
    const currDate = date.clone().startOf('month').startOf('week');
    for (let i = 0; i < 42; i += 1) {
      dates[i] = currDate.clone();
      currDate.add(1, 'day');
    }
    return dates;
  }
  renderDay(day) {
    var _this$props$date, _this$props$date2;
    const {
      warpDayStyle,
      dateSelectedWarpDayStyle,
      renderChildDay,
      textDayStyle,
      currentDayStyle,
      currentDayTextStyle,
      notDayOfCurrentMonthStyle,
      selectedDayTextStyle
    } = this.props;
    const dateSelected = (_this$props$date = this.props.date) === null || _this$props$date === void 0 ? void 0 : _this$props$date.isSame(day);
    const isCurrent = moment().isSame(day, 'date');
    const notCurrentMonth = !((_this$props$date2 = this.props.date) !== null && _this$props$date2 !== void 0 && _this$props$date2.isSame(day, 'month'));
    const dateStyle = (this.props.getDayStyle ? this.props.getDayStyle(day) : null) || {};
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      testID: this.props.testID + '_' + day.format('yyyy_mm_dd'),
      accessibilityLabel: this.props.testID + '_' + day.format('yyyy_mm_dd'),
      onPress: () => this.selectDate(day),
      style: [styles.warpDay, warpDayStyle, isCurrent ? currentDayStyle : {}, dateSelected ? {
        backgroundColor: '#2C1F23',
        ...dateSelectedWarpDayStyle
      } : {}, dateStyle.containerStyle]
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.day, textDayStyle, isCurrent ? currentDayTextStyle : {}, notCurrentMonth ? {
        color: '#493D40',
        ...notDayOfCurrentMonthStyle
      } : {}, dateSelected ? {
        color: '#000',
        ...selectedDayTextStyle
      } : {}, dateStyle.textStyle]
    }, day.get('date')), renderChildDay && renderChildDay(day)));
  }
  selectDate(date) {
    if (this.isDateEnable(date)) {
      this.props.selectDate && this.props.selectDate(date);
    }
  }
  yearMonthChange(unit, type) {
    this.selectDate((this.props.date || moment()).clone().add(unit, type).startOf('month'));
  }
  isDateEnable(date) {
    const {
      minDate,
      maxDate
    } = this.props;
    return (minDate === null || minDate === void 0 ? void 0 : minDate.isSameOrBefore(date)) && (maxDate === null || maxDate === void 0 ? void 0 : maxDate.isSameOrAfter(date));
  }
  render() {
    var _this$props$date3, _this$props$date4;
    const {
      renderPrevYearButton,
      renderPrevMonthButton,
      renderNextYearButton,
      renderNextMonthButton,
      weekdayStyle,
      customWeekdays,
      warpRowWeekdays,
      warpRowControlMonthYear,
      monthTextStyle,
      yearTextStyle
    } = this.props;
    const weekdays = customWeekdays || ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat'];
    const data = this.calendarArray(this.props.date || moment());
    const dayOfWeek = [];
    const month = this.props.customMonth ? this.props.customMonth[((_this$props$date3 = this.props.date) === null || _this$props$date3 === void 0 ? void 0 : _this$props$date3.get('month')) || 0] : 'Jan';
    const year = ((_this$props$date4 = this.props.date) === null || _this$props$date4 === void 0 ? void 0 : _this$props$date4.get('year')) || 1;
    _.forEach(weekdays, element => {
      dayOfWeek.push( /*#__PURE__*/React.createElement(Text, {
        key: element,
        style: [styles.weekdays, weekdayStyle]
      }, element));
    });
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, this.props.containerStyle]
    }, /*#__PURE__*/React.createElement(View, {
      style: [{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }, warpRowControlMonthYear]
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => this.yearMonthChange(-1, 'month')
    }, renderPrevMonthButton ? renderPrevMonthButton() : /*#__PURE__*/React.createElement(Text, null, '<')), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.txtHeaderDate, monthTextStyle]
    }, month + '  '), /*#__PURE__*/React.createElement(Text, {
      style: [styles.txtHeaderDate, yearTextStyle]
    }, year)), /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => this.yearMonthChange(1, 'month')
    }, renderNextMonthButton ? renderNextMonthButton() : /*#__PURE__*/React.createElement(Text, null, '>'))), /*#__PURE__*/React.createElement(View, {
      style: [{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }, warpRowWeekdays]
    }, dayOfWeek), /*#__PURE__*/React.createElement(FlatList, {
      data: data,
      keyExtractor: item => '' + item.toDate().getTime(),
      renderItem: _ref => {
        let {
          item
        } = _ref;
        return this.renderDay(item);
      },
      extraData: this.state,
      columnWrapperStyle: {
        justifyContent: 'space-between'
      },
      numColumns: 7,
      style: {
        padding: 4
      }
    }));
  }
}
_defineProperty(MonthView, "defaultProps", new MonthViewProps());
//# sourceMappingURL=month-view.js.map
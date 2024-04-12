function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { isString } from 'lodash';
import moment from 'moment';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { MonthView } from './views/month-view';
import WmCalendarProps from './calendar.props';
import { DEFAULT_CLASS } from './calendar.styles';
import WmIcon from '../../basic/icon/icon.component';
export class WmCalendarState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "selectedDate", moment());
    _defineProperty(this, "calendar", new Map());
  }
}
const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';
export default class WmCalendar extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmCalendarProps(), new WmCalendarState());
    _defineProperty(this, "onDateChange", date => {
      const d = moment(date).format(DEFAULT_DATE_FORMAT);
      const dateWindow = this.state.calendar.get(d);
      this.updateState({
        props: {
          datavalue: d
        },
        selectedDate: date
      });
      this.invokeEventCallback('onSelect', [d, d, this, dateWindow === null || dateWindow === void 0 ? void 0 : dateWindow.events]);
    });
    _defineProperty(this, "renderDay", date => {
      const dateWindow = this.state.calendar.get(moment(date).format(DEFAULT_DATE_FORMAT));
      if (dateWindow) {
        return /*#__PURE__*/React.createElement(WmIcon, {
          iconclass: "fa fa-circle",
          iconsize: 8,
          styles: {
            root: {
              marginTop: -8,
              alignSelf: 'flexStart'
            },
            icon: this.styles['eventDay' + Math.min(3, dateWindow.events.length)]
          }
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    });
  }
  prepareDataset(dataset) {
    if (!dataset) {
      return;
    }
    const state = {
      calendar: new Map()
    };
    const eventStartKey = this.state.props.eventstart;
    dataset.forEach(d => {
      let startDate = d[eventStartKey];
      if (!isString(startDate)) {
        startDate = moment(startDate).format(DEFAULT_DATE_FORMAT);
      }
      if (!state.calendar.has(startDate)) {
        state.calendar.set(startDate, {
          date: moment(startDate, DEFAULT_DATE_FORMAT).get('milliseconds'),
          events: []
        });
      }
      const dateWindow = state.calendar.get(startDate);
      dateWindow === null || dateWindow === void 0 ? void 0 : dateWindow.events.push(d);
    });
    this.updateState(state);
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'dataset':
        this.prepareDataset($new);
        break;
      case 'datavalue':
        if ($new) {
          this.updateState({
            selectedDate: isString($new) ? moment($new, DEFAULT_DATE_FORMAT) : moment($new)
          });
        }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
    this.invokeEventCallback('onViewrender', [this, null]);
  }
  renderWidget(props) {
    this.invokeEventCallback('onBeforerender', [null, this]);
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(MonthView, {
      date: this.state.selectedDate,
      selectDate: this.onDateChange,
      format: DEFAULT_DATE_FORMAT,
      renderChildDay: this.renderDay,
      containerStyle: this.styles.calendar,
      dateSelectedWarpDayStyle: this.styles.selectedDay,
      selectedDayTextStyle: this.styles.selectedDayText,
      warpRowWeekdays: this.styles.weekDay,
      warpRowControlMonthYear: this.styles.calendarHeader,
      weekdayStyle: this.styles.weekDayText,
      warpDayStyle: this.styles.dayWrapper,
      textDayStyle: this.styles.day,
      yearTextStyle: this.styles.yearText,
      monthTextStyle: this.styles.monthText,
      currentDayStyle: this.styles.today,
      currentDayTextStyle: this.styles.todayText,
      notDayOfCurrentMonthStyle: this.styles.notDayOfCurrentMonth,
      renderPrevYearButton: () => /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('prevyearicon'),
        iconclass: "wi wi-angle-double-left",
        styles: this.styles.prevYearBtn
      }),
      renderPrevMonthButton: () => /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('prevmonthicon'),
        iconclass: "wi wi-chevron-left fa-2x",
        styles: this.styles.prevMonthBtn
      }),
      renderNextMonthButton: () => /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('nextmonthicon'),
        iconclass: "wi wi-chevron-right fa-2x",
        styles: this.styles.nextMonthBtn
      }),
      renderNextYearButton: () => /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('nextyearicon'),
        iconclass: "wi wi-angle-double-right",
        styles: this.styles.nextYearBtn
      })
    }));
  }
}
//# sourceMappingURL=calendar.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-calendar',
            rnStyleSelector: 'app-calendar.root',
            studioStyleSelector: '.uib-datepicker',
            style: {}
        }, {
            className: '.app-calendar-text',
            rnStyleSelector: 'app-calendar.text',
            studioStyleSelector: '.uib-datepicker',
            style: {
                color: 'calendarDateColor'
            }
        }, {
            className: '.app-calendar-wrapper',
            rnStyleSelector: 'app-calendar.calendar',
            studioStyleSelector: '.uib-datepicker table',
            style: {
                'background-color': '@calendarBgColor',
                'border-color': '@calendarHeaderBgColor'
            }
        }, {
            className: '.app-calendar-header',
            rnStyleSelector: 'app-calendar.calendarHeader',
            studioStyleSelector: '.uib-datepicker thead',
            style: {
                'background-color': '@calendarHeaderBgColor',
                'border-color': '@calendarHeaderBgColor'
            }
        }, {
            className: '.app-calendar-week-day',
            rnStyleSelector: 'app-calendar.weekDay',
            studioStyleSelector: '.uib-datepicker thead tr:nth-child(2)',
            style: {
                'background-color': '@calendarHeaderBgColor',
                'border-color': '@calendarHeaderBgColor'
            }
        }, {
            className: '.app-calendar-week-day-text',
            rnStyleSelector: 'app-calendar.weekDayText',
            studioStyleSelector: '.uib-datepicker thead tr:nth-child(2)',
            style: {
                color: '@calendarWeekDayTextColor'
            }
        }, {
            className: '.app-calendar-day',
            rnStyleSelector: 'app-calendar.day',
            studioStyleSelector: '.uib-datepicker tbody td span',
            style: {
                'background-color': '@calendarBgColor',
                color: '@calendarDateColor'
            }
        }, {
            className: '.app-calendar-not-day-of-month',
            rnStyleSelector: 'app-calendar.day',
            studioStyleSelector: '.uib-datepicker tbody td span',
            style: {
                color: '@calendarNotCurrentMonthDateColor'
            }
        }, {
            className: '.app-calendar-month-text',
            rnStyleSelector: 'app-calendar.monthText',
            studioStyleSelector: '.uib-datepicker thead strong',
            style: {
                color: '@calendarHeaderTextColor'
            }
        }, {
            className: '.app-calendar-year-text',
            rnStyleSelector: 'app-calendar.yearText',
            studioStyleSelector: '',
            style: {
                color: '@calendarHeaderTextColor'
            }
        }, {
            className: '.app-calendar-today',
            rnStyleSelector: 'app-calendar.today',
            studioStyleSelector: '.uib-datepicker tbody td button.active span',
            style: {
                'background-color': '@calendarTodayBgColor'
            }
        }, {
            className: '.app-calendar-today-text',
            rnStyleSelector: 'app-calendar.todayText',
            studioStyleSelector: '.uib-datepicker tbody td button.active span',
            style: {
                'background-color': '@transparent'
            }
        }, {
            className: '.app-calendar-eventDay1',
            rnStyleSelector: 'app-calendar.eventDay1',
            studioStyleSelector: '',
            style: {
                color: '@calendarEventDay1Color'
            }
        }, {
            className: '.app-calendar-eventDay2',
            rnStyleSelector: 'app-calendar.eventDay2',
            studioStyleSelector: '',
            style: {
                color: '@calendarEventDay2Color'
            }
        }, {
            className: '.app-calendar-eventDay3',
            rnStyleSelector: 'app-calendar.eventDay3',
            studioStyleSelector: '',
            style: {
                color: '@calendarEventDay3Color'
            }
        }, {
            className: '.app-calendar-selected-day',
            rnStyleSelector: 'app-calendar.selectedDay',
            studioStyleSelector: '',
            style: {
                'background-color': '@calendarSelectedDayBgColor'
            }
        }, {
            className: '.app-calendar-selected-day-text',
            rnStyleSelector: 'app-calendar.selectedDayText',
            studioStyleSelector: '',
            style: {
                color: '@calendarSelectedDayTextColor'
            }
        }, {
            className: '.app-calendar-prev-month-btn',
            rnStyleSelector: 'app-calendar.prevMonthBtn',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-calendar-prev-month-btn .app-icon-text',
            style: {
                color: '@calendarPrevMonthIconColor'
            }
        }, {
            className: '.app-calendar-next-month-btn',
            rnStyleSelector: 'app-calendar.nextMonthBtn',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-calendar-next-month-btn .app-icon-text',
            style: {
                color: '@calendarNextMonthIconColor'
            }
        }, {
            className: '.app-calendar-prev-year-btn',
            rnStyleSelector: 'app-calendar.prevMonthBtn',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-calendar-prev-year-btn .app-icon-text',
            style: {
                color: '@calendarPrevYearIconColor'
            }
        }, {
            className: '.app-calendar-next-year-btn',
            rnStyleSelector: 'app-calendar.nextYearBtn',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-calendar-next-year-btn .app-icon-text',
            style: {
                color: '@calendarNextYearIconColor'
            }
        }])
};
//# sourceMappingURL=calendar.styledef.js.map
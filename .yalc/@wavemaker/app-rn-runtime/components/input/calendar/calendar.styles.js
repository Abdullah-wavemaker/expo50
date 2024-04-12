import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-calendar';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      width: '100%',
      minHeight: 456,
      minWidth: 360
    },
    text: {
      color: themeVariables.calendarDateColor
    },
    calendar: {
      backgroundColor: themeVariables.calendarBgColor,
      borderColor: themeVariables.calendarHeaderBgColor,
      borderWidth: 1,
      borderStyle: 'solid',
      marginTop: 0,
      paddingTop: 0,
      paddingBottom: 0,
      elevation: 6
    },
    calendarHeader: {
      backgroundColor: themeVariables.calendarHeaderBgColor,
      borderColor: themeVariables.calendarHeaderBgColor,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      paddingTop: 8,
      paddingBottom: 8
    },
    weekDay: {
      backgroundColor: themeVariables.calendarBgColor,
      borderColor: themeVariables.calendarHeaderBgColor,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      padding: 2
    },
    weekDayText: {
      color: themeVariables.calendarWeekDayTextColor,
      fontWeight: '400',
      fontFamily: themeVariables.baseFont,
      fontSize: 16
    },
    day: {
      borderColor: 'transparent',
      color: themeVariables.calendarDateColor,
      fontSize: 16,
      fontFamily: themeVariables.baseFont,
      fontWeight: '400'
    },
    dayWrapper: {
      backgroundColor: themeVariables.calendarBgColor,
      borderColor: 'transparent',
      width: 38,
      height: 38,
      borderRadius: 26
    },
    notDayOfCurrentMonth: {
      color: themeVariables.calendarNotCurrentMonthDateColor,
      fontWeight: 'normal',
      opacity: 0
    },
    monthText: {
      fontWeight: '500',
      fontFamily: themeVariables.baseFont,
      color: themeVariables.calendarHeaderTextColor
    },
    yearText: {
      fontWeight: '500',
      fontFamily: themeVariables.baseFont,
      color: themeVariables.calendarHeaderTextColor
    },
    today: {
      backgroundColor: themeVariables.calendarBgColor,
      borderColor: themeVariables.primaryColor
    },
    todayText: {
      backgroundColor: themeVariables.calendarSelectedDayBgColor
    },
    eventDay1: {
      color: themeVariables.calendarEventDay1Color
    },
    eventDay2: {
      color: themeVariables.calendarEventDay2Color
    },
    eventDay3: {
      color: themeVariables.calendarEventDay3Color
    },
    selectedDay: {
      backgroundColor: themeVariables.calendarSelectedDayBgColor
    },
    selectedDayText: {
      backgroundColor: themeVariables.calendarSelectedDayBgColor,
      color: themeVariables.calendarSelectedDayTextColor,
      fontWeight: 'bold'
    },
    prevMonthBtn: {
      root: {
        color: themeVariables.calendarPrevMonthIconColor
      }
    },
    nextMonthBtn: {
      root: {
        color: themeVariables.calendarNextMonthIconColor
      }
    },
    prevYearBtn: {
      root: {
        color: themeVariables.calendarPrevYearIconColor
      }
    },
    nextYearBtn: {
      root: {
        color: themeVariables.calendarNextYearIconColor
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    prevMonthBtn: {
      root: {
        transform: [{
          rotateY: '180deg'
        }]
      }
    },
    nextMonthBtn: {
      root: {
        transform: [{
          rotateY: '180deg'
        }]
      }
    },
    monthText: {
      padding: 2
    },
    yearText: {
      padding: 2
    }
  });
});
//# sourceMappingURL=calendar.styles.js.map
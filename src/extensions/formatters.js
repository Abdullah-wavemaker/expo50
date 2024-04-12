/**
 * This file is used to extend the app runtime
 *
 * Custom Formatters:
 * Used for data formatting across widgets. Apart from predefined formatter like toDate, toCurrency, prefix, etc, you can define custom formatters here.
 * Once defined here, custom formatters appear in the "Use Expression" tab of data binding dialog.
 * E.g. Here is sample custom formatter (for data formatting)
 *   myFormatter : {
 *     formatter : function(data, param1){
 *       // your logic goes here
 *       return data;
 *     },
 *     config: {
 *       param1: {
 *         name: '',
 *         widget: '',
 *         value: ''
 *       }...
 *     }
 *   }
 *
 * Terminology
 * myFormatter	:   Name of the custom formatter
 * formatter 	:   Function where you can write the logic to format the data. The returned value from this function will be applied on the property this formatter is bound to
 * config       :   parameter information required during the design time. List down all the parameters required for your formatter function
 *                  Each param has following info
 *                  - name      : name of the parameter to display during design time
 *                  - widget    : widget to take parameter input from the user. E.g. text, select
 *                  - value     : default value if user doesn't provide any value
 */

// var WM_CUSTOM_FORMATTERS = (function() {
//     // Define custom formatters here.
//     return {

//     }

// })();

var WM_CUSTOM_FORMATTERS = (function () {
  return {
    toDate: {
      formatter: function (data, param1, roles) {
        const moment = require('moment');
        const lang = moment.locale();
        if (
          data &&
          param1 &&
          param1.includes('MMM') &&
          !param1.includes('MMMM')
        ) {
          const mdate = moment(data, param1, lang);
          const month = mdate.month();
          let newDate = null;
          if (
            month === 2 ||
            month === 3 ||
            month === 4 ||
            month === 5 ||
            month === 6
          ) {
            newDate = mdate.format(param1.toUpperCase().replace('MMM', 'MMMM'));
            return newDate;
          }
        }
        return data;
      },
      config: {
        param1: {
          name: 'Date Format',
          widget: 'text',
          value: '',
        },
      },
    },
    toDates: {
      formatter: function (data, param1, roles) {
        const moment = require('moment');
        const lang = moment.locale();
        if (
          data &&
          param1 &&
          param1.includes('MMM') &&
          !param1.includes('MMMM')
        ) {
          const mdate = moment(data, param1, lang);
          const month = mdate.month();
          let newDate = null;
          if (
            month === 2 ||
            month === 3 ||
            month === 4 ||
            month === 5 ||
            month === 6
          ) {
            newDate = mdate.format(param1.toUpperCase().replace('MMM', 'MMMM'));
            return newDate;
          }
        }
        return data;
      },
      config: {
        param1: {
          name: 'Date Format',
          widget: 'text',
          value: '',
        },
      },
    },
    creditcard: {
      formatter: function (data, param1, roles) {
        var hiphenSaperatedStr = data
          .match(new RegExp('.{1,4}', 'g'))
          .join(' - ');
        var substring = hiphenSaperatedStr.substring(
          hiphenSaperatedStr.length - 4,
          hiphenSaperatedStr.length
        );
        var maskedData = '';

        if (roles && roles.length && roles[0] == 'user') {
          maskedData = hiphenSaperatedStr.substring(
            0,
            hiphenSaperatedStr.length - 4
          );
        } else {
          maskedData = hiphenSaperatedStr
            .substring(0, hiphenSaperatedStr.length - 4)
            .replace(/d/g, param1);
        }
        return maskedData + ' ' + ' ' + substring;
      },
      config: {
        param1: {
          name: 'Mask char',
          widget: 'text',
          value: 'X',
        },
      },
    },
  };
})();

Object.keys(WM_CUSTOM_FORMATTERS).forEach(k => {
  const formatter = WM_CUSTOM_FORMATTERS[k];
  formatter.format = formatter.formatter;
});

export default WM_CUSTOM_FORMATTERS;

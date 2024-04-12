import { isDate, isString } from 'lodash';
import moment from 'moment';
/**
 * method to get the date object from the input received
 */
export const getDateObj = value => {
  /*if the value is a date object, no need to covert it*/
  if (isDate(value)) {
    return value;
  }

  /*if the value is a timestamp string, convert it to a number*/
  if (!isNaN(value)) {
    value = parseInt(value, 10);
  }
  if (!moment(value).isValid() || value === '' || value === null || value === undefined) {
    return undefined;
  }
  let dateObj = new Date(value);
  /**
   * if date value is string "20-05-2019" then new Date(value) return 20May2019 with current time in India,
   * whereas this will return 19May2019 with time lagging for few hours.
   * This is because it returns UTC time i.e. Coordinated Universal Time (UTC).
   * To create date in local time use moment
   */
  if (isString(value)) {
    /*
     * If selected locale is Arabic, moment(value).format() is giving date in Arabic language
     * (Ex: If date value is "1990-11-23" and moment(value).format() is "١٩٩٠-١١-٢٣T٠٠:٠٠:٠٠+٠٥:٣٠")
     * and new Date(moment(value).format()) is giving Invalid Date. So frst converting it to timestamp value.
    */
    dateObj = new Date(moment(moment(value).format()).valueOf());
  }
  if (isNaN(dateObj.getDay())) {
    return new Date();
  }
  return dateObj;
};
export class CreateEventOperation {
  constructor(calendar) {
    this.calendar = calendar;
  }
  invoke(params) {
    return this.calendar.createEvent(params);
  }
}
//# sourceMappingURL=create-event.operation.js.map
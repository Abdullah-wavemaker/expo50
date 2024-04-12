import * as Calendar from 'expo-calendar';
import permissionManager from '@wavemaker/app-rn-runtime/runtime/services/device/permissions';
import { getDateObj } from '@wavemaker/app-rn-runtime/variables/device/calendar/create-event.operation';
const DEFAULT_TIME = new Date().getTime();
const DELTA_VALUE_DATE = 3 * 30 * 24 * 60 * 60 * 1000;
const DEFAULT_START_DATE = new Date(DEFAULT_TIME - DELTA_VALUE_DATE);
const DEFAULT_END_DATE = new Date(DEFAULT_TIME + DELTA_VALUE_DATE);
export class CalendarService {
  constructor() {}
  getEvents(params) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('calendar').then(() => {
        return Calendar.getCalendarsAsync().then(result => {
          let calendarIds = [];
          result.forEach(c => calendarIds.push(c.id));
          Calendar.getEventsAsync(calendarIds, params.eventStart || DEFAULT_START_DATE, params.eventEnd || DEFAULT_END_DATE).then(res => {
            let filteredResult = res;
            if (params.eventTitle || params.eventLocation || params.eventNotes) {
              filteredResult = res.filter(event => event.title === params.eventTitle || event.location === params.eventLocation || event.notes === params.eventNotes);
            }
            let events = [];
            filteredResult.forEach(e => {
              events.push({
                title: e.title,
                message: e.notes,
                location: e.location,
                startDate: e.startDate,
                endDate: e.endDate
              });
            });
            return resolve(events);
          });
        });
      }, reject);
    });
  }
  createEvent(params) {
    const eventMetadata = {
      title: params.eventTitle,
      location: params.eventLocation,
      notes: params.eventNotes,
      startDate: getDateObj(params.eventStart) || DEFAULT_START_DATE,
      endDate: getDateObj(params.eventEnd) || DEFAULT_END_DATE
    };
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('calendar').then(() => {
        return Calendar.getCalendarsAsync().then(result => {
          let calendarIds = [];
          result.forEach(c => {
            if (c.allowsModifications) {
              calendarIds.push(c.id);
            }
          });
          // createEventAsync has calendarId as required parameter. Need to expose ownerAccount as filter field in studio. Right now passing calendar index as zero.
          return Calendar.createEventAsync(calendarIds[0], eventMetadata).then(res => {
            const event = {
              dataValue: res
            };
            return resolve(event);
          });
        }, reject);
      });
    });
  }
  deleteEvent(params) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('calendar').then(() => {
        return Calendar.getCalendarsAsync().then(result => {
          let calendarIds = [];
          result.forEach(c => {
            if (c.allowsModifications) {
              calendarIds.push(c.id);
            }
          });
          Calendar.getEventsAsync(calendarIds, params.eventStart || DEFAULT_START_DATE, params.eventEnd || DEFAULT_END_DATE).then(res => {
            const filteredResult = res.filter(event => event.title === params.eventTitle || event.location === params.eventLocation || event.notes === params.eventNotes);
            Promise.all(filteredResult.map(event => {
              Calendar.deleteEventAsync(event.id);
            })).then(res => {
              const event = {
                dataValue: true
              };
              return resolve(event);
            });
          });
        }, reject);
      });
    });
  }
}
//# sourceMappingURL=calendar-service.js.map
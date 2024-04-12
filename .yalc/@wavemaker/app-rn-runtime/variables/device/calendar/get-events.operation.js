export class GetEventsOperation {
  constructor(calendar) {
    this.calendar = calendar;
  }
  invoke(params) {
    return this.calendar.getEvents(params);
  }
}
//# sourceMappingURL=get-events.operation.js.map
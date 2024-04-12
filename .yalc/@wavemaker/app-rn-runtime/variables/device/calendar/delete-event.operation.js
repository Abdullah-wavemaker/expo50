export class DeleteEventOperation {
  constructor(calendar) {
    this.calendar = calendar;
  }
  invoke(params) {
    return this.calendar.deleteEvent(params);
  }
}
//# sourceMappingURL=delete-event.operation.js.map
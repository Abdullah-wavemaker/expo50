export class GetContactsOperation {
  constructor(contacts) {
    this.contacts = contacts;
  }
  invoke(params) {
    return this.contacts.getContacts(params);
  }
}
//# sourceMappingURL=get-contacts.operation.js.map
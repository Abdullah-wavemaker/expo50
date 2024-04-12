import * as Contacts from 'expo-contacts';
import permissionManager from '@wavemaker/app-rn-runtime/runtime/services/device/permissions';
export class ContactsService {
  constructor() {}
  getContacts(params) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('contacts').then(() => {
        return Contacts.getContactsAsync({
          fields: [Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          name: params.contactFilter
        }).then(value => {
          let contacts = [];
          value.data.forEach(c => {
            var _c$phoneNumbers;
            const numbers = [];
            (_c$phoneNumbers = c.phoneNumbers) === null || _c$phoneNumbers === void 0 ? void 0 : _c$phoneNumbers.forEach(num => {
              numbers.push({
                value: num.number
              });
            });
            contacts.push({
              id: c.id,
              displayName: c.name,
              phoneNumbers: numbers
            });
          });
          return resolve(contacts);
        });
      }, () => resolve([]));
    });
  }
}
//# sourceMappingURL=contacts-service.js.map
import * as fromContact from './contact.actions';

describe('submitContacts', () => {
  it('should return an action', () => {
    expect(fromContact.submitContacts().type).toBe('[Contact] Submit Contacts');
  });
});

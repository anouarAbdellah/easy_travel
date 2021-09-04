import { createAction, props } from '@ngrx/store';

export const submitContacts = createAction(
  '[Contact] Submit Contacts',
  props<{ data: any }>()
);

export const submitContactsSuccess = createAction(
  '[Contact] Submit Contacts Success',
  props<{ data: any }>()
);

export const submitContactsFailure = createAction(
  '[Contact] Submit Contacts Failure',
  props<{ error: any }>()
);

import { Action, createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';

export const contactFeatureKey = 'contact';

export interface ContactState {

}

export const initialState: ContactState = {

};


export const ContactReducer = createReducer(
  initialState,

  on(ContactActions.submitContacts, state => state),
  on(ContactActions.submitContactsSuccess, (state, action) => state),
  on(ContactActions.submitContactsFailure, (state, action) => state),

);


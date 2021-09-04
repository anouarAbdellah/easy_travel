import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';

export const selectContactState = createFeatureSelector<fromContact.ContactState>(
  fromContact.contactFeatureKey
);

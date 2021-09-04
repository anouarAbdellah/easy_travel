import { createAction, props } from '@ngrx/store';

export const loadTrips = createAction(
  '[Trip] Load Trips',
  props<{ data: any }>()
);

export const loadTripsSuccess = createAction(
  '[Trip] Load Trips Success',
  props<{ data: any }>()
);

export const loadTripsFailure = createAction(
  '[Trip] Load Trips Failure',
  props<{ error: any }>()
);

export const saveReservation = createAction(
  '[Trip] Save Reservation',
  props<{ data: any }>()
);

export const saveReservationSuccess = createAction(
  '[Trip] Save Reservation Success',
  props<{ data: any }>()
);

export const saveReservationFailure = createAction(
  '[Trip] Save Reservation Failure',
  props<{ error: any }>()
);

export const changeSearchParameters = createAction(
  '[Trip] Change Search Parameters',
  props<{ data: any }>()
);
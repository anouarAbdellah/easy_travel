import { Action, createReducer, on } from '@ngrx/store';
import * as TripActions from './trip.actions';

export const tripFeatureKey = 'trip';

export interface TripState {
  trips: any[],
  searchParamters: any
}

export const initialState: TripState = {
  trips: [],
  searchParamters: {
    from: '',
    to: '',
    type: '',
    checkin: ''
  }
};


export const TripReducer = createReducer(
  initialState,

  on(TripActions.loadTrips, state => state),
  on(TripActions.loadTripsSuccess, (state, action) => {
    return {
      ...state,
      trips: action.data
    }
  }),
  on(TripActions.loadTripsFailure, (state, action) => state),
  on(TripActions.changeSearchParameters, (state, action) => {
    console.log(action.data)
    return {
      ...state,
      searchParamters: action.data
    }
  })

);


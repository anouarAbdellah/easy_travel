import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { LoadingService } from '../services/loading.service';
import { SuccessService } from '../services/success.service';
import { TripsService } from '../services/trips.service';
import AppState from '../app-state.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';



@Injectable()
export class TripEffects {
  loadTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.loadTrips),
      concatMap((searchParamters) => {
        this.loadingService.setLoading(true);
        console.log(searchParamters.data)
        return this.tripsService.trips(searchParamters.data).pipe(
          map((data: any[]) => {
            this.loadingService.setLoading(false);
            console.log(data)
            return TripActions.loadTripsSuccess({ data });
          }),
          catchError((error) => {
            this.loadingService.setLoading(false);
            return of(TripActions.loadTripsFailure({ error }));
          })
        );
      })
    );
  });

  saveReservation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.saveReservation),
      concatMap((reservation) => {
        this.loadingService.setLoading(true);
        console.log(reservation.data)
        return this.tripsService.saveReservation(reservation.data).pipe(
          map((data: any[]) => {
            this.loadingService.setLoading(false);
            console.log(data)
            localStorage.setItem('reservation', JSON.stringify(data));
            this.successService.successMessage('Reservation saved successfully', 'success');
            return TripActions.saveReservationSuccess({ data });
          }),
          tap(() => this.router.navigate(['/trips/reservation'])),
          catchError((error) => {
            this.loadingService.setLoading(false);
            this.successService.successMessage('Reservation failed', 'danger');
            return of(TripActions.saveReservationFailure({ error }));
          })
        );
      })
    );
  });



  constructor(
    private actions$: Actions,
    private tripsService: TripsService,
    private loadingService: LoadingService,
    private successService: SuccessService,
    private store: Store<AppState>,
    private router: Router
  ) {}

}

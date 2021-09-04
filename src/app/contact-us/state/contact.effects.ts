import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ContactActions from './contact.actions';
import { ContactService } from 'src/app/services/contact.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SuccessService } from 'src/app/services/success.service';



@Injectable()
export class ContactEffects {

  submitContacts$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ContactActions.submitContacts),
      concatMap((data) => {
        this.loadingService.setLoading(true);
        return this.contactService.saveContact(data.data).pipe(
          map((data: any[]) => {
            this.loadingService.setLoading(false);
            this.successService.successMessage('Contact was saved successfully', 'success');
            return ContactActions.submitContactsSuccess({ data: data });
          }),
          catchError((error) => {
            this.loadingService.setLoading(false);
            this.successService.successMessage('Contact failed', 'danger');
            return of(ContactActions.submitContactsFailure({ error }));
          })
        );
      })
      );
  });



  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private loadingService: LoadingService,
    private successService: SuccessService
  ) {}

}

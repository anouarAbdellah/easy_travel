import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TripEffects } from './trip.effects';

describe('TripEffects', () => {
  let actions$: Observable<any>;
  let effects: TripEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TripEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TripEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

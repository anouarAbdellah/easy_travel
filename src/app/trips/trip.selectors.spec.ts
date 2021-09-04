import * as fromTrip from './trip.reducer';
import { selectTripState } from './trip.selectors';

describe('Trip Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTripState({
      [fromTrip.tripFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

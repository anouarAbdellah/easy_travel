import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from './post.reducer';

export const selectPostState = createFeatureSelector<fromPost.PostState>(
  fromPost.postFeatureKey
);

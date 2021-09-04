import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ data: any[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: any }>()
);

export const addComment = createAction(
  '[Post] Add Comment',
  props<{data: any, id: any}>()
);
export const addCommentSuccess = createAction(
  '[Post] Add Comment Success',
  props<{data: any}>()
);
export const addCommentFailure = createAction(
  '[Post] Add Comment Failure',
  props<{error: any}>()
);
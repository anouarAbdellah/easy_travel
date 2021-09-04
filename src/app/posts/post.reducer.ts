import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';

export const postFeatureKey = 'post';

export interface PostState {
  posts: any[]
}

export const initialState: PostState = {
  posts: []
};


export const PostReducer = createReducer(
  initialState,

  on(PostActions.loadPosts, state => state),
  on(PostActions.loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.data
    };
  }),
  on(PostActions.loadPostsFailure, (state, action) => state),
  on(PostActions.addCommentSuccess, (state, action) => {
    let posts = [...state.posts];
    let postIndex = posts.findIndex(element => element.id == action.data.post_id);
    posts[postIndex].comments.push(action.data);
    return {
      ...state,
      posts: posts
    };
  }),

);


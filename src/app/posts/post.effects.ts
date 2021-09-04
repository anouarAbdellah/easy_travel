import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PostActions from './post.actions';
import { PostsService } from '../services/posts.service';
import { LoadingService } from '../services/loading.service';
import { SuccessService } from '../services/success.service';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.loadPosts),
      concatMap(() => {
        this.loadingService.setLoading(true);
        return this.postsService.posts().pipe(
          map((data: any[]) => {
            this.loadingService.setLoading(false);
            return PostActions.loadPostsSuccess({ data });
          }),
          catchError((error) => {
            this.loadingService.setLoading(false);
            return of(PostActions.loadPostsFailure({ error }));
          })
        );
      })
    );
  });

  addPostComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.addComment),
      concatMap((data) => {
        this.loadingService.setLoading(true);
        return this.postsService.saveComment(data.data, data.id).pipe(
          map((data: any[]) => {
            this.loadingService.setLoading(false);
            this.successService.successMessage('Comment was saved successfully', 'success');
            return PostActions.addCommentSuccess({ data: data });
          }),
          catchError((error) => {
            this.loadingService.setLoading(false);
            this.successService.successMessage('Comment failed', 'danger');
            return of(PostActions.addCommentFailure({ error }));
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private loadingService: LoadingService,
    private successService: SuccessService
  ) {}
}

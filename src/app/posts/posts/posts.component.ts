import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from 'src/app/app-state.model';
import { loadPosts } from '../post.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<any[]>;
  isPostShowing  = false;
  postItem = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(state => state.posts.posts);

    this.store.dispatch(loadPosts());
  }
  showPost(item) {
    this.isPostShowing = true;
    this.postItem = item;
    console.log(this.postItem)
  }
  closePost() {
    this.postItem = null;
    this.isPostShowing = false;
  }
}

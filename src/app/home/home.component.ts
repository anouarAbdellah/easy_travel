import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../app-state.model';
import { loadPosts } from '../posts/post.actions';
import { changeSearchParameters, loadTrips } from '../trips/trip.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<any[]>;
  minDate = new Date();
  isPostShowing  = false;
  postItem = null;
  searchParamters = {
    from: '',
    to: '',
    type: '',
    checkin: ''
  };
  @ViewChild('searchForm') searchForm: NgForm; 
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(state => state.posts.posts.slice(0, 3));

    this.store.dispatch(loadPosts());
  }
  showPost(item) {
    this.isPostShowing = true;
    console.log(item)
    this.postItem = item;
  }
  closePost() {
    this.postItem = null;
    this.isPostShowing = false;
  }
  submitSearch() {
    console.log('hi')
    let controls = Object.values(this.searchForm.controls);
    for(let control of controls) {
      if(control.invalid == true) {
        return;
      }
    }
    console.log('hi')
    this.store.dispatch(changeSearchParameters({data: this.searchParamters}));
    this.store.dispatch(loadTrips({data: this.searchParamters}));
    this.router.navigate(['trips']);
  }
}

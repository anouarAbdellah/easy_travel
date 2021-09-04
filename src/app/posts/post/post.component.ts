import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from 'src/app/app-state.model';
import { addComment } from '../post.actions';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input('post') post: any;
  @Output() close = new EventEmitter();
  commentToSave = {
    name: '',
    content: ''
  };
  @ViewChild('commentForm') commentForm: NgForm;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  closePost() {
    this.close.emit();
  }
  saveComment() {
    let controls = Object.values(this.commentForm.controls);
    for(let control of controls) {
      if(control.invalid == true) {
        return;
      }
    }
    this.store.dispatch(addComment({data: {...this.commentToSave}, id: this.post.id}));
    this.commentToSave = {
      name: '',
      content: ''
    };
  }
}

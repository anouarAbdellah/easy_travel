import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../app-state.model';
import { submitContacts } from './state/contact.actions';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('contactForm') contactForm: NgForm;
  contactData = {
    name: '',
    email: '',
    message: ''
  };
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  saveForm() {
    let controls = Object.values(this.contactForm.controls);
    for(let control of controls) {
      if(control.invalid == true) {
        return;
      }
    }
    this.store.dispatch(submitContacts({data: this.contactData}))
  }
}

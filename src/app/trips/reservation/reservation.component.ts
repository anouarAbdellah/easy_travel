import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  tickets = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    let tickets = localStorage.getItem('reservation');
    if(!tickets) {
      this.router.navigate(['/']);
    }
    this.tickets = JSON.parse(tickets);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  trips(data) {
    return this.http.post('trips', data);
  }
  saveReservation(data) {
    return this.http.post('trips/reservation/save', data);
  }
}

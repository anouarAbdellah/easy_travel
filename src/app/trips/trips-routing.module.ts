import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  {path: '', component: TripsComponent},
  {path: 'reservation', component: ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }

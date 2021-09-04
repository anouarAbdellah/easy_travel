import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips/trips.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TripComponent } from './trip/trip.component';
import {MatIconModule} from '@angular/material/icon';
import { ReservationComponent } from './reservation/reservation.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [TripsComponent, TripComponent, ReservationComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    NgxMatNativeDateModule,MatTooltipModule,MatIconModule,
    MatDatepickerModule,AgmCoreModule,
    FormsModule,MatSliderModule,MatCheckboxModule,
    MatButtonModule,
    TripsRoutingModule
  ]
})
export class TripsModule { }

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from 'src/app/app-state.model';
import { SuccessService } from 'src/app/services/success.service';
import { saveReservation } from '../trip.actions';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input('trip') trip: any;
  @Output() close = new EventEmitter();
  @ViewChild('tripForm') tripForm: NgForm;
  @Input('searchParameters') searchParameters = {
    from: '',
    to: '',
    type: '',
    checkin: ''
  };
  equipementsList = {
    'wifi': 'wifi',
    'free masks': 'head-side-mask',
    'free water': 'tint',
    'air-conditioner': 'fan',
    'lagage service': 'suitcase-rolling',
    'waiting room': 'chair',
    'individual lamp': 'lightbulb'
  };
  car = [
    [],
    []
  ];
  train = [];
  showReservationForm = false;
  tripToSave = {
    name: '',
    email: '',
    phone: ''
  };
  selectedCart = 0;
  markers = [];
  zoom = 7;
  centerOfMap = {
    lat: 0,
    lng: 0
  };
  constructor(private store: Store<AppState>, private successService: SuccessService) { }

  ngOnInit(): void {
    if(this.trip.vehicle.type == 'Car' || this.trip.vehicle.type == 'Mini bus') {
      let seatsByRow = Math.round(this.trip.vehicle.seats / 2);
      let additionalSeat = seatsByRow % 2 === 0 ? 0 : 1;
      console.log(seatsByRow, additionalSeat)
      for(let i =1;i<=this.trip.vehicle.seats;i++) {
        if(i <= seatsByRow - additionalSeat) {
          this.car[0].push({
            seat: i,
            available: this.checkIfSeatAvailable(i),
            selected: false
          });
        } else {
          this.car[1].push({
            seat: i,
            available: this.checkIfSeatAvailable(i),
            selected: false
          });
        }
      }
    } else if(this.trip.vehicle.type == 'Train') {
      for(let cart = 1; cart < this.trip.vehicle.carts; cart++ ) {
        let car = [
          [],
          []
        ];
        let seatsByRow = Math.round(this.trip.vehicle.seats / 2);
        let additionalSeat = seatsByRow % 2 === 0 ? 0 : 1;
        for(let i =1;i<=this.trip.vehicle.seats;i++) {
          if(i <= seatsByRow - additionalSeat) {
            car[0].push({
              seat: i,
              available: this.checkIfSeatAvailable(i, this.train.length + 1),
              selected: false
            });
          } else {
            car[1].push({
              seat: i,
              available: this.checkIfSeatAvailable(i, this.train.length + 1),
              selected: false
            });
          }
        }
        this.train.push(car);
      }
    }
    this.centerOfMap = {
      lat: parseFloat(this.trip.points[0].city.lat),
      lng: parseFloat(this.trip.points[0].city.lng)
    };
    for(let point of this.trip.points) {
      this.markers.push({
        position: {
          lat: parseFloat(point.city.lat),
          lng: parseFloat(point.city.lng)
        },
        label: {
          color: "white",
          text: point.time
        }
      });
    }
  }
  choseSeat(seat) {
    let seatsByRow = Math.round(this.trip.vehicle.seats / 2);
    let additionalSeat = seatsByRow % 2 === 0 ? 0 : 1;
    let seatItem;
    if(this.trip.vehicle.type == 'Car' || this.trip.vehicle.type == 'Mini bus') {
      if(seat <= seatsByRow - additionalSeat) {
        seatItem = this.car[0].find(element => element.seat == seat);
      } else {
        seatItem = this.car[1].find(element => element.seat == seat);
      }
      if(seatItem.available == true) {
        seatItem.selected = !seatItem.selected;
      }
    } else {
      if(seat <= seatsByRow - additionalSeat) {
        seatItem = this.train[this.selectedCart][0].find(element => element.seat == seat);
      } else {
        seatItem = this.train[this.selectedCart][1].find(element => element.seat == seat);
      }
      if(seatItem.available == true) {
        seatItem.selected = !seatItem.selected;
      }
    }
  }
  reserve() {
    let foundSelectedItem = false;
    if(this.trip.vehicle.type == 'Car' || this.trip.vehicle.type == 'Mini bus') {
      for(let carRow of this.car) {
        for(let seat of carRow) {
          if(seat.available == true && seat.selected == true)
            foundSelectedItem = true;
        }
      }
    } else if ( this.trip.vehicle.type == 'Train') {
      
      for(let carRow of this.train[this.selectedCart]) {
        for(let seat of carRow) {
          if(seat.available == true && seat.selected == true)
            foundSelectedItem = true;
        }
      }
    }
    if(!foundSelectedItem) {
      this.showReservationForm = false;
      return;
    }
    this.showReservationForm = !this.showReservationForm;
  }
  saveTrip() {
    let controls = Object.values(this.tripForm.controls);
    for(let control of controls) {
      if(control.invalid == true) {
        return;
      }
    }
    let reservedSeats = [];
    if(this.trip.vehicle.type == 'Car' || this.trip.vehicle.type == 'Mini bus') {
      for(let carRow of this.car) {
        for(let seat of carRow) {
          if(seat.available == true && seat.selected == true)
            reservedSeats.push(seat);
        }
      }
    } else if ( this.trip.vehicle.type == 'Train') {
      for(let carRow of this.train[this.selectedCart]) {
        for(let seat of carRow) {
          if(seat.available == true && seat.selected == true)
            reservedSeats.push(seat);
        }
      }
    }
    if(reservedSeats.length < 0) {
      this.successService.successMessage('Choose a seat please', 'danger');
      return;
    }
    let dataToSave = {
      name: this.tripToSave.name,
      email: this.tripToSave.email,
      phone: this.tripToSave.phone,
      seats: reservedSeats,
      id: this.trip.id,
      start_point_id: this.getItemData(this.trip, 'from', 'id'),
      end_point_id: this.getItemData(this.trip, 'to', 'id')
    };
    if(this.trip.vehicle.type == 'Train') {
      dataToSave['cart'] = this.selectedCart+1;
    }
    this.store.dispatch(saveReservation({data: dataToSave}));
  }
  checkIfSeatAvailable(seat, cart = null) {
    let reservedSeat;
    if(this.trip.vehicle.type == 'Car' || this.trip.vehicle.type == 'Mini bus') {
      reservedSeat = this.trip.reservations.find(element => element.seat == seat);
    } else {
      reservedSeat = this.trip.reservations.find(element => element.seat == seat && cart == element.cart);
    }
    if(this.trip.corona_mode == 0 && !reservedSeat) {
      return true;
    } else if(reservedSeat) {
      return false;
    } else {
      return this.checkSeatOdd(seat);
    }
  }
  checkSeatOdd(seat) {
    let dividedResult = Math.round(seat / 4);
    return seat == 1 || (dividedResult * 4) == seat || ((dividedResult * 4) + 1) == seat;
  }
  getPrice(item) {
    let price = 0;
    let startCounting = false;
    for(let point of item.points) {
      if(startCounting) {
        price += point.price;
      }
      if(point.city.name.toLowerCase() == this.searchParameters.from.toLowerCase()) {
        startCounting = true;
      } else if(point.city.name.toLowerCase() == this.searchParameters.to.toLowerCase() ) {
        startCounting = false;
      }
    }
    return price;
  }
  closeTrip() {
    this.close.emit();
  }
  getItemData(item, key, data) {
    let point = item.points.find(element => element.city.name.toLowerCase() == this.searchParameters[key].toLowerCase())
    return point ? point[data] : '';
  }
  getItemCityData(item, key, data) {
    let point = item.points.find(element => element.city.name.toLowerCase() == this.searchParameters[key].toLowerCase())
    return point ? point.city[data] : '';
  }
  getItemCityName(item, key) {
    let point = item.points.find(element => element.city.name.toLowerCase() == this.searchParameters[key].toLowerCase())
    return point ? this.searchParameters[key].toLowerCase() : '';
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import AppState from 'src/app/app-state.model';
import { changeSearchParameters, loadTrips } from '../trip.actions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips$: Observable<any[]>;
  searchParameters = {
    from: '',
    to: '',
    type: '',
    checkin: ''
  };
  @ViewChild('searchForm') searchForm: NgForm; 
  minDate = new Date();
  equipementsList = {
    'wifi': 'wifi',
    'free masks': 'head-side-mask',
    'free water': 'tint',
    'air-conditioner': 'fan',
    'lagage service': 'suitcase-rolling',
    'waiting room': 'chair',
    'individual lamp': 'lightbulb'
  };
  filters = {
    price: 5000,
    equipements: []
  }
  isTripShowing = false;
  tripItem = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(state => state.trips.searchParamters).subscribe(
      (data) => {
        this.searchParameters = data;
      }
    );
    this.trips$ = this.store.select(state => state.trips.trips);

  }
  submitSearch() {
    let controls = Object.values(this.searchForm.controls);
    for(let control of controls) {
      if(control.invalid == true) {
        return;
      }
    }
    console.log('hi')
    this.store.dispatch(changeSearchParameters({data: this.searchParameters}));
    this.store.dispatch(loadTrips({data: this.searchParameters}));
  }
  getItemData(item, key, data) {
    let point = item.points.find(element => element.city.name.toLowerCase() == this.searchParameters[key].toLowerCase())
    return point ? point[data] : '';
  }
  getItemCityName(item, key) {
    let point = item.points.find(element => element.city.name.toLowerCase() == this.searchParameters[key].toLowerCase())
    return point ? this.searchParameters[key].toLowerCase() : '';
  }
  changeEquipementsFilter(equipement) {
    if(this.filters.equipements.includes(equipement)) {
      this.filters.equipements = this.filters.equipements.filter(element => element != equipement);
    } else {
      this.filters.equipements.push(equipement);
    }
    this.filterResults();
  }
  filterResults() {
    this.trips$ = this.trips$.pipe(
      map(
        trips => {
          return trips.filter(element => this.getPrice(element) <= this.filters.price && (this.filters.equipements.length < 1 || this.includesAllEquipements(element)));
        }
      )
    )
  }
  includesAllEquipements(item) {
    for(let equipement of this.filters.equipements) {
      if(!item.vehicle.equipements.split(',').includes(equipement)) {
        return false;
      }
    }
    return true;
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
  showTrip(item) {
    this.isTripShowing = true;
    this.tripItem = item;
  }
  closeTrip() {
    this.tripItem = null;
    this.isTripShowing = false;
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { PostEffects } from './posts/post.effects';
import { PostReducer } from './posts/post.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api.interceptor';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostsModule } from './posts/posts.module';
import { TripEffects } from './trips/trip.effects';
import { TripReducer } from './trips/trip.reducer';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactEffects } from './contact-us/state/contact.effects';
import { AgmCoreModule } from '@agm/core';
import * as Sentry from "@sentry/angular";
import { Router } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,PostsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgxMatNativeDateModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0'
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({
      posts: PostReducer,
      trips: TripReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([
      PostEffects,
      TripEffects
    ]),
    EffectsModule.forFeature([ContactEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

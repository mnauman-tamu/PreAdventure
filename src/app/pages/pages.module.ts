import { NgModule } from '@angular/core';
import { HomePageComponent } from './home/home.page';

import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SummaryPageComponent } from './summary/summary.page';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {SafePipe} from '../app.component';
import { CrimePageComponent } from './detailsPages/crime/crime.page';
import { AttractionsPageComponent } from './detailsPages/attractions/attractions.page';
import { FlightsPageComponent } from './detailsPages/flights/flights.page';
import { HotelsPageComponent } from './detailsPages/hotels/hotels.page';
import { MusicPageComponent } from './detailsPages/music/music.page';
import { PhotosPageComponent } from './detailsPages/photos/photos.page';
import { RestaurantsPageComponent } from './detailsPages/restaurants/restaurants.page';
import { WeatherPageComponent } from './detailsPages/weather/weather.page';
import { aboutUsPageComponent } from './aboutUsPage/aboutUs.page';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomePageComponent,
    SummaryPageComponent,
    CrimePageComponent,
    AttractionsPageComponent,
    FlightsPageComponent,
    HotelsPageComponent,
    MusicPageComponent,
    PhotosPageComponent,
    RestaurantsPageComponent,
    WeatherPageComponent,
    aboutUsPageComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HomePageComponent,
    SummaryPageComponent,
    CrimePageComponent,
    AttractionsPageComponent,
    FlightsPageComponent,
    HotelsPageComponent,
    MusicPageComponent,
    PhotosPageComponent,
    RestaurantsPageComponent,
    WeatherPageComponent,
    aboutUsPageComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class PagesModule { }

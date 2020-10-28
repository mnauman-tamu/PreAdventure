import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { HomePageComponent } from './pages/home/home.page';
import { SummaryPageComponent } from './pages/summary/summary.page';
import { AttractionsPageComponent } from './pages/detailsPages/attractions/attractions.page';
import { CrimePageComponent } from './pages/detailsPages/crime/crime.page';
import { FlightsPageComponent } from './pages/detailsPages/flights/flights.page';
import { HotelsPageComponent } from './pages/detailsPages/hotels/hotels.page';
import { MusicPageComponent } from './pages/detailsPages/music/music.page';
import { PhotosPageComponent } from './pages/detailsPages/photos/photos.page';
import { RestaurantsPageComponent } from './pages/detailsPages/restaurants/restaurants.page';
import { WeatherPageComponent } from './pages/detailsPages/weather/weather.page';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'summary', component: SummaryPageComponent},
  { path: 'attractions', component: AttractionsPageComponent},
  { path: 'crime', component: CrimePageComponent},
  { path: 'flights', component: FlightsPageComponent},
  { path: 'hotels', component: HotelsPageComponent},
  { path: 'music', component: MusicPageComponent},
  { path: 'photos', component: PhotosPageComponent},
  { path: 'restaurants', component: RestaurantsPageComponent},
  { path: 'weather', component: WeatherPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
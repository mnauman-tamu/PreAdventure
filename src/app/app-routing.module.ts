import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { HomePageComponent } from './pages/home/home.page';
import { SummaryPageComponent } from './pages/summary/summary.page';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'summary', component: SummaryPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { DataService } from './shared/data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SafePipe } from './safe.pipe';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SlideshowModule} from 'ng-simple-slideshow';


@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    //HereMapComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    SlideshowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

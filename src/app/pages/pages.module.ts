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

@NgModule({
  declarations: [
    HomePageComponent,
    SummaryPageComponent,
    CrimePageComponent,
    SafePipe,
  ],
    imports: [
        CommonModule,
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
        MatDividerModule
    ],
    exports: [
        HomePageComponent,
        SummaryPageComponent,
        CrimePageComponent,
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
        MatDividerModule
    ]
})
export class PagesModule { }

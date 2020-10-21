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

@NgModule({
    declarations: [
        HomePageComponent,
        SummaryPageComponent,
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
        MatExpansionModule
    ],
    exports: [
        HomePageComponent,
        SummaryPageComponent,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,
        MatExpansionModule
    ]
})
export class PagesModule { }
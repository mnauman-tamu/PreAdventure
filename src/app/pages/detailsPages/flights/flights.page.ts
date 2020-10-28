import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'flights-page',
    templateUrl: './flights.page.html',
    styleUrls: ['./flights.page.scss']
  })
export class FlightsPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
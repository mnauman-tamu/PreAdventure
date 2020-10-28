import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'weather-page',
    templateUrl: './weather.page.html',
    styleUrls: ['./weather.page.scss']
  })
export class WeatherPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
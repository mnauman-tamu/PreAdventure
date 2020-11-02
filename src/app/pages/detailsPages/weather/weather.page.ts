import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { DataStorageService} from '../../../shared/dataStorage.service';

@Component({
    selector: 'weather-page',
    templateUrl: './weather.page.html',
    styleUrls: ['./weather.page.scss']
  })
export class WeatherPageComponent implements OnInit{

  forecastRange: any[] = [];
  dates: any[];
  forecast: any[];
  
  constructor(private dataStorage: DataStorageService, private dataService: DataService) {}

  ngOnInit() {
    this.forecastRange = this.dataStorage.forecastRange;
    this.dates = this.dataStorage.dates;
    this.forecast = this.dataStorage.forecast;
  }

}
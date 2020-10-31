import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { DataStorageService} from '../../../shared/dataStorage.service';

@Component({
    selector: 'weather-page',
    templateUrl: './weather.page.html',
    styleUrls: ['./weather.page.scss']
  })
export class WeatherPageComponent implements OnInit{

  forecast: any;
  
  constructor(private dataStorage: DataStorageService, private dataService: DataService) {}

  ngOnInit() {
    this.forecast = this.dataStorage.forecast;
  }

}
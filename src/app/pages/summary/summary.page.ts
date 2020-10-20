import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'summary-page',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss']
})
export class SummaryPageComponent implements OnInit {
  crimes: any[];
  POIs: any[];
  forecast: any[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
      // Call APIs Here
      /*this.dataService.crime().subscribe(
        (data) => {
          console.log(data);
          this.crimes = data.results;
        }
      );*/

      /*this.dataService.tripAdvisorLocationSearch().subscribe(
        (data) => {
          console.log(data);
          this.POIs = data.data;
        }
      );*/

      this.dataService.mapquestSearch().subscribe(
        (data) => {
          console.log(data);
        }
      );
    
      /*this.dataService.fiveDayForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
        }
      );*/

  }
}
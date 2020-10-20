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
  taLocationID: any;
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

      this.dataService.tripAdvisorLocationSearch().subscribe(
        (data) => { 
          console.log(data);
          for(var i=0; i<30; i++)
          {
            if(data.data[0].result_type == 'geos')
            {
              this.taLocationID = data.data[i].result_object.location_id;       //get location id to search other aspects
              break;
            }
          }
          console.log('Trip Advisor Location ID: ' + this.taLocationID)
        }
      );

      // this.dataService.mapquestSearch().subscribe(
      //   (data) => {
      //     console.log(data);
      //   }
      // );
    
      /*this.dataService.fiveDayForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
        }
      );*/

  }
}
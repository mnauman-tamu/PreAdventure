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
      // for after testing:
      // reroutes back to home page if no data in search params
      /*if(this.dataService.getInputSearch().to === '') {
        this.router.navigate(['']);
      }*/

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
          const app = document.getElementById('AttractionsInfo')

          for(var i=0; i < data.searchResults.length && i < 5; i++)
          {
            var loc_name = data.searchResults[i].name;
            const p = document.createElement('p');
            p.textContent = `${loc_name}`;
            app.appendChild(p);
          }
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

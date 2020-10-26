import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as DataClass from './../../shared/data.classes';


@Component({
  selector: 'summary-page',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})

export class SummaryPageComponent implements OnInit {
  ORIs: string[];
  ORIData: { [ori: string] : any }; 
  ORICrimeData: { [ori: string] : any};
  POIs: any[];
  taLocationID: any;
  taAttractions: any = [];
  forecast: any[];
  crimeDone: boolean = false;

  range5 = [0,1,2,3,4];

  imageName: string = "";

  panelOpenState: boolean;

  constructor(private dataService: DataService) {
    this.ORIs = new Array();
    this.ORIData = {};
    this.ORICrimeData = {};
  }

  ngOnInit() {
      this.dataService.dailyForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
          console.log(this.forecast);
        }
      );

      this.dataService.mapQuestGeocode().subscribe(
        (geo) => {
          console.log(geo);
          let county: string = geo.results[0].locations[0].adminArea4;
          this.dataService.getORIsByState(geo.results[0].locations[0].adminArea3).subscribe(
            (data) => {
              console.log(data);
              for(let elem of data.results) {
                console.log(county + ' ' + elem.county_name);
                if(county.toUpperCase().includes(elem.county_name.toUpperCase()) && elem.county_name != "") {
                  console.log(elem);
                  this.ORIs.push(elem.ori);
                  this.ORIData[elem.ori] = elem;
                }
              }
              for(let elem of this.ORIs) {
                console.log(elem);
                this.dataService.getCrimeDataForORI(elem).subscribe(
                  (crimeData) => {
                    console.log(crimeData); 
                    this.ORICrimeData[elem] = crimeData;
                  }
                );
              }
              this.test();
              this.crimeDone = true;
            } 
          )
        }
      );
  }

  test() {
    console.log(this.ORIData);
    console.log(this.ORICrimeData);
  }
}


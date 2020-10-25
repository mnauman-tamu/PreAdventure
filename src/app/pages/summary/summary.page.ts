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

  imageName: string = "";

  panelOpenState: boolean;

  constructor(private dataService: DataService) {
    this.ORIs = new Array();
    this.ORIData = {};
    this.ORICrimeData = {};
  }

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

      //trip advisor api servicing
      /*this.dataService.tripAdvisorLocationSearch().subscribe(
        (data) => { 
          console.log(data);
          for(var i=0; i<data.data.length; i++)
          {
            if(data.data[0].result_type == 'geos')
            {
              this.taLocationID = data.data[i].result_object.location_id;       //get location id to search other aspects
              break;
            }
          }
          console.log('Trip Advisor Location ID: ' + this.taLocationID);

          //trip advisor attractions search
          const card = document.getElementById('AttractionsList')
          this.dataService.tripAdvisorAttractionsSearch(this.taLocationID).subscribe(
            (attractionsData) => {
              console.log(attractionsData);

              for (var i = 0; i < data.data.length && i < 10; i++)
              {
                const attName = attractionsData.data[i].name;
                const attDesc = attractionsData.data[i].description;
                const attAddy = attractionsData.data[i].address;
                const attURL = attractionsData.data[i].web_url;
                var attPhoto = null;
                try
                {
                  attPhoto = attractionsData.data[i].photo.images.large.url;
                }
                catch {}

                let attObj = new DataClass.attObject(attName, attDesc, attAddy, attURL, attPhoto);
                this.taAttractions[i] = attObj;

                //limit display to 5 attractions
                if(i < 5)
                {
                  const lcontainer = document.createElement('div');
                  lcontainer.setAttribute('class', 'container');

                  const link_tag = document.createElement('a');
                  link_tag.href = attURL;
                  link_tag.textContent = attName;

                  card.appendChild(lcontainer);
                  lcontainer.appendChild(link_tag);
                }
              }
            }
          )
        }
      );*/

      //mapquest api servicing
      // this.dataService.mapquestSearch().subscribe(
      //   (data) => {
      //     console.log(data);

      //     const app = document.getElementById('AttractionsInfo')

      //     for(var i=0; i < data.searchResults.length && i < 5; i++)
      //     {
      //       var loc_name = data.searchResults[i].name;
      //       const p = document.createElement('p');
      //       p.textContent = `${loc_name}`;
      //       app.appendChild(p);
      //     }
      //   }
      // );

      /*this.dataService.fiveDayForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
        }
      );*/

      /*this.dataService.dailyForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
          console.log(this.forecast);
        }
      );*/
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
      )
  }

  test() {
    console.log(this.ORIData);
    console.log(this.ORICrimeData);
  }
}

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
  crimes: any[];
  POIs: any[];
  taLocationID: any;
  taAttractions: any = [];
  forecast: any[];
  arrivalLocation: any;
  departureLocation: any;

  range5 = [0, 1, 2, 3, 4];

  imageName = '';

  panelOpenState: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (!sessionStorage.getItem('isPageRefreshed')) {
      sessionStorage.setItem('isPageRefreshed', 'true');
      // This will reload page once prevent reloading of page again for that session.
      window.location.reload();

    }
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

      // trip advisor api servicing
      // this.dataService.tripAdvisorLocationSearch().subscribe(
      //   (data) => {
      //     console.log(data);
      //     for(var i=0; i<data.data.length; i++)
      //     {
      //       if(data.data[0].result_type == 'geos')
      //       {
      //         this.taLocationID = data.data[i].result_object.location_id;       //get location id to search other aspects
      //         break;
      //       }
      //     }
      //     console.log('Trip Advisor Location ID: ' + this.taLocationID);
      //
      //     //trip advisor attractions search
      //     const card = document.getElementById('AttractionsList')
      //     this.dataService.tripAdvisorAttractionsSearch(this.taLocationID).subscribe(
      //       (attractionsData) => {
      //         console.log(attractionsData);
      //
      //         for (var i = 0; i < data.data.length && i < 10; i++)
      //         {
      //           const attName = attractionsData.data[i].name;
      //           const attDesc = attractionsData.data[i].description;
      //           const attAddy = attractionsData.data[i].address;
      //           const attURL = attractionsData.data[i].web_url;
      //           var attPhoto = null;
      //           try
      //           {
      //             attPhoto = attractionsData.data[i].photo.images.large.url;
      //           }
      //           catch {}
      //
      //           let attObj = new DataClass.attObject(attName, attDesc, attAddy, attURL, attPhoto);
      //           this.taAttractions[i] = attObj;
      //
      //           // //limit display to 5 attractions
      //           // if(i < 5)
      //           // {
      //           //   const lcontainer = document.createElement('div');
      //           //   lcontainer.setAttribute('class', 'container');
      //
      //           //   const link_tag = document.createElement('a');
      //           //   link_tag.href = attURL;
      //           //   link_tag.textContent = attName;
      //
      //           //   card.appendChild(lcontainer);
      //           //   lcontainer.appendChild(link_tag);
      //           // }
      //         }
      //       }
      //     )
      //   }
      // );

      // mapquest api servicing
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

    interface keyValuePair{
      key: any;
      value: any;
    }

    this.dataService.skyScannerGetLoc(this.dataService.getInputSearch().from).subscribe(
      (data1) => {
        console.log(data1);
        this.dataService.skyScannerGetLoc(this.dataService.getInputSearch().to).subscribe(
          (data2) => {
            console.log(data2);
            this.arrivalLocation = data1.Places[0].PlaceId as string;
            this.departureLocation = data2.Places[0].PlaceId as string;
            // tslint:disable-next-line:max-line-length
            this.dataService.skyScannerFlightSearch(this.departureLocation, this.arrivalLocation, this.dataService.getInputSearch().start_date).subscribe(
              (data) => {
                console.log(data);
                const text = document.getElementById('FlightsData');


                for (let i = 0; i < data.Quotes.length && i < 5; i ++){
                  const flight_price = data.Quotes[i].MinPrice;
                  const time = data.Quotes[i].QuoteDateTime;
                  const p = document.createElement('p');
                  p.textContent = `$${flight_price} Time: ${time.substring(time.indexOf('T') + 1, time.indexOf('T') + 6)}`;
                  text.appendChild(p);
                }
              }
            );
            console.log(this.arrivalLocation);
          }
        );

      }
    );

      /*this.dataService.fiveDayForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
          console.log(this.forecast);
        }
      );*/

  }
}

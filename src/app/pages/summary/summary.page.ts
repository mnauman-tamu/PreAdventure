import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class attObject {
  name: any;
  description: any;
  address: any;
  webURL: any;
  photo: any;

  constructor(name: string, description: string, address: string, webURL: string, photo: string) {
    this.name = name;
    this.description = description;
    this.address = address;
    this.webURL = webURL;
    this.photo = photo;
  }
}

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

      //trip advisor api servicing
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
      //           let attObj = new attObject(attName, attDesc, attAddy, attURL, attPhoto);
      //           this.taAttractions[i] = attObj;
      //
      //           //limit display to 5 attractions
      //           if(i < 5)
      //           {
      //             const lcontainer = document.createElement('div');
      //             lcontainer.setAttribute('class', 'container');
      //
      //             const link_tag = document.createElement('a');
      //             link_tag.href = attURL;
      //             link_tag.textContent = attName;
      //
      //             card.appendChild(lcontainer);
      //             lcontainer.appendChild(link_tag);
      //           }
      //         }
      //       }
      //     )
      //   }
      // );

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


    this.dataService.skyScannerFlightSearch().subscribe(
      (data)=> {
        console.log(data);
        const text = document.getElementById("FlightsData");

        for(var i = 0; i < data.Quotes.length && i < 5; i ++){
          var flight_price = data.Quotes[i].MinPrice;
          const p = document.createElement('p');
          p.textContent = `$${flight_price}`;
          text.appendChild(p);
        }
      }
    )

      /*this.dataService.fiveDayForecast().subscribe(
        (data) => {
          console.log(data);
          this.forecast = data.list;
        }
      );*/

  }
}

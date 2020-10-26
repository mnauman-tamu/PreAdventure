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
  taHotels: any = [];
  taRestaurants: any = [];
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


      //trip advisor api servicing
      this.dataService.tripAdvisorLocationSearch().subscribe(
        (data) => { 
          // console.log(data);
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
          // const card = document.getElementById('AttractionsList')
          this.dataService.tripAdvisorAttractionsSearch(this.taLocationID).subscribe(
            (attractionsData) => {
              console.log(attractionsData);

              for (var i = 0; i < attractionsData.data.length && i < 10; i++)
              {
                const attName = attractionsData.data[i].name;
                const attDesc = attractionsData.data[i].description;
                const attRate = attractionsData.data[i].rating;
                const attAddy = attractionsData.data[i].address;
                const attURL = attractionsData.data[i].website;
                var attPhoto = null;
                try
                {
                  attPhoto = attractionsData.data[i].photo.images.large.url;
                }
                catch {}

                let attObj = new DataClass.attObject(attName, attDesc, attRate, attAddy, attURL, attPhoto);
                this.taAttractions[i] = attObj;

                // //limit display to 5 attractions
                // if(i < 5)
                // {
                //   const lcontainer = document.createElement('div');
                //   lcontainer.setAttribute('class', 'container');

                //   const link_tag = document.createElement('a');
                //   link_tag.href = attURL;
                //   link_tag.textContent = attName;

                //   card.appendChild(lcontainer);
                //   lcontainer.appendChild(link_tag);
                // }
              }
              this.dataService.gettaAttractions(this.taAttractions);
            }
          );


          //trip advisor hotels search api call
          // const card2 = document.getElementById('HotelsList')
          this.dataService.tripAdvisorHotelsSearch(this.taLocationID).subscribe(
            (hotelsData) => {
              console.log(hotelsData);

              for (var i = 0; i < hotelsData.data.length && i < 10; i++) {
                const hotName = hotelsData.data[i].name;
                const hotDesc = hotelsData.data[i].description;
                const hotRate = hotelsData.data[i].rating;
                const hotPrice = hotelsData.data[i].price;
                const hotAddy = hotelsData.data[i].address;
                const hotURL = hotelsData.data[i].web_url;
                var hotWifi = false;
                var hotBreakfast = false;
                var hotPhoto = null;
                try {
                  hotPhoto = hotelsData.data[i].photo.images.large.url;
                }
                catch { }

                //search through amenities
                for(let dict of hotelsData.data[i].amenities)
                {
                  if(dict.name.search(/wifi/i) > -1)
                  {
                    hotWifi = true;
                  }
                  if(dict.name.search(/breakfast/i) > -1)
                  {
                    hotBreakfast = true;
                  }
                }

                let hotObj = new DataClass.hotObject(hotName, hotDesc, hotRate, hotPrice, hotAddy, hotURL, hotPhoto, hotWifi, hotBreakfast);
                this.taHotels[i] = hotObj;

                //limit display to 5 attractions
                // if (i < 5) {
                //   const lcontainer = document.createElement('div');
                //   lcontainer.setAttribute('class', 'container');

                //   const link_tag = document.createElement('a');
                //   link_tag.href = hotURL;
                //   link_tag.textContent = hotName;

                //   card2.appendChild(lcontainer);
                //   lcontainer.appendChild(link_tag);
                // }
              }
              this.dataService.gettaHotels(this.taHotels);
            }
          );
  
          this.dataService.tripAdvisorRestaurantSearch(this.taLocationID).subscribe(
            (restData) => {
              console.log(restData);

              for (var i = 0; i < restData.data.length && i < 10; i++) {
                const restName = restData.data[i].name;
                const restDesc = restData.data[i].description;
                const restRating = restData.data[i].rating;
                const restPrice = restData.data[i].price_level;
                const restAddy = restData.data[i].address;
                const restURL = restData.data[i].web_url;
                var restPhoto = null;
                try {
                  restPhoto = restData.data[i].photo.images.large.url;
                }
                catch { }

                let restObj = new DataClass.restObject(restName, restDesc, restRating, restPrice, restAddy, restURL, restPhoto);
                this.taRestaurants[i] = restObj;

                //limit display to 5 attractions
                // if (i < 5) {
                //   const lcontainer = document.createElement('div');
                //   lcontainer.setAttribute('class', 'container');

                //   const link_tag = document.createElement('a');
                //   link_tag.href = hotURL;
                //   link_tag.textContent = hotName;

                //   card2.appendChild(lcontainer);
                //   lcontainer.appendChild(link_tag);
                // }
              }
              this.dataService.gettaRestaurants(this.taRestaurants);
            }
          );
        }
      );
      

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

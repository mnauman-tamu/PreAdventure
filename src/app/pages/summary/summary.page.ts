import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as DataClass from './../../shared/data.classes';
import { DataStorageService } from 'src/app/shared/dataStorage.service';


@Component({
  selector: 'summary-page',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})

export class SummaryPageComponent implements OnInit {
  ORIs: string[];
  ORIData: { [ori: string] : any } = {}; 
  ORICrimeData: { [ori: string] : any} = {};
  POIs: any[];
  taLocationID: any;
  taAttractions: any = [];
  taHotels: any = [];
  taRestaurants: any = [];
  forecastRange: any = [];
  dates: string[];
  forecast: any[];
  images: any[];
  music: any[];
  images2: any[];
  music2: any[];
  spotify: any[];
  arrivalLocation: any;
  departureLocation: any;
  inflights: any = [];
  outflights: any = [];
  mapQuestLocation: any;

  crimeDone: boolean = false;

  range5 = [0, 1, 2, 3, 4];

  imageName = '';

  panelOpenState: boolean;
  panelOpenState1: boolean;
  panelOpenState2: boolean;
  panelOpenState3: boolean;
  panelOpenState4: boolean;
  panelOpenState5: boolean;

  constructor(private dataStorage: DataStorageService, public dataService: DataService) {
    this.ORIs = new Array();
    this.dates = new Array();
  }

  ngOnInit() {
    // if (!sessionStorage.getItem('isPageRefreshed')) {
    //   sessionStorage.setItem('isPageRefreshed', 'true');
    //   // This will reload page once prevent reloading of page again for that session.
    //   window.location.reload();
    // }
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
    this.crimeDone = false;
    if(this.dataStorage.needToRequest()) {
      // this.dataService.tripAdvisorLocationSearch().subscribe(
      //   (data) => {
      //     // console.log(data);
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
      //     // const card = document.getElementById('AttractionsList')
      //     this.dataService.tripAdvisorAttractionsSearch(this.taLocationID).subscribe(
      //       (attractionsData) => {
      //         console.log(attractionsData);
      //         var j = 0;
      //         for (var i = 0; i < attractionsData.data.length && i < 11; i++)
      //         {
      //           if(i == 6)
      //             continue;
      //           const attName = attractionsData.data[i].name;
      //           const attDesc = attractionsData.data[i].description;
      //           const attRate = attractionsData.data[i].rating;
      //           const attAddy = attractionsData.data[i].address;
      //           const attURL = attractionsData.data[i].website;
      //           var attPhoto = null;
      //           try
      //           {
      //             attPhoto = attractionsData.data[i].photo.images.large.url;
      //           }
      //           catch {}
      //
      //           let attObj = new DataClass.attObject(attName, attDesc, attRate, attAddy, attURL, attPhoto);
      //           this.taAttractions[j] = attObj;
      //
      //           j++;
      //         }
      //         this.dataService.gettaAttractions(this.taAttractions);
      //       }
      //     );
      //
      //
      //     //trip advisor hotels search api call
      //     // const card2 = document.getElementById('HotelsList')
      //     this.dataService.tripAdvisorHotelsSearch(this.taLocationID).subscribe(
      //       (hotelsData) => {
      //         console.log(hotelsData);
      //         var j = 0;
      //         for (var i = 0; i < hotelsData.data.length && i < 10; i++) {
      //           const hotName = hotelsData.data[i].name;
      //           const hotDesc = hotelsData.data[i].description;
      //           const hotRate = hotelsData.data[i].rating;
      //           const hotPrice = hotelsData.data[i].price;
      //           const hotAddy = hotelsData.data[i].address;
      //           const hotURL = hotelsData.data[i].web_url;
      //           var hotWifi = false;
      //           var hotBreakfast = false;
      //           var hotPhoto = null;
      //           try {
      //             hotPhoto = hotelsData.data[i].photo.images.large.url;
      //           }
      //           catch { }
      //
      //           //search through amenities
      //           for(let dict of hotelsData.data[i].amenities)
      //           {
      //             if(dict.name.search(/wifi/i) > -1)
      //             {
      //               hotWifi = true;
      //             }
      //             if(dict.name.search(/breakfast/i) > -1)
      //             {
      //               hotBreakfast = true;
      //             }
      //           }
      //
      //           let hotObj = new DataClass.hotObject(hotName, hotDesc, hotRate, hotPrice, hotAddy, hotURL, hotPhoto, hotWifi, hotBreakfast);
      //           this.taHotels[i] = hotObj;
      //         }
      //         this.dataService.gettaHotels(this.taHotels);
      //       }
      //     );
      //
      //     //trip advisor restaurants search api call
      //     this.dataService.tripAdvisorRestaurantSearch(this.taLocationID).subscribe(
      //       (restData) => {
      //         console.log(restData);
      //         var j = 0;
      //         for (var i = 0; i < restData.data.length && i < 11; i++) {
      //           if(i == 4)
      //             continue;
      //           const restName = restData.data[i].name;
      //           const restDesc = restData.data[i].description;
      //           const restRating = restData.data[i].rating;
      //           const restPrice = restData.data[i].price_level;
      //           const restAddy = restData.data[i].address;
      //           const restURL = restData.data[i].website;
      //           var restPhoto = null;
      //           try {
      //             restPhoto = restData.data[i].photo.images.large.url;
      //           }
      //           catch { }
      //
      //           let restObj = new DataClass.restObject(restName, restDesc, restRating, restPrice, restAddy, restURL, restPhoto);
      //           this.taRestaurants[j] = restObj;
      //
      //           j++;
      //         }
      //         this.dataService.gettaRestaurants(this.taRestaurants);
      //       }
      //     );
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

      /*this.dataService.skyScannerGetLoc(this.dataService.search_input.to).subscribe(
        (data1) => {
          this.dataService.skyScannerGetLoc(this.dataService.search_input.from).subscribe(
            (data2) => {
              console.log(data2);
              this.arrivalLocation = data1.Places[0].CityId as string;
              this.departureLocation = data2.Places[0].CityId as string;


              // tslint:disable-next-line:max-line-length
              this.dataService.skyScannerFlightSearch(this.departureLocation, this.arrivalLocation, this.dataService.search_input.start_date).subscribe(
                (dataTo) => {
                  const text = document.getElementById('FlightsData');
                  const p = document.createElement('p');
                  const b = document.createElement('b');
                  b.textContent = 'Outbound Flights';
                  p.appendChild(b);
                  text.appendChild(p);

                  // Flights to location are stored here
                  console.log(dataTo);
                  for (let i = 0; i < dataTo.Quotes.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    const flight = new DataClass.flightData(dataTo.Quotes[i].MinPrice, dataTo.Quotes[i].OutboundLeg.CarrierIds, dataTo.Quotes[i].OutboundLeg.DepartureDate, dataTo.Quotes[i].Direct, dataTo.Quotes[i].OutboundLeg.OriginId, dataTo.Quotes[i].OutboundLeg.DestinationId);
                    this.outflights[i] = flight;
                  }
                  this.outflights.sort((a, b) => a.price < b.price ? -1 : a.price > b.price ? 1 : 0);

                  for (let i = 0; i < this.outflights.length; i++) {
                    const p = document.createElement('p');
                    const airlines = this.dataService.skyScannerCarriers(this.outflights[i].airlines, dataTo.Carriers);
                    const origin = this.dataService.skyScannerPlaces(this.outflights[i].originid, dataTo.Places);
                    const destination = this.dataService.skyScannerPlaces(this.outflights[i].destinationid, dataTo.Places);
                    console.log(airlines);
                    p.textContent = `${origin} Airport to ${destination} Airport`;
                    const br = document.createElement('br');
                    p.appendChild(br);
                    const p2 = document.createElement('p');
                    p2.textContent = `${airlines} $${this.outflights[i].price} `;
                    p.appendChild(p2);
                    text.appendChild(p);
                  }


                  // tslint:disable-next-line:max-line-length
                  this.dataService.skyScannerFlightSearch(this.arrivalLocation, this.departureLocation, this.dataService.search_input.end_date).subscribe(
                    (dataFrom) => {
                      console.log(dataFrom);
                      const p = document.createElement('p');
                      const b = document.createElement('b');
                      b.textContent = 'Inbound Flights';
                      p.appendChild(b);
                      text.appendChild(p);

                      // Flights from location are stored here
                      for (let i = 0; i < dataFrom.Quotes.length; i++) {
                        // tslint:disable-next-line:max-line-length
                        const flight = new DataClass.flightData(dataFrom.Quotes[i].MinPrice, dataFrom.Quotes[i].OutboundLeg.CarrierIds, dataFrom.Quotes[i].QuoteDateTime, dataFrom.Quotes[i].Direct, dataFrom.Quotes[i].OutboundLeg.OriginId, dataFrom.Quotes[i].OutboundLeg.DestinationId);
                        this.inflights[i] = flight;
                      }
                      this.inflights.sort((a, b) => a.price < b.price ? -1 : a.price > b.price ? 1 : 0);

                      for (let i = 0; i < this.inflights.length; i++) {
                        const p = document.createElement('p');
                        const airlines = this.dataService.skyScannerCarriers(this.inflights[i].airlines, dataTo.Carriers);
                        const origin = this.dataService.skyScannerPlaces(this.inflights[i].originid, dataTo.Places);
                        const destination = this.dataService.skyScannerPlaces(this.inflights[i].destinationid, dataTo.Places);
                        console.log(airlines);
                        p.textContent = `${origin} Airport to ${destination} Airport`;
                        const br = document.createElement('br');
                        p.appendChild(br);
                        const p2 = document.createElement('p');
                        p2.textContent = `${airlines} $${this.inflights[i].price} `;
                        p.appendChild(p2);
                        text.appendChild(p);
                      }


                    }
                  );
                }
              );
            }
          );

        }
      );*/


      this.dataService.dailyForecast().subscribe(
        (data) => {
          console.log(data);
          let daysByMonth = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
          let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          let curDate = new Date().toISOString();
          let inputDate = this.dataService.search_input.start_date;
          let curDateValue = (Number(curDate.substr(0, 4)) - 2020) * 365 + daysByMonth[Number(curDate.substr(5, 2))] + Number(curDate.substr(8, 2));
          let inputDateValue = (Number(inputDate.substr(0, 4)) - 2020) * 365 + daysByMonth[Number(inputDate.substr(5, 2))] + Number(inputDate.substr(8, 2));
          this.forecast = data.list;
          this.forecast.splice(0, inputDateValue - curDateValue);
          let inputYear = Number(inputDate.substr(0,4)), inputMonth = Number(inputDate.substr(5, 2)), inputDay = Number(inputDate.substr(8, 2));
          let offset = 0;
          for(let i = 0; i < this.forecast.length; i++) {
            if(inputDay + i > daysPerMonth[inputMonth-1]) {
              offset += daysPerMonth[inputMonth-1];
              inputMonth++;
            }
            if(inputMonth > 12) {
              inputMonth = 1;
              inputYear++;
            }
            this.dates.push(inputYear.toString() + '-' + inputMonth.toString() + '-' + (inputDay + i - offset).toString());
            this.forecastRange.push(i);
          }
          //this.dataService.search_input.start_date
          console.log(this.forecast);
        }
      );

      this.dataService.unplashImageSearch().subscribe(
        (data) => {
          console.log(data);
          this.images = data.results;
          console.log(this.images);
        }
      );

      this.dataService.iTunesSearch().subscribe(
        (data) => {
          console.log(data);
          for(var i = 0; i < data.results.length; i++) {
            data.results[i].trackViewUrl = data.results[i].trackViewUrl.replace("https://", "https://embed.");
            console.log(data.results[i].trackViewUrl)
          }
          this.music = data.results;
        }
      );

      this.dataService.mapQuestGeocode().subscribe(
        (geo) => {
          this.mapQuestLocation = geo;
          console.log(geo);
          this.crimeDone = true;
          /*let county: string = this.mapQuestLocation.results[0].locations[0].adminArea4;
          this.dataService.getORIsByState(geo.results[0].locations[0].adminArea3).subscribe(
            (data) => {
              console.log(data);
              let countA = 0;
              let countB = 0;
              for(let elem of data.results) {
                console.log(county + ' ' + elem.county_name);
                if(county.toUpperCase().includes(elem.county_name.toUpperCase()) && elem.county_name != "") {
                  console.log(elem);
                  this.ORIs.push(elem.ori);
                  this.ORIData[elem.ori] = elem;
                  countA++;
                }
              }
              for(let elem of this.ORIs) {
                console.log(elem);
                this.dataService.getCrimeDataForORI(elem).subscribe(
                  (crimeData) => {
                    console.log(crimeData);
                    this.ORICrimeData[elem] = crimeData;
                    countB++;
                    if(countA == countB) {
                      console.log('All APIs Done');
                      this.crimeDone = true;
                      this.dataStorage.summaryPageAPIs(this);
                    }
                  }
                );
              }
            } 
          )*/
<<<<<<< HEAD
        }
      );
      this.dataService.unplashImageSearch2().subscribe(

        (data) => {
          console.log(data);
          this.images2 = data.results;
          console.log(this.images2);
          this.dataService.getImages(this.images2);
        }

      );

      this.dataService.iTunesSearch2().subscribe(
        (data) => {
          console.log(data);
          for(var i = 0; i < data.results.length; i++) {
            data.results[i].trackViewUrl = data.results[i].trackViewUrl.replace("https://", "https://embed.");
            console.log(data.results[i].trackViewUrl)
          }
          this.music2 = data.results;
          this.dataService.getMusic(this.music2);
=======
>>>>>>> 1e7de6a6946bdcfcd1d7015a5bcae6ca28cbfc6b
        }
      );

      /*this.dataService.spotifySearch().subscribe(
        (data) => {
          console.log(data);
          this.spotify = data.list;
        }
      );*/
    } else {
        this.ORIs = this.dataStorage.ORIs;
        this.ORIData = this.dataStorage.ORICrimeData;
        this.ORICrimeData = this.dataStorage.ORICrimeData;
        this.POIs = this.dataStorage.POIs;
        this.taLocationID = this.dataStorage.taLocationID;
        this.taAttractions = this.dataStorage.taAttractions;
        this.taHotels = this.dataStorage.taHotels;
        this.taRestaurants = this.dataStorage.taRestaurants;
        this.forecastRange = this.dataStorage.forecastRange;
        this.dates = this.dataStorage.dates;
        this.forecast = this.dataStorage.forecast;
        this.images = this.dataStorage.images;
        this.music = this.dataStorage.music;
        this.images2 = this.dataStorage.images2;
        this.music2 = this.dataStorage.music2;
        this.spotify = this.dataStorage.spotify;
        this.arrivalLocation = this.dataStorage.arrivalLocation;
        this.departureLocation = this.dataStorage.departureLocation;
        this.mapQuestLocation = this.dataStorage.mapQuestLocation;
        this.crimeDone = true;
    }
  }

  test() {
    console.log(this.mapQuestLocation);
    console.log(this.ORIData);
    console.log(this.ORICrimeData);
  }
}

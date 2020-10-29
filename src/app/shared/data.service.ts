import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export interface Search {
    from: string;
    to: string;
    start_date: string;
    end_date: string;
}

@Injectable({
    providedIn: 'root',
})


export class DataService {

    //member variables
    taAttractionsList: any = [];
    taHotelsList: any = [];
    taRestaurantsList: any = [];

    searched: boolean = false;
    search_input: Search = {
        from: '',
        to: '',
        start_date: '',
        end_date: ''
    };


    constructor(private http: HttpClient) {}

    /* get request options
    const options: {
        headers?: HttpHeaders | {[header: string]: string | string[]},
        observe?: 'body' | 'events' | 'response',
        params?: HttpParams|{[param: string]: string | string[]},
        reportProgress?: boolean,
        responseType?: 'arraybuffer'|'blob'|'json'|'text',
        withCredentials?: boolean,
    }
    */

    // https://angular.io/guide/http

    getORIsByState(state: string): Observable<any> {
        return this.http.get(
          `https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/${state}?API_KEY=Yjch03tlVA2WMEk3fNTihmmQ48AGmUdcwVm84Jqs`
          );
    }

    getCrimeDataForORI(ori: string): Observable<any> {
        return this.http.get(
            `https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/${ori}/offenses/2018/2019?API_KEY=Yjch03tlVA2WMEk3fNTihmmQ48AGmUdcwVm84Jqs`
        );
    }

    mapQuestGeocode(): Observable<any> {
        return this.http.get(
          `http://www.mapquestapi.com/geocoding/v1/address?key=gYVGtryHTzuGgQYJf5laNbsIKgFp5Avw&location=${this.search_input.to}`
        );
    }

    mapquestSearch(): Observable<any> {
        const options = {
            params: {
                origin: `${this.search_input.to}`,
                radius: '20',
                maxMatches: '10',
                ambiguities: 'ignore',
                hostedData: 'mqap.ntpois|group_sic_code=?|999333',
                key: 'gYVGtryHTzuGgQYJf5laNbsIKgFp5Avw'
            }
        };
        return this.http.get(
            // `https://www.mapquestapi.com/search/v2/radius?origin=San+Fransisco&radius=20&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|999333&key=gYVGtryHTzuGgQYJf5laNbsIKgFp5Avw`
            'https://www.mapquestapi.com/search/v2/radius?',
            options
        );
    }


    fiveDayForecast(): Observable<any> {
      const options = {
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': 'a622ac738emsh154c26ff5de0944p1a36a0jsn6b447b8261a5'
        },
        params: {
          q: `${this.search_input.to}, us`,
          units: 'imperial'
        }
      };

      return this.http.get(
        `https://rapidapi.p.rapidapi.com/forecast`,
        options
      );
    }

  skyScannerFlightSearch(from: any, to: any, fromdate: any): Observable<any> {

    const options = {
      headers: {
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': '7224126e86msh83a5d846bba8024p1a6411jsn5c98e71aefa2'
      },
    };
    console.log(from);

    return this.http.get(
      // tslint:disable-next-line:max-line-length
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${from}/${to}/${fromdate}`, options);
  }

    dailyForecast(): Observable<any> {
        const options = {
          headers: {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': 'a622ac738emsh154c26ff5de0944p1a36a0jsn6b447b8261a5'
          },
          params: {
            q: `${this.search_input.to}, us`,
            units: 'imperial'
          }
        };

        return this.http.get(
          `https://rapidapi.p.rapidapi.com/forecast/daily`,
          options
        );
      }


  skyScannerGetLoc(loc: any): Observable<any> {
    const options = {
      headers: {
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': '7224126e86msh83a5d846bba8024p1a6411jsn5c98e71aefa2'
      },
      params: {
        query: loc
      }
    };

    return this.http.get(
      'https://rapidapi.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/', options);
  }

  skyScannerCarriers(carrierIds: any, carriers: any): any {
    const carrierNames: any = [];
    let k = 0;
    for (let i = 0; i < carriers.length; ++i) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < carrierIds.length; ++j) {
        if (carriers[i].CarrierId === carrierIds[j]) {
          carrierNames[k] = carriers[i].Name;
          k++;
        }
      }
    }
    return carrierNames;
  }

  skyScannerPlaces(placeId: any, places: any): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < places.length; ++i) {
      if (placeId === places[i].PlaceId) {
        console.log('here');
        return places[i].Name;
      }
    }
    return '';
  }

    taKey = '0ca729d386msh96bc584a4685233p119899jsncc5cbeeb00d9';
    tripAdvisorLocationSearch(): Observable<any>
    {
        const options = {
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': this.taKey
            },
            params: {
                query: `'${this.search_input.to}'`,
                location_id: '1',
                limit: '30',
                sort: 'relevance',
                offset: '0',
                lang: 'en_US',
                currency: 'USD',
                units: 'mi'
            }
        };

        return this.http.get(
            `https://rapidapi.p.rapidapi.com/locations/search`,
            options
        );
    }

    tripAdvisorAttractionsSearch(id): Observable<any>
    {
        const options = {
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': this.taKey
            },
            params: {
                location_id : `${id}`,
                lang : 'en_US',
                currency : 'USD',
                sort : 'recommended',
                lunit : 'mi',
                limit : '15'
            }
        };

        console.log(`https://rapidapi.p.rapidapi.com/attractions/list`, options)
        return this.http.get(
            `https://rapidapi.p.rapidapi.com/attractions/list`,
            options
        );
    }
  tripAdvisorHotelsSearch(id): Observable<any>
  {
    const options = {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': this.taKey
      },
      params: {
        location_id: `${id}`,
        adults: '1',
        checkin: `${this.search_input.start_date}`,
        rooms: '1',
        nights: '2',        //fixme
        offset: '0',
        currency: 'USD',
        limit: '30',
        order: 'asc',
        lang: 'en_US',
        sort: 'recommended'
      }
    };
    console.log(`https://rapidapi.p.rapidapi.com/hotels/get-details`, options)
    return this.http.get(
      `https://rapidapi.p.rapidapi.com/hotels/get-details`,
      options
    );
  }

  tripAdvisorRestaurantSearch(id): Observable<any> {
    const options = {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': this.taKey
      },
      params: {
        location_id: `${id}`,
        lunit: 'mi',
        limit: '30',
        currency: 'USD',
        lang: 'en_US'
      }
    };
    console.log(`https://rapidapi.p.rapidapi.com/restaurants/list`, options)
    return this.http.get(
      `https://rapidapi.p.rapidapi.com/restaurants/list`,
      options
    );
  }

    unplashImageSearch(): Observable<any> {
      const options = {
        /*headers: {
          'Access Key': '3W6s5FtYTqAljRAG_050DF3P3T6_2q2v7hXAjQKrP88',
          'Secret Key': 'm0rqXhl5Ta1xqf0BnLAU4016ShWYejBIqyEUMV4xb0w'

        },*/
        params: {
          query: `'${this.search_input.to}'`,
          page: '1',
          per_page: '3',
          client_id: '3W6s5FtYTqAljRAG_050DF3P3T6_2q2v7hXAjQKrP88',
        }
      };

      return this.http.get(
        `https://api.unsplash.com/search/photos`,
        options
      );
    }

    iTunesSearch(): Observable<any> {
      const options = {
        headers: {
          /*"content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "iTunesvolodimir-kudriachenkoV1.p.rapidapi.com",
          "x-rapidapi-key": "a0c517e50fmsha9a75e803218fbep1f3c97jsndc0fddd8d86d",
          "useQueryString": true
          'Access-Control-Allow-Origin': 'http://localhost:4200/summary',*/
        },
        params: {
          term: `${this.search_input.to}`,
          entity: 'song',
          limit: '25'
        }
      };

      console.log('https://itunes.apple.com/search', options)
      return this.http.get(
        'https://itunes.apple.com/search',
        options
      );
    }

  /*spotifySearch(): Observable<any> {
    const options = {
      headers: {
        /*'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'Spotifystefan-skliarovV1.p.rapidapi.com',
        'x-rapidapi-key': 'a0c517e50fmsha9a75e803218fbep1f3c97jsndc0fddd8d86d',
        useQueryString: true*/
        /*'Authorization' : 'Bearer b9d611ae46fc4445a82f258464e6a64d'
      },
      params: {
        "q": `'${this.search_input.to}'`,
        //"accessToken": "b9d611ae46fc4445a82f258464e6a64d",
        "type": "track",
        "limit": "25"
      }
    };

    console.log('https://api.spotify.com/v1/search', options)
    return this.http.get(
      'https://api.spotify.com/v1/search',
      options
    );
  }

    console.log('https://api.spotify.com/v1/search', options)
    return this.http.get(
      'https://api.spotify.com/v1/search',
      options
    );
  }*/

    inputSearch(formInput): void {
        this.search_input.from = formInput.from;
        this.search_input.to = formInput.to;
        this.search_input.start_date = formInput.start_date;
        this.search_input.end_date = formInput.end_date;
        this.searched = true;
    }

    getInputSearch(): Search {
        return this.search_input;
    }

    gettaAttractions(attractionsl): void {
        this.taAttractionsList = attractionsl;
        console.log(this.taAttractionsList);
    }

    gettaHotels(hotelsl): void {
        this.taHotelsList = hotelsl;
        console.log(this.taHotelsList);
    }

    gettaRestaurants(restl): void {
        this.taRestaurantsList = restl;
        console.log(this.taRestaurantsList);
    }
}

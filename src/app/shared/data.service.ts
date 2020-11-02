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

    stateCrime = {
      'maine':{
        rank: 1,
        crime: '112.1 per 100,000',
        murders: '24 (7th lowest)',
        city: 'Augusta'
      },
      'vermont':{
        rank: 2,
        crime: '172 per 100,000',
        murders: '10 (the lowest)',
        city: 'Rutland'
      },
      'New Hampshire':{
        rank: 3,
        crime: '173.2 per 100,000',
        murders: '21 (6th lowest)',
        city: 'Manchester'
      },
      'Virginia':{
        rank: 4,
        crime: '200 per 100,000',
        murders: '391 (17th highest)',
        city: 'Portsmouth'
      },
      'Connecticut':{
        rank: 5,
        crime: '207.4 per 100,000',
        murders: '83 (18th lowest)',
        city: 'Hartford'
      },
      'New Jersey':{
        rank: 6,
        crime: '208.1 per 100,000',
        murders: '286 (20th highest)',
        city: 'Camden'
      },
      'Kentucky':{
        rank: 7,
        crime: '211.9 per 100,000',
        murders: '244 (21st highest)',
        city: 'Covington'
      },
      'Wyoming':{
        rank: 8,
        crime: '212.2 per 100,000',
        murders: '13 (3rd lowest)',
        city: 'Cheyenne'
      },
      'Rhode Island':{
        rank: 9,
        crime: '219.1 per 100,000',
        murders: '16 (4th lowest)',
        city: 'Woonsocket'
      },
      'Minnesota':{
        rank: 10,
        crime: '220.4 per 100,000',
        murders: '106 (19th lowest)',
        city: 'Minneapolis'
      },
      'Idaho':{
        rank: 11,
        crime: '227.1 per 100,000',
        murders: '35 (9th lowest)',
        city: 'Garden City'
      },
      'Utah':{
        rank: 12,
        crime: '233.1 per 100,000',
        murders: '60 (15th lowest)',
        city: 'South Salt Lake'
      },
      'Mississippi': {
        rank: 13,
        crime: '234.4 per 100,000',
        murders: '171 (23rd lowest)',
        city: 'Brookhaven'
      },
      'Hawaii':{
        rank: 14,
        crime: '248.6 per 100,000',
        murders: '36 (10th lowest)',
        city: 'Honolulu'
      },
      'Iowa':{
        rank: 15,
        crime: '250.1 per 100,000',
        murders: '54 (14th lowest)',
        city: 'Waterloo'
      },
      'Ohio':{
        rank: 16,
        crime: '279.9 per 100,000',
        murders: '564 (9th highest)',
        city: 'Cleveland'
      },
      'North Dakota':{
        rank: 17,
        crime: '280.6 per 100,000',
        murders: '18 (5th lowest)',
        city: 'Williston'
      },
      'Nebraska':{
        rank: 18,
        crime: '284.4 per 100,000',
        murders: '44 (11th lowest)',
        city: 'Omaha'
      },
      'Oregon':{
        rank: 19,
        crime: '285.5 per 100,000',
        murders: '82 (17th lowest)',
        city: 'Portland'
      },
      'West Virginia':{
        rank: 20,
        crime: '289.9 per 100,000',
        murders: '67 (16th lowest)',
        city: 'Beckley'
      },
      'Wisconsin':{
        rank:21,
        crime: '295.4per 100,000',
        murders: '176 (24th lowest)',
        city: 'Milwaukee'
      },
      'Pennsylvania':{
        rank: 22,
        crime: '306 per 100,000',
        murders: '784 (4th highest)',
        city: 'McKeesport'
      },
      'Washington':{
        rank: 23,
        crime: '311.5 per 100,000',
        murders: '236 (22nd highest)',
        city: 'Tacoma'
      },
      'Georgia':{
        rank: 24,
        crime: '326.6 per 100,000',
        murders: '642 (6th highest)',
        city: 'East Point'
      },
      'Massachusetts':{
        rank: 25,
        crime: '338.1 per 100,000',
        murders: '136 (21st lowest)',
        city: 'Fall River'
      },
      'New York':{
        rank: 26,
        crime: '350.5 per 100,000',
        murders: '562 (10th highest)',
        city: 'Newburgh'
      },
      'Montana':{
        rank: 27,
        crime: '374.1 per 100,000',
        murders: '34 (8th lowest)',
        city: 'Helena'
      },
      'North Carolina':{
        rank: 28,
        crime: '377.6 per 100,000',
        murders: '628 (7th highest)',
        city: 'Whiteville'
      },
      'Indiana':{
        rank: 29,
        crime: '382.3 per 100,000',
        murders: '438 (20th highest)',
        city: 'Indianapolis'
      },
      'Florida':{
        rank: 30,
        crime: '384.9 per 100,000',
        murders: '1107 (3rd highest)',
        city: 'Florida City'
      },
      'Colorado':{
        rank: 31,
        crime: '397.2 per 100,000',
        murders: '210 (24th lowest)',
        city: 'Pueblo'
      },
      'Illinois':{
        rank: 32,
        crime: '404.1 per 100,000',
        murders: '884 (4th lowest)',
        city: 'Danville'
      },
      'South Dakota':{
        rank: 33,
        crime: '404.7 per 100,000',
        murders: '12 (2nd lowest)',
        city: 'Rapid City'
      },
      'Texas':{
        rank: 34,
        crime: '410.9 per 100,000',
        murders: '1,322 (2nd highest)',
        city: 'Bellmead'
      },
      'Delaware':{
        rank: 35,
        crime: '423.6 per 100,000',
        murders: '48 (13th lowest)',
        city: 'Wilmington'
      },
      'Kansas':{
        rank: 36,
        crime: '439 per 100,000',
        murders: '113 (20th lowest)',
        city: 'Wichita'
      },
      'California':{
        rank: 37,
        crime: '447.4 per 100,000',
        murders: '1739 (the highest)',
        city: 'Emeryville'
      },
      'Michigan':{
        rank: 38,
        crime: '449.4 per 100,000',
        murders: '551 (11th highest)',
        city: 'Muskegon Heights'
      },
      'Oklahoma':{
        rank: 39,
        crime: '466.1 per 100,000',
        murders: '206 (25th highest)',
        city: 'Shawnee'
      },
      'Maryland':{
        rank: 40,
        crime: '468.7 per 100,000',
        murders: '490 (14th higest)',
        city: 'Baltimore'
      },
      'Arizona':{
        rank: 41,
        crime: '474.9 per 100,000',
        murders: '369 (19th highest)',
        city: 'Tucson'
      },
      'South Carolina':{
        rank: 42,
        crime: '488.3 per 100,000',
        murders: '392 (16th highest)',
        city: 'Greenwood'
      },
      'Missouri':{
        rank: 43,
        crime: '502.1 per 100,000',
        murders: '607 (8th highest)',
        city: 'St. Louis'
      },
      'Alabama':{
        rank: 44,
        crime: '519.6 per 100,000',
        murders: '383 (10th highest)',
        city: 'Anniston'
      },
      'Louisiana':{
        rank: 45,
        crime: '537.5 per 100,000',
        murders: '530 (12th highest)',
        city: 'Opelousas'
      },
      'Nevada':{
        rank: 46,
        crime: '541.1 per 100,000',
        murders: '202 (25th lowest)',
        city: 'North Las Vegas'
      },
      'Arkansas':{
        rank: 47,
        crime: '543.6 per 100,000',
        murders: '216 (23rd highest)',
        city: 'West Memphis'
      },
      'Tennessee':{
        rank: 48,
        crime: '623.7 per 100,000',
        murders: '498 (13th highest)',
        city: 'Memphis'
      },
      'New Mexico':{
        rank: 49,
        crime: '856.6 per 100,000',
        murders: '167 (22nd lowest)',
        city: 'Gallup'
      },
      'Alaska':{
        rank: 50,
        crime: '885 per 100,000',
        murders: '47 (12th lowest)',
        city: 'Anchorage'
      }
    }

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
    changeTheme() {
        document.body.classList.add('theme-alternate');
    }

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
        console.log(this.search_input);
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

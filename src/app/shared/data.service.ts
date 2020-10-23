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

    crime(): Observable<any> {
        // let headers: HttpHeaders = new HttpHeaders();
        /*headers = headers.append('Accept', 'application/json');
        headers = headers.append(
          'X-RapidAPI-Key',
          '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
        );*/
        return this.http.get(
          `https://api.usa.gov/crime/fbi/sapi/api/summarized/state/TX/violent-crime/2000/2019?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`
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

    /*tripAdvisorLocationSearch(): Observable<any>
    {
        const options = {
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': 'c240828760msh057482f498e41c4p172a21jsndb181050d689'
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
    }

    /*tripAdvisorAttractionsSearch(id): Observable<any>
    {
        const options = {
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': 'c240828760msh057482f498e41c4p172a21jsndb181050d689'
            },
    tripAdvisorAttractionsSearch(id): Observable<any>
    {
        const options = {
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': 'c240828760msh057482f498e41c4p172a21jsndb181050d689'
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
    }*/


    /*
    exampleCallingFunction(): void {
        DataService.exampleFunction().subscribe(
            (err) => {
                console.log("Error: " err)
            },
            (data) => {
                // 'data' is the JSON object
                weather = data;
            }
        )
    }
    */

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
        /*headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "iTunesvolodimir-kudriachenkoV1.p.rapidapi.com",
          "x-rapidapi-key": "a0c517e50fmsha9a75e803218fbep1f3c97jsndc0fddd8d86d",
          "useQueryString": true
        },*/
        params: {
          "entity": "song",
          "term": `'${this.search_input.to}'`,
          "limit": "25"
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
    }

    getInputSearch(): Search {
        return this.search_input;
    }

}

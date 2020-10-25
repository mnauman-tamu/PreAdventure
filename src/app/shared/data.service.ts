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

    tripAdvisorLocationSearch(): Observable<any>
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
    }

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

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';

export interface search {
    from: string;
    to: string;
    start_date: string;
    end_date: string;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {

    search_input: search = {
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

    spotifyByCountry(country: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append(
          'X-RapidAPI-Key',
          '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
        );
        return this.http.get(
          `https://restcountries-v1.p.rapidapi.com/capital/${this.search_input.from}` + name, 
           {headers: headers}
          )
    }

    crime(): Observable<any> {
        //let headers: HttpHeaders = new HttpHeaders();
        /*headers = headers.append('Accept', 'application/json');
        headers = headers.append(
          'X-RapidAPI-Key',
          '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
        );*/
        return this.http.get(
          `https://api.usa.gov/crime/fbi/sapi/api/summarized/state/TX/violent-crime/2000/2019?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`
          )
    }

    tripAdvisorLocationSearch(): void
    {
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/locations/search',
            params: {
                query: `'${this.search_input.to}'`,
                location_id: '1',
                limit: '30',
                sort: 'relevance',
                offset: '0',
                lang: 'en_US',
                currency: 'USD',
                units: 'km'
            },
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': 'c240828760msh057482f498e41c4p172a21jsndb181050d689'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });



        
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
}
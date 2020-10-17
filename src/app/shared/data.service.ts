import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';

export interface search {
    location: string;
    start_date: string;
    end_date: string;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {

    search_input: search = {
        location: '',
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

    exampleFunction(): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append(
          'X-RapidAPI-Key',
          '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
        );
        return this.http.get(
          `https://restcountries-v1.p.rapidapi.com/capital/` + name, 
           {headers: headers}
          )
    }

    /*
    exampleCallingFunction(): void {
        DataService.exampleFunction().subscribe(
            (err) => {
                console.log("Error: " err)
            },
            (data) => {
                // 'data' is the JSON object
            }
        )
    }
    */

    inputSearch(formInput): void {
        this.search_input.location = formInput.location;
        this.search_input.location = formInput.start_date;
        this.search_input.end_date = formInput.end_date;
    }
}
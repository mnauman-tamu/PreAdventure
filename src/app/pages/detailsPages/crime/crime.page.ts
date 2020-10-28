import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'crime-page',
    templateUrl: './crime.page.html',
    styleUrls: ['./crime.page.scss']
  })
export class CrimePageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'hotels-page',
    templateUrl: './hotels.page.html',
    styleUrls: ['./hotels.page.scss']
  })
export class HotelsPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
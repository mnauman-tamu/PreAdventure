import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'restaurants-page',
    templateUrl: './restaurants.page.html',
    styleUrls: ['./restaurants.page.scss']
  })
export class RestaurantsPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'restaurants-page',
    templateUrl: './restaurants.page.html',
    styleUrls: ['./restaurants.page.scss']
  })
export class RestaurantsPageComponent implements OnInit{

  taRestaurantsList: any = [];
  name: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.taRestaurantsList = this.dataService.taRestaurantsList;
    this.name = this.dataService.search_input.to;
  }

}
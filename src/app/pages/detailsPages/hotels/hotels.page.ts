import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'hotels-page',
    templateUrl: './hotels.page.html',
    styleUrls: ['./hotels.page.scss']
  })
export class HotelsPageComponent implements OnInit{

  taHotelsList: any = [];
  name: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.taHotelsList = this.dataService.taHotelsList;
    this.name = this.dataService.search_input.to;
  }

}
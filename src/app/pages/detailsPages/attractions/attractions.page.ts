import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import * as DataClass from '../../../shared/data.classes';

@Component({
    selector: 'attractions-page',
    templateUrl: './attractions.page.html',
    styleUrls: ['./attractions.page.scss']
  })
export class AttractionsPageComponent implements OnInit{

  taAttractionsList: any = [];
  
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.taAttractionsList = this.dataService.taAttractionsList;
    // console.log(this.taAttractionsList)
  }

}
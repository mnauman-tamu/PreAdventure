import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'attractions-page',
    templateUrl: './attractions.page.html',
    styleUrls: ['./attractions.page.scss']
  })
export class AttractionsPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
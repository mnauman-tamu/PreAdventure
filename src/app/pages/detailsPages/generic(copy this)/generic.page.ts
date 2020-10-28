import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/data.service';

@Component({
    selector: 'generic-page',
    templateUrl: './generic.page.html',
    styleUrls: ['./generic.page.scss']
  })
export class GenericPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
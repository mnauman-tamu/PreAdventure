import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'music-page',
    templateUrl: './music.page.html',
    styleUrls: ['./music.page.scss']
  })
export class MusicPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
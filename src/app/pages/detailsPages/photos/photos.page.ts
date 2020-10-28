import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'photos-page',
    templateUrl: './photos.page.html',
    styleUrls: ['./photos.page.scss']
  })
export class PhotosPageComponent implements OnInit{
  
    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}
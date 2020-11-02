import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import * as DataClass from '../../../shared/data.classes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';


@Component({
    selector: 'photos-page',
    templateUrl: './photos.page.html',
    styleUrls: ['./photos.page.scss']
  })
export class PhotosPageComponent implements OnInit{
    images2: any[];
    name: string;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.images2 = this.dataService.images2;
      this.name = this.dataService.search_input.to;
    }

}

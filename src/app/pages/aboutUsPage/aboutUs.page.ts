import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as DataClass from './../../shared/data.classes';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
    selector: 'about-us-page',
    templateUrl: './aboutUs.page.html',
    styleUrls: ['./aboutUs.page.scss']
  })
export class aboutUsPageComponent implements OnInit{

  imageName = "assets/images/valley.jpg";

    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}

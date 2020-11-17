import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as DataClass from './../../shared/data.classes';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
    selector: 'faq-page',
    templateUrl: './FAQ.page.html',
    styleUrls: ['./FAQ.page.scss']
  })
export class FAQPageComponent implements OnInit{
  panelOpenState: any;
  imageName = 'assets/images/7.png';
  panelOpenState2: boolean;

    constructor(private dataService: DataService) {}

    ngOnInit() {

    }

}

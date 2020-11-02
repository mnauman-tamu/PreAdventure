import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import * as DataClass from '../../../shared/data.classes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
    selector: 'music-page',
    templateUrl: './music.page.html',
    styleUrls: ['./music.page.scss']
  })
export class MusicPageComponent implements OnInit{
    music2: any[];
    name: string;

    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.music2 = this.dataService.music2;
      this.name = this.dataService.search_input.to;
    }
}

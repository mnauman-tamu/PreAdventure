import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'home-page',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss']
})
export class SummaryPageComponent implements OnInit {

    POIs: String[];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        // Call APIs Here
        this.dataService.crime().subscribe(
          (data) => {
            console.log(data);
          }
        )

        this.dataService.tripAdvisorLocationSearch();
    }
}
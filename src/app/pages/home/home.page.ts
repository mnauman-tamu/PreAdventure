import { Component } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {

    searchParams = new FormGroup( {
        location: new FormControl(''),
        start_date: new FormControl(''),
        end_date: new FormControl('')
    });

    constructor(private dataService: DataService) {}

    submit() {
        this.dataService.inputSearch(this.searchParams.value);
        console.log("searched!");
    }
}
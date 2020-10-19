import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {

    imageName = "assets/images/valley.jpg";

    searchParams = new FormGroup( {
        from: new FormControl(''),
        to: new FormControl('', Validators.required),
        start_date: new FormControl(''),
        end_date: new FormControl('')
    });

    constructor(private dataService: DataService, private router: Router) {}

    submit() {
        this.dataService.inputSearch(this.searchParams.value);
        console.log("searched!");
        this.router.navigate(['summary']);
    }
}
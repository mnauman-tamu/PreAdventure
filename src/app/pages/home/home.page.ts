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
    toError = false;

    imageName = "assets/images/valley.jpg";

    searchParams = new FormGroup( {
        from: new FormControl('', Validators.required),
        to: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required)
    });

    constructor(private dataService: DataService, private router: Router) {}

    submit() {
        this.dataService.inputSearch(this.searchParams.value);
        console.log("searched!");
        console.log(this.searchParams.value);
        this.dataService.mapQuestGeocode().subscribe(
            (geo) => {
                console.log(geo);
                if(geo.results[0].locations[0].adminArea1 == 'US') {
                    this.router.navigate(['summary']);
                } else {
                    this.toError = true;
                    this.searchParams.patchValue({
                        to: ''
                    })
                }
            }
          );
        
    }
}
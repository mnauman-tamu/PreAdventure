import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
    fromError = false;
    toError = false;
    startError = false;
    endError = false;

    imageName = "assets/images/valley.jpg";

    searchParams = new FormGroup( {
        from: new FormControl('', Validators.required),
        to: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required)
    });

    constructor(private dataService: DataService, private router: Router, private dataStorage: DataStorageService) {}

    submit() {
        this.dataService.inputSearch(this.searchParams.value);
        console.log("searched!");
        console.log(this.searchParams.value);
        let curDate = new Date().toISOString();
        let date = this.searchParams.value.start_date;
        if(this.checkDate(Number(curDate.substr(0, 4)), Number(curDate.substr(5, 2)), Number(curDate.substr(8, 2)), date.substr(0, 4), date.substr(5, 2), date.substr(8, 2))) {
            let endDate = this.searchParams.value.end_date;
            if(this.checkDate(date.substr(0, 4), date.substr(5, 2), date.substr(8, 2), endDate.substr(0, 4), endDate.substr(5, 2), endDate.substr(8, 2))) {
                this.dataService.mapQuestGeocode().subscribe(
                    (geo) => {
                        console.log(geo);
                        if(geo.results[0].locations[0].adminArea1 == 'US' && geo.results[0].locations[0].adminArea3 != "") {
                            this.dataService.mapQuestGeocodeFrom(this.searchParams.value.from).subscribe(
                                (geo2) => {
                                    console.log(geo2);
                                    if(geo2.results[0].locations[0].adminArea1 == 'US' && geo2.results[0].adminArea3 != ""){
                                        this.dataStorage.setMapQuestLocation(geo);
                                        this.router.navigate(['/summary']);
                                    } else {
                                        this.fromError = true;
                                        this.searchParams.patchValue({
                                            from: ''
                                        })
                                    }
                                }
                            )
                        } else {
                            this.toError = true;
                            this.searchParams.patchValue({
                                to: ''
                            })
                        }
                    }
                  );
            } else {
                this.endError = true;
                this.searchParams.patchValue({
                    end_date: ''
                })
            }
        } else {
            this.startError = true;
            this.searchParams.patchValue({
                start_date: ''
            })
        }
        
    }

    checkDate(yearA: number, monthA: number, dateA: number, yearB: number, monthB: number, dateB: number): boolean {
        if(yearA <= yearB) {
            if(monthA <= monthB) {
                if(dateA <= dateB) {
                    return true;
                }
            }
        }
        return false;
    }
}
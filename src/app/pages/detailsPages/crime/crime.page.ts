import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
import { DataService } from '../../../shared/data.service';

@Component({
    selector: 'crime-page',
    templateUrl: './crime.page.html',
    styleUrls: ['./crime.page.scss']
  })
export class CrimePageComponent implements OnInit{
  ORIs: string[];
  ORIData: { [ori: string] : any } = {}; 
  ORICrimeData: { [ori: string] : any} = {};
  county: string;
  state: string;

  crimeDone = false;

  constructor(private dataService: DataService, private dataStorage: DataStorageService) {
    this.ORIs = new Array();
  }

  ngOnInit() {
    this.county = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea4;
    this.state = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea3;
    if(this.dataStorage.needToRequestCrime()) {
      this.dataService.getORIsByState(this.state).subscribe(
        (data) => {
          console.log(data);
          let countA = 0;
          let countB = 0;
          for(let elem of data.results) {
            console.log(this.county + ' ' + elem.county_name);
            if(this.county.toUpperCase().includes(elem.county_name.toUpperCase()) && elem.county_name != "") {
              console.log(elem);
              this.ORIs.push(elem.ori);
              this.ORIData[elem.ori] = elem;
              countA++;
            }
          }
          for(let elem of this.ORIs) {
            console.log(elem);
            this.dataService.getCrimeDataForORI(elem).subscribe(
              (crimeData) => {
                console.log(crimeData);
                this.ORICrimeData[elem] = crimeData;
                countB++;
                if(countA == countB) {
                  console.log('All APIs Done');
                  this.crimeDone = true;
                  this.dataStorage.crimeData(this);
                }
              }
            );
          }
        }
      )
    } else {
      this.ORIs = this.dataStorage.ORIs;
      this.ORICrimeData = this.dataStorage.ORICrimeData;
      this.ORIData = this.dataStorage.ORIData;
    }
  }
}
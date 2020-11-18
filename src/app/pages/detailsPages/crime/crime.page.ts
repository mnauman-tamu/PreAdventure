import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';

declare var L: any;

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
  markerCount: number = 0;

  crimeDone = false;

  constructor(private dataService: DataService, private dataStorage: DataStorageService, private router: Router) {
    this.ORIs = new Array();
  }

  ngOnInit() {
    L.mapquest.key = 'gYVGtryHTzuGgQYJf5laNbsIKgFp5Avw';
    L.mapquest.open = true;

    var map = null;

    // 'map' refers to a <div> element with the ID map
    if(this.dataService.searched) {
        map = L.mapquest.map('map', {
        center: this.dataStorage.mapQuestLocation.results[0].locations[0].displayLatLng,
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
      });
    }
    console.log(this.dataStorage.mapQuestLocation);
    console.log(this.ORIData);
    console.log(this.ORICrimeData);
    if(this.dataStorage.needToRequestCrime()) {
      if(this.dataService.searched) {
        this.county = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea4;
        this.state = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea3;
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
                  let subData: { [year: number] : { [offense: string] : any}} = {};
                  subData = {
                    2018: {},
                    2019: {},
                  }
                  for(let item of crimeData.results) {
                    subData[item.data_year][item.offense] = {
                      year: item.data_year,
                      actual: item.actual,
                      cleared: item.cleared
                    }
                  }
                  console.log(subData);
                  this.ORICrimeData[elem] = subData;
                  countB++;
                  if(countA == countB) {
                    console.log('All APIs Done');
                    this.crimeDone = true;
                    this.dataStorage.crimeData(this);
                    if(!this.dataService.searched) {
                        map = L.mapquest.map('map', {
                        center: this.dataStorage.mapQuestLocation.results[0].locations[0].displayLatLng,
                        layers: L.mapquest.tileLayer('map'),
                        zoom: 12
                      });
                    }
                    this.addMarkers(map);
                  }
                }
              );
            }
          }
        )
      } else {
        this.router.navigate(['/']);
      }
    } else {
      console.log("USING STORED DATA");
      this.ORIs = this.dataStorage.ORIs;
      this.ORICrimeData = this.dataStorage.ORICrimeData;
      this.ORIData = this.dataStorage.ORIData;
      console.log(this.ORIs);
      console.log(this.ORICrimeData);
      console.log(this.ORIData);
      console.log(this.dataStorage.mapQuestLocation);
      this.county = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea4;
      this.state = this.dataStorage.mapQuestLocation.results[0].locations[0].adminArea3;
      this.crimeDone = true;
      if(!this.dataService.searched) {
          map = L.mapquest.map('map', {
          center: this.dataStorage.mapQuestLocation.results[0].locations[0].displayLatLng,
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });
      }
      this.addMarkers(map);
    }
  }

  addMarkers(map): void {
    console.log(this.ORIs);
    console.log(this.ORIData);
    console.log(this.ORICrimeData);
    // L.marker([this.ORIData[this.ORIs[0]].latitude, this.ORIData[this.ORIs[0]].longitude], {
    //     icon: L.mapquest.icons.marker(),
    //     draggable: false
    //   }).bindPopup('howdy').addTo(map);
    for(let test in this.ORICrimeData[this.ORIs[0]][2018]) {
      console.log(test);
    }
    for(let ori of this.ORIs) {
      console.log(ori);

      if(typeof(this.ORIData[ori].latitude) !== 'undefined' && this.ORIData[ori].latitude !== null ) {
        this.markerCount++;
        let msg = `<p><strong>${this.ORIData[ori].agency_name}</strong>:<br />
                  2018:<br />
                      Violent Crime: ${this.ORICrimeData[ori][2018]['violent-crime']['actual']}<br />
                      Larceny: ${this.ORICrimeData[ori][2018]['larceny']['actual']}<br />
                  2019:<br />
                      Violent Crime: ${this.ORICrimeData[ori][2019]['violent-crime']['actual']}<br />
                      Larceny: ${this.ORICrimeData[ori][2019]['larceny']['actual']}</p>`
        L.marker([this.ORIData[ori].latitude, this.ORIData[ori].longitude], {
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup(msg).addTo(map);
      }
    }
  }
}

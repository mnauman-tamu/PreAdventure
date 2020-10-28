import { Injectable } from "@angular/core";
import { DataService, Search } from './data.service';
import * as DataClass from './data.classes';
import { SummaryPageComponent } from '../pages/summary/summary.page';


@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    ORIs: string[];
    ORIData: { [ori: string] : any } = {}; 
    ORICrimeData: { [ori: string] : any} = {};
    POIs: any[];
    taLocationID: any;
    taAttractions: any = [];
    taHotels: any = [];
    taRestaurants: any = [];
    forecast: any[];
    images: any[];
    music: any[];
    spotify: any[];
    arrivalLocation: any;
    departureLocation: any;
    crimeDone: boolean = false;

    currentSearch: Search = null;

    constructor(private dataService: DataService) {
        this.ORIs = new Array();
    }

    summaryPageAPIs(origin: SummaryPageComponent) {
        this.ORIs = origin.ORIs;
        this.ORIData = origin.ORICrimeData;
        this.ORICrimeData = origin.ORICrimeData;
        this.POIs = origin.POIs;
        this.taLocationID = origin.taLocationID;
        this.taAttractions = origin.taAttractions;
        this.taHotels = origin.taHotels;
        this.taRestaurants = origin.taRestaurants;
        this.forecast = origin.forecast;
        this.images = origin.images;
        this.music = origin.music;
        this.spotify = origin.spotify;
        this.arrivalLocation = origin.arrivalLocation;
        this.departureLocation = origin.departureLocation;
        //Insert data to clients browser cache
    }
}
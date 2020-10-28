import { Injectable, OnInit } from "@angular/core";
import { DataService, Search } from './data.service';
import * as DataClass from './data.classes';
import { SummaryPageComponent } from '../pages/summary/summary.page';


@Injectable({
    providedIn: 'root',
})
export class DataStorageService implements OnInit{
    search_input: Search;
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
        this.search_input = {
            from: 'null',
            to: 'null',
            start_date: 'null',
            end_date: 'null'
        }
    }

    ngOnInit() {
        /*let db;
        let request = window.indexedDB.open('summary_data', 1);
        // onerror handler signifies that the database didn't open successfully
        request.onerror = function() {
            console.log('Database failed to open');
        };
        
        // onsuccess handler signifies that the database opened successfully
        request.onsuccess = function() {
            console.log('Database opened successfully');
        
            // Store the opened database object in the db variable. This is used a lot below
            db = request.result;
        };
        request.onupgradeneeded = function(e) {
            // Grab a reference to the opened database
            let db = e.target.
          
            // Create an objectStore to store our notes in (basically like a single table)
            // including a auto-incrementing key
            let objectStore = db.createObjectStore('summary_data', { keyPath: 'id', autoIncrement:true });
          
            // Define what data items the objectStore will contain
            objectStore.createIndex('search_input', 'search_input', { unique: false });
            objectStore.createIndex('ORIs', 'ORIs', { unique: false });
            objectStore.createIndex('ORIData', 'ORIData', { unique: false });
            objectStore.createIndex('POIs', 'POIs', { unique: false });
            objectStore.createIndex('taLocationID', 'taLocationID', { unique: false });
            objectStore.createIndex('taAttractions', 'taAttractions', { unique: false });
            objectStore.createIndex('taHotels', 'taHotels', { unique: false });
            objectStore.createIndex('taRestaurants', 'taRestaurants', { unique: false });
            objectStore.createIndex('forecast', 'forecast', { unique: false });
            objectStore.createIndex('images', 'images', { unique: false });
            objectStore.createIndex('music', 'music', { unique: false });
            objectStore.createIndex('spotify', 'spotify', { unique: false });
            objectStore.createIndex('arrivalLocation', 'arrivalLocation', { unique: false });
            objectStore.createIndex('departureLocation', 'departureLocation', { unique: false });
          
            console.log('Database setup complete');
          };*/
    }

    needToRequest(): boolean {
        console.log(this.search_input);
        console.log(this.dataService.search_input);
        return this.search_input != this.dataService.search_input;
    }

    summaryPageAPIs(origin: SummaryPageComponent) {
        this.search_input = this.dataService.getInputSearch();
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
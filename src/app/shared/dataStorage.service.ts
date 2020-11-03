import { Injectable, OnInit } from "@angular/core";
import { DataService, Search } from './data.service';
import * as DataClass from './data.classes';
import { SummaryPageComponent } from '../pages/summary/summary.page';
import { threadId } from 'worker_threads';


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
    forecastRange: any[] = [];
    dates: any[];
    forecast: any[];
    images: any[];
    music: any[];
    spotify: any[];
    arrivalLocation: any;
    departureLocation: any;
    mapQuestLocation: any;
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
            
        let data = JSON.parse(localStorage.getItem('Pre-Adventure-Data'));
        if(data && (data.search_input == this.dataService.search_input || !this.dataService.searched)) {
            console.log('Using local storage!');
            this.search_input = data.search_input;
            this.ORIs = data.ORIs;
            this.ORIData = data.ORICrimeData;
            this.ORICrimeData = data.ORICrimeData;
            this.POIs = data.POIs;
            this.taLocationID = data.taLocationID;
            this.taAttractions = data.taAttractions;
            this.taHotels = data.taHotels;
            this.taRestaurants = data.taRestaurants;
            this.forecastRange = data.forecastRange;
            this.dates = data.dates;
            this.forecast = data.forecast;
            this.images = data.images;
            this.music = data.music;
            this.spotify = data.spotify;
            this.arrivalLocation = data.arrivalLocation;
            this.departureLocation = data.departureLocation;
            this.mapQuestLocation = data.mapQuestLocation;
            console.log(data);
            return false;
        }
        return true;
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
        this.forecastRange = origin.forecastRange;
        this.dates = origin.dates;
        this.forecast = origin.forecast;
        this.images = origin.images;
        this.music = origin.music;
        this.spotify = origin.spotify;
        this.arrivalLocation = origin.arrivalLocation;
        this.departureLocation = origin.departureLocation;
        this.mapQuestLocation = origin.mapQuestLocation;
        //Insert data to clients browser cache
        localStorage.removeItem('Pre-Adventure-Data');
        localStorage.setItem('Pre-Adventure-Data', JSON.stringify({
            'search_input':this.search_input,
            'ORIs':this.ORIs,
            'ORIData':this.ORIData,
            'ORICrimeData':this.ORICrimeData,
            'POIs':this.POIs,
            'taLocationID':this.taLocationID,
            'taAttractions':this.taAttractions,
            'taHotels':this.taHotels,
            'taRestaurants':this.taRestaurants,
            'forecastRange':this.forecastRange,
            'dates':this.dates,
            'forecast':this.forecast,
            'images':this.images,
            'music':this.music,
            'spotify':this.spotify,
            'arrivalLocation':this.arrivalLocation,
            'departureLocation':this.departureLocation,
            'mapQuestLocation':this.mapQuestLocation
        }));
    }
}
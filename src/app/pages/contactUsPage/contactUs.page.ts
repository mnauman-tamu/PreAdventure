import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';

@Component({
  selector: 'contact-us-page',
  templateUrl: './contactUs.page.html',
  styleUrls: ['./contactUs.page.scss']
})
export class contactUsPageComponent implements OnInit{

  constructor(private dataService: DataService) {}

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-listing',
  templateUrl: './popular-listing.page.html',
  styleUrls: ['./popular-listing.page.scss'],
})
export class PopularListingPage implements OnInit {

  constructor() { }
  popularCountryList:any = [{'iso':'CA','name':'Canada'}, {'iso':'CZ','name':'Czech Republic'},{'iso':'FR','name':'France'},{'iso':'GB','name':'United Kingdom'},{'iso':'IN','name':'India'},{'iso':'IS','name':'Iceland'},
  {'iso':'JP','name':'Japan'},{'iso':'LT','name':'Lithuania'},{'iso':'MY','name':'Malaysia'},{'iso':'SA','name':'Saudi Arabia'},{'iso':'TR','name':'Turkey'},{'iso':'US','name':'United States'}];
  
  ngOnInit() {
  }

  gotoBack()
  {
    console.log("hii");
  }
}

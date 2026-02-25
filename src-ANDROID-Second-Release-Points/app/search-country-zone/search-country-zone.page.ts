import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, ModalController } from "@ionic/angular";
import { CountryListPage } from '../country-list/country-list.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-country-zone',
  templateUrl: './search-country-zone.page.html',
  styleUrls: ['./search-country-zone.page.scss'],
})
export class SearchCountryZonePage implements OnInit {

  bundles: any = [];
  zoneList: any = [];
  isFetchingData: any = true;
  searchTerm: string = '';
  filteredItems: string[] = [];
  temp: any = [];
  tempAllCountry: any = [];
  isLoading: any = true;
  tempArray: any = [];
  constructor(private http: HttpClient, private modalController: ModalController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) { }

  selectedSegment: string = 'country';

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    if (window.localStorage.getItem('allcountries') != null) {
      this.bundles = window.localStorage.getItem('allcountries');
      this.bundles = JSON.parse(this.bundles);
      this.tempAllCountry = this.bundles;
      this.getZone(this.bundles);
    }

  }

  //gotoCountryList
  async gotoCountryList(itemName: any, indexVal:any) {

    const modal = await this.modalController.create({
      component: CountryListPage, // The modal component you created
      componentProps: {
        // Any data you want to pass to the modal
        value: indexVal
      },
    });

    await modal.present();

  }

  gotoBack() {
    this.navController.pop();
  }


  getZone(data: any) {
    this.zoneList = [];
    for (let i = 0; i < data.length; i++) {
      this.checkAndModifyArray(this.zoneList, data[i]['countries'][0]['region'])
    }
  }



  checkAndModifyArray<T>(arr: T[], element: T): T[] {
    const index = arr.indexOf(element);

    if (index !== -1) {
      // Element exists, so remove duplicate entry
      arr = arr.filter((item) => item !== element);
    } else {
      // Element doesn't exist, so push it to the array
      arr.push(element);
    }

    return arr;
  }


  onSearch(event: any) {
    const searchTerm: string = event.target.value;
    this.bundles = this.tempAllCountry;
    if (searchTerm) {
      this.bundles = this.findMatchingItems(searchTerm);
    } else {
      this.bundles = this.tempAllCountry;
    }
  }

  findMatchingItems(searchTerm: string): any[] {
    const normalizedSearch = searchTerm.toLowerCase();
    const matchingItems = this.bundles.filter((item: any) =>
      item.countries[0].name.toLowerCase().includes(normalizedSearch)
    );

    const uniqueItemsMap = new Map<number, any>();
    matchingItems.forEach((item: any) => {
      uniqueItemsMap.set(item.countries[0].name, item);
    });
    return Array.from(uniqueItemsMap.values());
  }

  onClear() {
    this.bundles = this.tempAllCountry;
  }

  gotoPlan(types: any, code: any, temp: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        codeType: types,
        searchCode: code,
        displayText: temp

      }
    };
    this.Router.navigate(['/country-plan'], navigationExtras);
  }

  gotoBundlePlan(indexVal:any, zoneItem:any) {
    let navigationExtras: NavigationExtras = {
      state: {
        codeType: indexVal,
        displayText: zoneItem
      }
    };
    this.Router.navigate(['/zone-bundle'], navigationExtras);
  }


  

}
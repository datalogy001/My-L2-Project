import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-country-code-model',
  templateUrl: './country-code-model.page.html',
  styleUrls: ['./country-code-model.page.scss'],
})
export class CountryCodeModelPage implements OnInit {
  @Input("value") value: any;
  searchTerm: string = '';
  constructor(private translate: TranslateService, private toastController: ToastController, private modalController: ModalController) { }


  tempCountry:any=[];
  countryList:any=[]; 

  langDefault: any;

  ngOnInit() {
    this.tempCountry = this.value;
    this.countryList = this.value;
  }

  onClearSearch() {
    this.searchTerm = '';
    this.countryList = this.tempCountry;
  }

findMatchingItems(searchTerm: string): any[] {
  const normalizedSearch = searchTerm.toLowerCase().replace('+', ''); // remove +
  
  const matchingItems = this.countryList.filter((item: any) => {
    //const normalizedCode = item.phone_code.toLowerCase().replace('+', '');
    const normalizedName = item.country_name.toLowerCase();
    return normalizedName.startsWith(normalizedSearch)
           
  });

  // Ensure unique results (avoid duplicates)
  const uniqueItemsMap = new Map<string, any>();
  matchingItems.forEach((item: any) => {
    uniqueItemsMap.set(item.phone_code, item);
  });

  return Array.from(uniqueItemsMap.values());
}



  //Search functionality
  onSearch(event: any) {
    const searchTerm: string = event.target.value;
    this.countryList = this.tempCountry;
    if (searchTerm) {
      this.countryList = this.findMatchingItems(searchTerm);
    } else {
      this.countryList = this.tempCountry;
    }
  }

  closePopover(resData: any) {
    this.modalController.dismiss({ data: resData });
  }

  closePopoverNew() {
    this.modalController.dismiss({ data: '' });
  }



}

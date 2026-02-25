import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ModalController, NavController, ToastController, Platform } from '@ionic/angular';
import { NointernetPage } from '../nointernet/nointernet.page';
import { UpdateAppPage } from '../update-app/update-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { Router, NavigationExtras } from '@angular/router';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.page.html',
  styleUrls: ['./home-search.page.scss'],
})
export class HomeSearchPage implements OnInit {
  tempISO: any = '';
  allCountriesList: any = [];
  searchTerm: string = '';
  selectedDays: any = '7plusdays';
  tempAllCountry: any = [];
  searchData: any = [];
  tempCountryBundle: any = [];
  isSearch: any = false;
  mainObj: any = [];
  types: any = '';
  currencyCode: any = 'USD';
  iso: any = '';
  isearchIMg: any;
  ignoreScroll: boolean = false; // New flag to ignore scroll events
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  @ViewChild('searchDiv', { static: true }) searchDiv!: ElementRef;
  notificationList: any = [];
  notiCount: any = 0;
  daysFilter: any = [];

  constructor(
    private translate: TranslateService,  private service: ServicesService,
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private navController: NavController,
    private modalCtrl: ModalController,
    private eRef: ElementRef
  
  ) { }

  destinations:any =[]; 

  async getNotificationList() {
    this.service.getNotificationList(this.tokenValue).then((res: any) => {
      if (res.code == 200) {
        if (res.data.readnotification.length > 0) {
          this.notificationList = res.data.readnotification;
          this.notiCount = res.data.unreadcount;
        }
        else
          this.notificationList = [];
      } else {
        this.notificationList = [];
      }
    }).catch(err => {
      this.notificationList = [];
    })

  }

  gotoNoti() {
    let navigationExtras: NavigationExtras = {
      state: {
        notiData: this.notificationList,
      }
    };
    this.router.navigate(['/notifications'], navigationExtras);
  }


  zoneList:any=[]; 

  ngOnInit() {

 this.langDefault = window.localStorage.getItem('L2TraveleSIM_language');
    this.allCountriesList = window.localStorage.getItem('L2TraveleSIM_countryBundles');
this.destinations = window.localStorage.getItem('L2TraveleSIM_destinations');
    this.destinations = JSON.parse(this.destinations);
    this.tempAllCountry = JSON.parse(this.allCountriesList);
    this.mainObj = JSON.parse(this.allCountriesList);
  //List of zones
  this.zoneList = window.localStorage.getItem('L2TraveleSIM_ZoneBundles');
  this.zoneList = JSON.parse(this.zoneList);

    setTimeout(() => {

      this.translate.use(this.langDefault).subscribe(() => {
        this.zoneList = this.zoneList.map((zones: any) => ({
          name: this.translate.instant(`ZONES.${zones.iso}`),
          region: zones.region,
          iso: zones.iso,
          perDay: zones.perDay,
          countries: zones.countries
        }));
      });

      this.translate.use(this.langDefault).subscribe(() => {
        this.mainObj = this.tempAllCountry.map((country: any) => ({
          name: this.translate.instant(`COUNTRIES.${country.iso}`),
          region: country.region,
          iso: country.iso,
        }));

      });
      this.keyboard.hideFormAccessoryBar(false);
    }, 1500);

    this.keyboard.onKeyboardWillShow().subscribe(() => {
      setTimeout(() => {
        this.content?.scrollToPoint(0, 300, 300); // Scroll to a specific point
      }, 300);
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      setTimeout(() => {
        this.content?.scrollToBottom(300); // Adjust as needed when keyboard hides
      }, 300);
    });
  }

  langDefault: any;
  tokenValue:any=0; 
  walletBalance:any=0.00;

  gotoTOpup(){
   
    if(this.tokenValue != null && this.tokenValue != '' )
    {
      this.router.navigate(['/credit-topup']);
    }else{

       let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.tempArr,
        withOutLogin: false
      }
    };
      this.router.navigate(['/login'], navigationExtras);
    }
  }

  tempArr:any=[]; 

  ionViewDidEnter() {
     //Current currency 
     if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
    }
    console.log(window.localStorage.getItem("L2TraveleSIM_currency"));
    
    if (window.localStorage.getItem('L2TraveleSIM_auth_token') == null) {
      this.tokenValue = 0;
      this.walletBalance=0.00;
    }
    else {
      this.tokenValue = window.localStorage.getItem('L2TraveleSIM_auth_token');
      this.walletBalance=window.localStorage.getItem('L2TraveleSIM_user_wallets');
      console.log(this.walletBalance);
      this.getNotificationList();
    }
    this.searchTerm = '';
    this.searchDiv.nativeElement.classList.remove('searching');
    this.isearchIMg = '';
    this.iso = '';
    this.types = '';
    this.langDefault = window.localStorage.getItem('L2TraveleSIM_language');
    
  }

  getWalletClass(): string {
    const balance = parseFloat(this.walletBalance) || 0.00; // Ensure walletBalance is treated as a number
  
    if (balance < 1) {
      return 'tertiary';
    } else if (balance >= 1 && balance < 10) {
      return 'secondary';
    } else {
      return 'primary';
    }
  }

  onFocus() {
    setTimeout(() => {
      this.content?.scrollToPoint(0, 300, 300); // Scroll to a specific point
    }, 300);
  }

   // Show list on focus
  onFocusSearch() {
    this.onFocus();
    this.isSearch = true;
       setTimeout(() => {
      this.translate.use(this.langDefault).subscribe(() => {
        console.log(JSON.stringify(this.mainObj));
        this.searchData = this.mainObj.map((country: any) => ({
          name: this.translate.instant(`COUNTRIES.${country.iso}`),
          region: country.region,
          iso: country.iso,
          is_destination: false,
          country_name: this.translate.instant(`COUNTRIES.${country.iso}`)
        }));

      });
    }, 200);

  }


  onSearch(event: any) {
    this.onFocus();
    const searchTerm: string = event.target.value;
    this.searchData = this.tempAllCountry;

    if (searchTerm) {
      this.searchData = this.findMatchingItems(searchTerm, this.langDefault);
     this.isSearch = true;
     this.searchMatched = this.searchData.length > 0;  // ✅ Track match
     this.itemClicked = false;   
    } else {
      this.isearchIMg = '';
      this.searchDiv.nativeElement.classList.remove('searching');
       this.isSearch = false;
    }
  }

  onClearSearch() {
    this.isSearch = false;
    this.searchTerm = '';
    this.iso = '';
    this.isearchIMg = '';
    this.searchDiv.nativeElement.classList.remove('searching');
    this.types = '';
    this.searchData = this.tempAllCountry;
  }


   // Detect click outside this component or on any ion-input
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    // Close if click is outside this component
    const clickedOutside = !this.eRef.nativeElement.contains(target);

    // Close if clicked on another ion-input
    const clickedOtherInput = target.tagName.toLowerCase() === 'ion-input' ||
                              target.closest('ion-input') !== null;

    if (clickedOutside || clickedOtherInput) {
      this.isSearch = false;
    }
  }


  
  findMatchingItems(searchTerm: string, language: string): any[] {
  const normalize = (str: string) =>
    str?.toLowerCase().trim().replace(/\s+/g, ''); // remove all extra spaces

  const normalizedSearch = normalize(searchTerm);
  const languageField = `city_${language}_name`;
  const matchedKeys = new Set<string>();

  // 1️⃣ Search in `mainObj`
  const matchingMainObjItems = this.mainObj
    .filter((item: any) => {
      const name = normalize(item.name);
      return name && name.startsWith(normalizedSearch);
    })
    .map((item: any) => {
      const key = normalize(item.name);
      matchedKeys.add(key);
      return {
        ...item,
        is_destination: false,
        country_name: item.name
      };
    });

  // 2️⃣ Search in `destinations`
  const matchingDestinationItems = Array.isArray(this.destinations)
    ? this.destinations
        .map((item: any) => {
          const cityName = item[languageField];
          return {
            ...item,
            cityName,
            is_destination: true,
            country_name: this.translate.instant(`COUNTRIES.${item.iso}`)
          };
        })
        .filter((item: any) => {
          const cityKey = normalize(item.cityName);
          return cityKey && cityKey.startsWith(normalizedSearch) && !matchedKeys.has(cityKey);
        })
        .map((item: any) => {
          matchedKeys.add(normalize(item.cityName));
          return item;
        })
    : [];

  // 3️⃣ Search in `zoneList`
  const matchingZoneListItems = this.zoneList
    .filter((item: any) => {
      const name = normalize(item.name);
      return name && name.startsWith(normalizedSearch);
    })
    .map((item: any) => {
      const key = normalize(item.name);
      matchedKeys.add(key);
      return {
        ...item,
        is_destination: false,
        country_name: item.name
      };
    });

  const combinedResults = [
    ...matchingMainObjItems,
    ...matchingDestinationItems,
    ...matchingZoneListItems
  ];

  // 🧹 Remove duplicates
  const uniqueItemsMap = new Map<string, any>();
  combinedResults.forEach((item: any) => {
    const key = normalize(item.name || item.cityName);
    if (key && !uniqueItemsMap.has(key)) {
      uniqueItemsMap.set(key, item);
    }
  });

  return Array.from(uniqueItemsMap.values());
}

  searchMatched: boolean = false;
  itemClicked: boolean = false;
  typeOfCountries:any;
  zoneCountries:any=[]; 
  isDestinations:any=false;
  country_name:any='';
  zoneFilter(iso: string): string[] {
    const match = this.zoneList.find((zone: any) => zone.iso.toLowerCase() === iso.toLowerCase());
    return match ? match.countries : [];
  }
  
  getLocationLabel(iSO: string): string {
    const regionZones = [
      'africa',
      'global',
      'middle east',
      'oceania',
      'asia',
      'europe+',
      'europe',
      'north america'
    ];
  
    return regionZones.includes(iSO.toLowerCase()) ? 'region' : 'country';
  }

  gotoSelect(name: any, iso: any, type: any, isDestinations:any, country_name:any) {
  //  console.log(name);
  this.isDestinations =isDestinations;
  this.itemClicked = true;  // ✅ Track selection
  this.country_name = country_name;
  this.typeOfCountries= this.getLocationLabel(iso);
      if (this.typeOfCountries == 'region')
        {
         this.zoneCountries =this.zoneFilter(iso);
         this.isDestinations = false;
        }
        else
        {
         this.isDestinations = isDestinations;
         this.zoneCountries =[];
        }


    this.isSearch = false;
    this.searchTerm = name;
    this.searchDiv.nativeElement.classList.add('searching');
    this.iso = iso;
    this.isearchIMg = iso;
    this.types = type;
  }

  afterSearchData: any[] = [];

afterSearch(event: any): boolean {
  this.afterSearchData = this.findMatchingItems(event,this.langDefault);
  return this.afterSearchData.length > 0;
}

  gotoFindDeails() {
  if (this.afterSearch(this.searchTerm)) {
    // ✅ Check if user clicked an item from search results
    if (this.searchMatched && !this.itemClicked) {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('CHOOSE_DESTINATION_ERROR'));
      return;
    }

    if (this.searchTerm == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('CHOOSE_DESTINATION_ERROR'));
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          name: this.searchTerm,
          isDestinations: this.isDestinations,
          country_name: this.country_name,
          iso: this.iso,
          type: this.typeOfCountries,
          iccid: '',
          opt: this.selectedDays,
          zoneCountries: this.zoneCountries,
        }
      };
      this.router.navigate(['bundle-deals'], navigationExtras);

      setTimeout(() => {
        this.searchTerm = '';
        this.searchDiv.nativeElement.classList.remove('searching');
        this.isearchIMg = '';
        this.iso = '';
        this.types = '';
        this.selectedDays = '7plusdays';
        this.searchMatched = false; // Reset state
        this.itemClicked = false;
      }, 200);
    }
  } else {
    this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('NO_DESTINATION_FOUND'));
  }
}

  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalCtrl.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  


  gototab5() {
if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gototab1() {
    this.navController.navigateRoot('tab1');
  }

  gotoMarketPlace()
  {
    this.navController.navigateRoot('marketplace');
  }
  
  async gotoNointernet() {
    const modal = await this.modalCtrl.create({
      component: NointernetPage
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  async gotoUpdateapp() {
    const modal = await this.modalCtrl.create({
      component: UpdateAppPage
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  onSelectClick() {
    setTimeout(() => {
      this.content?.scrollToBottom(300); // Adjust as needed when keyboard hides
    }, 300);
  }
}

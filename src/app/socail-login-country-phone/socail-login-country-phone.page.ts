import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { PasswordErrorModelPage } from '../password-error-model/password-error-model.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CountryCodeModelPage } from '../country-code-model/country-code-model.page';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

@Component({
  selector: 'app-socail-login-country-phone',
  templateUrl: './socail-login-country-phone.page.html',
  styleUrls: ['./socail-login-country-phone.page.scss'],
})
export class SocailLoginCountryPhonePage implements OnInit {
  @ViewChild('searchDiv', { static: true }) searchDiv!: ElementRef;

  paramObj: any = { 'mobile_number': '', 'country_name': '', 'user_id': '', 'is_complete_signup': 1, "city" :'' }
  token: any;
  temp_mobile_number: any = '';
  isearchIMg: any;
  searchTerm: string = '';
  searchData: any = [];
  searchIMg: any;
  isSearch: any = false;
  countryCodeObj: any = {
    flag: '',
    code: ''
  };
      // Declare as a class property
    private phoneUtil = PhoneNumberUtil.getInstance();
    
  iso: any;
  isCountrySelected: any = false;
 

  phoneError: string = '';
countryError: string = '';

  // Inject services and controllers
  constructor(
    private eRef: ElementRef, 
    private translate: TranslateService,
    private loadingScreen: LoadingScreenAppPage,
    private platform: Platform,
    private loadCtr: LoadingController,
    private service: ServicesService,
    public popoverController: PopoverController,
    private Router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private modalController: ModalController,
  ) { }

  
countryListWithCodes: any[] = [];
tempCountry: any[] = [];

// Fetch list of countries
loadCountries(): void {
  this.service.listOfCountriesForResidence()
    .then((response: any) => {
      if (response?.status === 200 && Array.isArray(response.data)) {
        const countries = response.data;
        this.countryListWithCodes = countries;
        this.tempCountry = countries;
        console.log(JSON.stringify(this.tempCountry));
      } else {
        this.countryListWithCodes = [];
        this.tempCountry = [];
        console.warn('Unexpected response structure:', response);
      }
    })
    .catch((error) => {
      console.error('Error fetching list of countries:', error);
      this.countryListWithCodes = [];
      this.tempCountry = [];
    });
}


showPhoneError(msg: string) {
  this.phoneError = msg;
  setTimeout(() => {
    this.phoneError = '';
  }, 3000);
}

showCountryError(msg: string) {
  this.countryError = msg;
  setTimeout(() => {
    this.countryError = '';
  }, 3000);
}

  onClearSearch() {
    this.isSearch = false;
    this.searchTerm = '';
    this.iso = '';
    this.isearchIMg = '';
    this.searchData = this.tempCountry;
    this.isCountrySelected = false;
    this.paramObj.country_name='';
    this.temp_mobile_number ='';
    this.searchDiv.nativeElement.classList.remove('searching');
    this.countryCodeObj = {};
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

  
 // Show list on focus
  onFocusSearch() {
    this.isSearch = true;
    this.searchData = this.tempCountry;
  }
 findMatchingItems(searchTerm: string): any[] {
  // normalize input (lowercase + remove spaces)
  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, "");

  const matchingItems = this.countryListWithCodes.filter((item: any) => {
    const normalizedName = item.country_name.toLowerCase().replace(/\s+/g, "");
    return normalizedName.startsWith(normalizedSearch);
  });

  // Ensure uniqueness by country name
  const uniqueItemsMap = new Map<string, any>();
  matchingItems.forEach((item: any) => {
    uniqueItemsMap.set(item.country_name, item);
  });

  return Array.from(uniqueItemsMap.values());
}

  gotoSelect(countryRES: any) {
    this.isSearch = false;
    this.isearchIMg = countryRES.short_name;
    this.searchTerm = countryRES.country_name;
    this.searchDiv.nativeElement.classList.add('searching');
    this.isCountrySelected = true;
    this.paramObj.country_name = countryRES.country_name;
    this.countryCodeObj.code = countryRES.phone_code;
    this.countryCodeObj.flag = countryRES.short_name;
    console.log(JSON.stringify(countryRES));
  }

  async chooseCountry() {
    const modal = await this.modalController.create({
      component: CountryCodeModelPage,
       componentProps: { value: this.tempCountry}
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data.data != '') {
        this.countryCodeObj.code = result.data.data.phone_code;
        this.countryCodeObj.flag = result.data.data.short_name;
      }

    });

    return await modal.present();
  }

  onSearchMobile(event: any) {
    const inputValue: string = event.target.value || '';
    this.temp_mobile_number = inputValue.replace(/\D/g, ''); // digits only
  }

  onSearch(event: any) {
    const searchTerm: string = event.target.value;
    this.searchData = this.tempCountry;
    if (searchTerm) {
      this.searchData = this.findMatchingItems(searchTerm);
      this.isSearch = true;
    } else {
      this.isearchIMg = '';
      this.isSearch = false;
      this.isCountrySelected = false;
      this.searchDiv.nativeElement.classList.remove('searching');
    }
  }

  langDefault: any;
  tempDetails:any=[]; 
  ngOnInit() {
    this.loadCountries();
    this.tempDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.paramObj.city = window.localStorage.getItem('L2TraveleSIM_city') || '' ;
    this.tempDetails = JSON.parse(this.tempDetails);
    this.paramObj.user_id = this.tempDetails.id;
    this.token = window.localStorage.getItem("L2TraveleSIM_auth_token");
  }

 async submit(): Promise<void> {
  if (!this.validate()) {
    return;
  }

  try {
    this.paramObj.mobile_number = this.countryCodeObj.code + this.temp_mobile_number;
    console.log('Submitting signup params:', this.paramObj);

    await this.loadingScreen.presentLoading();

    const res: any = await this.service.completeSignup(this.paramObj, this.token);
    this.loadingScreen.dismissLoading();
    if (res.code === 200) {
          console.log(JSON.stringify(res.data[0]['data']));
          window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(res.data[0]['data']));
         this.modalController.dismiss({ success: true });
    } else {
      this.errorMSGModal(res.message, this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
    }

  } catch (err: any) {
    this.loadingScreen.dismissLoading();
    const message = err?.message || JSON.stringify(err);
    this.errorMSGModal(message, this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
  }
}


    // Display success message modal
  async successMSGModal(header: string, message: string, time: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: {
        'value': header,
        'value1': message,
        'value2': time
      }
    });
    await modal.present();
  }

validate() {
  const mobileValid = /^[0-9\s\-()]{8,20}$/;
  let valid = true;

  const phoneUtil = PhoneNumberUtil.getInstance();

  // ---- COUNTRY VALIDATION ----
  if (!this.paramObj.country_name || this.paramObj.country_name.trim() === '') {
    this.showCountryError(this.translate.instant('VALIDATION_MSG_SELECT_COUNTRY'));
    valid = false;
  }

  // ---- MOBILE NUMBER (Empty check) ----
  else if (!this.temp_mobile_number || this.temp_mobile_number.trim() === '') {
    this.showPhoneError(this.translate.instant('VALIDATION_MSG_ENTER_MOBILE_NUMBER'));
    valid = false;
  }

  // ---- MOBILE NUMBER (libphonenumber validation) ----
  else {
    try {
      const rawInput = this.temp_mobile_number.trim();

      // Ensure number has '+' and country code
      let cleaned = rawInput.startsWith('+')
        ? rawInput
        : `+${this.countryCodeObj.code.replace('+', '')}${rawInput.replace(/[^\d]/g, '')}`;

      const parsedNumber = phoneUtil.parseAndKeepRawInput(cleaned);

      if (phoneUtil.isValidNumber(parsedNumber)) {
        this.paramObj.mobile_number = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
      } else {
        this.showPhoneError(
          this.translate.instant('VALIDATION_MSG_ENTER_VALID_MOBILE_NUMBER')
        );
        valid = false;
      }
    } catch (err) {
      console.error('Mobile validation error:', err);
      this.showPhoneError(
        this.translate.instant('VALIDATION_MSG_ENTER_VALID_MOBILE_NUMBER')
      );
      valid = false;
    }
  }

  return valid;
}



  // Display error message modal
  async errorMSGModal(header: string, message: string) {
    console.log(header);
    console.log(message);
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }
}

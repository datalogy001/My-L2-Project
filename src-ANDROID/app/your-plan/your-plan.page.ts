import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, Input } from '@angular/core'
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { TopupNotAppliedModalPage } from '../topup-not-applied-modal/topup-not-applied-modal.page';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
@Component({
  selector: 'app-your-plan',
  templateUrl: './your-plan.page.html',
  styleUrls: ['./your-plan.page.scss'],
})
export class YourPlanPage implements OnInit {

  mergedAssignments: any = [];
  bundleDatas: any = [];
  statusOrder: any;
  constructor(private modalController: ModalController,private translate: TranslateService,private iab: InAppBrowser,private loadingScreen: LoadingScreenAppPage, private renderer: Renderer2, private el: ElementRef, private service: ServicesService, private navController: NavController, private Router: Router) { }
  tempBundles: any = [];
  networkImages: any = [];
  isBundleExpired: any = false;
  fromBundlesAPI: any = { 'initAmount': '', 'remainAmount': '' }
  bundlesExpiredDetails: any = { 'remainingQuantity': '' };
  usedPercentage: any;
  initDataAmount: any = '0 GB';
  remainDataamount: any = '0 GB';
  startTimefromBundle: any;
  endTimefromBundle: any;
  unitFactors: any = {};
  tempRemain: any;
  tempInit: any;
  countryBanner: any;
  startDate: any = '';
  daysDifferenceStartEnd: any = '';
  daysDifferenceCurrentEnd: any = '';
  endDate: any = '';
  isButton: any;
  topupArray: any = [];
  tmpcurrDate: any = '';
  tmpendDate: any = '';
  currDate: any = '';
  transformCaps(items: any) {
    return 'GB';
  }
  private max: number = -219.99078369140625;
  bundleName:any;
  convertintoCountryLang(countryName:any)
  {
  // Convert countryName to uppercase
  const upperCaseCountryName = countryName.toUpperCase();
  // Use the uppercase countryName in the translation key
  return this.translate.instant(`COUNTRIES.${upperCaseCountryName}`);
  }

  convertintoZoneLang(zones:any)
  {
    return this.translate.instant(`ZONES.${zones}`) 
  }
  //Common values 
  commonInitValues()
  {
    this.tempBundles = this.Router.getCurrentNavigation()?.extras.state;
    this.bundleDatas = this.tempBundles.bundleData;
    if(this.bundleDatas.type =='country')
      this.bundleName =  this.convertintoCountryLang(this.bundleDatas.short_name_country) ;
    else
    this.bundleName =  this.convertintoZoneLang(this.bundleDatas.short_name_country) ;
    if (this.bundleDatas.short_name_country == 'North America' || this.bundleDatas.short_name_country == 'north america') {
      this.countryBanner = 'North_America.jpg';
    } else if (this.bundleDatas.short_name_country == 'Middle East' || this.bundleDatas.short_name_country == 'middle east') {
      this.countryBanner = 'Middle_East.jpg';
    } else if (this.bundleDatas.short_name_country == 'CY' || this.bundleDatas.short_name_country == 'cy') {
      this.countryBanner = 'CY.jpg';
    } else if (this.bundleDatas.short_name_country == 'ZM' || this.bundleDatas.short_name_country == 'zm') {
      this.countryBanner = 'ZM.jpg';
    } else if (this.bundleDatas.short_name_country == 'ASIA' || this.bundleDatas.short_name_country == 'asia') {
      this.countryBanner = 'Asia.jpg';
    }
    else if (this.bundleDatas.short_name_country == 'AFRICA' || this.bundleDatas.short_name_country == 'africa') {
      this.countryBanner = 'Africa.jpg';
    }
    else if (this.bundleDatas.short_name_country == 'global' || this.bundleDatas.short_name_country == 'Global') {
      this.countryBanner = 'Global.jpg';
    } else if (this.bundleDatas.short_name_country == 'Europe+' || this.bundleDatas.short_name_country == 'europe+') {
      this.countryBanner = 'Europe.jpg';
    } else if (this.bundleDatas.short_name_country == 'Europe' || this.bundleDatas.short_name_country == 'europe') {
      this.countryBanner = 'Europe.jpg';
    } else if (this.bundleDatas.short_name_country == 'Oceania' || this.bundleDatas.short_name_country == 'oceania') {
      this.countryBanner = 'Oceania.jpg';
    }
    else {
      this.countryBanner = this.bundleDatas.short_name_country.toUpperCase() + '.jpg';

    }
  }



  ngOnInit() {
    this.commonInitValues();
    if(this.bundleDatas.profile_status == 'Expired')
    {
    if (this.bundleDatas.isUnlimited == false) {
      const totalGB = 0;
      const remainingGB = 0;
      this.updateProgressValueData(totalGB, remainingGB)
    } else { // Mega daily paas 
      const totalDays = 0;
      const remainingDays = 0;
      this.updateProgressMegaDaily(totalDays, remainingDays)
    }
  }else
  {
    if (this.bundleDatas.isUnlimited == false) {
      const totalGB = this.bundleDatas.dataamount;
      const remainingGB = this.bundleDatas.dataamount;
      this.updateProgressValueData(totalGB, remainingGB)
    } else { // Mega daily paas 
      const totalDays = this.extractDaysFromString(this.bundleDatas.days);
      const remainingDays = this.extractDaysFromString(this.bundleDatas.days);
      this.updateProgressMegaDaily(totalDays, remainingDays)
    }
  }

    //Call API for data balance 
    this.getCurrentPackage(this.bundleDatas.iccid);
  }

  
  getCurrentPackage(iccid: any) {
    this.service.getBundleUsedData(iccid).then((res: any) => {
      if(res.code == 200 )
      {
        console.log("I m here" + JSON.stringify(res.data[0]));
        if (res.data[0]['bundles'].length > 0) {
          console.log("Bundle length=>" + res.data[0].bundles.length);
          this.mergedAssignments = res.data[0].bundles.reduce((acc: any, obj: any) => acc.concat(obj.assignments), []);
          this.checkWithTopups(this.mergedAssignments);
        } else {
          this.topupArray = this.bundleDatas.topups;
        }
    }
    }).catch(err => {
    })
  }

  checkWithTopups(assignmenrtArr: any) {
    this.topupArray = this.bundleDatas.topups;

    for (let i = 0; i < this.topupArray.length; i++) {
      let foundMatch = false; // Flag to check if a match is found

      for (let j = 0; j < assignmenrtArr.length; j++) {
        if (this.topupArray[i]['assignmentReference'] + '-0' == assignmenrtArr[j]['assignmentReference']) {
          foundMatch = true;
          // No use data amount and start and end time
          if (assignmenrtArr[j]['bundleState'] == 'queued') {
            this.topupArray[i]['status'] = 'Queued';

          } else if (assignmenrtArr[j]['bundleState'] == 'active' || assignmenrtArr[j]['bundleState'] == 'Active') {
            this.topupArray[i]['status'] = 'Active';
          } else {
            this.topupArray[i]['status'] = 'Expired';
          }
        }
      }

      // If no match is found, update the status to 'Expired'
   if (!foundMatch) {
     this.topupArray[i]['status'] = 'Expired';
     }
    }
      // Remove the first element
    this.topupArray.shift();
    this.topupArray.sort((a: any, b: any) => {
      this.statusOrder = { 'Active': 1, 'Queued': 2, 'Expired': 3 };
      return this.statusOrder[a.status] - this.statusOrder[b.status];
    });

    this.expiredBundles = this.topupArray;
    
  


  }

 gotoToup() {
        //Checking for Platinum and Diamond bundles 
        if (this.bundleDatas.is_bundle_topup_available == 1) {
            let navigationExtras: NavigationExtras = {
                state: {
                    name: this.bundleDatas.country.trim(),
                    iso: (this.bundleDatas.type == 'region') ? this.bundleDatas.short_name_country : this.bundleDatas.short_name_country.toUpperCase(),
                    type: this.bundleDatas.type,
                    iccid: this.bundleDatas.iccid,
                    opt: ''
                }
            };
            this.Router.navigate(['/bundle-data-topup'], navigationExtras);
        } else {
            //Call alert to puchase bundle No -topup 
            this.topupNotAllowed();
        }
        //End     
    }

    
    // Error Modal
    async topupNotAllowed () {

        const modal = await this.modalController.create({
            component: TopupNotAppliedModalPage,
        });

        modal.onDidDismiss().then((result: any) => {
            if (result.data == 1) {
                let navigationExtras: NavigationExtras = {
                    state: {
                        name: this.bundleDatas.country.trim(),
                        iso: (this.bundleDatas.type == 'region') ? this.bundleDatas.short_name_country : this.bundleDatas.short_name_country.toUpperCase(),
                        type: this.bundleDatas.type,
                        iccid: '',
                        isDestinations: false,
                        opt: ''
                    }
                };
                this.Router.navigate(['/bundle'], navigationExtras);
            }
        });
        return await modal.present();

    }


  expiredBundles: any = [];

  updateProgressValueData(totalDays: any, remainingDays: any) {
    const progressBars = this.el.nativeElement.querySelectorAll('.progress');
    const percent = (remainingDays / totalDays) * 100;

    progressBars.forEach((progress: any) => {
      const fill = progress.querySelector('.fill');
      const value = progress.querySelector('.value');
      const daysLeft = progress.querySelector('.days-left');

      const strokeDashoffset = ((100 - percent) / 100) * this.max;


      this.renderer.setStyle(fill, 'stroke-dashoffset', strokeDashoffset);
      value.innerHTML = `${remainingDays}`;
      daysLeft.innerHTML = this.translate.instant('GB_LEFT'); 
    });
  }

  updateProgressMegaDaily(totalDays: any, remainingDays: any) {
    const progressBars = this.el.nativeElement.querySelectorAll('.progress');
    const percent = (remainingDays / totalDays) * 100;

    progressBars.forEach((progress: any) => {
      const fill = progress.querySelector('.fill');
      const value = progress.querySelector('.value');
      const daysLeft = progress.querySelector('.days-left');

      const strokeDashoffset = ((100 - percent) / 100) * this.max;


      this.renderer.setStyle(fill, 'stroke-dashoffset', strokeDashoffset);
      value.innerHTML = `${remainingDays}`;
      daysLeft.innerHTML = remainingDays > 1 ? this.translate.instant('DAYS_LEFT') : this.translate.instant('DAY_LEFT');
    });
  }

 // Example function to extract number of days from a string
 extractDaysFromString(inputString: string): number | undefined {
  // Use a regular expression to extract the first numeric part from the string
  const match = inputString.match(/\d+/);

  if (match) {
    const numberValue = parseInt(match[0], 10);

    // Check if the conversion was successful
    if (!isNaN(numberValue)) {
      return numberValue; // Return the number
    }
  }
  
  return undefined; // Return undefined if no number is found or conversion fails
}
  getBackgroundUrl() {
    return `url('assets/countryBanners/${this.countryBanner}') no-repeat center top / cover`;
  }

 //directInstall
 async directInstall() {

  /*const smdpAddress = this.bundleDatas.smdpAddress;// Example: 'rsp.truphone.com'
  const activationCode =  this.bundleDatas.matchingId; // Example: 'JQ-209U6H-6I82J5'
  
      const universalLink = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$${smdpAddress}$${activationCode}`;
      // Open the Universal Link using InAppBrowser
      this.iab.create(universalLink, '_system'); */

      let navigationExtras: NavigationExtras = {
        state: {
          sharingData: this.bundleDatas,
          iccid: this.bundleDatas.iccid
        }
      };
      this.Router.navigate(['/install-esim'], navigationExtras);

} 
gotoMarketPlace()
{
  this.navController.navigateRoot('marketplace');
}


  gotoBack() {
    this.navController.pop();
  }
  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
   if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

}
import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
@Component({
  selector: 'app-active-bundle-detail',
  templateUrl: './active-bundle-detail.page.html',
  styleUrls: ['./active-bundle-detail.page.scss'],
})
export class ActiveBundleDetailPage implements OnInit {
  mergedAssignments:any=[]; 
  bundleDatas: any = [];
  statusOrder:any;
  constructor(private loadingScreen: LoadingScreenAppPage,private renderer: Renderer2, private el: ElementRef, private service: ServicesService, private navController: NavController, private Router: Router) { }
  tempBundles: any = [];
  networkImages: any = [];
  isBundleExpired:any=false;
 fromBundlesAPI:any={'initAmount' :'', 'remainAmount':''}
  bundlesExpiredDetails: any = {'remainingQuantity' : ''};
  usedPercentage: any;
  initDataAmount: any = '0 GB';
  remainDataamount: any = '0 GB';
  startTimefromBundle:any;
  endTimefromBundle:any;
  unitFactors:any={};
  tempRemain:any;
  tempInit:any;
  countryBanner:any;
  isButton:any;
  topupArray:any=[];
  transformCaps(items:any)
  {
    return 'GB';
  }

  //async loadindData()
  //{
    //await this.loadingScreen.presentLoading();
    //setTimeout(() => {
     // this.loadingScreen.dismissLoading();
   // }, 500);
 // }

  async loadindData()
  {
  await this.loadingScreen.presentLoading();
  }

  handleRefresh(event:any) {
    this.getCurrentPackage(this.bundleDatas.iccid);
      event.target.complete();
  }

  ngOnInit() {
    this.loadindData();
    this.tempBundles = this.Router.getCurrentNavigation()?.extras.state;
    this.bundleDatas = this.tempBundles.bundleData
    this.isButton = this.tempBundles.bundleStatus == 'active' ? true :false;
    if ( this.bundleDatas.short_name_country == 'North America' ||  this.bundleDatas.short_name_country == 'north america') {
      this.countryBanner = 'North_America.jpg';
    } else if ( this.bundleDatas.short_name_country == 'Middle East' || this.bundleDatas.short_name_country == 'middle east' ) {
      this.countryBanner = 'Middle_East.jpg';
    }  else if ( this.bundleDatas.short_name_country == 'CY' || this.bundleDatas.short_name_country == 'cy') {
      this.countryBanner = 'CY.jpg';
  }  else if ( this.bundleDatas.short_name_country == 'ZM' || this.bundleDatas.short_name_country == 'zm') {
    this.countryBanner = 'ZM.jpg';
  } 
    else {
      this.countryBanner = this.bundleDatas.short_name_country.toUpperCase()+'.jpg';

    }

    this.fromBundlesAPI.initAmount  = this.removeDecimalFromString(this.bundleDatas.initial_quantity);
//    console.log(this.fromBundlesAPI.initAmount);

    if(this.fromBundlesAPI.initAmount == '0')
    this.fromBundlesAPI.initAmount = this.bundleDatas.dataamount;


    this.initDataAmount = this.transform(this.fromBundlesAPI.initAmount   * 1000000000);
    this.tempRemain =this.removeDecimalFromString(this.bundleDatas.remaining_quantity);
    if(this.tempRemain == this.fromBundlesAPI.initAmount)
    {
      this.remainDataamount = '0 GB';
    }else
    {
      
      this.tempInit = this.fromBundlesAPI.initAmount   * 1000000000;
      this.tempRemain = this.removeDecimalFromString(this.tempRemain);
      this.tempRemain= Math.round(this.tempRemain * 1000000)
      console.log(this.tempRemain)
      if(this.tempRemain =='0')
      this.remainDataamount = '0 MB'
    else
    this.remainDataamount = this.transform(this.tempInit- this.tempRemain);
    
    }
  
    if(this.bundleDatas.start_time !=null && this.bundleDatas.start_time !='')
    {
      this.startTimefromBundle = true;
      this.isBundleExpired=false;
      this.bundlesExpiredDetails.startTime = moment(this.bundleDatas.start_time).format('DD-MM-YYYY');
 }else{
      this.startTimefromBundle = false;
      this.isBundleExpired=false;
      this.bundlesExpiredDetails.startTime = moment(this.bundleDatas.created_date).format('DD-MM-YYYY');
    }

    if(this.bundleDatas.end_time !=null &&  this.bundleDatas.end_time != '')
    {
      this.bundlesExpiredDetails.endTime = moment( this.bundleDatas.end_time).format('DD-MM-YYYY');
      this.isBundleExpired=false;
    }else{
      let numericPartAsString = this.bundleDatas.days.match(/\d+/)[0];
     
      this.isBundleExpired=false;
      this.bundlesExpiredDetails.endTime = moment(this.bundleDatas.start_time).add(numericPartAsString, 'days').format('DD-MM-YYYY');
    }
  
   

    this.getsetInit();
    //Call API for data balance 
    console.log("hiii");
     this.getCurrentPackage(this.bundleDatas.iccid);
  }

   convertSizeToBytes(sizeString:any) {
    // Extract numeric part from the size string
    let numericPart = parseFloat(sizeString);
  
    // Determine the unit (MB, GB, etc.) based on the string
    let unit = sizeString.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
    // Define conversion factors based on units
    this.unitFactors = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024,
    };
  
    // Convert the numeric part to bytes
    let bytes = numericPart * this.unitFactors[unit];
  
    return bytes;
  }
  removeDecimalFromString(inputString:any) {
    // Parse the input string to a float and convert it back to a string
    let stringWithoutDecimal = parseFloat(inputString).toString();
  
    // If the string ends with '.00', remove it
    if (stringWithoutDecimal.endsWith('.00')) {
      stringWithoutDecimal = stringWithoutDecimal.slice(0, -3);
    }
  
    return stringWithoutDecimal;
  }

  getsetInit()
  {
  const progressBars = this.el.nativeElement.querySelectorAll('.progress');
  progressBars.forEach((progress: any) => {
    const bar = progress.querySelector('.bar');
    const value = progress.querySelector('span');
    let test1 = setInterval(() => {
      this.renderer.setStyle(bar, 'transform', `rotate(${45 + 0}deg)`);
      clearInterval(test1);
    }, 20);
  });
  }

  getCurrentPackage(iccid: any) {
    this.service.getBundleUsedData(iccid).then((res: any) => {
      this.loadingScreen.dismissLoading();
      console.log(res.bundles.length);
      if (res.bundles.length > 0) {
        this.mergedAssignments = res.bundles.reduce((acc:any, obj:any) => acc.concat(obj.assignments), []);
        this.checkWithTopups(this.mergedAssignments);
      }else{
        this.topupArray = this.bundleDatas.topups;
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    })
  }

  checkWithTopups(assignmenrtArr: any) {
    this.topupArray = this.bundleDatas.topups;
    console.log("1=>" + this.topupArray.length );
    console.log("2=>" + assignmenrtArr.length);

    for (let i = 0; i < this.topupArray.length; i++) {
      let foundMatch = false; // Flag to check if a match is found
  
      for (let j = 0; j < assignmenrtArr.length; j++) {
        if (this.topupArray[i]['assignmentReference'] + '-0' == assignmenrtArr[j]['assignmentReference']) {
          foundMatch = true;
  
          // No use data amount and start and end time
          if (assignmenrtArr[j]['initialQuantity'] == assignmenrtArr[j]['remainingQuantity'] && assignmenrtArr[j]['startTime'] == null) {
            this.topupArray[i]['status'] = 'Queued';
            console.log("3");
          } else if (assignmenrtArr[j]['initialQuantity'] != assignmenrtArr[j]['remainingQuantity'] && assignmenrtArr[j]['remainingQuantity'] != '0' && assignmenrtArr[j]['startTime'] != null) {
            console.log("2");
            this.topupArray[i]['status'] = 'Active';
              //For Active Bundle status 
              this.startTimefromBundle = true;
              this.isBundleExpired=false;
              this.bundleDatas.days =  this.topupArray[i]['days'];
              this.bundleDatas.speed =  this.topupArray[i]['speed'];
              this.bundleDatas.short_name_country = this.topupArray[i]['shortname'];
              this.bundleDatas.country = this.topupArray[i]['country'];
              this.countryBanner =this.bundleDatas.short_name_country.toUpperCase()+'.jpg';
              this.bundlesExpiredDetails.startTime = moment(assignmenrtArr[j]['startTime']).format('DD-MM-YYYY');
              this.bundlesExpiredDetails.endTime = moment(assignmenrtArr[j]['endTime']).format('DD-MM-YYYY');

              this.initDataAmount = this.transform(assignmenrtArr[j]['initialQuantity']);
              this.remainDataamount = this.transform(assignmenrtArr[j]['initialQuantity'] - assignmenrtArr[j]['remainingQuantity']);
              if(assignmenrtArr[j]['remainingQuantity'] != assignmenrtArr[j]['initialQuantity'])
            this.animateProgressBar(assignmenrtArr[j]['remainingQuantity'], assignmenrtArr[j]['initialQuantity']);
            else
              this.remainDataamount = '0 GB';
            //END 
          } else {
            console.log("1");
            this.topupArray[i]['status'] = 'Expired';
          }
        }
      }
  
      // If no match is found, update the status to 'Expired'
      if (!foundMatch) {
        this.topupArray[i]['status'] = 'Expired';
      }
    }
  
    //console.log("before" + JSON.stringify(this.topupArray) );
    this.topupArray.sort((a: any, b: any) => {
      this.statusOrder = { 'Active': 1, 'Queued': 2, 'Expired': 3 };
      return this.statusOrder[a.status] - this.statusOrder[b.status];
    });
    console.log("After" + JSON.stringify(this.topupArray) );
  }

  animateProgressBarEnd() {
    const progressBars = this.el.nativeElement.querySelectorAll('.progress');
    progressBars.forEach((progress: any) => {
      const bar = progress.querySelector('.bar');
      const value = progress.querySelector('span');
      this.usedPercentage = 100;
      const percentage = parseInt(this.usedPercentage, 10);
      this.renderer.setStyle(bar, 'transform', `rotate(${45 + percentage * 1.8}deg)`); // Directly set the rotation
    });
  }
  
  animateProgressBar(remain: any, init: any) {
    if (remain !== init) {
      const progressBars = this.el.nativeElement.querySelectorAll('.progress');
      progressBars.forEach((progress: any) => {
        const bar = progress.querySelector('.bar');
        const value = progress.querySelector('span');
        this.usedPercentage = ((init - remain) / init) * 100;
        const percentage = parseInt(this.usedPercentage, 10);
        this.renderer.setStyle(bar, 'transform', `rotate(${45 + percentage * 1.8}deg)`); // Directly set the rotation
      });
    }
  }
  

   transform(bytes: number): string {
    if (bytes === 0) return '0 Byte';
  
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log10(bytes) / 3);
  
    return parseFloat((bytes / Math.pow(1000, i)).toFixed(2)) + ' ' + sizes[i];
  }
  

  getNetworkLogos(countryName: any) {
    this.service.getListOfImages(countryName).then((res: any) => {
      if (res.data.length > 0) {
        this.networkImages = res.data;
      } else {
        this.networkImages = [];
      }
    }).catch(err => {
      // console.log("Something went wrong");
    })
  }


  gotoBack() {
    this.navController.pop();
  }
  gotoTab1() {
    this.navController.navigateRoot('/tab1');
  }

  //Common Footers
  gotoTab2() {
    this.navController.navigateRoot('/tab2');
  }

  gotoTab4() {
    this.navController.navigateRoot('/tab4');
  }

  gotoTab5() {
    this.navController.navigateRoot('/tab5');
  }
  //End of common footers

  gotoToup()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        name: this.bundleDatas.country.trim(),
        iso: this.bundleDatas.short_name_country.toUpperCase(),
        type: this.bundleDatas.type,
        iccid: this.bundleDatas.iccid
      }
    };
    this.Router.navigate(['/esim-all'], navigationExtras);
  }
}

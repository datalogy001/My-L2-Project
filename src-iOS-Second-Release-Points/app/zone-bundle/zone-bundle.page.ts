import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, ModalController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { SelectCountryPage } from '../select-country/select-country.page';
import axios from 'axios';
;

@Component({
  selector: 'app-zone-bundle',
  templateUrl: './zone-bundle.page.html',
  styleUrls: ['./zone-bundle.page.scss'],
})
export class ZoneBundlePage implements OnInit {

  planDetails: any = [];
  bundleList: any = [];
  searchTerm: any = '';
  searchCode: any = '';
  isLoading: any = true;
  currencyCode: any = 'USD';
  tempCurrency:any = 'USD';
  currencyList: any = ['USD','EUR', 'GBP'];
  source:any ='';
  destination:any ='';
  result:any='';
  rate:any='';
  exchangeRates:any=[];
  response:any='';
  displayText:any='';
  constructor(private toastController: ToastController,private modalController: ModalController,private Router: Router, private navController: NavController, private service: ServicesService) { }

  customActionSheetOptions: any = {
    header: 'Select Currency'
  };

  ngOnInit() {
    this.currencyCode = 'USD';
    window.localStorage.setItem("currency","USD");
    this.planDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.searchTerm = this.planDetails.codeType;
    this.displayText = this.planDetails.displayText;
    this.getBundles();

  }

  async presentToast(msg:any, status:any) {
    const toast = await this.toastController.create({
      header:status,
      message: msg,
      duration: status== 'Error' ? 1000: 2000,
      position: 'top',
      cssClass: status== 'Error' ? 'error-toast': 'success-toast'
    });

    await toast.present();
  }
  
    //gotoCountryList

    async selectCurrency() {
      const modal = await this.modalController.create({
        component: SelectCountryPage,
        componentProps: { value: this.currencyCode }
      });
  
      modal.onDidDismiss().then((result:any) => {
        if(result.data.changed == true)
        {
        this.currencyCode = result.data.currencyCode;
        this.destination = this.currencyCode;
        this.source = window.localStorage.getItem("currency");
        if(this.source != this.destination)
        {
        window.localStorage.setItem("currency", this.currencyCode);
        this.currencyConverter(this.source , this.destination );
        }
        }
      });
  
      return await modal.present();

    }

    toggleAccordion(item: any) {
      item.expanded = !item.expanded;
    }

  async currencyConverter(source:any, dest:any)
  {
    this.rate ='';
    this. response ='';
    this.response = await axios.get(
      'https://api.exchangerate.host/latest?base='+source+'&symbols='+dest
    );
    this.exchangeRates = this.response.data.rates;
    this.rate = this.exchangeRates[dest];
    for(let i=0;i<this.bundleList.length;i++)
    {
      console.log('Original ' + this.bundleList[i]['price'] + ' => price without Round and adding 20% =>'+this.bundleList[i]['price'] * this.rate);
      this.bundleList[i]['price'] =  this.bundleList[i]['price'] * this.rate;
    }
    this.presentToast("Currency changed","Success");
    }

    roundNumber(num: number): number {
      return Math.round(num);
    }

  getBundles() {
    this.bundleList = window.localStorage.getItem("zone_"+this.searchTerm);
    this.bundleList = JSON.parse(this.bundleList);
  }

  gotoBack() {
    this.navController.pop();
  }

  gotoRegister(bundleItem:any)
  {
    let navigationExtras: NavigationExtras = {
      state: {
        currencyCode: this.currencyCode,
        bundleItem: bundleItem,
        withBack: true
      }
    };

  if(window.localStorage.getItem('token') == null)
  {
    let navigationExtras: NavigationExtras = {
      state: {
        currencyCode: this.currencyCode,
        bundleItem: bundleItem,
        withBack: false
      }
    };
    this.Router.navigate(['/create-account'],navigationExtras);
  }
  else
  {
    let navigationExtras: NavigationExtras = {
      state: {
        currencyCode: this.currencyCode,
        bundleItem: bundleItem,
        withBack: true
      }
    };
  this.Router.navigate(['/bundle-summary'], navigationExtras);
  }
  }



}

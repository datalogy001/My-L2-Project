import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { SelectCurrencyPage } from '../select-currency/select-currency.page';
import axios from 'axios';
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';

@Component({
  selector: 'app-currency-settings',
  templateUrl: './currency-settings.page.html',
  styleUrls: ['./currency-settings.page.scss'],
})
export class CurrencySettingsPage implements OnInit {

  selectedCurrency: any = 'USD';
  source: any = '';
  destination: any = '';
  result: any = '';
  rate: any = '';
  exchangeRates: any = [];
  response: any = '';
  temCurrency: any = '';
  notificationList:any=[]; 
  notiCount:any = 0;
  isLogin:any= false;
  token:any=''; 
  constructor(private loadingScreen: LoadingScreenAppPage,private Router: Router,private service: ServicesService,private toastController: ToastController, private navController: NavController, private modalController: ModalController) { }

  ngOnInit() {
    
    if (window.localStorage.getItem('token') == null) {
      this.isLogin = false;
    }
    else {
      this.isLogin = true;
      this.token = window.localStorage.getItem('token');
      this.getNotificationList();
    }

    if (window.localStorage.getItem('currency') == null) {
      this.selectedCurrency = 'USD';
      window.localStorage.setItem('currency', 'USD')
    }
    else {
      this.selectedCurrency = window.localStorage.getItem('currency');
    }

   
  }

  async getNotificationList() {
    this.service.getNotificationList(this.token).then((res: any) => {
      if (res.code == 200) {
        console.log(res.data.readnotification.length)
        if (res.data.readnotification.length > 0)
        {
          this.notificationList =res.data.readnotification;
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

  gotoNoti()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        notiData: this.notificationList,
      }
    };
    this.Router.navigate(['/notifications'], navigationExtras);
  }


  
  async gotoselectCurrency() {
    const modal = await this.modalController.create({
      component: SelectCurrencyPage,
      componentProps: { value: this.selectedCurrency }

    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data.inputValue != 'none') {
        this.temCurrency = result.data.inputValue;
        this.destination = this.temCurrency;
        this.source = window.localStorage.getItem("currency");

        if (this.source != this.destination) {
          this.getLoading();
          this.currencyConverter('USD', this.destination);
        }else{
          this.getLoading();
          console.log("currency is same" + this.source+"=>"+this.destination);
        }
      }



    });
    return await modal.present();

  }
async  getLoading()
  {
    await this.loadingScreen.presentLoading();
  }
  


  async currencyConverter(source: any, dest: any) {
    this.rate = '';
    this.response = '';
    this.response = await axios.get(
      'https://api.currencylayer.com/convert?from=' + source + '&to=' + dest + '&amount=1&access_key=39fe546d06963473eca4901cf48177ad'
    );


    if (this.response.data.success == false) {
      this.loadingScreen.dismissLoading();
      this.selectedCurrency = window.localStorage.getItem("currency");
      this.presentToast(this.response.data.error.info, "Error");
    } else {
      this.rate = this.response.data.result;
      this.selectedCurrency = this.temCurrency;
      window.localStorage.setItem("currency", this.selectedCurrency);
      window.localStorage.setItem("currency_rate", this.rate);
      this.loadingScreen.dismissLoading();
      this.presentToast("Currency changed", "Success");
      console.log("Rate exchange" + this.rate);
      console.log("Source=>" +source);
      console.log("Dest=>" + dest);
    }
  }

  async presentToast(msg: any, status: any) {
    const toast = await this.toastController.create({
      header: status,
      message: msg,
      duration: status == 'Error' ? 2000 : 3000,
      position: 'top',
      cssClass: status == 'Error' ? 'error-toast' : 'success-toast'
    });

    await toast.present();
  }


  gotoBack() {
    this.navController.pop();
  }

}

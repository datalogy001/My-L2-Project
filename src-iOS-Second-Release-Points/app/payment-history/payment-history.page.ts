import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {
  notificationList:any=[]; 
  notiCount:any = 0;
  paymentList: any = [];
  token: any = '';
  isData:any =true;
  constructor(private Router: Router,private modalController: ModalController, private apiService: ServicesService, private navCtrl: NavController) {
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



  ngOnInit() {
  }

  ionViewDidEnter() {
    this.token = window.localStorage.getItem("token");
    this.getNotificationList();
    this.getPaymentHistory();
    
  }

  async getNotificationList() {
    this.apiService.getNotificationList(this.token).then((res: any) => {
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

  datefilter(dates: any) {
   return moment(dates, 'DD/MM/YYYY').format('DD MMM YYYY');
  }

  async getPaymentHistory() {
    this.apiService.getPaymentHistory(this.token).then((res: any) => {
      this.isData =false;
      if (res.code == 200) {
        console.log(res.data[0].length)
        if (res.data.length > 0)
          this.paymentList = res.data;
        else
          this.paymentList = [];
      } else {
        this.paymentList = [];
      }
    }).catch(err => {
      this.isData =false;
    })

  }

  getCountryName(inputString1: any) {
    var stringArray = inputString1.split(', ');
    return stringArray[3];
  }

  gotoBack() {
    this.navCtrl.pop();
  }

}

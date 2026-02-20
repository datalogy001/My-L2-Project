import { Component, OnInit, Input } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  selectedLanguage:any;
  localLang:any;
  notificationlist: any = [];
  delObj:any={'deleted_id':''};
  constructor( public toastController: ToastController,public alertController: AlertController,private service: ServicesService, private navController: NavController, private Router: Router) { }
  tempNoti: any = [];
  token: any = '';


  ngOnInit() {
    this.selectedLanguage = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

    if(this.selectedLanguage == 'en')
      this.localLang = "en";
    else
      this.localLang = "en";
    
    this.tempNoti = this.Router.getCurrentNavigation()?.extras.state;
    this.notificationlist = this.tempNoti.notiData;
    this.readNoti();

  }
  
  async readNoti() {
    if (this.notificationlist.length > 0) {
      this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
      this.service.readNoti(this.notificationlist[0]['user_id'], this.token).then((res: any) => {
        if (res.code == 200) {
          console.log("Update notificaations")
        } else {
          //this.notificationList = [];
        }
      }).catch(err => {
        //this.notificationList = [];
      })
    }
  } 

  gotoBack() {
    this.navController.pop();
  }

  modifyDate(dates:any)
  {
    moment.locale(this.localLang); 
    let customDates = moment(dates).fromNow();
    return customDates;
  }

  gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
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

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }

}

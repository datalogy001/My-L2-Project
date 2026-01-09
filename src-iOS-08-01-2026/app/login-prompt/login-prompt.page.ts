
import { Component, OnInit, Input } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.page.html',
  styleUrls: ['./login-prompt.page.scss'],
})
export class LoginPromptPage implements OnInit {
  tempDetails:any =[]; 
  checkoutObj:any =[];
  isLogin:any='';
  constructor(private loadCtr: LoadingController, private service: ServicesService, private navController: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) {
  }

  gotoMarketPlace()
  {
    this.navController.navigateRoot('marketplace');
  }

  
  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
  }

  gotoLogin()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj,
        withOutLogin: true

      }
    };
      this.Router.navigate(['/login'], navigationExtras);
  }

  gotoRegister()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj,
        withOutLogin: true
      }
    };

      this.Router.navigate(['/create-account'], navigationExtras);
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
  
  gotoBack()
  {
    this.navController.pop();
  }

}

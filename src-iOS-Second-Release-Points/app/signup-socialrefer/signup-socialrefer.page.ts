import { Component, OnInit, } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-socialrefer',
  templateUrl: './signup-socialrefer.page.html',
  styleUrls: ['./signup-socialrefer.page.scss'],
})
export class SignupSocialreferPage implements OnInit {
  constructor( private translate: TranslateService, private loadingScreen: LoadingScreenAppPage, private http: HttpClient, private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {
  }
  tempDetails:any=[]; 
  checkoutObj:any=[]; 
  isLogin:any;
  loginPageUrl:any;
  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
    this.isLogin = this.tempDetails.withOutLogin;
    this.loginPageUrl =  this.tempDetails.payBack

  }

  skipButton()
  {
    if (this.isLogin == true) {
      let navigationExtras: NavigationExtras = {
        state: {
          checkoutData: this.checkoutObj,
          withOutLogin: this.isLogin,
          payBack: this.loginPageUrl
        }
      };
      this.Router.navigate(['/payment-days'], navigationExtras);
    } else {
      this.Router.navigate(['home-search']);
    } 
  }
  gotoRefereCode()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj,
        withOutLogin: this.isLogin,
        payBack: this.loginPageUrl
      }
    };
    this.Router.navigate(['/social-refercode'], navigationExtras);
  }

}

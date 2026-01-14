import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { SuccessModelPage } from '../success-model/success-model.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';  // Import TranslateService


@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.page.html',
  styleUrls: ['./notification-settings.page.scss'],
})
export class NotificationSettingsPage implements OnInit {

  constructor(
    private loadingScreen: LoadingScreenAppPage,
    private toastController: ToastController,
    private service: ServicesService,
    private navController: NavController,
    private modalCtrl: ModalController,
    private translate: TranslateService  // Inject TranslateService
  ) { }

  emailSettings: any = { 'status': 0 };
  promoSettings: any = { 'status': 0 };
  serviceSettings: any = { 'status': 0 };
  paymentSettings: any = { 'status': 0 };

  token: any = '';
  promoEmail: any = 0;
 
  promoSettingsObj:any=0;
  paymentSettingsObj:any=0;
  serviceSettingsObj:any=0;


  ngOnInit() {
    
    this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.promoEmail = window.localStorage.getItem('L2TraveleSIM_emailSettings');

    console.log(this.promoEmail);

    if (this.promoEmail == null || this.promoEmail == 0) {
      this.emailSettings.status = 0;
      console.log(this.emailSettings.status);
    } else {
      this.emailSettings.status = window.localStorage.getItem('L2TraveleSIM_emailSettings');
      console.log(this.emailSettings.status);
    }

    this.promoSettingsObj = window.localStorage.getItem('L2TraveleSIM_promoSettings');
    console.log(window.localStorage.getItem('L2TraveleSIM_promoSettings'));
    if (this.promoSettingsObj == null || this.promoSettingsObj == 0 || this.promoSettingsObj == undefined || this.promoSettingsObj == 'undefined') {
      this.promoSettings.status = 0;
    } else {
      this.promoSettings.status = window.localStorage.getItem('L2TraveleSIM_promoSettings');
    }

    this.paymentSettingsObj = window.localStorage.getItem('L2TraveleSIM_paymentSettings');
    console.log(this.paymentSettingsObj);
    if (this.paymentSettingsObj == null || this.paymentSettingsObj == 0 || this.paymentSettingsObj == undefined || this.paymentSettingsObj == 'undefined') {
      this.paymentSettings.status = 0;
    } else {
      this.paymentSettings.status = window.localStorage.getItem('L2TraveleSIM_paymentSettings');
    }

    this.serviceSettingsObj = window.localStorage.getItem('L2TraveleSIM_serviceSettings');
    console.log(this.serviceSettingsObj);
    if (this.serviceSettingsObj == null || this.serviceSettingsObj == 0 || this.serviceSettingsObj == undefined || this.serviceSettingsObj == 'undefined') {
      this.serviceSettings.status = 0;
    } else {
      this.serviceSettings.status = window.localStorage.getItem('L2TraveleSIM_serviceSettings');
    }

  }

  async togglePromoChanged() {
    if (this.promoSettings.status == false) {
      this.promoSettings.status = 0;
    } else {
      this.promoSettings.status = 1;
    }
    await this.loadingScreen.presentLoading();

    this.service.getupdatePromoSettings(this.token, this.promoSettings).then((res: any) => {
      if (res.code == 200) {
        this.loadingScreen.dismissLoading();
        window.localStorage.setItem("L2TraveleSIM_promoSettings", this.promoSettings.status);
        this.successMSGModal(
          this.translate.instant('SETTINGS_UPDATED_SUCCESS'),
          this.translate.instant('SETTINGS_UPDATE'),
          "2000"
        );
     //   this.navController.pop();
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    });
  }

  async toggleServiceChanged() {
    if (this.serviceSettings.status == false) {
      this.serviceSettings.status = 0;
    } else {
      this.serviceSettings.status = 1;
    }
    await this.loadingScreen.presentLoading();

    this.service.getupdateServiceSettings(this.token, this.serviceSettings).then((res: any) => {
      if (res.code == 200) {
        this.loadingScreen.dismissLoading();
        window.localStorage.setItem("L2TraveleSIM_serviceSettings", this.serviceSettings.status);
        this.successMSGModal(
          this.translate.instant('SETTINGS_UPDATED_SUCCESS'),
          this.translate.instant('SETTINGS_UPDATE'),
          "2000"
        );
      //  this.navController.pop();
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    });
  }
  async togglePaymentChanged() {
    if (this.paymentSettings.status == false) {
      this.paymentSettings.status = 0;
    } else {
      this.paymentSettings.status = 1;
    }
    await this.loadingScreen.presentLoading();

    this.service.getupdatePaymentSettings(this.token, this.paymentSettings).then((res: any) => {
      if (res.code == 200) {
        this.loadingScreen.dismissLoading();
        window.localStorage.setItem("L2TraveleSIM_paymentSettings", this.paymentSettings.status);
        this.successMSGModal(
          this.translate.instant('SETTINGS_UPDATED_SUCCESS'),
          this.translate.instant('SETTINGS_UPDATE'),
          "2000"
        );
      //  this.navController.pop();
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    });
  }

  async toggleChanged() {
    if (this.emailSettings.status == false) {
      this.emailSettings.status = 0;
    } else {
      this.emailSettings.status = 1;
    }
    await this.loadingScreen.presentLoading();

    this.service.getupdatePromotion(this.token, this.emailSettings).then((res: any) => {
      if (res.code == 200) {
        this.loadingScreen.dismissLoading();
        window.localStorage.setItem("L2TraveleSIM_emailSettings", this.emailSettings.status);
        this.successMSGModal(
          this.translate.instant('SETTINGS_UPDATED_SUCCESS'),
          this.translate.instant('SETTINGS_UPDATE'),
          "2000"
        );
    //    this.navController.pop();
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    });
  }

  // Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  gotoBack() {
    this.navController.pop();
  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }

  gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
	  }

  gotoTab5() {
if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }
}

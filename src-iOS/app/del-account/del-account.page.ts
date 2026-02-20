import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { Router } from '@angular/router';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService


@Component({
  selector: 'app-del-account',
  templateUrl: './del-account.page.html',
  styleUrls: ['./del-account.page.scss'],
})
export class DelAccountPage implements OnInit {
  confirmationText: string = '';
  accessToken: any;
  userDetails: any = [];
  delObj: any = { 'id': '' };

  constructor(
    private loadingScreen: LoadingScreenAppPage,
    private router: Router,
    private service: ServicesService,
    private toastController: ToastController,
    private loadCtr: LoadingController,
    private modalCtrl: ModalController,
    private navController: NavController,
    private translate: TranslateService // Inject TranslateService
  ) { }

 

  ngOnInit() {
    
    this.accessToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.delObj.id = this.userDetails.id;
  }

  async confirmDeletion() {
    if (this.confirmationText.trim() === 'DELETE') {
      //API calls start
      await this.loadingScreen.presentLoading();
      this.service.deleteAccount(this.delObj, this.accessToken).then((res: any) => {
        if (res.code === 200) {
          this.loadingScreen.dismissLoading();
          window.localStorage.setItem('L2TraveleSIM_auth_token', '');
          window.localStorage.removeItem('L2TraveleSIM_userDetails');
          window.localStorage.removeItem('L2TraveleSIM_auth_token');
          window.localStorage.removeItem('L2TraveleSIM_emailSettings');
          window.localStorage.removeItem('L2TraveleSIM_phone_code');
         // window.localStorage.removeItem('L2TraveleSIM_currency');
         window.localStorage.removeItem('L2TraveleSIM_country_code');
          window.localStorage.removeItem('L2TraveleSIM_currency_rate');
          window.localStorage.removeItem('L2TraveleSIM_storagePrompt');
          window.localStorage.removeItem('L2TraveleSIM_fbAccessToken');
          window.localStorage.removeItem('L2TraveleSIM_Bundles_list');
          window.localStorage.removeItem('L2TraveleSIM_isSavedDetails');
          window.localStorage.removeItem('L2TraveleSIM_types');
          window.localStorage.removeItem('L2TraveleSIM_user_wallets');
          window.localStorage.removeItem('L2TraveleSIM_refer_balance');
          window.localStorage.removeItem('L2TraveleSIM_user_country');
          window.localStorage.removeItem('L2TraveleSIM_refer_code');
          this.successMSGModal(
            this.translate.instant('DELETE_ACCOUNT_SUCCESS'),
            this.translate.instant('ACCOUNT_DELETION'),
            '2000'
          );
          this.router.navigate(['/home-search']);
        } else {
          this.loadingScreen.dismissLoading();
          this.errorMSGModal(
            this.translate.instant('TRY_AGAIN'),
            this.translate.instant('SOMETHING_WENT_WRONG')
          );
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();
        this.errorMSGModal(
          this.translate.instant('TRY_AGAIN'),
          err.error.message
        );
      });
    } else {
      this.errorMSGModal(
        this.translate.instant('TRY_AGAIN'),
        this.translate.instant('INVALID_CONFIRMATION')
      );
      this.confirmationText = '';
    }
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

  //Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalCtrl.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  //Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }
}

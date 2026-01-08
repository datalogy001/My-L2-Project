import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private translate: TranslateService,private modalCtrl: ModalController, private navController: NavController, private router: Router) { }
  loginType:any; 
  ngOnInit() {
    this.loginType = window.localStorage.getItem('L2TraveleSIM_loginType');
  }

  
	gotoMarketPlace()
		  {
		    this.navController.navigateRoot('marketplace');
		  }


  async closePopover(values: any) {
  
      window.localStorage.setItem('L2TraveleSIM_auth_token', '');
      window.localStorage.removeItem('L2TraveleSIM_auth_token');
      window.localStorage.removeItem('L2TraveleSIM_userDetails');
       window.localStorage.removeItem('L2TraveleSIM_Bundles_list');
      window.localStorage.removeItem('L2TraveleSIM_storagePrompt');
      //window.localStorage.removeItem('L2TraveleSIM_phone_code');
      window.localStorage.removeItem('L2TraveleSIM_country_code');
      window.localStorage.removeItem('L2TraveleSIM_emailSettings');
      window.localStorage.removeItem('L2TraveleSIM_types');
     // window.localStorage.removeItem('L2TraveleSIM_currency');
      window.localStorage.removeItem('L2TraveleSIM_isSavedDetails');
      window.localStorage.removeItem('L2TraveleSIM_currency_rate');
      window.localStorage.removeItem('L2TraveleSIM_user_wallets');
      window.localStorage.removeItem('L2TraveleSIM_refer_balance');
      window.localStorage.removeItem('L2TraveleSIM_refer_code');
          
      
      this.successMSGModal(this.translate.instant('TITLE_LOGOUT_SUCCESS'),this.translate.instant('MESSAGE_LOGOUT_SUCCESS'), "2000");
      this.router.navigate(['/home-search']);
  }

  // Success Modal
  async successMSGModal(msgKey: string, titleKey: string, times: any) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { 'value': msgKey, 'value1': titleKey, 'value2': times }
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

  gotoTab5() {
    if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoSearch() {
    this.navController.navigateRoot('home-search');
  }

}

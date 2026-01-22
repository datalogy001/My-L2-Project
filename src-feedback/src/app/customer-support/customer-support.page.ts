import { Component, OnInit } from '@angular/core';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.page.html',
  styleUrls: ['./customer-support.page.scss'],
})
export class CustomerSupportPage implements OnInit {

  custSupport: any = { 'last_name':'','email': '', 'name': '', 'subject': '', 'plateform': '', 'support_description': '' };

  constructor(private keyboard: Keyboard,private loadingScreen: LoadingScreenAppPage, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, public popoverController: PopoverController, private Router: Router, private navController: NavController, private toastController: ToastController, private modalController: ModalController, private translate: TranslateService) { }



  ngOnInit() {
    
      // Show the accessory bar with the "Done" button
      this.keyboard.hideFormAccessoryBar(false);

      // Listen for the keyboard's 'done' button event
   /*   this.keyboard.onKeyboardHide().subscribe(() => {
        this.onDoneButton();
      }); */

    if (this.platform.is('android')) {
      this.custSupport.plateform = 'Android'
    } else if (this.platform.is('ios')) {
      this.custSupport.plateform = 'iOS';
    } else {
      this.custSupport.plateform = 'Web';
    }
  }

  /*onDoneButton() {
    // Handle the 'Done' button click event
    // Close the keyboard programmatically
    this.keyboard.hide();
    this.submit();
} */

    validateName(event: any, type: string) {
      const inputValue = event.target.value;
      // Regular expression to match any digit
      const regex = /\d/;
    
      // Check if the input contains any digits
      if (regex.test(inputValue)) {
        // If it contains digits, remove them from the input
        event.target.value = inputValue.replace(regex, '');
        // Update the model value accordingly
        if (type === 'first') {
          this.custSupport.first_name = event.target.value;
        } else {
          this.custSupport.last_name = event.target.value;
        }
      }
    }

    
    
  async submit() {
    if (this.validate()) {
      await this.loadingScreen.presentLoading();
      this.service.customerSupport(this.custSupport).then((res: any) => {
        this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          this.successMSGModal(
            this.translate.instant('SUPPORT_TEAM_MESSAGE'),
            this.translate.instant('SUPPORT_TEAM_NOTIFICATION'),
            "2000"
          );
          this.navController.pop();
        } else {
          this.errorMSGModal(this.translate.instant('TRY_AGAIN'), res.message);
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('SOMETHING_WENT_WRONG'));
      })
    }
  }

  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  validate() {
    let emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (this.custSupport.name == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_NAME'));
      return false;
    } 
    else if (this.custSupport.last_name == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_SURNAME'));
      return false;
    } 
   
    else if (this.custSupport.email.trim() == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_EMAIL'));
      return false;
    } else if (!emailValid.test(this.custSupport.email) && (this.custSupport.email != '')) {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_VALID_EMAIL'));
      return false;
    } else if (this.custSupport.subject.trim() == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_SUBJECT'));
      return false;
    } else if (this.custSupport.support_description.trim() == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('PLEASE_ENTER_MESSAGE'));
      return false;
    }
    else if (this.custSupport.support_description.trim().length < 25) {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('SUPPORT_DESCRIPTION_TOO_SHORT'));
      return false;
    }

    return true;
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

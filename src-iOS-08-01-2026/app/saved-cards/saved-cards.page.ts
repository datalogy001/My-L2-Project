import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { DeleteCardPage } from '../delete-card/delete-card.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.page.html',
  styleUrls: ['./saved-cards.page.scss'],
})
export class SavedCardsPage implements OnInit {

  constructor(private translate: TranslateService, private service: ServicesService, private Router: Router, private navController: NavController, private modalCtrl: ModalController) { }
  stripeCardObj: any = [];
  isLogin: any = '';
  cardList: any = [];
  token: any = '';
  authToken: any;
  isDataAvail: any = true;
  delObj: any = { 'delete_id': '' };
  ngOnInit() {
  }


  ionViewDidEnter() {
    this.isDataAvail = true;
    this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.cardList = [];
    this.getCreditCards();
  }

  /*handleRefresh(event: any) {
    this.isDataAvail = true;
    this.cardList = [];
    this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.getCreditCards();
    event.target.complete();
  } */

  async getCreditCards() {

    this.service.getCreditCardFpayDetails(this.token).then((res: any) => {
      if (res.code == 200) {
        if (res.data[0].length > 0) {
          this.isDataAvail = true;
          this.cardList = res.data[0];
        }
        else {
          this.isDataAvail = false;
          this.cardList = [];
        }
      } else {
        this.isDataAvail = false;
        this.cardList = [];
      }
    }).catch(err => {
      this.isDataAvail = false;
      this.cardList = [];
    })

  }

  getLastFourDigits(cardNumber: any){
    return cardNumber.slice(-4);
  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }

  gotoBack() {
    this.navController.pop();
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

  gotoNewCard() {
    let navigationExtras: NavigationExtras = {
      state: {
        stripeCardData: this.stripeCardObj,
        fromPayment: false
      }
    };
    this.Router.navigate(['/add-card-fpay'], navigationExtras);
  }

  async presentConfirmAlert(id: any, indexVal: any) {
    const modal = await this.modalCtrl.create({
      component: DeleteCardPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data == 1) {
        this.delObj.delete_id = id;
        this.service.removeCreditCard(this.delObj, this.token).then((res: any) => {
          if (res.code == 200) {

            this.cardList.splice(indexVal, 1);
            if (this.cardList.length > 0)
              this.isDataAvail = true;

            else
              this.isDataAvail = false;
            this.successMSGModal(this.translate.instant('DELETE_CARD_BUTTON'),this.translate.instant('CARD_DELETED'), "2000");
          } else {
            this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'), this.translate.instant('UNABLE_TO_DELETE_CARD') );
          }
        }).catch(err => {
        })
      }
    });
    return await modal.present();
  }

  // Display success message modal
  async successMSGModal(header: string, message: string, time: any) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: {
        'value': header,
        'value1': message,
        'value2': time
      }
    });
    await modal.present();
  }

  // Display error message modal
  async errorMSGModal(header: string, message: string) {
    console.log(header);
    console.log(message);
    const modal = await this.modalCtrl.create({
      component: PasswordErrorPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }


}

import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from '../api/services.service';
import Swiper from 'swiper';
import { PermissionModalPage } from '../permission-modal/permission-modal.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-split-payment',
  templateUrl: './split-payment.page.html',
  styleUrls: ['./split-payment.page.scss'],
})
export class SplitPaymentPage implements OnInit {
  @Input() splitObj: any;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private translate: TranslateService,private service: ServicesService,private modalCtrl: ModalController, private navController: NavController) { }
  currencyCode:any='USD';
  cardList: any = [];
  accessToken:any;
  selectedCards: boolean[] = [];
  selectedPaymentType: string = 'google-pay'; // Set Gogole Pay as the default selected option
  isCardSelected: any = false;
  creditDebitType: any = '';

  ngOnInit() {

    this.accessToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.getCreditCards();
    if (window.localStorage.getItem('L2TraveleSIM_currency') == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem('L2TraveleSIM_currency');
    }
    this.splitObj.amt_from_other_payment = 
  parseFloat((this.splitObj.total_amount - this.splitObj.wallet_amount).toFixed(2));
  }

  paymentType: any = '';
    // Function to handle radio button click
    cartOpt(index: number, cardDetails: any) {
      // Reset all selections
      this.selectedCards.fill(false);
      // Set the selected card
      this.isCardSelected = true;
      this.selectedCards[index] = true;
      this.splitObj.card_id = this.cardList[0]['id'];
      this.splitObj.customer_id = this.cardList[0]['customer_id'];
      this.splitObj.card_source = this.cardList[0]['card_source'];
      this.splitObj.isExistigCard =true;
      this.paymentType = '';
      //console.log("::" + this.isCardSelected);
    }

    
    swiperSlideChanged(e: any) {
      //console.log('changed: ', e);
    }
  
    swiperReady() {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }

    // Event handler for radio button change
    onPaymentTypeChange(event: any) {
      this.selectedPaymentType = event.detail.value;
      if (this.selectedPaymentType == 'google-pay') {
          this.creditDebitType = '';
          // Reset all selections
          this.selectedCards.fill(false);
          this.isCardSelected = false;
          this.splitObj.card_id = '';
          this.splitObj.customer_id = '';
          this.splitObj.card_source = '';
          this.splitObj.isExistigCard =false;
          
        } else {
        this.isCardSelected = false;
        this.splitObj.isExistigCard =false;
      }
     
    }

    
  async getCreditCards() {
    this.service.getCreditCardDetails(this.accessToken).then((res: any) => {
      if (res.code == 200) {
        if (res.data[0].length > 0) {
          this.cardList = res.data[0];
          this.selectedCards = new Array(this.cardList.length).fill(false);
        }
        else {
          this.cardList = [];
        }
      } else {
        this.cardList = [];
      }
    }).catch(err => {
      this.cardList = [];
    })

  }

  closePopover() {
    this.splitObj.is_split_payment =false;
    this.modalCtrl.dismiss({ splitDatas: this.splitObj, isClose: true });
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
  

     currencySymbols: any=  {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'LYD': 'LD',

    };

    paySplitPayment() {
      const minAmount = 0.50;
      // Convert to float if needed and validate
      const remainingToPay = parseFloat(this.splitObj?.amt_from_other_payment || '0');
    
      if (remainingToPay < minAmount) {
        const currencySymbol = this.currencySymbols[this.currencyCode] || this.currencyCode;
        this.errorMSGModal(
          this.translate.instant('VALIDATION_MSG_BUTTON'), this.translate.instant('MINIMUM_AMOUNT_HEADER', {
            currency: currencySymbol,
            amount: '0.50'
          })
        );
        return;
      }
    
      if (this.selectedPaymentType === 'google-pay') {
        this.splitObj.is_split_payment = true;
        this.splitObj.selected_payment_method = this.selectedPaymentType;
        this.modalCtrl.dismiss({ splitDatas: this.splitObj, isClose: false });
      } else {
        // Card payment
        if (this.cardList.length > 0 && this.isCardSelected === false) {
          this.gotoPernissionModel();
        } else {
          this.splitObj.is_split_payment = true;
          this.splitObj.selected_payment_method = this.selectedPaymentType;
          this.modalCtrl.dismiss({ splitDatas: this.splitObj, isClose: false });
        }
      }
    }
    
  async gotoPernissionModel() {
      const modal = await this.modalCtrl.create({
        component: PermissionModalPage,
      });
  
      modal.onDidDismiss().then((result: any) => {
        if (result.data.inputValue == true) {
          this.splitObj.is_split_payment =true;
          this.splitObj.isExistigCard =false;
          this.splitObj.selected_payment_method = this.selectedPaymentType;
          this.modalCtrl.dismiss({ splitDatas: this.splitObj, isClose: false });
        } else {
       // Reset all selections and choose first
          this.selectedCards.fill(false);
          // Set the selected card
          this.isCardSelected = true;
          this.selectedCards[0] = true;
          this.splitObj.card_id = this.cardList[0]['id'];
          this.splitObj.customer_id = this.cardList[0]['customer_id'];
          this.splitObj.card_source = this.cardList[0]['card_source'];
          this.splitObj.isExistigCard =true;
          this.splitObj.is_split_payment =true;
          this.splitObj.selected_payment_method = this.selectedPaymentType;
        }
      });
  
      return await modal.present();
    }
}

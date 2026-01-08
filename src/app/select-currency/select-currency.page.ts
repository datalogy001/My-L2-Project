import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, NavController, } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.page.html',
  styleUrls: ['./select-currency.page.scss'],
})
export class SelectCurrencyPage implements OnInit {

  constructor(
    private loadingScreen: LoadingScreenAppPage, 
    private service: ServicesService, 
    private modalCtrl: ModalController, 
    private toastController: ToastController, 
    private navController: NavController,
    private translate: TranslateService
  ) {}

  currencyType: any = '';
  source: any = '';
  destination: any = '';
  countryParam: any = { 'to_currency': '' };

  currencyList: any = [
    { 'text': 'USD', 'value1': 'USD', 'value2': this.translate.instant("USD") },
    { 'text': 'GBP', 'value1': 'GBP', 'value2':  this.translate.instant("GBP") },
    { 'text': 'EUR', 'value1': 'EURO', 'value2':  this.translate.instant("EURO") },
    { 'text': 'LYD', 'value1': 'LYD', 'value2':  this.translate.instant("LYD") }
  ];

  ngOnInit() {}

  ionViewDidEnter() {
    this.currencyType = window.localStorage.getItem("L2TraveleSIM_currency") == null ? 'USD' : window.localStorage.getItem("L2TraveleSIM_currency");
  }

  async changeCurrency(values: any) {
    await this.loadingScreen.presentLoading();
    window.localStorage.setItem("L2TraveleSIM_Saved_Currency", "Yes");
    window.localStorage.setItem("L2TraveleSIM_currency", this.currencyType);
    this.updateCountriesAfterChanged(this.currencyType);
  }

  updateCountriesAfterChanged(currencys: any) {
    this.countryParam.to_currency = currencys;
    this.service.getCountryListDB(this.countryParam).then((res: any) => {
      if (res.code == 200) {
        this.loadingScreen.dismissLoading();
        this.successMSGModal(
          this.translate.instant('CURRENCY_CHANGE_SUCCESS'),
          this.translate.instant('CURRENCY_UPDATE'),
          "2000"
        );
        window.localStorage.setItem('L2TraveleSIM_countryBundles', JSON.stringify(res.data.countries));
        window.localStorage.setItem('L2TraveleSIM_ZoneBundles', JSON.stringify(res.data.zones));
    //    this.navController.pop();
      } else {
        this.loadingScreen.dismissLoading();
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
  gotoTab5() {
 if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoMarketPlace()
  {
    this.navController.navigateRoot('marketplace');
  }


  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }
}

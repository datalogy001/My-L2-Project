import { Component, OnInit, } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-voucher-reveal',
  templateUrl: './voucher-reveal.page.html',
  styleUrls: ['./voucher-reveal.page.scss'],
})
export class VoucherRevealPage implements OnInit {

  
    constructor(private translate: TranslateService,  private http: HttpClient, private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private Router: Router, private navController: NavController, private toastController: ToastController) {
    }
    
  successDetails:any;
  voucherResult:any=[]; 
  
  ngOnInit() {
    this.successDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.voucherResult = this.successDetails.voucherResult;
    console.log(JSON.stringify(this.voucherResult));
  }

  async gotoProfile()
  {
    this.navController.navigateRoot('profile');
  }

  async gotoPlans()
  {
    this.navController.navigateRoot('tab1');
  }

}

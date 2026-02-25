import { Component, OnInit, Input } from '@angular/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-refercode-added',
  templateUrl: './refercode-added.page.html',
  styleUrls: ['./refercode-added.page.scss'],
})
export class RefercodeAddedPage implements OnInit {

  imagePath: any = '';
  textMsg: any = '';
  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  @Input("value3") value3: any;
  currencyCode:any='USD';
  constructor(private translate: TranslateService,private loadingScreen: LoadingScreenAppPage, private Router: Router,private platform: Platform,  private modalCtrl: ModalController, private toastcntr: ToastController) { }

ngOnInit() {
    //Current currency 
    if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
    }
}

gotoProfile()
{
  this.modalCtrl.dismiss();
}

}

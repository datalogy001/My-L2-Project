import { Component, OnInit, Input } from '@angular/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-codenotwork',
  templateUrl: './modal-codenotwork.page.html',
  styleUrls: ['./modal-codenotwork.page.scss'],
})
export class ModalCodenotworkPage implements OnInit {

  imagePath: any = '';
    textMsg: any = '';
    @Input("value") value: any;
    @Input("value1") value1: any;
    
    constructor(private translate: TranslateService,private loadingScreen: LoadingScreenAppPage, private Router: Router,private platform: Platform,  private modalCtrl: ModalController, private toastcntr: ToastController) { }
  
  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}

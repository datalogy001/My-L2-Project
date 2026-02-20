import { Component, OnInit,  } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import {SharenowPage} from '../sharenow/sharenow.page';
import {DownloadEsimPage} from '../../app/download-esim/download-esim.page';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.page.html',
  styleUrls: ['./order-complete.page.scss'],
})
export class OrderCompletePage implements OnInit {
  tempDetails:any=[];
  sharingData:any=[];
  constructor(private modalController: ModalController,private loadCtr: LoadingController,private Router: Router,private navController: NavController,private toastController: ToastController) { }

  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
  }

  //Redirect to Home page 
  gotoHome()
  {
    this.Router.navigate(['tab1']);
  }

  async gotoDownload ()
  {
    const modal = await this.modalController.create({
      component: DownloadEsimPage,
      componentProps: { value: this.sharingData.iccid, value1: this.sharingData.qr_img_link }
    });
  
    modal.onDidDismiss();
    return await modal.present(); 
  }

  //Share esim
  async shareEsim()
  {
    const modal = await this.modalController.create({
      component: SharenowPage,
      componentProps: { value: this.sharingData.iccid, value1:  this.sharingData.country+": "+  this.sharingData.dataamount+" • "+  this.sharingData.days, value2: this.sharingData.qr_img_link  }
    });
  
    modal.onDidDismiss();
    return await modal.present(); 
  }
}

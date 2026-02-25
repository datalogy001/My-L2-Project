import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "@ionic/angular";
import { SharenowPage } from '../sharenow/sharenow.page';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-installation',
  templateUrl: './installation.page.html',
  styleUrls: ['./installation.page.scss'],
})
export class InstallationPage implements OnInit {
  tempDetails: any = [];
  sharingData: any = [];
  iccid: any;

  constructor( private Router: Router, private navCtrl: NavController,private modalController: ModalController) { }

  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
    this.iccid = this.tempDetails.iccid;
  }

  async installLater()
  {
    this.navCtrl.navigateRoot('tab1');
  }

  async gotoInstallESIM()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        sharingData: this.sharingData,
        iccid: this.sharingData.iccid
      }
    };
    console.log("1=>" + this.sharingData.iccid);
    this.Router.navigate(['/install-esim'], navigationExtras);
  }

  async gotoShare(){
   
   const modal = await this.modalController.create({
     component: SharenowPage,
     componentProps: { value: this.sharingData.iccid, value1:  this.sharingData.country+": "+  this.sharingData.dataamount+" • "+  this.sharingData.days, value2: this.sharingData.qr_img_link, value3:this.sharingData.smdpAddress, value4: this.sharingData.matchingId   }
   });
 
   modal.onDidDismiss();
   return await modal.present(); 
   }

}

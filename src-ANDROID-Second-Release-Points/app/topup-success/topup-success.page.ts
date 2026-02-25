import { Component, OnInit,  } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-topup-success',
  templateUrl: './topup-success.page.html',
  styleUrls: ['./topup-success.page.scss'],
})
export class TopupSuccessPage implements OnInit {

  constructor(private modalController: ModalController,private loadCtr: LoadingController,private Router: Router,private navController: NavController,private toastController: ToastController) { }
  tempDetails:any=[]; 
  iccid:any= '';
  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.iccid = this.tempDetails.iccid;
  }

   //Redirect to Home page 
   gotoHome()
   {
     this.Router.navigate(['tab1']);
   }
 
}

import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController,LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-created-successful',
  templateUrl: './created-successful.page.html',
  styleUrls: ['./created-successful.page.scss'],
})
export class CreatedSuccessfulPage implements OnInit {
  tempDetails:any=[]; 
  checkoutObj:any=[];
  isLogin:any='';
  constructor(private Router:Router) { }

  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
    this.isLogin = this.tempDetails.withOutLogin;

    setTimeout(() => {
  if(this.isLogin == true)
  {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj
      }
    };
  this.Router.navigate(['/payment-detail'], navigationExtras);
  }else
  {
    this.Router.navigate(['tab1']);
  }
    }, 2000);
   
  }

}

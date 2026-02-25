import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.page.html',
  styleUrls: ['./payment-successful.page.scss'],
})
export class PaymentSuccessfulPage implements OnInit {
  tempDetails:any=[];
  sharingData:any=[];
  iccid:any;
  constructor(private Router:Router) { }
  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
    this.iccid  = this.tempDetails.iccid;
    setTimeout(() => {
      let navigationExtras: NavigationExtras = {
        state: {
          sharingData: this.sharingData,
          iccid:this.iccid 
        }
      };
   if(this.iccid !='')
   {
    this.Router.navigate(['/topup-success'],navigationExtras);
   }else{
    this.Router.navigate(['/order-complete'],navigationExtras);
   }
    
        }, 2000);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.page.html',
  styleUrls: ['./account-created.page.scss'],
})
export class AccountCreatedPage implements OnInit {

  constructor( private Router: Router) { }
  tempData:any=[]; 

  ngOnInit() {
      //Recevied OTP value
      this.tempData = this.Router.getCurrentNavigation()?.extras.state;
      setTimeout(() => {
      if (this.tempData.withOutLogin == true) {
        const loginPageUrl = this.Router.url;
        let navigationExtras: NavigationExtras = {
          state: {
            checkoutData: this.tempData.checkoutData,
            withOutLogin: this.tempData.withOutLogin,
            payBack: loginPageUrl
          }
        };
        this.Router.navigate(['/payment-days'], navigationExtras);
      } else {
        this.Router.navigate(['home-search']);
      }

    }, 2000);
  }

}

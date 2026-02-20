import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-reset-password-success',
  templateUrl: './reset-password-success.page.html',
  styleUrls: ['./reset-password-success.page.scss'],
})
export class ResetPasswordSuccessPage implements OnInit {

  tempArr:any=[];
  
  constructor(private Router: Router ) { }

  ngOnInit() {
  }

  gotoLogin()
  {   
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.tempArr,
        withOutLogin: false
      }
    };
      this.Router.navigate(['/login'], navigationExtras);

  }

}

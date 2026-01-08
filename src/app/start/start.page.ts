import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, PopoverController, ModalController } from "@ionic/angular";
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  tempArr:any=[];
  constructor(private navCtrl: NavController,private Router: Router) {  }

  ngOnInit() {
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  gotoOnBoard()
  {
    if(window.localStorage.getItem('eSIM_IsNotiSettingAllow') == '' || window.localStorage.getItem('eSIM_IsNotiSettingAllow') == null)
        this.Router.navigate(['/onboard']);
      else
      this.Router.navigate(['/home-search']);
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
 
  checkDeviceCompt()
  {
    //this.navCtrl.navigateRoot('/get-your-bundle');
    this.Router.navigate(['tab2']);
  }
 
   gotoRegister()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.tempArr,
        withOutLogin: false
      }
    };
   this.Router.navigate(['/create-account'], navigationExtras);
  }
 

 


  

}

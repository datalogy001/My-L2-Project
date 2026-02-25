import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Router, NavigationExtras } from '@angular/router';
import OneSignalPlugin from 'onesignal-cordova-plugin'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  constructor(private platform: Platform, private Router: Router) { }


  ngOnInit() {

  }

  goNext() {
    this.Router.navigate(['onboard-two']);
  }


  gotoPage() {
    this.Router.navigate(['compatible-device']);
  }
}

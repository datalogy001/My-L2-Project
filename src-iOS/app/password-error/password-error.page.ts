import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-password-error',
  templateUrl: './password-error.page.html',
  styleUrls: ['./password-error.page.scss'],
})
export class PasswordErrorPage implements OnInit {
  @Input("value") value: any;
  @Input("value1") value1: any;
  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}

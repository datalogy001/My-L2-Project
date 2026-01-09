import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-success-model',
  templateUrl: './success-model.page.html',
  styleUrls: ['./success-model.page.scss'],
})
export class SuccessModelPage implements OnInit {

  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  constructor( private modalController: ModalController ) { }


  ngOnInit() {
    setTimeout(() => {
      this.modalController.dismiss();
    }, this.value2);
  }

}

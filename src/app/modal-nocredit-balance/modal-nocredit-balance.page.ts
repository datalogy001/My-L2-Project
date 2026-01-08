import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";


@Component({
  selector: 'app-modal-nocredit-balance',
  templateUrl: './modal-nocredit-balance.page.html',
  styleUrls: ['./modal-nocredit-balance.page.scss'],
})

export class ModalNocreditBalancePage implements OnInit {

  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;

  constructor( private modalController: ModalController ) { }


  ngOnInit() {
    setTimeout(() => {
      this.modalController.dismiss();
    }, this.value2);
  }

  async closePopover()
  {
    this.modalController.dismiss();
  }
}


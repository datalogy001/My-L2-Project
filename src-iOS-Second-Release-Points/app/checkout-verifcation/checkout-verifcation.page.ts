import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout-verifcation',
  templateUrl: './checkout-verifcation.page.html',
  styleUrls: ['./checkout-verifcation.page.scss'],
})
export class CheckoutVerifcationPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closePopover(values:any)
  {
      this.modalCtrl.dismiss({ inputValue: values });
  }
  
}

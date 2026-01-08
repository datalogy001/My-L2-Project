import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-nointernet',
  templateUrl: './nointernet.page.html',
  styleUrls: ['./nointernet.page.scss'],
})
export class NointernetPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closePopover(values:any)
  {
      this.modalController.dismiss({ inputValue: values });
  }


  dismissModal() {
    this.modalController.dismiss();
  }

}

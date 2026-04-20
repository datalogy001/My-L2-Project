import { Component, OnInit } from '@angular/core';
import {  ModalController } from "@ionic/angular";
import { TermsPage } from '../terms/terms.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }




  async gotoTerms() {
    
     
      const modal = await this.modalController.create({
        component: TermsPage
      });

      modal.onDidDismiss();

      return await modal.present();

    

  }


}
